<template>
  <div class="programme-list-page">
    <div class="container" style="padding-left: 0; padding-right: 0">
      <a-card title="Members">
        <a-form layout="vertical" :model="searchState">
          <a-row align="stretch">
            <a-col flex="1">
              <a-form-item label="" name="member">
                <a-select v-model:value="searchState.member" allow-clear>
                  <a-select-option :value="null">Please Your Name</a-select-option>
                  <a-select-option
                    v-for="(item, index) in memberOptions"
                    :key="index"
                    :value="item.Name"
                    >{{ index + 1 }}. {{ item.Name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <!-- Member not angle datas -->
        <div v-if="searchState.member !== null">
          <div v-for="(item, index) in computedMembers" :key="index">
            <b>Day {{ item.Day }} : {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
            <span class="clamp-1">{{ item.Programe }}</span>
          </div>
        </div>
        <br />
        <!-- 1 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: VP Alex</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers1.length > 0">
            <div
              v-for="(item, index1) in computedMembers1"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 2 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: Blue Chua</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers2.length > 0">
            <div
              v-for="(item, index1) in computedMembers2"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 3 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: VP Jayden Lim</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers3.length > 0">
            <div
              v-for="(item, index1) in computedMembers3"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 4 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: Hannah</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers4.length > 0">
            <div
              v-for="(item, index1) in computedMembers4"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 5 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: SG Lina</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers5.length > 0">
            <div
              v-for="(item, index1) in computedMembers5"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 6 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: HT Brian Wong</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers6.length > 0">
            <div
              v-for="(item, index1) in computedMembers6"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 7 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: Boon Jie</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers7.length > 0">
            <div
              v-for="(item, index1) in computedMembers7"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 8 -->
        <div
          style="
            overflow: auto;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #dadada;
            margin-bottom: 10px;
          "
        >
          <h4 style="margin-left: 5px">Angel: VP Cheah</h4>
          <div
            style="
              display: flex;
              align-items: center;
              position: sticky;
              top: 0;
              background-color: white;
              border-bottom: 1px solid #dadada;
              width: fit-content;
              font-size: 12px;
            "
          >
            <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Name</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Available Time</span>
            </div>
            <div style="flex: 1 0 150px; max-width: 150px; width: 150px; padding: 8px 8px">
              <span style="font-weight: bold; white-space: nowrap">Programme</span>
            </div>
          </div>
          <div v-if="computedMembers8.length > 0">
            <div
              v-for="(item, index1) in computedMembers8"
              :key="index1"
              class="table-row"
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #dadada;
                width: fit-content;
              "
            >
              <div style="flex: 1 0 100px; max-width: 100px; width: 100px; padding: 8px 8px">
                <span class="clamp-1">{{ item.Name }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  word-wrap: break-word;
                  line-height: 1.1;
                "
              >
                <span>{{ item.AvailableTime }}</span>
              </div>
              <div
                style="
                  flex: 1 0 150px;
                  max-width: 150px;
                  width: 150px;
                  padding: 8px 8px;
                  display: flex;
                  flex-direction: column;
                "
              >
                <b>D{{ item.Day }} {{ item['Start Time'] }} - {{ item['End Time'] }}</b>
                <span class="clamp-1">{{ item.Programe }}</span>
              </div>
            </div>
          </div>
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
  font-size: 12px !important;
}

.table-row {
  background-color: white;
  font-size: 12px !important;

  &:nth-of-type(2n + 1) {
    background-color: #fafafa;
  }
}
</style>