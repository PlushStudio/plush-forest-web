# Web Client for PlushForest app [![Dev](https://github.com/PlushStudio/plush-forest-web/actions/workflows/plush-forest-workflow.yml/badge.svg)](https://github.com/PlushStudio/plush-forest-web/actions/workflows/plush-forest-workflow.yml)

## Enviroments:
**DEV:** https://forest.plush.dev/

**STAGE:** https://forest.plush.network/


Dev API Swagger: https://api.plush.dev/forest/swagger/


### Requirements
- Node.js v16.14.0

### Setup
```
npm install
npm run serve
npm run build
npm run lint
```

### .env
```
VITE_BASE_URL="http://localhost:8080"
VITE_NETWORK_ID="80001"
VITE_FOREST_CONTRACT_ADDRESS="0x3aA5283D113BeD501dC4e773EBB1A2f8299207C0"
VITE_SIGNUP_LINK="https://signup.plush.dev"
VITE_CORE_CONTRACT_ADDRESS="0x2E583BF47948fe0A40dEa688aBE2ab9EE25E97BD"
VITE_TREE_CONTRACT_ADDRESS="0x4092305B458e5ab84274De5F9C5d228C737345df"
VITE_PLUSH_CONTRACT_ADDRESS="0x6FB60c408363636dAC206AA98EE429d79923DD33"
```

## Hosting
**DNS** -> https://dash.cloudflare.com/


## CI/CD
1. **Development** follows `GitFlow`.
2. **Preview** Every time you creat PR agains `master` branch, GithubActions will generate Preview link that will last for `7 days` on Firebase Hosting.
3. **Deployment** Every time you merge PR to `master` branch, GithubActions will build and deploy website to **DEV** enviroment.
4. **RollBack** You can alsways rollback via Firebase Hosting interface
