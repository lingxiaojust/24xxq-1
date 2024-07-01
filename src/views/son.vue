<script setup>
    import {useRouter,useRoute} from 'vue-router'
    const router=useRouter();
    const route=useRoute();
    console.log(route.query)
</script>
<template>
    <h1>子页面,{{ $route.query.firstName }}</h1>
    <button @click="router.go(-1)">返回父页面</button>
    <button @click="router.go(-2)">返回list页</button>
</template>