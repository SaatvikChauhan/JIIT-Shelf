import { Notebook, MessageCircleMore, SquareSigma, Clock } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        document.title = "About | JIIT Shelf";
    }, []);
    const containerStyle = {
        maxWidth: "1000px",
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

    const flexContainer = {
        display: "flex",
        flexWrap: "wrap",
        gap: "1.2rem",
        padding: 0,
        listStyle: "none",
        marginTop: "2rem"
    };

    const featureItem = {
        flex: "1 1 280px",
        maxWidth: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        padding: "1.5rem",
        borderRadius: "16px",
        fontSize: "0.95rem",
        borderBottom: "3px solid var(--accent)",
        display: "flex",
        flexDirection: "column"
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
                            About JIIT Shelf
                        </h1>
                    </div>
                    <div style={accentLine}></div>
                    <p style={{ opacity: 0.7, fontSize: "1.1rem" }}>Your All-in-One Academic Companion</p>
                </section>

                <section style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <p style={{ fontSize: "1.25rem", fontWeight: "300", maxWidth: "800px", margin: "0 auto 1.5rem" }}>
                        JIIT Shelf is a student-first, centralized ecosystem for everything academic. It is designed to make accessing JIIT’s study material easier and to streamline your college journey. Find all your resources—organized, accessible, and in one place.

                    </p>
                </section>

                <div style={sectionCard}>
                    <h3 className="to-accent" style={{ fontSize: "1.6rem", textAlign: "center" }}>Features</h3>
                    <ul style={flexContainer}>
                        <li style={featureItem}>
                            <b
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginBottom: "0.5rem",
                                    fontSize: "1.1rem"
                                }}
                            >
                                <Notebook className="icon-dim" size={18} />
                                Resource Hub
                            </b>
                            Access curated notes, tutorials, and previous year papers organized by branch and semester.
                        </li>

                        <li style={featureItem}>
                            <b
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginBottom: "0.5rem",
                                    fontSize: "1.1rem"
                                }}
                            >
                                <MessageCircleMore className="icon-dim" size={18} />
                                Student Community
                            </b>
                            Engage with peers and seniors in real-time chatrooms to solve doubts and share insights instantly.
                        </li>

                        <li style={featureItem}>
                            <b
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginBottom: "0.5rem",
                                    fontSize: "1.1rem"
                                }}
                            >
                                <SquareSigma className="icon-dim" size={18} />
                                Academic Tools
                            </b>
                            Calculate your SGPA effortlessly and stay ahead of the curve with our specialized estimators.
                        </li>

                        <li style={featureItem}>
                            <b
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginBottom: "0.5rem",
                                    fontSize: "1.1rem"
                                }}
                            >
                                <Clock className="icon-dim" size={18} />
                                Exam Intelligence
                            </b>
                            Never miss a deadline with live countdowns for T1, T2, and T3 examinations.
                        </li>
                    </ul>
                </div>

                <section style={{ marginTop: "4rem", textAlign: "center" }}>
                    <h3 className="to-accent" style={{ fontSize: "1.6rem" }}>Our Goal</h3>
                    <p style={{ opacity: 0.8, marginTop: "1rem", maxWidth: "700px", margin: "1rem auto", fontSize: "1.1rem" }}>
                        Our mission is to save students time and reduce exam-season stress. By consolidating
                        scattered materials into one intuitive interface, we ensure you spend less time
                        searching and more time learning.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default About;