<script>
import uploadExcel from '@/components/uploadExcel.vue'
export default {
    name:'uploadExcelView',
    components:{
        'uploadExcel' : uploadExcel
    },
    data(){
        return {}
    },
    methods:{

    }
}
</script>
<template>
    <v-app>
        <div class= "fondoLogin">
            <uploadExcel/>
        </div>
    </v-app>
</template>