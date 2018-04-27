<template>
	<li :class="{completed: todo.completed}" @dblclick.prevent="completeTask(todo)">
    <i class="material-icons completed--icon" v-if="todo.completed">done</i>
    {{ todo.task | capitalize}}
    <div class="modify">
      <i class="material-icons edit--icon" @click="editTodo(todo)">edit</i>
      <i class="material-icons remove--icon" @click="removeTask(todo.id)">close</i>
    </div>
    <input class="edit--input" :class="{completed: todo.completed}" type="text" v-model="todo.task" v-val="todo.task" @keyup.esc="cancelEdit(todo)" @keyup.enter="triggerEdit(todo)" @focus="editTodo(todo)" @blur="triggerEdit(todo)" v-if="editedTodo == todo" @dblclick.stop v-autofocus>
   </li>
</template>

<script type="text/javascript">
export default {
	name: 'Task',
	data () {
		return {
			editedTodo: null
		}
	},
	props: ['todo', 'todoList'],
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
	
</style>