<template>
  <div id="archive" class="w-full">
    <tab-menu :selected="tabIndex" />
    <h1 class="text-xl font-semibold mx-3 my-2 text-gray-700">日付別</h1>
    <div class="mx-3">
      <div :class="{ hidden: !(archiveItems.length === 0) }">
        <p class="block text-center text-gray-700 text-xl p-6 font-bold">
          {{ blankMessage }}
        </p>
      </div>
      <div
        v-for="itemList in getArchiveItems"
        :key="itemList.archivedDate"
        sticky-container
      >
        <p v-sticky class="bg-white pt-3 pb-4">
          {{ itemList.archivedDate }}に活動
        </p>
        <transition-group name="list-complete" tag="ul" class="flex flex-col">
          <li
            v-for="item in itemList.archives"
            :key="item.id"
            class="list-complete-item w-full text-left"
          >
            <p class="block bg-gray-200 p-4">
              <label :class="{ done: item.isChecked }">
                <input
                  v-if="item"
                  v-model="item.isChecked"
                  type="checkbox"
                  @change="updateCheckedCount"
                />
                {{ item.title }}
              </label>
            </p>
          </li></transition-group
        >
        <div class="text-center m-2">
          <button
            :class="{ hide: !checkedCount }"
            class="bg-green-500 text-white px-2 py-2 m-2 rounded"
            @click="restoreArchive()"
          >
            戻す
          </button>
          <button
            :class="{ hide: !checkedCount }"
            class="bg-red-500 text-white px-2 py-2 m-2 rounded"
            @click="deleteArchive()"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabMenu from '~/layouts/TabMenu.vue'

export default {
  components: {
    TabMenu
  },
  data() {
    return {
      blankMessage: '',
      isItemConfirmed: false,
      isItemEditing: false,
      checkedCount: 0,
      newItemTitle: '',
      items: [],
      archiveItems: [],
      restoreItems: [],
      tabIndex: 1
    }
  },
  computed: {
    getArchiveItemOrderByDate() {
      return _.orderBy(this.archiveItems, ['archivedDate'], ['desc'])
    },
    getArchiveItems() {
      return _.chain(this.archiveItems)
        .groupBy('archivedDate')
        .map((archives, archivedDate) => ({ archivedDate, archives }))
        .orderBy((group) => Number(group.archivedDate), ['desc'])
        .value()
    }
  },
  mounted() {
    this.loadTodo()
    this.loadArchive()
    this.updateBlankMessege()
  },
  methods: {
    deleteArchive() {
      this.archiveItems = this.archiveItems.filter(function(item) {
        return item.isChecked === false
      })
      this.updateCheckedCount()
      this.saveArchive()
    },
    restoreArchive() {
      this.restoreItems = this.archiveItems.filter(function(item) {
        return item.isChecked === true
      })
      this.archiveItems = this.archiveItems.filter(function(item) {
        return item.isChecked === false
      })
      this.restoreItems.forEach((item, index) => {
        item.isArchived = false
        item.isChecked = false
      })

      this.updateCheckedCount()
      this.saveTodo()
      this.saveArchive()
    },
    saveTodo() {
      this.restoreItems.forEach((item, index) => {
        this.items.push(item)
      })
      localStorage.setItem('items', JSON.stringify(this.items))
      this.restoreItems = []
    },
    saveArchive() {
      localStorage.setItem('archiveItems', JSON.stringify(this.archiveItems))
    },
    loadArchive() {
      this.archiveItems = JSON.parse(localStorage.getItem('archiveItems')) || []

      if (this.archiveItems) {
        this.archiveItems.forEach((item, index) => {
          item.isChecked = false
        })
      }
    },
    loadTodo() {
      this.items = JSON.parse(localStorage.getItem('items')) || []
    },
    updateCheckedCount() {
      const checked = this.archiveItems.filter(function(item) {
        return item.isChecked === true
      })
      this.checkedCount = checked.length
    },
    updateBlankMessege() {
      this.blankMessage = 'ここにあなたの活動が記録されます'
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
.done {
  text-decoration: line-through;
}
.hide {
  display: none !important;
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
