import TranslationHistoryItem from "./TranslationHistoryItem";

const TranslationHistory = ({ translations }) => {
  const translationList = translations.map((translation, index) => (
    <TranslationHistoryItem
      key={index + " - " + translation}
      translation={translation}
    />
  ));

  return (
    <section>
      <h4>Translation history:</h4>
      <ul>{translationList}</ul>
    </section>
  );
};

export default TranslationHistory;
