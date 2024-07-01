import { ref,reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  let username = ref('张三');
  let userlist =reactive([
    {
        id:'210812000',
        name:'小明',
        age:20
    },
    {
        id:'210812001',
        name:'小王',
        age:21
    },
    {
        id:'210812002',
        name:'小李',
        age:20
    }
]);

  const setuserName = (newName) => {
    username.value = newName;
  };
  const setuserlist = (newList) => {
    userlist = newList;
  };
  return {
    username,
    userlist,
    setuserName,
    setuserlist
  };
});