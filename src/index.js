import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core';
import {orange,yellow}from '@material-ui/core/colors';

const theme=createTheme({
  palette: {
    primary: {main:'#e65100'},
    secondary: yellow,
  }
})

ReactDOM.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
