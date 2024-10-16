import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import globalReducer from "./stores/core.ts";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: globalReducer,
});

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <App/>
        </StrictMode>
    </Provider>
)
