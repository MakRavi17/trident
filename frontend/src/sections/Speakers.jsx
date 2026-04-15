import { motion } from "framer-motion";
import { SPEAKERS } from "../utils/constants";
import { fadeInUp, staggerContainer } from "../utils/animations";

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Speakers() {
  return (
    <motion.section
      id="speakers"
      className="section section-speakers"
      aria-labelledby="speakers-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div className="container" variants={staggerContainer}>
        <motion.p className="section-label" variants={fadeInUp}>
          SPEAKERS
        </motion.p>
        <motion.h2
          id="speakers-title"
          className="section-heading"
          variants={fadeInUp}
        >
          Meet The Minds
        </motion.h2>
        <motion.p className="section-subtext" variants={fadeInUp}>
          Curated leaders, founders, and strategists sharing what actually
          works.
        </motion.p>

        <div className="speakers-grid">
          {SPEAKERS.map((speaker) => (
            <motion.article
              key={speaker.name}
              className="card speaker-card"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="speaker-avatar">{getInitials(speaker.name)}</div>
              <h3>{speaker.name}</h3>
              <p className="speaker-title">{speaker.title}</p>
              <p className="speaker-company">{speaker.company}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Speakers;
