<!-- app.vue -->
<template>
  <div id="app">
    <transition name="tabbar">
      <tabbar v-show="show" style="position:fixed;">
        <tabbar-item selected link="/wechat">
          <img slot="icon" src="./assets/index1.png">
          <span slot="label">Wechat</span>
        </tabbar-item>
        <tabbar-item link="/message">
          <img slot="icon" src="./assets/index2.png">
          <span slot="label">Message</span>
        </tabbar-item>
        <tabbar-item link="/explore">
          <img slot="icon" src="./assets/index3.png">
          <span slot="label">Explore</span>
        </tabbar-item>
        <tabbar-item link="/news">
          <img slot="icon" src="./assets/index3.png">
          <span slot="label">News</span>
        </tabbar-item>
      </tabbar>
    </transition>
    <transition :name="animateType">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {Tabbar,TabbarItem} from 'vux'
export default {
  name: 'app',
  components: {
    Tabbar,TabbarItem
  },
  data(){
    return{
      animateType:'none',
      show: true
    }
  },
  watch: {
    // 监听路由的变化
    $route(to,from){
      // console.log(to);
      // console.log(from);
      var toLevel = to.path.split('/').length;
      var fromLevel = from.path.split('/').length;
      console.log('tolevel='+toLevel);
      // console.log('fromlevel='+fromLevel);

      if (toLevel == fromLevel) {
        // 平级切换
        this.animateType = 'level'
      }else if (toLevel > fromLevel) {
        // 进入下一级界面 1->2, 或者 2->3 
        this.animateType = 'in'
      }else{
        // 返回上一页 2->1  3->2
        this.animateType = 'out'
      }
      //  console.log(this.animateType);
      // 控制tabbar 是否显示
      if (toLevel > 2) {
        this.show = false
      } else {
        this.show = true;
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  /*background-color: #fbf9fe;*/
  /* padding: 64px 0 50px 0; */
 background-color: white !important;
}

/* 平级切换 */
.level-enter, .level-leave{
  position: absolute;
}

/* 进入 */
.in-enter{
  transform: translateX(100%)
}
.in-leave-to{
  transform: translateX(-100%)
}
.in-enter-active, .in-leave-active{
  transition: all 1s;
  position: absolute;
}

/* 出去  */
.out-enter{
  transform: translateX(-100%);
}
.out-leave-to{
  transform: translateX(100%);
}
.out-enter-active, .out-leave-active{
  transition: all 1s;
  position: absolute;
}

/* tabbar 动画 */
.tabbar-enter, .tabbar-leave-to{
  transform: translateX(-100%)
}
.tabbar-enter-active, .tabbar-leave-active{
  transition: all 1s;
  /* position: absolute !important; */
}

</style>
