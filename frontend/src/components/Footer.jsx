import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { NAV_LINKS } from "../utils/constants";

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container footer-top">
        <div>
          <a className="footer-brand" href="#home">
            TRIDENT
          </a>
          <p className="footer-tag">BNI Poseidon Presents</p>
          <p className="footer-copy">
            A premium one-day summit crafted for founders, leaders, and growth-
            minded professionals.
          </p>
        </div>

        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <div className="footer-links">
            {NAV_LINKS.map((item) => (
              <ScrollLink
                key={item.label}
                to={item.href.replace("#", "")}
                smooth
                duration={700}
                offset={-80}
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Contact</h3>
          <div className="footer-contact">
            <a href="mailto:trident@bniposeidon.com">trident@bniposeidon.com</a>
            <a href="tel:+919876543210">+91 98765 43210</a>
            <p>Ahmedabad, Gujarat</p>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2025 BNI Poseidon. All rights reserved.</p>
        <p>Made with heart for Growth</p>
      </div>
    </motion.footer>
  );
}

export default Footer;
