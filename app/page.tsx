import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  BookOpen,
  Users,
  Award,
  CheckCircle,
  Phone,
  Mail,
  School,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TwigaLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🦒</div>
            <span className="text-xl font-bold text-green-700">Twiga</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#features"
              className="text-slate-600 hover:text-green-700 transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-slate-600 hover:text-green-700 transition-colors"
            >
              About
            </a>
            <a
              href="#register"
              className="text-slate-600 hover:text-green-700 transition-colors"
            >
              Register
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-lime-100 text-lime-800 hover:bg-lime-100">
            <Award className="w-4 h-4 mr-2" />
            Meta Llama Impact Grant Award Winner 2024
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Twiga
            <br />
            Your Teaching Companion on{" "}
            <span className="text-green-700">WhatsApp</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empowering Tanzanian teachers with AI-powered lesson support,
            resources, and guidance — anytime, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join the Beta – Free for Teachers
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
            >
              See How It Works
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    WhatsApp Chat with Twiga
                  </h3>
                  <p className="text-sm text-slate-500">
                    AI Assistant for Teachers
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="bg-slate-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">I need a Grade 5 math lesson plan</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3 max-w-sm ml-auto">
                  <p className="text-sm">
                    Here is a complete lesson plan on multiplying decimal
                    numbers...
                  </p>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">
                    Thanks! Can you provide additional practice exercises?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How Twiga Helps Teachers
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Designed specifically for Tanzanian educators, powered by advanced
              AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-700" />
                </div>
                <CardTitle className="text-green-700">
                  Plan Lessons Faster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Get instant lesson outlines aligned with the Tanzanian
                  curriculum. Create engaging activities in minutes, not hours.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-700" />
                </div>
                <CardTitle className="text-green-700">
                  Answer Student Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Quick, accurate explanations in Swahili or English. Help your
                  students understand complex concepts with ease.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-700" />
                </div>
                <CardTitle className="text-green-700">
                  Access Teaching Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Download worksheets, quizzes, and learning aids. All content
                  follows TIE curriculum standards.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="about" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
              Trusted by Tanzanian Educators
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  500+
                </div>
                <p className="text-slate-600">Teachers already onboard</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  100%
                </div>
                <p className="text-slate-600">
                  Designed for Tanzanian classrooms
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
              <p className="text-lg text-slate-700 mb-4">
                "Twiga uses retrieval-augmented generation (RAG) to combine the
                adaptive capabilities of LLMs with knowledge from the Tanzanian
                Institute of Education curriculum and textbooks."
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Tanzania AI Community
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  Open Source
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors & Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Sponsors & Partners
            </h2>
            <p className="text-xl text-slate-600 mb-12">
              Supported by leading organizations committed to advancing
              education in Tanzania
            </p>

            {/* Sponsors */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-slate-700 mb-8">
                Sponsors
              </h3>
              <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                <Card className="group relative overflow-hidden rounded-3xl border-blue-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center md:items-start gap-6">
                    <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center shadow-inner">
                      <Image
                        src="/logos/meta.png"
                        alt="Meta logo"
                        width={88}
                        height={88}
                        className="object-contain w-16 h-16 md:w-20 md:h-20"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-2xl md:text-3xl font-semibold text-slate-900">
                        Meta
                      </h4>
                      <p className="mt-2 md:mt-3 text-lg md:text-xl text-slate-600">
                        Meta Llama Impact Grant Innovation Award 2024
                      </p>
                      <Badge className="mt-4 md:mt-5 bg-blue-100 text-blue-800 hover:bg-blue-100 rounded-full px-3 py-1 text-sm md:text-base">
                        <Award className="w-4 h-4 mr-2" />
                        Grant Winner
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card className="group relative overflow-hidden rounded-3xl border-purple-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center md:items-start gap-6">
                    <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-purple-50 ring-1 ring-purple-100 flex items-center justify-center shadow-inner">
                      <Image
                        src="/logos/neon.png"
                        alt="Neon logo"
                        width={88}
                        height={88}
                        className="object-contain w-16 h-16 md:w-20 md:h-20"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-2xl md:text-3xl font-semibold text-slate-900">
                        Neon
                      </h4>
                      <p className="mt-2 md:mt-3 text-lg md:text-xl text-slate-600">
                        Database infrastructure sponsor
                      </p>
                      <Badge className="mt-4 md:mt-5 bg-purple-100 text-purple-800 hover:bg-purple-100 rounded-full px-3 py-1 text-sm md:text-base">
                        Infrastructure Partner
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Tanzania AI Community */}
                <Card className="group relative overflow-hidden rounded-3xl border-teal-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all">
                  <Link
                    href="https://ai.or.tz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center md:items-start gap-6"
                  >
                    <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-teal-50 ring-1 ring-teal-100 flex items-center justify-center shadow-inner">
                      <Image
                        src="/logos/t-ai-c.png"
                        alt="Tanzania AI Community logo"
                        width={88}
                        height={88}
                        className="object-contain w-16 h-16 md:w-20 md:h-20"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-2xl md:text-3xl font-semibold text-slate-900">
                        Tanzania AI Community
                      </h4>
                      <p className="mt-2 md:mt-3 text-lg md:text-xl text-slate-600">
                        Open-source community leading the Twiga project
                      </p>
                      <Badge className="mt-4 md:mt-5 bg-teal-100 text-teal-800 hover:bg-teal-100 rounded-full px-3 py-1 text-sm md:text-base">
                        Community Partner
                      </Badge>
                    </div>
                  </Link>
                </Card>
              </div>
            </div>

            {/* Partners */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-slate-700 mb-8">
                Partners
              </h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="border-indigo-100 hover:shadow-lg transition-shadow p-6">
                  <Link
                    href="https://kthais.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4"
                  >
                    <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Image
                        src="/logos/kthis.png"
                        alt="KTH AI Society logo"
                        width={48}
                        height={48}
                        className="object-contain w-12 h-12"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-semibold text-slate-800">
                        KTH AI Society
                      </h4>
                      <p className="text-slate-600">
                        Student developers as key contributors
                      </p>
                      <Badge className="mt-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                        <Users className="w-3 h-3 mr-1" />
                        Development Partner
                      </Badge>
                    </div>
                  </Link>
                </Card>

                <Card className="border-green-100 hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                      <School className="w-8 h-8 text-green-700" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-semibold text-slate-800">
                        Tanzania Institute of Education (TIE)
                      </h4>
                      <p className="text-slate-600">
                        Official curriculum partner
                      </p>
                      <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        MOU Signed
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* TIB Partner */}
                <Card className="border-amber-100 hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Image
                        src="/logos/tib.png"
                        alt="TIB logo"
                        width={48}
                        height={48}
                        className="object-contain w-12 h-12"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-semibold text-slate-800">
                        TIB - Leibniz Information Center for Science and
                        Technology and University
                      </h4>
                      <p className="text-slate-600">Official partner</p>
                      <Badge className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        MOU Signed
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Open Research Knowledge Graph (ORKG) Team */}
                <Card className="border-rose-100 hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-rose-100 rounded-lg flex items-center justify-center">
                      <div className="text-xl font-bold text-rose-600">
                        ORKG
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-semibold text-slate-800">
                        Open Research Knowledge Graph (ORKG) Team
                      </h4>
                      <p className="text-slate-600">Research partner</p>
                      <Badge className="mt-2 bg-rose-100 text-rose-800 hover:bg-rose-100">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Research Partner
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8 max-w-2xl mx-auto">
                <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-slate-700 mb-2">
                    <strong>Official Partnership:</strong> We've signed a
                    Memorandum of Understanding with the Tanzania Institute of
                    Education (TIE), ensuring all our content aligns with
                    official Tanzanian curriculum standards and educational
                    guidelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-green-50 rounded-xl p-8 border border-green-100">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Join Our Open Source Community
              </h3>
              <p className="text-lg text-slate-700 mb-6">
                Twiga is proudly developed by the Tanzania AI Community with
                contributions from developers, educators, and AI enthusiasts
                worldwide. <strong>We welcome your contributions!</strong>
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
                    <Badge
                      variant="secondary"
                      className="bg-teal-100 text-teal-800"
                    >
                      Open Source
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-800"
                    >
                      MIT License
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Our Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Get Early Access
              </h2>
              <p className="text-xl text-slate-600">
                Join hundreds of Tanzanian teachers already using Twiga
              </p>
            </div>

            <Card className="border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-green-700">
                  Teacher Registration
                </CardTitle>
                <CardDescription className="text-center">
                  We'll send your activation link directly to your WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="school"
                      className="flex items-center space-x-2"
                    >
                      <School className="w-4 h-4" />
                      <span>School Name</span>
                    </Label>
                    <Input id="school" placeholder="Your school name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="whatsapp"
                    className="flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Number</span>
                  </Label>
                  <Input id="whatsapp" placeholder="+255 XXX XXX XXX" />
                </div>

                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Join Twiga Beta
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  By registering, you agree to receive WhatsApp messages from
                  Twiga. Free for all Tanzanian teachers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                    className="hover:text-white transition-colors"
                  >
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tanzania AI Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contributors
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>
              &copy; 2024 Twiga Project. Built with ❤️ by the Tanzania AI
              Community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
