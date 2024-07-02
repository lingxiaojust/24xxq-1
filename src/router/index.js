import { createRouter, createWebHistory } from "vue-router";
import computed from "../views/computed.vue";
import list from "../views/list.vue";
import base from "../views/base.vue";
import hello from "../views/HelloWorld.vue"
import lite from "../views/lite.vue"
import form from "../views/form.vue"
const routes=[
    {
        path:'/computed',
        component:computed
    },
    {
        path:'/list',
        component:list
    },
    {
        path:'/base',
        component:base
    },
    {
        path:'/hello',
        component:hello
    },
    {
        path:'/form',
        component:form
    },
    {
        path:'/lite',
        component:()=>import('../views/lite.vue'),
    },
    {
        path:'/user/:id',
        name:'user',
        meta:{
            title:'用户信息'
        },
      
        component:()=>import('../views/user.vue')
    },
    {
        path:'/fa',
        component:()=>import('../views/father.vue'),
        children:[
            {
                path:'/fa/son',
                component:()=>import('../views/son.vue'),
            }
        ]
    },
    {
        path:'/echarts',
        component:()=>import('../views/echarts.vue')
    },
    {
        path:'/web3d',
        component:()=>import('../views/web3d.vue')
    },
]
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;