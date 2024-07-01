<script setup>
    import { reactive,ref} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '../store/user';
    
    const userStore = useUserStore();
    const { userlist } = storeToRefs(userStore);
    const { setuserlist }=userStore;
    let showFlag=ref(false);
    let IsEdit=ref(false);//默认新增
    let stuNum=ref(0);
    let name=ref("");
    let age=ref(0);
    let curtIndex=ref(0);
    const open = ref(false);
    const showModal = () => {
    open.value = true;
    };
    const handleOk = e => {
    console.log(e);
    open.value = false;
    };
    const delbtn=index=>{
        userStore.userlist.splice(index,1);
    }

    const addUser=()=>{
        IsEdit.value=false;
        showFlag.value=true;
    }

    const editbtn=index=>{
        const item=userStore.userlist[index];
        // item.age=22;
        stuNum.value=item.id;
        name.value=item.name;
        age.value=item.age;
        showModal();
        // showFlag.value=true;
        IsEdit.value=true;
        curtIndex=index;
    }
    // const checkbtn=id=>{
    //     const User=userStore.userlist.find(item=>item.id==id);
    //     alert(User.name)
    // }
    
    const checkList=(Inputstunum)=>{
        for(let index=0;index<userStore.userlist.length;index++){
            const element=userStore.userlist[index];
            if(Number(Inputstunum)===element.id){
                return true;
            }
        }
        return false;
    }

    const addNum2name=(name)=>{
        let total=0;
        userStore.userlist.map(item =>{
            if(item.name.indexOf(name)!==-1){
                let template=item;
                let templatename=template.name.splice('')
                templatename.splice(0,name.length)
                let IsStuNumCheck=IsNumber(templatename.join(''));
                if(templatename.length===0 || IsStuNumCheck){
                    total++;
                } 
            }
        })
        return `${name}${total===0?'':total}`
    }
    const IsNumber=(val)=>{
        let exg=/^\d+$/;
        if(!exg.test(val)){
            return false;
        }
        return true;
    }
    
    const submitFn=()=>{
        // ...是解构，把数组里的内容一个一个拿出来
        let IsStuNumCheck=IsNumber(stuNum.value);
        if(!IsStuNumCheck){
            alert("学号应为纯数字")
            return;
        }
        let tempName=addNum2name(name.value);
        if(IsEdit.value){
            userStore.userlist.splice(curtIndex.value,1)
            tempName=name.value;
        }

        let IsStuNumExist=checkList(stuNum.value);
        if(IsStuNumExist){
            alert("学号已存在！");
            return;
        }
        
        
        userStore.userlist.unshift=({
            id:stuNum.value,
            name:tempName,
            age:age.value
        });
        showFlag.value=false;
        // IsEdit.value=false;
        // alert(`新增同学：学号：${stuNum.value},姓名：${name.value},年龄:${age.value}`)
    }
</script>
<template>
<link href="./output.css" rel="stylesheet">
    <div class="list-componet">
        <h1 class="h-16 text-xl text-center">list</h1>
        <div class="tool-bar">
            <!-- <button class="add-btn" type="primary" @click="showFlag=true">新增</button> -->
            <a-button type="primary" @click="showModal" class="add-btn">新增</a-button>
        </div>
        <ul>
            <li>
                <span class="number">序号</span>
                <span class="stuID">学号</span>
                <span class="name">姓名</span>
                <span class="age">年龄</span>
                <div class="caozuo">操作</div>
            </li>
            <li v-for="(item,index) in userlist" :key="item.id">
                <span class="number">{{ index+1 }}</span>
                <span class="stuID">{{ item.id }}</span>
                <span class="name">{{ item.name }}</span>
                <span class="age">{{ item.age }}</span>
                <div class="caozuo">
                    <button @click="delbtn(index)">删除</button>
                    <button @click="editbtn(index)">修改</button>
                    <button @click="checkbtn(item.id)">搜索</button>    
                </div>
            </li>
            
        </ul>
        <div>
            <a-modal v-model:open="open" @ok="handleOk" >
            <h2>{{IsEdit? '编辑':'新增'}}信息</h2>
                <div class="blank-body">
                <div class="blank-item">
                    <span>学号</span><input type="text" v-model="stuNum">
                </div>
                <div class="blank-item">
                    <span>姓名</span><input type="text" v-model="name">
                </div>
                <div class="blank-item">
                    <span>年龄</span><input type="text" v-model="age">
                </div>
            </div>
            </a-modal>
        </div>
        <!-- <div class="pop-blank" v-if="showFlag">
            <h2>{{IsEdit? '编辑':'新增'}}信息</h2>
            <div class="blank-body">
            <div class="blank-item">
                <span>学号</span><input type="text" v-model="stuNum">
            </div>
            <div class="blank-item">
                <span>姓名</span><input type="text" v-model="name">
            </div>
            <div class="blank-item">
                <span>年龄</span><input type="text" v-model="age">
            </div>
        </div>
            <div class="footer">
                <button type="primary" @click="showFlag=false">取消</button>
                <button type="primary" @click="submitFn">确定</button>
                
            </div>
        </div> -->
    
    </div>
</template>
<style scoped>
.list-componet{
    text-align: left;
}
h1{
    text-align: center;
}
.tool-bar{
    display: flex;
    justify-content: flex-end;
    .add-btn{
        margin-right: 24px;
        background-color:black;
        color: white;
        width: 90px;
    }
}
ul{
    padding-left: 0;
    padding: 0 24px;  
    text-align: center;  
}

.pop-blank{
    
    background-color: white;
    position: absolute;
    height: 50vh;
    width:50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 24px;
    border: 1px solid black;
    border-radius: 8px;
    box-shadow: 1px;
    display: flex;
    flex-direction: column; 
    h2{
        text-align: center;
    }
    .blank-body{
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .blank-item{
            height: 72px;
            font-size: 24px;
            display: flex;
            span {
                margin-right: 12px;
                width: 60px;
            }
            input {
                height: 36px;
                flex-grow: 1;
                flex-shrink: 1;
                font-size: 16px;
            }
        }
    }
    
    
    .footer{
        /* position: absolute; */
        /* bottom: 24px; */
        display: flex;
        justify-content: flex-end;
        /* width: calc(100% - 48px); */
        width: 100%;
        button{
            background-color: blue;
            color: white;
        }
        &>button:nth-child(1){
            margin-right: 10px;
            background-color: white;
            color: blue;
            border: 1px solid blue;
        }
    }
}
li{
    list-style: none;
    display: flex;
    height: 64px;
    justify-content: flex-start;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(67, 71, 74, 0.247);
    /* 选择li对象的子对象（选择第一个） */
    &:nth-child(1){
        background-color: rgb(67, 71, 74);
        color: rgba(240, 242, 245, 0.831);
        align-items: center;
    }
    .name{
        width: 18%;
    }
    .number{
        width: 18%;
    }
    .stuID{
        width: 18%;
    }
    .age{
        width: 18%;
    }
    .caozuo{
        flex-grow: 1;
        display: flex;
        justify-content: space-around;
        &>button{
            background-color:black;
            color: white;
            width: 90px;
        }
    }
    

}

</style>