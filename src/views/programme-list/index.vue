<template>
  <div class="programme-list-page">
    <div class="container" style="padding-left: 0; padding-right: 0">
      <a-card>
        <template #title>
          <a-row align="middle">
            <a-col flex="1">
              <h2 style="font-size: 16px">
                Programmes <span style="color: green">(Points: {{ totalPoints }})</span>
              </h2>
            </a-col>
            <a-col>
              <a-button @click="logout">Logout</a-button>
            </a-col>
          </a-row>
        </template>
        <!-- <a-form layout="vertical" :model="searchState">
          <a-row align="stretch" :gutter="16">
            <a-col flex="1">
              <a-form-item label="Search" name="keyword">
                <a-input
                  v-model:value="searchState.keyword"
                  style="height: 32px; padding: 0 12px"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col flex="1">
              <a-form-item label="Filter" name="filter">
                <a-select v-model:value="searchState.filter" allow-clear>
                  <a-select-option :value="null">Show All</a-select-option>
                  <a-select-option
                    v-for="(item, index) in tagOptions"
                    :key="index"
                    :value="item.value"
                    >{{ item.label }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form> -->
        <a-row :gutter="[0, 0]">
          <a-col
            v-for="(item, index) in computedProgrammes"
            :key="index"
            flex="100%"
            :style="`margin-bottom:16px`"
          >
            <a @click="selectProgramme(item)">
              <a-card :style="`position: relative;`">
                <a-row align="middle" :gutter="16">
                  <a-col flex="1">
                    <a-row :gutter="16">
                      <a-col flex="1">
                        <h4 style="font-weight: 600">{{ item.Programe }}</h4>
                        <h5 style="font-weight: 500">{{ item.Description }}</h5>
                        <p>{{ computeDateTime(item) }}</p>
                      </a-col>
                      <a-col>
                        <div v-if="item.isJoined" style="margin-right: -32px">
                          <a-row align="middle" :gutter="2">
                            <a-col
                              style="display: flex; align-items: center; justify-content: center"
                            >
                              <svg
                                style="font-size: 24px; color: #0958d9; line-height: 1"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM11.768 15.64L16.768 9.64L15.232 8.36L10.932 13.519L8.707 11.293L7.293 12.707L10.293 15.707L11.067 16.481L11.768 15.64Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </a-col>
                            <a-col>
                              <p style="color: #0958d9; line-height: 1">Joined</p>
                            </a-col>
                          </a-row>
                        </div>
                      </a-col>
                    </a-row>
                    <a-divider style="margin: 8px 0"></a-divider>
                    <!-- chip point -->
                    <a-row>
                      <a-col flex="1">
                        <a-row>
                          <a-col v-if="item.OnlyPresident === 'TRUE'" flex="100%">
                            <a-tag color="yellow">President Only</a-tag>
                          </a-col>
                          <a-col flex="100%">
                            <a-tag color="orange">
                              Head Points:
                              {{ item.totalParticipants * parseInt(item['HeadPoint'] ?? '0') }} /
                              {{ item['TargetJBEHeadPoint'] ?? 0 }}</a-tag
                            >
                          </a-col>
                          <a-col>
                            <a-tag color="green">
                              Winning Points: {{ item['WinningPoint'] ?? 0 }} /
                              {{ item['TargetJBEWinningPoint'] ?? 0 }}</a-tag
                            >
                          </a-col>
                          <a-col v-if="item.LoPoint > 0">
                            <a-tag color="lightgray">
                              Lo Points: {{ item.totalParticipants > 0 ? item['LoPoint'] : 0 }} /
                              {{ item['LoPoint'] }}</a-tag
                            >
                          </a-col>
                        </a-row>
                      </a-col>
                    </a-row>
                    <a-divider style="margin: 8px 0"></a-divider>
                    <!-- leader -->
                    <a-row style="margin-bottom: 0px"
                      >Leader:<b style="margin-left: 4px">{{ item.Leader }}</b></a-row
                    >
                    <!-- Joined -->
                    <a-row style="margin-bottom: 4px">
                      <span
                        :style="`color: ${
                          parseInt(`${item.totalParticipants}`) <
                          parseInt(`${item['MinParticipant']}`)
                            ? 'red'
                            : 'green'
                        }; font-weight: 700;`"
                        >Joined: {{ item.totalParticipants }} /
                        {{ item['MinParticipant'] ?? 0 }}</span
                      >
                    </a-row>
                    <!-- participant -->
                    <a-row>
                      <a-col v-for="(participant, index) in item.participants" :key="index">
                        <a-tag color="blue">
                          {{ participant[0] }}
                        </a-tag>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-card>
            </a>
          </a-col>
        </a-row>
      </a-card>
    </div>

    <a-modal v-model:open="isModalActive" title="" :after-close="closeProgramme">
      <template #footer></template>
      <div v-if="selectedProgramme != null">
        <h3 style="font-weight: 600">{{ selectedProgramme?.Programe }}</h3>
        <h3 style="font-weight: 500">{{ selectedProgramme?.Description }}</h3>
        <h6>{{ computedDateTime }}</h6>
        <a
          v-if="selectedProgramme?.RoadMapLink"
          :href="selectedProgramme?.RoadMapLink"
          target="_blank"
          style="margin-bottom: 16px; display: block"
          ><u>Road Map</u></a
        >
        <img
          v-if="selectedProgramme?.Image"
          :src="selectedProgramme?.Image"
          style="width: calc(100% + 48px); margin: 0 -24px 20px"
        />
        <p
          v-if="selectedProgramme?.Content"
          style="font-weight: 500; white-space: pre-wrap; font-size: 10px; margin-bottom: 20px"
        >
          {{ selectedProgramme?.Content }}
        </p>
        <h6 style="line-height: 1.4">
          Joined Participants: <b>{{ selectedProgramme?.totalParticipants }}</b>
        </h6>
        <h6 style="line-height: 1.4">
          Venue: <b>{{ selectedProgramme?.VENUE }}</b>
        </h6>
        <div style="display: flex; flex-direction: column">
          <h6 style="line-height: 1.4">Dress Code:</h6>
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              flex-wrap: wrap;
              gap: 8px 8px;
            "
          >
            <div v-for="(item, index) in selectedProgramme['Dress Code'].split(' / ')" :key="index">
              <a-image
                :width="100"
                :height="100"
                :src="computeDressCode(item)"
                style="object-fit: contain; border: 1px solid #eaeaea"
              ></a-image>
            </div>
          </div>
        </div>
        <br />
        <h6 style="line-height: 1.4">
          Leader: <b>{{ selectedProgramme?.Leader }}</b>
        </h6>
        <div>
          <h6 style="line-height: 1.4; display: inline">Participles:</h6>
          <a-tag v-for="(item, index) in selectedProgramme?.participants" :key="index">{{
            item[0]
          }}</a-tag>
        </div>
        <br />

        <h6 style="line-height: 1.4">
          Head Point:
          <b
            >{{ selectedProgramme?.participants.length * parseInt(selectedProgramme?.HeadPoint) }} /
            {{ selectedProgramme?.TargetJBEHeadPoint }}</b
          >
        </h6>
        <h6 style="line-height: 1.4">
          Winning Point:
          <b
            >{{ selectedProgramme?.WinningPoint }} /
            {{ selectedProgramme?.TargetJBEWinningPoint }}</b
          >
        </h6>
        <h6 style="line-height: 1.4">
          Minimum Participants: <b>{{ selectedProgramme?.MinParticipant }}</b>
        </h6>
        <h6 style="line-height: 1.4">
          Only President:
          <a-checkbox :checked="selectedProgramme?.OnlyPresident == 'TRUE'" readonly></a-checkbox>
        </h6>
        <h6 v-if="selectedProgramme?.LoPoint > 0" style="line-height: 1.4">
          Lo Point:
          <b
            >{{ selectedProgramme.participants.length > 0 ? selectedProgramme.LoPoint : 0 }} /
            {{ selectedProgramme?.LoPoint }}</b
          >
        </h6>
        <br />
        <h6>Remark:</h6>
        <p>{{ selectedProgramme?.Remark ?? '~ No Remark ~' }}</p>

        <a-row v-if="!hasExpired" :gutter="16" style="padding-top: 16px">
          <a-col v-if="selectedProgramme?.joined == false" flex="1">
            <a-button
              style="width: 100%"
              type="primary"
              size="large"
              :disabled="isJoinProcessing"
              @click="toggleJoin(true)"
              >{{ isJoinProcessing ? 'Please wait ...' : 'Join' }}</a-button
            >
          </a-col>
          <!-- <a-col v-else-if="selectedProgramme?.joined == false" flex="1">
            <a-button
              style="width: 100%"
              type="primary"
              size="large"
              :disabled="isJoinProcessing"
              @click="toggleJoin(true)"
              >{{ isJoinProcessing ? 'Please wait ...' : 'Join' }}</a-button
            >
          </a-col> -->
        </a-row>
        <h3 v-else style="margin-top: 24px; font-weight: 700">The event has expired</h3>
      </div>
    </a-modal>
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