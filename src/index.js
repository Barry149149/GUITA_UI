import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editor from './components/Editor';
import {Router} from 'react-router-dom'

// ========================================

ReactDOM.render(
    <Router>
        <Editor/>
    </Router>,
    document.getElementById('root')
);
