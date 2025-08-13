import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🦒</div>
              <span className="text-xl font-bold">Twiga</span>
            </div>
            <p className="text-slate-300">
              Empowering Tanzanian education with AI
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Project</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="https://discord.com/invite/bCe2HfZY2C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://ai.or.tz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Tanzania AI Community
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Contributors
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Releases
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p>
            &copy; 2024 Twiga Project. Built with ❤️ by the Tanzania AI
            Community.
          </p>
        </div>
      </div>
    </footer>
  );
}
