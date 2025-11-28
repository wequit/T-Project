import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from "node:path";
import {paraglideVitePlugin} from "@inlang/paraglide-js";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/rupoi/',
    plugins: [
      vue(),
      vueDevTools(),
      paraglideVitePlugin({
        project: '../../../project.inlang',
        outdir: '../../../paraglide',
        localStorageKey: 'locale',
        strategy: ['custom-localStorage', 'baseLocale'],
      })
    ],
    server: {
      proxy: {
        '/api/staffcontrol': {
          target: env.VITE_BASE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/api/rupoi': {
          target: env.VITE_RUPOI_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/api/common': {
          target: env.VITE_COMMON_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // '/api/file-storage': {
        //   target: env.VITE_FILE_STORAGE_API_URL,
        //   changeOrigin: true,
        //   secure: false,
        // },
      },
    },
    resolve: {
      alias: {
        '@common': fileURLToPath(new URL('../../packages/common/src', import.meta.url)),
        'paraglide': fileURLToPath(new URL('../../../paraglide', import.meta.url)),
        '@ubk': fileURLToPath(new URL('../ubk/src', import.meta.url)),
        '@base': fileURLToPath(new URL('../base/src', import.meta.url)),
        '@rupoi': fileURLToPath(new URL('../rupoi/src', import.meta.url)),

      },
    },
    build: {
      outDir: path.join(fileURLToPath(new URL('../../..', import.meta.url)), 'dist-rupoi'),
    }
  }
})
