import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, staggerContainer } from "../utils/animations";

function Welcome() {
  return (
    <motion.section
      id="moments"
      className="welcome section"
      aria-labelledby="welcome-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div
        className="container welcome-container"
        variants={staggerContainer}
      >
        <motion.div className="welcome-left" variants={fadeInLeft}>
          <p className="section-label">BNI WELCOME</p>
          <h2 id="welcome-title" className="welcome-heading">
            WELCOME TO THE <span className="orange-gradient-text">TRIDENT</span>{" "}
            SUMMIT 1.0
          </h2>
          <p className="welcome-lead">
            A one-day business conclave curated to spark high-value connections,
            cross-regional collaboration, and strategic growth.
          </p>
        </motion.div>

        <div className="welcome-divider" aria-hidden="true" />

        <motion.div className="welcome-right" variants={fadeInRight}>
          <p className="welcome-text">
            The Trident Summit 1.0 is a one-day business conclave by{" "}
            <strong>BNI Chapter- Poseidon</strong> curated to spark{" "}
            <strong>high-value connections</strong>, cross-regional
            collaborations, industry insights, and strategic business growth.
          </p>

          <p className="welcome-text">
            Built on the ethos of the{" "}
            <strong>Trident-Network, Growth, and Transformation</strong> - the
            summit brings the finest minds of BNI across regions together under
            one powerful platform. Whether you are here to{" "}
            <strong>connect, collaborate, learn, or expand</strong>:
          </p>

          <p className="welcome-text">
            your day is designed to unlock{" "}
            <strong>meaningful business outcomes</strong> at every touchpoint.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Welcome;
