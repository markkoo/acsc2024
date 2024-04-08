<template>
  <div class="select-user-page">
    <div class="container"
      style="display: flex; flex-direction: column; justify-content: center; align-items: stretch; height: 100vh;">
      <img :src="LogoImage" alt="JCI" style="width: 100px; height: 100px; margin: 0 auto;">

      <h1 style="text-align: center; padding-top: 16px;">Welcome</h1>

      <div style="padding: 16px 0; width: 100%;">
        <a-form :layout="'vertical'" :model="formState" @finish="onSubmit">
          <a-form-item label="Select your name" name="member"
            :rules="[{ required: true, message: 'This field is required' }]">
            <a-select v-model:value="formState.member" style="width: 100%;" :disabled="isLoading">
              <a-select-option :value="null">Pick an option</a-select-option>
              <a-select-option v-for="(item, index) in members" :key="index" :value="item.Name">
                {{ item.Name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Enter PIN code" name="pin"
            :rules="[{ required: true, message: 'This field is required' }]">
            <a-input-password v-model:value="formState.pin" :disabled="isLoading"></a-input-password>
          </a-form-item>

          <a-button type="primary" html-type="submit" style="width: 100%; margin-top: 16px;" :disabled="isLoading">{{
            isLoading ? 'Please wait ...' : 'Continue'}}</a-button>
        </a-form>
      </div>


      <p style="margin-top: 16px; text-align: center;">Power By Mark Koo (<a :href="dm('+60167281563')"
          target="_blank">016-7281563</a>)
        <br />From Zeta Web Solutions
      </p>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>