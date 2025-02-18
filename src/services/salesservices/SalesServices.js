import axios from "axios"
import config from "../../../config"
import HttpHelper from "../../helper/HttpHelper"

const SalesServices = {}


SalesServices.create = (data) => {
    return axios.post(`${config.apiUrl}/salespersons`, data, HttpHelper.getAuthHeader())
}
SalesServices.getList = () => {
    return axios.get(`${config.apiUrl}/salespersons`, HttpHelper.getAuthHeader())
}
SalesServices.getDetails = (data) => {
    return axios.get(`${config.apiUrl}/salespersons/${data?.id}`, HttpHelper.getAuthHeader())
}
SalesServices.updateSalesPerson = (data) => {
    return axios.put(`${config.apiUrl}/salespersons/${data?.id}`, data, HttpHelper.getAuthHeader())
}
SalesServices.deleteSalesPerson = (data) => {
    return axios.delete(`${config.apiUrl}/salespersons/${data?.id}`, {}, HttpHelper.getAuthHeader())
}

export default SalesServices;