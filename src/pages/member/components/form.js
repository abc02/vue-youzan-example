import Address from 'js/addressService.js'
export default {
    data() {
        return {
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            type: '',
            instance: '',
            addressData: require('js/address.json'),
            cityLists: null,
            districtLists: null
        }
    },
    created() {
        let query = this.$route.query
        this.type = query.type
        this.instance = query.instance

        if(this.type === 'edit'){
            let ad = this.instance
            this.provinceValue = parseInt(ad.provinceValue)
            this.address  = ad.address
            this.name = ad.name
            this.tel = ad.tel
            this.id = ad.id
        }
    },
    methods: {
        add() {
            //合法校验&非空字符串
            let {name, tel,provinceValue, cityValue, districtValue, address} = this
            let data = {name, tel,provinceValue, cityValue, districtValue, address}
            if(this.type === 'add'){
                Address.add(data).then(res=>{
                    this.$router.go(-1)
                })
            }
            if(this.type === 'edit'){
                Address.update(data).then(res=>{
                    this.$router.go(-1)
                })
            }
        },
        remove() {
            Address.remove(this.id).then(res=>{
                this.$router.go(-1)
            })

        },
        setDefault(){
            Address.setDefault(this.id).then(res=>{
                this.$router.go(-1)
            })
        }
    },
    watch: {
        provinceValue(val) {
            console.log('provinceValue', val)
            if (val === -1) return
            let list = this.addressData.list
            // 找到省级的索引位置
            let index = list.findIndex(item => {
                return item.value === val
            })
            //找到省级  => 市级
            console.log(list[index].children)
            this.cityLists = list[index].children
            // 重新选择省级， 还原市级、区级
            console.log(this.cityValue)
            this.cityValue = -1
            this.districtValue = -1
            if(this.type === 'edit'){
                this.cityValue = parseInt(this.instance.cityValue)
            }
        },
        cityValue(val) {
            // val为什么是字符串
            console.log('cityValue', typeof val)
            if(val == -1) return 
            console.log(val)
            let list = this.cityLists
            // 找到市级的位置
            let index = list.findIndex(item => {
                return item.value === val
            })
            //找到 市级 => 区级
            this.districtLists = list[index].children
            // 重新选择省级， 还原市级、区级
            this.districtValue = -1
            if(this.type === 'edit'){
                this.districtValue = parseInt(this.instance.districtValue)
            }
        }
    }

}