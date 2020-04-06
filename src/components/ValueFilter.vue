<template>
    <div class="inputFilter" style="margin: 0 auto">
        <el-row gutter="30">
            <el-col :xs="12" :sm="5" :span="5" >
                <el-input placeholder="姓名" v-model="valueName" suffix-icon="el-icon-user" clearable>
                </el-input>
            </el-col>
            <el-col :xs="12" :sm="5" :span="5" >
                <el-input placeholder="单位" v-model="valueCompany" suffix-icon="el-icon-house" clearable>
                </el-input>
            </el-col>
            <el-col :xs="12" :sm="5" :span="5" >
                <el-input placeholder="系统" v-model="valueSystem" suffix-icon="el-icon-s-tools" clearable>
                </el-input>
            </el-col>
            <el-col :xs="12" :sm="5" :span="5" >
                <el-select v-model="valueJurisdiction" placeholder="权限" clearable>
                    <el-option v-for="item in optionsOne" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="24" :sm="4" :span="4">
                <el-button icon="el-icon-search" circle @click="sendValue">
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ValueFilter",
        data(){
            return{
                optionsOne: [{value: '选项1', label: '一般用户'}],
                valueName: null,
                valueCompany: null,
                valueSystem: null,
                valueJurisdiction: null
            }
        },
        methods:{
            sendValue(){
                this.$emit("sendValues", this.valueName, this.valueCompany,
                    this.valueSystem, this.valueJurisdiction);
            }
        }
    }
</script>

<style scoped>

</style>