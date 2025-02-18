
import axios from "axios"
import config from "../../../config"
import HttpHelper from "../../helper/HttpHelper"

const AuthServices = {}

AuthServices.login = (formdata) => {
    return axios.post(`${config.apiUrl}/token`, formdata, HttpHelper.getAuthHeader())

}
AuthServices.userDetails = () => {
    return axios.get(`${config.apiUrl}/auth/me`, HttpHelper.getAuthHeader())
}

export default AuthServices;