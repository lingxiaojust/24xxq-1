import { ref,reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  let username = ref('张三');
  let userlist =reactive([
    {
        id:'1',
        name:'小明',
        age:20
    },
    {
        id:'2',
        name:'小王',
        age:21
    },
    {
        id:'3',
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