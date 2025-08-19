import React from 'react';
import braceletImage from "../assets/bracelet.png";

const HeroSection = () => {
    return (
        <div
            className="relative bg-cover bg-center h-[85vh] flex items-center"
            style={{
                background: `linear-gradient(135deg, 
                    #8B0000 0%, 
                    #A0522D 25%, 
                    #CD853F 50%, 
                    #D2691E 75%, 
                    #B8860B 100%)`,
            }}
        >
            <div className="absolute inset-0 bg-black/25"></div>
            <div className="relative max-w-screen-xl mx-auto px-6 flex items-center justify-around w-full">
                <div className="text-left text-white max-w-xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight drop-shadow">
                        Karibu to EASSA
                    </h1>
                    <p className="text-lg md:text-xl font-light mb-6">
                        Where East African culture meets Stanford life — music, language, food, and community.
                    </p>
                    <div className="flex gap-3">
                      <a href="/events" className="inline-block bg-white text-[#5C0000] text-sm font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition border-2" style={{ borderColor: 'var(--accent)' }}>
                        See events
                      </a>
                      <a href="/about" className="inline-block bg-[#5C0000] text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-[#7a0000] transition border-2 border-transparent">
                        Learn more
                      </a>
                    </div>
                </div>
                
                {/* 3D Bracelet Image */}
                <div className="hidden lg:block relative">
                    <div className="relative transform rotate-12 hover:rotate-0 transition-transform duration-500">
                        <img 
                            src={braceletImage}
                            alt="East African bracelet"
                            className="h-auto drop-shadow-2xl"
                            style={{
                                filter: 'drop-shadow(20px 20px 30px rgba(0,0,0,0.4))',
                                transform: 'perspective(1000px) rotateY(-15deg) rotateX(10deg)',
                            }}
                        />
                        {/* Additional 3D shadow effect */}
                        <div 
                            className="absolute inset-0 bg-black/20 blur-xl"
                            style={{
                                transform: 'perspective(1000px) rotateY(-15deg) rotateX(10deg) translateY(20px)',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;