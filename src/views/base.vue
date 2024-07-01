<script setup>
  import { ref,reactive } from 'vue';
  
  const name=ref('小明')
  console.log(name.value)

  const age=ref(18)
  
  function sex(sex){
    return sex==1?'男':'女';
  }
  const state=reactive({
    name:'小杨',
    age:18,
    sex:'女'
  })
  const obj={
    class:'text-16',
    id:'font-size-24'
  };
  //响应式
  const hasBro=ref(true);
  const clickFn=()=>{
    alert('弹窗')
  }
  const change=()=>{
    hasBro.value=!hasBro.value;
    state.age++
  }
  console.log(state)
  const isActive=ref(true);
  const IsDisable=ref(false);
  const Iscolor=ref('red');
</script>
<template>
    <!-- <h1 :class="'text-'+age" class="font-size-20">{{ name }}-{{ age<=16?'少年':'成年' }}-{{ sex(1) }}</h1>-->
    <p v-bind="obj">{{ name }}-{{ age<=16?'少年':'成年' }}-{{ sex(1) }}</p> 
    
    <p v-if="hasBro" >11</p>
    <p v-if="hasBro">{{ state.name }}-{{ state.age }}-{{ state.sex }}</p>
    <p v-else>22</p>

    <button @click="clickFn">按钮</button>
    <button @click="change">切换</button>

    <p :class="{active:isActive ,disable:IsDisable}">里斯</p>
    <button @click="isActive=!isActive">选中</button>
    <p :style="{color:Iscolor}">里斯</p>
</template>
<style scoped>
  .text-16{
    color: red;
  }
  .text-18{
    color: blue;
  }
  .font-size-20{
    font-size: 10px;
  }
  .font-size-24{
    font-size: 14px;
  }
  .active{
    color: aquamarine;
  }
  .disable{
    color: black;
  }
</style>