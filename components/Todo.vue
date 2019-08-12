<template>
  <div id="todo">
    <div class="w-full">
      <transition-group
        name="list-complete"
        tag="ul"
        class="flex flex-col bg-gray-200"
      >
        <li
          v-for="(item, index) in items"
          :key="item.id"
          class="flex list-complete-item text-center px-2 py-2 mx-0 my-2"
        >
          <label
            class="w-9/12 my-auto"
            :class="{ done: item.isChecked, hide: item.isEditing }"
          >
            <input
              v-if="item"
              v-model="item.isChecked"
              type="checkbox"
              @change="updateCheckedCount"
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
          <div class="w-auto my-auto" :class="{ hide: item.isEditing }">
            <button
              :disabled="isItemEditing"
              :class="{ 'opacity-50': isItemEditing }"
              class="bg-green-500 hover:bg-green-700 text-white px-2 py-2 mx-2 rounded"
              @click="showEditMode(index)"
            >
              編集
            </button>
          </div>
        </li>
      </transition-group>
      <div class="m-2">
        <button :disabled="!checkedCount" @click="deleteTodo()">
          チェック済みの項目をアーカイブする
        </button>
        <div
          class="flex items-center border-2 borader-tead-500 rounded-lg py-2"
        >
          <input
            v-model="newItemTitle"
            type="text"
            placeholder="タスクを入力してください"
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
export default {
  data() {
    return {
      isItemConfirmed: false,
      isItemEditing: false,
      checkedCount: 0,
      newItemTitle: '',
      items: []
    }
  },
  mounted() {
    this.loadTodo()
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
        isEditing: false
      })
      this.newItemTitle = ''
      this.isItemConfirmed = false

      this.saveTodo()
    },
    saveTodo() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    showEditMode(_index) {
      console.log(_index)
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
      this.items = this.items.filter(function(item) {
        return item.isChecked === false
      })
      this.saveTodo()
    },
    loadTodo() {
      this.items = JSON.parse(localStorage.getItem('items'))
      if (!this.items) {
        this.items = []
      }
    },
    updateCheckedCount() {
      const checked = this.items.filter(function(item) {
        return item.isChecked === true
      })
      this.checkedCount = checked.length
    },
    confirmMessage() {
      this.isItemConfirmed = true
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
.edit-button-box {
  /* display: inline-block; */
}
</style>
