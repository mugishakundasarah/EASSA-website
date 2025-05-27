import groupPhoto from "../assets/Aboutuspic.png";
import contactFeet from "../assets/feet-style.png";

const About = () => {
  return (
    <>
      {/* Group Image Banner */}
      <section>
        <img src={groupPhoto} alt="EASSA Group" className="w-fulxl h-auto" />
      </section>

      {/* Who We Are */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-center">Who We Are</h2>
          <p className="text-gray-700 max-w-5xl mx-auto mb-4">
            We are an organization committed to building a vibrant community of East African students, faculty,
            and friends of East Africa. While centered on East African culture, we warmly welcome the wider Stanford
            community to engage, learn, and celebrate with us.
          </p>
          <div className=" max-w-5xl mx-auto">
            <h3 className="text-lg font-semibold mt-8 mb-2 self-center">Vision Statement:</h3>
            <p className="text-gray-700 mb-4">
              Our vision is to create a strong and connected East African community at Stanford by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 max-w-3xl ">
              <li>Sharing East African culture through programs like Nyama choma Social and Sauti Motomoto.</li>
              <li>Strengthening community bonds through gatherings and cultural events.</li>
              <li>Providing support and solidarity among East Africans at Stanford.</li>
              <li>Maintaining connections with EASSA alumni.</li>
              <li>
                Organizing engaging events each quarter, such as cookouts, game days, and study nights,
                to bring people together.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stanford Email</label>
                <input type="email" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input type="tel" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input type="text" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
              </div>
              <button type="submit" className="bg-[#5C0000] text-white px-6 py-2 rounded-full font-medium">
                Submit
              </button>
            </form>
          </div>

          <div>
            <img src={contactFeet} alt="Contact Us Design" className=" rounded-md" />
          </div>
        </div>
      </section>
    </>
  );
}

export default About