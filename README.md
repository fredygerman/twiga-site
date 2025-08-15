# Twiga Landing Page

## About Twiga

Twiga is an AI-powered teaching companion designed specifically for Tanzanian educators. Winner of the Meta Llama Impact Grant Award 2024, Twiga empowers teachers with AI-driven lesson support, educational resources, and guidance delivered directly through WhatsApp.

## Repository Overview

**This repository contains only the landing page for Twiga** - not the main application. This is a marketing/registration website built with Next.js that:

- Showcases Twiga's features and benefits
- Handles teacher registration through Google Forms integration
- Provides information about the AI teaching companion
- Serves as the public-facing website for onboarding new users

> 📱 **Looking for the main Twiga app?** The core WhatsApp-based AI teaching companion is available at [https://github.com/Tanzania-AI-Community/twiga](https://github.com/Tanzania-AI-Community/twiga).

## Landing Page Features

- **Teacher Registration System**: Streamlined onboarding process with form validation
- **Google Forms Integration**: Automatic data collection and management for new registrations
- **Information Showcase**: Feature highlights, impact metrics, and testimonials

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tanzania-AI-Community/twiga-landing-page.git
   cd twiga-landing-page
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your Google Forms integration (see [Google Forms Setup](#google-forms-integration) below).

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Google Forms Integration

The registration form integrates directly with Google Forms for data collection. This provides:

- **Zero backend required** - Forms submit directly to Google Sheets
- **Real-time validation** - Client-side form validation with Zod
- **Toast notifications** - User feedback for successful/failed submissions
- **Accessibility** - Full keyboard navigation and screen reader support

### Setup Instructions

1. **Create a Google Form** with these fields:

   - Full Name (Short answer)
   - School Name (Short answer)
   - Email Address (Short answer)
   - WhatsApp Number (Short answer)

2. **Configure environment variables** in `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_FORM_ACTION=your_form_action_url
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_FULL_NAME=entry.123456789
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_SCHOOL_NAME=entry.987654321
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL=entry.555666777
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_WHATSAPP=entry.111222333
   ```

For detailed setup instructions, see [GOOGLE_FORMS_SETUP.md](GOOGLE_FORMS_SETUP.md).

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
twiga-site/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with toast provider
│   └── page.tsx           # Home page
├── components/
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section
│   │   ├── Features.tsx   # Features showcase
│   │   ├── Registration.tsx # Registration form
│   │   └── ...
│   └── ui/                # Reusable UI components
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🔧 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Related Repositories:**

- 🚀 **Main Twiga Application**: [Tanzania-AI-Community/twiga](https://github.com/Tanzania-AI-Community/twiga)
- 🌐 **Landing Page**: This repository

---

**Made with ❤️ for Tanzanian educators**
