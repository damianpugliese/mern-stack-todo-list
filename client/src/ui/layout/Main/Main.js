import React from 'react';
import './Main.scss';

const Main = ({ children }) => {

    return (
        <main className="main-container">
            {children}
        </main>
    )
}

export default Main;