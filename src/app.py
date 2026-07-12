import streamlit as st
import pandas as pd
import plotly.express as px
import os

# ==============================================================================
# CONFIGURASI HALAMAN (PAGE CONFIGURATION)
# ==============================================================================
# Mengatur konfigurasi dasar halaman web Streamlit seperti judul, ikon, dan layout
st.set_page_config(
    page_title="UNICEF Indonesia: Analisis Tren Nutrisi & Stunting",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS untuk memperindah tampilan dashboard (Opsional tapi meningkatkan estetika portofolio)
st.markdown("""
    <style>
        /* Gaya font dan warna latar belakang umum */
        .main-title {
            font-size: 38px;
            font-weight: 800;
            color: #1E3A8A;
            margin-bottom: 5px;
        }
        .subtitle {
            font-size: 16px;
            color: #4B5563;
            margin-bottom: 25px;
        }
        /* Custom styling untuk kartu KPI */
        .kpi-card {
            background-color: #F3F4F6;
            border-left: 5px solid #3B82F6;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 10px;
        }
        .kpi-title {
            font-size: 14px;
            color: #6B7280;
            text-transform: uppercase;
            font-weight: 600;
        }
        .kpi-value {
            font-size: 24px;
            font-weight: 700;
            color: #1F2937;
        }
    </style>
""", unsafe_allow_html=True)


# ==============================================================================
# FUNGSI MEMUAT DATA (DATA LOADING WITH CACHING)
# ==============================================================================
# Menggunakan decorator @st.cache_data agar data hanya dimuat sekali ke memori,
# mempercepat pemrosesan saat pengguna berinteraksi dengan filter/sidebar.
@st.cache_data
def load_data(file_path):
    """
    Memuat dataset CSV dan melakukan validasi sederhana.
    """
    if not os.path.exists(file_path):
        st.error(f"File data tidak ditemukan di path: {file_path}. Silakan periksa kembali folder Anda.")
        return pd.DataFrame()
    
    df = pd.read_csv(file_path)
    
    # Pastikan tipe data kolom numerik benar
    df['Year'] = df['Year'].astype(int)
    df['Observation_Value'] = df['Observation_Value'].astype(float)
    
    return df

# Memanggil fungsi untuk memuat data bersih
DATA_PATH = "data/NUTRITION_CLEAN.csv"
df_raw = load_data(DATA_PATH)


# ==============================================================================
# MAIN APP FLOW
# ==============================================================================
if df_raw.empty:
    st.warning("⚠️ Data belum berhasil dimuat. Pastikan file 'NUTRITION_CLEAN.csv' ada di folder 'data/'.")
else:
    # --------------------------------------------------------------------------
    # SIDEBAR FILTER (FILTER DINAMIS)
    # --------------------------------------------------------------------------
    st.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/e/e0/UNICEF_Logo.svg", width=150)
    st.sidebar.markdown("## 🔍 Panel Filter Data")
    st.sidebar.write("Sesuaikan parameter di bawah ini untuk memfilter visualisasi di dashboard.")
    
    # 1. Filter Multi-select untuk 'Indicator'
    all_indicators = sorted(df_raw['Indicator'].unique())
    selected_indicators = st.sidebar.multiselect(
        "Indikator Nutrisi/Stunting:",
        options=all_indicators,
        default=all_indicators,  # Memilih semua secara default agar halaman tidak kosong
        help="Pilih satu atau beberapa indikator nutrisi anak."
    )
    
    # 2. Filter Multi-select untuk 'Gender'
    all_genders = sorted(df_raw['Gender'].unique())
    selected_genders = st.sidebar.multiselect(
        "Jenis Kelamin (Gender):",
        options=all_genders,
        default=all_genders,
        help="Filter berdasarkan Jenis Kelamin anak atau nilai Total keseluruhan."
    )
    
    # 3. Filter Multi-select untuk 'Residence'
    all_residences = sorted(df_raw['Residence'].unique())
    selected_residences = st.sidebar.multiselect(
        "Wilayah Domisili (Residence):",
        options=all_residences,
        default=all_residences,
        help="Pilih domisili Urban (Perkotaan) atau Rural (Pedesaan)."
    )
    
    # 4. Filter Multi-select untuk 'Poverty_Rating' (Status Ekonomi)
    # Diurutkan berdasarkan status kesejahteraan yang logis
    poverty_order = ['Poorest', 'Poorer', 'Middle', 'Richer', 'Richest']
    existing_poverty = [p for p in poverty_order if p in df_raw['Poverty_Rating'].unique()]
    # Jika ada nilai lain di luar order di atas, tambahkan di akhir
    other_poverty = [p for p in df_raw['Poverty_Rating'].unique() if p not in poverty_order]
    all_poverty = existing_poverty + sorted(other_poverty)
    
    selected_poverty = st.sidebar.multiselect(
        "Tingkat Kesejahteraan Rumah Tangga:",
        options=all_poverty,
        default=all_poverty,
        help="Filter berdasarkan tingkat kesejahteraan ekonomi (Wealth Quintile)."
    )
    
    # --- Penerapan Filter pada Dataset ---
    # Memfilter dataframe berdasarkan semua pilihan yang diambil di sidebar
    filtered_df = df_raw[
        (df_raw['Indicator'].isin(selected_indicators)) &
        (df_raw['Gender'].isin(selected_genders)) &
        (df_raw['Residence'].isin(selected_residences)) &
        (df_raw['Poverty_Rating'].isin(selected_poverty))
    ]
    
    # --------------------------------------------------------------------------
    # HEADER UTAMA
    # --------------------------------------------------------------------------
    st.markdown("<div class='main-title'>UNICEF Indonesia: Tren Nutrisi & Stunting</div>", unsafe_allow_html=True)
    st.markdown(
        "<div class='subtitle'>Dashboard Interaktif Portofolio Data Science untuk menganalisis metrik stunting, wasting, overweight, dan pola pemberian ASI eksklusif pada anak di Indonesia.</div>", 
        unsafe_allow_html=True
    )
    
    # Cek apakah hasil filter kosong
    if filtered_df.empty:
        st.error("❌ Tidak ada data yang cocok dengan kombinasi filter Anda saat ini. Silakan ubah pilihan filter di Sidebar.")
    else:
        # --------------------------------------------------------------------------
        # BAGIAN 1: METRIK UTAMA (KPI CARDS)
        # --------------------------------------------------------------------------
        st.markdown("### 📈 Ringkasan Metrik Utama")
        
        # Membuat baris kolom dinamis untuk menampilkan KPI Cards
        # Kita akan menampilkan rata-rata masing-masing indikator yang sedang dipilih
        kpi_cols = st.columns(len(selected_indicators) + 1)
        
        # Kolom Pertama: Total Data Points
        with kpi_cols[0]:
            st.markdown(f"""
                <div class='kpi-card' style='border-left-color: #6B7280;'>
                    <div class='kpi-title'>Total Sampel Data</div>
                    <div class='kpi-value'>{len(filtered_df):,}</div>
                </div>
            """, unsafe_allow_html=True)
            
        # Kolom Selanjutnya: Rata-rata nilai untuk masing-masing Indikator yang difilter
        # Ini memastikan KPI bernilai ilmiah (tidak merata-ratakan stunting dengan menyusui secara mentah)
        for idx, indicator in enumerate(selected_indicators):
            indicator_df = filtered_df[filtered_df['Indicator'] == indicator]
            col_to_use = kpi_cols[idx + 1]
            
            with col_to_use:
                if not indicator_df.empty:
                    avg_val = indicator_df['Observation_Value'].mean()
                    # Menentukan warna border kustom berdasarkan indikator untuk estetika
                    border_color = "#EF4444" if "Stunting" in indicator or "Wasting" in indicator else "#10B981"
                    if "Overweight" in indicator:
                        border_color = "#F59E0B"
                        
                    st.markdown(f"""
                        <div class='kpi-card' style='border-left-color: {border_color};'>
                            <div class='kpi-title'>Rata-rata {indicator}</div>
                            <div class='kpi-value'>{avg_val:.2f}%</div>
                        </div>
                    """, unsafe_allow_html=True)
                else:
                    st.markdown(f"""
                        <div class='kpi-card'>
                            <div class='kpi-title'>{indicator}</div>
                            <div class='kpi-value'>N/A</div>
                        </div>
                    """, unsafe_allow_html=True)
                    
        st.markdown("<hr style='margin: 20px 0;'>", unsafe_allow_html=True)
        
        # --------------------------------------------------------------------------
        # BAGIAN 2: MULTI-TAB UNTUK VISUALISASI DAN DETAIL
        # --------------------------------------------------------------------------
        # Menggunakan struktur Tab agar dashboard terlihat rapi, modern, dan profesional
        tab1, tab2, tab3 = st.tabs([
            "📈 Tren & Dampak Pendidikan", 
            "🌍 Analisis Sosio-Demografi", 
            "🔍 Eksplorasi Data Mentah"
        ])
        
        # ---------------------------------------------------------
        # TAB 1: TREN DAN DAMPAK PENDIDIKAN IBU
        # ---------------------------------------------------------
        with tab1:
            col_chart1, col_chart2 = st.columns(2)
            
            # --- Visualisasi 1: Line Chart (Tren dari Tahun ke Tahun) ---
            with col_chart1:
                st.markdown("#### 📅 Perkembangan Nilai Nutrisi & Stunting")
                st.write("Tren rata-rata nilai persentase indikator yang dipilih berdasarkan tahun pengumpulan data.")
                
                # Agregasi data tahunan untuk line chart agar tidak terjadi tumpang tindih data
                trend_data = filtered_df.groupby(['Year', 'Indicator'])['Observation_Value'].mean().reset_index()
                
                # Membuat Line Chart Plotly Express
                fig_line = px.line(
                    trend_data,
                    x='Year',
                    y='Observation_Value',
                    color='Indicator',
                    markers=True,
                    labels={
                        'Observation_Value': 'Rata-rata Persentase (%)',
                        'Year': 'Tahun',
                        'Indicator': 'Indikator'
                    },
                    template='plotly_white',
                    height=450
                )
                
                # Mempercantik desain grafis
                fig_line.update_layout(
                    margin=dict(l=40, r=40, t=20, b=40),
                    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
                    xaxis=dict(dtick=1) # Memastikan sumbu X menampilkan integer tahun dengan tepat
                )
                
                # Menampilkan chart di Streamlit
                st.plotly_chart(fig_line, use_container_width=True)
                
            # --- Visualisasi 2: Bar Chart (Dampak Pendidikan Ibu) ---
            with col_chart2:
                st.markdown("#### 🎓 Pengaruh Tingkat Pendidikan Ibu")
                st.write("Analisis perbandingan capaian indikator nutrisi berdasarkan jenjang pendidikan terakhir ibu kandung.")
                
                # Agregasi data berdasarkan Pendidikan Ibu dan Indikator
                edu_data = filtered_df.groupby(['Maternal_Education', 'Indicator'])['Observation_Value'].mean().reset_index()
                
                # Mengurutkan urutan pendidikan agar logis secara akademis
                edu_categories = ['No Education', 'Primary', 'Secondary', 'Higher']
                edu_data['Maternal_Education'] = pd.Categorical(
                    edu_data['Maternal_Education'], 
                    categories=[e for e in edu_categories if e in edu_data['Maternal_Education'].unique()],
                    ordered=True
                )
                edu_data = edu_data.sort_values('Maternal_Education')
                
                # Membuat Grouped Bar Chart Plotly Express
                fig_bar = px.bar(
                    edu_data,
                    x='Maternal_Education',
                    y='Observation_Value',
                    color='Indicator',
                    barmode='group',
                    labels={
                        'Observation_Value': 'Rata-rata Persentase (%)',
                        'Maternal_Education': 'Pendidikan Terakhir Ibu',
                        'Indicator': 'Indikator'
                    },
                    template='plotly_white',
                    height=450
                )
                
                # Mempercantik desain grafis
                fig_bar.update_layout(
                    margin=dict(l=40, r=40, t=20, b=40),
                    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
                )
                
                st.plotly_chart(fig_bar, use_container_width=True)
                
            # Penjelasan Analisis untuk memperkuat nilai Portofolio
            st.info("""
                💡 **Insight Portofolio:** 
                - **Sumbu Tren:** Menunjukkan arah perkembangan intervensi kesehatan anak dari tahun ke tahun. Penurunan tren stunting menandakan keberhasilan program gizi nasional.
                - **Faktor Pendidikan Ibu:** Secara umum dalam studi kesehatan masyarakat, peningkatan tingkat pendidikan ibu kandung berkorelasi kuat dengan penurunan angka stunting dan wasting anak, serta peningkatan tingkat keberhasilan pemberian ASI eksklusif.
            """)
            
        # ---------------------------------------------------------
        # TAB 2: ANALISIS DEMOGRAFI MENDALAM (FITUR PORTFOLIO TAMBAHAN)
        # ---------------------------------------------------------
        with tab2:
            st.markdown("#### 🏘️ Analisis Berdasarkan Wilayah & Status Sosial Ekonomi")
            st.write("Bagian ini membandingkan kesenjangan nutrisi antara wilayah perkotaan/pedesaan dan kuintil kesejahteraan keluarga.")
            
            col_demo1, col_demo2 = st.columns(2)
            
            # --- Visualisasi 3: Perbandingan Urban vs Rural ---
            with col_demo1:
                st.markdown("##### 🏢 vs 🏡 Dampak Domisili (Urban vs Rural)")
                
                residence_data = filtered_df.groupby(['Residence', 'Indicator'])['Observation_Value'].mean().reset_index()
                
                fig_res = px.bar(
                    residence_data,
                    x='Indicator',
                    y='Observation_Value',
                    color='Residence',
                    barmode='group',
                    labels={'Observation_Value': 'Rata-rata (%)', 'Indicator': 'Indikator', 'Residence': 'Wilayah'},
                    color_discrete_sequence=['#3B82F6', '#10B981'],
                    template='plotly_white',
                    height=400
                )
                fig_res.update_layout(margin=dict(l=40, r=40, t=20, b=40))
                st.plotly_chart(fig_res, use_container_width=True)
                
            # --- Visualisasi 4: Distribusi Tingkat Kesejahteraan ---
            with col_demo2:
                st.markdown("##### 💰 Dampak Status Kesejahteraan Ekonomi (Wealth Quintile)")
                
                poverty_data = filtered_df.groupby(['Poverty_Rating', 'Indicator'])['Observation_Value'].mean().reset_index()
                poverty_data['Poverty_Rating'] = pd.Categorical(
                    poverty_data['Poverty_Rating'],
                    categories=[p for p in poverty_order if p in poverty_data['Poverty_Rating'].unique()],
                    ordered=True
                )
                poverty_data = poverty_data.sort_values('Poverty_Rating')
                
                fig_pov = px.line(
                    poverty_data,
                    x='Poverty_Rating',
                    y='Observation_Value',
                    color='Indicator',
                    markers=True,
                    labels={'Observation_Value': 'Rata-rata (%)', 'Poverty_Rating': 'Kesejahteraan', 'Indicator': 'Indikator'},
                    template='plotly_white',
                    height=400
                )
                fig_pov.update_layout(margin=dict(l=40, r=40, t=20, b=40))
                st.plotly_chart(fig_pov, use_container_width=True)
                
            st.warning("""
                📌 **Temuan Sosio-Ekonomi:** Kesenjangan gizi seringkali sangat mencolok antara kelompok termiskin (Poorest) dengan kelompok terkaya (Richest). Anak-anak di wilayah pedesaan (Rural) juga umumnya menghadapi kerentanan yang lebih tinggi terhadap stunting dibandingkan dengan perkotaan (Urban).
            """)

        # ---------------------------------------------------------
        # TAB 3: DATA EXPLORATION & DOWNLOAD
        # ---------------------------------------------------------
        with tab3:
            st.markdown("#### 🔍 Eksplorasi & Ekspor Data Terfilter")
            st.write("Gunakan tabel interaktif di bawah ini untuk menginspeksi baris data Anda secara langsung.")
            
            # Menampilkan Data Preview (5 baris pertama sesuai instruksi)
            st.markdown("##### 📝 Preview 5 Baris Pertama Data")
            st.dataframe(filtered_df.head(5), use_container_width=True)
            
            # Menyediakan expander untuk melihat keseluruhan data yang telah difilter
            with st.expander("👁️ Lihat Seluruh Data Terfilter (Maksimum 500 Baris)"):
                st.dataframe(filtered_df.head(500), use_container_width=True)
                
            # Fitur Ekspor Data Ke CSV untuk Keperluan Portofolio
            # Mengonversi dataframe ke string CSV
            @st.cache_data
            def convert_df_to_csv(df):
                return df.to_csv(index=False).encode('utf-8')
            
            csv_data = convert_df_to_csv(filtered_df)
            
            st.markdown("##### 💾 Unduh Dataset")
            st.write("Unduh data yang telah difilter di atas dalam format CSV untuk dianalisis lebih lanjut di Excel, R, atau Python.")
            st.download_button(
                label="📥 Unduh Data Terfilter (.csv)",
                data=csv_data,
                file_name="UNICEF_Nutrition_Filtered.csv",
                mime="text/csv",
                help="Klik di sini untuk mengunduh file CSV dari hasil filter dashboard."
            )

# ==============================================================================
# FOOTER DASHBOARD
# ==============================================================================
st.markdown("<br><br><hr>", unsafe_allow_html=True)
st.markdown("""
    <div style='text-align: center; color: #9CA3AF; font-size: 13px; padding-bottom: 20px;'>
        Dashboard dibangun menggunakan <b>Streamlit</b> & <b>Plotly Express</b> | Data Source: UNICEF Indonesia Cleaned Dataset.
        <br>© 2026 Portofolio Gizi & Stunting Indonesia.
    </div>
""", unsafe_allow_html=True)
