import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUpModule from "react-countup";
import { STATS } from "../utils/constants";
import { fadeInUp, staggerContainer } from "../utils/animations";

const CountUp = CountUpModule?.default ?? CountUpModule;

const frameworkItems = [
  {
    title: "Speed Networking",
    description:
      "Precisely timed interactions built to help members build high-value introductions fast.",
    icon: "S",
  },
  {
    title: "Cross Region Collaboration",
    description:
      "Bridge chapters and regions to unlock partnerships, referrals, and strategic opportunities.",
    icon: "C",
  },
  {
    title: "Vendor Meet",
    description:
      "A focused marketplace format where solution providers and members connect with intent.",
    icon: "V",
  },
];

function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-120px",
  });

  return (
    <motion.section
      id="about"
      className="section section-about"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div
        className="container about-layout"
        variants={staggerContainer}
      >
        <motion.div className="about-copy" variants={fadeInUp}>
          <p className="section-label">ABOUT</p>
          <h2 className="section-heading">What is TRIDENT?</h2>

          <p className="about-text">
            TRIDENT is a high-impact one-day summit designed by BNI Poseidon for
            entrepreneurs, founders, and business leaders who are serious about
            growth.
          </p>

          <p className="about-text">
            This is not just another networking event. TRIDENT is a curated
            experience built to create real business outcomes.
          </p>

          <div className="divider" />

          <h3 className="about-subheading">Why Attend?</h3>
          <ul className="about-list">
            <li>Direct access to proven business leaders</li>
            <li>Structured networking for real connections</li>
            <li>Actionable strategies you can implement immediately</li>
          </ul>
        </motion.div>

        <motion.div className="about-stats" ref={ref} variants={fadeInUp}>
          <div className="stat-grid">
            {STATS.map((stat) => (
              <motion.article
                key={stat.label}
                className="card stat-card"
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ duration: 0.25 }}
              >
                <div className="stat-number">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  ) : (
                    "0"
                  )}
                </div>

                <h3>{stat.label}</h3>
                <p>{stat.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="framework-grid">
            {frameworkItems.map((item) => (
              <motion.article
                key={item.title}
                className="card framework-card"
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.28 }}
              >
                <div className="framework-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default About;
