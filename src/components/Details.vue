<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div v-if="task" class="task-detail">
            <p>Hello World</p>
            <h2>Деталі завдання {{ task.name }}</h2>
            <p><strong>Автор:</strong> {{ task.author }}</p>
         
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
  