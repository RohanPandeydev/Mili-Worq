import axios from "axios"
import config from "../../config"
import HttpHelper from "../helper/HttpHelper"

const UnitService = {}
UnitService.create = (data) => {
    return axios.post(`${config.apiUrl}/units`, data, HttpHelper.getAuthHeader());
}
UnitService.createCabinet = (data) => {
    return axios.post(`${config.apiUrl}/unit_cabinets`, data, HttpHelper.getAuthHeader());
}
UnitService.updteUnitCabinet = (data) => {
    return axios.put(`${config.apiUrl}/unit_cabinets/${data?.id}`, data, HttpHelper.getAuthHeader());
}
UnitService.get = () => {
    return axios.get(`${config.apiUrl}/units`, HttpHelper.getAuthHeader());
}
UnitService.getCabinetList = (data) => {
    return axios.get(`${config.apiUrl}/unit_cabinets/units/${data?.id}`, HttpHelper.getAuthHeader());
}
UnitService.getDetails = (data) => {
    return axios.get(`${config.apiUrl}/units/${data?.id}`, HttpHelper.getAuthHeader());
}
UnitService.getByEstimationId = (data) => {
    return axios.get(`${config.apiUrl}/units/estimations/${data?.id}`, HttpHelper.getAuthHeader());
}
UnitService.updte = (data) => {
    return axios.put(`${config.apiUrl}/units/${data?.id}`, data, HttpHelper.getAuthHeader());
}
UnitService.delete = (data) => {
    return axios.delete(`${config.apiUrl}/unit_cabinets/${data?.id}`, {}, HttpHelper.getAuthHeader());
}


export default UnitService;
