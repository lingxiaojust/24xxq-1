<script setup>
    import { ref,computed } from 'vue';
    const price=ref(100);
    const discount=ref(8);

    const final=computed(()=>{
        return price.value*(discount.value/10)
    })
</script>
<template>
    <link href="./output.css" rel="stylesheet">
    <div class="text-5xl h-16">欢迎</div>
    <!-- <div>价格计算器</div>
    <p>原价:{{ price }}</p>
    <input v-model="price">
    <p>折扣:{{ discount }}折</p>
    <input v-model="discount">
    <h3>折后价:{{ final }}</h3> -->

</template>
<style scoped>
.title{
    height: 6px;
    font-size: 36px;
}
</style>