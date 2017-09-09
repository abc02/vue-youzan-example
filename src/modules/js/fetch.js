import axios from 'axios'


function fetch(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            let outerStatus = res.status
            let innerStatus = res.data.status

            if (outerStatus === 200 | innerStatus === 200) {
                resolve(res)
            }
            if (outerStatus === 300) {
                location.href = 'login.html'
            }
        }).catch(error => {
            reject(error)
        })
    })
}


export default fetch