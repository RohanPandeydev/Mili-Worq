class StorageHelper {
  // token
  setToken(data) {
    localStorage.setItem("mil_worq_user_token", data);
  }

  getToken() {
    return localStorage.getItem("mil_worq_user_token");
  }
  getUserData() {
    return JSON.parse(localStorage.getItem("mil_worq_user_details"));
  }
  setUserData(data) {
    return localStorage.setItem("mil_worq_user_details", JSON.stringify(data));
  }

  removeStorageData() {
    localStorage.removeItem("mil_worq_user_details");
    return localStorage.removeItem("mil_worq_user_token");
  }
}

export default StorageHelper = new StorageHelper();
