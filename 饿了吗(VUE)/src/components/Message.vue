<template>
    <div class="message">
        <header>Message</header>
        <button @click="show = true">弹出提示框</button>
        <button @click="showAlert">弹出警告框</button>

        <actionsheet
        v-model="show"
        :menus="{login:'登录',register:'注册'}"
        :show-cancel="true"
        @on-click-menu-login="login"
        @on-click-menu-register="register" 
        ></actionsheet>
    </div>
</template>

<script>
export default {
    name:'message',
    data(){
        return {
            show:false
        }
    },
    methods: {
        login(){
            console.log('login click');
        },
        register(){
            console.log('register click');
        },
        showAlert(){
            // 显示
            this.$vux.alert.show({
                title: '温馨提示',
                content: '是否删除？',
                onShow () {
                    console.log('Plugin: I\'m showing')
                },
                onHide () {
                    console.log('Plugin: I\'m hiding')
                }
            })
        }
    }
}
</script>