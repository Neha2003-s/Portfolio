import { useState, useEffect, useRef } from "react"
import { Folder, FolderOpen, X, Download, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { DitherImageFrame, DitherImageContent } from "@/components/ui/dither-image"
import { directories, totalFilesCount, totalDirsCount, type ProjectFile } from "@/data/projects"

export function Work() {
  const [selectedDirId, setSelectedDirId] = useState<string | null>(null)
  const [openDir, setOpenDir] = useState<any>(null)
  const [activeProject, setActiveProject] = useState<ProjectFile | null>(null)
  const [activeCatIndex, setActiveCatIndex] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSwiped, setIsSwiped] = useState(false)

  const folderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (openDir && !activeProject && folderRef.current && !folderRef.current.contains(e.target as Node)) {
        handleCloseDir()
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [openDir, activeProject])

  const handleDirClick = (dir: any) => {
    if (selectedDirId === dir.id) {
      const liveDir = directories.find((d: any) => d.id === dir.id)
      setOpenDir(liveDir || dir)
    } else {
      setSelectedDirId(dir.id)
    }
  }

  const handleDirDoubleClick = (dir: any) => {
    setSelectedDirId(dir.id)
    const liveDir = directories.find((d: any) => d.id === dir.id)
    setOpenDir(liveDir || dir)
  }

  const handleCloseDir = () => {
    setOpenDir(null)
  }

  const handleFileClick = (file: ProjectFile) => {
    if (file.link) {
      window.open(file.link, "_blank", "noopener,noreferrer")
      return
    }
    if (file.categories || file.pages || file.pdfUrl) {
      setActiveProject(file)
      setActiveCatIndex(0)
      setCardIndex(0)
      setIsFlipped(false)
      setIsSwiped(false)
    }
  }

  const handleCardClick = () => {
    if (isSwiped) return
    const pages = activeProject?.categories
      ? activeProject.categories[activeCatIndex]?.pages
      : activeProject?.pages
    if (!pages) return

    if (!isFlipped) {
      setIsFlipped(true)
    } else {
      const totalCards = Math.ceil(pages.length / 2)
      if (cardIndex < totalCards - 1) {
        setIsSwiped(true)
        setTimeout(() => {
          setCardIndex(prev => prev + 1)
          setIsFlipped(false)
          setIsSwiped(false)
        }, 350)
      } else {
        setIsSwiped(true)
        setTimeout(() => {
          setCardIndex(0)
          setIsFlipped(false)
          setIsSwiped(false)
        }, 350)
      }
    }
  }

  const goPrev = () => {
    const pages = activeProject?.categories
      ? activeProject.categories[activeCatIndex]?.pages
      : activeProject?.pages
    if (!pages) return

    if (isFlipped) {
      setIsFlipped(false)
    } else if (cardIndex > 0) {
      setCardIndex(prev => prev - 1)
      setIsFlipped(true)
    }
  }

  const goNext = () => {
    const pages = activeProject?.categories
      ? activeProject.categories[activeCatIndex]?.pages
      : activeProject?.pages
    if (!pages) return

    const totalCards = Math.ceil(pages.length / 2)
    if (!isFlipped) {
      setIsFlipped(true)
    } else if (cardIndex < totalCards - 1) {
      setIsSwiped(true)
      setTimeout(() => {
        setCardIndex(prev => prev + 1)
        setIsFlipped(false)
        setIsSwiped(false)
      }, 350)
    }
  }

  const activePages = activeProject
    ? activeProject.categories
      ? activeProject.categories[activeCatIndex]?.pages || []
      : activeProject.pages || []
    : []

  const activePdfUrl = activeProject
    ? activeProject.categories
      ? activeProject.categories[activeCatIndex]?.pdfUrl
      : activeProject.pdfUrl
    : undefined

  const activeType = activeProject
    ? activeProject.categories
      ? activeProject.categories[activeCatIndex]?.type || (activeProject.categories[activeCatIndex]?.pdfUrl ? "pdf" : "images")
      : (activeProject.pdfUrl && !activeProject.pages) ? "pdf" : "images"
    : "images"

  const totalCards = Math.ceil(activePages.length / 2)

  return (
    <section id="work" className="relative bg-black/75 backdrop-blur-[2px] px-6 py-14 sm:px-12 sm:py-32 border-t border-neutral-900">
      <style>{`
        .flip-card-container {
          perspective: 1200px;
          position: relative;
          width: 100%;
          max-width: 440px;
          aspect-ratio: 3 / 4;
        }
        .flip-card {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease, left 0.3s ease;
          cursor: pointer;
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border: 1px solid #1c1c1c;
          background-color: #0d0d0d;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .flip-card.flipped {
          transform: rotateY(-180deg);
        }
        .flip-card.swiped {
          transform: translate(-125%, 30px) rotate(-12deg) rotateY(-180deg);
          opacity: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="mx-auto max-w-[1400px]">
        <div className="w-full border-b border-neutral-900 pb-4 mb-10 sm:mb-16 flex items-center gap-4">
          <span className="font-mono text-[9px] text-signal tracking-widest">02 /</span>
          <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">Work</span>
          <div className="h-[0.5px] bg-neutral-900 flex-1"></div>
        </div>

        {!openDir ? (
          <div>
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter text-paper select-none">
                  Projects / Folders
                </h3>
                <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mt-2">
                  CLICK A FOLDER TO SELECT, CLICK AGAIN OR DBL_CLICK TO OPEN
                </p>
              </div>
              <div className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase">
                {totalFilesCount} FILES / {totalDirsCount} DIRS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {directories.map((dir: any) => {
                const isSelected = selectedDirId === dir.id
                return (
                  <div
                    key={dir.id}
                    onClick={() => handleDirClick(dir)}
                    onDoubleClick={() => handleDirDoubleClick(dir)}
                    className="flex flex-col group cursor-pointer select-none"
                  >
                    <div className="flex items-end">
                      <div
                        className={`w-14 h-3 rounded-t-sm border-t border-x -mb-px transition-colors duration-300 ${
                          isSelected
                            ? "bg-neutral-950 border-signal"
                            : "bg-neutral-900 border-neutral-800"
                        }`}
                      />
                    </div>

                    <div
                      className={`relative flex flex-col justify-between p-6 h-52 border transition-all duration-300 ${
                        isSelected
                          ? "bg-neutral-950/40 border-signal shadow-[0_0_12px_rgba(214,43,43,0.15)]"
                          : "bg-neutral-950/10 border-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        {isSelected ? (
                          <FolderOpen className="size-5 text-signal" />
                        ) : (
                          <Folder className="size-5 text-neutral-500" />
                        )}
                        <span className="font-mono text-[8px] tracking-widest text-neutral-500">
                          {dir.num}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-display font-extrabold text-3xl tracking-tighter text-paper leading-none">
                          {dir.name}
                        </h4>
                        <span className="font-mono text-[9px] tracking-wider text-neutral-500 block mt-2">
                          {dir.filesCount} FILES
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-6 font-mono text-[8px] tracking-widest text-neutral-500">
                        <span className="group-hover:text-signal transition-colors">
                          OPEN &rarr;
                        </span>
                        <span>DBL_CLICK</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div ref={folderRef} className="border border-signal bg-neutral-950/20 p-6 sm:p-10 relative animate-in fade-in duration-300">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-neutral-400">
                <FolderOpen className="size-4 text-signal" />
                <span>{openDir.num} /</span>
                <span className="text-paper font-bold">{openDir.name}</span>
              </div>
              <button
                onClick={handleCloseDir}
                className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-neutral-500 hover:text-signal uppercase border border-neutral-900 px-3 py-1 hover:border-signal transition-colors duration-300"
              >
                <span>CLOSE</span>
                <X className="size-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openDir.files.map((file: any, idx: number) => {
                const hasAction = file.link || file.categories || file.pages || file.pdfUrl
                return (
                  <div
                    key={idx}
                    onClick={() => handleFileClick(file)}
                    className={`border border-neutral-900 bg-neutral-950/60 p-5 flex flex-col justify-between min-h-[360px] transition-all duration-300 ${
                      hasAction ? "hover:border-neutral-700 cursor-pointer" : "hover:border-neutral-900"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[8px] tracking-widest text-neutral-500">
                          {file.tag}
                        </span>
                        {file.isConfidential && (
                          <span className="font-mono text-[8px] text-signal/85 border border-signal/30 px-1.5 py-0.5 tracking-wider bg-signal/5">
                            CONFIDENTIAL
                          </span>
                        )}
                      </div>

                      {file.isConfidential ? (
                        <div className="w-full aspect-video border border-neutral-900/60 bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden rounded-sm select-none">
                          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #f0ebe0 0px, #f0ebe0 2px, transparent 2px, transparent 10px)" }} />
                          <span className="font-mono text-[8px] tracking-widest text-neutral-600 uppercase text-center leading-relaxed">
                            DAYDREAM INTERNAL WORK
                          </span>
                          <span className="font-mono text-[7px] text-neutral-700 uppercase tracking-widest mt-1">
                            ASSETS RESTRICTED
                          </span>
                        </div>
                      ) : (
                        file.image && (
                          <DitherImageFrame aspectRatio="video" rounded="rounded-sm" enableHoverEffect={false}>
                            <DitherImageContent src={file.image} alt={file.title} />
                          </DitherImageFrame>
                        )
                      )}

                      <h5 className="font-display font-bold text-lg text-paper tracking-tight mt-4 mb-2 flex items-center justify-between">
                        <span>{file.title}</span>
                        {file.link && <ExternalLink className="size-3.5 text-neutral-500 group-hover:text-signal" />}
                      </h5>
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                        {file.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-900/60 flex flex-col gap-3">
                      <div className="flex flex-wrap gap-1">
                        {file.tech.map((t: string, idx2: number) => (
                          <span
                            key={idx2}
                            className="font-mono text-[8px] tracking-wider text-neutral-500 border border-neutral-900 px-2 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {file.link && (
                        <span className="font-mono text-[8px] tracking-widest text-signal hover:underline mt-1 block">
                          VISIT DASHBOARD &rarr;
                        </span>
                      )}
                      {(file.categories || file.pages || file.pdfUrl) && (
                        <span className="font-mono text-[8px] tracking-widest text-signal hover:underline mt-1 block">
                          VIEW PROJECT FILES &rarr;
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${
              activeType === "pdf" ? "max-w-5xl" : "max-w-5xl"
            } bg-neutral-950 border border-neutral-900 p-6 sm:p-10 flex flex-col ${
              activeType === "pdf" ? "gap-6" : "lg:flex-row gap-10 items-stretch"
            } max-h-[90vh] overflow-y-auto lg:overflow-visible animate-in zoom-in-95 duration-300`}
          >
            
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-signal border border-neutral-900 hover:border-signal p-2 transition-colors duration-300 z-10"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {activeType === "pdf" ? (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-neutral-900/60">
                  <div className="flex flex-col gap-2 max-w-2xl">
                    <span className="font-mono text-[9px] text-signal tracking-widest uppercase">
                      {activeProject.tag}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-paper uppercase tracking-tighter leading-none">
                      {activeProject.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed mt-1">
                      {activeProject.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {activeProject.tech.map((t: string, idx: number) => (
                        <span key={idx} className="font-mono text-[8px] tracking-wider text-neutral-500 border border-neutral-900 px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
                    {activeProject.categories && (
                      <div className="flex gap-1 border border-neutral-900 p-1 bg-black">
                        {activeProject.categories.map((cat: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveCatIndex(idx)
                              setCardIndex(0)
                              setIsFlipped(false)
                              setIsSwiped(false)
                            }}
                            className={`font-mono text-[8px] uppercase tracking-widest px-3 py-1.5 border transition-all duration-300 ${
                              activeCatIndex === idx
                                ? "border-signal text-signal bg-signal/5"
                                : "border-transparent text-neutral-500 hover:text-neutral-300"
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    )}
                    {activePdfUrl && (
                      <a
                        href={activePdfUrl}
                        download
                        className="flex items-center justify-center gap-2 text-neutral-400 font-mono text-[9px] uppercase tracking-widest hover:text-paper border border-neutral-900 hover:border-neutral-700 px-4 py-2.5 transition-colors duration-300"
                      >
                        <Download className="size-3.5" />
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>

                <div className="w-full h-[60vh] min-h-[440px] border border-neutral-900 bg-neutral-950">
                  <iframe
                    src={activePdfUrl}
                    className="w-full h-full border-0"
                    title={activeProject.title}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="lg:w-5/12 flex flex-col justify-between pr-0 lg:pr-6 border-r-0 lg:border-r border-neutral-900/60">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] text-signal tracking-widest uppercase">
                      {activeProject.tag}
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-paper tracking-tighter uppercase leading-[0.95]">
                      {activeProject.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed mt-2">
                      {activeProject.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {activeProject.tech.map((t: string, idx: number) => (
                        <span key={idx} className="font-mono text-[8px] tracking-wider text-neutral-500 border border-neutral-900 px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>

                    {activeProject.categories && (
                      <div className="flex flex-col gap-2 mt-8">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-600">/ Categories</span>
                        <div className="flex flex-col gap-1.5">
                          {activeProject.categories.map((cat: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setActiveCatIndex(idx)
                                setCardIndex(0)
                                setIsFlipped(false)
                                setIsSwiped(false)
                              }}
                              className={`text-left font-mono text-[9px] uppercase tracking-widest px-4 py-3 border transition-all duration-300 ${
                                activeCatIndex === idx
                                  ? "border-signal text-signal bg-signal/5"
                                  : "border-neutral-900 text-neutral-500 hover:border-neutral-800 hover:text-neutral-300"
                              }`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 lg:mt-auto pt-6 border-t border-neutral-900/60 flex flex-col gap-3">
                    {activePdfUrl && (
                      <a
                        href={activePdfUrl}
                        download
                        className="flex items-center justify-between text-neutral-400 font-mono text-[9px] uppercase tracking-widest hover:text-paper border border-neutral-900 hover:border-neutral-700 px-4 py-3 transition-colors duration-300"
                      >
                        <span className="flex items-center gap-2">
                          <Download className="size-3.5" />
                          Download Full PDF
                        </span>
                        <span>&darr;</span>
                      </a>
                    )}
                    <button
                      onClick={() => setActiveProject(null)}
                      className="w-full text-center text-neutral-500 font-mono text-[9px] uppercase tracking-widest hover:text-signal border border-neutral-900 hover:border-signal px-4 py-3 transition-colors duration-300"
                    >
                      Return to Folders
                    </button>
                  </div>
                </div>

                <div className="lg:w-7/12 flex flex-col items-center justify-center min-h-[380px] lg:min-h-0">
                  <div className="flex flex-col items-center gap-6 w-full">
                    <div className="flip-card-container">
                      {Array.from({ length: totalCards }).map((_, i: number) => {
                        if (i < cardIndex) return null
                        const isTop = i === cardIndex
                        const frontImg = activePages[i * 2]
                        const backImg = activePages[i * 2 + 1]

                        let cardClass = "flip-card"
                        if (isTop) {
                          if (isFlipped) cardClass += " flipped"
                          if (isSwiped) cardClass += " swiped"
                        } else {
                          cardClass += " pointer-events-none opacity-20 scale-95 translate-y-4"
                        }

                        return (
                          <div
                            key={i}
                            className={cardClass}
                            style={{ zIndex: totalCards - i }}
                            onClick={() => isTop && handleCardClick()}
                          >
                            <div className="flip-card-front">
                              <img src={frontImg} alt={`Page ${i * 2 + 1}`} className="w-full h-full object-contain" />
                              <div className="absolute bottom-3 left-3 bg-black/90 px-2 py-0.5 font-mono text-[8px] text-neutral-400 border border-neutral-800">
                                PAGE {i * 2 + 1} / {activePages.length}
                              </div>
                              <div className="absolute top-3 right-3 bg-black/90 px-2.5 py-1.5 font-mono text-[7px] text-signal border border-neutral-800 uppercase tracking-widest select-none">
                                CLICK TO FLIP
                              </div>
                            </div>
                            <div className="flip-card-back">
                              {backImg ? (
                                <>
                                  <img src={backImg} alt={`Page ${i * 2 + 2}`} className="w-full h-full object-contain" />
                                  <div className="absolute bottom-3 left-3 bg-black/90 px-2 py-0.5 font-mono text-[8px] text-neutral-400 border border-neutral-800">
                                    PAGE {i * 2 + 2} / {activePages.length}
                                  </div>
                                  <div className="absolute top-3 right-3 bg-black/90 px-2.5 py-1.5 font-mono text-[7px] text-signal border border-neutral-800 uppercase tracking-widest select-none">
                                    CLICK TO SWIPE
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-center h-full w-full bg-neutral-950">
                                  <span className="font-display font-black text-xl text-paper tracking-tighter uppercase mb-1">
                                    Neha Singh
                                  </span>
                                  <span className="font-mono text-[7px] uppercase tracking-widest text-neutral-600">
                                    Design &times; Engineering
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex items-center gap-6 mt-2">
                      <button
                        onClick={goPrev}
                        disabled={cardIndex === 0 && !isFlipped}
                        className="w-10 h-10 border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-signal hover:border-signal disabled:opacity-20 disabled:hover:border-neutral-900 disabled:hover:text-neutral-400 transition-colors"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                        CARD {cardIndex + 1} / {totalCards} {isFlipped ? "(BACK)" : "(FRONT)"}
                      </span>
                      <button
                        onClick={goNext}
                        disabled={cardIndex === totalCards - 1 && isFlipped}
                        className="w-10 h-10 border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-signal hover:border-signal disabled:opacity-20 disabled:hover:border-neutral-900 disabled:hover:text-neutral-400 transition-colors"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </section>
  )
}

export default Work
