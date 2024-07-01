<script setup>
import  { useRoute }from 'vue-router';
import { watchEffect,ref } from 'vue';
const route=useRoute();
const userId=ref(route.params.id);
watchEffect(()=>{
    fetch(`/user/${userId.value}`)
    .then(data=>{
        console.log(data)
    })
})
</script>
<template>
    <h1>{{ $route.meta.title }}</h1>
    <div>编号：{{ $route.params.id }}</div>
    <div>姓名：</div>
    <div>性别：</div>
    <div>年龄：</div>
</template>
<style scoped>
</style>