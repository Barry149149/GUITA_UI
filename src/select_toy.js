import React from 'react';

import AsyncSelect from 'react-select/async';
import { colourOptions } from './docs/data';

/*function for filter the option*/
const filterOptions = (inputValue) => {
    return colourOptions.filter(i => //colourOptions is the in the data.js
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterOptions(inputValue));
    }, 1000);
};

export default class WithCallbacks extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            inputValue: new String(),
            selection: new String(),
            opType: 0
        };
    }
    handleInputChange = (newValue) =>{
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    }

    render() {
        return (
            <div>
                <pre>the selected value: "{this.state.selection}"</pre>
                <pre>inputValue: "{this.state.inputValue}"</pre>
                <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    onInputChange={this.handleInputChange}
                />
            </div>
        );
    }
}

