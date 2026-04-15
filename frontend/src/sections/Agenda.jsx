import { motion } from "framer-motion";
import { AGENDA } from "../utils/constants";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "../utils/animations";

function Agenda() {
  return (
    <motion.section
      id="agenda"
      className="section section-agenda"
      aria-labelledby="agenda-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div className="container" variants={staggerContainer}>
        <motion.p className="section-label" variants={fadeInUp}>
          AGENDA
        </motion.p>
        <motion.h2
          id="agenda-title"
          className="section-heading"
          variants={fadeInUp}
        >
          Event Schedule
        </motion.h2>
        <motion.p className="section-subtext" variants={fadeInUp}>
          A carefully crafted day of learning, networking, and transformation.
        </motion.p>

        <div
          className="timeline"
          role="list"
          aria-label="Summit agenda timeline"
        >
          {AGENDA.map((item, index) => {
            const isLeft = index % 2 === 0;
            const cardVariants = isLeft ? fadeInLeft : fadeInRight;

            return (
              <motion.article
                key={`${item.time}-${item.title}`}
                className={`timeline-item ${isLeft ? "timeline-left" : "timeline-right"}`}
                role="listitem"
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline-card card">
                  <div className="timeline-time">{item.time}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="timeline-duration">{item.duration}</span>
                </div>
                <div className="timeline-center">
                  <span className="timeline-dot" />
                  <span className="timeline-badge">{item.time}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Agenda;
