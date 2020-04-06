<template>
    <div class="carousel">
        <el-carousel height="400px">
            <el-carousel-item class="carousel-item" v-for="item in 4" :key="item">
                <h3 class="h3style">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
    export default {
        name:'Home',
        components: { },
        data(){
            return{

            }
        },
    }
</script>

<style scoped>
    /*组件水平居中*/
    .carousel{
        position: relative;
        top: 50%;
        margin: -200px auto 0;
        width: calc(90%);
    }
    /*.el-carousel__item h3 {*/
    /*    color: #475669;*/
    /*    font-size: 18px;*/
    /*    opacity: 0.75;*/
    /*    line-height: 300px;*/
    /*    left: calc(80%*0.5);*/
    /*}*/
    /*文字水平居中*/
    .h3style {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 400px;
        margin: auto 0;
        text-align: center;
    }

    .carousel-item:nth-child(2n) {
        background-color: #99a9bf;
        background-image: url(http://bpic.588ku.com//back_origin_min_pic/19/07/03/c3058785f896c31a94c4d392289d7b42.jpg!/fw/750/quality/99/unsharp/true/compress/true);
        background-position: center;
        opacity: 0.75;
    }

    .carousel-item:nth-child(2n+1) {
        background-color: #d3dce6;
        background-image: url(http://p1.music.126.net/KXOVzfTQvmAOG89eQ6sYzg==/109951164816440018.jpg?imageView&blur=40x20);
        background-size: 6000px;
        background-position: center center;
    }
</style>
