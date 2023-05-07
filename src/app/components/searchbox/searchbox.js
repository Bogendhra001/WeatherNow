import { useState } from "react";
import "./searchbox.css";
import { getCitiesByName } from "countrycitystatejson";

export default function SearchSection(props) {

    const parseSelectedCity = (val) => {
        props.getSearchData(val);
    }
    

    return(
        <div className="search-content">
            <SearchBox parseSelectedCity={parseSelectedCity}></SearchBox>
            <button className="search-btn"><img src="/icons/search-white.png" className="search-img"></img></button>
        </div>
    )
}

function SearchBox(props) {
    const [suggestions, setSuggestions] = useState([]);
    function parseSearch(val) {
        const text = val.target.value;
        const ele = document.getElementById('suggestions-content').style;
        if (text.length != 0) {
            ele.display = "block";
            setSuggestions(getCitiesByName(text));
        } else {
            ele.display = "none";
        }
    }

    const getCity = (val) => {
        const ele = document.getElementById('suggestions-content').style;
        ele.display = "none";
        props.parseSelectedCity(val);
        document.getElementById('search-box-input').value = '';
        // document.getElementById('search-box-input').value = `${val[0]}, ${val[1]}, ${val[2]}`;
    }

    return(
        <div className="search-suggest">
            <input type="text" placeholder="Search city..." name="search-input" className="search-input" id="search-box-input" onChange={parseSearch} />
            <GetSuggestion suggestions={suggestions} getCity={getCity}></GetSuggestion>
        </div>
    )
}

function GetSuggestion(props) {
    // console.log(suggestions);

    const selectCity = (val) => {
        props.getCity(val);
    }

    return( 
        <div className="suggestions-content" id="suggestions-content">
        {
        props.suggestions.map( (city, index) => {
            return (
                <button key={index} className="suggestion-single-city" onClick={() => selectCity([city.city.name, city.state, city.country.name])}>
                    {city.city.name} {'( '}<em>{city.state}, {city.country.name}</em>{' )'}
                </button>
            )
        } )
        }
        </div>
    )
}