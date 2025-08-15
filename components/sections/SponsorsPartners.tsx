import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Award, BookOpen, CheckCircle, Users } from "lucide-react";

export default function SponsorsPartners() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Our Sponsors & Partners
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Supported by leading organizations committed to advancing education
            in Tanzania
          </p>

          {/* Sponsors */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-700 mb-8">
              Sponsors
            </h3>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="group relative overflow-hidden rounded-3xl border-blue-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all">
                <Link
                  href="https://www.meta.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:items-start gap-6"
                >
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
                      Grant Award Winner
                    </Badge>
                  </div>
                </Link>
              </Card>

              <Card className="group relative overflow-hidden rounded-3xl border-purple-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all">
                <Link
                  href="https://neon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:items-start gap-6"
                >
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
                </Link>
              </Card>

              <Card className="group relative overflow-hidden rounded-3xl border-teal-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all md:col-span-2 md:justify-self-center md:max-w-md">
                <Link
                  href="https://ai.or.tz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:items-start gap-6"
                >
                  <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-slate-900 ring-1 ring-slate-700 flex items-center justify-center shadow-inner">
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
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="group relative overflow-hidden rounded-3xl border-indigo-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all">
                <Link
                  href="https://kthais.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:items-start gap-6"
                >
                  <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-slate-900 ring-1 ring-slate-700 flex items-center justify-center shadow-inner">
                    <Image
                      src="/logos/kthis.png"
                      alt="KTH AI Society logo"
                      width={88}
                      height={88}
                      className="object-contain w-16 h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-2xl md:text-3xl font-semibold text-slate-900">
                      KTH AI Society, A participatory community for everyone
                      into AI at KTH Royal Institute of Technology
                    </h4>
                    <p className="mt-2 md:mt-3 text-lg md:text-xl text-slate-600">
                      We have some of it's members developers as key
                      contributors
                    </p>
                    <Badge className="mt-4 md:mt-5 bg-indigo-100 text-indigo-800 hover:bg-indigo-100 rounded-full px-3 py-1 text-sm md:text-base">
                      <Users className="w-4 h-4 mr-2" />
                      Development Partner
                    </Badge>
                  </div>
                </Link>
              </Card>

              <Card className="group relative overflow-hidden rounded-3xl border-amber-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all">
                <Link
                  href="https://www.tib.eu/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:items-start gap-6"
                >
                  <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-amber-50 ring-1 ring-amber-100 flex items-center justify-center shadow-inner p-2">
                    <Image
                      src="/logos/tib.png"
                      alt="TIB logo"
                      width={120}
                      height={120}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-2xl md:text-3xl font-semibold text-slate-900">
                      TIB - Leibniz Information Center for Science and
                      Technology and University
                    </h4>
                    <p className="mt-2 md:mt-3 text-lg md:text-xl text-slate-600">
                      Official partner
                    </p>
                    <Badge className="mt-4 md:mt-5 bg-amber-100 text-amber-800 hover:bg-amber-100 rounded-full px-3 py-1 text-sm md:text-base">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      MOU Signed
                    </Badge>
                  </div>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
