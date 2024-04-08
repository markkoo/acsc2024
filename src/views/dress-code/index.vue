<template>
  <div class="dress-code-page">
    <div class="container" style="padding: 0;">
      <a-card>
        <template #title>Dress Code</template>
        <a-row :gutter="[16, 16]">
          <a-col v-for="(item, index) in dressCodes" :key="index" :span="24">
            <a-card :body-style="{ padding: `0` }" style="overflow: hidden;">
              <a-image :width="`100%`" :src="computeImageLink(item['Link'])" />
              <h5 style="font-weight: 700; padding: 8px 8px 0; border-top: 1px solid #eaeaea;">
                {{ item['Dress Code'] }}
              </h5>
              <p style="padding: 0 8px 8px;">
                {{ item['Description'] }}
              </p>
            </a-card>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>