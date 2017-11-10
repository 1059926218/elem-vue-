<!-- wechat -->
<template>
	<div class="all">
		<!--回到顶部-->
       <div v-show="scrolled2" @click="as">
                <backtop></backtop>
       </div>
        
	   <header>
		    <div class="wechat">
		    	<!--加载定位信息失败-->
		    	 <div class="loading">
		            <span v-if="status == 'loading'" class="fa fa-spinner fa-pulse  fa-fw"></span>
		            <span v-if="status == 'fail'">加载失败...</span>
		        </div>
		        <!--加载定位信息成功-->
		        <div v-if="status == 'success'" class="name">
		        	<span class="fa fa-map-marker"></span>
		            {{city | mapname}}
		        </div>
		        <!--获取天气图标-->
		        <div class="weather">
		        	<img src="https://fuss10.elemecdn.com/9/b9/c8e482821be2080edcffbb3a8d376png.png?imageMogr/thumbnail/!69x69r/gravity/Center/crop/69x69/"/>
		        	<!--{{weather | dot}}-->
		        	{{tem + "°"}}
		        	{{des}}
		        </div>
		        <!--搜索框-->
		        <div class="input">
		        	<span class="fa fa-search"></span>
		        	<span>搜索商家,商品名称</span>
		        </div>
		        <!--热搜产品-->
		        <!--<div  class="hotshop" >
		        	<span v-for="hot in hots">
		        	{{hot.word}}
		        	</span>
		        </div>-->
		    </div>
		    <!--热搜滚动-->
		    <scroller lock-y scrollbar-x>
	                <div class="box1">
	                        <div class="box1-item" v-for="item in hots"><span>{{item.word}}</span></div>
	                </div>
	        </scroller>
       </header>
        
         
        
        <main>
        	<!--轮播-->
        	<swiper>
		        <swiper-item>
		            <div class="fadeInUp animated">
		                <lun-bo v-for="lunbo in src1" :lun="lunbo" class="lunbohaha">
			                <!--<img :src="'http://fuss10.elemecdn.com/'+lunbo.image_hash+'.jpeg'"/>
			        		<p>{{lunbo.name}}</p>-->
			            </lun-bo>
		            </div>
		        </swiper-item>
		      <swiper-item>
		      	<div class="fadeInUp animated">
		      		<lun-bo v-for="lunbo in src2" :lun="lunbo" class="lunbohaha">
		      		</lun-bo>	
		      	</div>
		      </swiper-item>
		    </swiper>
        	
        	
            <!--抢购图片-->
            <div class="food">
            	<img src="../assets/food/foodr6.png" alt="" />
            	<img src="../assets/food/foodr2.png" alt="" />
            	<img src="../assets/food/foodr3.png" alt="" />
            	<img src="../assets/food/foodr4.png" alt="" />
            	<img src="../assets/food/foodr5.png" alt="" />
            </div>
            
            
            	
            <!--推荐商家-->
            <div class="hothot">
				<div class="loading">
	                <span v-if="status == 'loading'" class="fa fa-spinner fa-pulse fa-3x fa-fw" style="z-index: 999;"></span>
	                <span v-if="status == 'fail'">加载失败...</span>
	            </div>
	            <div v-if="status == 'success'">
	                <hot-shop v-for="hotshop in hotshops" :shop="hotshop" ></hot-shop>
	            </div>
	            <div v-if="status == 'success'" class="load-more" style="border: 5px red solid; margin-bottom: 50px; z-index: 99;">
	                <span class="fa fa-spinner fa-pulse fa-2x fa-fw" style="z-index: 9999;"></span>
	                                                 正在加载更多
	            </div>
            </div>
		    
		    
		    
	        </main>
	    </div>
    
    
    
</template>

<script>
import Vue from 'vue';
//轮播子组件
import LunBo from './LunBo';
//推荐商家
import HotShop from './HotShop';
//热搜
import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
//轮播
import { Swiper, GroupTitle, SwiperItem} from 'vux'
import Backtop from './Backtop.vue'


export default {
    name:'wechat',
    components:{
    	Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore,LunBo,Swiper, GroupTitle, SwiperItem,HotShop,Backtop
    },
    
    data(){
    	return{
    		status:'loading',
            city:[],
            weather:'',
            tem:'',
            des:'',
            hots:[],
            lunbos:[],
            src1:[],
            src2:[],
            hotshops:{},
            scrolled2:false,
        }
    },
     methods: {
     	//回到顶部
     	as(){
            document.scrollingElement.scrollTop=0
        },
        handleScroll () {
         this.scrolled2 = window.scrollY > 500;
        },

        // 当页面发生滚动时调用的函数
        didScroll(){
            var bodyH = document.body.clientHeight;//页面的总高度
            var scrollTop = document.scrollingElement.scrollTop;//页面滚动时被卷去的高度
            var windowH = document.documentElement.clientHeight;//可视页面的高度
            if (windowH+scrollTop >= bodyH-10) {
                console.log('加载更多');
                if (!this.isLoading) {
                    this.loadMore();
                    console.log(bodyH);
                }
            }
        },
        loadMore(){
            this.isLoading = true;
            this.http.get('/elemapi/shopping/restaurants?latitude=37.87059&longitude=112.550667&offset=8&limit=16&extras[]=activities&terminal=h5&extra_filters=home')
            .then(res=>{
                if (res.data) {
                    this.hotshops = this.hotshops.concat(res.data);
                }
                this.isLoading = false;
            },err=>{
                this.isLoading = false;   
            }) 
        },
    },
    mounted () {
    	//回到顶部
    	window.addEventListener('scroll', this.handleScroll);
        window.onscroll = this.didScroll;
       //地址信息
        this.http.get('/elemapi/v2/pois/ww8p3nhuhtsh').then(res=>{
            if (res.data.error = "0") {
                this.status = 'success';
                this.city = res.data.address;
                // console.log(JSON.stringify(this.roomlist));
            } else {
                this.status = 'fail';
            }
        },err=>{
            console.log(err);
            this.status = 'fail'
        });
        //天气信息
        this.http.get('/elemapi/bgs/weather/current?latitude=37.87059&longitude=112.550667').then(res=>{
    	this.weather = res.data.image_hash;
    	this.tem = res.data.temperature;
    	this.des = res.data.description
    	});
    	//热搜
    	this.http.get('/elemapi/shopping/v3/hot_search_words?latitude=37.87059&longitude=112.550667').then(res=>{
    	console.log(res.data);
        //console.log(JSON.stringify(res.data.search_word));
        this.hots = res.data;
        //console.log(this.hots.search_word);
        //console.log(this.hots);
    	});
    	//轮播
    	this.http.get('/elemapi/shopping/v2/entries?latitude=37.87059&longitude=112.550667&templates[]=main_template').then(res=>{
    		console.log(res.data);
        //this.lunbos = res.data[0].entries;
    		for(var i =0;i<16;i++){
    			if(i<8){
    				this.src1.push(res.data[0].entries[i]);
    			}else{
    				this.src2.push(res.data[0].entries[i]);
    			}
    		}
    	})
    	//推荐商店
    	window.onscroll = this.didScroll;
        console.log('获取推荐商店');
        this.http.get('/elemapi/shopping/restaurants?latitude=37.87059&longitude=112.550667&offset=8&limit=16&extras[]=activities&terminal=h5&extra_filters=home').then(res=>{
            console.log(res.data.error);
            if (res.data) {
                this.status = 'success';
                this.hotshops = res.data;
                // console.log(JSON.stringify(this.roomlist));
            } else {
                this.status = 'fail';
            }
        },err=>{
            console.log(err);
            this.status = 'fail'
        });
    },
    filters:{
    	dot:function(value){
    		return value.substring(32,0)+'.png'
    	},
    	//过滤器，地址超过八个字加点
    	mapname:function(value){
    		 if (value.length >= 8) {
		        return value.slice(0,7)+"..."
		    }  else {
		        return value;
		    }
        },
    }
}
</script>

<style>
	.all{
		width: 100%;
		/*height: 100%;*/
		
	}
header{
    width: 100%;
    height: 120px;
    background-color: blue;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999; 
    
    
}
header .name{
	font-size: 1rem;
	color: white;
	float: left;
	font-weight: 700;
	margin-top: 0.5rem;

}
header .weather{
	color: white;
	font-size: 0.7rem;
	font-weight: 500;
	float: right;
	margin-top: 0.5rem;
	width: 3.5rem;
	height: 2rem;
}
header .weather img{
	float: right;
	width: 2rem;
	height: 2rem;
	font-weight: 700;
}

header .input{
	clear: both;
	border: 1px solid black;
	background-color: white;
    text-align: center;
	width: 80%;
	height: 1.8rem;
	text-align: center;
	margin-left: 2rem;
	margin-top: 0.9rem;
	
}
header .hotshop{
	color:white ;
	font-size: 0.6rem;
	margin-top: 1rem;
	text-align: center;
}

header .hotshop span{
	float: left;
	bottom: 0;
	margin-left: 1.5rem;
}

/*header .name{
	text-overflow: ellipsis; //不换行
    overflow: hidden;
    white-space: nowrap;
    width: 10rem;
}*/
/*热搜组件*/
.box1 {
  height: 40px;
  position: relative;
  width: 1000px;
  font-size: 14px;
  top: 10px;
  z-index: 999;
  /*background-color: gold;*/
 color: white;
 margin-top: 1rem;
}
.box1-item {
  width: 60px;
  height: 24px;
  /*background-color: #ccc;*/
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
}
main{
	margin-top: 120px;
	/*height: 100px;*/
}
/*轮播组件*/
main .vux-slider .{
	height: 210px !important;
}
main .vux-slider .vux-swiper{
	height: 210px !important;
}

/*弹性布局图片在中间*/
main .lunbohaha{
	float: left;
    width: 25vw;
    height: 25vw;
    display: flex;
    /*用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。center:位于容器中心*/
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1rem;
}

main .lunbohaha  img{
	width: 5rem;
	height: 5rem;
}
/*中间五张照片*/
main .food{
	height: 100%;
	margin-top: 1rem;
	margin-left: 0.7rem;
}
main .food img:nth-child(1),img:nth-child(2){
	/*border: 3px solid yellow;*/
	width: 45.5vw;
}
main .food img:nth-child(3),img:nth-child(4),img:nth-child(5){
	width: 30vw;
	/*border: 3px solid yellow;*/
}

.loading{
    text-align: center;
}
.load-more{
    text-align: center;
    font-size: 1.2rem;
}

</style>