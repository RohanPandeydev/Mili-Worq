import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../helper/HttpHelper";

const CabinetServices = {};

CabinetServices.create = (formdata) => {
    return axios.post(`${config.apiUrl}/cabinets`,formdata,HttpHelper.getAuthHeader()
    );
};

CabinetServices.getList = () => {
    return axios.get(`${config.apiUrl}/cabinets`, HttpHelper.getAuthHeader());
};
CabinetServices.getDetails = (formdata) => {
    return axios.get(`${config.apiUrl}/cabinets/${formdata?.id}`,HttpHelper.getAuthHeader()
    );
};
CabinetServices.updateCabinet = (formdata) => {
    return axios.put(`${config.apiUrl}/cabinets/${formdata?.id}`,formdata,HttpHelper.getAuthHeader()
    );
};
CabinetServices.deleteCabinetDatabase = (formdata) => {
    return axios.delete(`${config.apiUrl}/cabinets/${formdata?.id}`,{},HttpHelper.getAuthHeader()
    );
};

export default CabinetServices;
