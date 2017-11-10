<template>
    <div class="lun-bo">
        <img :src="'http://fuss10.elemecdn.com/'+lun.image_hash+'.jpeg'">
        {{lun.name}}
        
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        name: 'lun-bo',
        props: ['lun'],
        
    }
</script>