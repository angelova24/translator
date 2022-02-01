import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { storageRead } from "../utils/storage";

//Context object -> exposing
const UserContext = createContext();

//own custom hook
export const useUser = () => {
  return useContext(UserContext); // provide the state {user, setUser}
};

//Provider -> managing state
const UserProvider = (props) => {
  const [user, setUser] = useState(storageRead(STORAGE_KEY_USER));

  const state = {
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
