<template>
	<li class="todo--item" :class="{completed: todo.completed}" @dblclick.prevent="completeTask(todo)">
    <i class="material-icons completed--icon" v-if="todo.completed">done</i>
    {{ todo.task | capitalize}}
    <div class="list--options">
      <i class="material-icons edit--icon" @click="editTodo(todo)">edit</i>
      <i class="material-icons remove--icon" @click="removeTask(todo.id)">close</i>
    </div>
    <input class="edit--input" :class="{completed: todo.completed}" type="text" v-model="todo.task" @keyup.esc="cancelEdit(todo)" @keyup.enter="triggerEdit(todo)" @focus="editTodo(todo)" @blur="triggerEdit(todo)" v-if="editedTodo == todo" @dblclick.stop v-autofocus>
  </li>
</template>

<script type="text/javascript">
export default {
	name: 'Task',
	data () {
		return {
      todoList: this.$parent.todos,
			editedTodo: null
		}
	},
	props: ['todo'],
	methods: {
    completeTask (todo) {
      todo.completed = !todo.completed
    },
    removeTask (id) {
      let currentTaskIndex = this.todoList.findIndex(todo => todo.id === id)
      this.todoList.splice(currentTaskIndex, 1)
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
  }
}
</script>

<style lang="scss">
$green: #8BC34A;
.todo--item {
  position: relative;
  background-color: transparentize(white, 0.8);
  list-style: none;
  font-size: 0.97rem;
  line-height: 20px;
  margin-bottom: 8px;
  padding: 20px 50px 20px 35px;
  border-radius: 3px;
  color: white;
  box-shadow: 0 0 2px gray;
  &:hover .list--options {
    display: block;
  }
}
.completed {
  background-color: transparentize($green, 0.2) !important;
  color: white !important;
  &.todo--item {
    padding-left: 5px !important;
  }
  &.edit--input {
    background-color: darken($green, 10%) !important; 
  }
}
.list--options {
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -10px;
  display: none;
}
.edit--input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 0.95rem;
  background: white;
  color: black;
}
.completed--icon, .edit--icon, .remove--icon {
  line-height: 20px;
  vertical-align: top;
  font-size: 20px;
  padding-left: 5px;
}
</style>