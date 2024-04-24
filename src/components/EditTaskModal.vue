<template>
    <div class="modal" @click.self="close">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Редагувати задачу</h5>
            <button type="button" class="close" @click="close">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="form-group">
                <label for="taskName">Назва</label>
                <input type="text" id="taskName" v-model="task.name" class="form-control">
              </div>
              <div class="form-group">
                <label for="taskAuthor">Автор</label>
                <input type="text" id="taskAuthor" v-model="task.author" class="form-control">
              </div>
              <div class="form-group">
                <label for="taskAuthor">Категорія</label>
                <select v-model="task.category" class="form-control">
                <p>dasdas</p>
                <option disabled value="">Оберіть категорію</option>
                <option>Робота</option>
                <option>Особисте</option>
                <option>Навчання</option>
                <option>Домашні завдання</option>
                <option>Фітнес</option>
                <option>Хобі</option>
                <option>Інше</option>
              </select>
              </div>
              <button type="submit" class="btn btn-primary">Зберегти</button>
            </form>
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
        default: () => ({})
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
        this.$emit('save', this.task);
      }
    }
  }
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
    max-width: 500px;
    width: 100%;
  }
  .modal-content {
    padding: 20px;
  }
  .close {
    cursor: pointer;
  }
  </style>
  