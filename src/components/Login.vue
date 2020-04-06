<template>
    <div id="Login" v-loading="false" style="margin: 0 auto">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-dialog title="用户登陆" :visible.sync="dialogFormVisible" width="30%" style="font-family:Hiragino Sans GB,serif">
                <el-form ref="userForm" :model="userForm" label-width="80px" :rules="rules">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="userForm.username" autocomplete="off" placeholder="键入你的用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userForm.password" autocomplete="off" placeholder="键入你的密码"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
                    <el-button @click="toHome">取消</el-button>
                </div>
            </el-dialog>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                userForm: {
                    username: '',
                    password: '',
                    isLogin:false
                },
                dialogFormVisible: true,
                formLabelWidth: '120px',
                rules: {
                    username: [
                        {required: true, message: '这是必填项!', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '这是必填项!', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            toHome(){
                this.dialogFormVisible = false;
                this.$router.push({path: "/"});
                this.dialogFormVisible = true;
            },
            submitForm: function (Dataset) {
                this.dialogFormVisible = false;
                this.$refs[Dataset].validate((valid) => {
                    if (valid) {
                        // 成功
                        this.$axios.post("/apis/user/user_login/", {
                            username: this.userForm.username,
                            password: this.userForm.password,
                        })
                            .then(response => {
                                if (response.data.status === 0) {
                                    this.$router.push({path: "/"});
                                    window.location.reload();
                                } else {
                                    this.$notify({
                                        title: '登录失败',
                                        message: response.data.message,
                                        type: 'error'
                                    });
                                }

                            })
                    } else {
                        return false;
                    }this.dialogFormVisible = true;
                })
            }
        }
    }
</script>

<style scoped>

</style>
