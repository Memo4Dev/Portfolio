import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
  Database,
  Eye,
  EyeOff,
  Copy,
  Check,
  LogIn,
} from "lucide-react";
import Swal from "sweetalert2";
import { supabase, mapProjectRow } from "../supabase";

function isSafeUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  NextJS: Layout,
  Express: Cpu,
  NodeJS: Cpu,
  Supabase: Database,
  MongoDB: Database,
  Mango: Database,
  TypeScript: Code,
  Javascript: Code,
  Python: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-surface-container-high/60 rounded-xl border border-[#46464d] hover:border-secondary/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 to-accent-gold/0 group-hover:from-secondary/10 group-hover:to-accent-gold/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary group-hover:text-accent-gold-light transition-colors" />
        <span className="text-xs md:text-sm font-medium text-[#c7c5ce] font-mono group-hover:text-secondary transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-surface-container-high/40 transition-all duration-300 border border-transparent hover:border-[#46464d]">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent-gold/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-[#c7c5ce] group-hover:text-[#e0e2e6] transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-surface-container-low/80 rounded-xl overflow-hidden relative border border-[#46464d]">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent-gold/5 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-surface-container-high/40 p-2 md:p-3 rounded-lg border border-secondary/20 transition-all duration-300 hover:scale-105 hover:border-secondary/50 hover:shadow-lg">
        <div className="bg-secondary/20 p-1.5 md:p-2 rounded-full">
          <Code2
            className="text-secondary w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-secondary">
            {techStackCount}
          </div>
          <div className="text-[10px] md:text-xs text-[#909097] font-mono">
            Total Technology
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-surface-container-high/40 p-2 md:p-3 rounded-lg border border-accent-gold/20 transition-all duration-300 hover:scale-105 hover:border-accent-gold/50 hover:shadow-lg">
        <div className="bg-accent-gold/20 p-1.5 md:p-2 rounded-full">
          <Layers
            className="text-accent-gold w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-accent-gold">
            {featuresCount}
          </div>
          <div className="text-[10px] md:text-xs text-[#909097] font-mono">
            Key Features
          </div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Sorry, the source code for this project is private.",
      confirmButtonText: "Understand",
      confirmButtonColor: "#d4af7a",
      background: "#101417",
      color: "#e0e2e6",
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          const mapped = mapProjectRow(data);
          const enhancedProject = {
            ...mapped,
            Features: mapped.Features || [],
            TechStack: mapped.TechStack || [],
            Github: mapped.Github || "https://github.com/memo4dev",
          };
          setProject(enhancedProject);
        }
      } catch {
        const storedProjects =
          JSON.parse(localStorage.getItem("projects")) || [];
        const selectedProject = storedProjects.find((p) => String(p.id) === id);
        if (selectedProject) {
          const enhancedProject = {
            ...selectedProject,
            Features: selectedProject.Features || [],
            TechStack: selectedProject.TechStack || [],
            Github: selectedProject.Github || "https://github.com/memo4dev",
          };
          setProject(enhancedProject);
        }
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-[#e0e2e6]">
            Loading Project...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-accent-gold rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-[#c0c7d6] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  const element = document.getElementById("Portofolio");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 500);
              }}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-surface-container/60 backdrop-blur-xl rounded-xl text-[#e0e2e6] hover:bg-surface-container-high/60 transition-all duration-300 border border-[#46464d] hover:border-secondary/30 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-[#909097]">
              <span className="text-[#e0e2e6] truncate">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold text-[#e0e2e6] leading-tight">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent-gold rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent-gold rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-[#c7c5ce]/90 leading-relaxed">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {isSafeUrl(project.Link) && (
                  <a
                    href={project.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-secondary/10 to-accent-gold/10 hover:from-secondary/20 hover:to-accent-gold/20 text-secondary rounded-xl transition-all duration-300 border border-secondary/20 hover:border-secondary/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-secondary/10 to-accent-gold/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Live Demo</span>
                  </a>
                )}

                {isSafeUrl(project.Github) && (
                  <a
                    href={project.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-accent-gold/10 to-secondary/10 hover:from-accent-gold/20 hover:to-secondary/20 text-accent-gold rounded-xl transition-all duration-300 border border-accent-gold/20 hover:border-accent-gold/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                    onClick={(e) =>
                      !handleGithubClick(project.Github) && e.preventDefault()
                    }
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-accent-gold/10 to-secondary/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Github</span>
                  </a>
                )}

                {(project.Username || project.Password) && (
                  <button
                    onClick={() => setShowCredentials(!showCredentials)}
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-[#c0c7d6]/10 to-tertiary/10 hover:from-[#c0c7d6]/20 hover:to-tertiary/20 text-[#c0c7d6] rounded-xl transition-all duration-300 border border-[#c0c7d6]/20 hover:border-[#c0c7d6]/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-[#c0c7d6]/10 to-tertiary/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    {showCredentials ? (
                      <EyeOff className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    ) : (
                      <LogIn className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    )}
                    <span className="relative font-medium">{showCredentials ? "Hide Login" : "Login"}</span>
                  </button>
                )}
              </div>

              {(project.Username || project.Password) && (
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    showCredentials ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-wrap gap-3 md:gap-4 p-4 bg-surface-container/60 rounded-xl border border-[#46464d] backdrop-blur-xl">
                    {project.Username && (
                      <div className="flex items-center gap-2 bg-surface-container-high/40 rounded-lg px-3 py-2 border border-[#46464d]">
                        <div>
                          <p className="text-[10px] text-[#909097] font-mono">Username</p>
                          <p className="text-[#e0e2e6] font-mono text-sm">{project.Username}</p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(project.Username);
                            setCopiedField("username");
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="p-1.5 rounded-md hover:bg-surface-container-highest/60 text-[#909097] hover:text-secondary transition-all"
                        >
                          {copiedField === "username" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                    {project.Password && (
                      <div className="flex items-center gap-2 bg-surface-container-high/40 rounded-lg px-3 py-2 border border-[#46464d]">
                        <div>
                          <p className="text-[10px] text-[#909097] font-mono">Password</p>
                          <p className="text-[#e0e2e6] font-mono text-sm">{project.Password}</p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(project.Password);
                            setCopiedField("password");
                            setTimeout(() => setCopiedField(null), 2000);
                          }}
                          className="p-1.5 rounded-md hover:bg-surface-container-highest/60 text-[#909097] hover:text-secondary transition-all"
                        >
                          {copiedField === "password" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#e0e2e6] mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-[#909097] opacity-50">
                    No technologies added.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-[#46464d] shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full  object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* key features */}
              <div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-8 border border-[#46464d] space-y-6 hover:border-secondary/20 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-[#e0e2e6] flex items-center gap-3">
                  <Star className="w-5 h-5 text-accent-gold group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#909097] opacity-50">No features added.</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
