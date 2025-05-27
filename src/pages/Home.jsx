import React from 'react'
import HeroSection from '../components/HeroSection'
import missionImage from "../assets/imigongo.png";
import copresidentImg from '../assets/Anyango.png'
import presidentImg from "../assets/ora.png";
import financeImg from '../assets/Kuot.png'
import event1Img from '../assets/bubbles.png'
import event2Img from '../assets/Gradie.png'
import event3Img from '../assets/food.png'

const Home = () => {
  return (
    <>
        <HeroSection />
        {/* Mission & Goals */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Mission & Goals</h2>

            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-6">
                <h3 className="text-lg font-semibold">Subheading</h3>
                <p className="text-sm text-gray-700">
                  Body text for whatever you'd like to expand on the main point.
                  Add main takeaway points, quotes, anecdotes.
                </p>
              </div>
            ))}

            <div className="mt-4 space-x-4">
              <button className="bg-[#5C0000] text-white px-5 py-2 rounded-full text-sm font-medium">More</button>
              <button className="border border-gray-500 text-gray-700 px-5 py-2 rounded-full text-sm font-medium">Secondary button</button>
            </div>
          </div>

          <div>
            <img src={missionImage} alt="Mission & Goals" className="w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#5C0000] text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-3 gap-10 text-center">
          {[{
            name: "Rutayisire Ora Gratia",
            title: "President",
            country: "Rwanda, Kigali",
            img: presidentImg
          }, {
            name: "Anyango Miriro Ochieng",
            title: "Co-president",
            country: "Kenya, Nairobi",
            img: copresidentImg
          }, {
            name: "Kuot Kiir Aluetmiir Kiir",
            title: "Financial Officer",
            country: "South Sudan, Juba",
            img: financeImg
          }].map((person, i) => (
            <div key={i}>
              <img src={person.img} alt={person.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
              <p className="text-sm uppercase text-gray-200">{person.title}</p>
              <h3 className="text-lg font-semibold">{person.name}</h3>
              <p className="text-sm text-gray-300">{person.country}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: "Community",
              desc: "Body text for whatever you'd like to add more to the subheading.",
              img: event1Img
            }, {
              title: "Subheading",
              desc: "Body text for whatever you'd like to expand on the main point.",
              img: event2Img
            }, {
              title: "Subheading",
              desc: "Body text for whatever you'd like to share more.",
              img: event3Img
            }].map((event, i) => (
              <div key={i} className="bg-gray-50 rounded-lg shadow">
                <img src={event.img} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-md font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home