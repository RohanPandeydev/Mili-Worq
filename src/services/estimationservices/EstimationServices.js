import axios from "axios"
import config from "../../../config"
import HttpHelper from "../../helper/HttpHelper"

const EstimationServices = {}

EstimationServices.create = (formdata) => {
    return axios.post(`${config.apiUrl}/projectestimations`, formdata, HttpHelper.getAuthHeader())
}
EstimationServices.cabinetCreate = () => {
    return axios.get(`${config.apiUrl}/clients`, HttpHelper.getAuthHeader())
}
EstimationServices.getEstimateDetails = (data) => {
    return axios.get(`${config.apiUrl}/projectestimations/${data?.id}`, HttpHelper.getAuthHeader())
}
EstimationServices.getCabinetList = (data) => {
    return axios.get(`${config.apiUrl}/projectestimations`, HttpHelper.getAuthHeader())
}
EstimationServices.getProjectestList = (data) => {
    return axios.get(`${config.apiUrl}/projectestimations/projects/${data?.id}`, HttpHelper.getAuthHeader())
}
EstimationServices.updateCabinet = (data) => {
    return axios.put(`${config.apiUrl}/projectestimations/${data?.id}`, data, HttpHelper.getAuthHeader())
}
EstimationServices.deleteCabinetData = (data) => {
    return axios.delete(`${config.apiUrl}/projectestimations/${data?.id}`, {}, HttpHelper.getAuthHeader())
}

EstimationServices.createEstimation=(formdata)=>{
    return axios.post(`${config.apiUrl}/estimations`, formdata, HttpHelper.getAuthHeader())

}
EstimationServices.createEstimator=(formdata)=>{
    return axios.post(`${config.apiUrl}/estimators?name=${formdata?.name}`,{}, HttpHelper.getAuthHeader())

}
EstimationServices.getEstimator=()=>{
    return axios.get(`${config.apiUrl}/estimators`, HttpHelper.getAuthHeader())

}
EstimationServices.getEstimations=(data)=>{
    return axios.get(`${config.apiUrl}/estimations/projects/${data?.id}`, HttpHelper.getAuthHeader())

}

export default EstimationServices;