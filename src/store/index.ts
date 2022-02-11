import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [
      {
        "id": 54,
        "todoTask": "Phew"
      }
    ],
    statusList: ['To-do', 'In-progress', 'Done'],
    editedTodo: '',
    modId: 0
  },
  mutations: {
    add_todo(state, todoData){
      state.todos.push(todoData)
    },
    updated_todo(state, response) {
      state.todos.map((tds, index) => {
        if (tds.id === response.id) {
          state.todos[index] = response
        }  
      })
    },
    remove_todo(state, id) {
      state.todos = state.todos.filter(tds => tds.id !== id)
    }
  },
  actions: {
    addTodo({commit}, todoData) {
      commit('add_todo',todoData)
    },
    updatedTodo({commit}, response) {
      commit("updated_todo", response)
    },
    removeTodo({commit}, id) {
      commit('remove_todo', id)
    }
   },
  modules: {
  }
})
