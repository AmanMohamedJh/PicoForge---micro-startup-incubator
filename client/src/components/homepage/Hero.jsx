import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center min-h-screen px-4 sm:px-6 lg:px-8 relative overflow-hidden -translate-y-12">

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary animate-slide-up">
        Transform Your{" "}
        <span className="text-accent-purple">Ideas</span> into{" "}
        <span className="text-accent-cyan">Startups</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg sm:text-xl max-w-2xl text-text-body animate-fade-in delay-150">
        Join a vibrant community of founders, innovators, and builders. Submit your ideas, get feedback, 
        collaborate, and launch your product with confidence.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in delay-300">
        <Button
          asChild
          className="gap-2 rounded-full bg-accent-purple text-white hover:shadow-glow-purple transition-all"
        >
          <Link to="/submit">
            <Lightbulb className="w-5 h-5" />
            Launch Your Idea
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 transition-all"
        >
          <Link to="/explore">Explore Ideas</Link>
        </Button>
      </div>

      {/* Optional subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-dark-primary/70 via-dark-secondary/50 to-dark-tertiary/30 -z-10 animate-fade-in" />
    </section>
  );
};

export default Hero;
