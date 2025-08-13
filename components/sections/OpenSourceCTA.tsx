import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users } from "lucide-react";
import Link from "next/link";

export default function OpenSourceCTA() {
  return (
    <section className="bg-gradient-to-r from-slate-50 to-green-50 rounded-xl p-8 border border-green-100 container mx-auto my-20 px-4">
      <h3 className="text-2xl font-semibold text-slate-800 mb-4">
        Join Our Open Source Community
      </h3>
      <p className="text-lg text-slate-700 mb-6">
        Twiga is proudly developed by the Tanzania AI Community with
        contributions from developers, educators, and AI enthusiasts worldwide.{" "}
        <strong>We welcome your contributions!</strong>
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="text-left">
          <h4 className="font-semibold text-slate-800 mb-2">
            How You Can Contribute:
          </h4>
          <ul className="text-slate-600 space-y-1 text-sm">
            <li>• Code development & bug fixes</li>
            <li>• Educational content creation</li>
            <li>• Translation & localization</li>
            <li>• Testing & feedback</li>
          </ul>
        </div>
        <div className="text-left">
          <h4 className="font-semibold text-slate-800 mb-2">
            Community Stats:
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800"
            >
              15+ Contributors
            </Badge>
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Open Source
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
          asChild
        >
          <Link
            href="https://github.com/Tanzania-AI-Community/twiga"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Users className="w-4 h-4 mr-2" />
            View on GitHub
          </Link>
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
          <Link
            href="https://discord.com/invite/bCe2HfZY2C"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Join Our Discord
          </Link>
        </Button>
      </div>
    </section>
  );
}
