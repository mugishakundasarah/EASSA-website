// Text-focused About page (no decorative images)

const About = () => {
  return (
    <>
      {/* Simple header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-[#5C0000]">About EASSA</h1>
          <p className="text-gray-700 max-w-3xl">
            Building a vibrant home for students, faculty, alumni, and friends of East Africa — celebrating together
            through music, language, food, and stories.
          </p>
        </div>
      </section>

      {/* About EASSA */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">About EASSA</h2>
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The East African Stanford Students Association (EASSA) builds a vibrant home for students, faculty,
            alumni, and friends of East Africa. Grounded in our shared cultures, we invite the wider Stanford community
            to taste Swahili, Kiswahili phrases, Ugandan rhythms, Ethiopian coffee traditions, and much more—celebrating
            together through music, language, food, and stories.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Vision</h3>
          <p className="text-gray-700 mb-6 max-w-3xl">
            We strive to create a strong, connected East-African community at Stanford by:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <span className="font-semibold">Showcasing culture</span> – signature programmes such as Nyama Choma Social (East-African barbecue)
                and Sauti Motomoto (our high-energy dance night) bring the sights, sounds, and flavours of the region to campus.
              </li>
              <li>
                <span className="font-semibold">Strengthening bonds</span> – regular gatherings, from tea circles to film nights, spark friendships that
                last well beyond graduation.
              </li>
              <li>
                <span className="font-semibold">Offering solidarity</span> – new and continuing students find mentorship, academic support, and a listening
                ear within the EASSA family.
              </li>
              <li>
                <span className="font-semibold">Keeping alumni close</span> – we host virtual catch-ups and Bay-Area mixers so graduates remain part of the story.
              </li>
              <li>
                <span className="font-semibold">Creating quarterly moments</span> – cook-outs, game days, study-jam evenings, and round-table talks ensure there is
                always an upcoming reason to connect.
              </li>
            </ul>
            <div />
          </div>
        </div>
      </section>

      {/* Leadership & Membership */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-4">Leadership & Membership</h3>
            <p className="text-gray-700 mb-4 max-w-2xl">
              EASSA is led by a student executive team—President, Vice-President, Financial Officer, Event Coordinators, and Communications team.
            </p>
            <p className="text-gray-700 max-w-2xl">
              Membership is open to all Stanford students; associate membership welcomes faculty, staff, and alumni who share our passion for East Africa.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-2">Explore our flagship events</h4>
            <p className="text-sm text-gray-600">
              From high-energy dance nights to community cookouts and study jams, we host events every quarter.
              Visit the Events page to see what’s coming up.
            </p>
          </div>
        </div>
      </section>

      {/* Our Event Pillars */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8">Our Event Pillars</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold mb-2">Cultural & Community</h4>
              <p className="text-gray-700 mb-3">
                Celebrate East-African heritage while bonding over food, music, and shared stories.
              </p>
              <p className="text-sm text-gray-600">
                Sample: Nyama-Choma cookouts · On-campus East-African music parties · Movie nights · Restaurant tastings · Weekend retreats · Campus picnics
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold mb-2">Fun & Adventure</h4>
              <p className="text-gray-700 mb-3">
                Light-hearted outings that turn classmates into lifelong friends.
              </p>
              <p className="text-sm text-gray-600">
                Sample: Santa Cruz beach trips · Bowling evenings · Laser-tag battles · Board- & video-game nights
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold mb-2">Study & Support</h4>
              <p className="text-gray-700 mb-3">
                Spaces to thrive academically and recharge together.
              </p>
              <p className="text-sm text-gray-600">
                Sample: Group study nights · Exam-week chai breaks · Peer-mentorship huddles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Instagram:</span> @eassa_stanford
              </li>
              <li>
                <span className="font-semibold">Join our mailing list:</span> eassa-students@lists.stanford.edu
              </li>
              <li>
                <span className="font-semibold">Email:</span> stanfordeassa@outlook.com
              </li>
            </ul>
            <p className="mt-4 text-gray-700">We can’t wait to welcome you—karibu sana!</p>
          </div>
          <div />
        </div>
      </section>
    </>
  );
};

export default About;