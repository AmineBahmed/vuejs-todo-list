<template>
  <div id="app">
    <div class="background"></div>
    <input class="input--create" type="text" v-model="text" v-autofocus @keyup.enter="addItem" placeholder="Tap Here To Add A New Task...">
    <div class="container">
      <!-- filter buttons -->
      <div class="filter" v-if="todos.length > 0">
        <a href="#/" :class="{selected: show == 'all'}" @click="show = 'all'">All</a>
        <a href="#/" :class="{selected: show == 'active'}" @click="show = 'active'">Active</a>
        <a href="#/" :class="{selected: show == 'done'}" @click="show = 'done'">Done</a>
        <a href="#/" :class="{selected: show == 'search'}" @click="show = 'search'">Filter</a>
        <div class="right">
          <a href="#" @click="allCompleted">Check All</a>
          <span>{{ filtredTodo.length | pluralize('Task') }}</span>
        </div>
      </div> <!-- end filter buttons -->
      <transition name="fade" mode="out-in">
        <ul class="todoList" :key="show">
          <input type="text" class="filter--input" v-model="search" v-if="show == 'search' && todos.length > 0" placeholder="Search A Task..." v-autofocus>
          <task :todoList="todos" :todo="item" v-for="item in filtredTodo" :key="item.id"></task>
        </ul>
      </transition>
    </div>
    <footer>
      <p>Designed & Developed By Amine Bahmed</p>
    </footer>
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

import task from '@/components/task'

export default {
  data () {
    return {
      text: '',
      todos: todoStorage.getTodoList(),
      newId: todoStorage.getTodoList().length,
      show: 'all',
      search: '',
    }
  },
  components: {
    task
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
      switch (this.show) {
        case ('search'): return this.filtredTasks
        case ('done'): return this.completedTasks
        case ('active'): return this.activeTasks
        default: return this.todos
      }
    },
    AllTasksCompleted () {
      return this.activeTasks.length === 0
    }
  },
  methods: {
    addItem () {
      if( this.text.trim() != ""){
        this.todos.unshift(
          {
            id: this.newId++,
            task: this.text,
            completed: false
          }
        )
        this.text = ''
      }
    },
    allCompleted () {
      let AllTasksCompleted = this.AllTasksCompleted
      this.todos.forEach(todo => todo.completed = !AllTasksCompleted)
    }
  }
}

</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Quicksand:500');
@import url('https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css');
@import './assets/style.scss';

footer p {
  text-align: center;
  color: white;
  font-size: 13px;
}
</style>
