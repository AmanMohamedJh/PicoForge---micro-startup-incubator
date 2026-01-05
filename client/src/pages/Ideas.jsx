import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ideaApi } from "../utils/api";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const truncate = (text, max = 140) => {
  const s = String(text || "").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max).trim()}…`;
};

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const hasIdeas = useMemo(() => ideas.length > 0, [ideas.length]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await ideaApi.listIdeas();
        if (!alive) return;
        setIdeas(data.ideas || []);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load ideas");
      } finally {
        if (alive) setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Explore Ideas
          </h1>
          <p className="text-text-tertiary mt-2">
            Browse the latest ideas submitted to PicoForge.
          </p>
        </div>
        <Link
          to="/submit-idea"
          className="inline-flex items-center px-5 py-2 bg-linear-to-r from-accent-purple to-accent-purple-dark text-white text-sm font-semibold rounded-lg shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/50 hover:-translate-y-0.5 transition-all"
        >
          Submit Idea
        </Link>
      </div>

      {error && (
        <div
          className="bg-error/10 border border-error/30 text-error rounded-lg p-3 text-sm mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-text-tertiary">Loading ideas…</div>
      ) : !hasIdeas ? (
        <div className="text-text-tertiary">
          No ideas yet.{" "}
          <Link
            className="text-accent-purple hover:underline"
            to="/submit-idea"
          >
            Be the first to submit one
          </Link>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <Link key={idea._id} to={`/ideas/${idea._id}`} className="block">
              <Card className="bg-dark-secondary/60 border-border-default hover:border-text-tertiary transition-colors h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-text-primary text-lg">
                    {idea.title}
                  </CardTitle>
                  <CardDescription className="text-text-tertiary">
                    {truncate(idea.problem)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-text-body">
                    By{" "}
                    <span className="font-semibold text-text-primary">
                      {idea?.createdBy?.fullName || "Unknown"}
                    </span>
                  </div>

                  {Array.isArray(idea.tags) && idea.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.slice(0, 6).map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="bg-dark-tertiary text-text-body border border-border-default"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ideas;
