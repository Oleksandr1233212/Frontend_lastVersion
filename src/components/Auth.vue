<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="auth-container">
            <div class="auth-tabs">
              <button class="mr-2" :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">Реєстрація</button>
              <button class="mr-2" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">Вхід</button>
            </div>
            <div v-if="activeTab === 'register'">
              <h2>Реєстрація</h2>
              <form @submit.prevent="register">
                <!-- Реєстраційні поля -->
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="registerData.username" placeholder="Ім'я користувача" required>
                </div>
                <div class="form-group mb-3">
                  <input type="email" class="form-control" v-model="registerData.email" placeholder="Електронна пошта" required>
                </div>
                <div class="form-group mb-3">
                  <input type="password" class="form-control" v-model="registerData.password" placeholder="Пароль" required>
                </div>
                <div class="text-center">
                  <router-link :to="`/TaskList`"><button class="btn btn-info btn-sm" @click="register()">Реєстрація</button></router-link>
                </div>
              </form>
            </div>
            <div v-if="activeTab === 'login'">
              <h2>Вхід</h2>
              <form @submit.prevent="login">
                <!-- Поля для входу -->
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="loginData.username" placeholder="Ім'я користувача" required>
                </div>
                <div class="form-group mb-3">
                  <input type="email" class="form-control" v-model="loginData.email" placeholder="Електронна пошта" required>
                </div>
                <div class="form-group mb-3">
                  <input type="password" class="form-control" v-model="loginData.password" placeholder="Пароль" required>
                </div>
                
                <div class="text-center">
                  <router-link :to="`/TaskList`"><button class="btn btn-info btn-sm" @click="login()">Вхід</button></router-link>
                </div>
                
              </form>
            </div>
            <!-- Кнопка внизу -->
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  const API_URL = "http://localhost:5031/api/tasknanagerapp/";
  export default {
    data() {
      return {
        activeTab: 'register', // За замовчуванням вибрана вкладка "Реєстрація"
        registerData: {
          username: '',
          email: '',
          password: ''
        },
        loginData: {
          username: '',
          password: '',
          email: ''
        }
      };
    },
    methods: {
      register() {
        if(!this.registerData.username || !this.registerData.email || !this.registerData.password) return
        try{
          
          const formData = new FormData()
          formData.append('username', this.registerData.username)
          formData.append('email', this.registerData.email)
          formData.append('password', this.registerData.password)
          axios.post(API_URL + "register", formData);
          this.registerData={username: '',email: '',password: ''}

        }catch(error){
          console.error("Add task error:", error);

        }
      },
      login() {
        if(!this.loginData.username || !this.loginData.email || !this.loginData.password) return
        try{
         
          const formData = new FormData()
          formData.append('username', this.loginData.username)
          formData.append('email', this.loginData.email)
          formData.append('password', this.loginData.password)
          axios.post(API_URL + "login", formData);
          this.loginData={username: '',email: '',password: ''}

        }catch(error){
          console.error("Add task error:", error);

        }
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    margin-top: -150px;
    
  }
  
  .auth-tabs {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-left: 170px;
}
.text-center button {
  margin-left: 5px; /* Зміщення кнопки внизу вліво */
}
  
  .auth-tabs button {
    margin-right: 10px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  
  .auth-tabs button.active {
    background-color: #ccc;
  }
  </style>
  