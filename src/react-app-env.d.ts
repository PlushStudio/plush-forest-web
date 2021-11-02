/* <reference types="react-scripts" />*/
interface ImportMetaEnv {
    VITE_PLAI_CONTRACT_ADDRESS: string,
    VITE_CORE_CONTRACT_ADDRESS: string,
    VITE_API_URL: string,
    VITE_CORE_GET_TREE_CONTRACT_ADDRESS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}