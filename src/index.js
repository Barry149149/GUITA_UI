import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Selection from "./sidebar";
import {optionType} from "./docs/data";

class Editor extends React.Component{
    render(){
        return(
            <div className="ide">
                <div className="sidebar">
                    <Selection>
                        {optionType.DRIVER}
                    </Selection>
                </div>
                <div className="textarea">
                    This is a editor
                </div>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <Editor />,
    document.getElementById('root')
);
