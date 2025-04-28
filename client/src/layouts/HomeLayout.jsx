import React from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
const HomeLayout = ({children}) => {
    return<>
    <Navbar />
    {children}    
    <Footer/>
    </>   
}
export default HomeLayout
    
    