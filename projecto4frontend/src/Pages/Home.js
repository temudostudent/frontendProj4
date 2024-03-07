import React from 'react'
import Header from '../Components/CommonElements/Header'
import Footer from '../Components/CommonElements/Footer'
import Main from '../Components/MainScrum/Main'
import '../App.css';

function Home() {
    return (
        <div className='Home'>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Home