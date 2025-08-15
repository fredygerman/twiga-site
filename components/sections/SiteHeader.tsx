import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/logos/twiga_icon.png"
            alt="Twiga logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-green-700">Twiga</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="#features"
            className="text-slate-600 hover:text-green-700 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-slate-600 hover:text-green-700 transition-colors"
          >
            About
          </Link>
          <Link
            href="#register"
            className="text-slate-600 hover:text-green-700 transition-colors"
          >
            Register
          </Link>
          <Link
            href="https://github.com/Tanzania-AI-Community/twiga"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-green-700 transition-colors flex items-center space-x-1"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
