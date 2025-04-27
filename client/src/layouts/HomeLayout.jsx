import React from 'react';
import Navbar from '../component/Navbar';
const HomeLayout = ({children}) => {
    return<>
    <Navbar />
    {children}    
    <div>
        Footer
    </div>
    </>   
}
export default HomeLayout
    
    