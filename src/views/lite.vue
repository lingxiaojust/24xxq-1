<script setup>
    import { onBeforeMount,onMounted,onUpdated,onUnmounted,onBeforeUpdate, onBeforeUnmount,ref,watch, reactive, watchEffect} from 'vue';
    //进入页面
    onBeforeMount(()=>{
        console.log('1.即将挂载，模板已编译，但没有挂载dom');
    })
    onMounted(()=>{
        console.log('2已经挂载，可以执行dom')
    })
    //更新
    onBeforeUpdate(()=>{
        console.log('3即将更新，还没重新渲染')
    }) 
    onUpdated(()=>{
        console.log('4已经更新，完成重新渲染')
    }) 
    //离开页面 
    onBeforeUnmount(()=>{
        console.log('5即将卸载，实例依然存在')
    }) 
    onUnmounted(()=>{
        console.log('6.组件已经卸载，实例已经销毁')
    })  
    const context=ref('true')
    const x=ref(0)
    const y=ref(0)
    const state=reactive({
    name:'小杨',
    age:18,
    sex:'女'
  })
    //监听页面状态
    watch(context,(newValue,oldValue)=>{
        console.log('watch',newValue,oldValue)
    })
    watch([x,y],([newX,newY],[oldX,oldY])=>{
        console.log('watch',newX,newY,oldX,oldY)
    })
    watch(state,(value)=>{
        console.log('watch',value)
    })
    watchEffect(()=>{
        console.log('watchEffect',state.name)
    })
    // fetch('/api/user/list')
    // .then
</script>
<template>
    <div>{{context}}</div>
    <button @click="context=!context">1</button>
    <div>{{ state.name }}-{{ state.age }}-{{ state.sex }}</div>
    <button @click="state.name='小李'">更名</button>
</template>
<style scoped>
</style>