# 🌱 StuntingCare: Clinical Pediatric Growth Screening & UNICEF Nutrition Intelligence

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Deployment-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![WHO Child Growth Standards](https://img.shields.io/badge/WHO%20Standards-0--60%20Months-059669?style=for-the-badge&logo=medscape)](https://www.who.int/tools/child-growth-standards)
[![Bilingual Support](https://img.shields.io/badge/Language-ID%20%F0%9F%87%AE%F0%9F%87%A9%20%7C%20EN%20%F0%9F%87%AC%F0%9F%87%A7-0284C7?style=for-the-badge)](#-bilingual-support--language-switcher)

**StuntingCare** is a clinical-grade child stunting screening platform and public health intelligence dashboard engineered for pediatricians, healthcare workers (*Kader Posyandu*), and public health researchers. It seamlessly bridges individual anthropometric Z-score diagnostics (0–60 months) with macro-level demographic analytics from UNICEF Indonesia nutrition cohorts.

---

## ✨ Key Features & Highlights

### 1. 🌐 Bilingual Engine (Indonesian 🇮🇩 ⇄ English 🇬🇧)
- **Instant 1-Click Toggle:** Located in the header navigation bar, allowing recruiters, HR, and global viewers to switch the entire application between **Bahasa Indonesia** and **English** with zero reload latency.
- **Persistent State:** Automatically saves language preference to `localStorage`.
- **Full Coverage:** 100% of the UI (form controls, units, diagnostic status badges, Z-score gauges, clinical recommendations, chart legends, tooltips, and data tables) is fully localized.

### 2. 👶 Individual Child Growth Assessment (Clinical Screening)
- **WHO Child Growth Standards (0–60 months):** Computes exact Standard Deviation scores:
  - **HAZ (Height-for-Age / TB/U):** Identifies chronic linear growth failure and stunting (*Normal, Moderate Stunting, Severe Stunting*).
  - **WAZ (Weight-for-Age / BB/U):** Measures underweight and composite nutritional deficit.
  - **WHZ / BMI-for-Age (BB/TB & IMT/U):** Screens for acute wasting (*Moderate & Severe Acute Malnutrition / MAM & SAM*) or overweight.
  - **MUAC / LiLA:** Mid-Upper Arm Circumference screening for acute wasting risk.
- **Visual Z-Score Gauges:** Interactive interval meters showing position relative to $-3\text{SD}$, $-2\text{SD}$, $0\text{ (Median)}$, and $+2\text{SD}$.
- **Evidence-Based Clinical Roadmap:** Personalized nutritional checklists based on child age, 1,000 First Days of Life (1000 HPK), and animal protein intake recommendations.
- **Quick Demo Profiles:** 1-click test profiles (*Normal Growth 18m*, *Moderate Stunting 24m*, *Severe Malnutrition 12m*) for rapid evaluation.

### 3. 📊 Public Health Macro Analytics & UNICEF Explorer
- **Interactive Multi-Filter:** Filter by nutritional indicator (*Stunting, Exclusive Breastfeeding, Wasting, Overweight*), gender, urban/rural residence, and wealth quintile.
- **Dynamic KPI Cards:** Dynamic metrics reflecting national trends, 5-year improvement trajectories, and education equity reduction gap.
- **Chart.js Visualizations:**
  - Annual Trajectory (2018–2024) Line Chart.
  - Maternal Education Gradient Grouped Bar Chart.
  - Geographic Disparity (Urban vs Rural) Chart.
  - Socio-Economic Wealth Quintile Gradient Chart.
- **Raw Data Explorer & Export:** Instant search, pagination, and one-click `.csv` file export.

### 4. 🎨 Modern Health-Tech UI/UX Design System
- **Clinical Color Palette:** Soft emerald / clinical sage green (`#064E3B`, `#059669`, `#10B981`) paired with calming warm slate (`#0F172A`, `#64748B`) and clean pure-white surfaces (`#FFFFFF`).
- **Accessible Inputs:** Subtle borders (`border-slate-200`), clear focus rings, and inline unit tags.
- **Tactile CTAs & Micro-interactions:** Smooth transitions and simulated diagnostic state feedback.
- **Print / PDF Summary:** Direct browser print support for child screening summaries.

---

## 📂 Project Architecture

```text
Stunting-Prediction/
├── index.html               # Main Production Web App (Vercel Root Entrypoint)
├── style.css                # Clinical HealthTech UI & Design System
├── script.js                # Bilingual Engine, WHO Anthro Calculations & Charts
├── data/
│   ├── generate_data.py     # Deterministic socio-economic data generator
│   └── NUTRITION_CLEAN.csv  # Cleaned UNICEF Indonesia dataset
├── src/
│   └── streamlit_app.py     # Streamlit interactive application (Python version)
└── README.md                # Technical Documentation
```

---

## 🚀 Running & Deployment

### Option A: Static Web Application (Vercel Deployment)
This project is pre-configured for instant zero-config deployment on **Vercel** or GitHub Pages:
1. Simply connect your GitHub repository to [Vercel](https://vercel.com).
2. Set the build output directory to the root `/`.
3. Vercel will automatically serve `index.html`, `style.css`, and `script.js` with instant global CDN caching.

### Option B: Local Python Streamlit Dashboard
To run the Streamlit version locally:
```bash
# 1. Install dependencies
pip install streamlit pandas plotly

# 2. Run the application
streamlit run src/streamlit_app.py
```
Open `http://localhost:8501` in your browser.

---

## 🔬 Clinical Reference & Methodology
- **WHO Multicentre Growth Reference Study (MGRS):** Standard Deviation cutoffs based on WHO guidelines:
  - $\text{HAZ} < -2\text{ SD}$: Stunting (Pendek)
  - $\text{HAZ} < -3\text{ SD}$: Severe Stunting (Sangat Pendek)
  - $\text{WHZ} < -2\text{ SD}$: Wasting (Gizi Kurang Akut)
  - $\text{WHZ} < -3\text{ SD}$: Severe Acute Malnutrition (Gizi Buruk)
- **1,000 First Days of Life (1000 HPK):** Prioritizing pregnancy nutrition, Early Initiation of Breastfeeding (IMD), exclusive breastfeeding (0–6m), and nutrient-dense animal protein complementary feeding (MP-ASI).

---

## 👨‍💻 Author & Contact
- **Author:** Antariksa
- **Role:** Data Analyst & Software Engineer | Apple Developer Academy Candidate
- **Email:** arik2002arik@gmail.com
- **GitHub:** [github.com/Antariksa21](https://github.com/Antariksa21)
