# Sweet Tooth: Lemon Pie — Interactive 3D Fragrance Experience 🍋✨

An interactive 3D WebGL experience dedicated to **Sabrina Carpenter's official fragrance "Sweet Tooth: Lemon Pie Eau De Parfum"** (*Short n' Sweet* era).

Built with **React, Three.js (@react-three/fiber, @react-three/drei), Tailwind CSS, and Vite**.

---

## ✨ Features

- **Accurate 75ml 3D Chocolate Bar Bottle**: Faithfully modeled with 3×4 beveled chocolate segments, molded inner cap socket cavity, and a custom gold atomizer assembly with pump actuator.
- **Interactive Unwrapping & Capping**:
  - Starts fully enclosed in the official packaging sleeve wrapper with the cap seated on the nozzle.
  - **Click Bottle**: Unwraps the packaging sleeve and detaches the cap.
  - **Click Floating Cap**: Rewraps the sleeve and reseats the cap onto the bottle.
- **Volumetric Aerosol Fragrance Mist**:
  - Continuous stream atomization featuring a dual-layer particle system: 800 expanding Gaussian vapor cloud billows with buoyant convection + 1,200 glistening micro-aerosol droplets.
  - Directionally calibrated from the gold nozzle orifice.
- **Hydraulic Pump Pressure Cooldown**:
  - Mechanical actuator dip animation on spray.
  - Built-in 1,100ms pump recharge cooldown prevents rapid clicking until pressure builds up.
- **360° Studio Orbit Controls**:
  - Free 360° orbital exploration without ground boundaries or floor clipping.
  - Responsive mouse-tracking tilt parallax and ambient golden sparkles.
- **Glassmorphic UI Overlay**:
  - Minimalist header with official branding and link to the store.
  - Sabrina Carpenter quote callout bubble with frosted glass aesthetics.
  - Custom vector bottle favicon and metadata.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling & Effects**: Tailwind CSS, Lucide React, Web Audio API synthesis
- **Fonts**: DM Serif Display, Montserrat, Pinyon Script

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/austinhttps/sweet-tooth-lemon-pie.git

# Navigate into project directory
cd sweet-tooth-lemon-pie

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📸 Reference
- Fragrance: [Sweet Tooth: Lemon Pie EDP by Sabrina Carpenter](https://fragrancebysabrina.com/products/lemon-pie-edp)

---

## 📄 License
MIT License.
