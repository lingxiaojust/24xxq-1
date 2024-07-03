<script setup>
import { ref,reactive,watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from './store/user';
import { RouterLink, RouterView } from 'vue-router';
import {useMouse} from './utils/hooks'
const type=ref('computed')
const message=ref('你好')
const {x,y}=useMouse();
console.log(x,y)
watch(type,(newtype,oldValue)=>{
  console.log(newtype)
})
const userStore = useUserStore();

function warn(message,event){
  if(event){
    event.preventDefault()
  }
  alert(message)
}
const id='123'
</script>

<template>

  <!-- <button @click="message='再见'">message切换</button>
  <button @click="event=>warn('event事件',event)">获取事件</button> -->
<div class="btn">
  <!--<button v-for="(item,index) in ['computed','list','base','hello','form','lite','user','fa','echarts','web3d']" --> 
  <button v-for="(item,index) in ['computed','list','echarts','web3d']"
    :class="{active:type==item}" @click="type=item" class="btnall"> 
    {{ item.message }}
    <RouterLink :to="`/${item}`">{{ item }}</RouterLink>
  </button>

</div>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped>
.active{
  color:aqua;
}
.border{
  border: black solid 2px;
}
button{
  margin: 10px;
  margin-top: 0px;
  margin-bottom: 20px;}
button.active{
  background-color:rgba(118, 166, 232, 0.338);
  
}
.btn{
  height: 64px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.247);
}
.pd-20{
  padding: 20px; 
}
</style>
