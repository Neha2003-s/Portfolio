import { Github, Linkedin, Mail, FileText, User, Briefcase, Calendar } from "lucide-react"
import { Dock, DockCard, DockDivider } from "@/components/ui/dock"

export function Nav() {
  return (
    <Dock>
      <DockCard label="About" href="#about">
        <User className="size-5" />
      </DockCard>
      <DockCard label="Work" href="#work">
        <Briefcase className="size-5" />
      </DockCard>
      <DockCard label="Experience" href="#experience">
        <Calendar className="size-5" />
      </DockCard>
      <DockDivider />
      <DockCard label="GitHub" href="https://github.com/Neha2003-s?tab=overview&from=2026-07-01&to=2026-07-01" target="_blank" rel="noopener noreferrer">
        <Github className="size-5" />
      </DockCard>
      <DockCard label="LinkedIn" href="https://www.linkedin.com/in/neha-singh-2b4ab0336" target="_blank" rel="noopener noreferrer">
        <Linkedin className="size-5" />
      </DockCard>
      <DockCard label="Resume" href="resume.pdf" target="_blank" rel="noopener noreferrer">
        <FileText className="size-5" />
      </DockCard>
      <DockCard label="Email" href="mailto:ne2003singh@gmail.com">
        <Mail className="size-5" />
      </DockCard>
    </Dock>
  )
}

export default Nav
