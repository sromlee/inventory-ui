import { useState } from "react";

import Form from "react-bootstrap/Form";
const AutoComplete = ({ data }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length >= 1) {
      const filterSuggestions = data.filter(
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
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <div className="form-control">
        {suggestions.map((suggestion, index) => {
          return (
            <p
            //   className={index === suggestionIndex ? "form-control" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div>
        <Form.Control
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-expanded="false"
        />
        {suggestionsActive && <Suggestions aria-expanded="false"/>}
   
    </div>
  );
};

export default AutoComplete;
