import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import { frameworkOption, optionType, languageOption, driverOption } from './docs/data';

function FrameWorkSelection(selectionType){

    const [state, setState] = useState({inputValue:" ",selected:" "})

    const handleInputChange = (newValue) =>{
        const inValue = newValue.replace(/\W/g, '');
        setState({...state, inputValue: inValue });
    }

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterOptions(inputValue));
        }, 1000);
    };

    const filterOptions = (inputValue) => {
        return frameworkOption.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handleChange= (e) =>{
        setState({...state, selected:e.value});
    }

    return (
            <div>
                <pre>inputValue: "{state.inputValue}"</pre>
                <pre>selected: "{state.selected}"</pre>
                <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                />
            </div>
        );
}

export default FrameWorkSelection;