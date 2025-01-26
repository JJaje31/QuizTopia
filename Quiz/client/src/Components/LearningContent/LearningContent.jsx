import React from 'react';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router';

const Learn = ({ setNavParams, setVisible, userSubjects, setLoggedIn }) => {
    const { id, itemId } = useParams();
    const filtered = userSubjects.filter(sub => sub._id === itemId);
    const { learning_content, topics } = filtered[0];

    useEffect(() => {
        setVisible(false);
        setNavParams(id);
        setLoggedIn(true);
    }, [userSubjects]);

    return (
        <div className="mx-auto my-16 w-full max-w-4xl p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg">
            <div className="flex flex-col items-center text-center p-6 border-b border-gray-700">
                <h1 className="text-4xl font-extrabold text-indigo-500">{topics}</h1>
                <p className="mt-2 text-lg text-gray-300">Dive into the topics and expand your knowledge!</p>
            </div>

            <div className="space-y-8 mt-6">
                {learning_content.map((item, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-lg bg-gray-700  transition duration-300 shadow-md"
                    >
                        <h2 className="text-2xl font-semibold text-indigo-400">{item.subject}</h2>
                        <p className="mt-4 text-gray-100 leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    className="px-6 py-3 rounded-full bg-indigo-500 text-white text-lg font-semibold hover:bg-indigo-600 transition duration-300"
                    onClick={() => document.location.href = `/quiz/${id}/${itemId}`}
                >
                   Take Quiz
                </button>
            </div>
        </div>
    );
};

export default Learn

