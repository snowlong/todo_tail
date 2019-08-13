<template>
  <div id="archive" class="w-full my-3">
    <h1 class="text-xl font-semibold m-2 text-black-500">アーカイブ</h1>
    <div>
      <transition-group
        name="list-complete"
        tag="ul"
        class="flex flex-col bg-gray-300"
        :class="{ 'h-screen': isItemEditing }"
      >
        <li
          v-for="item in archiveItems"
          :key="item.id"
          class="flex list-complete-item text-center px-2 py-2 mx-0 my-2"
        >
          <label
            class="w-9/12 my-auto text-left"
            :class="{ done: item.isChecked, hide: isItemEditing }"
          >
            <input
              v-if="item"
              v-model="item.isChecked"
              type="checkbox"
              @change="updateCheckedCount"
            />
            {{ item.title }}
          </label>
        </li>
      </transition-group>
      <div class="text-center m-2" :class="{ hide: isItemEditing }">
        <button
          :class="{ hide: !checkedCount }"
          class="bg-green-500 text-white px-2 py-2 m-2 rounded"
          @click="restoreArchive()"
        >
          戻す
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isItemConfirmed: false,
      isItemEditing: false,
      checkedCount: 0,
      newItemTitle: '',
      items: [],
      archiveItems: [],
      restoreItems: []
    }
  },
  mounted() {
    this.loadTodo()
    this.loadArchive()
  },
  methods: {
    deleteArchive() {
      localStorage.setItem('items', JSON.stringify(this.items))
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
    }
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}
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
