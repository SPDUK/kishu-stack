---
name: Kishu
description: Warm editorial design that makes model routing and useful handoffs visible.
colors:
  paper: "#f6f3e9"
  ink: "#192c26"
  vermilion: "#ed5035"
  mint: "#b7d4bd"
  mint-light: "#e5ece0"
  ivory: "#fff9ec"
  muted: "#56605a"
  line: "#d2d5c8"
  coral-light: "#f1d7c9"
typography:
  display:
    fontFamily: "Bricolage, Georgia, serif"
    fontSize: "clamp(54px, 6.6vw, 88px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage, Georgia, serif"
    fontSize: "clamp(36px, 4.2vw, 56px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Bricolage, Georgia, serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.08
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  introduction:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  detail:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  compact:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "Geist Mono, monospace"
    fontSize: "12px"
    lineHeight: 1.85
rounded:
  control: "6px"
  panel: "14px"
spacing:
  related: "12px"
  control: "16px"
  group: "24px"
  panel: "32px"
  gutter: "48px"
  section: "104px"
---

# Kishu design system

The existing Japanese-inspired studio identity remains: warm paper, deep green ink, mint, restrained vermilion accents, Bricolage display type, and an unnamed puppy. The hierarchy now leads with routing and handoffs. The puppy appears as a small accent and logo, without a character name, separate showcase, or download offer.

## Composition

The hero pairs a value statement with a concrete request → router → planner → implementer illustration. The full-width footer ties this to the visitor’s existing editor. A five-step editorial flow then names the mechanism explicitly: prompt, Kishu router, pstack plan/build, conditional Impeccable guidance, and clear output. The sequence numbers convey order.

The mint walkthrough section holds one joined workspace: prompt above, dark route controls on the left, and a light handoff artifact on the right. The benefit below explains why the current step helps. Visitors can play, pause, resume, inspect any step, or go directly to the result. Backend work omits the design stage.

The model section pairs concrete benefits with a role picker. Peach marks deep reasoning, mint marks efficient coding, and a quiet neutral marks the current model. Text names every choice; color never stands alone. These are illustrative profiles, not measured cost or latency. A dark output section shows a concise handback. The real site case study, installation, and explicit upstream attribution follow.

## Type and surfaces

Bricolage carries display headings. Geist carries explanations, labels, and controls. Geist Mono is reserved for commands and sequence numbers. Supporting text has a 12px minimum, including narrow screens; ordinary paragraphs are 14–18px. Artifact headings range from 26–32px, section headings from 34–56px, and the hero from 45–88px across breakpoints. Tracking never falls below -0.04em.

Most sections use open editorial spacing and thin rules. The route illustration and walkthrough use selective soft depth, with no extra outer border. The model picker has a single fine border and no shadow. Controls use a 6px radius; major work surfaces use 14px. The puppy is an original raster asset, not a replacement drawing.

## Responsive behavior

- Above 850px: hero, model section, output, and installation use paired columns. The workflow overview runs horizontally.
- At 850px and below: those major regions stack. The overview becomes a readable vertical sequence; its copy is not reduced to a row of tiny cards.
- At 600px and below: the demo steps become a compact horizontal control strip directly above the artifact. The active role remains visible in the detail pane. The five-step and four-step scenarios each fill the available width.
- At 400px and below: each model selector sits beneath its label at full width, so long profile names remain readable.
- Gutters change from 48px to 36px, 28px, 20px, then 16px. Touch controls remain at least 44px tall.

## Motion and accessibility

Motion has a quiet, deliberate rhythm. Hero copy arrives in a short stagger; the route surface settles over 850ms, then the puppy gives a 1.25s curious tilt and small lift. Hover, keyboard focus, or a tap offers another greeting. The wordmark stamp also tips briefly on hover or focus. These are bounded gestures with no idle loop.

Section text and surfaces enter once as they reach the viewport: a 620–760ms fade with 8–14px of travel and gentle deceleration. An open FAQ answer settles over 320ms. Focus immediately cancels a section entrance so controls remain fully visible. A bounded line draw connects the hero’s routing stages. Selecting a demo step replaces the artifact with a 360ms horizontal reveal; interrupted transitions cancel cleanly. Step selection and model choices use 180–250ms color feedback.

Playback advances at 2.6 seconds per step and always has pause/resume and direct step controls. Leaving the visible page pauses it and cancels decorative motion. Reduced-motion preference removes spatial animation, including greetings and entrances, and completes playback immediately; manually inspecting steps still works. Motion uses progressive enhancement: content is visible without JavaScript, and no entrance leaves persistent hidden styles behind.

Use semantic headings, ordered flows, native select controls, keyboard-operable tab lists, visible focus, live status messages, and a skip link. Content is visible before JavaScript. Failed clipboard access leaves the commands and setup request available for manual selection.

## Product language and attribution

Kishu owns the working experience. Explain model roles through user outcomes: focus expensive reasoning, reduce repeated exploration, and parallelize independent work when helpful. Do not claim universal savings or invent benchmark numbers. Explicit credits retain pstack, Impeccable, i-have-adhd, their authors, and their licenses. Historical raster prompts remain provenance, not public mascot naming.
