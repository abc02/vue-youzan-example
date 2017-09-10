export default {
    data() {
        return {
            name: '',
            tel: '',
            provinceName: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            type: '',
            instance: ''

        }
    },
    created() {
        let query = this.$route.query
        this.type = query.type
        this.instance = query.instance
    }
}