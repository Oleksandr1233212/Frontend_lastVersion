<template>
    <div v-if="notconfirmed">
      <div>
        <label for="name">Ім'я:</label>
        <input v-model="things.name" type="text" class="form-control" id="name">
      </div>
      <div>
        <label for="profession">Профессія:</label>
        <select v-model="things.profession" class="form-control" id="profession">
          <option value="Розробник">Розробник</option>
          <option value="Дизайнер">Дизайнер</option>
          
        </select>
      </div>
      <div>
        <label>Згода з правилами:</label>
        <div>
          <input type="radio" id="agreeYes" value="Так" v-model="things.agree">
          <label for="agreeYes">Так</label>
        </div>
        <div>
          <input type="radio" id="agreeNo" value="Ні" v-model="things.agree">
          <label for="agreeNo">Ні</label>
        </div>
      </div>
      <button @click="confirm">Підтвердити</button>
  
      
    </div>
    <div v-if="confirmed">
        <h3>Данні:</h3>
        <p>Ім'я: {{ things.name }}</p>
        <p>Профессія: {{ things.profession }}</p>
        <p>Згода з правилами: {{ things.agree }}</p>
      </div>
     <div v-if="error">
        <h3>Не всі данні були введені, спробуйте ще раз!</h3>
        <button @click="again">Спробувати ще раз</button>
        
      </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        things: {
          name: '',
          profession: '',
          agree: '',
        },
        confirmed: false,
        notconfirmed: true,
        error: false
      };
    },
    methods: {
      confirm() {
        if(this.things.name && this.things.profession && this.things.agree){
            this.confirmed = true;
            this.notconfirmed= false;
            this.error=false;

        }
        else{
            this.error=true;
            this.confirmed=false;
            this.notconfirmed=false;
        }
        
        
      },
      again(){
        this.error=false;
        this.confirmed=false;
        this.notconfirmed=true;
        this.things.name = '';
        this.things.profession = '';
        this.things.agreed = '';
      }
    },
  };
  </script>
  
  