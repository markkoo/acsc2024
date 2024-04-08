<template>
  <div class="index-page">
    <div style="padding-bottom: 56px;">
      <router-view></router-view>
    </div>
    <div class="container" style="padding: 0; position: fixed; bottom: 0;">
      <a-card :body-style="{ padding: `0` }">
        <a-row align="stretch">
          <a-col flex="1">
            <a-button type="text" style="width: 100%; height: 100%; padding-top: 8px; padding-bottom: 8px;"
              size="large">
              <router-link :to="{ name: `programme-list` }">Programme</router-link>
            </a-button>
          </a-col>
          <a-col flex="1">
            <a-button type="text" style="width: 100%; height: 100%; padding-top: 8px; padding-bottom: 8px;"
              size="large">
              <router-link :to="{ name: `dress-code` }">Dress Code</router-link>
            </a-button>
          </a-col>
          <a-col flex="1">
            <a-button type="text" style="width: 100%; height: 100%; padding-top: 8px; padding-bottom: 8px;"
              size="large">
              <router-link :to="{ name: `qr-code` }">
                <svg style="font-size: 32px;" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 17V16H13V13H16V15H18V17H17V19H15V21H13V18H15V17H16ZM21 21H17V19H19V17H21V21ZM3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM18 13H21V15H18V13ZM6 6V8H8V6H6ZM6 16V18H8V16H6ZM16 6V8H18V6H16Z"
                    fill="currentColor" />
                </svg>
              </router-link>
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<style lang="scss">
.index-page {
  .router-link-exact-active {
    color: $color-main;
  }
}
</style>