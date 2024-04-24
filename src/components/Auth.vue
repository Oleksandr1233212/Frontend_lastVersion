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
                <button type="submit" class="btn btn-primary btn-block">Реєстрація</button>
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
                  <input type="password" class="form-control" v-model="loginData.password" placeholder="Пароль" required>
                </div>
                <div class="text-center">
                <button type="submit" class="btn btn-primary btn-block">Вхід</button>
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
          password: ''
        }
      };
    },
    methods: {
      register() {
        // Логіка реєстрації користувача
        console.log('Реєстрація');
      },
      login() {
        // Логіка входу користувача
        console.log('Вхід');
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    margin-top: -400px;
    
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
  