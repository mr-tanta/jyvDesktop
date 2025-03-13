# JyvStream Desktop Landing Page

A modern, responsive landing page for JyvStream Desktop - a professional-grade audio processing application for content creators, streamers, and professionals.

## Features

- **Modern Design**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Responsive Layout**: Optimized for all device sizes from mobile to desktop
- **Interactive Elements**: 3D audio visualizer, interactive demos, and animated UI components
- **Performance Optimized**: Fast loading times with code splitting and lazy loading
- **SEO Friendly**: Proper metadata and semantic HTML structure

## Technical Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Rendering**: React Three Fiber / Three.js
- **Icons**: React Icons

## Sections

1. **Hero Section**: Features a 3D audio visualizer that responds to microphone input
2. **Features Grid**: Highlights key features of JyvStream Desktop
3. **Interactive Demo**: Allows users to test the noise removal capabilities
4. **Technical Requirements**: Detailed specifications and system requirements
5. **Testimonials**: User feedback and success stories
6. **Pricing Tiers**: Subscription options with feature comparison

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/jyvstream-desktop-landing.git

# Navigate to the project directory
cd jyvstream-desktop-landing

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## Project Structure

```
jyvstream-desktop-landing/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
├── .eslintrc.json       # ESLint configuration
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspiration from modern SaaS landing pages
- Audio processing technology by JyvStream
- 3D visualization techniques from Three.js community
