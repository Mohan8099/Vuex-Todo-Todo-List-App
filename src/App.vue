<template>
  <div class="bg-container">
    <AddTodo msg="Todo App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddTodo from './components/AddTodo.vue';

@Options({
  components: {
    AddTodo
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.bg-container {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  min-height: 100vh;
}

</style>
