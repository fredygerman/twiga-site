import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, CheckCircle } from "lucide-react";

export default function Features() {
  return (
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
  );
}
