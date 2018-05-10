<template>
  <div id="app">
    <div class="background--image"></div>
    <todo-list :todos="todos"></todo-list>
    <footer>
      <p>Designed & Developed By Amine Bahmed</p>
    </footer>
  </div>
</template>

<script>

// store data in browser localStorage
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

import todoList from '@/components/todoList'

export default {
  data () {
    return {
      todos: todoStorage.getTodoList(),
    }
  },
  components: {
    todoList
  },
  watch: {
    todos: {
      handler () {
        todoStorage.save(this.todos)
      },
      deep: true
    }
  }
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Quicksand:500');
@import url('https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css');
html, body {
  height: 100%;
  margin: 0;
  * {
    font-family: 'Quicksand', sans-serif;
    box-sizing: border-box;
  }
}
#app {
  position: relative;
  top: 80px;
  padding: 15px;
  width: 100%;
  max-width: 600px;
  margin: auto;
  font-size: 16px;
}
.background--image {
  position: fixed;
  top:-50px;
  left:-50px;
  right:-50px;
  bottom: -50px;
  background-size: cover;
  background-position: center;
  background-color: #673AB7;
  background-image: url("./assets/pexels-photo-1027393.jpeg");
  filter: blur(10px);
  z-index: -1;
}
input {
  color: white;
  width: 100%;
  height: 60px;
  background: transparentize(white, 0.8);
  font-size: 20px;
  padding: 0 20px;
  border: none;
  border-radius: 3px;
  outline: none;
  margin-bottom: 10px;
}
input::placeholder {
  color: transparentize(white, 0.3);
}
input::-moz-placeholder {
  color: white;
}
input:-moz-placeholder {
  color: white;
}
footer p {
  text-align: center;
  color: white;
  font-size: 13px;
}
</style>
