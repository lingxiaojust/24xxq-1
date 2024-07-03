<script setup>
    import { ref,computed } from 'vue';
    const price=ref(100);
    const discount=ref(8);

    const final=computed(()=>{
        return price.value*(discount.value/10)
    })
    let btn = document.querySelectorAll('a');
    btn.onmousemove = (e) => {
        let x = e.pageX - btn.offsetLeft;
        let y = e.pageY - btn.offsetTop;
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`); 
    }
    
</script>
<template>
    
    <div class="title">欢迎</div>
    <RouterLink :to="'/list'" href="#" style="--clr:#ff0;"><span>查看学生列表
        </span></RouterLink>
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
* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #222;
    gap: 50px;
    flex-direction: column;
}
a {
    position: relative;
    padding:20px 60px;
    background-color: rgba(45,45,45,1);
    border-radius: 50px;
    color:#999;
    font-size:1.5em;
    text-decoration: none;
    overflow: hidden;
    transition: .5s;
}

a:hover {
    color: var(--clr);
    text-shadow: 0 0 15px var(--clr),
                0 0 15px var(--clr);

}

a span{
    position: relative;
    z-index: 1;
    letter-spacing: .2em;
}

a::before{
    content: '';
    position: absolute;
    top:var(--y);
    left:var(--x);
    transform: translate(-50%,-50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(var(--clr), transparent, transparent);
    opacity: 0;
    transition: .5s, top 0s, left 0s;

}

a:hover::before{
    opacity: 1;
}

a::after{
    content: '';
    position: absolute;
    background-color: rgba(45,45,45,.8);
    inset: 2px;
    border-radius: 48px;

}
</style>