import Axios from "axios"
import ApiTools from "./ApiTools";

export default {
    getAll(data) {
        return Axios.get(`/api/roles`, {params: data})
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    get(data) {
        return Axios.get(`/api/roles/${data.Id}`)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    add(data = {}) {
        return Axios.post(`/api/roles`, data)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    update(data) {
        return Axios.put(`/api/roles/${data.Id}`, data)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    },
    delete(data) {
        return Axios.delete(`/api/roles/${data.id}`)
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    }
}