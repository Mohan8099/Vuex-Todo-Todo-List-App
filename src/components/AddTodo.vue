<template>
  <div class="container">
    <h1 class="text-dark">{{ msg }}</h1>
    <div v-if="$store.state.editedTodo === ''" class="my-form">
      <input v-model="newTodo" type="text" class="form-control" placeholder="Add a todoTask...." >
      <button class="add-btn" @click="addTodo">
        <Plus />
      </button>  
    </div>
    <div v-else class="my-form">
      <input v-model="$store.state.editedTodo" type="text" class="form-control" placeholder="Add a todoTask...." >
      <button class="add-btn" @click="updateEditedTodo">
        <Check />
      </button>
    </div>  
    <div class="table">
      <div class="table-header">
            <tr>
            <th class="status" scope="col">Todo Task</th>
            <th class="cursor" scope="col">Edit</th>
            <th class="cursor" scope="col">Remove</th>
            </tr>
      </div>
      <tr v-for="(todo, index) in $store.state.todos" :key="index">
        <div class="todo-container">
          <td class="status">{{ todo.todoTask }}</td>
          <td class="icon" @click="updateTodo(todo.id, index)">
              <Pencil :size="12" />
           </td>
           <td class="icon" @click="removeTodo(todo.id)">
              <Delete :size='12' />
          </td>
        </div>
      </tr>  
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Plus from 'vue-material-design-icons/Plus.vue';
import Check from 'vue-material-design-icons/Check.vue';
import Pencil from 'vue-material-design-icons/Pencil.vue';
import Delete from 'vue-material-design-icons/Delete.vue';

import store from "../store"
import axios from 'axios'

@Options({
  components: {
    Plus,
    Check,
    Pencil,
    Delete
  },
  props: {
    msg: String
  }
})
export default class AddTodo extends Vue {
  msg!: string

  public newTodo = ''

  public async created(): Promise<void>{
    const response = await axios.get("http://localhost:3333/todos")
    
    store.state.todos = response.data
  }  

  public async addTodo() {
    if (this.newTodo === '' ) {
      alert('Enter a task to add !')
    } else {
      const response = await axios.post("http://localhost:3333/todos", {todoTask: this.newTodo})
      
      store.dispatch("addTodo", response.data)
      this.newTodo = ''
  }
  }

  public updateTodo(id: number, index: number) {
    if (store.state.editedTodo === '') {
      store.state.editedTodo = store.state.todos[index].todoTask
    }
  }

  public async updateEditedTodo() {
    const todoId =  store.state.todos.map((tds) => {
        if (store.state.editedTodo.includes(tds.todoTask) || tds.todoTask.includes(store.state.editedTodo)) {
          tds.todoTask = store.state.editedTodo
          return tds.id
        }
      })
      for (let id of todoId) {
        if (id !== undefined) {
          store.state.modId = id
        }
      }
      const modifiedResponse = await axios.put(`http://localhost:3333/todos/${store.state.modId}`,{todoTask: store.state.editedTodo})

      store.dispatch("updatedTodo", modifiedResponse.data)
      store.state.editedTodo = ''
  }

  public async removeTodo(id: number) {
    const res = await axios.delete(`http://localhost:3333/todos/${id}`)

    store.dispatch("removeTodo", id) 
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 70vw;
    height: 70vh;
}

.text-dark {
  color: #323f4b;
}

.my-form {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-control {
    width: 50%;
    height: 24px;
    border-bottom: 1px #000000 solid;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    color: #323f4b;
    margin: 8px;
    outline: none;
}

.add-btn {
    height: 24px;
    width: 24px;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    font-size: 14px;
    color: #323f4b;
    margin: 4px;
}

.cursor{
    cursor: pointer;
    font-size: 12px;
    border: 0;
    background-color: transparent;
    width: 80px;
}

.icon {
  cursor: pointer;
  font-size: 4px;
  border: 0;
  background-color: transparent;
  width: 80px;
}

.status {
    font-size: 14px;
    font-weight: 400;
    width: 150px;
}

.table {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    flex-wrap: wrap;
}

.table-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323f4b;
  color: aquamarine;
  width: 60%;
  height: 32px;
  border-radius: 4px;
  border: 0;
}

.todo-container {
  margin-top: 4px;
  border-bottom: 1px #323f4b dotted;
}

</style>

