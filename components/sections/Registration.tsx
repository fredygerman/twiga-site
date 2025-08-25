"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState, useTransition } from "react";
import { submitRegistration } from "@/lib/actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone, Mail, School, User, CheckCircle } from "lucide-react";

// Define the form schema with validation
const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  schoolName: z.string().min(2, {
    message: "School name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  whatsappNumber: z
    .string()
    .min(10, {
      message: "Please enter a valid WhatsApp number.",
    })
    .regex(/^(255|0)[67]\d{8}$/, {
      message:
        "Please enter a valid Tanzanian phone number (255XXXXXXXXX or 0XXXXXXXXX).",
    })
    .transform((val) => {
      // Convert 0XXXXXXXXX to 255XXXXXXXXX format
      if (val.startsWith("0")) {
        return "255" + val.slice(1);
      }
      return val;
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function Registration() {
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      schoolName: "",
      email: "",
      whatsappNumber: "",
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("schoolName", data.schoolName);
        formData.append("email", data.email);
        formData.append("whatsappNumber", data.whatsappNumber);

        const result = await submitRegistration(formData);

        if (result.success) {
          setSubmitStatus("success");
          form.reset();
          toast.success("Registration Successful!", {
            description:
              "We'll get back to you when your application is approved.",
          });
        } else {
          setSubmitStatus("error");
          toast.error("Registration Failed", {
            description:
              result.error ||
              "Please try again or contact support if the problem persists.",
          });
        }
      } catch (error) {
        setSubmitStatus("error");
        toast.error("Registration Failed", {
          description:
            "Please try again or contact support if the problem persists.",
        });
      }
    });
  };

  if (submitStatus === "success") {
    return (
      <section id="register" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-100 shadow-lg">
              <CardContent className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-slate-600 mb-6">
                  Thank you for joining Twiga! We'll get back to you when your
                  application is approved.
                </p>
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  Register Another Teacher
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Full Name</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <School className="w-4 h-4" />
                            <span>School Name</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your school name"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>WhatsApp Number</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="255XXXXXXXXX or 0XXXXXXXXX"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-slate-500 mt-1">
                          <strong>Important:</strong> This will be your primary
                          communication number with Twiga. Only Tanzanian
                          numbers are supported. Changing your number later will
                          require re-registration.
                        </p>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 text-lg disabled:opacity-50"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>Join Twiga Beta</>
                    )}
                  </Button>

                  <p className="text-sm text-slate-500 text-center">
                    By registering, you agree to receive WhatsApp messages from
                    Twiga on the provided number. Free for all Tanzanian
                    teachers. Your phone number will be used for all future
                    communications.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
