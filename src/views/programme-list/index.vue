<template>
  <div class="programme-list-page">
    <div class="container" style="padding-left: 0; padding-right: 0;">
      <a-card>
        <template #title>
          <a-row align="middle">
            <a-col flex="1">
              <h2 style="font-size: 16px;">Programmes <span style="color: green;">(Points: {{ overallPoints }})</span>
              </h2>
            </a-col>
            <a-col>
              <a-button @click="logout">Logout</a-button>
            </a-col>
          </a-row>
        </template>
        <a-row :gutter="[0, 16]">
          <a-col v-for="(item, index) in programmes" :key="index" flex="100%">
            <router-link :to="{ name: 'programme-detail', params: { programmeId: item.id } }">
              <a-card :style="`${computeCardBackground(item)}; position: relative;`">
                <a-row align="middle" :gutter="16">
                  <a-col flex="1">
                    <a-row :gutter="16">
                      <a-col flex="1">
                        <h4 style="font-weight: 600;">{{ item.Programe }}</h4>
                        <p>{{ computeDateTime(item) }}</p>
                      </a-col>
                      <a-col>
                        <div v-if="item.isJoined" style="margin-right: -32px;">
                          <a-row align="middle" :gutter="2">
                            <a-col style="display: flex; align-items: center; justify-content: center">
                              <svg style="font-size: 24px; color: #0958d9; line-height: 1;" width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM11.768 15.64L16.768 9.64L15.232 8.36L10.932 13.519L8.707 11.293L7.293 12.707L10.293 15.707L11.067 16.481L11.768 15.64Z"
                                  fill="currentColor" />
                              </svg>
                            </a-col>
                            <a-col>
                              <p style="color: #0958d9; line-height: 1;">Joined</p>
                            </a-col>
                          </a-row>
                        </div>
                      </a-col>
                    </a-row>
                    <a-divider style="margin: 8px 0;"></a-divider>
                    <a-row>
                      <a-col flex="1">
                        <a-row>
                          <a-col flex="100%">
                            <a-tag color="orange">
                              Headpoints: {{ item.totalParticipants * parseInt(item["HeadPoint"] ?? '0') }} /
                              {{ item['TargetJBEHeadPoint'] ?? 0 }}</a-tag>
                          </a-col>
                          <a-col flex="100%">
                            <a-tag color="green">
                              Winning Points: {{ item["WinningPoint"] ?? 0 }} /
                              {{ item['TargetJBEWinningPoint'] ?? 0 }}</a-tag>
                          </a-col>
                        </a-row>
                      </a-col>
                      <a-col style="text-align: center;">
                        <p>Joined</p>
                        <h3
                          :style="`color: ${parseInt(`${item.totalParticipants}`) < parseInt(`${item['TargetJBEHeadPoint']}`) ? 'orange' : ''}; font-weight: 700;`">
                          {{ item.totalParticipants }} / {{ item['minparticipant'] ?? 0 }}</h3>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col>
                    <svg style="font-size: 20px;" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M15.7071 11.2929C15.8946 11.4805 15.9999 11.7348 15.9999 11.9999C15.9999 12.2651 15.8946 12.5194 15.7071 12.7069L10.0501 18.3639C9.95785 18.4594 9.84751 18.5356 9.7255 18.588C9.6035 18.6404 9.47228 18.668 9.3395 18.6692C9.20672 18.6703 9.07504 18.645 8.95215 18.5948C8.82925 18.5445 8.7176 18.4702 8.6237 18.3763C8.52981 18.2824 8.45556 18.1708 8.40528 18.0479C8.355 17.925 8.32969 17.7933 8.33085 17.6605C8.332 17.5278 8.35959 17.3965 8.412 17.2745C8.46441 17.1525 8.54059 17.0422 8.6361 16.9499L13.5861 11.9999L8.6361 7.04994C8.45394 6.86133 8.35315 6.60873 8.35542 6.34653C8.3577 6.08434 8.46287 5.83353 8.64828 5.64812C8.83369 5.46271 9.0845 5.35754 9.3467 5.35526C9.60889 5.35298 9.8615 5.45378 10.0501 5.63594L15.7071 11.2929Z"
                        fill="currentColor" />
                    </svg>
                  </a-col>
                </a-row>
              </a-card>
            </router-link>
          </a-col>
        </a-row>
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
</style>