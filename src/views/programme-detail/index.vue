<template>
  <div class="programme-detail-page">
    <div class="container" style="padding: 0;">
      <a-card v-if="!isLoading">
        <a-row style="padding-bottom: 8px;">
          <a-col flex="1">
            <h3 style="font-weight: 600;">{{ programmeDetail?.programe }}</h3>
            <h6>{{ computedDateTime }}</h6>
          </a-col>
          <a-col>
            <a-button type="text" shape="circle" style="width: 32; height: 32;" @click="backToPreviousPage">
              <svg style="font-size: 28px;" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 1.5C6.15 1.5 1.5 6.15 1.5 12C1.5 17.85 6.15 22.5 12 22.5C17.85 22.5 22.5 17.85 22.5 12C22.5 6.15 17.85 1.5 12 1.5ZM16.05 17.25L12 13.2L7.95 17.25L6.75 16.05L10.8 12L6.75 7.95L7.95 6.75L12 10.8L16.05 6.75L17.25 7.95L13.2 12L17.25 16.05L16.05 17.25Z"
                  fill="currentColor" />
              </svg>
            </a-button>
          </a-col>
        </a-row>
        <h6 style="line-height: 1.4;">Joined Participants: <b>{{ programmeDetail?.totalParticipants }}</b></h6>
        <h6 style="line-height: 1.4;">Venue: <b>{{ programmeDetail?.venue }}</b></h6>
        <h6 style="line-height: 1.4;">Dress Code: <b>{{ programmeDetail?.dress_code }}</b></h6>
        <br />
        <h6 style="line-height: 1.4;">Leader: <b>{{ programmeDetail?.leader }}</b></h6>
        <div>
          <h6 style="line-height: 1.4; display: inline;">Participles: </h6>
          <a-tag v-for="(item, index) in programmeDetail?.participants" :key="index">{{ item[0] }}</a-tag>
        </div>
        <h6 style="line-height: 1.4;">Head Point: <b>{{ programmeDetail?.headpoint }}</b></h6>
        <h6 style="line-height: 1.4;">Target Head Point: <b>{{ programmeDetail?.headpoint }} / {{
        programmeDetail?.targetjbeheadpoint }}</b></h6>
        <h6 style="line-height: 1.4;">Winning Point: <b>{{ programmeDetail?.winningpoint }}</b></h6>
        <h6 style="line-height: 1.4;">Target Winning Point: <b>{{ programmeDetail?.headpoint }} / {{
        programmeDetail?.targetjbewinningpoint }}</b></h6>
        <h6 style="line-height: 1.4;">Minimum Participants: <b>{{ programmeDetail?.minparticipant }}</b></h6>
        <h6 style="line-height: 1.4;">Only President: <a-checkbox :checked="programmeDetail?.onlypresident == 'TRUE'"
            readonly></a-checkbox></h6>
        <h6>Remark:</h6>
        <p>{{ programmeDetail?.remark ?? '~ No Remark ~' }}</p>

        <a-row v-if="!hasExpired" :gutter="16" style="padding-top: 16px;">
          <a-col v-if="programmeDetail?.joined == true" flex="1">
            <a-button style="width: 100%;" type="default" size="large" @click="toggleJoin(false)">Unjoin</a-button>
          </a-col>
          <a-col v-else-if="programmeDetail?.joined == false" flex="1">
            <a-button style="width: 100%;" type="primary" size="large" @click="toggleJoin(true)">Join</a-button>
          </a-col>
        </a-row>
        <h3 v-else style="margin-top: 24px; font-weight: 700;">The event has expired</h3>
      </a-card>
      <div v-else style="padding: 16px;">
        <a-spin size="large"></a-spin>
      </div>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>