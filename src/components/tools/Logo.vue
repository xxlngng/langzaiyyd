<template>
  <div class="logo" style="padding-left: 10px;background: #428aff;position: fixed;width: 100%;">
    <!-- <router-link :to="{ path: '/' }"> -->
      <!-- <LogoSvg alt="logo" /> -->
      <!-- <h3 v-if="showTitle" style="display:inline-block;color:#fff">综维优一体化平台</h3> -->
      <img style="height:64px;width:160px" src="../../assets/nm.png" alt="logo">
    <!-- </router-link> -->
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: process.env.VUE_APP_ProjectName,
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
