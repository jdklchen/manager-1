<template>
    <div class="accountList" v-loading="loading" style="font-family:Hiragino Sans GB,serif">
        <ValueFilter @sendValues="getValue(arguments)"></ValueFilter>
<!--        &nbsp;<div class="tableFilter" style="margin: 0 auto">-->
<!--        <el-row gutter="3">-->
<!--            <el-col :xs="12" :sm="5" :span="5" >-->
<!--                <el-select v-model="valueName" placeholder="姓名" clearable>-->
<!--                    <el-option v-for="item in optionsOne" :key="item.value" :label="item.label" :value="item.label">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :xs="12" :sm="5" :span="5" >-->
<!--                <el-select v-model="valueCompany" placeholder="单位" clearable>-->
<!--                    <el-option v-for="item in optionsTwo" :key="item.value" :label="item.label" :value="item.label">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :xs="12" :sm="5" :span="5" >-->
<!--                <el-select v-model="valueSystem" placeholder="系统" clearable>-->
<!--                    <el-option v-for="item in optionsThree" :key="item.value" :label="item.label" :value="item.label">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :xs="12" :sm="5" :span="5" >-->
<!--                <el-select v-model="valueJurisdiction" placeholder="权限" clearable>-->
<!--                    <el-option v-for="item in optionsFour" :key="item.value" :label="item.label" :value="item.label">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--                <i class="el-icon-success"></i>-->
<!--            </el-col>-->
<!--            <el-col :xs="24" :sm="4" :span="4">-->
<!--                <el-button icon="el-icon-search" circle @click="filter()">-->
<!--                </el-button>-->
<!--            </el-col>-->
<!--        </el-row>-->
<!--    </div>-->
        &nbsp;
        <el-row>
            <el-col>
                <el-table ref="filterTable" :data="accountList" style="width: 100%" stripe border>
                    <el-table-column prop="account" label="账号" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="company" label="单位" width="220">
                    </el-table-column>
                    <el-table-column prop="system" label="系统" width="180">
                    </el-table-column>
                    <el-table-column v-if="class_list === '委外人员'" prop="time" label="时限" width="180">
                    </el-table-column>
                    <el-table-column prop="jurisdiction" label="权限">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        &nbsp;
        <el-row>
            <el-col :span="12" :offset="6" :xs="24">
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="size"
                            layout="total, sizes, prev, pager, next, jumper"  background
                            :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ValueFilter from "./ValueFilter";
    export default {
        name: 'AccountList',
        data() {
            return {
                accountList: null,
                size: 10,
                currentPage: 1,
                total: null,
                loading: true,
                // optionsOne: [{value: '选项1', label: '朱婷婷'}, {value: '选项2', label: '杜永刚'}, {value: '选项3', label: '陈曦'}],
                // optionsTwo: [{value: '选项1', label: '系统维护部'}, {value: '选项2', label: '业务支撑中心'}],
                // optionsThree: [{value: '选项1', label: 'O域门户'}],
                // optionsFour: [{value: '选项1', label: '一般用户'}],
                valueName: null,
                valueCompany: null,
                valueSystem: null,
                valueJurisdiction: null
            }
        },
        components:{
            ValueFilter
        },
        props:["class_list"],
        methods: {
            getValue(data){
                console.log(data);
                this.valueName = data[0];
                this.valueCompany = data[1];
                this.valueSystem = data[2];
                this.valueJurisdiction = data[3];
                this.filter();
            },
            //过滤函数，将过滤条件传给后台，将后台返回的数据赋值给对应键值。
            filter(){
                this.$axios.get('apis/account/get_account_list', {
                    params: {
                        size: this.size,
                        currentPage: 1,
                        name: this.valueName,
                        company: this.valueCompany,
                        system: this.valueSystem,
                        jurisdiction: this.valueJurisdiction,
                        class_list: this.class_list
                    },
                })
                    .then(response => {
                        this.accountList = response.data.data;
                        this.total = response.data.total;
                        this.loading = false
                    }),error => {
                    console.log("获取accountList出错了.");
                }
            },
            //改变当前每页多少条数据时，触发本函数
            handleSizeChange(val) {
                this.size = val;
                this.filter()
                console.log(`每页 ${this.size} 条`);
            },
            //改变当前页数时，触发此函数。
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$axios.get('apis/account/get_account_list', {
                    params: {
                        size: this.size,
                        currentPage: val,
                        name: this.valueName,
                        company: this.valueCompany,
                        system: this.valueSystem,
                        jurisdiction: this.valueJurisdiction,
                        class_list: this.class_list,
                    }
                })
                    .then(response => {
                        this.accountList = response.data.data;
                        this.total = response.data.total;
                        this.loading = false
                    }),error => {
                    console.log("获取accountList出错了.");
                }
                console.log(`当前页: ${val}`);
            },

        },
        created () {
            console.log(this.class_list)
            this.$axios.get("apis/account/get_account_list",{
                params: {
                    size: this.size,
                    currentPage: this.currentPage,
                    class_list: this.class_list,
                }
            })
                .then(response => {
                    this.accountList = response.data.data;
                    this.total = response.data.total;
                    this.loading = false
                }, error => {
                    console.log("获取accountList出错了.");
                });
        }
    }
</script>


<style scoped>
    .card-Company {
        min-width: 250px;
        max-width: 550px;
        margin: auto;
        margin-bottom: 20px;
    }

    .card-header-text {
        height: 8px;
    }

    .card-header-text span {
        font-size: 9px;
        color: #909399;
    }

</style>
