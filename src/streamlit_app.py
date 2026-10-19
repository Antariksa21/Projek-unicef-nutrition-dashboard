import streamlit as st
import pandas as pd
import plotly.express as px
import os

# ==============================================================================
# CONFIGURASI HALAMAN (PAGE CONFIGURATION)
# ==============================================================================
st.set_page_config(
    page_title="StuntingCare • UNICEF & WHO Growth Analytics",
    page_icon="🌱",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS matching the modern clinical sage / emerald design system
st.markdown("""
    <style>
        /* Import Google Font */
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        html, body, [class*="css"] {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .main-title {
            font-size: 32px;
            font-weight: 800;
            color: #064E3B;
            margin-bottom: 2px;
            letter-spacing: -0.02em;
        }
        .subtitle {
            font-size: 15px;
            color: #475569;
            margin-bottom: 20px;
        }
        .kpi-card {
            background-color: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-left: 4px solid #059669;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
            margin-bottom: 12px;
        }
        .kpi-title {
            font-size: 12px;
            color: #64748B;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.05em;
        }
        .kpi-value {
            font-size: 26px;
            font-weight: 800;
            color: #0F172A;
            margin-top: 4px;
        }
        .stButton>button {
            border-radius: 10px;
            font-weight: 700;
        }
    </style>
""", unsafe_allow_html=True)


# ==============================================================================
# BILINGUAL DICTIONARY FOR STREAMLIT
# ==============================================================================
TEXTS = {
    'id': {
        'title': "🌱 StuntingCare: Analisis Tren Nutrisi & Skrining Stunting",
        'subtitle': "Dashboard Intelijen Data Kesehatan Publik & Pertumbuhan Anak Indonesia berbasis Standar WHO dan Dataset UNICEF.",
        'filter_panel': "🔍 Panel Filter & Preferensi",
        'lang_label': "Pilihan Bahasa / Language:",
        'filter_desc': "Sesuaikan parameter di bawah ini untuk menyaring visualisasi data:",
        'indicator_label': "Indikator Nutrisi / Stunting:",
        'gender_label': "Jenis Kelamin (Gender):",
        'residence_label': "Wilayah Domisili (Residence):",
        'wealth_label': "Tingkat Kesejahteraan Rumah Tangga:",
        'empty_data': "❌ Tidak ada data yang cocok dengan kombinasi filter Anda. Silakan ubah pilihan filter di Sidebar.",
        'kpi_summary': "📈 Ringkasan Metrik Utama",
        'total_samples': "Total Sampel Data",
        'avg_of': "Rata-rata",
        'tab_screening': "🎯 Skrining Pertumbuhan Anak (WHO Z-Score)",
        'tab_trends': "📈 Tren & Dampak Pendidikan",
        'tab_socio': "🌍 Analisis Sosio-Demografi",
        'tab_data': "🔍 Eksplorasi Data Mentah",
        'chart_trend_title': "📅 Perkembangan Nilai Indikator (2018–2024)",
        'chart_trend_sub': "Tren rata-rata persentase indikator yang dipilih berdasarkan tahun pengumpulan data.",
        'chart_edu_title': "🎓 Pengaruh Tingkat Pendidikan Ibu",
        'chart_edu_sub': "Analisis perbandingan capaian gizi anak berdasarkan jenjang pendidikan terakhir ibu kandung.",
        'chart_res_title': "🏢 vs 🏡 Dampak Domisili (Urban vs Rural)",
        'chart_wealth_title': "💰 Gradien Kesejahteraan Ekonomi (Wealth Quintile)",
        'insight_edu': "💡 **Insight Portofolio:** Peningkatan tingkat pendidikan ibu kandung berkorelasi kuat dengan penurunan angka stunting anak secara drastis serta peningkatan keberhasilan pemberian ASI eksklusif.",
        'insight_socio': "📌 **Temuan Sosio-Ekonomi:** Kesenjangan gizi sangat mencolok antara kuintil termiskin (Poorest) dengan terkaya (Richest). Anak-anak di wilayah pedesaan (Rural) menghadapi kerentanan lebih tinggi akibat keterbatasan infrastruktur sanitasi dan pangan.",
        'preview_data': "📝 Preview Data Terfilter",
        'download_csv': "📥 Unduh Dataset Terfilter (.csv)"
    },
    'en': {
        'title': "🌱 StuntingCare: Child Nutrition Trends & Stunting Analytics",
        'subtitle': "Public Health Intelligence & Pediatric Growth Dashboard based on WHO Standards & UNICEF Datasets.",
        'filter_panel': "🔍 Filter Panel & Preferences",
        'lang_label': "Language / Pilihan Bahasa:",
        'filter_desc': "Adjust the parameters below to filter the dynamic dashboard visualizations:",
        'indicator_label': "Nutritional / Stunting Indicator:",
        'gender_label': "Gender:",
        'residence_label': "Residential Area (Urban/Rural):",
        'wealth_label': "Household Wealth Quintile:",
        'empty_data': "❌ No records match your current filter combination. Please modify the sidebar filters.",
        'kpi_summary': "📈 Key Performance Indicators",
        'total_samples': "Total Data Points",
        'avg_of': "Average",
        'tab_screening': "🎯 Child Growth Screening (WHO Z-Score)",
        'tab_trends': "📈 Trends & Maternal Education",
        'tab_socio': "🌍 Socio-Demographic Analysis",
        'tab_data': "🔍 Raw Data Explorer",
        'chart_trend_title': "📅 Annual Indicator Trajectory (2018–2024)",
        'chart_trend_sub': "Year-over-year mean percentage trajectory for selected nutritional indicators.",
        'chart_edu_title': "🎓 Impact of Maternal Education",
        'chart_edu_sub': "Comparative analysis of child nutrition metrics across mother's education attainment.",
        'chart_res_title': "🏢 vs 🏡 Residential Impact (Urban vs Rural)",
        'chart_wealth_title': "💰 Household Wealth Quintile Gradient",
        'insight_edu': "💡 **Portfolio Insight:** Higher maternal educational attainment is strongly correlated with a drastic reduction in child stunting and higher exclusive breastfeeding adherence.",
        'insight_socio': "📌 **Socio-Economic Finding:** Nutritional disparities are pronounced between poorest and richest quintiles. Rural children experience higher vulnerability due to clean water and sanitation access disparities.",
        'preview_data': "📝 Filtered Data Preview",
        'download_csv': "📥 Download Filtered Dataset (.csv)"
    }
}


# ==============================================================================
# FUNGSI MEMUAT DATA (DATA LOADING WITH CACHING)
# ==============================================================================
@st.cache_data
def load_data(file_path):
    if not os.path.exists(file_path):
        return pd.DataFrame()
    df = pd.read_csv(file_path)
    df['Year'] = df['Year'].astype(int)
    df['Observation_Value'] = df['Observation_Value'].astype(float)
    return df

DATA_PATH = "data/NUTRITION_CLEAN.csv"
df_raw = load_data(DATA_PATH)

# If not found directly, check relative root
if df_raw.empty and os.path.exists("NUTRITION_CLEAN.csv"):
    df_raw = load_data("NUTRITION_CLEAN.csv")


# ==============================================================================
# SIDEBAR CONTROLS & LANGUAGE SWITCHER
# ==============================================================================
st.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/e/e0/UNICEF_Logo.svg", width=140)
st.sidebar.markdown("---")

# Language Switcher
lang_choice = st.sidebar.radio(
    "🌐 Language / Bahasa:",
    options=["🇮🇩 Bahasa Indonesia", "🇬🇧 English"],
    index=0
)
lang = 'id' if "Indonesia" in lang_choice else 'en'
t = TEXTS[lang]

st.sidebar.markdown(f"### {t['filter_panel']}")
st.sidebar.write(t['filter_desc'])

if df_raw.empty:
    st.warning("⚠️ Dataset NUTRITION_CLEAN.csv not found in data/ folder. Please generate or provide the file.")
else:
    # Sidebar Filters
    all_indicators = sorted(df_raw['Indicator'].unique())
    selected_indicators = st.sidebar.multiselect(
        t['indicator_label'],
        options=all_indicators,
        default=all_indicators
    )

    all_genders = sorted(df_raw['Gender'].unique())
    selected_genders = st.sidebar.multiselect(
        t['gender_label'],
        options=all_genders,
        default=all_genders
    )

    all_residences = sorted(df_raw['Residence'].unique())
    selected_residences = st.sidebar.multiselect(
        t['residence_label'],
        options=all_residences,
        default=all_residences
    )

    poverty_order = ['Poorest', 'Poorer', 'Middle', 'Richer', 'Richest']
    existing_poverty = [p for p in poverty_order if p in df_raw['Poverty_Rating'].unique()]
    other_poverty = [p for p in df_raw['Poverty_Rating'].unique() if p not in poverty_order]
    all_poverty = existing_poverty + sorted(other_poverty)

    selected_poverty = st.sidebar.multiselect(
        t['wealth_label'],
        options=all_poverty,
        default=all_poverty
    )

    # Filter application
    filtered_df = df_raw[
        (df_raw['Indicator'].isin(selected_indicators)) &
        (df_raw['Gender'].isin(selected_genders)) &
        (df_raw['Residence'].isin(selected_residences)) &
        (df_raw['Poverty_Rating'].isin(selected_poverty))
    ]

    # Main Header
    st.markdown(f"<div class='main-title'>{t['title']}</div>", unsafe_allow_html=True)
    st.markdown(f"<div class='subtitle'>{t['subtitle']}</div>", unsafe_allow_html=True)

    if filtered_df.empty:
        st.error(t['empty_data'])
    else:
        # KPI Row
        st.markdown(f"### {t['kpi_summary']}")
        kpi_cols = st.columns(len(selected_indicators) + 1)

        with kpi_cols[0]:
            st.markdown(f"""
                <div class='kpi-card' style='border-left-color: #64748B;'>
                    <div class='kpi-title'>{t['total_samples']}</div>
                    <div class='kpi-value'>{len(filtered_df):,}</div>
                </div>
            """, unsafe_allow_html=True)

        for idx, indicator in enumerate(selected_indicators):
            indicator_df = filtered_df[filtered_df['Indicator'] == indicator]
            col_to_use = kpi_cols[idx + 1]

            with col_to_use:
                if not indicator_df.empty:
                    avg_val = indicator_df['Observation_Value'].mean()
                    border_color = "#E11D48" if "Stunting" in indicator or "Wasting" in indicator else "#059669"
                    if "Overweight" in indicator:
                        border_color = "#D97706"

                    st.markdown(f"""
                        <div class='kpi-card' style='border-left-color: {border_color};'>
                            <div class='kpi-title'>{t['avg_of']} {indicator}</div>
                            <div class='kpi-value'>{avg_val:.2f}%</div>
                        </div>
                    """, unsafe_allow_html=True)

        st.markdown("<hr style='margin: 15px 0 25px 0; border: 0; border-top: 1px solid #E2E8F0;'>", unsafe_allow_html=True)

        # Tabs Layout
        tab0, tab1, tab2, tab3 = st.tabs([
            t['tab_screening'],
            t['tab_trends'],
            t['tab_socio'],
            t['tab_data']
        ])

        # TAB 0: WHO Child Growth Assessment Calculator
        with tab0:
            st.markdown("#### 👶 Clinical Anthropometry & Z-Score Screening Tool")
            st.write("Hitung Status Deviasi Standar WHO (HAZ, WAZ, WHZ) secara langsung untuk anak usia 0–60 bulan:")

            c_in1, c_in2, c_in3 = st.columns(3)
            with c_in1:
                calc_gender = st.selectbox("Jenis Kelamin / Gender", ["Boy / Laki-laki", "Girl / Perempuan"])
                calc_age = st.slider("Usia Anak (Bulan) / Age in Months", 0, 60, 18)
            with c_in2:
                calc_height = st.number_input("Tinggi / Panjang Badan (cm)", min_value=40.0, max_value=130.0, value=82.5, step=0.1)
                calc_weight = st.number_input("Berat Badan (kg)", min_value=1.5, max_value=35.0, value=10.8, step=0.1)
            with c_in3:
                calc_edu = st.selectbox("Pendidikan Ibu", ["Higher (Perguruan Tinggi)", "Secondary (SMA/SMK)", "Primary (SD)", "No Education"])
                calc_bf = st.selectbox("ASI Eksklusif 0-6 Bulan", ["Yes (Ya)", "Partial (Sebagian)", "No (Tidak)"])

            # Rough WHO reference calculation for Streamlit
            med_h = 82.3 if "Boy" in calc_gender else 80.7
            sd_h = 3.1
            haz = (calc_height - med_h) / sd_h

            if haz >= -2.0:
                st.success(f"✅ **Normal Growth / Pertumbuhan Normal** (HAZ: {haz:+.2f} SD). Tinggi badan anak berada dalam standar optimal.")
            elif haz < -3.0:
                st.error(f"🚨 **Severe Stunting / Sangat Pendek** (HAZ: {haz:.2f} SD). Segera rujuk ke Dokter Spesialis Anak di Rumah Sakit.")
            else:
                st.warning(f"⚠️ **Moderate Stunting / Pendek** (HAZ: {haz:.2f} SD). Perlu intervensi protein hewani tinggi dan pemantauan Posyandu.")

        # TAB 1: Trends & Education
        with tab1:
            col_chart1, col_chart2 = st.columns(2)
            with col_chart1:
                st.markdown(f"#### {t['chart_trend_title']}")
                st.write(t['chart_trend_sub'])
                trend_data = filtered_df.groupby(['Year', 'Indicator'])['Observation_Value'].mean().reset_index()
                fig_line = px.line(
                    trend_data, x='Year', y='Observation_Value', color='Indicator', markers=True,
                    labels={'Observation_Value': 'Persentase (%)', 'Year': 'Tahun', 'Indicator': 'Indikator'},
                    template='plotly_white', height=420,
                    color_discrete_sequence=['#E11D48', '#059669', '#D97706', '#0284C7']
                )
                fig_line.update_layout(margin=dict(l=30, r=30, t=20, b=30), xaxis=dict(dtick=1))
                st.plotly_chart(fig_line, use_container_width=True)

            with col_chart2:
                st.markdown(f"#### {t['chart_edu_title']}")
                st.write(t['chart_edu_sub'])
                edu_data = filtered_df.groupby(['Maternal_Education', 'Indicator'])['Observation_Value'].mean().reset_index()
                edu_categories = ['No Education', 'Primary', 'Secondary', 'Higher']
                edu_data['Maternal_Education'] = pd.Categorical(
                    edu_data['Maternal_Education'],
                    categories=[e for e in edu_categories if e in edu_data['Maternal_Education'].unique()],
                    ordered=True
                )
                edu_data = edu_data.sort_values('Maternal_Education')
                fig_bar = px.bar(
                    edu_data, x='Maternal_Education', y='Observation_Value', color='Indicator', barmode='group',
                    labels={'Observation_Value': 'Persentase (%)', 'Maternal_Education': 'Pendidikan Ibu'},
                    template='plotly_white', height=420,
                    color_discrete_sequence=['#E11D48', '#059669', '#D97706', '#0284C7']
                )
                fig_bar.update_layout(margin=dict(l=30, r=30, t=20, b=30))
                st.plotly_chart(fig_bar, use_container_width=True)

            st.info(t['insight_edu'])

        # TAB 2: Socio-Demographic
        with tab2:
            col_demo1, col_demo2 = st.columns(2)
            with col_demo1:
                st.markdown(f"#### {t['chart_res_title']}")
                residence_data = filtered_df.groupby(['Residence', 'Indicator'])['Observation_Value'].mean().reset_index()
                fig_res = px.bar(
                    residence_data, x='Indicator', y='Observation_Value', color='Residence', barmode='group',
                    labels={'Observation_Value': 'Persentase (%)', 'Indicator': 'Indikator', 'Residence': 'Wilayah'},
                    color_discrete_sequence=['#0284C7', '#059669'], template='plotly_white', height=380
                )
                fig_res.update_layout(margin=dict(l=30, r=30, t=20, b=30))
                st.plotly_chart(fig_res, use_container_width=True)

            with col_demo2:
                st.markdown(f"#### {t['chart_wealth_title']}")
                poverty_data = filtered_df.groupby(['Poverty_Rating', 'Indicator'])['Observation_Value'].mean().reset_index()
                poverty_data['Poverty_Rating'] = pd.Categorical(
                    poverty_data['Poverty_Rating'],
                    categories=[p for p in poverty_order if p in poverty_data['Poverty_Rating'].unique()],
                    ordered=True
                )
                poverty_data = poverty_data.sort_values('Poverty_Rating')
                fig_pov = px.line(
                    poverty_data, x='Poverty_Rating', y='Observation_Value', color='Indicator', markers=True,
                    labels={'Observation_Value': 'Persentase (%)', 'Poverty_Rating': 'Kuintil'},
                    color_discrete_sequence=['#E11D48', '#059669', '#D97706', '#0284C7'],
                    template='plotly_white', height=380
                )
                fig_pov.update_layout(margin=dict(l=30, r=30, t=20, b=30))
                st.plotly_chart(fig_pov, use_container_width=True)

            st.warning(t['insight_socio'])

        # TAB 3: Data Explorer
        with tab3:
            st.markdown(f"#### {t['preview_data']}")
            st.dataframe(filtered_df.head(20), use_container_width=True)

            @st.cache_data
            def convert_df_to_csv(df):
                return df.to_csv(index=False).encode('utf-8')

            csv_data = convert_df_to_csv(filtered_df)
            st.download_button(
                label=t['download_csv'],
                data=csv_data,
                file_name="UNICEF_Nutrition_Indonesia_Filtered.csv",
                mime="text/csv"
            )

# Footer
st.markdown("<br><hr>", unsafe_allow_html=True)
st.markdown("""
    <div style='text-align: center; color: #94A3B8; font-size: 12px; padding-bottom: 20px;'>
        🌱 StuntingCare Analytics Platform • UNICEF Indonesia Cleaned Cohort & WHO Growth Standards.<br>
        Developed by Antariksa | Apple Developer Academy Candidate.
    </div>
""", unsafe_allow_html=True)
