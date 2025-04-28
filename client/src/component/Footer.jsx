import React from 'react';
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

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <FaPhone className="text-indigo-500" />
                                <span>+977 9823232323</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <FaEnvelope className="text-indigo-500" />
                                <span>info@tournament.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <FaMapMarkerAlt className="text-indigo-500" />
                                <span>Kathmandu, Nepal</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FaInstagram size={24} />
                            </a>
                        </div>
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
