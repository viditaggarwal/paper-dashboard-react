import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { updateStockName, fetchAllStocks } from '../../actions/stockActions';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';  // Import the CSS
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const dispatch = useDispatch();

    const stocks = useSelector(state => state.stocks.stocks);
  
    const navigate = useNavigate();  
    const [selected, setSelected] = useState([]);

    React.useEffect(() => {
        dispatch(fetchAllStocks());
    }, [dispatch]);
    
    const handleTypeaheadSelection = (selected) => {
        setSelected(selected);
        console.log(selected);
        if (selected.length > 0 && selected[0].ticker) {
            navigate(`/${selected[0].ticker}`);
        }
    };
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSelected(selected);
        if (selected.length > 0 && selected[0].ticker) {
            navigate(`/${selected[0].ticker}`);
        }
    };
    return (
        <>
            <form onSubmit={handleFormSubmit} className="d-flex flex-grow-1 mx-3">
                <Typeahead
                    id="stock-typeahead"
                    filterBy={['name', 'ticker']}
                    labelKey={(option) => `${option.ticker} (${option.name})`}
                    onChange={handleTypeaheadSelection}
                    options={stocks}
                    placeholder="Search stocks..."
                    selected={selected}
                    className="flex-grow-1"
                />
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                </InputGroupAddon>
            </form>
        </>
    );
}

export default SearchBar;