<template>
  <div id="todo" class="w-full">
    <tab-menu :selected="tabIndex" />
    <h1 class="text-xl font-semibold mx-3 my-2 text-gray-700">
      活動
    </h1>
    <div class="mx-3">
      <div :class="{ hidden: !(items.length === 0) }" class="bg-gray-200">
        <p
          class="block text-center text-gray-700 text-xl pt-6 pb-3 px-6 font-bold"
        >
          {{ blankMessage }}
        </p>
        <p class="text-center text-gray-500 pb-3">
          今日はなにをしましたか？記録を残しましょう
        </p>
      </div>
      <transition-group
        name="list-complete"
        tag="ul"
        class="flex flex-col bg-gray-200"
        :class="{ 'h-screen': isItemEditing }"
      >
        <li
          v-for="(item, index) in items"
          :key="item.id"
          class="flex list-complete-item text-center px-2 py-2 mx-0 m-2"
        >
          <label
            class="w-9/12 my-auto text-left"
            :class="{ done: item.isChecked, hide: isItemEditing }"
          >
            <input
              v-if="item"
              v-model="item.isChecked"
              type="checkbox"
              @change="checkItem"
            />
            {{ item.title }}
          </label>
          <label class="w-full my-auto" :class="{ hide: !item.isEditing }">
            <input
              id=""
              v-model="item.title"
              type="text"
              name=""
              class="w-full mr-3 py-1 px-2"
              @keyup.enter="editTodo(index)"
              @keypress="confirmMessage"
            />
            <div class="w-auto inline-block"></div>
          </label>
          <div class="w-auto my-auto">
            <button
              :disabled="isItemEditing"
              :class="{ hide: isItemEditing }"
              class="bg-green-500 hover:bg-green-700 text-white px-2 py-2 mx-2 rounded"
              @click="showEditMode(index)"
            >
              編集
            </button>
          </div>
        </li>
      </transition-group>
      <div class="text-center m-2" :class="{ hide: isItemEditing }">
        <button
          :class="{ hide: !checkedCount }"
          class="bg-yellow-500 text-white px-2 py-2 m-2 rounded"
          @click="deleteTodo()"
        >
          記録する
        </button>
        <div
          class="flex items-center border-2 borader-tead-500 rounded-lg py-2"
        >
          <input
            v-model="newItemTitle"
            type="text"
            placeholder="映画をみた 植木に水をやった プレゼントを買ったなど"
            class="appearance-none bg-transparent borde-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            @keyup.enter="addTodo"
            @keypress="confirmMessage"
          />
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
      blankMessage: 'あなたの活動を記録しましょう',
      isItemConfirmed: false,
      isItemEditing: false,
      checkedCount: 0,
      newItemTitle: '',
      items: [],
      archiveItems: [],
      tabIndex: 0
    }
  },
  mounted() {
    this.loadTodo()
    this.loadArchive()
    this.updateCheckedCount()
  },
  methods: {
    addTodo() {
      if (!this.newItemTitle) {
        return
      }
      if (!this.isItemConfirmed) {
        return
      }
      const date = new Date()
      const now = date.getTime()

      this.items.push({
        id: now,
        title: this.newItemTitle,
        isChecked: false,
        isArchived: false,
        archivedDate: '',
        isEditing: false
      })
      this.newItemTitle = ''
      this.isItemConfirmed = false

      this.saveTodo()
    },
    saveTodo() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    addArchive() {
      if (!this.checkedCount) {
        return
      }

      const addItems = this.items.filter(function(item) {
        return item.isChecked === true
      })

      if (addItems) {
        addItems.forEach((item, index) => {
          item.archivedDate = this.getToday()

          this.archiveItems.push(item)
        })
      }

      this.saveArchive()
    },
    saveArchive() {
      this.archiveItems.forEach((item, index) => {
        item.isArchived = true
        item.isChecked = false
      })

      localStorage.setItem('archiveItems', JSON.stringify(this.archiveItems))
    },
    showEditMode(_index) {
      if (this.isItemEditing) {
        return
      }
      this.items[_index].isEditing = true
      this.isItemEditing = true
      this.isItemConfirmed = false
    },
    editTodo(_index) {
      if (!this.isItemConfirmed) {
        return
      }
      this.items[_index].isEditing = false
      this.isItemEditing = false
      this.saveTodo()
    },
    deleteTodo() {
      this.addArchive()

      this.items = this.items.filter(function(item) {
        return item.isArchived === false
      })
      this.updateCheckedCount()
      this.saveTodo()
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
    checkItem() {
      this.updateCheckedCount()
      this.saveTodo()
    },
    updateCheckedCount() {
      const checked = this.items.filter(function(item) {
        return item.isChecked === true
      })
      this.checkedCount = checked.length
    },
    confirmMessage() {
      this.isItemConfirmed = true
    },
    getToday() {
      const date = new Date()
      const y = date.getFullYear()
      const m = ('00' + (date.getMonth() + 1)).slice(-2)
      const d = ('00' + date.getDate()).slice(-2)
      return y + m + d
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
