import Axios from "axios"

export default {
    /**
     *
     * @param {object} loginInfo
     * @returns {Promise<*>}
     */
    login(loginInfo) {
        return Axios.post(`/api/login`, loginInfo)
            .then(function (response) {
                return response.data;
            })
    }
}
