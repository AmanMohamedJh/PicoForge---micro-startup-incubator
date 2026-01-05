import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ideaApi } from "../utils/api";
import { Button } from "../components/ui/button";

const SubmitIdea = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    problem: "",
    proposedSolution: "",
    targetAudience: "",
    tags: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const isAuthed = useMemo(() => Boolean(localStorage.getItem("token")), []);

  const validate = () => {
    const next = {};
    if (!formData.title.trim()) next.title = "Idea title is required";
    if (!formData.problem.trim())
      next.problem = "Problem description is required";
    if (!formData.proposedSolution.trim())
      next.proposedSolution = "Proposed solution is required";
    if (!formData.targetAudience.trim())
      next.targetAudience = "Target audience is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!isAuthed) {
      setStatus({
        type: "error",
        message: "Please sign in to submit an idea.",
      });
      navigate("/login");
      return;
    }

    if (!validate()) return;

    const tags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setIsLoading(true);
    try {
      const data = await ideaApi.createIdea({
        title: formData.title,
        problem: formData.problem,
        proposedSolution: formData.proposedSolution,
        targetAudience: formData.targetAudience,
        tags,
      });

      setStatus({ type: "success", message: "Idea submitted successfully." });
      navigate(`/ideas/${data.idea._id}`);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Failed to submit idea",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
          Submit an Idea
        </h1>
        <p className="text-text-tertiary mt-2">
          Share your startup idea to start validating it.
        </p>
      </div>

      <div className="bg-dark-secondary/70 border border-border-default rounded-2xl p-6 sm:p-7">
        {status.type === "error" && (
          <div
            className="bg-error/10 border border-error/30 text-error rounded-lg p-3 text-sm mb-4"
            role="alert"
          >
            {status.message}
          </div>
        )}
        {status.type === "success" && (
          <div
            className="bg-success/10 border border-success/30 text-success rounded-lg p-3 text-sm mb-4"
            role="status"
          >
            {status.message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-text-primary"
              htmlFor="title"
            >
              Idea title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={onChange}
              className={`w-full px-4 py-2.5 bg-dark-tertiary border ${
                errors.title ? "border-error" : "border-border-default"
              } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all`}
              placeholder="A short, clear title"
            />
            {errors.title && (
              <p className="text-error text-xs">{errors.title}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-text-primary"
              htmlFor="problem"
            >
              Problem description
            </label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={onChange}
              rows={4}
              className={`w-full px-4 py-2.5 bg-dark-tertiary border ${
                errors.problem ? "border-error" : "border-border-default"
              } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all`}
              placeholder="What problem are you solving?"
            />
            {errors.problem && (
              <p className="text-error text-xs">{errors.problem}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-text-primary"
              htmlFor="proposedSolution"
            >
              Proposed solution
            </label>
            <textarea
              id="proposedSolution"
              name="proposedSolution"
              value={formData.proposedSolution}
              onChange={onChange}
              rows={4}
              className={`w-full px-4 py-2.5 bg-dark-tertiary border ${
                errors.proposedSolution
                  ? "border-error"
                  : "border-border-default"
              } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all`}
              placeholder="How will you solve it?"
            />
            {errors.proposedSolution && (
              <p className="text-error text-xs">{errors.proposedSolution}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-text-primary"
              htmlFor="targetAudience"
            >
              Target audience
            </label>
            <input
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={onChange}
              className={`w-full px-4 py-2.5 bg-dark-tertiary border ${
                errors.targetAudience ? "border-error" : "border-border-default"
              } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all`}
              placeholder="Who is this for?"
            />
            {errors.targetAudience && (
              <p className="text-error text-xs">{errors.targetAudience}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-text-primary"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={onChange}
              className="w-full px-4 py-2.5 bg-dark-tertiary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all"
              placeholder="e.g. SaaS, AI, Healthcare"
            />
            <p className="text-xs text-text-tertiary">Comma-separated</p>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-linear-to-r from-accent-purple to-accent-purple-dark text-white"
            >
              {isLoading ? "Submitting..." : "Submit Idea"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitIdea;
