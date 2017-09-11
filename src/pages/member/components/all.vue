<template>
    <div class="container " style="min-height: 597px;">
        <div class="block-list address-list section section-first js-no-webview-block"
          v-if="lists&&lists.length">
            <a class="block-item js-address-item address-item " 
            :class="{'address-item-default': list.isDefault}"
            :key="list.id"
            v-for="list in lists"
            @click="toEdit(list)">
                <div class="address-title">{{list.name}} {{list.tel}}</div>
                <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
                <a class="addressedit"></a>
            </a>
        </div>
        <div v-else>
            没有地址，请添加
        </div>
        <div class="block stick-bottom-row center">
            <router-link  class="btn btn-blue js-no-webview-block js-add-address-btn"
            :to="{name:'form', query:{type:'add'}}">
                新增地址
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['lists'])
    },
    created() {
        if(!this.lists){
            this.$store.dispatch('getLists')
        }
    },
    methods: {
        toEdit(list) {
            this.$router.push({
               name:'form',
               query:{
                   type:'edit',
                   instance: list
               }
            })
        }
    }
}
</script>
