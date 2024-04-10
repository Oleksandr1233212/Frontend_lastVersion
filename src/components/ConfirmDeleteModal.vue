<template>
    <div class="modal" @click.self="close">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Підтвердіть видалення</h5>
          </div>
          <div class="modal-body">
            <p>Ви дійсно хочете видалити цю задачу?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Ні</button>
            <button type="button" class="btn btn-danger" @click="confirm">Так</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      close() {
        this.$emit('close');
      },
      confirm() {
        this.$emit('confirm');
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
  </style>
  