<template>
  <div class="container mt-5">
        <div class="row justify-content-center" style="width: 700px">
            <div class="col-md-6">
                <h2 class="mb-4 text-center">Таск Менеджер</h2>
                <form id="taskForm" @submit.prevent="addTask">
      
                  <div class="form-group">
    <div class="row">
        <div class="col-sm-8">
          <input type="text" v-model="newTask"  class="form-control" placeholder="Введіть назву завдання">
        </div>
        <div class="col-sm-4">
          <button type="button" class="btn btn-primary btn-block" @click="addTask" style="white-space: nowrap;">Додати</button>
        </div>
    </div>
</div>
                    
                </form>
            </div>
            </div>
    <ul class="list-group mt-3" id="list">
      <li v-for="(task, index) in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center" style="width: 400px;">
        <div>
          <span v-if="!task.editing">

            <i class="fas" :class="task.icon"></i> {{ task.name }}
          </span>
      
        </div>
        <div>
          <button v-if="!task.editing" @click="editTask(task, index)" class="btn btn-primary btn-sm" style="margin-right: 10px;"> Редагувати </button>

          <button @click="confirmDelete(index)" class="btn btn-danger btn-sm"> Видалити </button>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="showEditModal" class="modal" style="display:block;" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Редагувати задачу</h5>
              <button type="button" class="btn-close" @click="closeModals"></button>
            </div>
          
            <div class="modal-body" v-if="showEditModal">
              <input v-model="editedTaskName" @keyup.enter="finishEdit" type="text" class="form-control">
            </div>
         
            <div class="modal-footer" v-if="showEditModal">
              <button type="button" class="btn btn-secondary" @click="closeModals">Закрити</button>
              <button type="button" class="btn btn-primary" @click="finishEdit">Зберегти</button>
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
</template>

<script>
export default {
  name: 'TaskManager',
  data() {
    return {
      newTask: '',
      tasks: [],
      
      showEditModal: false,
      showConfirmModal: false,
      currentTask: null,
      currentTaskIndex: null,
      editedTaskName: ''
    };
  },
  async mounted() {

     const savedTasks = localStorage.getItem('tasks');
    // const response=await fetch('http://localhost:3001/');
    //const savedTasks = await response.json();
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
    
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
      
        const defaultIcon = 'fa-check-circle'; 
        this.tasks.push({ id: this.tasks.length + 1, name: this.newTask, icon: defaultIcon, editing: false });
        this.newTask = '';
        this.showAddModal=false;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    },
    
    closeModals() {
        
        this.showEditModal = false;
        this.showConfirmModal = false;
        this.newTask = '';
        this.currentTask='';
        this.currentTaskIndex = null;
      },
      confirmDelete(index) {
        this.showConfirmModal = true;
        this.currentTaskIndex = index;
      },
      async deleteTask() {
        this.tasks.splice(this.currentTaskIndex, 1);
        this.closeModals();
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        
      },
    editTask(task, index) {
      this.editedTaskName = task.name;
      this.currentTask = task;
      this.currentTaskIndex = index;
      this.showEditModal = true;
    },
    async finishEdit() {
      if (this.currentTask) {

        this.tasks[this.currentTaskIndex].name = this.editedTaskName;
        this.tasks[this.currentTaskIndex].editing = false;
        this.closeModals();
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  },
  
};

</script>

<style scoped>
.list-group-item .d-flex .justify-content-between .align-items-center {
  width: 400px;
}
.d-flex {
  display: flex;
  align-items: center;
}
.mb-3 {
  display: flex;
  align-items: center;
}

.ml-2 {
  margin-left: 5px;
}

.container {
  width: 90%;
  max-width: 1200px;
  padding-left: 15px;
  padding-right: 100px;
  margin: auto;
}
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
  #list{
    position: absolute;
    left: 222px;


  }
</style>