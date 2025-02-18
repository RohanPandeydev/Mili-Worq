import axios from "axios"
import config from "../../../config"
import HttpHelper from "../../helper/HttpHelper"

const ClientServices = {}

ClientServices.create = (formdata) => {
    return axios.post(`${config.apiUrl}/clients`, formdata, HttpHelper.getAuthHeader())
}

ClientServices.getList = () => {
    return axios.get(`${config.apiUrl}/clients`, HttpHelper.getAuthHeader())
}
ClientServices.getDetails = (data) => {
    return axios.get(`${config.apiUrl}/clients/${data?.id}`, HttpHelper.getAuthHeader())
}
ClientServices.updateClients = (data) => {
    return axios.put(`${config.apiUrl}/clients/${data?.id}`, data, HttpHelper.getAuthHeader())
}
ClientServices.deleteClient = (data) => {
    return axios.delete(`${config.apiUrl}/clients/${data?.id}`, {}, HttpHelper.getAuthHeader())
}

export default ClientServices;