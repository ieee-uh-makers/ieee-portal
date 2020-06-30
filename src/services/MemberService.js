import Axios from "axios"
import ApiTools from "./ApiTools";

export default {
    getAll(data) {
        return Axios.get(`/api/members`, {params: data})
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    get(data) {
        return Axios.get(`/api/members/${data.Id}`)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    add(data = {}) {
        return Axios.post(`/api/members`, data)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    update(data) {
        return Axios.put(`/api/members/${data.Id}`, data)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    delete(data) {
        return Axios.delete(`/api/members/${data.Id}`)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    getTFAUri(data) {
        return Axios.get(`/api/memberTFAUri`, { params: data })
            .then(response => {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}