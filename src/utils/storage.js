//save key value pair to local storage
export const storageSave = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value)); //not sure if its correct to store the whole user object as value
};
//read from local storage
export const storageRead = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }

  return null;
};
//delete from local storage
export const storageDelete = (key) => {
  localStorage.removeItem(key);
};
