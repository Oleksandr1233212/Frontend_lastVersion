<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div v-if="task" class="task-detail">
            <h2>Деталі завдання {{ task.name }}</h2>
            <p><strong>Автор:</strong> {{ task.author }}</p>
            <p>Дата створення: {{ task.data }}</p>
            <p>Категорія: {{ task.category }}</p>
            <p v-if='task.edited=="true"'>Завдання змінювалось</p>
            <p v-if='task.edited=="false"'>Завдання не змінювалося</p>
            <p v-if='task.completed=="true"'>Завдання зроблене</p>
            <p v-if='task.completed=="true"'>Час виконання: {{ task.timecomplited }}</p>
            <p v-if='task.completed=="false"'>Завдання не зроблене</p>
            <p>Час створення: {{ task.added }}</p>
            <router-link :to="`/TaskList`"><button class="btn btn-info btn-sm">Вихід до задач</button></router-link>

         
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
 
  export default {
    props:['id'],
    data() {
      return{
        task: null
      }
      
    },
    mounted() {
      this.fetchTaskDetail()
    },
    methods: {
      async fetchTaskDetail() {
      try {
        const response = await axios.get(`http://localhost:5031/api/tasknanagerapp/data/${this.id}`);
        this.task = response.data;
        console.log(response.data.name)
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
      }
    }
  };
  </script>
  
  <style scoped>
  .task-details {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  