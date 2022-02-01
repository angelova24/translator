import TranslationForm from "../components/Translation/TranslationForm";
import withAuth from "../hoc/withAuth";

const Translator = () => {
  return (
    <>
      <h1>Translator</h1>
      <TranslationForm />
    </>
  );
};

export default withAuth(Translator);
