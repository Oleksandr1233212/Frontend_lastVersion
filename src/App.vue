<script setup>

//import TaskList from './components/TaskList.vue'
//import TaskLast from './components/Auth.vue'
import TaskLast from './components/Details.vue'



</script>

<template>
  <header>
    <TaskLast />
    

  
  </header>
  

  <body id="app">
    <TaskList />
    
  </body>
</template>

<style scoped>




body {
  position: absolute;
  top: 100px; left: 300px;
  
}
header {
  position: absolute;
  top:550px; left: 550px;
}




</style>
