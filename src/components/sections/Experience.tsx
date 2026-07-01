interface ExperienceItem {
  period: string
  company: string
  role: string
  description: string
}

const experiences: ExperienceItem[] = [
  {
    period: "AUG 2024 - PRESENT",
    company: "DAY DREAM STUDIO",
    role: "Creative Technologist Intern",
    description: "Built 20+ custom VFX node layers (SAM2, YOLOX, DWPose) and implemented dynamic LLM training dataset auto-captioning tools."
  },
  {
    period: "2021 - 2024",
    company: "TECHKSHITIJ FESTIVAL",
    role: "Lead Event Designer",
    description: "Designed 3 consecutive years of official brochures, registration certificate packages, and visual promotional banners."
  },
  {
    period: "2023 - 2024",
    company: "STARDUST OBSERVATORY",
    role: "Freelance Branding Designer",
    description: "Engineered complete branding systems, stargazing guidelines, merchandise kits, and pitch deck templates."
  },
  {
    period: "2024",
    company: "RUWA CONFERENCE",
    role: "Editorial Layout Designer",
    description: "Crafted official academic publication booklets, schedules, and print layouts for the Golden Jubilee conference."
  }
]

export function Experience() {
  return (
    <section id="experience" className="relative bg-black/75 backdrop-blur-[2px] px-6 py-14 sm:px-12 sm:py-32 border-t border-neutral-900">
      <div className="mx-auto max-w-[1400px]">
        <div className="w-full border-b border-neutral-900 pb-4 mb-10 sm:mb-16 flex items-center gap-4">
          <span className="font-mono text-[9px] text-signal tracking-widest">03 /</span>
          <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">Experience</span>
          <div className="h-[0.5px] bg-neutral-900 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="font-display font-extrabold text-4xl sm:text-5xl text-paper tracking-tighter leading-tight select-none sticky top-24">
              A short timeline,
              <span className="block text-transparent mt-1" style={{ WebkitTextStroke: "1px var(--color-paper)" }}>
                no resume dump.
              </span>
            </h3>
          </div>

          <div className="lg:col-span-8 relative border-l border-neutral-900 pl-8 ml-2 flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="absolute left-[-37px] top-[4px] w-2.5 h-2.5 bg-black border border-neutral-800 hover:border-signal transition-colors duration-300" />
                
                <span className="font-mono text-[9px] text-signal tracking-widest uppercase font-bold">
                  {exp.period} &mdash; {exp.company}
                </span>
                
                <h4 className="font-display font-bold text-2xl text-paper tracking-tight mt-2 select-none">
                  {exp.role}
                </h4>
                
                <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
