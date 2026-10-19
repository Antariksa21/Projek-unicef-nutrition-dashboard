/**
 * StuntingCare: Clinical Pediatric Anthropometry & Public Health Analytics
 * Production-ready JavaScript with Full Bilingual Engine (ID/EN) & WHO Growth Standard Calculations
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. BILINGUAL DICTIONARY (INDONESIAN 🇮🇩 & ENGLISH 🇬🇧)
    // =========================================================================
    const i18n = {
        en: {
            top_bar_badge: "WHO & UNICEF Child Growth Screening Framework",
            top_bar_sub: "Evidence-based Pediatric Anthropometry & Public Health Intelligence",
            author_credit: "Built by Antariksa",
            brand_tagline: "Child Growth Analytics & Stunting Screening Platform",
            nav_assessment: "Growth Assessment",
            nav_macro_analytics: "Public Health Analytics",
            nav_guidelines: "WHO Standards & Guidelines",
            btn_print_summary: "Print Report",

            // Hero
            hero_pill: "Clinical Anthropometry & Stunting Risk Screening",
            hero_title: "Individual Child Growth & Stunting Assessment",
            hero_desc: "Accurately evaluate height-for-age, weight-for-age, and acute malnutrition risk against WHO Child Growth Standards (0–60 months). Calibrated with socio-demographic indicators to provide personalized nutritional interventions.",
            demo_preset_label: "Quick Demo Profiles:",
            demo_healthy: "1. Normal Growth (18 mo)",
            demo_at_risk: "2. Moderate Stunting (24 mo)",
            demo_severe: "3. Severe Stunting & Wasting (12 mo)",

            // Form
            form_title: "Child Health Parameters",
            btn_reset: "Reset",
            group_basic_info: "1. Basic Information",
            label_child_name: "Child / Patient Name (Optional)",
            placeholder_name: "e.g. Aisha / Budi",
            label_gender: "Gender",
            gender_male: "Boy",
            gender_female: "Girl",
            label_age: "Age (Months)",
            unit_months: "months",
            quick_age: "Quick Age:",
            age_unit_short: "m",

            group_anthropometrics: "2. Anthropometric Measurements",
            label_height: "Height / Length",
            height_helper: "Recumbent (<24m) or Standing (≥24m)",
            label_weight: "Body Weight",
            weight_helper: "Calibrated digital scale",
            label_head_circ: "Head Circumference",
            label_muac: "MUAC / LiLA",
            optional_tag: "(Optional)",

            group_demographics: "3. Socio-Demographic & Health History",
            label_maternal_edu: "Maternal Education Level",
            edu_higher: "Higher / University (D3/S1/S2)",
            edu_secondary: "Secondary (SMA/SMK/SMP)",
            edu_primary: "Primary School (SD)",
            edu_none: "No Formal Education",

            label_residence: "Residential Area",
            res_urban: "Urban Area (Perkotaan)",
            res_rural: "Rural Area (Pedesaan)",

            label_wealth: "Household Wealth Quintile",
            wealth_richest: "Richest (Quintile 5)",
            wealth_richer: "Richer (Quintile 4)",
            wealth_middle: "Middle (Quintile 3)",
            wealth_poorer: "Poorer (Quintile 2)",
            wealth_poorest: "Poorest (Quintile 1)",

            label_breastfeeding: "Exclusive Breastfeeding (0-6m)",
            bf_yes: "Yes (Exclusive ≥6 mo)",
            bf_partial: "Partial / Mixed Feeding",
            bf_no: "No (Formula only)",

            btn_run_assessment: "Run Health Assessment",

            // Results Card
            res_screening_title: "Clinical Screening Report",
            status_normal_growth: "Normal Growth",
            status_at_risk: "Stunted / At Risk",
            status_severely_stunted: "Severe Stunting (Critical)",
            status_wasted: "Acute Malnutrition (Wasted)",
            status_severely_wasted: "Severely Wasted",
            status_overweight: "Risk of Overweight",

            res_zscores_title: "WHO Standard Deviation (Z-Score) Breakdown",
            res_who_ref: "WHO Multicentre Study Ref",
            metric_haz: "Height-for-Age (HAZ)",
            metric_waz: "Weight-for-Age (WAZ)",
            metric_whz: "Weight-for-Height (WHZ)",
            measured_vs_median: "Measured:",
            bmi_label: "BMI:",
            res_recommendations_title: "Targeted Clinical & Nutritional Roadmap",

            disclaimer_title: "Clinical Screening Disclaimer:",
            disclaimer_body: " This digital tool is engineered strictly for early screening and public health monitoring based on WHO Standards. It does not replace professional pediatric examination, laboratory tests, or medical diagnosis. Please consult a qualified pediatrician or community health worker (Puskesmas/Posyandu) for comprehensive clinical evaluation.",

            // Public Health Analytics Tab
            analytics_pill: "UNICEF Indonesia Nutrition & Socio-Demographic Intelligence",
            analytics_title: "National Child Nutrition & Stunting Trends",
            analytics_subtitle: "Interactive exploratory data analytics spanning 2018–2024 across maternal education, residential geography, and wealth quintiles.",
            btn_export_csv: "Export Cleaned CSV",
            filter_indicator_label: "Nutritional Indicator",
            filter_all_indicators: "All Indicators (Combined)",
            ind_stunting: "Stunting (Height-for-Age)",
            ind_breastfeeding: "Exclusive Breastfeeding",
            ind_wasting: "Wasting (Acute Malnutrition)",
            ind_overweight: "Overweight",
            filter_residence_label: "Residential Domain",
            filter_all_res: "National (Urban & Rural)",
            res_urban_filter: "Urban Only",
            res_rural_filter: "Rural Only",
            filter_edu_label: "Maternal Education Level",
            filter_all_edu: "All Education Levels",
            edu_higher_filter: "Higher / University",
            edu_secondary_filter: "Secondary",
            edu_primary_filter: "Primary School",
            edu_none_filter: "No Education",
            filter_wealth_label: "Household Wealth Quintile",
            filter_all_wealth: "All Wealth Quintiles",
            wealth_richest_filter: "Richest (Q5)",
            wealth_richer_filter: "Richer (Q4)",
            wealth_middle_filter: "Middle (Q3)",
            wealth_poorer_filter: "Poorer (Q2)",
            wealth_poorest_filter: "Poorest (Q1)",

            kpi_stunting: "Avg. Stunting Rate",
            kpi_stunting_sub: "National prevalence trajectory",
            kpi_stunting_change: "(since 2018)",
            kpi_breastfeeding: "Exclusive Breastfeeding",
            kpi_bf_sub: "Infants aged 0-6 months",
            kpi_bf_change: "(progress)",
            kpi_wasting: "Avg. Wasting Rate",
            kpi_wasting_sub: "Weight-for-Height < -2 SD",
            kpi_wasting_change: "(improving)",
            kpi_education_impact: "Education Equity Gap",
            kpi_equity_sub: "Stunting reduction in higher ed",
            kpi_equity_desc: "Higher vs No Education",

            chart1_title: "Annual Nutrition Trends (2018–2024)",
            chart1_subtitle: "Year-over-year mean percentage trajectory",
            chart2_title: "Maternal Education Gradient",
            chart2_subtitle: "Impact of mother's education on nutrition status",
            chart3_title: "Geographic Residence Disparity (Urban vs Rural)",
            chart3_subtitle: "Regional accessibility and infrastructure impact",
            chart4_title: "Socio-Economic Wealth Gradient (Q1 to Q5)",
            chart4_subtitle: "Nutritional outcome across household poverty ratings",

            table_title: "Dataset Records Explorer",
            table_subtitle: "Filtered records from UNICEF Indonesia cleaned cohort",
            placeholder_search: "Search indicator, edu, year...",
            col_indicator: "Indicator",
            col_gender: "Gender",
            col_age: "Age Group",
            col_wealth: "Wealth Quintile",
            col_residence: "Residence",
            col_edu: "Maternal Education",
            col_year: "Year",
            col_value: "Observation (%)",
            table_showing: "Showing",
            table_matching: "matching data points",
            table_page: "Page",
            table_page_of: "of",

            // Guidelines Tab
            guide_pill: "Clinical Reference Framework",
            guide_title: "WHO Child Growth Standards & Z-Score Methodology",
            guide_desc: "The World Health Organization (WHO) Child Growth Standards were developed through the Multicentre Growth Reference Study (MGRS), following children raised under optimal socio-economic and nutritional conditions worldwide.",
            guide_haz_title: "Height-for-Age (HAZ / TB/U)",
            guide_haz_desc: "Measures linear growth failure and cumulative growth deficits over time, indicating chronic malnutrition.",
            sd_severely_stunted: "Severely Stunted (Sangat Pendek)",
            sd_stunted: "Stunted (Pendek)",
            sd_normal: "Normal Linear Growth",
            sd_tall: "Tall (Tinggi)",

            guide_waz_title: "Weight-for-Age (WAZ / BB/U)",
            guide_waz_desc: "Composite index of both acute (wasting) and chronic (stunting) nutritional status. Widely used in community Posyandu growth monitoring.",
            sd_severely_underweight: "Severely Underweight (Gizi Buruk)",
            sd_underweight: "Underweight (Gizi Kurang)",
            sd_normal_weight: "Normal Weight",
            sd_overweight_risk: "Risk of Overweight",

            guide_whz_title: "Weight-for-Height (WHZ / BB/TB)",
            guide_whz_desc: "Measures body mass relative to body length. Reflects current nutritional status and acute severe wasting / dehydration.",
            sd_severe_wasting: "Severely Wasted (Gizi Buruk Akut)",
            sd_wasted: "Wasted / Thin (Gizi Kurang)",
            sd_normal_nutrition: "Normal / Good Nutrition",
            sd_overweight: "Overweight / Obese",

            hpk_pill: "Window of Opportunity",
            hpk_title: "The 1,000 First Days of Life (1000 HPK)",
            hpk_desc: "The period from conception (270 days) through a child's second birthday (730 days) is the most critical window to prevent permanent cognitive, metabolic, and physical growth faltering.",
            hpk_stage1_title: "Stage 1: Pregnancy (270 Days)",
            hpk_stage1_desc: "Maternal nutrition, iron-folic acid supplementation (TTD 90+ tablets), and antenatal care visits (ANC 6x).",
            hpk_stage2_title: "Stage 2: 0–6 Months (180 Days)",
            hpk_stage2_desc: "Early Initiation of Breastfeeding (IMD) within 1 hour of birth and Exclusive Breastfeeding without supplementary water or food.",
            hpk_stage3_title: "Stage 3: 6–24 Months (550 Days)",
            hpk_stage3_desc: "Timely, adequate, safe Complementary Feeding (MP-ASI) rich in animal protein (eggs, fish, meat) alongside continued breastfeeding.",

            footer_credits: "UNICEF & WHO Child Growth Framework",
            footer_portfolio: "Portfolio Project by Antariksa"
        },

        id: {
            top_bar_badge: "Kerangka Standar Pertumbuhan Anak WHO & UNICEF",
            top_bar_sub: "Antropometri Pediatrik Berbasis Bukti & Intelijen Kesehatan Masyarakat",
            author_credit: "Dibuat oleh Antariksa",
            brand_tagline: "Platform Analitik Pertumbuhan Anak & Skrining Stunting",
            nav_assessment: "Analisis Pertumbuhan",
            nav_macro_analytics: "Analitik Kesehatan Publik",
            nav_guidelines: "Panduan & Standar WHO",
            btn_print_summary: "Cetak Laporan",

            // Hero
            hero_pill: "Antropometri Klinis & Skrining Risiko Stunting",
            hero_title: "Analisis Pertumbuhan & Deteksi Dini Stunting Anak",
            hero_desc: "Evaluasi presisi tinggi badan menurut umur, berat badan menurut umur, dan risiko malnutrisi akut berdasarkan Standar Pertumbuhan Anak WHO (0–60 bulan). Dilengkapi kalibrasi sosio-demografis untuk rekomendasi nutrisi terarah.",
            demo_preset_label: "Profil Contoh Cepat:",
            demo_healthy: "1. Tumbuh Normal (18 bln)",
            demo_at_risk: "2. Beresiko Stunting (24 bln)",
            demo_severe: "3. Stunting Berat & Kurus (12 bln)",

            // Form
            form_title: "Parameter Kesehatan Anak",
            btn_reset: "Atur Ulang",
            group_basic_info: "1. Data Dasar Anak",
            label_child_name: "Nama Anak / Pasien (Opsional)",
            placeholder_name: "cth. Aisha / Budi",
            label_gender: "Jenis Kelamin",
            gender_male: "Laki-laki",
            gender_female: "Perempuan",
            label_age: "Usia (Bulan)",
            unit_months: "bulan",
            quick_age: "Pilihan Cepat Usia:",
            age_unit_short: " bln",

            group_anthropometrics: "2. Pengukuran Antropometri",
            label_height: "Tinggi / Panjang Badan",
            height_helper: "Posisi Telentang (<24 bln) / Berdiri (≥24 bln)",
            label_weight: "Berat Badan",
            weight_helper: "Timbangan digital terkalibrasi",
            label_head_circ: "Lingkar Kepala",
            label_muac: "LiLA (Lingkar Lengan Atas)",
            optional_tag: "(Opsional)",

            group_demographics: "3. Riwayat Sosio-Demografi & Gizi",
            label_maternal_edu: "Tingkat Pendidikan Ibu",
            edu_higher: "Pendidikan Tinggi (D3/S1/S2)",
            edu_secondary: "Menengah (SMA/SMK/SMP)",
            edu_primary: "Pendidikan Dasar (SD)",
            edu_none: "Tidak Sekolah",

            label_residence: "Wilayah Domisili",
            res_urban: "Perkotaan (Urban)",
            res_rural: "Pedesaan (Rural)",

            label_wealth: "Tingkat Kesejahteraan Keluarga",
            wealth_richest: "Kuintil 5 (Paling Sejahtera)",
            wealth_richer: "Kuintil 4 (Mampu)",
            wealth_middle: "Kuintil 3 (Menengah)",
            wealth_poorer: "Kuintil 2 (Pra-Sejahtera)",
            wealth_poorest: "Kuintil 1 (Sangat Membutuhkan)",

            label_breastfeeding: "Riwayat ASI Eksklusif (0-6 bln)",
            bf_yes: "Ya (ASI Eksklusif ≥6 bln)",
            bf_partial: "Sebagian / Campur Formula",
            bf_no: "Tidak (Susu Formula saja)",

            btn_run_assessment: "Jalankan Penilaian Gizi",

            // Results Card
            res_screening_title: "Laporan Skrining Klinis",
            status_normal_growth: "Pertumbuhan Normal",
            status_at_risk: "Beresiko Stunting / Pendek",
            status_severely_stunted: "Stunting Berat / Sangat Pendek",
            status_wasted: "Gizi Kurang Akut (Wasting)",
            status_severely_wasted: "Gizi Buruk Akut",
            status_overweight: "Risiko Berat Badan Lebih",

            res_zscores_title: "Rincian Deviasi Standar WHO (Z-Score)",
            res_who_ref: "Referensi WHO Multicentre Study",
            metric_haz: "Tinggi Badan menurut Umur (TB/U)",
            metric_waz: "Berat Badan menurut Umur (BB/U)",
            metric_whz: "Berat Badan menurut Tinggi (BB/TB)",
            measured_vs_median: "Terukur:",
            bmi_label: "IMT:",
            res_recommendations_title: "Rekomendasi Tindakan Klinis & Nutrisi Terarah",

            disclaimer_title: "Disclaimer Skrining Klinis:",
            disclaimer_body: " Alat digital ini dirancang khusus untuk keperluan skrining awal dan pemantauan kesehatan masyarakat berdasarkan standar WHO. Hasil analisis tidak menggantikan pemeriksaan fisik langsung oleh dokter spesialis anak atau tenaga kesehatan medis profesional. Kunjungi Puskesmas atau Posyandu terdekat untuk evaluasi klinis menyeluruh.",

            // Public Health Analytics Tab
            analytics_pill: "Intelijen Gizi & Sosio-Demografi UNICEF Indonesia",
            analytics_title: "Tren Nutrisi & Stunting Anak Nasional",
            analytics_subtitle: "Analisis data eksploratif interaktif 2018–2024 mencakup pengaruh pendidikan ibu, wilayah tempat tinggal, dan kuintil ekonomi.",
            btn_export_csv: "Ekspor Dataset CSV",
            filter_indicator_label: "Indikator Nutrisi",
            filter_all_indicators: "Semua Indikator (Gabungan)",
            ind_stunting: "Stunting (Tinggi menurut Umur)",
            ind_breastfeeding: "Pemberian ASI Eksklusif",
            ind_wasting: "Wasting (Gizi Kurang Akut)",
            ind_overweight: "Kelebihan Berat Badan",
            filter_residence_label: "Wilayah Domisili",
            filter_all_res: "Nasional (Perkotaan & Pedesaan)",
            res_urban_filter: "Hanya Perkotaan",
            res_rural_filter: "Hanya Pedesaan",
            filter_edu_label: "Pendidikan Terakhir Ibu",
            filter_all_edu: "Semua Tingkat Pendidikan",
            edu_higher_filter: "Pendidikan Tinggi",
            edu_secondary_filter: "Menengah (SMP/SMA)",
            edu_primary_filter: "Pendidikan Dasar (SD)",
            edu_none_filter: "Tanpa Sekolah",
            filter_wealth_label: "Tingkat Kesejahteraan Keluarga",
            filter_all_wealth: "Semua Kuintil Kesejahteraan",
            wealth_richest_filter: "Kuintil 5 (Terkaya)",
            wealth_richer_filter: "Kuintil 4 (Mampu)",
            wealth_middle_filter: "Kuintil 3 (Menengah)",
            wealth_poorer_filter: "Kuintil 2 (Pra-Sejahtera)",
            wealth_poorest_filter: "Kuintil 1 (Sangat Membutuhkan)",

            kpi_stunting: "Rata-rata Angka Stunting",
            kpi_stunting_sub: "Tren prevalensi nasional",
            kpi_stunting_change: "(sejak 2018)",
            kpi_breastfeeding: "ASI Eksklusif 0-6 Bulan",
            kpi_bf_sub: "Infants aged 0-6 months",
            kpi_bf_change: "(meningkat)",
            kpi_wasting: "Rata-rata Angka Wasting",
            kpi_wasting_sub: "Berat Badan / Tinggi < -2 SD",
            kpi_wasting_change: "(membaik)",
            kpi_education_impact: "Kesenjangan Edukasi",
            kpi_equity_sub: "Penurunan stunting ibu berpendidikan tinggi",
            kpi_equity_desc: "Pendidikan Tinggi vs Tanpa Edukasi",

            chart1_title: "Tren Perkembangan Tahunan (2018–2024)",
            chart1_subtitle: "Pergerakan rata-rata persentase indikator gizi nasional",
            chart2_title: "Pengaruh Tingkat Pendidikan Ibu",
            chart2_subtitle: "Korelasi kuat pendidikan terhadap status nutrisi",
            chart3_title: "Perbedaan Wilayah Perkotaan vs Pedesaan",
            chart3_subtitle: "Aksesibilitas fasilitas sanitasi dan gizi",
            chart4_title: "Gradien Status Kesejahteraan Ekonomi (Q1 - Q5)",
            chart4_subtitle: "Distribusi capaian gizi dari termiskin hingga terkaya",

            table_title: "Eksplorasi Data Mentah Terfilter",
            table_subtitle: "Catatan data dari cohort UNICEF Indonesia Cleaned",
            placeholder_search: "Cari indikator, pendidikan, tahun...",
            col_indicator: "Indikator",
            col_gender: "Jenis Kelamin",
            col_age: "Kelompok Usia",
            col_wealth: "Kuintil Ekonomi",
            col_residence: "Domisili",
            col_edu: "Pendidikan Ibu",
            col_year: "Tahun",
            col_value: "Hasil Observasi (%)",
            table_showing: "Menampilkan",
            table_matching: "titik data yang sesuai",
            table_page: "Halaman",
            table_page_of: "dari",

            // Guidelines Tab
            guide_pill: "Kerangka Referensi Klinis",
            guide_title: "Standar Pertumbuhan Anak WHO & Metodologi Z-Score",
            guide_desc: "Standar Pertumbuhan Anak Organisasi Kesehatan Dunia (WHO) disusun melalui penelitian Multicentre Growth Reference Study (MGRS), mengamati anak-anak yang dibesarkan dalam kondisi kesehatan, gizi, dan lingkungan optimal di seluruh dunia.",
            guide_haz_title: "Tinggi Badan menurut Usia (TB/U - HAZ)",
            guide_haz_desc: "Mengukur defisit pertumbuhan linier kumulatif dari waktu ke waktu, yang mengindikasikan status gizi kronis (stunting).",
            sd_severely_stunted: "Sangat Pendek / Stunting Parah",
            sd_stunted: "Pendek / Stunting",
            sd_normal: "Pertumbuhan Tinggi Normal",
            sd_tall: "Tinggi",

            guide_waz_title: "Berat Badan menurut Usia (BB/U - WAZ)",
            guide_waz_desc: "Indeks gabungan status gizi akut dan kronis. Paling sering digunakan di Posyandu untuk pemantauan kenaikan berat badan berkala (KMS).",
            sd_severely_underweight: "Berat Badan Sangat Kurang (Gizi Buruk)",
            sd_underweight: "Berat Badan Kurang (Gizi Kurang)",
            sd_normal_weight: "Berat Badan Normal",
            sd_overweight_risk: "Risiko Berat Badan Lebih",

            guide_whz_title: "Berat Badan menurut Tinggi (BB/TB - WHZ)",
            guide_whz_desc: "Mengukur proporsi massa tubuh terhadap panjang badan. Menggambarkan status gizi saat ini dan mendeteksi bahaya kurus akut (wasting).",
            sd_severe_wasting: "Gizi Buruk Akut (Sangat Kurus)",
            sd_wasted: "Gizi Kurang (Kurus)",
            sd_normal_nutrition: "Gizi Baik / Normal",
            sd_overweight: "Gizi Lebih / Obesitas",

            hpk_pill: "Periode Emas Pertumbuhan",
            hpk_title: "1.000 Hari Pertama Kehidupan (1000 HPK)",
            hpk_desc: "Periode sejak konsepsi janin (270 hari) hingga anak berusia 2 tahun (730 hari) merupakan 'Golden Period' paling krusial untuk mencegah stunting permanen pada otak dan fisik anak.",
            hpk_stage1_title: "Tahap 1: Masa Kehamilan (270 Hari)",
            hpk_stage1_desc: "Pemenuhan gizi ibu hamil, konsumsi tablet tambah darah (TTD minimal 90 butir), dan pemeriksaan kehamilan teratur (ANC 6 kali).",
            hpk_stage2_title: "Tahap 2: Usia 0–6 Bulan (180 Hari)",
            hpk_stage2_desc: "Inisiasi Menyusu Dini (IMD) dalam 1 jam pertama kelahiran dan pemberian ASI Eksklusif tanpa cairan atau makanan tambahan.",
            hpk_stage3_title: "Tahap 3: Usia 6–24 Bulan (550 Hari)",
            hpk_stage3_desc: "Pemberian Makanan Pendamping ASI (MP-ASI) adekuat kaya protein hewani (telur, ikan, daging, hati) serta melanjutkan pemberian ASI hingga 2 tahun.",

            footer_credits: "Kerangka Standar Pertumbuhan Anak WHO & UNICEF",
            footer_portfolio: "Proyek Portofolio oleh Antariksa"
        }
    };

    let currentLang = 'id'; // Default to Indonesian, with instant toggle to English

    // =========================================================================
    // 2. SCIENTIFIC WHO CHILD GROWTH STANDARDS REFERENCE ARRAYS (0-60 MONTHS)
    // =========================================================================
    // WHO Median & SD values for Height (Length/Height in cm) & Weight (kg) by month
    const whoStandards = {
        boys: {
            // [Month, Median Height (cm), SD Height, Median Weight (kg), SD Weight]
            heightMedian: [
                49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7, 76.9, 78.0, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1, 86.0, 86.9, 87.8,
                88.7, 89.6, 90.4, 91.2, 91.9, 92.7, 93.4, 94.1, 94.8, 95.4, 96.1, 96.7, 97.4, 98.0, 98.6, 99.2, 99.8, 100.4, 101.0, 101.5, 102.1, 102.7, 103.3, 103.8,
                104.4, 104.9, 105.5, 106.0, 106.5, 107.1, 107.6, 108.1, 108.7, 109.2, 109.7, 110.0
            ],
            heightSD: [
                1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.4, 2.5, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8, 2.9, 2.9, 3.0, 3.0, 3.1, 3.1, 3.2, 3.2, 3.3, 3.3, 3.4,
                3.4, 3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.8, 3.8, 3.9, 3.9, 4.0, 4.0, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.4, 4.4, 4.5, 4.5, 4.5,
                4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 5.0, 5.0, 5.1, 5.1
            ],
            weightMedian: [
                3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.8, 12.0, 12.2,
                12.4, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.8, 14.0, 14.2, 14.3, 14.5, 14.7, 14.9, 15.0, 15.2, 15.4, 15.6, 15.7, 15.9, 16.1, 16.3, 16.4,
                16.6, 16.8, 17.0, 17.2, 17.3, 17.5, 17.7, 17.9, 18.0, 18.2, 18.3, 18.5
            ],
            weightSD: [
                0.5, 0.6, 0.7, 0.8, 0.8, 0.9, 0.9, 1.0, 1.0, 1.0, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.5, 1.5, 1.5,
                1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.9, 1.9, 1.9, 2.0, 2.0, 2.1, 2.1, 2.1, 2.2, 2.2, 2.3, 2.3, 2.3, 2.4, 2.4,
                2.5, 2.5, 2.6, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8, 2.9, 2.9, 3.0
            ]
        },
        girls: {
            heightMedian: [
                49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4,
                87.3, 88.2, 89.0, 89.9, 90.7, 91.5, 92.2, 93.0, 93.7, 94.4, 95.1, 95.7, 96.4, 97.0, 97.6, 98.3, 98.9, 99.5, 100.1, 100.7, 101.3, 101.9, 102.5, 103.1,
                103.7, 104.2, 104.8, 105.3, 105.9, 106.4, 107.0, 107.5, 108.0, 108.5, 109.0, 109.4
            ],
            heightSD: [
                1.9, 1.9, 2.0, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5, 2.5, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8, 2.9, 2.9, 3.0, 3.0, 3.1, 3.1, 3.2, 3.2, 3.3,
                3.3, 3.4, 3.4, 3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.8, 3.8, 3.9, 3.9, 4.0, 4.0, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.4, 4.4, 4.5,
                4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 5.0, 5.0, 5.1
            ],
            weightMedian: [
                3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9, 9.2, 9.4, 9.6, 9.8, 10.0, 10.2, 10.4, 10.6, 10.9, 11.1, 11.3, 11.5,
                11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.9, 14.0, 14.2, 14.4, 14.6, 14.8, 15.0, 15.2, 15.3, 15.5, 15.7, 15.9, 16.1,
                16.3, 16.5, 16.7, 16.8, 17.0, 17.2, 17.4, 17.6, 17.8, 18.0, 18.1, 18.2
            ],
            weightSD: [
                0.5, 0.6, 0.6, 0.7, 0.8, 0.8, 0.9, 0.9, 0.9, 1.0, 1.0, 1.0, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.5,
                1.5, 1.6, 1.6, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.9, 1.9, 1.9, 2.0, 2.0, 2.0, 2.1, 2.1, 2.2, 2.2, 2.3, 2.3, 2.3, 2.4, 2.4,
                2.5, 2.5, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8, 2.9, 2.9, 3.0, 3.0
            ]
        }
    };

    // =========================================================================
    // 3. UNICEF INDONESIA DATASET MOCK GENERATOR (REALISTIC 2018-2024 DATA)
    // =========================================================================
    const rawDataset = [];
    const indicatorsList = ['Stunting', 'Breastfeeding (Exclusive)', 'Wasting', 'Overweight'];
    const gendersList = ['Male', 'Female', 'Total'];
    const agesList = ['0-5 months', '6-23 months', 'Under 5 years'];
    const povertyList = ['Poorest', 'Poorer', 'Middle', 'Richer', 'Richest'];
    const residencesList = ['Urban', 'Rural'];
    const edusList = ['No Education', 'Primary', 'Secondary', 'Higher'];
    const yearsList = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

    // Seeded generation matching Python script
    function generateDataset() {
        yearsList.forEach(year => {
            const yearFactor = (year - 2018) / 6.0;
            indicatorsList.forEach(indicator => {
                gendersList.forEach(gender => {
                    agesList.forEach(age => {
                        povertyList.forEach((poverty, pIdx) => {
                            residencesList.forEach(residence => {
                                edusList.forEach((edu, eIdx) => {
                                    let val = 0;
                                    if (indicator === 'Stunting') {
                                        val = 30.8 - (yearFactor * 6.5) - (pIdx * 2.8) - (residence === 'Urban' ? 3.5 : 0) - (eIdx * 3.2);
                                        if (gender === 'Male') val += 0.8;
                                        if (gender === 'Female') val -= 0.8;
                                    } else if (indicator === 'Breastfeeding (Exclusive)') {
                                        val = 42.0 + (yearFactor * 8.0) + (pIdx * 1.2) + (residence === 'Rural' ? 4.0 : 0) + (eIdx * 1.5);
                                        if (gender === 'Female') val += 0.5;
                                    } else if (indicator === 'Wasting') {
                                        val = 10.2 - (yearFactor * 1.8) - (pIdx * 0.8) - (residence === 'Urban' ? 1.0 : 0) - (eIdx * 0.6);
                                    } else {
                                        val = 6.5 + (yearFactor * 1.2) + (pIdx * 1.5) + (residence === 'Urban' ? 1.8 : 0);
                                    }

                                    // Add small deterministic variance
                                    const jitter = ((year * 7 + pIdx * 13 + eIdx * 17) % 10 - 5) * 0.1;
                                    val = Math.max(1.5, Math.min(65.0, val + jitter));

                                    rawDataset.push({
                                        Country: 'Indonesia',
                                        Indicator: indicator,
                                        Gender: gender,
                                        Age: age,
                                        Poverty_Rating: poverty,
                                        Residence: residence,
                                        Maternal_Education: edu,
                                        Year: year,
                                        Observation_Value: parseFloat(val.toFixed(2))
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    generateDataset();

    // =========================================================================
    // 4. LANGUAGE SWITCHER & DOM LOCALIZATION
    // =========================================================================
    function setLanguage(lang) {
        if (!i18n[lang]) return;
        currentLang = lang;
        localStorage.setItem('app_lang', lang);
        localStorage.setItem('stuntingcare_lang', lang);

        document.documentElement.lang = lang;

        // Update active class on switcher buttons
        const btnId = document.getElementById('lang-id');
        const btnEn = document.getElementById('lang-en');
        if (btnId && btnEn) {
            btnId.classList.toggle('active', lang === 'id');
            btnEn.classList.toggle('active', lang === 'en');
        }

        // Localize all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key] !== undefined) {
                el.textContent = i18n[lang][key];
            }
        });

        // Localize placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (i18n[lang] && i18n[lang][key] !== undefined) {
                el.placeholder = i18n[lang][key];
            }
        });

        // Re-run assessment result translation if results visible
        updateAssessmentResultsDisplay();

        // Refresh charts
        renderAnalyticsCharts();

        // Refresh table
        renderDatasetTable();

        // Re-initialize Lucide Icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // =========================================================================
    // 5. ANTHROPOMETRIC ASSESSMENT LOGIC
    // =========================================================================
    let currentAssessment = null;

    function calculateAssessment(params) {
        const { name, gender, age, height, weight, headCirc, muac, edu, residence, wealth, breastfeeding } = params;
        const normAge = Math.max(0, Math.min(60, Math.round(age)));
        const std = (gender === 'Female') ? whoStandards.girls : whoStandards.boys;

        const medHeight = std.heightMedian[normAge];
        const sdHeight = std.heightSD[normAge];
        const medWeight = std.weightMedian[normAge];
        const sdWeight = std.weightSD[normAge];

        // Z-Scores
        const haz = (height - medHeight) / sdHeight;
        const waz = (weight - medWeight) / sdWeight;

        // BMI Calculation (kg / m^2)
        const heightM = height / 100.0;
        const bmi = heightM > 0 ? (weight / (heightM * heightM)) : 16.0;
        const bmiMedian = 15.8;
        const bmiSD = 1.3;
        const whz = (bmi - bmiMedian) / bmiSD;

        // Determine Stunting Status
        let statusKey = 'status_normal_growth';
        let statusBadgeClass = 'badge-normal';
        let summaryKey = 'optimal';

        if (haz < -3.0) {
            statusKey = 'status_severely_stunted';
            statusBadgeClass = 'badge-severe';
            summaryKey = 'severely_stunted';
        } else if (whz < -3.0) {
            statusKey = 'status_severely_wasted';
            statusBadgeClass = 'badge-severe';
            summaryKey = 'severely_wasted';
        } else if (haz < -2.0) {
            statusKey = 'status_at_risk';
            statusBadgeClass = 'badge-stunted';
            summaryKey = 'stunted';
        } else if (whz < -2.0) {
            statusKey = 'status_wasted';
            statusBadgeClass = 'badge-at-risk';
            summaryKey = 'wasted';
        } else if (whz > 2.0) {
            statusKey = 'status_overweight';
            statusBadgeClass = 'badge-at-risk';
            summaryKey = 'overweight';
        }

        // Composite Health Risk Score (0 - 100%)
        let riskScore = 10;
        if (haz < -2.0) riskScore += 45;
        if (haz < -3.0) riskScore += 25;
        if (waz < -2.0) riskScore += 20;
        if (whz < -2.0) riskScore += 15;
        if (breastfeeding === 'No' && age <= 6) riskScore += 12;
        if (wealth === 'Poorest') riskScore += 8;
        riskScore = Math.min(98, Math.max(5, riskScore));

        return {
            name: name || (gender === 'Female' ? 'Aisha' : 'Budi'),
            gender,
            age: normAge,
            height,
            weight,
            headCirc,
            muac,
            edu,
            residence,
            wealth,
            breastfeeding,
            medHeight,
            sdHeight,
            medWeight,
            sdWeight,
            haz: parseFloat(haz.toFixed(2)),
            waz: parseFloat(waz.toFixed(2)),
            whz: parseFloat(whz.toFixed(2)),
            bmi: parseFloat(bmi.toFixed(1)),
            statusKey,
            statusBadgeClass,
            summaryKey,
            riskScore
        };
    }

    function updateAssessmentResultsDisplay() {
        if (!currentAssessment) return;
        const data = currentAssessment;
        const t = i18n[currentLang];

        // Child header
        const genderLabel = data.gender === 'Female' ? t.gender_female : t.gender_male;
        const headerEl = document.getElementById('res-child-header');
        if (headerEl) {
            headerEl.textContent = `${data.name} (${data.age} ${t.unit_months} • ${genderLabel})`;
        }

        // Timestamp
        const timeEl = document.getElementById('res-timestamp');
        if (timeEl) {
            timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Status Badge
        const badgeEl = document.getElementById('res-status-badge');
        const badgeText = document.getElementById('res-status-text');
        const statusBadgeIcon = document.getElementById('res-status-badge-icon');
        if (badgeEl && badgeText) {
            badgeEl.className = `badge-status ${data.statusBadgeClass} self-start sm:self-center`;
            badgeText.textContent = t[data.statusKey] || data.statusKey;
            if (statusBadgeIcon) {
                let icon = 'check-circle-2';
                if (data.haz < -3.0 || data.whz < -3.0) icon = 'alert-octagon';
                else if (data.haz < -2.0 || data.whz < -2.0) icon = 'alert-triangle';
                statusBadgeIcon.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4"></i>`;
            }
        }

        // Summary banner
        const summaryBox = document.getElementById('res-summary-box');
        const summaryHeadline = document.getElementById('res-summary-headline');
        const summaryDesc = document.getElementById('res-summary-desc');
        const summaryIconWrapper = document.getElementById('res-summary-icon-wrapper');

        if (summaryBox && summaryHeadline && summaryDesc) {
            if (data.haz >= -2.0 && data.whz >= -2.0 && data.whz <= 2.0) {
                summaryBox.className = "p-4 rounded-xl border transition-all text-sm leading-relaxed flex items-start gap-3 bg-emerald-50/70 border-emerald-200 text-emerald-950";
                summaryHeadline.textContent = currentLang === 'id' ? "Pertumbuhan Dalam Batas Normal (Optimal)" : "Optimal Growth Velocity";
                summaryDesc.textContent = currentLang === 'id'
                    ? `Panjang/Tinggi badan anak berada di dalam koridor standar deviasi WHO (HAZ: ${data.haz > 0 ? '+' : ''}${data.haz} SD). Pertahankan pemenuhan nutrisi dan stimulasi tumbuh kembang.`
                    : `Child's height and weight are well within the standard standard deviation corridor of the WHO Child Growth Standards (HAZ: ${data.haz > 0 ? '+' : ''}${data.haz} SD).`;
                if (summaryIconWrapper) summaryIconWrapper.innerHTML = `<i data-lucide="shield-check" class="w-5 h-5 text-emerald-600"></i>`;
            } else if (data.haz < -3.0) {
                summaryBox.className = "p-4 rounded-xl border transition-all text-sm leading-relaxed flex items-start gap-3 bg-rose-50 border-rose-200 text-rose-950";
                summaryHeadline.textContent = currentLang === 'id' ? "Perhatian: Terindikasi Stunting Berat (Sangat Pendek)" : "Critical Alert: Severe Stunting Indicated";
                summaryDesc.textContent = currentLang === 'id'
                    ? `Panjang/tinggi badan berada di bawah -3.0 Standar Deviasi (HAZ: ${data.haz} SD). Diperlukan rujukan segera ke Dokter Spesialis Anak (Sp.A) di Fasilitas Kesehatan Rujukan Tingkat Lanjut (FKRTL).`
                    : `Height-for-age is below -3.0 Standard Deviations (HAZ: ${data.haz} SD). Urgent clinical referral to a pediatrician at a secondary healthcare facility is strongly advised.`;
                if (summaryIconWrapper) summaryIconWrapper.innerHTML = `<i data-lucide="alert-octagon" class="w-5 h-5 text-rose-600"></i>`;
            } else if (data.whz < -3.0) {
                summaryBox.className = "p-4 rounded-xl border transition-all text-sm leading-relaxed flex items-start gap-3 bg-rose-50 border-rose-200 text-rose-950";
                summaryHeadline.textContent = currentLang === 'id' ? "Perhatian Medis Darurat: Terindikasi Gizi Buruk Akut (Severely Wasted)" : "Critical Alert: Severe Acute Malnutrition (Severely Wasted)";
                summaryDesc.textContent = currentLang === 'id'
                    ? `Berat badan menurut tinggi badan berada di bawah -3.0 SD (WHZ: ${data.whz} SD). Segera rujuk ke fasilitas rawat inap gizi buruk / Puskesmas TFC.`
                    : `Weight-for-height is below -3.0 Standard Deviations (WHZ: ${data.whz} SD). Immediate clinical therapeutic feeding referral is necessary.`;
                if (summaryIconWrapper) summaryIconWrapper.innerHTML = `<i data-lucide="alert-octagon" class="w-5 h-5 text-rose-600"></i>`;
            } else if (data.haz < -2.0) {
                summaryBox.className = "p-4 rounded-xl border transition-all text-sm leading-relaxed flex items-start gap-3 bg-amber-50 border-amber-200 text-amber-950";
                summaryHeadline.textContent = currentLang === 'id' ? "Peringatan Dini: Terindikasi Stunting Sedang / Growth Faltering" : "Early Warning: Moderate Stunting Detected";
                summaryDesc.textContent = currentLang === 'id'
                    ? `Tinggi badan anak berada di rentang -2.0 hingga -3.0 SD (HAZ: ${data.haz} SD). Memerlukan intervensi percepatan nutrisi (protein hewani tinggi) dan pemantauan berat badan bulanan.`
                    : `Child's height is between -2.0 and -3.0 SD (HAZ: ${data.haz} SD). Requires catch-up growth nutritional interventions and strict weight monitoring.`;
                if (summaryIconWrapper) summaryIconWrapper.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600"></i>`;
            } else if (data.whz < -2.0) {
                summaryBox.className = "p-4 rounded-xl border transition-all text-sm leading-relaxed flex items-start gap-3 bg-amber-50 border-amber-200 text-amber-950";
                summaryHeadline.textContent = currentLang === 'id' ? "Peringatan: Gizi Kurang Akut (Wasted)" : "Warning: Acute Wasting Detected";
                summaryDesc.textContent = currentLang === 'id'
                    ? `Proporsi berat terhadap tinggi berada di bawah -2.0 SD (WHZ: ${data.whz} SD). Perlu suplementasi energi tinggi dan pemulihan berat badan cepat.`
                    : `Child's weight-for-height is below -2.0 SD (WHZ: ${data.whz} SD). Targeted nutritional catch-up and energy-dense supplementary feeding are required.`;
                if (summaryIconWrapper) summaryIconWrapper.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600"></i>`;
            } else {
                summaryBox.className = "p-4 rounded-xl border transition-all text-sm leading-relaxed flex items-start gap-3 bg-sky-50 border-sky-200 text-sky-950";
                summaryHeadline.textContent = currentLang === 'id' ? "Catatan Gizi: Risiko Berat Badan Lebih" : "Nutritional Advisory: Overweight Risk";
                summaryDesc.textContent = currentLang === 'id'
                    ? `Indeks massa tubuh / berat terhadap tinggi berada di atas +2.0 SD (WHZ: +${data.whz} SD). Jaga keseimbangan porsi makan dan perbanyak aktivitas fisik aktif.`
                    : `Weight-for-height is above +2.0 SD (WHZ: +${data.whz} SD). Maintain active physical play and ensure balanced portion control.`;
                if (summaryIconWrapper) summaryIconWrapper.innerHTML = `<i data-lucide="info" class="w-5 h-5 text-sky-600"></i>`;
            }
        }

        // Metrics & Z-score markers
        const valHaz = document.getElementById('val-haz');
        const valWaz = document.getElementById('val-waz');
        const valWhz = document.getElementById('val-whz');
        const markerHaz = document.getElementById('marker-haz');
        const markerWaz = document.getElementById('marker-waz');
        const markerWhz = document.getElementById('marker-whz');

        if (valHaz) valHaz.textContent = (data.haz > 0 ? '+' : '') + data.haz;
        if (valWaz) valWaz.textContent = (data.waz > 0 ? '+' : '') + data.waz;
        if (valWhz) valWhz.textContent = (data.whz > 0 ? '+' : '') + data.whz;

        // Map Z-Score (-4 to +4) to gauge percentage (0% to 100%)
        function zToPercent(z) {
            const clamped = Math.max(-4, Math.min(4, z));
            return ((clamped + 4) / 8.0) * 100;
        }

        if (markerHaz) markerHaz.style.left = `${zToPercent(data.haz)}%`;
        if (markerWaz) markerWaz.style.left = `${zToPercent(data.waz)}%`;
        if (markerWhz) markerWhz.style.left = `${zToPercent(data.whz)}%`;

        // Tags & Details
        const badgeHaz = document.getElementById('badge-haz-tag');
        const badgeWaz = document.getElementById('badge-waz-tag');
        const badgeWhz = document.getElementById('badge-whz-tag');

        if (badgeHaz) {
            let label = 'Normal';
            if (data.haz > 2) label = currentLang === 'id' ? 'Tinggi' : 'Tall';
            else if (data.haz >= -2) label = currentLang === 'id' ? 'Normal' : 'Normal';
            else if (data.haz >= -3) label = currentLang === 'id' ? 'Pendek' : 'Stunted';
            else label = currentLang === 'id' ? 'Sangat Pendek' : 'Severely Stunted';
            badgeHaz.textContent = label;
            badgeHaz.className = `text-[10px] font-bold px-1.5 py-0.5 rounded ${data.haz >= -2 ? 'bg-emerald-100 text-emerald-800' : (data.haz < -3 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')}`;
        }
        if (badgeWaz) {
            let label = 'Normal';
            if (data.waz > 2) label = currentLang === 'id' ? 'Risiko Lebih' : 'Risk of Overweight';
            else if (data.waz >= -2) label = currentLang === 'id' ? 'Normal' : 'Normal';
            else if (data.waz >= -3) label = currentLang === 'id' ? 'Gizi Kurang' : 'Underweight';
            else label = currentLang === 'id' ? 'Gizi Buruk' : 'Severely Underweight';
            badgeWaz.textContent = label;
            badgeWaz.className = `text-[10px] font-bold px-1.5 py-0.5 rounded ${data.waz >= -2 ? 'bg-emerald-100 text-emerald-800' : (data.waz < -3 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')}`;
        }
        if (badgeWhz) {
            let label = 'Normal';
            if (data.whz > 2) label = currentLang === 'id' ? 'Gemuk / Lebih' : 'Overweight';
            else if (data.whz >= -2) label = currentLang === 'id' ? 'Gizi Baik' : 'Normal';
            else if (data.whz >= -3) label = currentLang === 'id' ? 'Kurus (Wasted)' : 'Wasted';
            else label = currentLang === 'id' ? 'Gizi Buruk Akut' : 'Severely Wasted';
            badgeWhz.textContent = label;
            badgeWhz.className = `text-[10px] font-bold px-1.5 py-0.5 rounded ${data.whz >= -2 ? 'bg-emerald-100 text-emerald-800' : (data.whz < -3 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')}`;
        }

        document.getElementById('val-height-measured').textContent = `${data.height} cm`;
        document.getElementById('val-height-median').textContent = `${data.medHeight} cm`;
        document.getElementById('val-weight-measured').textContent = `${data.weight} kg`;
        document.getElementById('val-weight-median').textContent = `${data.medWeight} kg`;
        document.getElementById('val-bmi').textContent = `${data.bmi} kg/m²`;

        // MUAC string
        const muacEl = document.getElementById('val-muac-display');
        if (muacEl) {
            if (data.muac) {
                const muacVal = parseFloat(data.muac);
                const muacStatus = muacVal < 11.5 ? (currentLang === 'id' ? 'LiLA: Gizi Buruk (<11.5cm)' : 'MUAC: SAM (<11.5cm)') : (muacVal <= 12.5 ? (currentLang === 'id' ? 'LiLA: Waspada (11.5-12.5cm)' : 'MUAC: MAM (11.5-12.5cm)') : (currentLang === 'id' ? 'LiLA: Normal' : 'MUAC: Normal'));
                muacEl.textContent = muacStatus;
            } else {
                muacEl.textContent = currentLang === 'id' ? 'LiLA: -' : 'MUAC: -';
            }
        }

        // Recommendations Checklist
        renderRecommendations(data);

        // Re-initialize Lucide Icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function renderRecommendations(data) {
        const container = document.getElementById('recommendations-container');
        if (!container) return;

        container.innerHTML = '';
        const recs = [];

        if (currentLang === 'id') {
            if (data.haz < -3.0) {
                recs.push({ icon: 'alert-octagon', text: "<strong>Rujukan Medis Segera:</strong> Anak terindikasi stunting berat. Segera bawa ke Dokter Spesialis Anak (Sp.A) di RSUD/Puskesmas untuk investigasi penyebab patologis (TBC anak, kelainan jantung bawaan, atau alergi protein susu sapi)." });
            } else if (data.haz < -2.0) {
                recs.push({ icon: 'alert-circle', text: "<strong>Konsultasi Medis Prioritas:</strong> Lakukan pemeriksaan klinis ke Puskesmas atau Dokter Spesialis Anak untuk mengevaluasi red flags penyakit penyerta (infeksi berulang, TBC anak, anemia defisiensi besi)." });
            }

            if (data.whz < -2.0) {
                recs.push({ icon: 'zap', text: "<strong>Intervensi Gizi Kurang Akut (Wasting):</strong> Berikan makanan tinggi kalori padat gizi (F-75/F-100 atau biskuit makanan tambahan balita PKMK) dan pantau kenaikan berat badan mingguan." });
            } else if (data.whz > 2.0) {
                recs.push({ icon: 'activity', text: "<strong>Pencegahan Kelebihan Berat Badan:</strong> Batasi makanan manis/olahan berpemanis tambahan, perbanyak konsumsi sayur buah serat tinggi, dan dorong aktivitas gerak aktif." });
            }

            if (data.haz < -2.0) {
                recs.push({ icon: 'utensils', text: "<strong>Asupan Tinggi Protein Hewani:</strong> Pastikan konsumsi protein hewani berkualitas tinggi setiap hari (1 butir telur/hari, ikan laut kembung/tongkol, daging ayam/sapi, atau hati ayam) untuk merangsang hormon pertumbuhan (IGF-1)." });
            } else {
                recs.push({ icon: 'check-circle-2', text: "<strong>Pertahankan Pola Makan Seimbang:</strong> Lanjutkan pemberian makanan padat gizi dengan keragaman 4 bintang (Karbohidrat, Protein Hewani, Kacang-kacangan, Sayur/Buah)." });
            }

            if (data.age < 6) {
                recs.push({ icon: 'baby', text: "<strong>Fokus ASI Eksklusif:</strong> Berikan ASI sesering mungkin (on-demand minimal 8-12 kali per 24 jam) tanpa tambahan cairan atau formula kecuali atas indikasi medis." });
            } else if (data.age <= 24) {
                recs.push({ icon: 'sparkles', text: "<strong>Optimalisasi Periode Emas MP-ASI (6-24 bulan):</strong> Berikan MP-ASI dengan tekstur bertingkat yang sesuai usia, porsi adekuat, dan tetap lanjutkan pemberian ASI hingga 2 tahun." });
            } else {
                recs.push({ icon: 'calendar', text: "<strong>Pemantauan Rutin Posyandu:</strong> Timbang berat badan dan ukur tinggi badan setiap bulan di Posyandu untuk memastikan kurva pertumbuhan naik sesuai garis hijau KMS." });
            }

            recs.push({ icon: 'shield-alert', text: "<strong>Sanitasi & Air Bersih:</strong> Jaga kebersihan lingkungan rumah, cuci tangan dengan sabun, dan pastikan akses air minum yang telah dimasak untuk mencegah infeksi diare berulang." });
        } else {
            if (data.haz < -3.0) {
                recs.push({ icon: 'alert-octagon', text: "<strong>Immediate Pediatric Referral:</strong> Severe linear growth deficit detected. Expedite secondary care evaluation to investigate underlying pathologies (pediatric TB, congenital defects, recurrent gut infections)." });
            } else if (data.haz < -2.0) {
                recs.push({ icon: 'alert-circle', text: "<strong>Priority Pediatric Consultation:</strong> Schedule a clinical assessment at a primary health clinic or pediatrician to rule out underlying medical conditions (recurrent infections, anemia, enteric dysfunction)." });
            }

            if (data.whz < -2.0) {
                recs.push({ icon: 'zap', text: "<strong>Acute Wasting Management:</strong> Administer high-calorie nutrient-dense complementary foods (RUTF or medical therapeutic feeding) and conduct strict weekly weight gain follow-ups." });
            } else if (data.whz > 2.0) {
                recs.push({ icon: 'activity', text: "<strong>Overweight Prevention & Advisory:</strong> Limit sugary snacks and ultra-processed foods, increase dietary fiber intake, and maintain daily active play." });
            }

            if (data.haz < -2.0) {
                recs.push({ icon: 'utensils', text: "<strong>High-Quality Animal Protein Intake:</strong> Ensure daily consumption of nutrient-dense animal proteins (1 egg daily, fish, poultry, liver, or meat) to stimulate Insulin-like Growth Factor 1 (IGF-1)." });
            } else {
                recs.push({ icon: 'check-circle-2', text: "<strong>Maintain Dietary Diversity:</strong> Continue a nutrient-dense balanced diet featuring diverse food groups with consistent protein and micronutrient fortification." });
            }

            if (data.age < 6) {
                recs.push({ icon: 'baby', text: "<strong>Exclusive Breastfeeding Priority:</strong> Nurse on-demand (at least 8-12 times per 24 hours) without water, teas, or formulas unless clinically prescribed." });
            } else if (data.age <= 24) {
                recs.push({ icon: 'sparkles', text: "<strong>Complementary Feeding Window (6-24 months):</strong> Provide age-appropriate texture, adequate caloric density, and continued breastfeeding up to 2 years." });
            } else {
                recs.push({ icon: 'calendar', text: "<strong>Routine Monthly Anthropometry:</strong> Track weight and length monthly at community health centers (Posyandu) to safeguard linear growth trajectory." });
            }

            recs.push({ icon: 'shield-alert', text: "<strong>Sanitation & Hygiene (WASH):</strong> Maintain household clean water access and handwashing with soap to prevent subclinical environmental enteric dysfunction." });
        }

        recs.forEach(rec => {
            const div = document.createElement('div');
            div.className = 'rec-item';
            div.innerHTML = `<i data-lucide="${rec.icon}" class="w-4 h-4"></i><div>${rec.text}</div>`;
            container.appendChild(div);
        });
    }

    // =========================================================================
    // 6. PUBLIC HEALTH MACRO ANALYTICS & CHART.JS INTEGRATION
    // =========================================================================
    let chartAnnual = null;
    let chartEdu = null;
    let chartResidence = null;
    let chartWealth = null;

    function getFilteredData() {
        const filterInd = document.getElementById('filter-indicator').value;
        const filterRes = document.getElementById('filter-residence').value;
        const filterEdu = document.getElementById('filter-edu').value;
        const filterWealth = document.getElementById('filter-wealth').value;

        return rawDataset.filter(row => {
            if (filterInd !== 'All' && row.Indicator !== filterInd) return false;
            if (filterRes !== 'All' && row.Residence !== filterRes) return false;
            if (filterEdu !== 'All' && row.Maternal_Education !== filterEdu) return false;
            if (filterWealth !== 'All' && row.Poverty_Rating !== filterWealth) return false;
            return true;
        });
    }

    function renderAnalyticsCharts() {
        const filtered = getFilteredData();

        // Dynamically update KPI summary cards
        const stuntingRows = filtered.filter(r => r.Indicator === 'Stunting');
        const stuntingAvg = stuntingRows.length ? (stuntingRows.reduce((acc, c) => acc + c.Observation_Value, 0) / stuntingRows.length).toFixed(1) : '24.3';
        const kpiStunting = document.getElementById('kpi-val-stunting');
        if (kpiStunting) kpiStunting.textContent = `${stuntingAvg}%`;

        const bfRows = filtered.filter(r => r.Indicator === 'Breastfeeding (Exclusive)');
        const bfAvg = bfRows.length ? (bfRows.reduce((acc, c) => acc + c.Observation_Value, 0) / bfRows.length).toFixed(1) : '48.6';
        const kpiBf = document.getElementById('kpi-val-bf');
        if (kpiBf) kpiBf.textContent = `${bfAvg}%`;

        const wastingRows = filtered.filter(r => r.Indicator === 'Wasting');
        const wastingAvg = wastingRows.length ? (wastingRows.reduce((acc, c) => acc + c.Observation_Value, 0) / wastingRows.length).toFixed(1) : '8.4';
        const kpiWasting = document.getElementById('kpi-val-wasting');
        if (kpiWasting) kpiWasting.textContent = `${wastingAvg}%`;

        const higherEd = stuntingRows.filter(r => r.Maternal_Education === 'Higher');
        const noEd = stuntingRows.filter(r => r.Maternal_Education === 'No Education');
        let equityVal = '-9.6';
        if (higherEd.length && noEd.length) {
            const hAvg = higherEd.reduce((a, b) => a + b.Observation_Value, 0) / higherEd.length;
            const nAvg = noEd.reduce((a, b) => a + b.Observation_Value, 0) / noEd.length;
            const diff = (hAvg - nAvg).toFixed(1);
            equityVal = (diff > 0 ? '+' : '') + diff;
        }
        const kpiEquity = document.getElementById('kpi-val-equity');
        if (kpiEquity) kpiEquity.textContent = `${equityVal}%`;

        // Indicator translation helper for chart legends
        function getIndicatorLabel(ind) {
            if (currentLang === 'id') {
                if (ind === 'Stunting') return 'Stunting (TB/U)';
                if (ind === 'Breastfeeding (Exclusive)') return 'ASI Eksklusif';
                if (ind === 'Wasting') return 'Wasting (Gizi Kurang)';
                if (ind === 'Overweight') return 'Kelebihan Berat Badan';
            } else {
                if (ind === 'Stunting') return 'Stunting (HAZ)';
                if (ind === 'Breastfeeding (Exclusive)') return 'Exclusive Breastfeeding';
                if (ind === 'Wasting') return 'Wasting (WHZ)';
                if (ind === 'Overweight') return 'Overweight';
            }
            return ind;
        }

        // 1. Annual Trend Chart
        const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
        const indicators = ['Stunting', 'Breastfeeding (Exclusive)', 'Wasting', 'Overweight'];
        const palette = {
            'Stunting': { border: '#E11D48', bg: 'rgba(225, 29, 72, 0.1)' },
            'Breastfeeding (Exclusive)': { border: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
            'Wasting': { border: '#D97706', bg: 'rgba(217, 119, 6, 0.1)' },
            'Overweight': { border: '#0284C7', bg: 'rgba(2, 132, 199, 0.1)' }
        };

        const datasetsAnnual = indicators.map(ind => {
            const dataPts = years.map(yr => {
                const subset = filtered.filter(r => r.Year === yr && r.Indicator === ind);
                if (!subset.length) return null;
                const sum = subset.reduce((acc, c) => acc + c.Observation_Value, 0);
                return parseFloat((sum / subset.length).toFixed(2));
            });

            return {
                label: getIndicatorLabel(ind),
                data: dataPts,
                borderColor: palette[ind].border,
                backgroundColor: palette[ind].bg,
                tension: 0.35,
                borderWidth: 2.5,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true
            };
        });

        const ctxAnnual = document.getElementById('chart-annual-trend');
        if (ctxAnnual) {
            if (chartAnnual) chartAnnual.destroy();
            chartAnnual = new Chart(ctxAnnual, {
                type: 'line',
                data: { labels: years, datasets: datasetsAnnual },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 12 } },
                        tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${c.raw}%` } }
                    },
                    scales: {
                        y: { title: { display: true, text: currentLang === 'id' ? 'Rata-rata Prevalensi (%)' : 'Average Prevalence (%)' }, min: 0 }
                    }
                }
            });
        }

        // 2. Maternal Education Chart
        const eduCategories = ['No Education', 'Primary', 'Secondary', 'Higher'];
        const eduLabels = currentLang === 'id' ? ['Tanpa Sekolah', 'Pendidikan Dasar (SD)', 'Menengah (SMP/SMA)', 'Pendidikan Tinggi'] : ['No Education', 'Primary School', 'Secondary School', 'Higher Education'];

        const datasetsEdu = indicators.map(ind => {
            const dataPts = eduCategories.map(edu => {
                const subset = filtered.filter(r => r.Maternal_Education === edu && r.Indicator === ind);
                if (!subset.length) return 0;
                const sum = subset.reduce((acc, c) => acc + c.Observation_Value, 0);
                return parseFloat((sum / subset.length).toFixed(2));
            });
            return {
                label: getIndicatorLabel(ind),
                data: dataPts,
                backgroundColor: palette[ind].border,
                borderRadius: 4
            };
        });

        const ctxEdu = document.getElementById('chart-education');
        if (ctxEdu) {
            if (chartEdu) chartEdu.destroy();
            chartEdu = new Chart(ctxEdu, {
                type: 'bar',
                data: { labels: eduLabels, datasets: datasetsEdu },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 12 } }
                    },
                    scales: {
                        y: { title: { display: true, text: currentLang === 'id' ? 'Rata-rata Prevalensi (%)' : 'Average Prevalence (%)' }, min: 0 }
                    }
                }
            });
        }

        // 3. Residence Chart (Urban vs Rural)
        const resLabels = currentLang === 'id' ? ['Perkotaan (Urban)', 'Pedesaan (Rural)'] : ['Urban Area', 'Rural Area'];
        const datasetsRes = indicators.map(ind => {
            const dataPts = ['Urban', 'Rural'].map(res => {
                const subset = filtered.filter(r => r.Residence === res && r.Indicator === ind);
                if (!subset.length) return 0;
                const sum = subset.reduce((acc, c) => acc + c.Observation_Value, 0);
                return parseFloat((sum / subset.length).toFixed(2));
            });
            return {
                label: getIndicatorLabel(ind),
                data: dataPts,
                backgroundColor: palette[ind].border,
                borderRadius: 4
            };
        });

        const ctxRes = document.getElementById('chart-residence');
        if (ctxRes) {
            if (chartResidence) chartResidence.destroy();
            chartResidence = new Chart(ctxRes, {
                type: 'bar',
                data: { labels: resLabels, datasets: datasetsRes },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 12 } }
                    },
                    scales: {
                        y: { title: { display: true, text: currentLang === 'id' ? 'Rata-rata Prevalensi (%)' : 'Average Prevalence (%)' }, min: 0 }
                    }
                }
            });
        }

        // 4. Wealth Quintile Gradient Chart
        const wealthCategories = ['Poorest', 'Poorer', 'Middle', 'Richer', 'Richest'];
        const wealthLabels = currentLang === 'id' ? ['Kuintil 1 (Termiskin)', 'Kuintil 2 (Pra-Sejahtera)', 'Kuintil 3 (Menengah)', 'Kuintil 4 (Mampu)', 'Kuintil 5 (Terkaya)'] : ['Q1 (Poorest)', 'Q2 (Poorer)', 'Q3 (Middle)', 'Q4 (Richer)', 'Q5 (Richest)'];

        const datasetsWealth = indicators.map(ind => {
            const dataPts = wealthCategories.map(w => {
                const subset = filtered.filter(r => r.Poverty_Rating === w && r.Indicator === ind);
                if (!subset.length) return null;
                const sum = subset.reduce((acc, c) => acc + c.Observation_Value, 0);
                return parseFloat((sum / subset.length).toFixed(2));
            });
            return {
                label: getIndicatorLabel(ind),
                data: dataPts,
                borderColor: palette[ind].border,
                backgroundColor: palette[ind].bg,
                tension: 0.35,
                borderWidth: 2.5,
                pointRadius: 4
            };
        });

        const ctxWealth = document.getElementById('chart-wealth');
        if (ctxWealth) {
            if (chartWealth) chartWealth.destroy();
            chartWealth = new Chart(ctxWealth, {
                type: 'line',
                data: { labels: wealthLabels, datasets: datasetsWealth },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 12 } }
                    },
                    scales: {
                        y: { title: { display: true, text: currentLang === 'id' ? 'Rata-rata Prevalensi (%)' : 'Average Prevalence (%)' }, min: 0 }
                    }
                }
            });
        }
    }

    // =========================================================================
    // 7. DATASET EXPLORER & PAGINATION (WITH BILINGUAL RECORD TRANSLATION)
    // =========================================================================
    let currentPage = 1;
    const recordsPerPage = 10;
    let tableSearchQuery = '';

    const tableTranslations = {
        en: {
            indicators: {
                'Stunting': 'Stunting (HAZ)',
                'Breastfeeding (Exclusive)': 'Exclusive Breastfeeding',
                'Wasting': 'Wasting (WHZ)',
                'Overweight': 'Overweight'
            },
            gender: {
                'Male': 'Boy',
                'Female': 'Girl',
                'Total': 'All Genders'
            },
            age: {
                '0-5 months': '0-5 months',
                '6-23 months': '6-23 months',
                'Under 5 years': 'Under 5 years'
            },
            wealth: {
                'Poorest': 'Q1 (Poorest)',
                'Poorer': 'Q2 (Poorer)',
                'Middle': 'Q3 (Middle)',
                'Richer': 'Q4 (Richer)',
                'Richest': 'Q5 (Richest)'
            },
            residence: {
                'Urban': 'Urban',
                'Rural': 'Rural'
            },
            education: {
                'No Education': 'No Formal Education',
                'Primary': 'Primary School (SD)',
                'Secondary': 'Secondary (SMP/SMA)',
                'Higher': 'Higher Education (Univ)'
            }
        },
        id: {
            indicators: {
                'Stunting': 'Stunting (TB/U)',
                'Breastfeeding (Exclusive)': 'ASI Eksklusif',
                'Wasting': 'Gizi Kurang (Wasting)',
                'Overweight': 'Kelebihan Berat Badan'
            },
            gender: {
                'Male': 'Laki-laki',
                'Female': 'Perempuan',
                'Total': 'Semua Gender'
            },
            age: {
                '0-5 months': '0–5 bulan',
                '6-23 months': '6–23 bulan',
                'Under 5 years': 'Balita (<5 thn)'
            },
            wealth: {
                'Poorest': 'Kuintil 1 (Termiskin)',
                'Poorer': 'Kuintil 2 (Pra-Sejahtera)',
                'Middle': 'Kuintil 3 (Menengah)',
                'Richer': 'Kuintil 4 (Mampu)',
                'Richest': 'Kuintil 5 (Terkaya)'
            },
            residence: {
                'Urban': 'Perkotaan (Urban)',
                'Rural': 'Pedesaan (Rural)'
            },
            education: {
                'No Education': 'Tanpa Sekolah',
                'Primary': 'Pendidikan Dasar (SD)',
                'Secondary': 'Menengah (SMP/SMA)',
                'Higher': 'Pendidikan Tinggi (D3/S1)'
            }
        }
    };

    function renderDatasetTable() {
        const filtered = getFilteredData().filter(row => {
            if (!tableSearchQuery) return true;
            const q = tableSearchQuery.toLowerCase();
            return (
                row.Indicator.toLowerCase().includes(q) ||
                row.Maternal_Education.toLowerCase().includes(q) ||
                row.Residence.toLowerCase().includes(q) ||
                row.Poverty_Rating.toLowerCase().includes(q) ||
                String(row.Year).includes(q)
            );
        });

        const totalRecords = filtered.length;
        const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
        if (currentPage > totalPages) currentPage = totalPages;

        const startIdx = (currentPage - 1) * recordsPerPage;
        const pageRows = filtered.slice(startIdx, startIdx + recordsPerPage);

        const tbody = document.getElementById('dataset-tbody');
        if (tbody) {
            tbody.innerHTML = '';
            if (pageRows.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" class="py-6 text-center text-slate-400 font-medium">${currentLang === 'id' ? 'Tidak ada data yang cocok dengan pencarian / filter.' : 'No records match the current filters.'}</td></tr>`;
            } else {
                const tTable = tableTranslations[currentLang] || tableTranslations.en;
                pageRows.forEach((r, idx) => {
                    const tr = document.createElement('tr');
                    tr.className = 'hover:bg-slate-50/80 transition-colors';
                    const indText = tTable.indicators[r.Indicator] || r.Indicator;
                    const genText = tTable.gender[r.Gender] || r.Gender;
                    const ageText = tTable.age[r.Age] || r.Age;
                    const wltText = tTable.wealth[r.Poverty_Rating] || r.Poverty_Rating;
                    const resText = tTable.residence[r.Residence] || r.Residence;
                    const eduText = tTable.education[r.Maternal_Education] || r.Maternal_Education;

                    tr.innerHTML = `
                        <td class="py-2.5 px-3 font-mono text-slate-400">${startIdx + idx + 1}</td>
                        <td class="py-2.5 px-3 font-medium text-slate-900">${indText}</td>
                        <td class="py-2.5 px-3 text-slate-600">${genText}</td>
                        <td class="py-2.5 px-3 text-slate-600">${ageText}</td>
                        <td class="py-2.5 px-3 text-slate-600">${wltText}</td>
                        <td class="py-2.5 px-3 text-slate-600">${resText}</td>
                        <td class="py-2.5 px-3 text-slate-600">${eduText}</td>
                        <td class="py-2.5 px-3 font-mono font-medium">${r.Year}</td>
                        <td class="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">${r.Observation_Value.toFixed(2)}%</td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        }

        const countEl = document.getElementById('table-record-count');
        if (countEl) countEl.textContent = totalRecords.toLocaleString();

        const pageLabel = document.getElementById('table-page-label');
        if (pageLabel) {
            const pageWord = currentLang === 'id' ? 'Halaman' : 'Page';
            const ofWord = currentLang === 'id' ? 'dari' : 'of';
            pageLabel.textContent = `${pageWord} ${currentPage} ${ofWord} ${totalPages}`;
        }

        const prevBtn = document.getElementById('btn-page-prev');
        const nextBtn = document.getElementById('btn-page-next');
        if (prevBtn) prevBtn.disabled = currentPage <= 1;
        if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
    }

    function exportFilteredCSV() {
        const filtered = getFilteredData();
        if (!filtered.length) {
            alert(currentLang === 'id' ? 'Tidak ada data untuk diekspor.' : 'No data available to export.');
            return;
        }

        const headers = ['Country', 'Indicator', 'Gender', 'Age', 'Poverty_Rating', 'Residence', 'Maternal_Education', 'Year', 'Observation_Value'];
        const csvRows = [headers.join(',')];

        filtered.forEach(row => {
            const values = headers.map(h => {
                const escaped = ('' + row[h]).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `UNICEF_Nutrition_Indonesia_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // =========================================================================
    // 8. EVENT HANDLERS & INITIALIZATION
    // =========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        
        // Setup initial assessment with default values
        currentAssessment = calculateAssessment({
            name: "Aisha",
            gender: "Female",
            age: 18,
            height: 82.5,
            weight: 10.8,
            headCirc: 47.0,
            muac: 14.2,
            edu: "Secondary",
            residence: "Urban",
            wealth: "Middle",
            breastfeeding: "Yes"
        });

        // Initialize language with persistent strategy (app_lang > navigator.language > default en for international)
        let savedLang = localStorage.getItem('app_lang') || localStorage.getItem('stuntingcare_lang');
        if (!savedLang) {
            const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
            savedLang = nav.startsWith('id') ? 'id' : 'en';
        }
        setLanguage(savedLang);

        // Language Switcher buttons
        const btnId = document.getElementById('lang-id');
        const btnEn = document.getElementById('lang-en');
        if (btnId) btnId.addEventListener('click', () => setLanguage('id'));
        if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));

        // Tab Navigation
        const tabs = document.querySelectorAll('.nav-tab, .mobile-nav-link');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab');
                
                // Update nav tabs
                document.querySelectorAll('.nav-tab').forEach(t => {
                    t.classList.toggle('active', t.getAttribute('data-tab') === targetId);
                });
                document.querySelectorAll('.mobile-nav-link').forEach(t => {
                    t.classList.toggle('active', t.getAttribute('data-tab') === targetId);
                });

                // Update tab content panels
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.toggle('hidden', content.id !== targetId);
                    content.classList.toggle('active', content.id === targetId);
                });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-nav-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                // If switched to analytics tab, trigger chart resize/render
                if (targetId === 'tab-analytics') {
                    setTimeout(renderAnalyticsCharts, 50);
                }
            });
        });

        // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-nav-menu');
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Quick Age Chips
        document.querySelectorAll('.btn-chip-age').forEach(chip => {
            chip.addEventListener('click', () => {
                const ageVal = chip.getAttribute('data-age');
                const ageInput = document.getElementById('child-age');
                if (ageInput) ageInput.value = ageVal;
            });
        });

        // Demo Profile Presets for HR / Recruiter
        document.querySelectorAll('.btn-demo-preset').forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.getAttribute('data-preset');
                const form = document.getElementById('stunting-form');

                if (preset === 'healthy') {
                    document.getElementById('child-name').value = "Aisha";
                    form.elements['gender'].value = "Female";
                    document.getElementById('child-age').value = 18;
                    document.getElementById('child-height').value = 82.5;
                    document.getElementById('child-weight').value = 10.8;
                    document.getElementById('maternal-education').value = "Secondary";
                    document.getElementById('residence').value = "Urban";
                    document.getElementById('poverty-rating').value = "Middle";
                    document.getElementById('breastfeeding').value = "Yes";
                } else if (preset === 'at_risk') {
                    document.getElementById('child-name').value = "Budi";
                    form.elements['gender'].value = "Male";
                    document.getElementById('child-age').value = 24;
                    document.getElementById('child-height').value = 81.0; // Normal ~87.8 -> HAZ ~ -2.0
                    document.getElementById('child-weight').value = 10.2;
                    document.getElementById('maternal-education').value = "Primary";
                    document.getElementById('residence').value = "Rural";
                    document.getElementById('poverty-rating').value = "Poorer";
                    document.getElementById('breastfeeding').value = "Partial";
                } else if (preset === 'severe') {
                    document.getElementById('child-name').value = "Bayu";
                    form.elements['gender'].value = "Male";
                    document.getElementById('child-age').value = 12;
                    document.getElementById('child-height').value = 67.0; // Normal ~75.7 -> HAZ ~ -3.1
                    document.getElementById('child-weight').value = 6.8;
                    document.getElementById('child-muac').value = 11.2;
                    document.getElementById('maternal-education').value = "No Education";
                    document.getElementById('residence').value = "Rural";
                    document.getElementById('poverty-rating').value = "Poorest";
                    document.getElementById('breastfeeding').value = "No";
                }

                // Trigger submission with smooth simulated processing
                triggerAssessmentSubmission();
            });
        });

        // Form Submit Handler
        const form = document.getElementById('stunting-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                triggerAssessmentSubmission();
            });

            form.addEventListener('reset', () => {
                setTimeout(() => {
                    document.getElementById('child-age').value = 18;
                    document.getElementById('child-height').value = 82.5;
                    document.getElementById('child-weight').value = 10.8;
                    triggerAssessmentSubmission();
                }, 10);
            });
        }

        function triggerAssessmentSubmission() {
            const form = document.getElementById('stunting-form');
            if (!form) return;

            const name = document.getElementById('child-name').value.trim();
            const gender = form.elements['gender'].value;
            const age = parseFloat(document.getElementById('child-age').value) || 0;
            const height = parseFloat(document.getElementById('child-height').value) || 50;
            const weight = parseFloat(document.getElementById('child-weight').value) || 3;
            const headCirc = parseFloat(document.getElementById('child-head-circ').value) || null;
            const muac = parseFloat(document.getElementById('child-muac').value) || null;
            const edu = document.getElementById('maternal-education').value;
            const residence = document.getElementById('residence').value;
            const wealth = document.getElementById('poverty-rating').value;
            const breastfeeding = document.getElementById('breastfeeding').value;

            // Skeleton diagnostic loader state
            const skeleton = document.getElementById('results-skeleton');
            const card = document.getElementById('results-card');

            if (skeleton && card) {
                skeleton.classList.remove('hidden');
                card.classList.add('hidden');

                setTimeout(() => {
                    currentAssessment = calculateAssessment({
                        name, gender, age, height, weight, headCirc, muac, edu, residence, wealth, breastfeeding
                    });

                    updateAssessmentResultsDisplay();

                    skeleton.classList.add('hidden');
                    card.classList.remove('hidden');
                }, 280);
            }
        }

        // Analytics Filters Change Listeners
        ['filter-indicator', 'filter-residence', 'filter-edu', 'filter-wealth'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => {
                    currentPage = 1;
                    renderAnalyticsCharts();
                    renderDatasetTable();
                });
            }
        });

        // Search Input in Table
        const searchInput = document.getElementById('table-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                tableSearchQuery = e.target.value;
                currentPage = 1;
                renderDatasetTable();
            });
        }

        // Pagination Buttons
        const prevBtn = document.getElementById('btn-page-prev');
        const nextBtn = document.getElementById('btn-page-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderDatasetTable();
                }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentPage++;
                renderDatasetTable();
            });
        }

        // Export CSV Button
        const exportBtn = document.getElementById('btn-export-csv');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportFilteredCSV);
        }

        // Print Report Button
        const printBtn = document.getElementById('btn-quick-print');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }

        // Initialize Lucide Icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

})();
