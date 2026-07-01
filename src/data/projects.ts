export interface ProjectCategory {
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

export const totalFilesCount = 11
export const totalDirsCount = 3

export const directories: Directory[] = [
  {
    "id": "dev",
    "num": "DIR/01",
    "name": "DEV",
    "filesCount": 3,
    "files": [
      {
        "tag": "DEV-1.PROJ",
        "title": "BLOBIT",
        "description": "A node-based generative AI workflow engine. Implemented 20+ custom VFX processing nodes (SAM2 segmentations, DWPose detections, YOLOX tracking) and complete PyTorch testing documentation.",
        "tech": [
          "PYTHON",
          "PYTORCH",
          "COMFYUI"
        ],
        "link": "https://www.blobit.art/",
        "image": "projects/Blobit/pic.png",
        "pages": [
          "projects/Blobit/pic.png"
        ]
      },
      {
        "tag": "DEV-2.PROJ",
        "title": "MOCKUP GENERATOR",
        "description": "Full-stack product mockups generator. Automatically replaces background scenes, generates batch previews, and handles dynamic image adjustments via Vision Transformer models.",
        "tech": [
          "REACT",
          "FLASK",
          "COMFYUI"
        ],
        "isConfidential": true
      },
      {
        "tag": "DEV-3.PROJ",
        "title": "CAPTION TAGGER",
        "description": "Desktop training dataset tagger. Processes image folders and connects to 7 different LLM backends (Claude, GPT, Gemini, Grok) for fast, customized prompt annotation.",
        "tech": [
          "PYTHON",
          "PYSIDE6",
          "LLM APIS"
        ],
        "isConfidential": true
      }
    ]
  },
  {
    "id": "design",
    "num": "DIR/02",
    "name": "DESIGN",
    "filesCount": 4,
    "files": [
      {
        "tag": "DSN-1.PROJ",
        "title": "STARDUST OBSERVATORIES",
        "description": "Complete visual branding guidelines, dark/light logo variations, custom typography system, and merchandise mockups for Ranthambore stargazing initiatives.",
        "tech": [
          "BRANDING",
          "IDENTITY",
          "MERCH"
        ],
        "image": "projects/stardust/logo/4.png",
        "categories": [
          {
            "name": "BRAND MANUAL",
            "type": "images",
            "pages": [
              "projects/stardust/brand_manual_pages/page_01.png",
              "projects/stardust/brand_manual_pages/page_02.png",
              "projects/stardust/brand_manual_pages/page_03.png",
              "projects/stardust/brand_manual_pages/page_04.png",
              "projects/stardust/brand_manual_pages/page_05.png",
              "projects/stardust/brand_manual_pages/page_06.png",
              "projects/stardust/brand_manual_pages/page_07.png",
              "projects/stardust/brand_manual_pages/page_08.png",
              "projects/stardust/brand_manual_pages/page_09.png",
              "projects/stardust/brand_manual_pages/page_10.png",
              "projects/stardust/brand_manual_pages/page_11.png",
              "projects/stardust/brand_manual_pages/page_12.png",
              "projects/stardust/brand_manual_pages/page_13.png"
            ],
            "pdfUrl": "projects/stardust/STARDUST OBSERVATORY.pdf"
          },
          {
            "name": "LOGO DESIGN",
            "type": "images",
            "pages": [
              "projects/stardust/logo/4.png",
              "projects/stardust/logo/5.png",
              "projects/stardust/logo/6.png",
              "projects/stardust/logo/7.png"
            ]
          },
          {
            "name": "T-SHIRT & MERCH",
            "type": "images",
            "pages": [
              "projects/stardust/t-shirt/1.png",
              "projects/stardust/t-shirt/2.png",
              "projects/stardust/t-shirt/3.png"
            ]
          }
        ]
      },
      {
        "tag": "DSN-2.PROJ",
        "title": "TECHKSHITIJ",
        "description": "3 years of visual branding files for the university technical festival. Includes brochures, posters, certificates, banner systems, and layout graphics.",
        "tech": [
          "LAYOUT",
          "EVENT DESIGN",
          "PRINT"
        ],
        "image": "projects/posters/Tk/BANNERS/1.png",
        "categories": [
          {
            "name": "TK 2.0 BROCHURE",
            "type": "images",
            "pages": [
              "projects/posters/Tk/brochure_pages/page_01.png",
              "projects/posters/Tk/brochure_pages/page_02.png",
              "projects/posters/Tk/brochure_pages/page_03.png",
              "projects/posters/Tk/brochure_pages/page_04.png",
              "projects/posters/Tk/brochure_pages/page_05.png",
              "projects/posters/Tk/brochure_pages/page_06.png",
              "projects/posters/Tk/brochure_pages/page_07.png",
              "projects/posters/Tk/brochure_pages/page_08.png",
              "projects/posters/Tk/brochure_pages/page_09.png",
              "projects/posters/Tk/brochure_pages/page_10.png",
              "projects/posters/Tk/brochure_pages/page_11.png",
              "projects/posters/Tk/brochure_pages/page_12.png",
              "projects/posters/Tk/brochure_pages/page_13.png",
              "projects/posters/Tk/brochure_pages/page_14.png",
              "projects/posters/Tk/brochure_pages/page_15.png"
            ],
            "pdfUrl": "projects/posters/Tk/BROCHURE/TK 2.0_brochure.pdf"
          },
          {
            "name": "CERTIFICATES",
            "type": "images",
            "pages": [
              "projects/posters/Tk/certificates_pages/page_01.png",
              "projects/posters/Tk/certificates_pages/page_02.png",
              "projects/posters/Tk/certificates_pages/page_03.png",
              "projects/posters/Tk/certificates_pages/page_04.png"
            ],
            "pdfUrl": "projects/posters/Tk/CERTIFICATE/CERTIFICATES TK_20231009_144149_0000.pdf"
          },
          {
            "name": "EVENT DESIGN IMAGES",
            "type": "images",
            "pages": [
              "projects/posters/Tk/BANNERS/1.png",
              "projects/posters/Tk/BANNERS/2.png",
              "projects/posters/Tk/BANNERS/3.png",
              "projects/posters/Tk/BANNERS/Banner.png"
            ]
          }
        ]
      },
      {
        "tag": "DSN-3.PROJ",
        "title": "RUWA",
        "description": "Academic print layout designs for the Golden Jubilee International Conference, establishing a modern typographic layout voice for academic pamphlets.",
        "tech": [
          "EDITORIAL",
          "TYPOGRAPHY",
          "PRINT"
        ],
        "image": "projects/ruwa/1.png",
        "categories": [
          {
            "name": "RUWA CONFERENCE",
            "type": "images",
            "pages": [
              "projects/ruwa/ruwa_conference_pages/page_01.png",
              "projects/ruwa/ruwa_conference_pages/page_02.png"
            ],
            "pdfUrl": "projects/ruwa/RUWA INTERNATIONAL CONFERENCE.pdf"
          },
          {
            "name": "EDITORIAL LAYOUTS",
            "type": "images",
            "pages": [
              "projects/ruwa/1.png",
              "projects/ruwa/2.png"
            ]
          }
        ]
      },
      {
        "tag": "DSN-4.PROJ",
        "title": "COLLEGE POSTERS",
        "description": "A collection of visual posters, banner assets, and marketing layouts created for university events, national webinars, and academic seminars.",
        "tech": [
          "EVENT LAYOUT",
          "GRAPHIC DESIGN",
          "MARKETING"
        ],
        "image": "projects/posters/COLLEGE POSTER/1.png",
        "pages": [
          "projects/posters/COLLEGE POSTER/1.png",
          "projects/posters/COLLEGE POSTER/2.png",
          "projects/posters/COLLEGE POSTER/3.png",
          "projects/posters/COLLEGE POSTER/assesssment reforms in nep 2020.png",
          "projects/posters/COLLEGE POSTER/Poster.png",
          "projects/posters/COLLEGE POSTER/PYTHON.jpg"
        ]
      }
    ]
  },
  {
    "id": "play",
    "num": "DIR/03",
    "name": "PLAYGROUND",
    "filesCount": 4,
    "files": [
      {
        "tag": "PLAY-1.PROJ",
        "title": "PYTHONIA",
        "description": "Currently under major redevelopment as the codebase is migrating from Godot to Unity. A gamified story-driven Python learning platform where players solve interactive coding challenges.",
        "tech": [
          "UNITY",
          "C#",
          "GAME DESIGN"
        ],
        "image": "projects/pythonia/2.png",
        "pages": [
          "projects/pythonia/2.png",
          "projects/pythonia/5.png"
        ]
      },
      {
        "tag": "PLAY-2.PROJ",
        "title": "PERSONAL DESIGNS",
        "description": "Exploration designs and layouts created during personal time, exploring graphic design layouts, grid systems, and visual typography experiments.",
        "tech": [
          "PHOTOSHOP",
          "LAYOUT",
          "EXPLORATION"
        ],
        "image": "projects/posters/DESIGNS/Gemini_Generated_Image_gq23xlgq23xlgq23.png",
        "pages": [
          "projects/posters/DESIGNS/Gemini_Generated_Image_gq23xlgq23xlgq23.png",
          "projects/posters/DESIGNS/Gemini_Generated_Image_uyrhtouyrhtouyrh.png",
          "projects/posters/DESIGNS/max.jpeg"
        ]
      },
      {
        "tag": "PLAY-3.PROJ",
        "title": "HANDDRAWN SKETCHES",
        "description": "Handdrawn art and sketches inspired by movies, anime, kpop artists, and music culture, capturing raw expressions and character illustrations.",
        "tech": [
          "SKETCHING",
          "ANALOG ART",
          "ILLUSTRATION"
        ],
        "image": "projects/posters/SKETCHES/0ac767f588ec9b3ec34dc7269c5286e3.jpg",
        "pages": [
          "projects/posters/SKETCHES/0ac767f588ec9b3ec34dc7269c5286e3.jpg",
          "projects/posters/SKETCHES/0c08770b1c9da15f118b3e71d6b0c358.jpg",
          "projects/posters/SKETCHES/0e7d77bda1f10f78dd2ff5c974316e47.jpg",
          "projects/posters/SKETCHES/9f408770f93576dc9d581891652983f2.jpg",
          "projects/posters/SKETCHES/d9b7c9a919cbad8c2b5afbb94b929adb.jpg"
        ]
      },
      {
        "tag": "PLAY-4.PROJ",
        "title": "AI DESIGNS",
        "description": "Generative AI design explorations. Exploring prompts, style consistency, and composition tags to generate custom assets for visual media and UI elements.",
        "tech": [
          "MIDJOURNEY",
          "STABLE DIFFUSION",
          "PROMPT ENGINEERING"
        ],
        "image": "projects/ai/f1.jpeg",
        "pages": [
          "projects/ai/f1.jpeg",
          "projects/ai/rb.jpeg",
          "projects/ai/WhatsApp Image 2026-06-27 at 8.48.45 PM.jpeg",
          "projects/ai/WhatsApp Image 2026-06-27 at 8.48.46 PM (1).jpeg",
          "projects/ai/WhatsApp Image 2026-06-27 at 8.48.46 PM.jpeg",
          "projects/ai/WhatsApp Image 2026-06-27 at 8.48.47 PM.jpeg"
        ]
      }
    ]
  }
]
