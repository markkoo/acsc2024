<template>
  <div class="app-main">
    <a-config-provider :theme="theme">
      <router-view></router-view>
    </a-config-provider>

    <div v-if="isShowingPwaInstallation" class="pwa-installation-prompt">
      <div class="container">
        <div class="prompt-wrapper">
          <div class="app-icon-wrapper">
            <img :src="LogoImage" alt="Earnlah">
          </div>
          <div class="prompt-content">
            <h3>Add to homescreen now!</h3>
          </div>
          <div class="button-wrapper">
            <a-button type="primary" @click="onAddToHomePressed">
              Add Now
            </a-button>
            <a-button type="text" @click="hideInstallPromotion">
              <CloseOutlined />
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import LogoImage from "@/assets/images/logo.png";

const theme = ref({
  token: {
    colorPrimary: import.meta.env.VITE_COLOR_MAIN,
    colorBorderSecondary: import.meta.env.VITE_COLOR_BORDER,
    fontFamily: `'Inter Tight', -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif`,
  }
});

const isShowingPwaInstallation = ref(false);

const showInstallPromotion = () => {
  isShowingPwaInstallation.value = true;
}

const hideInstallPromotion = () => {
  isShowingPwaInstallation.value = false;
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  showInstallPromotion();
});

const onAddToHomePressed = () => {
  hideInstallPromotion();

  (deferredPrompt as any).prompt();
}
</script>

<style lang="scss">
.app-main {
  height: 100vh;
}

.pwa-installation-prompt {
  position: fixed;
  z-index: 2031;
  width: 100%;
  bottom: 0;
  left: 0;

  .prompt-wrapper {
    @include flex(row, flex-start, center);
    border: 1px solid #eaeaea;
    background-color: white;
    padding: 8px 16px;
    gap: 16px;

    .app-icon-wrapper {
      border-radius: 8px;
      position: relative;
      width: 60px;

      &:before {
        content: "";
        display: block;
        padding-top: 100%;
      }

      img {
        @include image(contain);
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
      }
    }

    .prompt-content {
      flex: 1;

      h3 {
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
}

/* Global settings below */
* {
  box-sizing: border-box;
}

.ant-scroll-number.ant-badge-count {
  .ant-scroll-number-only {
    .ant-scroll-number-only-unit {
      color: white;
    }
  }
}

.ant-notification {
  z-index: 2034;
}

body {
  margin: 0;
  font-weight: $font-weight;
  font-size: $body-font-size;
  font-family: $body-font-family;
  -webkit-font-smoothing: antialiased;
  background-color: $body-background-color;
}

:root {
  overscroll-behavior: none;
}

::selection {
  background-color: $color-selection-bg;
  color: $color-selection-fg;
}

::-moz-selection {
  background-color: $color-selection-bg;
  color: $color-selection-fg;
}

::-webkit-input-placeholder,
::-moz-placeholder,
::-ms-input-placeholder,
:-ms-input-placeholder,
:-moz-placeholder {
  color: $color-placeholder;
}

::placeholder {
  color: $color-placeholder;
  opacity: 1;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-left: $container-xs-padding;
  padding-right: $container-xs-padding;

  &.fluid {
    padding-left: 0;
    padding-right: 0;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
}

h1,
.h1 {
  font-family: $font-family-h1;
  font-size: $h1;
  font-weight: $font-weight-h1;
  color: $color-h1;
  line-height: $line-height-h1;
  letter-spacing: $letter-spacing-h1;
  margin: $margin-h1;
}

h2,
.h2 {
  font-family: $font-family-h2;
  font-size: $h2;
  font-weight: $font-weight-h2;
  color: $color-h2;
  line-height: $line-height-h2;
  letter-spacing: $letter-spacing-h2;
  margin: $margin-h2;
}

h3,
.h3 {
  font-family: $font-family-h3;
  font-size: $h3;
  font-weight: $font-weight-h3;
  color: $color-h3;
  line-height: $line-height-h3;
  letter-spacing: $letter-spacing-h3;
  margin: $margin-h3;
}

h4,
.h4 {
  font-family: $font-family-h4;
  font-size: $h4;
  font-weight: $font-weight-h4;
  color: $color-h4;
  line-height: $line-height-h4;
  letter-spacing: $letter-spacing-h4;
  margin: $margin-h4;
}

h5,
.h5 {
  font-family: $font-family-h5;
  font-size: $h5;
  font-weight: $font-weight-h5;
  color: $color-h5;
  line-height: $line-height-h5;
  letter-spacing: $letter-spacing-h5;
  margin: $margin-h5;
}

h6,
.h6 {
  font-family: $font-family-h6;
  font-size: $h6;
  font-weight: $font-weight-h6;
  color: $color-h6;
  line-height: $line-height-h6;
  letter-spacing: $letter-spacing-h6;
  margin: $margin-h6;
}

p {
  font-family: $font-family-p;
  font-size: $p;
  font-weight: $font-weight-p;
  color: $color-p;
  line-height: $line-height-p;
  letter-spacing: $letter-spacing-p;
  margin: $margin-p;
}

a {
  display: inline;
  color: $color-main;
  text-decoration: unset;
  transition: 0.3s;

  &:hover {
    color: $color-1;
  }
}

button,
a {
  cursor: pointer;
}

@media #{$breakpoint-up-sm} {
  .container {
    max-width: $container-sm-max-width;
    padding-left: $container-sm-padding;
    padding-right: $container-sm-padding;

    &.fluid {
      padding-left: $container-sm-padding;
      padding-right: $container-sm-padding;
    }
  }
}

@media #{$breakpoint-up-md} {
  .container {
    max-width: $container-md-max-width;
    padding-left: $container-padding;
    padding-right: $container-padding;

    &.fluid {
      padding-left: $container-padding;
      padding-right: $container-padding;
    }
  }
}

@media #{$breakpoint-up-lg} {
  .container {
    max-width: $container-lg-max-width;
  }
}

@media #{$breakpoint-up-xl} {
  .container {
    max-width: $container-xl-max-width;
  }
}
</style>
