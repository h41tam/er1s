import { useState } from "react";
import Preloader from "../components/Preloader";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/footer";

const Index = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}

            {!loading && (
                <div className="min-h-screen w-full bg-[radial-gradient(circle_at_20%_10%,rgba(109,0,26,0.55),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_55%)] grain">
                    <Navigation />
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Index;
