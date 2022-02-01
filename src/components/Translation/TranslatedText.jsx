import TranslatedTextItem from "./TranslatedTextItem";

const TranslatedText = ({ textToTranslate }) => {
  let charArray = Array.from(...textToTranslate); //convert text into char array
  const result = charArray.map((char, index) => (
    <TranslatedTextItem key={index + " - " + char} char={char} />
  )); //pass every char to the translated text item component to convert it into image

  return (
    <section>
      <h4>Here is the translated text:</h4>
      <div>{result}</div>
    </section>
  );
};

export default TranslatedText;
