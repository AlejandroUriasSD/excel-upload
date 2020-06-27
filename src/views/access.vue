<script>
import login from '@/components/login.vue'

export default {
    name: 'access',
    components:{
        'login':login
    },
    data() {
      return{

      }
    },
    methods:{
      
    }
}
</script>
<template>
  <v-app>
    <div class="fondoLogin">
        <login/>
    </div>    
  </v-app>
    
</template>