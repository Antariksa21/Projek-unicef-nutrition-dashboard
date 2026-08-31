import os
import sys
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register system TrueType fonts for crisp Unicode & typography
font_dir = r'C:\Windows\Fonts'
arial_path = os.path.join(font_dir, 'arial.ttf')
arial_bd_path = os.path.join(font_dir, 'arialbd.ttf')
arial_i_path = os.path.join(font_dir, 'ariali.ttf')

if os.path.exists(arial_path) and os.path.exists(arial_bd_path):
    pdfmetrics.registerFont(TTFont('Arial', arial_path))
    pdfmetrics.registerFont(TTFont('Arial-Bold', arial_bd_path))
    if os.path.exists(arial_i_path):
        pdfmetrics.registerFont(TTFont('Arial-Italic', arial_i_path))
    FONT_NORMAL = 'Arial'
    FONT_BOLD = 'Arial-Bold'
    FONT_ITALIC = 'Arial-Italic' if os.path.exists(arial_i_path) else 'Arial'
else:
    FONT_NORMAL = 'Helvetica'
    FONT_BOLD = 'Helvetica-Bold'
    FONT_ITALIC = 'Helvetica-Oblique'


def build_docx(filename):
    doc = Document()
    
    # Page setup - 0.65 in margins
    for section in doc.sections:
        section.top_margin = Inches(0.65)
        section.bottom_margin = Inches(0.65)
        section.left_margin = Inches(0.7)
        section.right_margin = Inches(0.7)

    # Color definitions
    COLOR_PRIMARY = RGBColor(0, 113, 227)      # Apple Blue #0071E3
    COLOR_DARK = RGBColor(29, 29, 31)          # Apple Dark #1D1D1F
    COLOR_MUTED = RGBColor(110, 110, 115)      # Apple Muted Gray #6E6E73
    COLOR_BG_HEX = "F5F5F7"                    # Apple light gray
    COLOR_CARD_HEX = "FAFAFC"

    def set_cell_background(cell, fill_hex):
        tcPr = cell._tc.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        tcPr.append(shd)

    def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    # Header
    p_name = doc.add_paragraph()
    r_name = p_name.add_run("ANTARIKSA")
    r_name.font.name = "Arial"
    r_name.font.size = Pt(22)
    r_name.font.bold = True
    r_name.font.color.rgb = COLOR_DARK
    p_name.paragraph_format.space_after = Pt(2)

    p_sub = doc.add_paragraph()
    r_sub = p_sub.add_run("Apple Developer Academy Candidate  |  Software Developer & Creative Technologist")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(10.5)
    r_sub.font.bold = True
    r_sub.font.color.rgb = COLOR_PRIMARY
    p_sub.paragraph_format.space_after = Pt(3)

    p_contact = doc.add_paragraph()
    r_contact = p_contact.add_run("Email: arik2002arik@gmail.com   |   GitHub: github.com/Antariksa21   |   Location: Indonesia")
    r_contact.font.name = "Arial"
    r_contact.font.size = Pt(9)
    r_contact.font.color.rgb = COLOR_MUTED
    p_contact.paragraph_format.space_after = Pt(8)

    def add_section_title(title_text):
        p = doc.add_paragraph()
        r = p.add_run(title_text.upper())
        r.font.name = "Arial"
        r.font.size = Pt(10.5)
        r.font.bold = True
        r.font.color.rgb = COLOR_PRIMARY
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(2)

        p_line = doc.add_paragraph()
        r_line = p_line.add_run("━" * 58)
        r_line.font.name = "Arial"
        r_line.font.size = Pt(7.5)
        r_line.font.color.rgb = RGBColor(220, 220, 225)
        p_line.paragraph_format.space_after = Pt(5)

    # 1. Executive Summary
    add_section_title("01. Executive Statement & Academy Motivation")
    p_sum = doc.add_paragraph()
    r_sum = p_sum.add_run(
        "I am an aspiring iOS developer and data analyst driven by empathy, creative problem-solving, and human-centered design. "
        "With a strong foundation in transforming complex socio-health datasets into actionable visual insights (UNICEF Indonesia Stunting Dashboard), "
        "building native 2D game engines from scratch (Neon Runner), and engineering Apple-inspired glassmorphic user interfaces (NeoCalc), "
        "I bridge rigorous analytical thinking with refined aesthetic and interactive execution.\n\n"
        "I am applying to the Apple Developer Academy to immerse myself in Challenge-Based Learning (CBL), master Swift & SwiftUI, and collaborate with "
        "multidisciplinary creators to architect transformative iOS applications that address pressing societal challenges in Indonesia."
    )
    r_sum.font.name = "Arial"
    r_sum.font.size = Pt(9)
    r_sum.font.color.rgb = COLOR_DARK
    p_sum.paragraph_format.line_spacing = 1.15
    p_sum.paragraph_format.space_after = Pt(6)

    # 2. Core Competencies
    add_section_title("02. Core Competencies & Technical Toolkit")
    skills_data = [
        ("Languages & Fundamentals", "Python, JavaScript (ES6+), HTML5, CSS3, SQL, OOP, Algorithmic Thinking"),
        ("Data & Analytics", "Streamlit, Pandas, Plotly Express, Exploratory Data Analysis (EDA), Statistical Modeling, Caching"),
        ("Frontend & Interactive Media", "HTML5 Canvas 2D API, Web Audio API, Physics Simulation, Responsive Glassmorphism"),
        ("Design & UI/UX Philosophy", "Apple Human Interface Guidelines (HIG), Micro-interactions, Accessibility, Clean Layouts"),
        ("Methodologies & Teamwork", "Challenge-Based Learning (CBL), Git/GitHub Version Control, Clean Architecture, Cross-Disciplinary Collaboration")
    ]

    t_skills = doc.add_table(rows=len(skills_data), cols=2)
    t_skills.alignment = WD_TABLE_ALIGNMENT.CENTER
    for idx, (category, desc) in enumerate(skills_data):
        row = t_skills.rows[idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width, c1.width = Inches(2.2), Inches(4.8)
        set_cell_background(c0, COLOR_BG_HEX)
        set_cell_background(c1, "FFFFFF")
        set_cell_margins(c0, top=60, bottom=60, left=90, right=90)
        set_cell_margins(c1, top=60, bottom=60, left=90, right=90)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(1)
        r0 = p0.add_run(category)
        r0.font.name = "Arial"
        r0.font.size = Pt(8.5)
        r0.font.bold = True
        r0.font.color.rgb = COLOR_DARK

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(1)
        r1 = p1.add_run(desc)
        r1.font.name = "Arial"
        r1.font.size = Pt(8.5)
        r1.font.color.rgb = COLOR_DARK

    p_sp1 = doc.add_paragraph()
    p_sp1.paragraph_format.space_after = Pt(4)

    # 3. Featured Project 1 (Page 1)
    add_section_title("03. Featured Case Study 1 — UNICEF Indonesia Nutrition & Stunting Analytics")
    p_p1 = doc.add_paragraph()
    r_p1_t = p_p1.add_run("UNICEF Indonesia: Interactive Nutrition & Stunting Analytics Dashboard\n")
    r_p1_t.font.name = "Arial"
    r_p1_t.font.size = Pt(10)
    r_p1_t.font.bold = True
    r_p1_t.font.color.rgb = COLOR_DARK

    r_p1_sub = p_p1.add_run("Role: Lead Data Analyst & Frontend Developer  |  Tech: Python, Streamlit, Pandas, Plotly Express")
    r_p1_sub.font.name = "Arial"
    r_p1_sub.font.size = Pt(8.5)
    r_p1_sub.font.bold = True
    r_p1_sub.font.color.rgb = COLOR_PRIMARY
    p_p1.paragraph_format.space_after = Pt(3)

    p1_desc = (
        "• The Challenge: Child stunting and malnutrition are critical public health crises across Indonesia. Public health datasets are often complex and tabular, making multi-variable trend discovery difficult for non-technical policymakers and field advocates.\n"
        "• Engineering & Implementation: Architected a dynamic, web-based analytics dashboard featuring multi-dimensional filtering across indicators (Stunting, Wasting, Overweight, Exclusive Breastfeeding), gender, residence, and wealth quintiles with real-time reactive KPI updates.\n"
        "• Socio-Demographic Insights: Uncovered strong negative correlation between maternal education level and stunting prevalence, and highlighted healthcare access disparities between urban and rural populations.\n"
        "• Performance & Export: Integrated in-memory data caching (@st.cache_data) for instantaneous query execution and built an automated filtered dataset CSV exporter."
    )
    p_p1_b = doc.add_paragraph()
    r_p1_b = p_p1_b.add_run(p1_desc)
    r_p1_b.font.name = "Arial"
    r_p1_b.font.size = Pt(8.5)
    r_p1_b.font.color.rgb = COLOR_DARK
    p_p1_b.paragraph_format.line_spacing = 1.15
    p_p1_b.paragraph_format.space_after = Pt(8)

    # Page Break for DOCX
    doc.add_page_break()

    # 4. Featured Project 2 (Page 2)
    add_section_title("04. Featured Case Study 2 — Neon Runner 2D Game Engine")
    p_p2 = doc.add_paragraph()
    r_p2_t = p_p2.add_run("Neon Runner: 2D Retro Cyber Synthwave Arcade Game Engine\n")
    r_p2_t.font.name = "Arial"
    r_p2_t.font.size = Pt(10)
    r_p2_t.font.bold = True
    r_p2_t.font.color.rgb = COLOR_DARK

    r_p2_sub = p_p2.add_run("Role: Creative Technologist & Game Developer  |  Tech: Vanilla JavaScript (ES6+), HTML5 Canvas 2D, Web Audio API")
    r_p2_sub.font.name = "Arial"
    r_p2_sub.font.size = Pt(8.5)
    r_p2_sub.font.bold = True
    r_p2_sub.font.color.rgb = COLOR_PRIMARY
    p_p2.paragraph_format.space_after = Pt(3)

    p2_desc = (
        "• The Challenge: Developing an engaging, 60 FPS endless runner game entirely from scratch without external game frameworks (Unity/Phaser), implementing native physics, particle simulation, and audio synthesis.\n"
        "• Physics & Engine Engineering: Built a custom requestAnimationFrame game loop with state management, gravity, jump dynamics, multi-layered parallax backgrounds, and precise AABB (Axis-Aligned Bounding Box) collision detection.\n"
        "• Audio & Particle Synthesis: Engineered real-time Canvas particle emitters (dust clouds, landing sparks, defeat explosion) and synthesized 8-bit sound effects using the native browser Web Audio API oscillators.\n"
        "• Progression & Persistence: Designed procedural obstacle generation with adaptive speed curves and LocalStorage high-score persistence."
    )
    p_p2_b = doc.add_paragraph()
    r_p2_b = p_p2_b.add_run(p2_desc)
    r_p2_b.font.name = "Arial"
    r_p2_b.font.size = Pt(8.5)
    r_p2_b.font.color.rgb = COLOR_DARK
    p_p2_b.paragraph_format.line_spacing = 1.15
    p_p2_b.paragraph_format.space_after = Pt(8)

    # 5. Featured Project 3 (Page 2)
    add_section_title("05. Featured Case Study 3 — NeoCalc Glassmorphic Calculator")
    p_p3 = doc.add_paragraph()
    r_p3_t = p_p3.add_run("NeoCalc: Premium Glassmorphic Calculator Application\n")
    r_p3_t.font.name = "Arial"
    r_p3_t.font.size = Pt(10)
    r_p3_t.font.bold = True
    r_p3_t.font.color.rgb = COLOR_DARK

    r_p3_sub = p_p3.add_run("Role: UI/UX Front-End Engineer  |  Tech: HTML5, CSS3 (Glassmorphism & Backdrop Filter), Vanilla JavaScript")
    r_p3_sub.font.name = "Arial"
    r_p3_sub.font.size = Pt(8.5)
    r_p3_sub.font.bold = True
    r_p3_sub.font.color.rgb = COLOR_PRIMARY
    p_p3.paragraph_format.space_after = Pt(3)

    p3_desc = (
        "• The Challenge: Creating an Apple-inspired desktop calculator that pairs sophisticated aesthetic elegance with robust mathematical accuracy and full keyboard accessibility.\n"
        "• Design & Aesthetics: Engineered a responsive glassmorphic UI using CSS backdrop-filter blur, dynamic neon glow gradients, and tactile micro-interactions.\n"
        "• Precision Engineering: Solved floating-point arithmetic precision issues (e.g., 0.1 + 0.2 = 0.3) with dedicated number sanitization and dynamic scientific notation for extreme values.\n"
        "• Accessibility: Implemented bidirectional physical keyboard event listeners alongside touch/mouse interfaces for frictionless usability."
    )
    p_p3_b = doc.add_paragraph()
    r_p3_b = p_p3_b.add_run(p3_desc)
    r_p3_b.font.name = "Arial"
    r_p3_b.font.size = Pt(8.5)
    r_p3_b.font.color.rgb = COLOR_DARK
    p_p3_b.paragraph_format.line_spacing = 1.15
    p_p3_b.paragraph_format.space_after = Pt(8)

    # 6. CBL & Vision (Page 2)
    add_section_title("06. Challenge-Based Learning (CBL) & Vision for Apple Academy")
    
    t_callout = doc.add_table(rows=1, cols=1)
    t_callout.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell_c = t_callout.cell(0, 0)
    set_cell_background(cell_c, "F0F6FF")
    set_cell_margins(cell_c, top=140, bottom=140, left=180, right=180)
    
    tcPr = cell_c._tc.get_or_add_tcPr()
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:left w:val="single" w:sz="24" w:space="0" w:color="0071E3"/><w:top w:val="none"/><w:right w:val="none"/><w:bottom w:val="none"/></w:tcBorders>')
    tcPr.append(borders)

    cp = cell_c.paragraphs[0]
    rb = cp.add_run("VISION & COMMITMENT: ")
    rb.font.name = "Arial"
    rb.font.size = Pt(9)
    rb.font.bold = True
    rb.font.color.rgb = COLOR_PRIMARY
    
    rt = cp.add_run(
        "I aspire to bring my data-driven problem solving and creative engineering to develop high-impact native iOS and iPadOS applications. "
        "At the Apple Developer Academy, I aim to master Swift, SwiftUI, CoreML, and Apple HealthKit, collaborating across multidisciplinary teams within "
        "the Challenge-Based Learning (CBL) framework (Engage, Investigate, Act) to build world-class digital solutions for real community impact."
    )
    rt.font.name = "Arial"
    rt.font.size = Pt(9)
    rt.font.color.rgb = COLOR_DARK

    doc.save(filename)
    print(f"DOCX created successfully at: {filename}")


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont(FONT_NORMAL, 8.5)
        self.setFillColor(colors.HexColor("#86868B"))
        
        # Top Header (for page 2 onwards)
        if self._pageNumber > 1:
            self.drawString(18 * mm, 285 * mm, "Antariksa  •  Apple Developer Academy Portfolio")
            self.drawRightString(192 * mm, 285 * mm, "Featured Projects & Vision")
            self.setStrokeColor(colors.HexColor("#E5E5EA"))
            self.setLineWidth(0.5)
            self.line(18 * mm, 282 * mm, 192 * mm, 282 * mm)
            
        # Bottom Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(192 * mm, 11 * mm, footer_text)
        self.drawString(18 * mm, 11 * mm, "Apple Developer Academy Application Portfolio  |  Antariksa")
        self.setStrokeColor(colors.HexColor("#E5E5EA"))
        self.setLineWidth(0.5)
        self.line(18 * mm, 15 * mm, 192 * mm, 15 * mm)
        self.restoreState()


def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=15 * mm,
        bottomMargin=16 * mm
    )

    styles = getSampleStyleSheet()

    # Custom styles using registered TrueType fonts
    style_name = ParagraphStyle(
        'PortfolioName',
        parent=styles['Normal'],
        fontName=FONT_BOLD,
        fontSize=21,
        leading=25,
        textColor=colors.HexColor('#1D1D1F')
    )

    style_sub = ParagraphStyle(
        'PortfolioSub',
        parent=styles['Normal'],
        fontName=FONT_BOLD,
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#0071E3')
    )

    style_contact = ParagraphStyle(
        'PortfolioContact',
        parent=styles['Normal'],
        fontName=FONT_NORMAL,
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#6E6E73')
    )

    style_section_title = ParagraphStyle(
        'PortfolioSection',
        parent=styles['Normal'],
        fontName=FONT_BOLD,
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor('#0071E3'),
        spaceBefore=7,
        spaceAfter=2
    )

    style_body = ParagraphStyle(
        'PortfolioBody',
        parent=styles['Normal'],
        fontName=FONT_NORMAL,
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#1D1D1F')
    )

    style_proj_title = ParagraphStyle(
        'PortfolioProjTitle',
        parent=styles['Normal'],
        fontName=FONT_BOLD,
        fontSize=9.8,
        leading=12.5,
        textColor=colors.HexColor('#1D1D1F')
    )

    style_proj_tag = ParagraphStyle(
        'PortfolioProjTag',
        parent=styles['Normal'],
        fontName=FONT_BOLD,
        fontSize=8.2,
        leading=11,
        textColor=colors.HexColor('#0071E3')
    )

    style_bullet = ParagraphStyle(
        'PortfolioBullet',
        parent=styles['Normal'],
        fontName=FONT_NORMAL,
        fontSize=8.3,
        leading=11.5,
        textColor=colors.HexColor('#2C2C2E'),
        leftIndent=8,
        firstLineIndent=-8
    )

    style_callout = ParagraphStyle(
        'PortfolioCallout',
        parent=styles['Normal'],
        fontName=FONT_NORMAL,
        fontSize=8.4,
        leading=11.8,
        textColor=colors.HexColor('#1D1D1F')
    )

    story = []

    # ================= PAGE 1 =================
    # Header Banner
    story.append(Paragraph("ANTARIKSA", style_name))
    story.append(Spacer(1, 1.5 * mm))
    story.append(Paragraph("Apple Developer Academy Candidate  |  Software Developer & Creative Technologist", style_sub))
    story.append(Spacer(1, 1.5 * mm))
    story.append(Paragraph("Email: arik2002arik@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; GitHub: github.com/Antariksa21 &nbsp;&nbsp;|&nbsp;&nbsp; Location: Indonesia", style_contact))
    story.append(Spacer(1, 2 * mm))
    story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor("#0071E3"), spaceBefore=1, spaceAfter=5))

    # 1. Executive Statement
    story.append(Paragraph("01. EXECUTIVE STATEMENT & ACADEMY MOTIVATION", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E5EA"), spaceBefore=1, spaceAfter=3))
    
    sum_p = (
        "I am an aspiring iOS developer and data analyst driven by empathy, creative problem-solving, and human-centered design. "
        "With a strong foundation in transforming complex socio-health datasets into actionable visual insights (UNICEF Indonesia Stunting Dashboard), "
        "building native 2D game engines from scratch (Neon Runner), and engineering Apple-inspired glassmorphic user interfaces (NeoCalc), "
        "I bridge rigorous analytical thinking with refined aesthetic and interactive execution.<br/><br/>"
        "I am applying to the Apple Developer Academy to immerse myself in <b>Challenge-Based Learning (CBL)</b>, master <b>Swift & SwiftUI</b>, and collaborate with "
        "multidisciplinary creators to architect transformative iOS applications that address pressing societal challenges in Indonesia."
    )
    story.append(Paragraph(sum_p, style_body))
    story.append(Spacer(1, 3.5 * mm))

    # 2. Core Competencies Table
    story.append(Paragraph("02. CORE COMPETENCIES & TECHNICAL TOOLKIT", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E5EA"), spaceBefore=1, spaceAfter=3))

    skills = [
        [
            Paragraph("<b>Languages & Fundamentals</b>", style_body),
            Paragraph("Python, JavaScript (ES6+), HTML5, CSS3, SQL, OOP, Algorithmic Thinking", style_body)
        ],
        [
            Paragraph("<b>Data & Intelligence</b>", style_body),
            Paragraph("Streamlit, Pandas, Plotly Express, Exploratory Data Analysis (EDA), Statistical Modeling, Caching", style_body)
        ],
        [
            Paragraph("<b>Frontend & Interactive</b>", style_body),
            Paragraph("HTML5 Canvas 2D API, Web Audio API, Physics Simulation, Responsive Glassmorphism", style_body)
        ],
        [
            Paragraph("<b>Design & UI/UX</b>", style_body),
            Paragraph("Apple Human Interface Guidelines (HIG), Micro-interactions, Accessibility, Clean Layouts", style_body)
        ],
        [
            Paragraph("<b>Methodologies & Teamwork</b>", style_body),
            Paragraph("Challenge-Based Learning (CBL), Git/GitHub Version Control, Clean Architecture, Cross-Collaboration", style_body)
        ]
    ]

    t_skills = Table(skills, colWidths=[46 * mm, 128 * mm])
    t_skills.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#F5F5F7")),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor("#1D1D1F")),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E5EA")),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D1D6")),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 3.5 * mm))

    # 3. Featured Project 1
    story.append(Paragraph("03. FEATURED CASE STUDY 1 — PUBLIC HEALTH DATA INTELLIGENCE", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E5EA"), spaceBefore=1, spaceAfter=3))

    p1_content = [
        [Paragraph("<b>UNICEF Indonesia: Interactive Nutrition & Stunting Analytics Dashboard</b>", style_proj_title)],
        [Paragraph("Role: Lead Data Analyst & Frontend Developer  |  Tech: Python, Streamlit, Pandas, Plotly Express", style_proj_tag)],
        [Spacer(1, 1 * mm)],
        [Paragraph("&bull; <b>The Challenge:</b> Child stunting and malnutrition are critical public health crises across Indonesia. Public health datasets are often complex and tabular, making multi-variable trend discovery difficult for non-technical policymakers and field advocates.", style_bullet)],
        [Paragraph("&bull; <b>Engineering & Implementation:</b> Architected a dynamic, web-based analytics dashboard featuring multi-dimensional filtering across indicators (Stunting, Wasting, Overweight, Exclusive Breastfeeding), gender, residence, and wealth quintiles with real-time reactive KPI updates.", style_bullet)],
        [Paragraph("&bull; <b>Socio-Demographic Insights:</b> Uncovered strong negative correlation between maternal education level and stunting prevalence, and highlighted healthcare access disparities between urban and rural populations.", style_bullet)],
        [Paragraph("&bull; <b>Performance & Export:</b> Integrated in-memory data caching (<code>@st.cache_data</code>) for instantaneous query execution and built an automated filtered dataset CSV exporter.", style_bullet)]
    ]
    t_p1 = Table(p1_content, colWidths=[174 * mm])
    t_p1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#FAFAFC")),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E5EA")),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_p1)

    # Page Break for clean 2-page layout
    story.append(PageBreak())

    # ================= PAGE 2 =================
    # 4. Featured Project 2
    story.append(Paragraph("04. FEATURED CASE STUDY 2 — GAME ENGINE & CREATIVE ENGINEERING", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E5EA"), spaceBefore=1, spaceAfter=3))

    p2_content = [
        [Paragraph("<b>Neon Runner: 2D Retro Cyber Synthwave Arcade Game Engine</b>", style_proj_title)],
        [Paragraph("Role: Creative Technologist & Game Developer  |  Tech: Vanilla JavaScript (ES6+), HTML5 Canvas 2D, Web Audio API", style_proj_tag)],
        [Spacer(1, 1 * mm)],
        [Paragraph("&bull; <b>The Challenge:</b> Developing an engaging, 60 FPS endless runner game entirely from scratch without external game frameworks (Unity/Phaser), implementing native physics, particle simulation, and audio synthesis.", style_bullet)],
        [Paragraph("&bull; <b>Physics & Engine Engineering:</b> Built a custom requestAnimationFrame game loop with state management, gravity, jump dynamics, multi-layered parallax backgrounds, and precise AABB (Axis-Aligned Bounding Box) collision detection.", style_bullet)],
        [Paragraph("&bull; <b>Audio & Particle Synthesis:</b> Engineered real-time Canvas particle emitters (dust clouds, landing sparks, defeat explosion) and synthesized 8-bit sound effects using the native browser Web Audio API oscillators.", style_bullet)],
        [Paragraph("&bull; <b>Progression & Persistence:</b> Designed procedural obstacle generation with adaptive speed curves and LocalStorage high-score persistence.", style_bullet)]
    ]
    t_p2 = Table(p2_content, colWidths=[174 * mm])
    t_p2.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#FAFAFC")),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E5EA")),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_p2)
    story.append(Spacer(1, 4 * mm))

    # 5. Featured Project 3
    story.append(Paragraph("05. FEATURED CASE STUDY 3 — UI/UX & INTERACTIVE FRONT-END", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E5EA"), spaceBefore=1, spaceAfter=3))

    p3_content = [
        [Paragraph("<b>NeoCalc: Premium Glassmorphic Calculator Application</b>", style_proj_title)],
        [Paragraph("Role: UI/UX Front-End Engineer  |  Tech: HTML5, CSS3 (Glassmorphism & Backdrop Filter), Vanilla JavaScript", style_proj_tag)],
        [Spacer(1, 1 * mm)],
        [Paragraph("&bull; <b>The Challenge:</b> Creating an Apple-inspired desktop calculator that pairs sophisticated aesthetic elegance with robust mathematical accuracy and full keyboard accessibility.", style_bullet)],
        [Paragraph("&bull; <b>Design & Aesthetics:</b> Engineered a responsive glassmorphic UI using CSS backdrop-filter blur, dynamic neon glow gradients, and tactile micro-interactions.", style_bullet)],
        [Paragraph("&bull; <b>Precision Engineering:</b> Solved floating-point arithmetic precision issues (e.g., 0.1 + 0.2 = 0.3) with dedicated number sanitization and dynamic scientific notation for extreme values.", style_bullet)],
        [Paragraph("&bull; <b>Accessibility:</b> Implemented bidirectional physical keyboard event listeners alongside touch/mouse interfaces for frictionless usability.", style_bullet)]
    ]
    t_p3 = Table(p3_content, colWidths=[174 * mm])
    t_p3.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#FAFAFC")),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E5EA")),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_p3)
    story.append(Spacer(1, 4.5 * mm))

    # 6. CBL & Vision
    story.append(Paragraph("06. CHALLENGE-BASED LEARNING (CBL) & VISION FOR APPLE ACADEMY", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E5EA"), spaceBefore=1, spaceAfter=3))

    callout_data = [[
        Paragraph(
            "<b>VISION & COMMITMENT TO APPLE DEVELOPER ACADEMY</b><br/>"
            "I aspire to bring my data-driven problem solving and creative engineering to develop high-impact native iOS and iPadOS applications. "
            "At the Apple Developer Academy, I aim to master <b>Swift, SwiftUI, CoreML, and Apple HealthKit</b>, collaborating across multidisciplinary teams within "
            "the <b>Challenge-Based Learning (CBL)</b> framework (Engage, Investigate, Act) to build world-class digital solutions for real community impact.",
            style_callout
        )
    ]]
    t_callout = Table(callout_data, colWidths=[174 * mm])
    t_callout.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F0F6FF")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#0071E3")),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_callout)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF created successfully at: {filename}")

if __name__ == "__main__":
    base_dir = r"D:\Stunting Prediction"
    docx_path = os.path.join(base_dir, "Portfolio_Apple_Developer_Academy_Antariksa.docx")
    pdf_path = os.path.join(base_dir, "Portfolio_Apple_Developer_Academy_Antariksa.pdf")
    
    build_docx(docx_path)
    build_pdf(pdf_path)
