jq -n env \
| jq 'with_entries(select(.key|test("^CLIENT_")))' \
| jq 'with_entries(.key |= sub("^CLIENT_"; ""))' \
| jq . -Mc > clientConfig.json

INDEX_FILE=/usr/share/nginx/html/index.html
TEMPLATE_FILE=/usr/share/nginx/html/index.html.tpl

sed -i 's/<!-- INJECT VARIABLES INTO window.config -->/window.config = {{ include "clientConfig" }};/g' $INDEX_FILE

if [ ! -f "$TEMPLATE_FILE" ]; then
    cp $INDEX_FILE $TEMPLATE_FILE
    sed -i 's/<!-- INJECT VARIABLES INTO window.config -->/window.config = {{ include "clientConfig" }};/g' $TEMPLATE_FILE
fi

gomplate -d clientConfig.json -f $TEMPLATE_FILE > $INDEX_FILE


nginx -g "daemon off;"