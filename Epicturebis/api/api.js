const baseUrl = 'https://api.imgur.com/3/'
const clientId = '79b7a9997dd9744'
const clientSecret = '6e76ce7acdf704920a86a40954a7483d2ee4c7cb'
const clientToken = 'f03fef623739cd0075671053140decef1e5dd09a'

module.exports = {
    get (targetUrl) {
        return fetch(baseUrl + targetUrl, {
            headers: {
                Authorization: 'Bearer ' + clientToken,
            }
        })
            .then((res) => {
                return res.json()
            })
    },

    postImage (targetUrl, data) {
        return fetch(baseUrl + targetUrl, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + clientToken,
            },
            body: data ? JSON.stringify(data.data) : null
        })
            .then((res) => {
                return res.json()
            })
    },
}
