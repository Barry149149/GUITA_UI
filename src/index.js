import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Editor extends React.Component{
    render(){
        return(
            <div className="ide">
                <div className="sidebar">
                    This is a sidebar
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
