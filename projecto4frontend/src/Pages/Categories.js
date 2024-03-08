import React from 'react'
import Header from '../Components/CommonElements/Header'
import Footer from '../Components/CommonElements/Footer'
import Table from '../Components/CommonElements/Table'
import '../App.css';

function Categories() {
    return (
        <div className='Categories'>
            <Header />
            <div className='categories-table-container'>
                <Table />
            </div>
            <Footer />
        </div>
    )
}

export default Categories