<template>
	<div id="hot-shop">
		    <!--图片-->
		    <div v-if="shop.image_path.slice(-3) == 'png'">
				<img :src="'http://fuss10.elemecdn.com/'+shop.image_path+'.png'" alt="" />
			</div>
			<div v-if="shop.image_path.slice(-4) == 'jpeg'">
				<img :src="'http://fuss10.elemecdn.com/'+shop.image_path+'.jpeg'" alt="" />
			</div>
			<!--店名-->
		    <h3>{{shop.name}}</h3>
		    <!--好评分数-->
		    <span style="font-size: 0.5rem; color: grey;">{{shop.rating}}</span>
		    <!--好评星星-->
		    <rater v-model="shop.rating"  :font-size="15"></rater>
			<!--销量-->  
			<span style="font-size: 0.5rem; color: grey;">月售{{shop.recent_order_num}}单</span>
			<!--外卖相关-->
			<span style="float: right; color: red; font-size: 0.5rem;">蜂鸟专送</span>
			<br />
			<span style="font-size: 0.5rem; color: grey;">￥{{shop.float_minimum_order_amount}}起送 | </span>
			<span style="font-size: 0.5rem; color: grey;">配送费￥{{shop.float_delivery_fee}}</span>
			<span  style="float: right; font-size: 0.5rem; color: grey;" >{{shop.distance | dot}}</span>			
			<hr />
			
			<!--活动-->
			<div  :class="active">
                <div v-for="i in shop.activities">
                        <div class="te">特</div>{{i.description}}
                </div> 
                <span @mouseenter="active='active-to'" @mouseout="active='active'" style="font-size: 0.5rem; color: gray;" >{{shop.activities.length}}个活动<i class="fa fa-caret-down"></i></span>
           </div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Rater, Group, Cell, Range } from 'vux';
	export default{
		name:'hot-shop',
		props:['shop','inshop'],
		components:{Rater, Group, Cell, Range,Vue,},
		filters:{
			//过滤器距离
	    	dot:function(value){
	    		if (value >= 1000) {
			        return (value/1000).toFixed(2)+'km'
			    } else {
			        return value + 'm';
			    }
			 }
    	},
    	data(){
    		return{
    			active: 'active',
    		}
    	},
	}
</script>

<style scoped>
	#hot-shop{
		margin-top: 1rem;
		border-bottom: 1px solid lightgoldenrodyellow;
	}
	#hot-shop img{
		float: left;
		padding:0.5rem ;
		padding-right: 0.8rem;
		height: 5.5rem;
		width: 5.5rem;
	}

	.active{
        border-top: 1px dashed #eee;
        margin-left: 90px; 
        height: 2.5rem;
        overflow: hidden;
        position: relative;
        font-size: 0.5rem;
        margin-top: 0.5rem;
    }
    .active-to{
        border-top: 1px dashed #eee;
        margin-left: 90px; 
        position: relative;
        font-size: 0.5rem;
    }
    .active span{
        position: absolute;
        right:20px;
        top: 0;
        

    }
    .active-to span{
        position: absolute;
        right:20px;
        top: 0;
        z-index: 20;
    }
    .te{
        width: 1rem;
        float: left;
        text-align: center;
        height: 0.8rem;
        background-color: greenyellow;
        height: 16px;
        visibility: middle;
        line-height: 16px;
        margin-right: 0.5rem;
    }
   
</style>