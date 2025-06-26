'use client';
import { useEffect, useState } from "react";


const NotFound = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [glitchActive, setGlitchActive] = useState(false);
    const [stars, setStars] = useState([]);

    useEffect(() => {
        // Generate random stars for background
        const generateStars = () => {
            const newStars = [];
            for (let i = 0; i < 50; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                    delay: Math.random() * 3
                });
            }
            setStars(newStars);
        };
        generateStars();

        // Glitch effect interval
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 4000);

        return () => clearInterval(glitchInterval);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    return (
        <div 
            className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            {/* Animated background stars */}
            <div className="absolute inset-0">
                {stars.map(star => (
                    <div
                        key={star.id}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            animationDelay: `${star.delay}s`
                        }}
                    />
                ))}
            </div>

            {/* Interactive light effect */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1), transparent 40%)`
                }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* 404 Number with glitch effect */}
                <div className="relative mb-8">
                    <h1 className={`text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 leading-none select-none transition-all duration-200 ${
                        glitchActive ? 'animate-pulse filter blur-sm' : ''
                    }`}>
                        404
                    </h1>
                    {glitchActive && (
                        <>
                            <h1 className="absolute top-0 left-0 text-9xl md:text-[12rem] font-black text-red-500 leading-none opacity-70 transform translate-x-1 -translate-y-1">
                                404
                            </h1>
                            <h1 className="absolute top-0 left-0 text-9xl md:text-[12rem] font-black text-blue-500 leading-none opacity-70 transform -translate-x-1 translate-y-1">
                                404
                            </h1>
                        </>
                    )}
                </div>

                {/* Error message */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-bounce">
                        Oops! Lost in Space
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        The page you're looking for has drifted into the digital void. 
                        But don't worry, we'll help you navigate back to safety.
                    </p>
                </div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 animate-float">
                    <div className="w-8 h-8 text-yellow-400 opacity-60 flex items-center justify-center">
                        ⚡
                    </div>
                </div>
                <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="w-6 h-6 text-pink-400 opacity-60 flex items-center justify-center">
                        ⭐
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-2">
                            🏠
                            Take Me Home
                        </span>
                    </button>

                    <button className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400 rounded-full font-semibold text-cyan-400 text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50">
                        <span className="flex items-center gap-2">
                            🔍
                            Search Site
                        </span>
                    </button>

                    <button className="group relative px-8 py-4 bg-transparent border-2 border-gray-400 rounded-full font-semibold text-gray-400 text-lg transition-all duration-300 hover:bg-gray-400 hover:text-gray-900 hover:scale-105">
                        <span className="flex items-center gap-2">
                            ←
                            Go Back
                        </span>
                    </button>
                </div>

                {/* Fun fact */}
                <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-md mx-auto">
                    <p className="text-gray-300 text-sm leading-relaxed">
                        <span className="text-cyan-400 font-semibold">Fun Fact:</span> The first 404 error was discovered at CERN in 1992. 
                        You're part of internet history!
                    </p>
                </div>
            </div>

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-pink-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-cyan-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default NotFound;