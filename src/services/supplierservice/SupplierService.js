import axios from "axios"
import config from "../../../config"
import HttpHelper from "../../helper/HttpHelper"

const SupplierService = {}
SupplierService.create = (data) => {
    return axios.post(`${config.apiUrl}/suppliers`, data, HttpHelper.getAuthHeader())
}
SupplierService.get = () => {
    return axios.get(`${config.apiUrl}/suppliers`, HttpHelper.getAuthHeader())
}
SupplierService.getDetails = (data) => {
    return axios.get(`${config.apiUrl}/suppliers/${data?.id}`, HttpHelper.getAuthHeader())
}
SupplierService.updte = (data) => {
    return axios.put(`${config.apiUrl}/suppliers/${data?.id}`, data, HttpHelper.getAuthHeader())
}
SupplierService.delete = (data) => {
    return axios.delete(`${config.apiUrl}/suppliers/${data?.id}`, {}, HttpHelper.getAuthHeader())
}

export default SupplierService;
