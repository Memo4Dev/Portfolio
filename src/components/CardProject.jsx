import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, LogIn } from 'lucide-react';

function isSafeUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, Username, Password }) => {
  const safeLink = isSafeUrl(ProjectLink) ? ProjectLink : null;

  const handleLiveDemo = (e) => {
    if (!safeLink) {
      e.preventDefault();
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full h-full">
      <div className="relative h-full flex flex-col overflow-hidden rounded-xl bg-surface-container/90 backdrop-blur-lg border border-[#46464d] shadow-2xl transition-all duration-300 hover:shadow-secondary/10 hover:border-secondary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-accent-gold/5 to-[#c0c7d6]/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10 flex flex-col flex-1">
          <div className="relative overflow-hidden rounded-lg h-48 shrink-0">
            <img
              src={Img}
              alt={Title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {(Username || Password) && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/20 backdrop-blur-sm border border-secondary/30 text-secondary text-xs font-medium font-mono">
                <LogIn className="w-3 h-3" />
                Login Required
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col flex-1">
            <h3 className="text-xl font-semibold text-[#e0e2e6] line-clamp-1">
              {Title}
            </h3>

            <p className="text-[#c7c5ce]/80 text-sm leading-relaxed line-clamp-2 mt-2">
              {Description}
            </p>

            <div className="pt-4 mt-auto flex items-center justify-between">
              {safeLink ? (
                <a
                  href={safeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-secondary hover:text-accent-gold-light transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-[#909097] text-sm">Demo Not Available</span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-highest/60 text-[#e0e2e6] transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary/50 border border-[#46464d] hover:border-secondary/30"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-[#909097] text-sm">Details Not Available</span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-[#46464d] group-hover:border-secondary/30 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
