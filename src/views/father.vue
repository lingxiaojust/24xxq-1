<template>
    <h1>父页面</h1>

    <button @click="toSon">前往子页面</button>
        <RouterView></RouterView>
    
</template>
<script setup>
    import  { useRouter }from 'vue-router';
    const route=useRouter();
    //不是做拼接而是替换整个路由进入页面
    const toSon=()=>{
        route.push({
            path:'/fa/son',
            query:
            {
                firstName:'华'
            }
        })
    }
</script>