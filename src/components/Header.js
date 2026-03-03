"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

function Header() {
    const [userEmail, setUserEmail] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const role = localStorage.getItem('userRole');
        const adminrole = localStorage.getItem('adminrole');

        setUserEmail(storedEmail);
        if (role === 'partner') setIsUser(true);
        if (adminrole === 'ADMIN') setIsAdmin(true);
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            window.location.href = '/login';
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 w-full">
            <div className="px-4 sm:px-6 w-full">
                <div className="flex justify-between items-center h-16 w-full">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900">Meetopia Events</h1>
                        </Link>

                        <nav className="md:ml-8 md:flex md:space-x-6">
                            <Link href="/events" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Evenimente
                            </Link>
                            <Link href="/partners" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Organizatori
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Contact
                            </Link>
                            {isUser && (
                                <Link href="/partnerpanel" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Panel Organizator
                                </Link>
                            )}
                            {isAdmin && (
                                <Link href="/admin" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Admin Panel
                                </Link>
                            )}
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {userEmail ? (
                            <div className="relative">
                                <Button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    variant="outline"
                                    className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-gray-300 flex items-center space-x-2"
                                >
                                    <span>{userEmail}</span>
                                    <svg className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>

                                {menuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-2 z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg mx-2 transition-colors"
                                        >
                                            Profil
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg mx-2 transition-colors max-w-52"
                                        >
                                            Deconectare
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline" className="cursor-pointer rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50">
                                        Autentificare
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="cursor-pointer rounded-xl bg-indigo-600 hover:bg-indigo-700">
                                        Înregistrare
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
