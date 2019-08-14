<template>
  <ul class="flex border-b m-2">
    <li
      :class="{ '-mb-px': selectedIndex === 0 }"
      class="mr-1"
      @click="switchTabs(0)"
    >
      <nuxt-link
        to="/"
        :class="{ active: selectedIndex === 0 }"
        class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
        >やること</nuxt-link
      >
    </li>
    <li
      :class="{ '-mb-px': selectedIndex === 1 }"
      class="mr-1"
      @click="switchTabs(1)"
    >
      <nuxt-link
        to="/archive"
        :class="{ active: selectedIndex === 1 }"
        class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
        >完了</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0
    }
  },
  created() {
    this.getSelected()
  },
  methods: {
    switchTabs(idx) {
      console.log(idx)
      this.selectedIndex = idx
    },
    getSelected() {
      console.log(this.$route.path)
      switch (this.$route.path) {
        case '/':
          this.selectedIndex = 0
          break

        case '/archive':
          this.selectedIndex = 1
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
.active {
  @apply border-l border-t border-r rounded-t py-2 px-4 text-blue-700;
}
a {
  text-decoration: none;
}
</style>
