"use client";
import { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

export default function NoteForm() {
    const { contract, account } = useWeb3();
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contract.methods.createNote(content).send({ from: account });
            setContent(''); // Clear the input field after submission
            alert('Note created!');
        } catch (error) {
            console.error(error);
            alert('Failed to create note.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add a feedback</h2>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                rows="4"
            />
            <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
            >
                Send
            </button>
        </form>
    );
}
