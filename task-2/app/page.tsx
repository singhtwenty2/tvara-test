"use client";

import { useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) return;

        setLoading(true);
        setResponse("");

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            setResponse(data.response || data.error || "No response");
        } catch (err) {
            setResponse("Failed to get response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Ask Gemini
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your question..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400"
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Loading..." : "Ask Gemini"}
                    </button>
                </form>

                {loading && (
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div
                                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                            ></div>
                        </div>
                        <p className="text-center text-gray-600 mt-3 text-sm">
                            Loading response...
                        </p>
                    </div>
                )}

                {response && !loading && (
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <h2 className="font-semibold mb-4 text-gray-800 text-lg border-b border-gray-200 pb-2">
                            Response:
                        </h2>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {response}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
