<template>
  <ul class="flex border-b m-2">
    <li
      :class="{ '-mb-px': selected === 0 }"
      class="mr-1"
      @click="switchTabs(0)"
    >
      <nuxt-link
        to="/"
        :class="{ active: selected === 0 }"
        class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
        >活動</nuxt-link
      >
    </li>
    <li
      :class="{ '-mb-px': selected === 1 }"
      class="mr-1"
      @click="switchTabs(1)"
    >
      <nuxt-link
        to="/archive"
        :class="{ active: selected === 1 }"
        class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
        >記録</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    selected: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedIndex: null
    }
  },
  methods: {
    switchTabs(idx) {
      console.log(idx)
      this.selectedIndex = idx
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
