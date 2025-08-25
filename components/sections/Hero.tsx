import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <Badge className="mb-6 bg-lime-100 text-lime-800 hover:bg-lime-100">
          <Award className="w-4 h-4 mr-2" />
          Meta Llama Impact Grant Award Winner 2024
        </Badge>

        <div className="flex justify-center mb-6">
          <Image
            src="/logos/twiga_icon.png"
            alt="Twiga logo"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
          Twiga
          <br />
          Your Teaching Companion on{" "}
          <span className="text-green-700"> WhatsApp</span>
        </h1>

        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Empowering Tanzanian teachers with AI-powered lesson support,
          resources, and guidance — anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3 text-lg"
            asChild
          >
            <Link href="#register">Join the Beta, Free for Teachers</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
            asChild
          >
            <Link href="#features">See How It Works</Link>
          </Button>
        </div>

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
              <div className="bg-slate-100 rounded-lg p-3 max-w-xs ml-auto">
                <p className="text-sm">
                  Can you generate 10 exercise questions on fractions for Grade
                  4 students?
                </p>
              </div>
              <div className="bg-green-100 rounded-lg p-3 max-w-sm">
                <p className="text-sm">
                  Here are 10 fraction exercises for Grade 4: 1) What is 1/2 +
                  1/4? 2) Simplify 4/8...
                </p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3 max-w-xs ml-auto">
                <p className="text-sm">
                  Perfect! Can you also create word problems using these
                  fractions?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
