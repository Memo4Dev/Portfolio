import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 rounded-2xl bg-surface-container/80 hover:bg-surface-container-high/80 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl border border-[#46464d] hover:border-secondary/30">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent-gold rounded-full opacity-0 group-hover:opacity-30 blur transition duration-300"></div>
        <img 
          src={TechStackIcon} 
          alt={`${Language} icon`}
          loading="lazy"
          decoding="async"
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      <span className="text-[#c7c5ce] font-mono text-sm md:text-base tracking-wide group-hover:text-secondary transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
