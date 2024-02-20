<template>
    <div class="container mt-5">
      <h2>Таск Менеджер</h2>
      <button @click="showAddModal=true" class="btn btn-primary">Додати задачу</button>
  
      <!-- Модальне вікно для додавання/редагування задач -->
      <div v-if="showAddModal || showEditModal" class="modal" style="display:block;" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ showEditModal ? 'Редагувати задачу' : 'Нова задача' }}</h5>
              <button type="button" class="btn-close" @click="closeModals"></button>
            </div>
            <div class="modal-body" >
              <input v-model="currentTask" type="text" class="form-control">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModals">Закрити</button>
              <button type="button" class="btn btn-primary" @click="saveTask">Зберегти</button>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="showConfirmModal" class="modal" style="display:block;" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Підтвердіть видалення</h5>
            </div>
            <div class="modal-body">
              <p>Ви дійсно хочете видалити цю задачу?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModals">Ні</button>
              <button type="button" class="btn btn-danger" @click="deleteTask">Так</button>
            </div>
          </div>
        </div>
      </div>
  
      <ul class="list-group mt-3">
        <li v-for="(task, index) in tasks" :key="index" class="list-group-item">
          {{ task }}
          <div class="float-end">
            <button @click="editTask(task, index)" class="btn btn-sm btn-primary">Редагувати</button>
            <button @click="confirmDelete(index)" class="btn btn-sm btn-danger">Видалити</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tasks: ['Задача 1', 'Задача 2', 'Задача 3'],
        showAddModal: false,
        showEditModal: false,
        showConfirmModal: false,
        currentTask: '',
        currentTaskIndex: null
      };
    },
    methods: {
      closeModals() {
        this.showAddModal = false;
        this.showEditModal = false;
        this.showConfirmModal = false;
        this.currentTask = '';
        this.currentTaskIndex = null;
      },
      saveTask() {
        if (this.currentTask.trim() !== '') {
          if (this.showEditModal) {
            this.tasks[this.currentTaskIndex] = this.currentTask;
          } else {
            this.tasks.push(this.currentTask);
          }
        }
        this.closeModals();
      },
      editTask(task, index) {
        this.currentTask = task;
        this.currentTaskIndex = index;
        this.showEditModal = true;
      },
      confirmDelete(index) {
        this.showConfirmModal = true;
        this.currentTaskIndex = index;
      },
      deleteTask() {
        this.tasks.splice(this.currentTaskIndex, 1);
        this.closeModals();
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-dialog {
    width: 100%;
    max-width: 500px;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  </style>