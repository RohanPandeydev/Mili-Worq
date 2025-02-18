import axios from "axios"
import config from "../../../config"
import HttpHelper from "../../helper/HttpHelper"

const Projectservices = {}
Projectservices.create = (data) => {
    return axios.post(`${config.apiUrl}/projects`, data, HttpHelper.getAuthHeader())
}
Projectservices.createStatus = (data) => {
    return axios.post(`${config.apiUrl}/project/statuses`, data, HttpHelper.getAuthHeader())
}
Projectservices.getList = () => {
    return axios.get(`${config.apiUrl}/projects`, HttpHelper.getAuthHeader())
}
Projectservices.getDetails = (data) => {
    return axios.get(`${config.apiUrl}/projects/${data?.id}`, HttpHelper.getAuthHeader())
}
Projectservices.getProjectInfo = (data) => {
    return axios.get(`${config.apiUrl}/projects/project-details/${data?.id}`, HttpHelper.getAuthHeader())
}
Projectservices.getStatusList = () => {
    return axios.get(`${config.apiUrl}/project/statuses`, HttpHelper.getAuthHeader())
}
Projectservices.updteProject = (data) => {
    return axios.put(`${config.apiUrl}/projects/${data?.id}`, data, HttpHelper.getAuthHeader())
}
Projectservices.deleteProject = (data) => {
    return axios.delete(`${config.apiUrl}/projects/${data?.id}`, {}, HttpHelper.getAuthHeader())
}
Projectservices.getStatusDetails = (data) => {
    return axios.get(`${config.apiUrl}/project/statuses/${data?.id}`, HttpHelper.getAuthHeader())
}
Projectservices.updteStatusProject = (data) => {
    return axios.put(`${config.apiUrl}/project/statuses/${data?.id}`, data, HttpHelper.getAuthHeader())
}
Projectservices.deleteStatus = (data) => {
    return axios.delete(`${config.apiUrl}/project/statuses/${data?.id}`, {}, HttpHelper.getAuthHeader())
}

export default Projectservices;
