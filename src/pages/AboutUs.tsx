import { motion } from 'framer-motion';

const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About BlueForce
            </motion.h1>
            <motion.p 
              className="text-xl mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Connecting skilled blue-collar workers with employers across India
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              BlueForce exists to bridge the gap between skilled blue-collar workers and employers, creating a platform that provides equal opportunities, fair wages, and dignity of labor for all. We aim to transform the unorganized blue-collar sector in India through technology and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Micro-Insurance Benefit Section */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          className="bg-blue-50 rounded-xl shadow flex flex-col md:flex-row items-center justify-between p-8 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left: Text */}
          <div className="flex-1 min-w-[260px]">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Micro-Insurance Benefit</h3>
            <p className="text-gray-700 mb-4">
              We believe in protecting the workforce that builds our nation. That's why a portion of the one-time registration fee paid by workers (₹200) goes into providing them with basic micro-insurance coverage.
            </p>
            <div className="mb-3">
              <span className="font-semibold">Coverage Includes:</span>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Accidental coverage up to ₹50,000</li>
                <li>Hospitalization benefit of ₹500/day (up to 10 days/year)</li>
                <li>Disability benefit</li>
                <li>Work-related injury compensation</li>
              </ul>
            </div>
            <p className="text-gray-700 mb-4">
              This insurance is active for one year from the date of registration, providing workers with a safety net as they pursue job opportunities through our platform.
            </p>
            <button className="mt-2 px-5 py-2 bg-white border border-blue-600 text-blue-700 rounded-md font-medium hover:bg-blue-100 transition">Learn More About Pricing</button>
          </div>
          {/* Right: Icon and short desc */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-[220px]">
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600 mb-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V7l7-4z" /></svg>
              <div className="text-lg font-semibold text-gray-900 mb-1">Micro-Insurance</div>
              <div className="text-gray-600 text-center">Protection for workers at an affordable cost</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Our story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold">Our Story</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-lg mb-6">
                  BlueForce was founded in 2023 with a simple observation: despite the digital revolution in India, the blue-collar workforce remained largely disconnected from technology-driven opportunities.
                </p>
                <p className="text-lg mb-6">
                  Our founders witnessed first-hand the challenges faced by skilled workers in finding consistent employment, and employers in locating reliable talent. This disconnect was costing both parties time, money, and opportunity.
                </p>
                <p className="text-lg">
                  What began as a simple idea has now evolved into a comprehensive platform dedicated to empowering workers and revolutionizing how employers connect with blue-collar talent.
                </p>
              </motion.div>

              <motion.div
                className="rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Team collaborating"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Our Core Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Inclusivity", description: "Creating a platform that is accessible to all, regardless of language, education, or technology expertise." },
              { title: "Transparency", description: "Building trust through honest communication, fair pricing, and clear policies." },
              { title: "Dignity of Labor", description: "Recognizing and respecting the value of skilled work and those who perform it." },
              { title: "Innovation", description: "Continuously improving our platform to better serve the needs of our users." }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3 text-blue-700">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Have questions or feedback about BlueForce? We'd love to hear from you.
            </p>
            <motion.a 
              href="mailto:contact@blueforce.in"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-full font-medium text-lg hover:bg-blue-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
