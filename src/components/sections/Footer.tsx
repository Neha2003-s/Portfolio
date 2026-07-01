import { Download, ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-black/75 backdrop-blur-[2px] border-t border-neutral-900">

      <div id="contact" className="px-6 py-20 sm:px-12 sm:py-28">
        <div className="mx-auto max-w-[1400px]">

          <div className="w-full border-b border-neutral-900 pb-4 mb-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-signal tracking-widest">04 /</span>
              <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">Contact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Open to work — 2025</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

            <div className="flex flex-col gap-8 border border-neutral-900 p-8">
              <div className="flex flex-col gap-4">
                <h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-paper select-none text-[clamp(2.2rem,4.5vw,3.5rem)]">
                  Let's build<br />
                  something<br />
                  <span className="text-signal">worth keeping.</span>
                </h2>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-xs">
                  Whether it's a brand, a product, or a wild idea — I'm in. Drop me a line.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-auto border-t border-neutral-900 pt-6">
                <a
                  href="mailto:ne2003singh@gmail.com"
                  className="group flex items-center justify-between text-paper font-mono text-[10px] uppercase tracking-widest hover:text-signal transition-colors duration-300"
                >
                  <span>ne2003singh@gmail.com</span>
                  <span className="text-signal opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a
                  href="https://github.com/Neha2003-s?tab=overview&from=2026-07-01&to=2026-07-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-neutral-500 font-mono text-[10px] uppercase tracking-widest hover:text-paper transition-colors duration-300"
                >
                  <span>GitHub</span>
                  <span className="text-signal opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/neha-singh-2b4ab0336"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-neutral-500 font-mono text-[10px] uppercase tracking-widest hover:text-paper transition-colors duration-300"
                >
                  <span>LinkedIn</span>
                  <span className="text-signal opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a
                  href="resume.pdf"
                  download
                  className="group flex items-center justify-between text-neutral-500 font-mono text-[10px] uppercase tracking-widest hover:text-paper transition-colors duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Download className="size-3" />
                    Resume.pdf
                  </span>
                  <span className="text-signal opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden w-full aspect-video min-h-[180px] bg-black rounded-sm border border-neutral-900/40">
              <video
                src="projects/vid.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter grayscale contrast-115 brightness-90"
                style={{ outline: "none", border: "none" }}
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-60" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black opacity-60" />
            </div>

          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 px-6 py-8 sm:px-12">
        <div className="mx-auto max-w-[1400px] flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="font-display font-black text-lg text-paper uppercase tracking-tight select-none">Neha Singh</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-600">
              &copy; 2026 &mdash; Design &times; Engineering
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-signal hover:border-signal transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>

    </footer>
  )
}

export default Footer
