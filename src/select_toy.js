import React from 'react';

import AsyncSelect from 'react-select/async';
import { colourOptions } from './docs/data';

const filterColors = (inputValue) => {
    return colourOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterColors(inputValue));
    }, 1000);
};

export default class WithCallbacks extends React.Component{
    constructor(props) {
        super(props);
        this.state={inputValue: new String()};
    }
    handleInputChange = (newValue) =>{
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    }
    render() {
        return (
            <div>
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