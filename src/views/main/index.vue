<template>
  <div class="index-page">
    <div style="padding-bottom: 56px;">
      <router-view></router-view>
    </div>
    <div class="container" style="padding: 0; position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);">
      <a-card :body-style="{ padding: `0` }">
        <a-row align="stretch">
          <a-col flex="1">
            <a-button type="text" style="width: 100%; height: 100%; padding-top: 8px; padding-bottom: 8px;"
              size="large">
              <router-link :to="{ name: `programme-list` }">Programmes</router-link>
            </a-button>
          </a-col>
          <a-col flex="1">
            <a-button type="text" style="width: 100%; height: 100%; padding-top: 8px; padding-bottom: 8px;"
              size="large">
              <router-link :to="{ name: `member-list` }">Members</router-link>
            </a-button>
          </a-col>
          <a-col flex="1">
            <a-button type="text" style="width: 100%; height: 100%; padding-top: 8px; padding-bottom: 8px;"
              size="large">
              <router-link :to="{ name: `qr-code` }">
                QR Code
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