import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateTranslationsToUser } from "../../api/user";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageSave } from "../../utils/storage";
import TranslatedText from "./TranslatedText";

const translationConfig = {
  required: true,
  maxLength: 40,
};

const TranslationForm = () => {
  //Hooks
  const { user, setUser } = useUser();
  const {
    register, //register inputs in our form
    handleSubmit, //built in function that we are linking to the form submission
    formState: { errors }, //we get the errors from form state
  } = useForm();
  //Local state
  const [apiError, setApiError] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const onTranslateButton = async ({ textToTranslate }) => {
    const [error, data] = await updateTranslationsToUser(
      user.id,
      user.translations,
      textToTranslate
    );
    if (error !== null) {
      setApiError(error); //if something goes wrong in api
    }
    if (data !== null) {
      setUser(data); //update the state
      storageSave(STORAGE_KEY_USER, data); //update the local storage
      setShowTranslation(true); //show translated text
    }
  };
  //Render function to display error messages if input doesn't meet the requirements
  const errorMessage = (() => {
    if (!errors.textToTranslate) {
      return null;
    }
    if (errors.textToTranslate.type === "required") {
      return <i>Please type anything to translate</i>;
    }
    if (errors.textToTranslate.type === "maxLength") {
      return <i>Text is too long (max 40 symbols)</i>;
    }
  })();

  return (
    <form onSubmit={handleSubmit(onTranslateButton)}>
      <label htmlFor="textToTranslate">Text to translate:</label>
      <input
        type="text"
        placeholder="Type here.."
        {...register("textToTranslate", translationConfig)}
      />
      <button type="submit">Translate</button>
      {errorMessage}
      {apiError && <p>{apiError}</p>}
      {showTranslation && (
        <TranslatedText textToTranslate={user.translations.slice(-1)} />
      )}
    </form>
  );
};

export default TranslationForm;
