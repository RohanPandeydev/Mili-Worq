import { createContext, useEffect, useState } from "react";
import React from "react";
import StorageHelper from "../helper/StorageHelper";

const UserContext = createContext();

const UserData = ({ children }) => {
  const myuserToken =StorageHelper.getToken();
  const myuserData =StorageHelper.getUserData();

  const [token, setToken] = useState(myuserToken?myuserToken:"");
  const [userData, setUserData] = useState(myuserData!=null ? myuserData : {});
  return (
    <UserContext.Provider
      value={{
        setToken,
        token,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserData;
export { UserContext };
