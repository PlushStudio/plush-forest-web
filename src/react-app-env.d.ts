/* <reference types="react-scripts" />*/
interface ImportMetaEnv {
    VITE_PLAI_CONTRACT_ADDRESS: string,
    VITE_CORE_CONTRACT_ADDRESS: string,
    VITE_API_URL: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}