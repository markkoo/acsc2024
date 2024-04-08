import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  process.env = { ...process.env, ...env }

  return {
    base: '/acsc',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $color-main: ${process.env.VITE_COLOR_MAIN};
            $color-border: ${process.env.VITE_COLOR_BORDER};
            $color-success: #15c42c;
            $color-warning: #d19303;
            $color-danger: #ff0000;
            $color-background: #f2faff;
            $color-1: #000000;
            $color-2: #666666;
            $color-3: #979797;
            $color-4: #1b1b1b;
            $color-5: #babcc0;

            @import "./src/assets/variables.scss";
            @import "./src/assets/mixins.scss";
          `
        }
      }
    }
  }
})
