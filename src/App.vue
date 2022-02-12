<template>
  <div class="bg-container">
    <AddTodo msg="Todo List" />
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
}

.bg-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: 
  linear-gradient(62deg, rgba(212, 241, 238, 0.973) 13%, rgba(255, 122, 151, 0.5) 4%),
  linear-gradient(44deg, rgb(150, 241, 158) 39%, rgba(242, 140, 143, 0.5) 18%),
  linear-gradient(118deg, rgb(165, 231, 135) 40%, rgba(247, 155, 187, 0.5) 54%),
  linear-gradient(58deg, rgb(227, 237, 90) 83%, rgba(249, 156, 142, 0.5) 23%);
  background-blend-mode: normal, lighten, multiply, hard-light;
  background-size: cover;
}

</style>
