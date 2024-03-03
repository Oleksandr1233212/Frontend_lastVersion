<template>
 <div class="container mt-5">
        <div class="row justify-content-center" style="width: 700px">
            <div class="col-md-6">
                <h2 class="mb-4 text-center">Таск Менеджер</h2>
                <form id="taskForm">
                    
<div class="form-group">
    <div class="row">
        <div class="col-sm-8">
            <input type="text" class="form-control" id="taskInput" placeholder="Введіть назву завдання">
        </div>
        <div class="col-sm-4">
            <button type="button" class="btn btn-primary btn-block" style="white-space: nowrap;">Додати</button>
        </div>
    </div>
</div>
                    
                </form>
                <ul class="list-group mt-4" id="taskList">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        etaf
                    <div>
                    <button class="btn btn-sm edit-task mr-2">Редагувати</button>
                    <button class="btn btn-danger btn-sm delete-task" @click="confirmDelete">Видалити</button>
                    </div>
                    </li>
                </ul>
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
    
</template>
<script>
export default {
    data() {
        return {
            newTask: '',
      tasks: [],
      
      showEditModal: false,
      showConfirmModal: false,
      currentTask: null,
      currentTaskIndex: null,
      editedTaskName: ''


        }
    },
    methods: {
        confirmDelete(){
            this.showConfirmModal=true


        },
        deleteTask(){

        },
        closeModals(){
            this.showEditModal= false;
            this.showConfirmModal= false;
        }
    }
}
</script>