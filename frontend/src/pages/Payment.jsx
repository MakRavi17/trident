import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import qrCodeImage from "../assets/images/QR code.jpeg";

const qrImageUrl =
  qrCodeImage;
const upiId = "makwanaravi691@oksbi";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};

  const fileInputRef = useRef(null);

  const [utrNumber, setUtrNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [receiptFile, setReceiptFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const hasSummary = formData.name || formData.email || formData.memberType;

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

  const wrapStyle = {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 5%",
  };

  const cardStyle = {
    background: "#111111",
    border: "1px solid rgba(255,107,53,0.2)",
    borderRadius: "20px",
    padding: "clamp(24px, 4vw, 48px)",
  };

  const labelStyle = {
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

  const errorStyle = {
    color: "#FF4500",
    fontSize: "13px",
    marginTop: "8px",
  };

  const triggerFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    const extension = file.name.split(".").pop()?.toLowerCase() || "";

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, receiptFile: "File must be under 5MB" }));
      setReceiptFile(null);
      setFileName("No file chosen");
      event.target.value = "";
      return;
    }

    if (!allowedExtensions.includes(extension)) {
      setErrors((prev) => ({
        ...prev,
        receiptFile: "Only JPG, PNG, and PDF files are allowed",
      }));
      setReceiptFile(null);
      setFileName("No file chosen");
      event.target.value = "";
      return;
    }

    setErrors((prev) => ({ ...prev, receiptFile: "" }));
    setReceiptFile(file);
    setFileName(file.name);
  };

  const handleSubmit = () => {
    const nextErrors = {};

    if (!utrNumber.trim()) {
      nextErrors.utrNumber = "Please enter your UTR/Transaction ID";
    }

    if (!receiptFile) {
      nextErrors.receiptFile = "Please upload your payment receipt";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <div style={pageStyle}>
      <style>{`
        .payment-input:focus {
          border-color: #FF6B35 !important;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.1);
        }

        .payment-date-input::-webkit-calendar-picker-indicator {
          filter: invert(52%) sepia(88%) saturate(2394%) hue-rotate(351deg) brightness(102%) contrast(101%);
          cursor: pointer;
        }

        .payment-file-drop:hover {
          border-color: rgba(255,107,53,0.55) !important;
        }

        @media (max-width: 768px) {
          .payment-grid {
            flex-direction: column;
          }
        }
      `}</style>

      <Navbar />

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
            Network -&gt; Grow -&gt; Transform
          </p>
        </motion.div>
      </section>

      {hasSummary ? (
        <div
          style={{
            background: "#111111",
            padding: "12px 5%",
            textAlign: "center",
            color: "#888888",
            fontSize: "13px",
            borderBottom: "1px solid rgba(255,107,53,0.1)",
          }}
        >
          Registering as: {formData.name} • {formData.email} •{" "}
          {formData.memberType}
        </div>
      ) : null}

      <section style={wrapStyle}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={cardStyle}
        >
          {!submitted ? (
            <>
              <h2
                style={{
                  color: "#FF6B35",
                  fontFamily: '"Bebas Neue", cursive',
                  fontSize: "2.5rem",
                  margin: 0,
                }}
              >
                STEP 2: PAYMENT &amp; VERIFICATION
              </h2>

              <p
                style={{
                  color: "#888",
                  fontSize: "15px",
                  margin: "10px 0 32px",
                }}
              >
                Complete your payment using the QR code below, then upload your
                receipt.
              </p>

              <div
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,107,53,0.2)",
                  borderRadius: "16px",
                  padding: "32px",
                  marginBottom: "28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Bebas Neue", cursive',
                    fontSize: "1.6rem",
                    color: "#FF6B35",
                    margin: "0 0 20px",
                  }}
                >
                  PAYMENT INSTRUCTIONS
                </h3>

                <div
                  className="payment-grid"
                  style={{ display: "flex", gap: "32px" }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        background: "#1a1a1a",
                        border: "2px solid rgba(255,107,53,0.3)",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={qrImageUrl}
                        alt="Payment QR Code"
                        width="200"
                        height="200"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "baseline",
                        margin: "0 0 20px",
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#ffffff" }}>
                        Event Fee:
                      </span>
                      <span
                        style={{
                          color: "#FF6B35",
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                      >
                        INR 2500.00
                      </span>
                    </p>

                    <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom: "12px",
                          color: "#cccccc",
                          fontSize: "15px",
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ color: "#FF6B35", fontWeight: 700 }}>
                          1.
                        </span>
                        <span>
                          Scan the QR code using your preferred UPI app.
                        </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom: "12px",
                          color: "#cccccc",
                          fontSize: "15px",
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ color: "#FF6B35", fontWeight: 700 }}>
                          2.
                        </span>
                        <span>Ensure the payment amount is correct.</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom: "12px",
                          color: "#cccccc",
                          fontSize: "15px",
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ color: "#FF6B35", fontWeight: 700 }}>
                          3.
                        </span>
                        <span>
                          <strong style={{ color: "#ffffff" }}>
                            Important:
                          </strong>{" "}
                          Note down the UPI Transaction/Reference Number (UTR)
                          after successful payment.
                        </span>
                      </li>
                    </ol>

                    <div style={{ marginTop: "20px" }}>
                      <p
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          margin: "0 0 10px",
                        }}
                      >
                        <span style={{ color: "#888", fontSize: "14px" }}>
                          UPI ID:
                        </span>
                        <span
                          style={{
                            color: "#ffffff",
                            fontWeight: 600,
                            fontSize: "15px",
                          }}
                        >
                          {upiId}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>
                  Payment Ref No (UTR/Transaction ID):
                </label>
                <input
                  className="payment-input"
                  type="text"
                  placeholder="Enter your UTR/Transaction ID"
                  value={utrNumber}
                  onChange={(event) => {
                    setUtrNumber(event.target.value);
                    setErrors((prev) => ({ ...prev, utrNumber: "" }));
                  }}
                  style={inputStyle}
                />
                {errors.utrNumber ? (
                  <p style={errorStyle}>{errors.utrNumber}</p>
                ) : null}
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Date of Payment:</label>
                <input
                  className="payment-input payment-date-input"
                  type="date"
                  value={paymentDate}
                  onChange={(event) => setPaymentDate(event.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>
                  Payment Screenshot / Receipt (Max 5MB, JPG, PNG, PDF):
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="payment-file-drop"
                  onClick={triggerFilePicker}
                  style={{
                    background: "#1a1a1a",
                    border: "2px dashed rgba(255,107,53,0.3)",
                    borderRadius: "10px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "22px" }}>📎</p>
                  <p
                    style={{
                      color: "#FF6B35",
                      margin: "8px 0 4px",
                      fontWeight: 600,
                    }}
                  >
                    Choose File
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: fileName === "No file chosen" ? "#888" : "#fff",
                    }}
                  >
                    {fileName}
                  </p>
                </div>
                {errors.receiptFile ? (
                  <p style={errorStyle}>{errors.receiptFile}</p>
                ) : null}
              </div> */}

              <motion.button
                type="button"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "18px",
                  marginTop: "8px",
                  background: "linear-gradient(135deg, #FF6B35, #FF4500)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "0.05em",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Verify &amp; Complete Registration
              </motion.button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                style={{
                  marginTop: "16px",
                  display: "inline-block",
                  color: "#888",
                  fontSize: "14px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                &larr; Go Back to Step 1 (Edit Details)
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center", padding: "24px 0 10px" }}
            >
              <p style={{ fontSize: "60px", margin: 0 }}>✅</p>
              <h2
                style={{
                  fontFamily: '"Bebas Neue", cursive',
                  fontSize: "3rem",
                  color: "#FF6B35",
                  margin: "10px 0",
                }}
              >
                REGISTRATION COMPLETE!
              </h2>
              <p
                style={{
                  color: "#888",
                  textAlign: "center",
                  maxWidth: "500px",
                  margin: "0 auto 24px",
                  lineHeight: 1.7,
                }}
              >
                Thank you for registering for TRIDENT. We have received your
                payment details and will verify within 24 hours. A confirmation
                will be sent to your email.
              </p>

              <motion.button
                type="button"
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #FF4500)",
                  borderRadius: "50px",
                  padding: "14px 36px",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Return to Home
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <section
        style={{
          background: "#111111",
          padding: "60px 5%",
          textAlign: "center",
          borderTop: "1px solid rgba(255,107,53,0.1)",
        }}
      >
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
            color: "#888",
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
          onClick={() => navigate("/register")}
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

export default Payment;
