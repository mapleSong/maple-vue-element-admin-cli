<template>
  <div :class="classObj" class="app-wrapper">
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
    <sidebar class="sidebar-container" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Sidebar, Navbar, AppMain } from "./components";
export default {
  data() {
    return {};
  },
  components: { Sidebar, Navbar, AppMain },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      };
    }
  }
};
</script>
