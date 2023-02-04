import { useState } from "react";
import Form from "react-bootstrap/Form";

const AutoComplete = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const setFinalValue = (text) => {
    if (props.name === "productId") {
      props.setProductID(text);
    }
    if (props.name === "barcode") {
      props.setBarcode(text);
    }
    if (props.name === "productName") {
      props.setProductName(text);
    }
  };

  const handleChange = (e) => {
    setFinalValue( e.target.value)
    const query = e.target.value.toLowerCase();
    setValue(query);

    if (query.length >= 1) {
      const filterSuggestions = props.data.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
      );

      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
    setFinalValue(e.target.innerText);
  };

 

  const Suggestions = () => {
    if (suggestions.length>=1) {
      return (
        <div className="form-control">
          {suggestions.map((suggestion, index) => {
            if(index <= 5) {
            return (
              <p
                // className={index === suggestionIndex ? "form-control" : ""}
                name={props.name}
                key={index}
                onClick={handleClick}
              >
                {suggestion}
              </p>
            ); }
          })}
        </div>
      );
    }
  };

  return (
    <div>
      <Form.Control
        type="text"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        aria-expanded="false"
        size="sm"
        
      />
      {suggestionsActive && <Suggestions aria-expanded="false" />}
    </div>
  );
};

export default AutoComplete;
