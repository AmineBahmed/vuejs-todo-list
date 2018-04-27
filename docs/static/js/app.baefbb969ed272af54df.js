webpackJsonp([1],{"2h3m":function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o("7+uW"),n=o("mvHQ"),i=o.n(n),a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("li",{class:{completed:t.todo.completed},on:{dblclick:function(e){e.preventDefault(),t.completeTask(t.todo)}}},[t.todo.completed?o("i",{staticClass:"material-icons completed--icon"},[t._v("done")]):t._e(),t._v("\n    "+t._s(t._f("capitalize")(t.todo.task))+"\n    "),o("div",{staticClass:"modify"},[o("i",{staticClass:"material-icons edit--icon",on:{click:function(e){t.editTodo(t.todo)}}},[t._v("edit")]),t._v(" "),o("i",{staticClass:"material-icons remove--icon",on:{click:function(e){t.removeTask(t.todo.id)}}},[t._v("close")])]),t._v(" "),t.editedTodo==t.todo?o("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.task,expression:"todo.task"},{name:"val",rawName:"v-val",value:t.todo.task,expression:"todo.task"},{name:"autofocus",rawName:"v-autofocus"}],staticClass:"edit--input",class:{completed:t.todo.completed},attrs:{type:"text"},domProps:{value:t.todo.task},on:{keyup:[function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.cancelEdit(t.todo)},function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.triggerEdit(t.todo)}],focus:function(e){t.editTodo(t.todo)},blur:function(e){t.triggerEdit(t.todo)},dblclick:function(t){t.stopPropagation()},input:function(e){e.target.composing||t.$set(t.todo,"task",e.target.value)}}}):t._e()])},staticRenderFns:[]};var c=function(){var t=JSON.parse(localStorage.getItem("cabuya-todo-vuejs"))||[];return t.forEach(function(t,e){return t.id=e}),t},r=function(t){localStorage.setItem("cabuya-todo-vuejs",i()(t))},d={data:function(){return{text:"",todos:c(),newId:c().length,show:"all",search:""}},components:{task:o("VU/8")({name:"Task",data:function(){return{editedTodo:null}},props:["todo","todoList"],methods:{completeTask:function(t){t.completed=!t.completed},removeTask:function(t){var e=this.todoList.findIndex(function(e){return e.id===t});this.todoList.splice(e,1)},editTodo:function(t){this.titleBeforeEdit=t.task,this.editedTodo=t},cancelEdit:function(t){t.task=this.titleBeforeEdit,this.editedTodo=null},triggerEdit:function(t){""==t.task&&this.removeTask(t.id),t.task=t.task.trim(),this.editedTodo=null}}},a,!1,function(t){o("2h3m")},null,null).exports},watch:{todos:{handler:function(){r(this.todos)},deep:!0}},computed:{activeTasks:function(){return this.todos.filter(function(t){return!t.completed})},completedTasks:function(){return this.todos.filter(function(t){return t.completed})},filtredTasks:function(){var t=this;return this.todos.filter(function(e){return e.task.toLowerCase().indexOf(t.search.toLowerCase())>-1})},filtredTodo:function(){switch(this.show){case"search":return this.filtredTasks;case"done":return this.completedTasks;case"active":return this.activeTasks;default:return this.todos}},AllTasksCompleted:function(){return 0===this.activeTasks.length}},methods:{addItem:function(){""!=this.text.trim()&&(this.todos.unshift({id:this.newId++,task:this.text,completed:!1}),this.text="")},allCompleted:function(){var t=this.AllTasksCompleted;this.todos.forEach(function(e){return e.completed=!t})}}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("div",{staticClass:"background"}),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"},{name:"autofocus",rawName:"v-autofocus"}],staticClass:"input--create",attrs:{type:"text",placeholder:"Tap Here To Add A New Task..."},domProps:{value:t.text},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.addItem(e):null},input:function(e){e.target.composing||(t.text=e.target.value)}}}),t._v(" "),o("div",{staticClass:"container"},[t.todos.length>0?o("div",{staticClass:"filter"},[o("a",{class:{selected:"all"==t.show},attrs:{href:"#/"},on:{click:function(e){t.show="all"}}},[t._v("All")]),t._v(" "),o("a",{class:{selected:"active"==t.show},attrs:{href:"#/"},on:{click:function(e){t.show="active"}}},[t._v("Active")]),t._v(" "),o("a",{class:{selected:"done"==t.show},attrs:{href:"#/"},on:{click:function(e){t.show="done"}}},[t._v("Done")]),t._v(" "),o("a",{class:{selected:"search"==t.show},attrs:{href:"#/"},on:{click:function(e){t.show="search"}}},[t._v("Filter")]),t._v(" "),o("div",{staticClass:"right"},[o("a",{attrs:{href:"#"},on:{click:t.allCompleted}},[t._v("Check All")]),t._v(" "),o("span",[t._v(t._s(t._f("pluralize")(t.filtredTodo.length,"Course")))])])]):t._e(),t._v(" "),o("transition",{attrs:{name:"fade",mode:"out-in"}},[o("ul",{key:t.show,staticClass:"todoList"},["search"==t.show&&t.todos.length>0?o("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"},{name:"autofocus",rawName:"v-autofocus"}],staticClass:"filter--input",attrs:{type:"text",placeholder:"Search A Task..."},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}):t._e(),t._v(" "),t._l(t.filtredTodo,function(e){return o("task",{key:e.id,attrs:{todoList:t.todos,todo:e}})})],2)])],1)])},staticRenderFns:[]};var u=o("VU/8")(d,l,!1,function(t){o("XVtQ")},null,null).exports;s.a.config.productionTip=!1,s.a.directive("autofocus",{inserted:function(t,e,o){t.focus()}}),s.a.filter("capitalize",function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),s.a.filter("pluralize",function(t,e){return 1===t?t+" "+e:t+" "+e+"s"}),new s.a({el:"#app",components:{App:u},template:"<App/>"})},XVtQ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.baefbb969ed272af54df.js.map