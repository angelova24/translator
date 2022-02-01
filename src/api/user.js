import { createHeaders } from ".";
const apiURL = process.env.REACT_APP_API_URL;

const checkForUser = async (username) => {
  try {
    const response = await fetch(`${apiURL}?username=${username}`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

const createUser = async (username) => {
  try {
    const response = await fetch(apiURL, {
      method: "POST", //Create a resource
      headers: createHeaders(),
      body: JSON.stringify({
        username,
        translations: [],
      }),
    });
    if (!response.ok) {
      throw new Error("Could not create user with username " + username);
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const loginUser = async (username) => {
  const [checkError, user] = await checkForUser(username);

  if (checkError !== null) {
    //if something goes wrong
    return [checkError, null];
  }

  if (user.length > 0) {
    //if this username exists
    return [null, user.pop()];
  }
  // user does NOT exist we create one
  return await createUser(username);
};

export const updateTranslationsToUser = async (
  userId,
  savedTranslations,
  newTranslation
) => {
  try {
    const response = await fetch(`${apiURL}/${userId}`, {
      method: "PATCH", // NB: Set method to PATCH
      headers: createHeaders(),
      body: JSON.stringify({
        // Provide new translations to add to user with id 1
        translations: [...savedTranslations, newTranslation],
      }),
    });
    if (!response.ok) {
      throw new Error("Could not complete request");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const clearTranslationHistory = async (userId) => {
  try {
    const response = await fetch(`${apiURL}/${userId}`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({
        translations: [], //clear translations
      }),
    });
    if (!response.ok) {
      throw new Error("Could not complete request");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};
