<template>
  <div class="programme-list-page">
    <div class="container" style="padding-left: 0; padding-right: 0;">
      <a-card title="Members">
        <a-form layout="vertical" :model="searchState">
          <a-row align="stretch" :gutter="16">
            <a-col flex="1">
              <a-form-item label="Member" name="member">
                <a-select v-model:value="searchState.member" allow-clear>
                  <a-select-option :value="null">Show All</a-select-option>
                  <a-select-option v-for="(item, index) in memberOptions" :key="index" :value="item.Name">{{ item.Name
                    }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col flex="1">
              <a-form-item label="Angel" name="angel">
                <a-select v-model:value="searchState.angel" allow-clear>
                  <a-select-option :value="null">Show All</a-select-option>
                  <a-select-option v-for="(item, index) in memberOptions" :key="index" :value="item.Name">{{ item.Name
                    }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div style="overflow: auto; width: 100%; height: 73vh; border-radius: 6px; border: 1px solid #dadada;">
          <div
            style="display: flex; align-items: center; position: sticky; top: 0; background-color: white; border-bottom: 1px solid #dadada; width: fit-content; font-size: 12px;">
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px;">
              <span style="font-weight: bold; white-space: nowrap;">Angel</span>
            </div>
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px;">
              <span style="font-weight: bold; white-space: nowrap;">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px;">
              <span style="font-weight: bold; white-space: nowrap;">Member Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px;">
              <span style="font-weight: bold; white-space: nowrap;">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers.length > 0">
            <div v-for="(item, index) in computedMembers" :key="index" class="table-row"
              style="display: flex; align-items: center; border-bottom: 1px solid #dadada; width: fit-content;">
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px;">
                <span class="clamp-1">{{ item.Angel }}</span>
              </div>
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px;">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px;word-wrap: break-word;line-height:1.1">
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px; display: flex; flex-direction: column;">
                <b>D{{ item.Day }} {{ item["Start Time"] }} - {{ item["End Time"] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
          <a-empty v-else style="padding: 40px 0;"></a-empty>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>

<style lang="scss">
.programme-list-page {
  .router-link-exact-active {
    color: $color-main;
  }
}

.clamp-1 {
  @include ellipsis(1, 1.5, 14px);
  font-size:12px !important;
}

.table-row {
  background-color: white;
  font-size:12px !important;

  &:nth-of-type(2n + 1) {
    background-color: #fafafa;
  }
}
</style>