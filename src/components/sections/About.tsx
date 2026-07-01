import { DinoGame } from "@/components/ui/dino-game"

export function About() {
  const stats = [
    { num: "3+", label: "Years Design" },
    { num: "20+", label: "Projects Built" },
    { num: "7", label: "AI Pipelines" },
    { num: "∞", label: "Iterations" },
  ]

  const designSkills = [
    "Brand Identity", "UI / UX Design", "Typography", "Editorial Layout",
    "Motion Design", "Design Systems", "Visual Storytelling",
  ]

  const techSkills = [
    "React / TypeScript", "Three.js / WebGL", "Python", "PyTorch",
    "ComfyUI", "Figma", "After Effects", "Framer",
  ]

  const traits = [
    { label: "Design-first", desc: "Every decision starts with how it feels to use." },
    { label: "Codes her ideas", desc: "From wireframe to working prototype in one session." },
    { label: "Motion-minded", desc: "Animation isn't decoration — it's communication." },
    { label: "AI-native", desc: "Uses generative tools as a creative collaborator." },
  ]

  return (
    <section id="about" className="relative bg-black/75 backdrop-blur-[2px] px-6 py-24 sm:px-12 sm:py-32 border-t border-neutral-900">
      <div className="mx-auto max-w-[1400px]">
        <div className="w-full border-b border-neutral-900 pb-4 mb-16 flex items-center gap-4">
          <span className="font-mono text-[9px] text-signal tracking-widest">01 /</span>
          <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">About</span>
          <div className="h-[0.5px] bg-neutral-900 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <div className="col-span-1 lg:col-span-5 w-full max-w-md lg:max-w-none mx-auto flex flex-col gap-6">
            <DinoGame />

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="border border-neutral-900 p-4 flex flex-col gap-1">
                  <span className="font-display font-extrabold text-2xl text-paper tracking-tighter">
                    {stat.num}
                  </span>
                  <span className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h3 className="font-display font-bold text-4xl sm:text-5xl text-paper tracking-tighter leading-tight select-none">
                I design things that <span className="italic text-signal">feel</span> as good as they look.
              </h3>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed max-w-xl">
                I'm Neha — a designer and creative technologist who bridges the gap between how things look and how they work. I lead with visual instinct and back it up with code: whether that's a brand identity system, a motion-forward UI, or an ML-powered creative pipeline.
              </p>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed max-w-xl">
                I design it, then build it myself — no handoff, no waiting around, no drama (okay, SOME drama). These days that's training image models, building UIs with actual personality, and shipping full projects end to end. Logos remain the one exception.- Long story.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {traits.map((t, i) => (
                <div key={i} className="border border-neutral-900 p-5 flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-signal uppercase tracking-widest">{t.label}</span>
                  <span className="font-sans text-xs text-neutral-300 leading-relaxed">{t.desc}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-neutral-900 pt-8">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-600">/ Design</span>
                <div className="flex flex-wrap gap-2">
                  {designSkills.map((s, i) => (
                    <span key={i} className="font-mono text-[9px] tracking-wider text-neutral-300 border border-neutral-900 bg-neutral-950/40 px-3 py-1.5 select-none">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-600">/ Tech</span>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((s, i) => (
                    <span key={i} className="font-mono text-[9px] tracking-wider text-neutral-300 border border-neutral-900 bg-neutral-950/40 px-3 py-1.5 select-none">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
