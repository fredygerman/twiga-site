import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Phone, Mail, School, User } from "lucide-react";

export default function Registration() {
  return (
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
                  <Label htmlFor="name" className="flex items-center space-x-2">
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
                <Label htmlFor="email" className="flex items-center space-x-2">
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
  );
}
