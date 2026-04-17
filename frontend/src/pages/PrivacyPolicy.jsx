import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = "Privacy Policy | JIIT Shelf";
    }, []);
    const containerStyle = {
        maxWidth: "900px",
        margin: "0 auto",
        lineHeight: "1.7"
    };

    const headerStyle = {
        textAlign: "center",
        marginBottom: "4rem"
    };

    const accentLine = {
        height: "4px",
        width: "60px",
        background: "var(--accent)",
        margin: "1.2rem auto",
        borderRadius: "10px"
    };

    const sectionCard = {
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "24px",
        padding: "2.5rem",
        marginBottom: "2rem",
        backdropFilter: "blur(12px)"
    };

    const newHeader = {
        display: "flex",
        flexWrap: "wrap",
        gap: "1.2rem",
    };
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className="page-padding" style={containerStyle}>
                <section style={headerStyle}>
                    <div style={newHeader}>
                        <button className="change" onClick={goBack}>
                            ← Back
                        </button>
                        <h1 style={{ fontSize: "3rem", fontWeight: "800", letterSpacing: "-1px", margin: "0 auto" }}>
                            Privacy Policy
                        </h1>
                    </div>
                    <div style={accentLine}></div>
                    <p style={{ opacity: 0.7, fontSize: "1.1rem" }}>
                        How JIIT Shelf handles and protects your data
                    </p>
                </section>

                <section style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "700px", margin: "0 auto" }}>
                        JIIT Shelf is designed to provide academic resources and tools with minimal data collection.
                        This policy explains what information is used and how it is handled.
                    </p>
                </section>

                <div style={sectionCard}>
                    <ul className="policy-list">

                        <li className="policy-item">
                            <h3 className="to-accent pp-heading">Local Storage Usage</h3>
                            <p className="privacy-text">
                                JIIT Shelf stores certain preferences in your browser using local storage. This may include
                                selected semester, subjects, and theme preferences. This data remains on your device and is
                                not transmitted to our servers.
                            </p>
                        </li>

                        <li className="policy-item">
                            <h3 className="to-accent pp-heading">Third-Party Services</h3>
                            <p className="privacy-text">
                                JIIT Shelf uses services such as Google Analytics and Google Drive API. These services may
                                collect non-personal data like browser type, device information, and pages visited to ensure
                                proper functionality and performance.
                            </p>
                        </li>

                        <li className="policy-item">
                            <h3 className="to-accent pp-heading">Information Collection</h3>
                            <p className="privacy-text">
                                We do not collect personally identifiable information such as name, email, or phone number.
                            </p>
                        </li>

                        <li className="policy-item">
                            <h3 className="to-accent pp-heading">Cookies & Ads</h3>
                            <p className="privacy-text">
                                JIIT Shelf does not directly use cookies. However, third-party services may use cookies to
                                provide insights, analytics, and relevant content.
                            </p>
                        </li>

                        <li className="policy-item">
                            <h3 className="to-accent pp-heading">Data Security</h3>
                            <p className="privacy-text">
                                We take reasonable steps to maintain platform security. However, no method of transmission over
                                the internet is completely secure, and absolute security cannot be guaranteed.
                            </p>
                        </li>

                        <li className="policy-item">
                            <h3 className="to-accent pp-heading">Policy Updates</h3>
                            <p className="privacy-text">
                                This policy may be updated from time to time. Continued use of JIIT Shelf implies acceptance
                                of the latest version of this policy.
                            </p>
                        </li>

                    </ul>
                </div>
                <div className="last-updated">
                    Last updated: April 2026
                </div>

            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;