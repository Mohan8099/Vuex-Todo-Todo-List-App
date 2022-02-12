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
          <td class="todo-task">{{ todo.todoTask }}</td>
          <td class="icon" @click="updateTodo(todo.id, index)">
              <Pencil :size="14" />
           </td>
           <td class="icon" @click="removeTodo(todo.id)">
              <Delete :size='14' />
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
    margin-top: 60px;
    justify-content: flex-start;
    align-content: center;
    max-width: 480px;
    width: 100%;
    max-height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    overflow: auto;
}

.text-dark {
  color: #323f4b;
  margin-top: 30px;
}

.my-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
}

.form-control {
    width: 50%;
    height: 36px;
    padding: 0 8px;
    border: none;
    background-color: transparent;
    border-bottom: 1px #272727 solid;
    color: #272727;
    margin-right: 15px;
    outline: none;
    border-radius: 0;
}

.add-btn {
    height: 32px;
    width: 32px;
    cursor: pointer;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    color: #323f4b;
    margin: 4px;
    padding: 5px 0 12px 0;
}

.cursor{
    cursor: pointer;
    font-size: 14px;
    border: 0;
    background-color: transparent;
    width: 80px;
}

.icon {
  cursor: pointer;
  border: 0;
  background-color: transparent;
  width: 80px;
}

.status {
    font-size: 16px;
    font-weight: 600;
    width: 150px;
}

.todo-task {
  font-size: 16px;
  font-weight: 400;
  width: 150px;
  padding: 0 12px;
}

.table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  color: #323f4b;
  width: 65%;
  height: 40px;
  border-radius: 14px;
  border: none;
}

.todo-container {
  background-color: rgba(154, 255, 159, 0.5);
  margin-top: 8px;
  border-radius: 12px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

