import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageSave } from "../../utils/storage";

//configuration for the username input
const usernameConfig = {
  required: true,
  minLength: 3,
};

const LoginForm = () => {
  //Hooks
  const {
    //destructuring items from useForm
    register, //register inputs in our form
    handleSubmit, //built in function that we are linking to the form submission
    formState: { errors }, //we get the errors from form state
  } = useForm();
  const { user, setUser } = useUser(); //user context for user state
  const navigate = useNavigate();

  //Local state
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  //Side effects
  useEffect(() => {
    //if user successfully log in redirect to translation page
    if (user !== null) {
      navigate("translator");
    }
  }, [user, navigate]);

  //Event handlers
  //we create a handler for Continue button
  const onSubmit = async ({ username }) => {
    setLoading(true); //prevent to click button while redirecting to next page
    const [error, userResponse] = await loginUser(username);
    if (error !== null) {
      setApiError(error); //if something goes wrong in api
    }
    if (userResponse !== null) {
      //if successfully logged in, save it to local storage and update state
      storageSave(STORAGE_KEY_USER, userResponse);
      setUser(userResponse);
    }
    setLoading(false); //when completed make button available again
  };

  //Render function to display error messages if username doesn't meet the requirements
  const errorMessage = (() => {
    if (!errors.username) {
      return null;
    }
    if (errors.username.type === "required") {
      return <i>Username is required</i>;
    }
    if (errors.username.type === "minLength") {
      return <i>Username is too short (min3.)</i>;
    }
  })();

  return (
    <>
      <h2>Please login first!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="Username"
            {...register("username", usernameConfig)}
          />
          {errorMessage}
        </fieldset>

        <button type="submit" disabled={loading}>
          Continue
        </button>
        {loading && <p>Logging in...</p>}
        {apiError && <p>{apiError}</p>}
      </form>
    </>
  );
};

export default LoginForm;
