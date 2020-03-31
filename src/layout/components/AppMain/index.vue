<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <keep-alive :include="cacheRouters">
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "AppMain",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['cacheRouters']),

    key() {
      return this.$route.path
    }
  },
  watch: {
    '$route.path'() {
      this.$store.dispatch('permission/addCacheRouter', this.$route)
    }
  }

};
</script>