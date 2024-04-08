<template>
  <div class="qr-code-page">
    <div class="container" style="padding: 0;">
      <a-card>
        <template #title>QR Code</template>
        <a-qrcode v-if="link != null" :value="link" style="margin: 0 auto;" :size="256" />
        <a-spin v-else size="large"></a-spin>
      </a-card>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>