import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import hero from "@/assets/hero.jpg";
import interior from "@/assets/interior.jpg";
import gHair from "@/assets/g-hair.jpg";
import gBrows from "@/assets/g-brows.jpg";
import gNails from "@/assets/g-nails.jpg";
import gSkin from "@/assets/g-skin.jpg";
import gCut from "@/assets/g-cut.jpg";
import gColor from "@/assets/g-color.jpg";
import ba1 from "@/assets/ba-1.jpg";
import ba2 from "@/assets/ba-2.jpg";
import stylist1 from "@/assets/stylist-1.jpg";
import stylist2 from "@/assets/stylist-2.jpg";
import stylist3 from "@/assets/stylist-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMÈRE Studio — Quiet Luxury Hair, Skin, Nails & Brows" },
      {
        name: "description",
        content:
          "Upscale beauty atelier in the heart of the city. Senior specialists for hair, skin, brows and nails. Rated 4.9 by 600+ clients. Book your appointment.",
      },
      { property: "og:title", content: "LUMÈRE Studio — Quiet Luxury Beauty Atelier" },
      {
        property: "og:description",
        content: "Senior specialists for hair, skin, brows and nails. Same-week appointments.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Landing,
});

/* ---------- helpers ---------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${className}`} fill="currentColor" aria-hidden="true">
      <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.66l5.9-.86L10 1.5z" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[var(--gold)]">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} />
      ))}
    </span>
  );
}

function Hairline({ className = "" }: { className?: string }) {
  return <div className={`hairline ${className}`} />;
}

function CTAButton({
  children,
  href = "#booking",
  size = "md",
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const sizes = {
    sm: "h-10 px-5 text-[12px]",
    md: "h-12 px-7 text-[12px]",
    lg: "h-14 px-9 text-[13px]",
  };
  const styles =
    variant === "solid"
      ? "bg-[var(--ink)] text-[var(--cream)] hover:bg-black"
      : "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)]";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-none font-sans font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${sizes[size]} ${styles} ${className}`}
    >
      {children}
      <span aria-hidden="true" className="inline-block translate-y-px">→</span>
    </a>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
      <span className="h-px w-8 bg-[var(--gold)]/60" />
      <span>{children}</span>
    </div>
  );
}

/* ---------- data ---------- */

const services = [
  {
    cat: "Hair",
    items: [
      { name: "Signature Cut & Style", duration: "75 min", price: "$140" },
      { name: "Dimensional Balayage", duration: "3 hr", price: "$320", popular: true },
      { name: "Gloss & Tone Refresh", duration: "60 min", price: "$110" },
      { name: "Bridal Hair Design", duration: "2 hr", price: "$280" },
    ],
  },
  {
    cat: "Skin & Brows",
    items: [
      { name: "LUMÈRE Glow Facial", duration: "75 min", price: "$185" },
      { name: "Brow Lamination & Tint", duration: "45 min", price: "$95" },
      { name: "Dermaplane + Mask", duration: "60 min", price: "$160" },
      { name: "Lash Lift & Tint", duration: "60 min", price: "$120" },
    ],
  },
  {
    cat: "Nails",
    items: [
      { name: "Atelier Manicure", duration: "60 min", price: "$75" },
      { name: "Russian Gel Manicure", duration: "90 min", price: "$110" },
      { name: "Spa Pedicure", duration: "75 min", price: "$95" },
      { name: "Nail Art (per design)", duration: "30 min", price: "$25+" },
    ],
  },
];

const stylists = [
  {
    name: "Camille Roux",
    role: "Creative Director · Colourist",
    bio: "12 yrs · Trained at Sassoon London. Specialty: lived-in balayage.",
    img: stylist1,
  },
  {
    name: "Amara Okafor",
    role: "Lead Esthetician",
    bio: "Licensed medical aesthetician. Specialty: barrier-first glow facials.",
    img: stylist2,
  },
  {
    name: "Yuna Park",
    role: "Master Nail Artist",
    bio: "Certified Russian manicure educator. Specialty: minimalist nail design.",
    img: stylist3,
  },
];

const testimonials = [
  {
    quote:
      "I've been to every \"top\" salon in the city. LUMÈRE is the first place where I left thinking — that's exactly the hair I imagined.",
    name: "Sofia M.",
    detail: "Balayage client",
  },
  {
    quote:
      "Calm, considered, beautifully done. My skin has not looked this good in a decade. Booking my next four facials before I even left.",
    name: "Elena V.",
    detail: "Glow Facial member",
  },
  {
    quote:
      "Yuna is an artist. Two weeks in and the manicure still looks like I just walked out the door. Worth every penny.",
    name: "Priya K.",
    detail: "Russian Gel client",
  },
  {
    quote:
      "From the moment you walk in it feels like a private atelier, not a salon. Camille listened and gave me the cut I'd been describing for years.",
    name: "Daniela R.",
    detail: "Signature Cut client",
  },
];

const gallery = [
  { src: gColor, caption: "Sunlit Balayage · Camille" },
  { src: gNails, caption: "Atelier Manicure · Yuna" },
  { src: gSkin, caption: "LUMÈRE Glow Facial · Amara" },
  { src: gHair, caption: "Editorial Styling · Camille" },
  { src: gBrows, caption: "Brow Lamination · Amara" },
  { src: gCut, caption: "The Signature Cut · Camille" },
];

/* ---------- page ---------- */

function Landing() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--cream)]">
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <TrustMarquee />
        <Services />
        <Gallery />
        <About />
        <Testimonials />
        <Booking />
        <Footer />
      </main>
      <MobileStickyBar />
    </div>
  );
}

/* ---------- header ---------- */

function Header({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--border)]/70 bg-[var(--cream)]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 py-4 md:px-10 md:py-5">
        <a href="#top" className="flex items-baseline gap-2 min-w-0">
          <span className="font-serif text-2xl tracking-tight">LUMÈRE</span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--muted-foreground)]">
            Studio
          </span>
        </a>
        <nav className="hidden items-center justify-center gap-9 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[11px] uppercase tracking-[0.22em] text-[var(--ink)]/80 transition hover:text-[var(--ink)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 justify-self-end">
          <a
            href="tel:+15551234567"
            className="hidden text-[11px] uppercase tracking-[0.22em] text-[var(--ink)]/80 hover:text-[var(--ink)] md:inline"
          >
            (555) 123-4567
          </a>
          <CTAButton href="#booking" size="sm" className="hidden sm:inline-flex">
            Book Now
          </CTAButton>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 right-0 top-0 h-px bg-[var(--ink)] transition ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 right-0 bottom-0 h-px bg-[var(--ink)] transition ${
                  open ? "-translate-y-1 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden border-t border-[var(--border)]/60 bg-[var(--cream)] lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        } transition-[max-height] duration-500`}
      >
        <nav className="flex flex-col px-5 py-4">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--border)]/50 py-4 text-[12px] uppercase tracking-[0.25em]"
            >
              {n.label}
            </a>
          ))}
          <a
            href="tel:+15551234567"
            className="py-4 text-[12px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]"
          >
            (555) 123-4567
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative pt-24 md:pt-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 pb-16 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
        <div className="flex flex-col justify-center pt-6 lg:pt-12">
          <div className="reveal">
            <SectionLabel>Atelier · Est. 2013</SectionLabel>
          </div>
          <h1 className="reveal mt-6 font-serif text-[44px] leading-[1.02] tracking-tight sm:text-[60px] md:text-[78px] lg:text-[88px]">
            Walk out feeling
            <br />
            <span className="italic text-[var(--ink)]/90">like the best</span>
            <br />
            version of you.
          </h1>
          <p className="reveal mt-6 max-w-md text-[15px] leading-relaxed text-[var(--muted-foreground)]">
            An unhurried beauty atelier for hair, skin, brows and nails — by
            senior specialists who treat your appointment like the only one
            that day.
          </p>

          <div className="reveal mt-9 flex flex-col items-start gap-4">
            <CTAButton href="#booking" size="lg">
              Book My Appointment
            </CTAButton>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--muted-foreground)]">
              <Stars />
              <span className="text-[var(--ink)]">4.9</span>
              <span>by 600+ clients</span>
              <span aria-hidden="true">·</span>
              <span>Same-week appointments</span>
            </div>
            <a
              href="tel:+15551234567"
              className="text-[12px] uppercase tracking-[0.25em] underline-offset-4 hover:underline"
            >
              Or call · (555) 123-4567
            </a>
          </div>

          <div className="reveal mt-12 grid grid-cols-3 gap-6 border-t border-[var(--border)]/70 pt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)] sm:gap-10">
            <div>
              <div className="font-serif text-2xl text-[var(--ink)] sm:text-3xl">12+</div>
              <div className="mt-1">Years of craft</div>
            </div>
            <div>
              <div className="font-serif text-2xl text-[var(--ink)] sm:text-3xl">600+</div>
              <div className="mt-1">Five-star reviews</div>
            </div>
            <div>
              <div className="font-serif text-2xl text-[var(--ink)] sm:text-3xl">VOGUE</div>
              <div className="mt-1">As featured in</div>
            </div>
          </div>
        </div>

        <div className="reveal relative">
          <div className="absolute -left-3 -top-3 hidden h-24 w-px bg-[var(--gold)]/60 lg:block" />
          <div className="absolute -left-3 -top-3 hidden h-px w-24 bg-[var(--gold)]/60 lg:block" />
          <div className="relative overflow-hidden bg-[var(--sand)]">
            <img
              src={hero}
              alt="Editorial portrait of a LUMÈRE Studio client"
              width={1280}
              height={1600}
              className="h-[520px] w-full object-cover sm:h-[620px] lg:h-[760px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--ink)]/10 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-6 hidden bg-[var(--cream)] px-5 py-4 shadow-[var(--shadow-soft)] sm:block">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              Now booking
            </div>
            <div className="mt-1 font-serif text-xl">This week · 6 openings</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- marquee strip ---------- */

function TrustMarquee() {
  const items = [
    "VOGUE",
    "HARPER'S BAZAAR",
    "ELLE",
    "REFINERY29",
    "THE CUT",
    "ALLURE",
    "INTO THE GLOSS",
  ];
  return (
    <section className="border-y border-[var(--border)]/70 bg-[var(--cream)]">
      <div className="overflow-hidden py-5">
        <div className="flex w-max animate-marquee gap-16 px-8 text-[11px] uppercase tracking-[0.4em] text-[var(--muted-foreground)]">
          {[...items, ...items, ...items].map((it, i) => (
            <span key={i} className="whitespace-nowrap">
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- services ---------- */

function Services() {
  return (
    <section id="services" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1300px]">
        <div className="reveal flex flex-col gap-5">
          <SectionLabel>The Menu</SectionLabel>
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Three studios.
            <br />
            <span className="italic">One devoted standard.</span>
          </h2>
          <p className="max-w-xl text-[15px] text-[var(--muted-foreground)]">
            Transparent pricing, generous time, and a senior specialist for every
            service. No upsell, no rush — just the result you came for.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-[var(--border)]/70 lg:grid-cols-3">
          {services.map((s) => {
            const isMid = s.cat === "Skin & Brows";
            return (
              <div
                key={s.cat}
                className={`reveal relative flex flex-col bg-[var(--cream)] p-8 md:p-10 ${
                  isMid ? "lg:-my-6 lg:bg-[var(--card)] lg:shadow-[var(--shadow-card)]" : ""
                }`}
              >
                {isMid && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-2 bg-[var(--ink)] px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[var(--cream)]">
                    <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />
                    Most Booked
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-3xl">{s.cat}</h3>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                    {String(services.indexOf(s) + 1).padStart(2, "0")}
                  </span>
                </div>
                <Hairline className="my-6" />
                <ul className="flex flex-1 flex-col gap-5">
                  {s.items.map((it) => (
                    <li key={it.name} className="grid grid-cols-[1fr_auto] gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[15px] text-[var(--ink)]">{it.name}</span>
                          {it.popular && (
                            <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--blush)]">
                              ★ popular
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                          {it.duration}
                        </div>
                      </div>
                      <div className="font-serif text-xl text-[var(--ink)]">{it.price}</div>
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-[var(--ink)] underline-offset-[6px] hover:underline"
                >
                  Reserve your slot
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- gallery ---------- */

function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section id="gallery" className="bg-[var(--sand)]/40 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel>Signature Results</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              The work,
              <br />
              <span className="italic">unretouched.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-[var(--muted-foreground)]">
            Real clients. Real results. Every photo below is from the LUMÈRE
            chair — no filters, no extensions added in post.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { src: ba1, caption: "Before · After — Dimensional Balayage" },
            { src: ba2, caption: "Before · After — Brow Lamination" },
          ].map((b) => (
            <figure key={b.src} className="reveal group relative overflow-hidden bg-[var(--cream)]">
              <button
                type="button"
                onClick={() => setLightbox(b.src)}
                className="block w-full"
                aria-label={`Enlarge ${b.caption}`}
              >
                <img
                  src={b.src}
                  alt={b.caption}
                  loading="lazy"
                  width={1400}
                  height={900}
                  className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-[1.02] md:h-[400px]"
                />
              </button>
              <figcaption className="flex items-center justify-between gap-4 border-t border-[var(--border)]/70 px-5 py-4 text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                <span>{b.caption}</span>
                <span className="text-[var(--ink)]">↗ Enlarge</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="reveal group relative aspect-[4/5] overflow-hidden bg-[var(--cream)]"
            >
              <button
                type="button"
                onClick={() => setLightbox(g.src)}
                className="block h-full w-full"
                aria-label={`Enlarge ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  width={1000}
                  height={1200}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 text-left text-[10px] uppercase tracking-[0.22em] text-[var(--cream)] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {g.caption}
                </figcaption>
              </button>
            </figure>
          ))}
        </div>

        <div className="reveal mt-12 flex justify-center">
          <CTAButton href="#booking">Book This Look</CTAButton>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-[var(--ink)]/90 p-6 backdrop-blur"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <img src={lightbox} alt="Enlarged work" className="max-h-[88vh] max-w-[92vw] object-contain" />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center border border-[var(--cream)]/40 text-[var(--cream)]"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="reveal relative">
          <img
            src={interior}
            alt="Inside the LUMÈRE Studio atelier"
            loading="lazy"
            width={1600}
            height={1100}
            className="h-[420px] w-full object-cover sm:h-[560px]"
          />
          <div className="absolute -bottom-6 -right-4 hidden bg-[var(--ink)] px-6 py-5 text-[var(--cream)] sm:block">
            <div className="font-serif text-3xl">est. 2013</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.3em] opacity-70">
              Independent · Family-owned
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="reveal">
            <SectionLabel>Our Story</SectionLabel>
          </div>
          <h2 className="reveal mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            A quieter kind
            <br />
            <span className="italic">of beautiful.</span>
          </h2>
          <p className="reveal mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--muted-foreground)]">
            LUMÈRE was founded on a simple principle: your appointment is not a
            transaction. It's a craft. Every service runs on its true time,
            every guest is paired with the specialist best suited to the work,
            and every result is built to last beyond the chair.
          </p>

          <div className="reveal mt-12">
            <SectionLabel>Meet the Specialists</SectionLabel>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stylists.map((s) => (
                <figure key={s.name} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--sand)]">
                    <img
                      src={s.img}
                      alt={s.name}
                      loading="lazy"
                      width={900}
                      height={1100}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <div className="font-serif text-xl">{s.name}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-[var(--blush)]">
                      {s.role}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted-foreground)]">
                      {s.bio}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

function Testimonials() {
  const [i, setI] = useState(0);
  const len = testimonials.length;
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % len), 7000);
    return () => clearInterval(t);
  }, [len]);

  return (
    <section id="reviews" className="bg-[var(--ink)] px-5 py-24 text-[var(--cream)] md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 lg:grid-cols-[auto_1fr] lg:gap-24">
        <div className="reveal flex flex-col">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--cream)]/60">
            <span className="h-px w-8 bg-[var(--gold)]/70" />
            What clients say
          </div>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            4.9 ★
            <br />
            <span className="italic text-[var(--cream)]/85">on Google.</span>
          </h2>
          <div className="mt-8 inline-flex items-center gap-3 self-start border border-[var(--cream)]/30 px-4 py-3">
            <Stars />
            <div className="text-[11px] uppercase tracking-[0.22em]">
              Google · 612 reviews
            </div>
          </div>
        </div>

        <div className="reveal relative min-h-[280px]">
          <div className="absolute -left-2 -top-2 font-serif text-[120px] leading-none text-[var(--gold)]/30 sm:text-[160px]">
            “
          </div>
          <div key={i} className="relative animate-[fade-in_0.7s_ease-out]">
            <p className="font-serif text-2xl leading-[1.35] text-[var(--cream)] sm:text-[32px] md:text-[38px]">
              {testimonials[i].quote}
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--cream)]/20 pt-5">
              <div>
                <div className="text-[13px] text-[var(--cream)]">{testimonials[i].name}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/60">
                  {testimonials[i].detail}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Review ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-px transition-all ${
                      idx === i ? "w-10 bg-[var(--gold)]" : "w-5 bg-[var(--cream)]/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- booking ---------- */

function Booking() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section id="booking" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="reveal flex flex-col justify-between gap-10">
          <div>
            <SectionLabel>Book Your Visit</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Claim my
              <br />
              <span className="italic">spot.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--muted-foreground)]">
              Tell us a little about what you'd like. A senior stylist will
              confirm your appointment by text within the hour — usually much
              sooner.
            </p>
          </div>
          <figure className="border-l-2 border-[var(--gold)]/70 pl-5">
            <Stars />
            <blockquote className="mt-3 font-serif text-xl leading-snug text-[var(--ink)] sm:text-2xl">
              "Booked Friday, in the chair Saturday. The easiest yes I've ever
              given a salon."
            </blockquote>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
              Mira L. · Glow Facial
            </figcaption>
          </figure>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="reveal border border-[var(--border)] bg-[var(--card)] p-7 shadow-[var(--shadow-card)] sm:p-10"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Your name" name="name" required placeholder="Jane Doe" />
            <Field label="Phone or email" name="contact" required placeholder="(555) 555-5555" />
            <Field
              as="select"
              label="Service"
              name="service"
              required
              options={[
                "Choose a service",
                "Signature Cut & Style",
                "Dimensional Balayage",
                "LUMÈRE Glow Facial",
                "Brow Lamination & Tint",
                "Russian Gel Manicure",
                "Something else",
              ]}
            />
            <Field type="date" label="Preferred date" name="date" required />
          </div>
          <div className="mt-6">
            <Field
              as="textarea"
              label="Notes (optional)"
              name="notes"
              placeholder="Tell us about your hair, your goals, references…"
            />
          </div>
          <button
            type="submit"
            className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 bg-[var(--ink)] px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--cream)] transition hover:bg-black"
          >
            {sent ? "Request received ✓" : "Book My Appointment"}
            <span aria-hidden="true">→</span>
          </button>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
            Free to reschedule · No deposit required
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  as,
  type = "text",
  required,
  placeholder,
  options,
}: {
  label: string;
  name: string;
  as?: "textarea" | "select";
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}) {
  const base =
    "mt-2 block w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-2.5 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted-foreground)]/60 focus:border-[var(--ink)] focus:outline-none focus:ring-0";
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
        {label}
        {required && <span className="text-[var(--blush)]"> ·</span>}
      </span>
      {as === "textarea" ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={base} />
      ) : as === "select" ? (
        <select name={name} required={required} className={base} defaultValue="">
          {options?.map((o, i) => (
            <option key={o} value={i === 0 ? "" : o} disabled={i === 0}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--border)]/70 bg-[var(--cream)] px-5 pt-20 pb-28 md:px-10 md:pb-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-serif text-3xl">LUMÈRE</span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--muted-foreground)]">
              Studio
            </span>
          </a>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[var(--muted-foreground)]">
            An independent beauty atelier devoted to slow, thoughtful work —
            for hair, skin, brows and nails.
          </p>
          <div className="mt-6">
            <CTAButton href="#booking">Book Now</CTAButton>
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            Visit
          </div>
          <address className="mt-4 not-italic text-[14px] leading-relaxed">
            218 Linden Avenue
            <br />
            Suite 3 · Atelier Floor
            <br />
            New York, NY 10013
          </address>
          <a
            href="tel:+15551234567"
            className="mt-4 inline-block text-[14px] underline-offset-4 hover:underline"
          >
            (555) 123-4567
          </a>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            Hours
          </div>
          <ul className="mt-4 space-y-1.5 text-[14px]">
            <li className="flex justify-between gap-4"><span>Tue – Thu</span><span className="text-[var(--muted-foreground)]">10 – 8</span></li>
            <li className="flex justify-between gap-4"><span>Fri – Sat</span><span className="text-[var(--muted-foreground)]">9 – 7</span></li>
            <li className="flex justify-between gap-4"><span>Sunday</span><span className="text-[var(--muted-foreground)]">11 – 5</span></li>
            <li className="flex justify-between gap-4"><span>Monday</span><span className="text-[var(--muted-foreground)]">Closed</span></li>
          </ul>
          <div className="mt-5 flex gap-4 text-[12px] uppercase tracking-[0.22em]">
            <a href="#" className="hover:text-[var(--blush)]">Instagram</a>
            <a href="#" className="hover:text-[var(--blush)]">Pinterest</a>
            <a href="#" className="hover:text-[var(--blush)]">TikTok</a>
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            Find us
          </div>
          <div className="mt-4 relative h-44 w-full overflow-hidden border border-[var(--border)] bg-[var(--sand)]/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.06),transparent_60%),linear-gradient(135deg,transparent_0,transparent_40%,rgba(0,0,0,0.04)_50%,transparent_60%)]" />
            <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full text-[var(--ink)]/25" preserveAspectRatio="none">
              <path d="M0 70 Q60 50 100 65 T200 55" stroke="currentColor" fill="none" strokeWidth="0.7" />
              <path d="M0 30 Q70 45 120 30 T200 40" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-3 w-3 place-items-center rounded-full bg-[var(--ink)] ring-4 ring-[var(--cream)]" />
              <div className="mt-2 -translate-x-1/2 bg-[var(--ink)] px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-[var(--cream)]">
                LUMÈRE
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col items-start justify-between gap-3 border-t border-[var(--border)]/70 pt-6 text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)] sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} LUMÈRE Studio. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-[var(--ink)]">Privacy</a>
          <a href="#" className="hover:text-[var(--ink)]">Terms</a>
          <a href="#" className="hover:text-[var(--ink)]">Gift Cards</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- mobile sticky bar ---------- */

function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-3 border-t border-[var(--ink)]/20 bg-[var(--cream)]/95 p-3 backdrop-blur sm:hidden">
      <a
        href="tel:+15551234567"
        aria-label="Call LUMÈRE Studio"
        className="grid h-12 w-12 place-items-center border border-[var(--ink)] text-[var(--ink)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
        </svg>
      </a>
      <a
        href="#booking"
        className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--ink)] text-[12px] uppercase tracking-[0.22em] text-[var(--cream)]"
      >
        Book My Appointment
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
