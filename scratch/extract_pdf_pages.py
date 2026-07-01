import os
import sys
import subprocess

def install_and_import(package):
    try:
        import fitz
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pymupdf"])

install_and_import("pymupdf")
import fitz

projects_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/projects"))

pdf_targets = [
    {
        "pdf": os.path.join(projects_dir, "stardust/STARDUST OBSERVATORY.pdf"),
        "out_dir": os.path.join(projects_dir, "stardust/brand_manual_pages")
    },
    {
        "pdf": os.path.join(projects_dir, "posters/Tk/BROCHURE/TK 2.0_brochure.pdf"),
        "out_dir": os.path.join(projects_dir, "posters/Tk/brochure_pages")
    },
    {
        "pdf": os.path.join(projects_dir, "posters/Tk/CERTIFICATE/CERTIFICATES TK_20231009_144149_0000.pdf"),
        "out_dir": os.path.join(projects_dir, "posters/Tk/certificates_pages")
    },
    {
        "pdf": os.path.join(projects_dir, "ruwa/RUWA INTERNATIONAL CONFERENCE.pdf"),
        "out_dir": os.path.join(projects_dir, "ruwa/ruwa_conference_pages")
    }
]

for target in pdf_targets:
    pdf_path = target["pdf"]
    out_dir = target["out_dir"]
    
    if not os.path.exists(pdf_path):
        print(f"Skipping missing PDF: {pdf_path}")
        continue
        
    os.makedirs(out_dir, exist_ok=True)
    
    if len(os.listdir(out_dir)) > 0:
        print(f"Pages already exist for {os.path.basename(pdf_path)}")
        continue
        
    print(f"Extracting pages from {os.path.basename(pdf_path)}...")
    doc = fitz.open(pdf_path)
    page_count = len(doc)
    for i in range(page_count):
        page = doc.load_page(i)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        out_name = f"page_{i + 1:02d}.png"
        out_path = os.path.join(out_dir, out_name)
        pix.save(out_path)
    doc.close()
    print(f"Finished extracting {page_count} pages.")

print("PDF page extraction completed successfully!")
