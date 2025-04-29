import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
     return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm">
                         Our Tournament Registration platform is a community-driven platform for tournament registration and opponent matching to make Organizing participating, and competing in sports tournaments easier than ever. 
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/tournaments" className="text-sm hover:text-white transition-colors">
                                    Tournaments
                                </Link>
                            </li>
                            <li>
                                <Link to="/find-opponent" className="text-sm hover:text-white transition-colors">
                                    Find Opponent
                                </Link>
                            </li>
                            <li>
                                <Link to="/registration" className="text-sm hover:text-white transition-colors">
                                    Registration
                                </Link>
                            </li>
                        </ul>
                    </div>

                   
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Tournament Registration. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
