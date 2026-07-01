const fs = require("fs")
const path = require("path")

const projectsDir = path.join(__dirname, "../public/projects")
const outputFile = path.join(__dirname, "../src/data/projects.ts")

const metadata = {
  dev: {
    num: "DIR/01",
    name: "DEV",
    files: {
      "Blobit": {
        tag: "DEV-1.PROJ",
        title: "BLOBIT",
        description: "A node-based generative AI workflow engine. Implemented 20+ custom VFX processing nodes (SAM2 segmentations, DWPose detections, YOLOX tracking) and complete PyTorch testing documentation.",
        tech: ["PYTHON", "PYTORCH", "COMFYUI"],
        link: "https://www.blobit.art/"
      },
      "MOCKUP GENERATOR": {
        tag: "DEV-2.PROJ",
        title: "MOCKUP GENERATOR",
        description: "Full-stack product mockups generator. Automatically replaces background scenes, generates batch previews, and handles dynamic image adjustments via Vision Transformer models.",
        tech: ["REACT", "FLASK", "COMFYUI"],
        isConfidential: true
      },
      "CAPTION TAGGER": {
        tag: "DEV-3.PROJ",
        title: "CAPTION TAGGER",
        description: "Desktop training dataset tagger. Processes image folders and connects to 7 different LLM backends (Claude, GPT, Gemini, Grok) for fast, customized prompt annotation.",
        tech: ["PYTHON", "PYSIDE6", "LLM APIS"],
        isConfidential: true
      }
    }
  },
  design: {
    num: "DIR/02",
    name: "DESIGN",
    files: {
      "stardust": {
        tag: "DSN-1.PROJ",
        title: "STARDUST OBSERVATORIES",
        description: "Complete visual branding guidelines, dark/light logo variations, custom typography system, and merchandise mockups for Ranthambore stargazing initiatives.",
        tech: ["BRANDING", "IDENTITY", "MERCH"]
      },
      "techkshitij": {
        tag: "DSN-2.PROJ",
        title: "TECHKSHITIJ",
        description: "3 years of visual branding files for the university technical festival. Includes brochures, posters, certificates, banner systems, and layout graphics.",
        tech: ["LAYOUT", "EVENT DESIGN", "PRINT"]
      },
      "ruwa": {
        tag: "DSN-3.PROJ",
        title: "RUWA",
        description: "Academic print layout designs for the Golden Jubilee International Conference, establishing a modern typographic layout voice for academic pamphlets.",
        tech: ["EDITORIAL", "TYPOGRAPHY", "PRINT"]
      },
      "COLLEGE POSTER": {
        tag: "DSN-4.PROJ",
        title: "COLLEGE POSTERS",
        description: "A collection of visual posters, banner assets, and marketing layouts created for university events, national webinars, and academic seminars.",
        tech: ["EVENT LAYOUT", "GRAPHIC DESIGN", "MARKETING"]
      }
    }
  },
  play: {
    num: "DIR/03",
    name: "PLAYGROUND",
    files: {
      "pythonia": {
        tag: "PLAY-1.PROJ",
        title: "PYTHONIA",
        description: "Currently under major redevelopment as the codebase is migrating from Godot to Unity. A gamified story-driven Python learning platform where players solve interactive coding challenges.",
        tech: ["UNITY", "C#", "GAME DESIGN"]
      },
      "DESIGNS": {
        tag: "PLAY-2.PROJ",
        title: "PERSONAL DESIGNS",
        description: "Exploration designs and layouts created during personal time, exploring graphic design layouts, grid systems, and visual typography experiments.",
        tech: ["PHOTOSHOP", "LAYOUT", "EXPLORATION"]
      },
      "SKETCHES": {
        tag: "PLAY-3.PROJ",
        title: "HANDDRAWN SKETCHES",
        description: "Handdrawn art and sketches inspired by movies, anime, kpop artists, and music culture, capturing raw expressions and character illustrations.",
        tech: ["SKETCHING", "ANALOG ART", "ILLUSTRATION"]
      },
      "ai": {
        tag: "PLAY-4.PROJ",
        title: "AI DESIGNS",
        description: "Generative AI design explorations. Exploring prompts, style consistency, and composition tags to generate custom assets for visual media and UI elements.",
        tech: ["MIDJOURNEY", "STABLE DIFFUSION", "PROMPT ENGINEERING"]
      }
    }
  }
}

const getImages = (dirPath, relPrefix) => {
  if (!fs.existsSync(dirPath)) return []
  return fs.readdirSync(dirPath)
    .filter(file => /\.(png|jpe?g|webp)$/i.test(file))
    .map(file => path.join(relPrefix, file).replace(/\\/g, "/"))
}

const getPdf = (dirPath, relPrefix) => {
  if (!fs.existsSync(dirPath)) return null
  const pdfFile = fs.readdirSync(dirPath).find(file => /\.pdf$/i.test(file))
  return pdfFile ? path.join(relPrefix, pdfFile).replace(/\\/g, "/") : null
}

const buildDirectories = () => {
  const dirs = []

  const devFiles = []
  const devMeta = metadata.dev.files

  const blobitImages = getImages(path.join(projectsDir, "Blobit"), "projects/Blobit")
  devFiles.push({
    ...devMeta["Blobit"],
    image: blobitImages[0] || "",
    pages: blobitImages
  })

  devFiles.push(devMeta["MOCKUP GENERATOR"])
  devFiles.push(devMeta["CAPTION TAGGER"])

  dirs.push({
    id: "dev",
    num: metadata.dev.num,
    name: metadata.dev.name,
    filesCount: devFiles.length,
    files: devFiles
  })

  const designFiles = []
  const dsnMeta = metadata.design.files

  const stardustDir = path.join(projectsDir, "stardust")
  const stardustPdf = "projects/stardust/STARDUST OBSERVATORY.pdf"
  const stardustPagesDir = path.join(stardustDir, "brand_manual_pages")
  const stardustPages = getImages(stardustPagesDir, "projects/stardust/brand_manual_pages")
  const logoImages = getImages(path.join(stardustDir, "logo"), "projects/stardust/logo")
  const tshirtImages = getImages(path.join(stardustDir, "t-shirt"), "projects/stardust/t-shirt")

  const stardustCategories = []
  if (stardustPages.length) {
    stardustCategories.push({ name: "BRAND MANUAL", type: "images", pages: stardustPages, pdfUrl: stardustPdf })
  } else {
    stardustCategories.push({ name: "BRAND MANUAL (PDF)", type: "pdf", pdfUrl: stardustPdf })
  }
  if (logoImages.length) {
    stardustCategories.push({ name: "LOGO DESIGN", type: "images", pages: logoImages })
  }
  if (tshirtImages.length) {
    stardustCategories.push({ name: "T-SHIRT & MERCH", type: "images", pages: tshirtImages })
  }

  designFiles.push({
    ...dsnMeta["stardust"],
    image: logoImages[0] || "",
    categories: stardustCategories
  })

  const tkDir = path.join(projectsDir, "posters/Tk")
  const tkImages = getImages(path.join(tkDir, "BANNERS"), "projects/posters/Tk/BANNERS")
  
  const brochurePdf = "projects/posters/Tk/BROCHURE/TK 2.0_brochure.pdf"
  const certPdf = "projects/posters/Tk/CERTIFICATE/CERTIFICATES TK_20231009_144149_0000.pdf"

  const tkBrochurePages = getImages(path.join(tkDir, "brochure_pages"), "projects/posters/Tk/brochure_pages")
  const tkCertPages = getImages(path.join(tkDir, "certificates_pages"), "projects/posters/Tk/certificates_pages")

  const tkCategories = []
  if (tkBrochurePages.length) {
    tkCategories.push({ name: "TK 2.0 BROCHURE", type: "images", pages: tkBrochurePages, pdfUrl: brochurePdf })
  } else {
    tkCategories.push({ name: "TK 2.0 BROCHURE (PDF)", type: "pdf", pdfUrl: brochurePdf })
  }

  if (tkCertPages.length) {
    tkCategories.push({ name: "CERTIFICATES", type: "images", pages: tkCertPages, pdfUrl: certPdf })
  } else {
    tkCategories.push({ name: "CERTIFICATES (PDF)", type: "pdf", pdfUrl: certPdf })
  }

  if (tkImages.length) {
    tkCategories.push({ name: "EVENT DESIGN IMAGES", type: "images", pages: tkImages })
  }

  designFiles.push({
    ...dsnMeta["techkshitij"],
    image: tkImages[0] || "",
    categories: tkCategories
  })

  const ruwaDir = path.join(projectsDir, "ruwa")
  const ruwaPdf = "projects/ruwa/RUWA INTERNATIONAL CONFERENCE.pdf"
  const ruwaImages = getImages(ruwaDir, "projects/ruwa")
  const ruwaConfPages = getImages(path.join(ruwaDir, "ruwa_conference_pages"), "projects/ruwa/ruwa_conference_pages")

  const ruwaCategories = []
  if (ruwaConfPages.length) {
    ruwaCategories.push({ name: "RUWA CONFERENCE", type: "images", pages: ruwaConfPages, pdfUrl: ruwaPdf })
  } else {
    ruwaCategories.push({ name: "RUWA CONFERENCE (PDF)", type: "pdf", pdfUrl: ruwaPdf })
  }

  if (ruwaImages.length) {
    ruwaCategories.push({ name: "EDITORIAL LAYOUTS", type: "images", pages: ruwaImages })
  }

  designFiles.push({
    ...dsnMeta["ruwa"],
    image: ruwaImages[0] || "projects/posters/DESIGNS/max.jpeg",
    categories: ruwaCategories
  })

  const collegeDir = path.join(projectsDir, "posters/COLLEGE POSTER")
  const collegeImages = getImages(collegeDir, "projects/posters/COLLEGE POSTER")
  designFiles.push({
    ...dsnMeta["COLLEGE POSTER"],
    image: collegeImages.find(img => /poster/i.test(img)) || collegeImages[0] || "",
    pages: collegeImages
  })

  dirs.push({
    id: "design",
    num: metadata.design.num,
    name: metadata.design.name,
    filesCount: designFiles.length,
    files: designFiles
  })

  const playFiles = []
  const playMeta = metadata.play.files

  const pythoniaImages = getImages(path.join(projectsDir, "pythonia"), "projects/pythonia")
  playFiles.push({
    ...playMeta["pythonia"],
    image: pythoniaImages[0] || "",
    pages: pythoniaImages
  })

  const pDesignsImages = getImages(path.join(projectsDir, "posters/DESIGNS"), "projects/posters/DESIGNS")
  playFiles.push({
    ...playMeta["DESIGNS"],
    image: pDesignsImages[0] || "",
    pages: pDesignsImages
  })

  const sketchesImages = getImages(path.join(projectsDir, "posters/SKETCHES"), "projects/posters/SKETCHES")
  playFiles.push({
    ...playMeta["SKETCHES"],
    image: sketchesImages[0] || "",
    pages: sketchesImages
  })

  const aiImages = getImages(path.join(projectsDir, "ai"), "projects/ai")
  playFiles.push({
    ...playMeta["ai"],
    image: aiImages[0] || "",
    pages: aiImages
  })

  dirs.push({
    id: "play",
    num: metadata.play.num,
    name: metadata.play.name,
    filesCount: playFiles.length,
    files: playFiles
  })

  return dirs
}

const directories = buildDirectories()
const totalFiles = directories.reduce((acc, curr) => acc + curr.filesCount, 0)
const totalDirs = directories.length

const fileContent = `export interface ProjectCategory {
  name: string
  type: "pdf" | "images"
  pdfUrl?: string
  pages?: string[]
}

export interface ProjectFile {
  tag: string
  title: string
  description: string
  image?: string
  tech: string[]
  pdfUrl?: string
  pages?: string[]
  link?: string
  isConfidential?: boolean
  categories?: ProjectCategory[]
}

export interface Directory {
  id: string
  num: string
  name: string
  filesCount: number
  files: ProjectFile[]
}

export const totalFilesCount = ${totalFiles}
export const totalDirsCount = ${totalDirs}

export const directories: Directory[] = ${JSON.stringify(directories, null, 2)}
`

const dirPath = path.dirname(outputFile)
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true })
}
fs.writeFileSync(outputFile, fileContent, "utf-8")
console.log("Scanned and generated src/data/projects.ts")
