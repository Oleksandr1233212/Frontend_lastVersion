<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="task-details">
            <h2>Деталі завдання "{{ task.title }}"</h2>
            <p><strong>Автор:</strong> {{ task.author }}</p>
            <p><strong>Мета завдання:</strong> {{ task.purpose }}</p>
            <p><strong>Дата створення:</strong> {{ task.createdDate }}</p>
            <p><strong>Дата завершення:</strong> {{ task.completedDate }}</p>
            <p><strong>Стан завдання:</strong> {{ taskStatus }}</p>
            <p><strong>Опис:</strong> {{ task.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    computed: {
      taskStatus() {
        return this.task.completed ? 'Завершено' : 'Не завершено';
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
  