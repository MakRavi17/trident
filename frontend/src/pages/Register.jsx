import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    memberType: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleProceed = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name";
    }
    if (!formData.mobile.trim()) {
      nextErrors.mobile = "Please enter your mobile number";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address";
    }
    if (!formData.memberType.trim()) {
      nextErrors.memberType = "Please select your member type";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    navigate("/payment", { state: { formData } });
  };

  const scrollToForm = () => {
    if (formRef.current) {
      window.scrollTo({
        top: Math.max(formRef.current.offsetTop - 96, 0),
        behavior: "smooth",
      });
    }
  };

  const pageStyle = {
    background: "#0a0a0a",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
  };

  const heroStyle = {
    minHeight: "280px",
    padding: "120px 5% 64px",
    background:
      "radial-gradient(ellipse 60% 60% at 0% 100%, rgba(180,20,0,0.35) 0%, transparent 70%), #0a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  const formWrapStyle = {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 5%",
  };

  const formCardStyle = {
    background: "#111111",
    border: "1px solid rgba(255,107,53,0.2)",
    borderRadius: "20px",
    padding: "clamp(24px, 4vw, 48px)",
  };

  const fieldLabelStyle = {
    color: "#cccccc",
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "8px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid rgba(255,107,53,0.15)",
    borderRadius: "10px",
    padding: "14px 18px",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  const fieldWrapStyle = { marginBottom: "20px" };

  const errorStyle = {
    color: "#FF4500",
    fontSize: "13px",
    marginTop: "8px",
  };

  const radioRowStyle = {
    display: "flex",
    gap: "32px",
    flexWrap: "wrap",
  };

  const radioOptionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#ffffff",
    cursor: "pointer",
    position: "relative",
  };

  const hiddenRadioStyle = {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
  };

  const submitStyle = {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #FF6B35, #FF4500)",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "15px",
    letterSpacing: "0.1em",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "8px",
  };

  const ctaSectionStyle = {
    background: "#111111",
    padding: "60px 5%",
    textAlign: "center",
    borderTop: "1px solid rgba(255,107,53,0.1)",
  };

  return (
    <div className="register-page" style={pageStyle}>
      <style>{`
        .register-input:focus {
          border-color: #FF6B35 !important;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.1);
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={heroStyle}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              color: "#888",
              fontSize: "13px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            BNI POSEIDON PRESENTS
          </p>

          <h1
            style={{
              fontFamily: '"Bebas Neue", cursive',
              fontSize: "clamp(3rem, 7vw, 6rem)",
              margin: 0,
            }}
          >
            THE POSEIDON CONCLAVE
          </h1>

          <p
            style={{
              color: "#FF6B35",
              fontSize: "18px",
              marginTop: "12px",
              letterSpacing: "0.04em",
            }}
          >
            Network &gt; Grow &gt; Transform
          </p>
        </motion.div>
      </section>

      {/* FORM */}
      <section ref={formRef} style={formWrapStyle}>
        <motion.div
          style={formCardStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2
            style={{
              color: "#FF6B35",
              fontFamily: '"Bebas Neue", cursive',
              fontSize: "2.5rem",
              margin: 0,
            }}
          >
            STEP 1: EVENT REGISTRATION
          </h2>

          <p style={{ color: "#888", margin: "10px 0 28px" }}>
            Secure your spot at the BNI Poseidon Business Conclave.
          </p>

          <div style={fieldWrapStyle}>
            <label style={fieldLabelStyle}>Name:</label>
            <input
              className="register-input"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={inputStyle}
            />
            {errors.name ? <p style={errorStyle}>{errors.name}</p> : null}
          </div>

          <div style={fieldWrapStyle}>
            <label style={fieldLabelStyle}>Mobile No:</label>
            <input
              className="register-input"
              type="tel"
              placeholder="+91 00000 00000"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              style={inputStyle}
            />
            {errors.mobile ? <p style={errorStyle}>{errors.mobile}</p> : null}
          </div>

          <div style={fieldWrapStyle}>
            <label style={fieldLabelStyle}>Email ID:</label>
            <input
              className="register-input"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={inputStyle}
            />
            {errors.email ? <p style={errorStyle}>{errors.email}</p> : null}
          </div>

          <div style={fieldWrapStyle}>
            <label style={fieldLabelStyle}>I am:</label>
            <div style={radioRowStyle}>
              {["BNI Member", "Non BNI Member"].map((option) => {
                const checked = formData.memberType === option;

                return (
                  <label key={option} style={radioOptionStyle}>
                    <input
                      type="radio"
                      name="memberType"
                      value={option}
                      checked={checked}
                      onChange={(e) =>
                        handleChange("memberType", e.target.value)
                      }
                      style={hiddenRadioStyle}
                    />

                    <span
                      aria-hidden="true"
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        border: `2px solid ${checked ? "#FF6B35" : "rgba(255,107,53,0.4)"}`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: checked ? "#FF6B35" : "transparent",
                        }}
                      />
                    </span>

                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
            {errors.memberType ? (
              <p style={errorStyle}>{errors.memberType}</p>
            ) : null}
          </div>

          <motion.button
            type="button"
            onClick={handleProceed}
            style={submitStyle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Payment &amp; Verification (Step 2)
          </motion.button>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={ctaSectionStyle}>
        <h2
          style={{
            fontFamily: '"Bebas Neue", cursive',
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "#ffffff",
            margin: 0,
          }}
        >
          THE TIME FOR DECISIVE ACTION IS NOW
        </h2>
        <p
          style={{
            color: "#888888",
            maxWidth: "600px",
            margin: "14px auto 26px",
            fontSize: "16px",
            lineHeight: 1.7,
          }}
        >
          Seats are limited for this exclusive gathering of BNI Poseidon&apos;s
          top-tier leadership.
        </p>

        <motion.button
          type="button"
          onClick={scrollToForm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "linear-gradient(135deg, #FF6B35, #FF4500)",
            borderRadius: "50px",
            padding: "16px 48px",
            border: "none",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(255,107,53,0.3)",
          }}
        >
          REGISTER &amp; CLAIM YOUR PLACE
        </motion.button>
      </section>

      <Footer />
    </div>
  );
}

export default Register;
