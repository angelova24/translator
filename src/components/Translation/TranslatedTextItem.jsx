const TranslatedTextItem = ({ char }) => {
  if (!char.match(/[a-z]/i)) {
    //it's not a letter return the symbol/number
    return <span>{char}</span>;
  } else {
    //it's a letter convert it into image
    const source = `pictures/${char.toLowerCase()}.png`; //take the picture url and return it
    return <img src={source} alt="" />;
  }
};

export default TranslatedTextItem;
