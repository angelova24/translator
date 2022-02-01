import ProfileActions from "../components/Profile/ProfileActions";
import TranslationHistory from "../components/Profile/TranslationHistory";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";

const Profile = () => {
  const { user } = useUser(); //take logged in user

  return (
    <>
      <h1>Profile</h1>
      <h2>Hello, {user.username}</h2>
      <ProfileActions />
      <TranslationHistory translations={user.translations.slice(-10)} />
    </>
  );
};

export default withAuth(Profile);
