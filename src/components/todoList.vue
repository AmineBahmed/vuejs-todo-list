<template>
  <div class="todo--list">
    <input class="input--create" type="text" v-model="text" v-autofocus @keyup.enter="addItem" placeholder="Tap Here To Add A New Task...">
    <div class="list--container">
      <!-- filter buttons -->
      <div class="filter" v-if="todos.length > 0">
        <a href="#/" :class="{selected: show === 'all'}" @click="show = 'all'">All</a>
        <a href="#/" :class="{selected: show === 'active'}" @click="show = 'active'">Active</a>
        <a href="#/" :class="{selected: show === 'done'}" @click="show = 'done'">Done</a>
        <a href="#/" :class="{selected: show === 'search'}" @click="show = 'search'">Filter</a>
        <div class="right">
          <a href="#" @click="allCompleted">Check All</a>
          <span>{{ filtredTodo.length | pluralize('Task') }}</span>
        </div>
      </div> <!-- end filter buttons -->
      <transition name="fade" mode="out-in">
        <ul :key="show">
          <input type="text" class="filter--input" v-model="search" v-if="show == 'search' && todos.length > 0" placeholder="Search A Task..." v-autofocus>
          <todo-item :todo="task" v-for="task in filtredTodo" :key="task.id"></todo-item>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import todoItem from '@/components/todoItem'
export default {
  props: ['todos'],
  data () {
    return {
      newId: this.todos.length,
      text: '',
      show: 'all',
      search: '',
    }
  },
  components: {
    todoItem
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
.list--container {
  position: relative;
  padding: 15px;
  padding-bottom: 5px;
  border-radius: 3px;
  margin-bottom: 100px;
  user-select: none;
  @media only screen and (max-width: 480px) {
    padding-left: 0;
    padding-right: 0;
  }
}
ul {
  margin: 0;
  padding: 0;
}
.filter {
  a {
    font-size: 13px;
    background: transparentize(white, 0.6);
    color: white;
    padding: 6px 10px;
    display: inline-block;
    border-radius: 2px;
    margin-bottom: 10px;
    text-decoration: none;
    outline: none;
  }
  .right {
    float: right;
    @media only screen and (max-width: 480px) {
      float: none;
    }
    span {
      color: white;
      padding-left: 10px;
    }
  }
}
.filter--input {
  height: 50px;
  font-size: 1rem;
}
.selected {
  background: transparentize(white, 0.8) !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
