import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ideaApi } from "../utils/api";
import { Badge } from "../components/ui/badge";

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const IdeaDetail = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const creator = useMemo(() => idea?.createdBy, [idea]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await ideaApi.getIdea(id);
        if (!alive) return;
        setIdea(data.idea);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load idea");
      } finally {
        if (alive) setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link
            to="/ideas"
            className="text-sm text-accent-purple hover:underline"
          >
            ← Back to ideas
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
            {isLoading ? "Loading…" : idea?.title || "Idea"}
          </h1>
          {!isLoading && idea && (
            <div className="text-sm text-text-tertiary mt-2">
              Submitted {formatDate(idea.createdAt)}
              {creator?.fullName ? (
                <>
                  {" "}
                  by{" "}
                  {creator?.email ? (
                    <a
                      className="text-accent-cyan hover:underline"
                      href={`mailto:${creator.email}`}
                    >
                      {creator.fullName}
                    </a>
                  ) : (
                    <span className="text-text-body">{creator.fullName}</span>
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>
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
        <div className="text-text-tertiary">Loading idea…</div>
      ) : !idea ? (
        <div className="text-text-tertiary">Idea not found.</div>
      ) : (
        <div className="space-y-6">
          {Array.isArray(idea.tags) && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((t) => (
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

          <section className="bg-dark-secondary/70 border border-border-default rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Problem
            </h2>
            <p className="text-text-body whitespace-pre-wrap">{idea.problem}</p>
          </section>

          <section className="bg-dark-secondary/70 border border-border-default rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Proposed solution
            </h2>
            <p className="text-text-body whitespace-pre-wrap">
              {idea.proposedSolution}
            </p>
          </section>

          <section className="bg-dark-secondary/70 border border-border-default rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Target audience
            </h2>
            <p className="text-text-body whitespace-pre-wrap">
              {idea.targetAudience}
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default IdeaDetail;
