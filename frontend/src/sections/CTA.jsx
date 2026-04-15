import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { VENUE } from "../utils/constants";

const features = ["Strategic Networking", "Expert Speakers", "Real Outcomes"];

function CTA() {
  const navigate = useNavigate();

  return (
    <section
      id="venue"
      className="section section-cta"
      aria-labelledby="cta-title"
    >
      <div className="container cta-grid">
        <div className="cta-venue-column">
          <p className="section-label">EVENT VENUE</p>
          <h2 className="section-heading">VENUE DETAILS</h2>

          <div className="venue-card card">
            <div className="venue-logo">O7</div>
            <h3>{VENUE.name}</h3>
            <p>{VENUE.address}</p>
            <a
              className="venue-map-link"
              href={VENUE.mapsLink}
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          </div>

          <p className="venue-tagline">...an urban escape</p>
        </div>

        <div className="cta-action-column">
          <h2 id="cta-title" className="cta-title">
            Ready to Transform Your Business?
          </h2>
          <p className="cta-copy">
            Seats are limited. Secure your spot at TRIDENT and take the next
            step in your growth journey.
          </p>

          <Button
            variant="primary"
            className="cta-button"
            onClick={() => navigate("/register")}
          >
            REGISTER NOW
          </Button>

          <p className="cta-note">
            Limited seats available • April 2025 • Ahmedabad
          </p>

          <div className="feature-badges">
            {features.map((feature) => (
              <div key={feature} className="feature-badge">
                <span aria-hidden="true">●</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
