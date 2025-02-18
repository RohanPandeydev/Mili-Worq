import axios from "axios"
import config from "../../config"
import HttpHelper from "../helper/HttpHelper"

const EstimationService = {}
EstimationService.create = (data) => {
    return axios.post(`${config.apiUrl}/estimations`, data, HttpHelper.getAuthHeader());
}
EstimationService.get = () => {
    return axios.get(`${config.apiUrl}/estimations`, HttpHelper.getAuthHeader());
}
EstimationService.getDetails = (data) => {
    return axios.get(`${config.apiUrl}/estimations/${data?.id}`, HttpHelper.getAuthHeader());
}
EstimationService.getByProjectsId = (data) => {
    return axios.get(`${config.apiUrl}/estimations/projects/${data?.id}`, HttpHelper.getAuthHeader());
}
EstimationService.updte = (data) => {
    return axios.put(`${config.apiUrl}/estimations/${data?.id}`, data, HttpHelper.getAuthHeader());
}
EstimationService.delete = (data) => {
    return axios.delete(`${config.apiUrl}/estimations/${data?.id}`, {}, HttpHelper.getAuthHeader());
}

export default EstimationService;
