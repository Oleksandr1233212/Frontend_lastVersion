<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="mb-4 text-center">Таск Менеджер</h2>
        <div class="form-group">
          <div class="row justify-content-center">
            <div class="col-sm-2">
              <input type="text" v-model="taskForm.newAuthor" class="form-control" placeholder="Автор">
            </div>
            <div class="col-sm-2">
              <input type="text" v-model="taskForm.newTask" class="form-control" placeholder="Нова задача">
            </div>
            <div class="col-sm-2">
              <input type="date" v-model="taskForm.taskDate" class="form-control">
            </div>
            <div class="col-sm-2">
              <select v-model="taskForm.category" class="form-control">
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
            <div class="col-sm-2">
              <button type="button" class="btn btn-primary" @click="addTask">Додати</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="list-group mt-3" style="max-width: 800px; margin: auto;">
      <li v-for="(task, index) in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>
            
            <!-- <span :class='{ 'completed-task': task.completed=="true" }' style="font-weight: bold; color: red">{{ task.name }}</span>   -->
            <div v-if='task.completed=="true"'>
              <span class="completedt" style="font-weight: bold; color: red">{{ task.name }}</span> від 
              <span style="font-weight: bold; color: green">{{ task.author }}</span>,
              <b>{{ task.data }}</b>, 
              <i>{{ task.category }}</i>
            </div>
            <div v-if='task.completed=="false"'>
              <span style="font-weight: bold; color: red">{{ task.name }}</span> від 
              <span style="font-weight: bold; color: green">{{ task.author }}</span>,
              <b>{{ task.data }}</b>, 
              <i>{{ task.category }}</i>
            </div>
            
            
          </div>
        </div>
        <div>
          <input type="checkbox" v-model="task.completed" @change="TaskCompletion(task)">


          <button @click="editTask(task)" class="btn btn-primary btn-sm" style="margin-right: 10px;">Редагувати</button>
          <button @click="confirmDelete(task.id)" class="btn btn-danger btn-sm">Видалити</button>
          <router-link :to="`/tasks/${task.id}`"><button class="btn btn-info btn-sm">info</button></router-link>
        </div>
      </li>
    </ul>
    <edit-task-modal v-if="showEditModal" :task="currentTask" @close="closeModals" @save="finishEdit"></edit-task-modal>
    <confirm-delete-modal v-if="showConfirmModal" @close="closeModals" @confirm="deleteTask"></confirm-delete-modal>
  </div>
</template>




<script>
// import axios from 'axios';
import EditTaskModal from './EditTaskModal.vue'; 
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'; 

const API_URL = "http://localhost:5031/api/tasknanagerapp/";

export default {
  name: 'TaskManager',
  components: {
    EditTaskModal,
    ConfirmDeleteModal,
  },
  data() {
    return {
      taskForm: {
        newTask: '',
        newAuthor: '',
        taskDate:'',
        category:'',
        edited:false,
        completed:false,
        timeAdded:'',
        timeComplited:''

      },
      tasks: [],
      showEditModal: false,
      showConfirmModal: false,
      currentTaskId: null,
      currentTask: null,
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    async refreshData() {
      try {
        const response = await axios.get(API_URL + "get");
        console.log(response.data);
        this.tasks = response.data;
      } catch (error) {
        console.error("Data refresh error:", error);
      }
    },
    async addTask() {
      if (!this.taskForm.newTask.trim()) return;
      try {
        this.taskForm.timeAdded= new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        this.taskForm.edited=false
        const formData = new FormData();
        formData.append('name', this.taskForm.newTask);
        formData.append('author', this.taskForm.newAuthor);
        formData.append('createdAt', this.taskForm.taskDate);
        formData.append('category', this.taskForm.category);
        formData.append('edited',this.taskForm.edited)
        formData.append('completed',this.taskForm.completed)
        formData.append('timeAdded',this.taskForm.timeAdded)
        formData.append('timeComplited',this.taskForm.timeComplited)
        await axios.post(API_URL + "add", formData);
        this.refreshData();
        this.taskForm = { newTask: '', newAuthor: '', taskDate: '', category: '',edited:'',completed:'',timeAdded:'',timeComplited:''}; // Reset form
      } catch (error) {
        console.error("Add task error:", error);
      }
    },
    confirmDelete(taskId) {
      this.currentTaskId = taskId;
      this.showConfirmModal = true;
    },
    async deleteTask() {
      try {
        await axios.post(API_URL + "del?id=" + this.currentTaskId);
        this.refreshData();
      } catch (error) {
        console.error("Delete task error:", error);
      }
      this.closeModals();
    },
    editTask(task) {
      this.currentTask = task;
      this.showEditModal = true;
    },
    async finishEdit(updatedTask) {
      try {
        updatedTask.edited = true
        const formData = new FormData();
        formData.append('name', updatedTask.name);
        formData.append('author', updatedTask.author);
        formData.append('createdAt', updatedTask.taskDate);
        formData.append('category', updatedTask.category);
        formData.append('edited',updatedTask.edited)
        formData.append('completed',updatedTask.completed)
        formData.append('timeAdded',updatedTask.timeAdded)
        formData.append('timeComplited',updatedTask.timeComplited)
        await axios.post(API_URL + "upd?id=" + updatedTask.id, formData);
        this.refreshData();
      } catch (error) {
        console.error("Update task error:", error);
      }
      this.closeModals();
    },
    closeModals() {
      this.showEditModal = false;
      this.showConfirmModal = false;
      this.currentTaskId = null;
      this.currentTask = null;
    },
    async TaskCompletion(task) {
      try {
        
        task.edited = true
        task.timeComplited = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formData = new FormData();
        formData.append('name', task.name);
        formData.append('author', task.author);
        formData.append('createdAt', task.taskDate);
        formData.append('category', task.category);
        formData.append('edited',task.edited)
        formData.append('completed',task.completed)
        formData.append('timeAdded',task.timeAdded)
        formData.append('timeComplited',task.timeComplited)
        await axios.post(API_URL + "upd?id=" + task.id, formData);
        this.refreshData();
      } catch (error) {
        console.error("Update task error:", error);
      }
      
    },
  },
};

</script>

<style scoped>
.list-group-item .d-flex .justify-content-between .align-items-center {
  max-width: 700px;
  margin: auto;
}
.container {
  max-width: 1200px;
  margin: auto;
}
.completedt {
  text-decoration: line-through;
}
</style>

