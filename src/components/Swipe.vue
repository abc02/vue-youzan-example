<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<style>
.swiper-slide img {
    width: 100%;
    height: 100%;
}
.swiper-slide a.js-no-follow{
    width:100%; 
    height: 100%;
}
.swiper-pagination{
    text-align: center;
}
</style>


<script>
import Swipe from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
    name: 'swipe',
    props: ['lists', 'name'],
    created() {
    },
    mounted() {
        new Swipe('.swiper-container', {
            loop: true,
            autoplay: 2000,
            pagination: '.swiper-pagination'
        })
    },
    // watch: {
    //     lists(val, oldVal) {
    //         console.log(document.querySelectorAll('.swiper-slide'))
    //         this.$nextTick(() => {
    //             console.log(document.querySelectorAll('.swiper-slide'))
    //         })
    //     }
    // }
}
</script>
