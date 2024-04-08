/// <reference types="vite/client" />

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vuex' {
  export type * from 'vuex/types/index.d.ts'
  export type * from 'vuex/types/helpers.d.ts'
  export type * from 'vuex/types/logger.d.ts'
  export type * from 'vuex/types/vue.d.ts'
}
