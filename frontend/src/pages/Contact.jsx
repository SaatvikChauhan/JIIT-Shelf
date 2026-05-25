import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { useEffect } from "react";


const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact | JIIT Shelf";
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <div className="page-padding contact-container">

        <section className="contact-header">
          <div className="contact-header-row">
            <button className="change" onClick={() => navigate(-1)}>
              ← Back
            </button>

            <h1 className="contact-title">Contact Us</h1>
          </div>

          <div className="accent-line"></div>

          <p className="contact-subtext">
            Questions, bugs, or ideas — reach out anytime.
          </p>
        </section>


        <div className="contact-card">
          <div className="contact-grid">


            <div className="contact-item">
              <h3 className="to-accent pp-heading">General Queries & Bugs</h3>
              <p>
                Have a question or found something broken? Send an email and we’ll
                get back to you as soon as possible.
              </p>

              <a
                href="mailto:jiitshelf@gmail.com"
                className="contact-link"
              >
                jiitshelf@gmail.com
              </a>
            </div>


            <div className="contact-item">
              <h3 className="to-accent pp-heading">GitHub</h3>
              <p>
                Explore the project, report issues, or contribute directly on GitHub.
              </p>

              <a
                href="https://github.com/SaatvikChauhan/JIIT-Shelf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                View Repository
              </a>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ContactUs;