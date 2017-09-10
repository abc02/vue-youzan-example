<template>
    <div class="container " style="min-height: 597px;">
        <div class="block-list address-list section section-first js-no-webview-block"
          v-if="lists&&lists.length">
            <a class="block-item js-address-item address-item " 
            :class="{'address-item-default': list.isDefault}"
            :key="list.id"
            v-for="list in lists"
            @click="toEdit">
                <div class="address-title">{{list.name}} {{list.tel}}</div>
                <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
                <a class="addressedit"></a>
            </a>
            <a class="block-item js-address-item address-item address-item-default" href="https://pfmarket.youzan.com/user/address/form?m_alias=3nu78u467kddj&amp;id=69150193&amp;from=">
                <div class="address-title">tony 13112345678</div>
                <p>北京市北京市东城区天安门</p>
            </a>
        </div>
        <div v-else>
            没有地址，请添加
        </div>
        <div class="block stick-bottom-row center">
            <router-link to="/address/form" class="btn btn-blue js-no-webview-block js-add-address-btn">
                新增地址
            </router-link>
        </div>
    </div>
</template>

<script>
import Address from 'js/addressService.js'
export default {
    data() {
        return {
            lists: null,
        }
    },
    created() {
        Address.list().then(res => {
            console.log(res)
            this.lists = res.data.lists
        })
    },
    methods: {
        toEdit() {
            this.$router.push({
                path: '/address/form'
            })
        }
    }
}
</script>
