# 📐 Precision Volume Calculator

A modern, high-precision web application designed to calculate volume and weight for various 3D shapes. Built with a focus on visual clarity, responsiveness, and ease of use.

## ✨ Features

- **15+ 3D Shapes**: Supports everything from basic cubes to complex truncated pyramids and spherical caps.
- **Real-time Calculations**: Instant volume updates as you type.
- **Dynamic SVG Diagrams**: Visual representation for every shape to clarify parameters.
- **Comprehensive Units**: Support for metric and imperial units, ranging from millimeters (mm) to nautical miles (nmi).
- **High Precision**: Handles extreme values with clean scientific notation or localized formatting.
- **Modern UI**: Sleek, glassmorphic design using shadcn/ui and custom CSS.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: Dark mode optimized CSS variables.

## 📐 Supported Shapes

| Category | Shapes |
| :--- | :--- |
| **Prisms** | Cube, Rectangular Prism, Triangular Prism |
| **Curved** | Sphere, Hemisphere, Ellipsoid, Capsule |
| **Cylindrical** | Cylinder, Hollow Cylinder / Tube |
| **Conical** | Cone, Conical Frustum |
| **Pyramidal** | Pyramid, Truncated Pyramid |
| **Advanced** | Spherical Cap |

## 📏 Supported Units

- **Metric**: mm, cm, m, km
- **Imperial**: in, ft, yd, mi
- **Marine**: nmi (nautical miles)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm / pnpm / yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app`: Next.js App Router (layout, page, globals).
- `src/components`: UI components and the main `VolumeCalculator`.
- `src/components/ui`: Base Radix-based UI elements.
- `src/lib`: Core logic for volume math (`volumes.ts`) and unit conversions (`units.ts`).

## 📄 License

MIT
