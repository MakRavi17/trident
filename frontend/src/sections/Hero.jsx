import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fadeInUp, staggerContainer } from "../utils/animations";

const particles = [
  { top: "14%", left: "12%", delay: 0.1 },
  { top: "20%", left: "82%", delay: 0.7 },
  { top: "32%", left: "18%", delay: 1.1 },
  { top: "56%", left: "8%", delay: 0.3 },
  { top: "68%", left: "86%", delay: 1.3 },
  { top: "84%", left: "72%", delay: 0.9 },
];

function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero section" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-gradient hero-gradient-left" />
        <div className="hero-gradient hero-gradient-right" />
        {particles.map((particle, index) => (
          <span
            key={`${particle.top}-${particle.left}`}
            className="hero-particle"
            style={{
              top: particle.top,
              left: particle.left,
              animationDelay: `${particle.delay}s`,
              width: `${4 + (index % 3) * 2}px`,
              height: `${4 + (index % 3) * 2}px`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container hero-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-kicker" variants={fadeInUp}>
          BNI POSEIDON PRESENTS
        </motion.p>

        <motion.h1
          id="hero-title"
          className="hero-brand orange-gradient-text"
          variants={fadeInUp}
        >
          TRIDENT
        </motion.h1>

        <motion.p className="hero-subtitle" variants={fadeInUp}>
          Network &gt; Grow &gt; Transform
        </motion.p>

        <motion.h2 className="hero-title" variants={fadeInUp}>
          Mastering the Direction of Growth
        </motion.h2>

        <motion.p className="hero-description" variants={fadeInUp}>
          Join founders, leaders, and growth-minded professionals for a
          high-impact summit focused on strategic networking, business momentum,
          and transformational outcomes.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Button
            variant="primary"
            className="hero-button"
            onClick={() => navigate("/register")}
          >
            SECURE MY SPOT
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#moments"
        className="hero-scroll"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.55 }}
        aria-label="Scroll to the next section"
      >
      
      </motion.a>
    </section>
  );
}

export default Hero;
