<template>
  <div class="container py-5">
    <div class="mb-3">
      <h1 style="white-space: nowrap;">Таск Менеджер</h1>
    </div>
    <div class="mb-3">
      <input v-model="newTask" @keyup.enter="addTask" type="text" class="form-control" placeholder="Введіть назву нової задачі...">
      <button @click="addTask" class="btn btn-primary ml-2" style="white-space: nowrap;">Добавити задачу</button>
    </div>
    <ul class="list-group">
      <li v-for="(task, index) in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span v-if="!task.editing">

            <i class="fas" :class="task.icon"></i> {{ task.name }}
          </span>
          <input v-else v-model="task.name" @keyup.enter="finishEdit(task)" type="text" class="form-control" placeholder="Оновіть назву задачі...">
        </div>
        <div>
          <button v-if="!task.editing" @click="editTask(task)" class="btn btn-primary btn-sm"> Update </button>
          <button v-else @click="finishEdit(task)" class="btn btn-success btn-sm"> Save </button>
          <button @click="removeTask(index)" class="btn btn-danger btn-sm"> Delete </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskManager',
  data() {
    return {
      newTask: '',
      tasks: [],
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
      
        const defaultIcon = 'fa-check-circle'; 
        this.tasks.push({ id: this.tasks.length + 1, name: this.newTask, icon: defaultIcon, editing: false });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(task) {
      this.tasks.forEach(t => { if (t.id !== task.id) t.editing = false; });
      task.editing = true;
    },
    finishEdit(task) {
      task.editing = false;
    }
  },
};
</script>

<style scoped>

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

</style>