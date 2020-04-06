<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="自有人员" name="first">
            <AccountList class_list="自有人员"></AccountList>
        </el-tab-pane>
        <el-tab-pane label="委外人员" name="second">
            <AccountList class_list="委外人员"></AccountList>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import AccountList from "./AccountList";
    export default {
        name: "Tabs",
        components: {
           AccountList
        },
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }

</script>

<style scoped>

</style>