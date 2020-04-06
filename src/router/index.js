import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home";
import AccountList from "@/components/AccountList";
import Login from "@/components/Login";
import Tabs from "@/components/Tabs";
import Filter from "../components/ValueFilter";
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/', name: 'Home', component: Home},
    {path: '/accountList', name: 'AccountList', component: Tabs},
    {path:'/user/login', name:'Login', component: Login},
  ]
})
