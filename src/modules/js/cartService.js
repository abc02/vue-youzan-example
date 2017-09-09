import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Cart {
    static add(id) {
        return fetch(url.cartAdd, {
            id,
            number: 1
        })
    }
}


export default Cart