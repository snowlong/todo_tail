<template>
  <nav class="flex items-center justify-between flex-wrap bg-green-500 p-6">
    <div
      class="flex items-center flex-shrink-0 text-white mr-6"
      @click="toggleMenu"
    >
      <span class="font-semibold text-xl tracking-tight">Recorize Me</span>

      <!-- <svg
        :class="{ hidden: !isMenuHidden }"
        class="fill-current h-6 w-6 ml-2 lg:hidden"
        width="74px"
        height="74px"
        viewBox="0 0 74 74"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Group"
            transform="translate(2.000000, 2.000000)"
            fill-rule="nonzero"
          >
            <circle
              id="Oval"
              stroke="#FFFFFF"
              stroke-width="4"
              cx="35"
              cy="35"
              r="35"
            ></circle>
            <path
              id="Triangle"
              d="M35.6731344,30.4080842 L53.0889248,46.2604798 C53.4973506,46.6322416 53.5270725,47.2647086 53.1553107,47.6731344 C52.9658047,47.8813298 52.6973182,48 52.4157905,48 L17.5842095,48 C17.0319248,48 16.5842095,47.5522847 16.5842095,47 C16.5842095,46.7184723 16.7028797,46.4499858 16.9110752,46.2604798 L34.3268656,30.4080842 C34.7084241,30.0607779 35.2915759,30.0607779 35.6731344,30.4080842 Z"
              fill="#FFFFFF"
              transform="translate(35.000000, 39.000000) scale(1, -1) translate(-35.000000, -39.000000) "
            ></path>
          </g>
        </g>
      </svg> -->
    </div>
    <!-- <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div> -->
    <div
      :class="{ hidden: isMenuHidden }"
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto"
    >
      <!-- <div class="text-sm lg:flex-grow">
        <nuxt-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >やること</nuxt-link
        >
        <nuxt-link
          to="/archive"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >完了</nuxt-link
        >
      </div> -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuHidden: true
    }
  },
  methods: {
    toggleMenu(e) {
      this.isMenuHidden = !this.isMenuHidden
    }
  }
}
</script>

<style scoped></style>
