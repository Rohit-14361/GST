# 📊 Smart GST Calculator & Tax Breakdown Tool

An interactive, responsive, and premium tax suite built using **React**, **Vite**, and **Tailwind CSS v4** to calculate goods and services tax (GST). This tool was built as a trial task submission for **Digital Heroes**.

## 🚀 Live Demo & Repository
- **Live Tool URL (Vercel)**: `[Your Vercel Live Deployment URL goes here]`
- **GitHub Repository**: `[Your GitHub Repository URL goes here]`

---

## 💡 Why This Tool?
Calculators are often slow, filled with intrusive ads, or lack modern aesthetics. This tool is built to provide an instant, ad-free, and sleek tax-breaking experience that is highly readable on both mobile and desktop screens. It makes calculating invoice structures simple and quick.

---

## ✨ Features
1. **Dual Calculation Modes**:
   - **GST Exclusive (+ GST)**: Calculates tax on top of a net base amount.
   - **GST Inclusive (- GST)**: Extracts base and tax components from a gross total.
2. **Dynamic UI & SVG Chart**:
   - Glassmorphic container panels.
   - Animated light/dark mode theme toggling.
   - SVG-powered real-time Donut Chart showcasing the tax-to-base ratio.
3. **Flexible GST Rate Selection**:
   - One-tap quick presets (`5%`, `12%`, `18%`, `28%`).
   - Smooth custom range slider (supporting values from `0%` to `50%` with decimal precision).
4. **Detailed Tax Splits**:
   - Intra-state (split 50/50 into **CGST** and **SGST**).
   - Inter-state (**IGST** flat rate representation).
5. **Interactive Logs**:
   - Calculation history panel (stored in local browser cache via `localStorage` for persistence).
   - Quick-load back to inputs or individual delete functionality.
6. **Smart Actions**:
   - "Copy Invoice Text" button which formats the results into a clean, text-based receipt perfect for email or WhatsApp messages.
   - Preset increment pads to easily add amount layers (e.g., `+₹100`, `+₹1,000`, `+₹10,000`).

---

## 🛠️ Stack & Technologies
* **Framework**: React 19 (Functional Components & Hooks)
* **Build Tool**: Vite (Ultra-fast Hot Module Replacement)
* **Styling**: Tailwind CSS v4 (Modern styling engine)
* **Icons**: Lucide React
* **Feedback**: React Hot Toast (Toast notification triggers)

---

## 💻 Local Setup & Installation

Follow these steps to run the project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd gst
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local address (usually `http://localhost:5173`).

4. **Verify Lint & Production Build**:
   To test clean compilation:
   ```bash
   npm run lint
   ```
   ```bash
   npm run build
   ```

---

## 🎖️ Assignment Checklist Fulfillments
- [x] **Correct Output**: Built using standard precision Indian GST mathematical models.
- [x] **Required Link**: Includes a button labelled exactly `"Built for Digital Heroes"` directing to `https://digitalheroesco.com` (target: `_blank`).
- [x] **Developer Details**: Full name and contact email are visible in the header and footer blocks of the app:
  - **Developer Name**: Rohit Kumar
  - **Developer Email**: kumarrohit23502@gmail.com
- [x] **Cost**: ₹0 spent. Deployed on completely free tiers (GitHub + Vercel).

---

## ✉️ Contact
For queries regarding the codebase or submission, please reach out at **kumarrohit23502@gmail.com**.
