import React from 'react'
import { motion } from 'framer-motion'
import { FaFire, FaMusic, FaMugHot } from 'react-icons/fa'
import HeroSection from '../components/HeroSection'
import missionImage from "../assets/imigongo.png";
import copresidentImg from '../assets/Anyango.png'
import presidentImg from "../assets/Ora.png";
import financeImg from '../assets/Kuot.png'
import event1Img from '../assets/bubbles.png'
import event2Img from '../assets/Gradie.png'
import event3Img from '../assets/Food.png'

const Home = () => {
  return (
    <>
        <HeroSection />
        {/* About snapshot */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <h2 className="text-3xl font-bold mb-6">About EASSA</h2>
            <p className="text-gray-700 mb-4">
              EASSA builds a vibrant home for students, faculty, alumni, and friends of East Africa at Stanford.
              We celebrate together through music, language, food, and stories.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Signature events like Nyama Choma Social and Sauti Motomoto</li>
              <li>Tea circles, film nights, and community gatherings</li>
              <li>Mentorship, academic support, and alumni connections</li>
            </ul>
            <div className="mt-6 space-x-4">
              <a href="/about" className="bg-[#5C0000] text-white px-5 py-2 rounded-full text-sm font-medium border-2 border-[#5C0000]">Learn more</a>
              <a href="/events" className="border-2 border-[var(--accent)] text-gray-800 px-5 py-2 rounded-full text-sm font-medium">See events</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}>
            <img src={missionImage} alt="Imigongo motif" className="w-full rounded-lg shadow" loading="lazy" />
          </motion.div>
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
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <img src={person.img} alt={person.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 ring-4 ring-white/20 shadow-lg" loading="lazy" />
              <p className="text-sm uppercase text-gray-200">{person.title}</p>
              <h3 className="text-lg font-semibold">{person.name}</h3>
              <p className="text-sm text-gray-300">{person.country}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: "Nyama Choma Social",
              desc: "Grill meat the East-African way and dance to Afro-fusion playlists.",
              img: event1Img,
              Icon: FaFire
            }, {
              title: "Sauti Motomoto",
              desc: "High-energy party with traditional and modern East-African music.",
              img: event2Img,
              Icon: FaMusic
            }, {
              title: "Study-Jam & Game Night",
              desc: "Quiet revision space followed by board games and chai.",
              img: event3Img,
              Icon: FaMugHot
            }].map((event, i) => (
              <motion.a key={i} href="/events" className="bg-gray-50 rounded-lg shadow block overflow-hidden"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 10px 16px rgba(0,0,0,0.08)' }}
              >
                <div className="relative">
                  <img src={event.img} alt={event.title} className="w-full h-48 object-cover" loading="lazy" />
                  <div className="absolute top-2 left-2 bg-white/90 text-[#5C0000] rounded-full p-2 shadow">
                    <event.Icon />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-md font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home