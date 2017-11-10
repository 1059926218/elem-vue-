<template>
    <div id="backtop">
             <i class="fa fa-level-up"></i>
    </div>
</template>
<script>
export default {
    name:'backtop',
    data(){
        return {
        }
    },
    methods: {
      
    },
}
</script>
<style scoped>
    #backtop{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid black;
        line-height: 60px;
        text-align: center;
        font-size: 20px;
        position: fixed;
        bottom: 100px;
        right: 60px;
        background-color: #eee;
    }
</style>