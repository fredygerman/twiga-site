"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState, useTransition } from "react";
import { submitRegistration } from "@/lib/actions";
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
import { CheckCircle } from "lucide-react";

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  schoolName: z.string().min(2, {
    message: "School name must be at least 2 characters.",
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
      if (val.startsWith("0")) {
        return "255" + val.slice(1);
      }
      return val;
    }),
});

type FormData = z.infer<typeof FormSchema>;

const steps = [
  {
    n: 1,
    title: "Fill in your details",
    desc: "Your name, school, and Tanzanian WhatsApp number.",
  },
  {
    n: 2,
    title: "Receive your activation link",
    desc: "We'll send it directly to your WhatsApp within minutes.",
  },
  {
    n: 3,
    title: "Start planning lessons",
    desc: "Chat with Twiga on WhatsApp — just like texting a colleague.",
  },
];

const inputClassName =
  "border-[1.5px] border-twiga-cream-dark bg-twiga-cream text-twiga-text transition-colors focus-visible:border-twiga-forest focus-visible:ring-twiga-forest/20 focus-visible:bg-white";

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
      whatsappNumber: "",
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("schoolName", data.schoolName);
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
      } catch {
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
      <section
        id="register"
        className="bg-twiga-cream-mid px-6 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-twiga-cream-dark bg-white px-8 py-12 text-center shadow-sm">
            <CheckCircle
              className="mx-auto mb-4 size-16 text-twiga-forest-light"
              strokeWidth={1.25}
            />
            <h3 className="font-display text-2xl text-twiga-forest">
              Registration Successful!
            </h3>
            <p className="mt-3 font-light leading-relaxed text-twiga-text-muted">
              Thank you for joining Twiga! We&apos;ll get back to you when your
              application is approved.
            </p>
            <Button
              onClick={() => setSubmitStatus("idle")}
              variant="outline"
              className="mt-8 border-twiga-forest text-twiga-forest hover:bg-twiga-forest-pale"
            >
              Register Another Teacher
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="register"
      className="bg-twiga-cream-mid px-6 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-twiga-amber">
              Get Started
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-tight text-twiga-forest">
              Join hundreds of teachers already using Twiga
            </h2>
            <p className="mt-4 max-w-md font-light leading-relaxed text-twiga-text-muted">
              Registration takes under two minutes. Your account is activated
              directly through WhatsApp — no app to install.
            </p>
            <ol className="mt-10 flex flex-col gap-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-twiga-forest text-xs font-bold text-twiga-cream">
                    {s.n}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-twiga-text">
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-twiga-text-muted">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-twiga-cream-dark bg-white p-8 md:p-10">
            <h3 className="font-display text-2xl text-twiga-forest">
              Teacher Registration
            </h3>
            <p className="mt-2 text-sm font-light text-twiga-text-muted">
              We&apos;ll send your activation link directly to WhatsApp. Free for
              all Tanzanian teachers.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-twiga-text">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          disabled={isPending}
                          className={inputClassName}
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
                      <FormLabel className="text-xs font-semibold text-twiga-text">
                        School Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="School or institution name"
                          disabled={isPending}
                          className={inputClassName}
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
                      <FormLabel className="text-xs font-semibold text-twiga-text">
                        WhatsApp Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+255 700 000 000"
                          disabled={isPending}
                          className={inputClassName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 rounded-lg border border-[#f4cda0] bg-twiga-amber-pale px-3.5 py-3 text-xs leading-relaxed text-[#7a4a15]">
                  <span className="shrink-0" aria-hidden>
                    ⓘ
                  </span>
                  <span>
                    This will be your primary number with Twiga. Only Tanzanian
                    numbers are supported. Changing it later requires
                    re-registration.
                  </span>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full bg-twiga-wa-dark text-base font-semibold text-white hover:bg-twiga-wa disabled:opacity-50"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="mr-2 size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Registering...
                    </>
                  ) : (
                    <>💬 Join Twiga Beta</>
                  )}
                </Button>

                <p className="text-center text-xs font-light leading-relaxed text-twiga-text-light">
                  By registering, you agree to receive WhatsApp messages from
                  Twiga. Free for all Tanzanian teachers.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
