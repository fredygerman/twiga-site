"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
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
    .regex(/^\+?[0-9\s-()]+$/, {
      message: "Please enter a valid phone number format.",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function Registration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Use environment variables for form configuration
  const GOOGLE_FORM_ACTION = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION;
  const FORM_ENTRIES = {
    fullName: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_FULL_NAME,
    schoolName: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_SCHOOL_NAME,
    email: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL,
    whatsappNumber: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_WHATSAPP,
  };

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      schoolName: "",
      email: "",
      whatsappNumber: "",
    },
  });

  const submitToGoogleForms = (data: FormData) => {
    // Validate environment variables
    if (!GOOGLE_FORM_ACTION || !FORM_ENTRIES.fullName) {
      console.error(
        "Google Forms configuration missing in environment variables"
      );
      throw new Error("Form configuration error. Please contact support.");
    }

    // Create a form element for Google Forms submission
    const formElement = document.createElement("form");
    formElement.action = GOOGLE_FORM_ACTION; // example: "https://docs.google.com/forms/u/0/d/e/[FORMID]/formResponse"
    formElement.method = "POST";
    formElement.target = "hidden_iframe";
    formElement.style.display = "none";

    // Add form fields with Google Forms entry IDs
    const addField = (name: string, value: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      formElement.appendChild(input);
    };

    // Use environment variables for entry IDs
    addField(FORM_ENTRIES.fullName!, data.fullName);
    addField(FORM_ENTRIES.schoolName!, data.schoolName);
    addField(FORM_ENTRIES.email!, data.email);
    addField(FORM_ENTRIES.whatsappNumber!, data.whatsappNumber);

    // Create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.style.display = "none";

    // Add elements to DOM and submit
    document.body.appendChild(iframe);
    document.body.appendChild(formElement);
    formElement.submit();

    // Clean up after submission
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
      if (document.body.contains(formElement)) {
        document.body.removeChild(formElement);
      }
    }, 1000);
  };

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Submit to Google Forms
      submitToGoogleForms(data);

      // Show success message after a brief delay
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        form.reset();
        toast.success("Registration Successful!", {
          description:
            "We'll send your activation link to WhatsApp within 24 hours.",
        });
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus("error");
      toast.error("Registration Failed", {
        description:
          "Please try again or contact support if the problem persists.",
      });
    }
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
                  Thank you for joining Twiga! We'll send your activation link
                  to WhatsApp within 24 hours.
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
                              disabled={isSubmitting}
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
                              disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                            placeholder="+255 XXX XXX XXX"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 text-lg disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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
                    Twiga. Free for all Tanzanian teachers.
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
