/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URI: string;
  readonly VITE_SWAPI_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
