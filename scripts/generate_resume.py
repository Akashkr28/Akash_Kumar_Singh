#!/usr/bin/env python3
"""Generate Akash Kumar Singh resume PDF via ReportLab."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer,
    HRFlowable, KeepTogether, Table, TableStyle,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY

TEAL       = HexColor('#0B7A93')
DARK       = HexColor('#1a1a1a')
GREY       = HexColor('#555555')
LIGHT_GREY = HexColor('#888888')
RULE_GREY  = HexColor('#cccccc')

# Points-per-inch reference: 72 pt = 1 inch

OUTPUT = '/Users/akashkumarsingh/Akash_Kumar_Singh/public/resume.pdf'

# ── Styles ────────────────────────────────────────────────────────────────────

name_style = ParagraphStyle('Name',
    fontName='Helvetica-Bold', fontSize=23, textColor=DARK,
    spaceAfter=1, leading=27)

subtitle_style = ParagraphStyle('Subtitle',
    fontName='Helvetica', fontSize=9, textColor=GREY,
    spaceAfter=2, leading=12)

contact_style = ParagraphStyle('Contact',
    fontName='Helvetica', fontSize=8, textColor=GREY,
    spaceAfter=4, leading=10.5)

section_style = ParagraphStyle('Section',
    fontName='Helvetica-Bold', fontSize=9.8, textColor=TEAL,
    spaceBefore=4, spaceAfter=2, leading=13)

body_style = ParagraphStyle('Body',
    fontName='Helvetica', fontSize=8.4, textColor=DARK,
    spaceAfter=2, leading=12, alignment=TA_JUSTIFY)

proj_title_style = ParagraphStyle('ProjTitle',
    fontName='Helvetica-Bold', fontSize=8.8, textColor=DARK,
    spaceAfter=1, leading=11.5)

proj_meta_style = ParagraphStyle('ProjMeta',
    fontName='Helvetica', fontSize=7.4, textColor=LIGHT_GREY,
    spaceAfter=1, leading=10)

bullet_style = ParagraphStyle('Bullet',
    fontName='Helvetica', fontSize=8.4, textColor=DARK,
    spaceAfter=0.8, leading=11, leftIndent=10, firstLineIndent=-8)

skill_label_style = ParagraphStyle('SkillLabel',
    fontName='Helvetica-Bold', fontSize=8.4, textColor=DARK, leading=12)

skill_value_style = ParagraphStyle('SkillValue',
    fontName='Helvetica', fontSize=8.4, textColor=DARK, leading=12)

subsection_style = ParagraphStyle('SubSection',
    fontName='Helvetica-BoldOblique', fontSize=8.6, textColor=TEAL,
    spaceBefore=2, spaceAfter=2, leading=11.5)

# ── Helpers ───────────────────────────────────────────────────────────────────

def section(title):
    return [
        Paragraph(title, section_style),
        HRFlowable(width='100%', thickness=0.5, color=RULE_GREY, spaceAfter=3),
    ]

def bullet(text):
    return Paragraph(f'• {text}', bullet_style)

def project_block(title, meta, bullets, gap=2):
    items = (
        [Paragraph(title, proj_title_style), Paragraph(meta, proj_meta_style)]
        + [bullet(b) for b in bullets]
        + [Spacer(1, gap)]
    )
    return KeepTogether(items)

# ── Content ───────────────────────────────────────────────────────────────────

def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=letter,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.40 * inch,
        bottomMargin=0.38 * inch,
    )

    story = []

    # Header
    story.append(Paragraph('Akash Kumar Singh', name_style))
    story.append(Paragraph(
        'Full Stack Developer · AI/ML &amp; Prompt Engineering · MCA Student',
        subtitle_style))
    story.append(Paragraph(
        'akashkumarsingh816@gmail.com  '
        'github.com/Akashkr28  '
        'linkedin.com/in/akash-kumar-singh-2a3503364  '
        'India',
        contact_style))
    story.append(HRFlowable(width='100%', thickness=1.5, color=TEAL, spaceAfter=6))

    # Summary
    story.extend(section('SUMMARY'))
    story.append(Paragraph(
        'Full-stack developer and MCA student (AI &amp; ML) at Amity University Online. '
        'Builds real-time web applications and prompt-engineering tools — from Kafka-powered location trackers '
        'to OWASP LLM01 red-teaming platforms — with all projects deployed and accessible online. '
        'Deepening expertise in distributed systems, generative AI, and modern web architecture. '
        'Actively seeking internships, freelance work, and entry-level full-time opportunities.',
        body_style))

    # Technical Skills
    story.extend(section('TECHNICAL SKILLS'))

    skills = [
        ('Frontend',             'React, Next.js, TypeScript, Tailwind CSS, Framer Motion'),
        ('Backend',              'Node.js, Express, FastAPI, Apache Kafka, WebSockets, REST APIs'),
        ('Databases',            'PostgreSQL, Redis, SQLite, MongoDB'),
        ('Languages',            'JavaScript, TypeScript, Python'),
        ('AI / ML &amp; Prompt', 'NumPy, core ML algorithms, LLM API integration, Anthropic Claude, Prompt Engineering'),
        ('Tools',                'Git, GitHub, Vercel, Turborepo, tRPC, Docker (learning) · React Native / Flutter (exploring)'),
    ]

    skill_data = [
        [Paragraph(k, skill_label_style), Paragraph(v, skill_value_style)]
        for k, v in skills
    ]
    skill_table = Table(skill_data, colWidths=[1.35 * inch, None])
    skill_table.setStyle(TableStyle([
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING',   (0, 0), (-1, -1), 0),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1.5),
        ('TOPPADDING',    (0, 0), (-1, -1), 0),
    ]))
    story.append(skill_table)

    # Projects
    story.extend(section('PROJECTS'))

    story.append(project_block(
        'ChaiForm — Form Builder SaaS',
        'Next.js · TypeScript · Express · PostgreSQL · Turborepo · tRPC · Drizzle ORM · Zod'
        '  |  chaiforms-web-hjco.onrender.com  |  github.com/Akashkr28/ChaiForm_Form_Builder_SaaS',
        [
            'Production-grade Typeform-inspired form builder on a Turborepo monorepo — Google OAuth, '
            'dynamic field schemas, response analytics, CSV export, type-safe tRPC API with Drizzle ORM &amp; Zod, '
            'email notifications, and honeypot spam protection.',
        ]
    ))

    story.append(project_block(
        'Pulseboard — Live Polling &amp; Feedback Platform',
        'React · TypeScript · Node.js · Socket.io  |  pulse-board-live-poll-for-feedback.vercel.app  |  github.com/Akashkr28/PulseBoard-Live-Poll-for-Feedback',
        [
            'Real-time collaborative polling platform; instant vote-count updates broadcast to all connected '
            'clients via WebSocket with shareable links and live result visualization.',
        ]
    ))

    story.append(project_block(
        '1 Million Checkboxes — Collaborative Real-time App',
        'React · Node.js · Redis  |  million-checkboxes-xtg8.onrender.com  |  github.com/Akashkr28/1-million-checkboxes',
        [
            'Synchronized 1,000,000 shared checkboxes across all concurrent users in real-time via WebSocket '
            'broadcast with an optimized rendering pipeline for consistent DOM performance.',
        ]
    ))

    story.append(project_block(
        'Real-time Location Tracker — Kafka-powered GPS System',
        'React · Apache Kafka · Node.js · Leaflet.js  |  github.com/Akashkr28/location-tracker',
        [
            'Streamed live GPS coordinates through Kafka topics for high-throughput, fault-tolerant event '
            'delivery; rendered sub-second map updates using Leaflet.js on the consumer side.',
        ]
    ))

    # Prompt Engineering sub-heading
    story.append(Paragraph('Prompt Engineering Projects', subsection_style))

    story.append(project_block(
        'Sentinel — Prompt Injection &amp; Attack Defense',
        'Next.js · TypeScript · Python · SQLite · Anthropic Claude API'
        '  |  sentinel-prompt-injection.vercel.app  |  github.com/Akashkr28/Sentinel_Prompt_Injection_Attack_and_Defense',
        [
            'Full-stack OWASP LLM01 red-teaming platform with dual-layer detection — heuristic regex (&lt;1 ms) '
            'and LLM-as-judge semantic grading — benchmarking 21 payloads across 5 injection categories '
            'with 8 benign controls for honest false-positive measurement.',
        ]
    ))

    story.append(project_block(
        'PromptForge — Automated Prompt Optimizer',
        'Next.js · TypeScript · Python · FastAPI · SQLite · Anthropic Claude API'
        '  |  prompt-forge-a-prompt-optimizer-too.vercel.app  |  github.com/Akashkr28/Prompt_Forge_A_Prompt_Optimizer_Tool',
        [
            'Self-improving prompt engine that iterates execute → evaluate → optimize loops via meta-prompting '
            'and concurrent LLM sampling, tracking gains through live score curves, word-level diffs, '
            'and searchable session history.',
        ],
        gap=1
    ))

    # Education
    story.extend(section('EDUCATION'))
    story.append(KeepTogether([
        Paragraph('Master of Computer Applications (MCA) — AI &amp; ML Specialization', proj_title_style),
        Paragraph('Amity University Online · 2023 – Present · 3rd Semester (Current)', proj_meta_style),
        bullet('Coursework: Machine Learning, Data Structures, Distributed Systems, Python for AI; '
               'applied through production-grade real-time and AI-driven projects deployed throughout the programme.'),
    ]))

    # Additional
    story.extend(section('ADDITIONAL'))
    story.append(Paragraph(
        '<b>Interests:</b> Open-source development, real-time systems architecture, generative AI, '
        'prompt engineering, mobile-first UX. '
        '<b>Languages:</b> English (professional), Hindi (native). '
        '<b>Availability:</b> Immediately available for internships, freelance projects, and entry-level full-time roles.',
        body_style))

    doc.build(story)
    print(f'Resume generated → {OUTPUT}')

if __name__ == '__main__':
    build()
