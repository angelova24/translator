import { useState } from "react";
import { clearTranslationHistory } from "../../api/user";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";

const ProfileActions = () => {
  const { user, setUser } = useUser();
  const [apiError, setApiError] = useState(null);

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      storageDelete(STORAGE_KEY_USER); //delete user from local storage
      setUser(null); //delete user from state and return to login page
    }
  };

  const handleClearHistoryClick = async () => {
    if (!window.confirm("Are you sure? All history will be deleted!")) {
      return;
    }

    const [error, updatedUser] = await clearTranslationHistory(user.id);

    if (error !== null) {
      setApiError(error); //if something goes wrong in api
    }

    storageSave(STORAGE_KEY_USER, updatedUser); //update local storage
    setUser(updatedUser); //update state
  };

  return (
    <>
      {apiError && <p>{apiError}</p>}
      <button onClick={handleClearHistoryClick}>
        Clear translation history
      </button>
      <button onClick={handleLogoutClick}>Logout</button>
    </>
  );
};

export default ProfileActions;
