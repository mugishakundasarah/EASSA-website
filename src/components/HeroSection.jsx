import heroImage from "../assets/bracelet.png";

const HeroSection = () => {
    return (
        <div
            className="relative bg-cover bg-center h-[90vh] flex items-center"
            style={{
                backgroundImage: `linear-gradient(
          to right,
          rgba(92, 0, 0, 0.5) 0%,
          rgba(92, 0, 0, 0.6) 50%,
          rgba(92, 0, 0, 0.3) 85%,
          rgba(92, 0, 0, 0) 100%
        ), url(${heroImage})`,
            }}
        >
            <div className="relative max-w-screen-xl ml-24 px-6 text-left text-white">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
                    Welcome to <br /> <span className="text-white">EASSA</span>
                </h1>
                <p className="text-md font-light mb-6">
                    Celebrating East African Culture At Stanford
                </p>
                <button className="bg-[#5C0000] text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-[#7a0000] transition">
                    Learn more
                </button>
            </div>
        </div>
    );
}

export default HeroSection