import Axios from "axios"
import ApiTools from "./ApiTools";

export default {
    getAll(data) {
        return Axios.get(`/api/actions`, {params: data})
            .then(function (response) {
                ApiTools.checkResponseForErrorEventsToEmit(response);

                return response.data;
            })
    }
}