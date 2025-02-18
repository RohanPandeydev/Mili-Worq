import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../helper/HttpHelper";


const UnitServices = {};

UnitServices.create = (data) => {
  return axios.post(`${config.apiUrl}/units`, data, HttpHelper.getAuthHeader());
};

export default UnitServices;
