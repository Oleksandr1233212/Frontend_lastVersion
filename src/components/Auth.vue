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
              <Form @submit.prevent="register">
                
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="registerData.username" placeholder="Ім'я користувача" required>
                </div>
                <div class="form-group mb-3">
                  <Field type="email" name='email' class="form-control" :rules="validateEmail" v-model="registerData.email" placeholder="Електронна пошта" required />
                  <ErrorMessage name="email" />
                </div>
                <div class="form-group mb-3">
                  <input type="password" class="form-control" v-model="registerData.password" placeholder="Пароль" required>
                </div>
                <div class="text-center">
                  <button class="btn btn-info btn-sm" @click="register()">Реєстрація</button>
                </div>
              </Form>
            </div>
            <div v-if="activeTab === 'login'">
              <h2>Вхід</h2>
              <Form @submit.prevent="login">
                
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="loginData.username" placeholder="Ім'я користувача" required>
                </div>
                <div class="form-group mb-3">
                  <Field type="email" name="login" class="form-control" :rules="validateEmail" v-model="loginData.email" placeholder="Електронна пошта" required/>
                  <ErrorMessage name="login" />
                </div>
                <div class="form-group mb-3">
                  <input type="password" class="form-control" v-model="loginData.password" placeholder="Пароль" required>
                </div>
                
                <div class="text-center">
                  <button class="btn btn-info btn-sm" @click="login()">Вхід</button>
                </div>
                
              </Form>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>


import { Form, Field, ErrorMessage } from 'vee-validate';
const API_URL = "http://localhost:5031/api/tasknanagerapp/";

export default {
  data() {
    return {
      activeTab: 'register', 
      validation: false,
      registerData: {
        username: '',
        email: '',
        password: '',
      },
      loginData: {
        username: '',
        password: '',
        email: ''
      }
    };
  },
  methods: {
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        
        return 'This field is required';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        
        return 'This field must be a valid email';
      }
      // All is good
      this.validation=true
      return true;
      
    },
    async register() {
      if (!this.registerData.username || !this.registerData.email || !this.registerData.password) return;
      if(this.validation){
        try {
        const formData = new FormData();
        formData.append('username', this.registerData.username);
        formData.append('email', this.registerData.email);
        formData.append('password', this.registerData.password);

        const response = await axios.post(API_URL + "register", formData);
        if(response.data.userId){
          localStorage.setItem('userId', JSON.stringify(response.data.userId))
          this.$router.push('/TaskList');
        }
      
        
        this.registerData = { username: '', email: '', password: '' };
      } catch (error) {
        console.error("Registration error:", error);
      }

      }

      
    },
    async login() {
      if (!this.loginData.username || !this.loginData.email || !this.loginData.password) return;
      if(this.validation){
        try {
        const formData = new FormData();
        formData.append('username', this.loginData.username);
        formData.append('email', this.loginData.email);
        formData.append('password', this.loginData.password);
        console.log(this.loginData.password)

        const response = await axios.post(API_URL + "login", formData);
        
        if (response.data.userId) {
          localStorage.setItem('userId', response.data.userId);
          this.$router.push('/TaskList');
        }
        
        this.loginData = { username: '', email: '', password: '' };
      } catch (error) {
        console.error("Login error:", error);
      }

      }

      
    },
    
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
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
  margin-left: 5px; 
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
  