<template>
  <div id="app">
    <input class="input--create" type="text" v-model="text" v-autofocus @keyup.enter="addItem" placeholder="Tap Here To Add A New Task...">
    <div class="container">
      <div class="filter" v-if="todos.length > 0">
        <a href="#" :class="{selected: show == 'all'}" @click="show = 'all'">All</a>
        <a href="#" :class="{selected: show == 'active'}" @click="show = 'active'">Active</a>
        <a href="#" :class="{selected: show == 'completed'}" @click="show = 'completed'">Completed</a>
        <a href="#" :class="{selected: show == 'search'}" @click="show = 'search'">Filter</a>
        <div class="right">
          <a href="#" @click="allCompleted">Check All</a>
          <span>{{ filtredTodo.length | pluralize }}</span>
        </div>
      </div>
      <ul class="todoList" :key="show">
        <input type="text" class="filter--input" v-model="search" v-if="show == 'search'" placeholder="Search A Task..." v-autofocus>
        <li v-for="item in filtredTodo" :key="item.id" :class="{completed: item.completed}" @dblclick.prevent="completedTask(item.id)">
          <i class="material-icons completed--icon" v-if="item.completed">done</i>
          {{ item.task | capitalize}}
          <div class="modify">
            <i class="material-icons edit--icon" @click="editTodo(item)">edit</i>
            <i class="material-icons remove--icon" @click="removeTask(item.id)">close</i>
          </div>
          <input class="edit--input" :class="{completed: item.completed}" type="text" v-model="item.task" v-val="item.task" @keyup.esc="cancelEdit(item)" @keyup.enter="triggerEdit(item)" @focus="editTodo(item)" @blur="triggerEdit(item)" v-if="editedTodo == item" @dblclick.stop v-autofocus>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var STORAGE_KEY = "cabuya-todo-vuejs"
var todoStorage = {
  getTodoList () {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    // reset id of each Item
    data.forEach((item, index) => item.id = index)
    return data
  },
  save (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

var autofocus = {
  inserted (el, binding, vnode) {
    el.focus()
  }
}

export default {
  data () {
    return {
      message: 'Todo App',
      text: '',
      todos: todoStorage.getTodoList(),
      newId: todoStorage.getTodoList().length,
      show: 'all',
      search: null,
      editedTodo: null,
    }
  },
  watch: {
    todos: {
      handler () {
        todoStorage.save(this.todos)
      },
      deep: true
    }
  },
  
  computed: {
    
    activeTasks () {
      return this.todos.filter(todo => !todo.completed)
    },
    
    completedTasks () {
      return this.todos.filter(todo => todo.completed)
    },
    
    filtredTasks () {
      return this.todos.filter(todo => {
        return todo.task.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    },
    
    filtredTodo () {
      
      if (this.show === 'search' && this.search) { return this.filtredTasks }
      if (this.show == 'completed') { return this.completedTasks }
      if (this.show == 'active') { return this.activeTasks }
      return this.todos
    },
    
    AllTasksCompleted () {
      return this.activeTasks.length === 0
    }
    
  },
  
  methods: {
    addItem () {
      if( this.text.trim() != ""){
        this.todos.push(
          {
            id: this.newId++,
            task: this.text,
            completed: false
          }
        )
        this.text = ''
      }
    },
    
    completedTask (id) {
      let currentTask = this.todos.find(todo => todo.id === id)
      currentTask.completed = !currentTask.completed
    },
    
    removeTask (id) {
      let currentTaskIndex = this.todos.findIndex(todo => todo.id === id)
      this.todos.splice(currentTaskIndex, 1)
    },
    
    allCompleted () {
      let AllTasksCompleted = this.AllTasksCompleted
      this.todos.forEach(todo => todo.completed = !AllTasksCompleted)
      
    },
    
    editTodo (todo) {
      this.titleBeforeEdit = todo.task
      this.editedTodo = todo
    },
    
    cancelEdit (todo) {
      todo.task = this.titleBeforeEdit
      this.editedTodo = null
    },
    
    triggerEdit (todo) {
      if (todo.task == "") {
        this.removeTask(todo.id)
      }
      todo.task = todo.task.trim()
      this.editedTodo = null
    }
  },
  filters: {
    pluralize (val) {
      return val === 1 ? val + ' Course' : val + ' Courses'
    },
    capitalize (val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  },
  directives: {
    autofocus
  }
}

</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Quicksand:500,700');
@import url('https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css');
@import './assets/style.scss'
</style>
