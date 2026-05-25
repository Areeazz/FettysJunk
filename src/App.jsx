import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Menu,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const heroPoster = "/images/hero-poster.jpg";
const heroVideoSources = [
  { src: "/videos/hero-720.mp4", media: "(max-width: 767px)" },
  { src: "/videos/hero-1080.mp4" },
];
const aboutImage = {
  src: "/images/about-fettys-community.jpg",
  webp: [
    { src: "/images/about-fettys-community-640.webp", width: 640 },
    { src: "/images/about-fettys-community-960.webp", width: 960 },
  ],
};
const jobberFormUrl = "https://l.jbbr.io/eOcGjij";

const developerCredit = {
  name: "Areeaz",
  links: [
    { label: "Instagram", href: "https://www.instagram.com/mullenix_/" },
    { label: "GitHub", href: "https://github.com/Areeazz" },
    { label: "X", href: "https://x.com/Areeaz" },
    { label: "Portfolio" },
  ],
};

const services = [
  {
    title: "Construction Debris",
    copy: "Final cleanup, leftover materials, and site debris handled with tidy, professional speed.",
    image: {
      src: "/images/construction-debris-service.jpg",
      webp: [
        { src: "/images/construction-debris-service-480.webp", width: 480 },
        { src: "/images/construction-debris-service-900.webp", width: 900 },
      ],
    },
    alt: "Construction debris removal and property cleanup service in Belle Isle and Orlando",
  },
  {
    title: "Household Junk",
    copy: "Moving, clearing, refreshing, or reclaiming space without the weekend-long headache.",
    image: {
      src: "/images/household-junk-service.jpg",
      webp: [
        { src: "/images/household-junk-service-480.webp", width: 480 },
        { src: "/images/household-junk-service-900.webp", width: 900 },
      ],
    },
    alt: "Residential furniture removal and household junk hauling for Belle Isle and Orlando homes",
  },
  {
    title: "Miscellaneous Garbage",
    copy: "Odd piles, random loads, garage corners, and the things that do not fit cleanly in a category.",
    image: {
      src: "/images/misc-garbage-service.jpg",
      webp: [
        { src: "/images/misc-garbage-service-480.webp", width: 480 },
        { src: "/images/misc-garbage-service-768.webp", width: 768 },
      ],
    },
    alt: "Miscellaneous junk hauling services and garage cleanup near Belle Isle FL",
  },
];

const workItems = [
  {
    id: "work-montage-2",
    type: "video",
    title: "Transformation",
    label: "Transformation",
    sources: [
      { src: "/videos/work-montage-2-mobile.mp4", media: "(max-width: 640px)" },
      { src: "/videos/work-montage-2.mp4" },
    ],
    poster: "/images/work-montage-2-poster.jpg",
    ariaLabel: "Transformation video showing junk removal and property cleanup results in Belle Isle and Orlando",
  },
  {
    id: "results-montage",
    type: "video",
    title: "Transformation",
    label: "Transformation",
    sources: [
      { src: "/videos/results-montage-mobile.mp4", media: "(max-width: 640px)" },
      { src: "/videos/results-montage.mp4" },
    ],
    poster: "/images/results-montage-poster.jpg",
    ariaLabel: "Transformation video showing veteran-owned junk removal work in the Orlando area",
  },
  {
    id: "cleanout-transformation",
    type: "beforeAfter",
    title: "Cleanout Transformation",
    before: {
      src: "/Before1.jpg",
      webp: [
        { src: "/Before1-640.webp", width: 640 },
        { src: "/Before1-960.webp", width: 960 },
      ],
    },
    after: {
      src: "/After1.jpg",
      webp: [
        { src: "/After1-640.webp", width: 640 },
        { src: "/After1-960.webp", width: 960 },
      ],
    },
    beforeAlt: "Before junk removal cleanup with debris ready for hauling in Belle Isle and Orlando",
    afterAlt: "After junk removal cleanup showing a cleared property in Belle Isle and Orlando",
  },
  {
    id: "space-reclaimed",
    type: "beforeAfter",
    title: "Space Reclaimed",
    before: {
      src: "/Before2.jpg",
      webp: [
        { src: "/Before2-640.webp", width: 640 },
        { src: "/Before2-960.webp", width: 960 },
      ],
    },
    after: {
      src: "/After2.jpg",
      webp: [
        { src: "/After2-640.webp", width: 640 },
        { src: "/After2-960.webp", width: 960 },
      ],
    },
    beforeAlt: "Before property cleanup and junk hauling service in the Orlando area",
    afterAlt: "After property cleanup with outdoor space reclaimed after junk removal",
  },
];

const testimonials = [
  {
    name: "Kelly Pachinger Ballinger",
    text: "Great hardworking guy! Highly recommend.",
    rating: 5,
  },
  {
    name: "Celina Galvan Horton",
    text: "The team was so friendly, and made what felt like an overwhelming job completely stress-free. If you're looking for reliable and hardworking professionals to help with junk removal, I highly recommend them. I will definitely be using them again in the future!",
    rating: 5,
  },
  {
    name: "Veterans Fence Company",
    text: "Awesome service. 5 stars always. Highly recommend. He will get the job done right, every time.",
    rating: 5,
  },
  {
    name: "Siri Otnip",
    text: "Highly recommend...very polite, reliable and honest. We would definitely use his service again.",
    rating: 5,
  },
  {
    name: "Angela Ann",
    text: "Quick to respond, on time, polite and he gave me a fair price.",
    rating: 5,
  },
];

function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function useNearViewport(ref, rootMargin = "360px 0px") {
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isNearViewport) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isNearViewport, ref, rootMargin]);

  return isNearViewport;
}

function JobberLink({ children, className = "", onClick, ariaLabel }) {
  return (
    <a
      href={jobberFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

function ResponsiveImage({ image, alt, className = "", loading = "lazy", sizes, fetchPriority }) {
  const webpSrcSet = image.webp?.map((entry) => `${entry.src} ${entry.width}w`).join(", ");

  return (
    <picture className="block h-full w-full">
      {webpSrcSet ? (
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      ) : null}
      <img
        src={image.src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        sizes={sizes}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.48]);

  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-ink">
      <Hero
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        heroScale={heroScale}
        heroOpacity={heroOpacity}
      />
      <About />
      <Services />
      <Results />
      <BookingCTA />
      <Testimonials />
      <Footer />
    </main>
  );
}

function Hero({ menuOpen, setMenuOpen, heroScale, heroOpacity }) {
  const navItems = [
    { label: "About", to: "about" },
    { label: "Services", to: "services" },
    { label: "Real Results", to: "work" },
    { label: "Reviews", to: "reviews" },
    { label: "Contact", to: "contact" },
  ];

  return (
    <section id="home" className="relative h-screen min-h-[42rem] overflow-hidden bg-midnight text-cream">
      <h1 className="sr-only">
        Veteran-owned junk removal in Belle Isle and Orlando, Florida
      </h1>
      <motion.div
        className="absolute inset-0"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.62] contrast-110 saturate-[0.86]"
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          aria-label="Fetty's Junk Removal background video"
        >
          {heroVideoSources.map((source) => (
            <source
              key={source.src}
              src={source.src}
              media={source.media}
              type="video/mp4"
            />
          ))}
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/78 via-navy/48 to-periwinkle/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/74 via-navy/10 to-midnight/28" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(157,188,244,0.26),transparent_32rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight to-transparent" />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Fetty's Junk Removal home">
          <span className="dark-glass-button grid h-11 w-11 place-items-center rounded-full font-display text-lg text-cream">
            F
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-mist/82">
            Fetty's
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.to}
              href={`#${item.to}`}
              className="text-sm font-medium text-mist/70 transition hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <JobberLink
          className="dark-glass-pill hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-mist/86 transition hover:-translate-y-0.5 hover:text-cream md:flex"
          ariaLabel="Get a free quote in Jobber"
        >
          Get Quote
          <ArrowRight size={16} />
        </JobberLink>
        <button
          className="dark-glass-button grid h-11 w-11 place-items-center rounded-full text-mist md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <motion.nav
          className="dark-glass-card relative z-20 mx-5 rounded-lg p-4 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <a
              key={item.to}
              href={`#${item.to}`}
              className="block py-3 text-sm font-semibold text-mist/82 transition hover:text-cream"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <JobberLink
            className="dark-glass-pill mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-mist/88 transition hover:text-cream"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Get a Free Quote
            <ArrowRight size={16} />
          </JobberLink>
        </motion.nav>
      )}

      <div className="relative z-10 mx-auto flex h-[calc(100%-88px)] max-w-7xl items-end px-5 pb-20 pt-8 sm:px-8 sm:pb-24 md:justify-end">
        <motion.div
          className="max-w-sm md:max-w-md md:text-right"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="dark-glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-mist/84 md:ml-auto">
            <Sparkles size={14} />
            Belle Isle & Orlando junk removal
          </p>
          <p className="max-w-md text-base leading-7 text-mist/78 sm:text-lg md:ml-auto">
            Veteran-owned junk removal, hauling services, property cleanup, and cleanouts across Belle Isle, Orlando, Conway, Edgewood, and nearby neighborhoods.
          </p>
          <div className="mt-7 md:inline-flex md:flex-col md:items-end">
            <JobberLink className="inline-flex items-center gap-3 rounded-full bg-periwinkle/90 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cream shadow-soft transition hover:-translate-y-1 hover:bg-coral hover:text-midnight">
              Free Quote
              <ArrowRight size={18} />
            </JobberLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const values = ["Veteran-Owned Local Service", "Father & Son Operated", "Community-Focused"];

  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(77,88,143,0.24),transparent_30rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-coral/25 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <FadeIn className="relative order-last max-w-3xl lg:order-none">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-coral">
            About Fetty's
          </p>
          <h2 className="font-display text-4xl leading-none text-cream sm:text-6xl lg:text-7xl">
            Father & Son. Veteran-Owned. Built on Trust.
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-mist/68">
            <p>
              We are a father-and-son team with a simple mission: help keep our community clean, one neighbor at a time. As a veteran-owned junk removal service, we bring discipline, respect, and pride into every job.
            </p>
            <p>
              Whether it is a driveway, siding, patio, garage, or full property cleanup, Fetty's Junk Removal is built on honest work, dependable service, and care for the people and neighborhoods we serve.
            </p>
            <p>
              Every job is handled with clear communication, respect for your space, and pride in the final sweep because trust is earned one neighbor at a time.
            </p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value}
                className="dark-glass flex items-center gap-3 rounded-lg px-4 py-4 text-sm font-bold text-cream"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-coral/16 text-coral">
                  <Check size={16} />
                </span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.12} className="relative order-first lg:order-none">
          <motion.div
            className="group relative isolate"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute -inset-4 -z-10 rounded-[1.65rem] bg-[radial-gradient(circle_at_50%_42%,rgba(60,125,224,0.24),transparent_65%)] blur-2xl transition duration-700 group-hover:opacity-90" />
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06] bg-midnight/45 shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
              <ResponsiveImage
                image={aboutImage}
                alt="Father and son team behind Fetty's Junk Removal, a veteran-owned local service"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                sizes="(min-width: 1024px) 42vw, 100vw"
                loading="lazy"
              />
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative bg-navy px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(77,88,143,0.3),transparent_30rem)]" />
      <div className="mx-auto max-w-7xl">
        <FadeIn className="relative mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-coral">
              Services
            </p>
            <h2 className="font-display text-4xl leading-none text-cream sm:text-6xl">
              Junk Removal Services Built Around What You Need Gone
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-mist/62">
            From single-item pickups to full cleanouts, Fetty's helps remove unwanted junk quickly, respectfully, and professionally.
          </p>
        </FadeIn>

        <div className="relative grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.08}>
              <motion.article
                className="dark-glass-card group h-full overflow-hidden rounded-lg"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-md">
                  <ResponsiveImage
                    image={service.image}
                    alt={service.alt}
                    className="h-full w-full object-cover saturate-[0.88] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/72 via-periwinkle/10 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-cream">{service.title}</h3>
                  <p className="mt-3 min-h-24 leading-7 text-mist/58">{service.copy}</p>
                  <JobberLink
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-coral transition group-hover:text-cream"
                  >
                    Book Service
                    <ArrowRight size={16} />
                  </JobberLink>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoSoundOn, setActiveVideoSoundOn] = useState(false);
  const videoRefs = useRef([]);
  const itemCount = workItems.length;

  const muteAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (!video) return;

      video.muted = true;
      video.volume = 0;
      video.play().catch(() => {});
    });
  };

  const goToSlide = (index) => {
    muteAllVideos();
    setActiveVideoSoundOn(false);
    setActiveIndex((index + itemCount) % itemCount);
  };

  const registerVideoRef = (index, node) => {
    videoRefs.current[index] = node;
  };

  const syncVideoPlayback = (index, shouldPlaySound = false) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.defaultMuted = true;
    video.muted = !shouldPlaySound;
    video.volume = shouldPlaySound ? 1 : 0;
    video.play().catch(() => {});
  };

  const toggleVideoSound = (index) => {
    if (index !== activeIndex) return;

    const nextSoundOn = !activeVideoSoundOn;
    muteAllVideos();

    if (nextSoundOn) {
      syncVideoPlayback(index, true);
    }

    setActiveVideoSoundOn(nextSoundOn);
  };

  useEffect(() => {
    muteAllVideos();
    setActiveVideoSoundOn(false);
  }, [activeIndex]);

  const handleDragEnd = (_, info) => {
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;

    if (info.offset.x < -70 || swipePower < -8000) {
      goToSlide(activeIndex + 1);
    }

    if (info.offset.x > 70 || swipePower > 8000) {
      goToSlide(activeIndex - 1);
    }
  };

  return (
    <section id="work" className="relative overflow-hidden bg-midnight py-24 text-cream lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,26,51,0.75),rgba(7,17,31,1))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(157,188,244,0.12),transparent_34rem)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn className="mb-10 text-center">
          <h2 className="font-display text-4xl leading-none text-cream sm:text-6xl">
            Real Results
          </h2>
        </FadeIn>

        <FadeIn className="relative mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl">
            <motion.div
              className="flex touch-pan-y"
              animate={{ x: `${activeIndex * -100}%` }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              {workItems.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full shrink-0 px-1 sm:px-3"
                  aria-hidden={activeIndex !== index}
                >
                  {item.type === "video" ? (
                    <WorkVideoCard
                      item={item}
                      isActive={activeIndex === index}
                      isSoundOn={activeIndex === index && activeVideoSoundOn}
                      onToggleSound={() => toggleVideoSound(index)}
                      onSyncPlayback={(shouldPlaySound) => syncVideoPlayback(index, shouldPlaySound)}
                      setVideoRef={(node) => registerVideoRef(index, node)}
                    />
                  ) : (
                    <BeforeAfterCard item={item} isActive={activeIndex === index} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          <button
            className="dark-glass-button absolute left-0 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-mist/88 transition hover:-translate-x-1 hover:text-cream sm:grid"
            onClick={() => goToSlide(activeIndex - 1)}
            aria-label="Previous real result"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="dark-glass-button absolute right-0 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-mist/88 transition hover:translate-x-1 hover:text-cream sm:grid"
            onClick={() => goToSlide(activeIndex + 1)}
            aria-label="Next real result"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-5 flex items-center justify-center gap-4 sm:hidden">
            <button
              type="button"
              className="dark-glass-button grid h-10 w-10 place-items-center rounded-full text-mist/88 transition active:scale-95"
              onClick={() => goToSlide(activeIndex - 1)}
              aria-label="Previous real result"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center justify-center gap-2.5">
              {workItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`h-2 rounded-full transition ${
                    activeIndex === index
                      ? "w-7 border border-coral/60 bg-coral/80 shadow-[0_0_18px_rgba(77,88,143,0.16)]"
                      : "w-2 border border-coral/[0.10] bg-coral/[0.10]"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Show ${item.title} result ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              className="dark-glass-button grid h-10 w-10 place-items-center rounded-full text-mist/88 transition active:scale-95"
              onClick={() => goToSlide(activeIndex + 1)}
              aria-label="Next real result"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-8 hidden items-center justify-center gap-3 sm:flex">
            {workItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`h-2.5 rounded-full transition ${
                  activeIndex === index
                    ? "w-8 border border-coral/70 bg-coral/82 shadow-[0_0_24px_rgba(77,88,143,0.18)]"
                    : "w-2.5 border border-coral/[0.10] bg-coral/[0.10] hover:bg-coral/22"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Show ${item.title} result ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <JobberLink
              className="dark-glass-pill inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-mist/88 transition hover:-translate-y-1 hover:text-cream"
            >
              Get a Free Quote
              <ArrowRight size={18} />
            </JobberLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function WorkVideoCard({ item, isActive, isSoundOn, onToggleSound, onSyncPlayback, setVideoRef }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const shouldLoadVideo = useNearViewport(cardRef);

  const assignVideoRef = (node) => {
    videoRef.current = node;
    setVideoRef(node);
  };

  const startVideo = () => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    onSyncPlayback(isActive && isSoundOn);
  };

  useEffect(() => {
    if (!shouldLoadVideo) return undefined;

    videoRef.current?.load();
    startVideo();

    const video = videoRef.current;
    if (!video) return undefined;

    const playbackGuard = window.setInterval(() => {
      if (video.paused) {
        startVideo();
      }
    }, 1500);

    return () => window.clearInterval(playbackGuard);
  }, [isActive, isSoundOn, shouldLoadVideo]);

  return (
    <motion.article
      ref={cardRef}
      className={`dark-glass-card group relative overflow-hidden rounded-lg p-2 text-left transition ${
        isActive ? "shadow-[0_0_78px_rgba(77,88,143,0.14)]" : ""
      }`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 rounded-lg opacity-0 shadow-[0_0_70px_rgba(77,88,143,0.12)] transition duration-500 group-hover:opacity-100" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-midnight sm:aspect-[16/10]">
        <video
          ref={assignVideoRef}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
          poster={item.poster}
          autoPlay={shouldLoadVideo}
          muted={!isSoundOn}
          loop
          playsInline
          preload={shouldLoadVideo && isActive ? "metadata" : "none"}
          controls={false}
          onLoadedMetadata={startVideo}
          onCanPlay={startVideo}
          aria-label={item.ariaLabel}
        >
          {shouldLoadVideo
            ? item.sources.map((source) => (
                <source
                  key={source.src}
                  src={source.src}
                  media={source.media}
                  type="video/mp4"
                />
              ))
            : null}
        </video>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-midnight/56 via-navy/10 to-midnight/16" />
        <div className="pointer-events-none absolute inset-0 z-20 rounded-md ring-1 ring-inset ring-white/[0.035]" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_72%_16%,rgba(157,188,244,0.12),transparent_28rem)]" />
        <span className="dark-glass-pill absolute left-3 top-3 z-30 rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-mist/84 sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
          {item.label}
        </span>
        <h3 className="absolute bottom-4 left-4 z-30 max-w-[58%] text-xl font-bold leading-tight text-cream sm:bottom-5 sm:left-5 sm:max-w-[70%] sm:text-3xl">
          {item.title}
        </h3>
        <motion.button
          type="button"
          className="dark-glass-pill absolute bottom-3 right-3 z-30 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-mist/86 transition hover:text-cream disabled:pointer-events-none disabled:opacity-60 sm:bottom-4 sm:right-4 sm:gap-2 sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.14em]"
          onClick={onToggleSound}
          disabled={!isActive}
          animate={{ scale: isSoundOn ? 1.04 : 1, opacity: isSoundOn ? 1 : 0.86 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.25 }}
          aria-label={isSoundOn ? `Mute ${item.title}` : `Tap for sound on ${item.title}`}
        >
          {isSoundOn ? (
            <Volume2 className="h-3.5 w-3.5 sm:h-[17px] sm:w-[17px]" />
          ) : (
            <VolumeX className="h-3.5 w-3.5 sm:h-[17px] sm:w-[17px]" />
          )}
          <span className="sm:hidden">{isSoundOn ? "Mute" : "Sound"}</span>
          <span className="hidden sm:inline">{isSoundOn ? "Mute" : "Tap for Sound"}</span>
        </motion.button>
      </div>
    </motion.article>
  );
}

function BeforeAfterCard({ item, isActive }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.button
      type="button"
      className={`dark-glass-card group relative block w-full overflow-hidden rounded-lg p-2 text-left transition focus:outline-none focus:ring-2 focus:ring-coral/30 ${
        isActive ? "shadow-[0_0_78px_rgba(77,88,143,0.13)]" : ""
      }`}
      onClick={() => setShowAfter((value) => !value)}
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
      onFocus={() => setShowAfter(true)}
      onBlur={() => setShowAfter(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${item.title} before and after transformation`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-md sm:aspect-[16/10]">
        <picture className="absolute inset-0 block h-full w-full">
          <source
            type="image/webp"
            srcSet={item.before.webp.map((entry) => `${entry.src} ${entry.width}w`).join(", ")}
            sizes="(min-width: 768px) 70vw, 100vw"
          />
          <motion.img
            src={item.before.src}
            alt={item.beforeAlt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 70vw, 100vw"
            animate={{ opacity: showAfter ? 0 : 1, scale: showAfter ? 1.04 : 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </picture>
        <picture className="absolute inset-0 block h-full w-full">
          <source
            type="image/webp"
            srcSet={item.after.webp.map((entry) => `${entry.src} ${entry.width}w`).join(", ")}
            sizes="(min-width: 768px) 70vw, 100vw"
          />
          <motion.img
            src={item.after.src}
            alt={item.afterAlt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 70vw, 100vw"
            animate={{ opacity: showAfter ? 1 : 0, scale: showAfter ? 1.045 : 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/78 via-navy/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/[0.035]" />
        <motion.span
          className="dark-glass-pill absolute left-3 top-3 rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-mist/86 sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]"
          animate={{ opacity: showAfter ? 1 : 0.88 }}
        >
          {showAfter ? "After" : "Before"}
        </motion.span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <h3 className="max-w-[70%] text-xl font-bold leading-tight text-cream sm:text-2xl">{item.title}</h3>
        <span className="hidden text-sm font-bold uppercase tracking-[0.16em] text-coral sm:inline">
          {showAfter ? "Cleared" : "Reveal"}
        </span>
      </div>
    </motion.button>
  );
}

function BookingCTA() {
  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(77,88,143,0.28),transparent_32rem)]" />
      <FadeIn className="dark-glass-card relative mx-auto grid max-w-7xl overflow-hidden rounded-lg lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-8 text-cream sm:p-12 lg:p-16">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-mist/70">
            Booking
          </p>
          <h2 className="font-display text-4xl leading-none sm:text-6xl">
            Tell us what needs to go.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-mist/66">
            Send a few details for junk removal, furniture removal, debris hauling, or property cleanup in Belle Isle or nearby Orlando and the team will get back shortly.
          </p>
          <div className="mt-8 flex">
            <JobberLink
              className="inline-flex items-center justify-center gap-3 rounded-full bg-coral/90 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-midnight shadow-soft transition hover:-translate-y-1 hover:bg-cream"
            >
              Free Quote
              <ArrowRight size={18} />
            </JobberLink>
          </div>
        </div>
        <div className="relative grid min-h-[24rem] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_44%,rgba(157,188,244,0.18),transparent_20rem),linear-gradient(135deg,rgba(7,17,31,0.96),rgba(16,26,51,0.86))] p-10 text-center">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(157,188,244,0.08),transparent)]" />
          <motion.div
            className="relative flex flex-col items-center"
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute -inset-10 rounded-full bg-coral/10 blur-3xl" />
            <img
              src="/favicon.svg"
              alt="Fetty's Junk Removal logo"
              className="relative h-28 w-28 rounded-3xl border border-white/[0.08] bg-midnight/70 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:h-36 sm:w-36"
              loading="lazy"
              decoding="async"
            />
            <p className="relative mt-6 font-display text-3xl leading-none text-cream sm:text-4xl">
              Fetty's
            </p>
            <p className="relative mt-3 text-xs font-bold uppercase tracking-[0.22em] text-coral/85">
              Junk Removal
            </p>
          </motion.div>
        </div>
      </FadeIn>
    </section>
  );
}

function Testimonials() {
  const duplicatedReviews = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="reviews" className="relative overflow-hidden bg-navy px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(77,88,143,0.26),transparent_28rem)]" />
      <div className="mx-auto max-w-7xl">
        <FadeIn className="relative mb-12 max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-coral">
            Testimonials
          </p>
          <h2 className="font-display text-4xl leading-none text-cream sm:text-6xl">
            Client Reviews
          </h2>
          <p className="mt-6 text-lg leading-8 text-mist/62">
            Real customer recommendations for local junk removal, cleanouts, and hauling work around Belle Isle and the Orlando area.
          </p>
        </FadeIn>

        <FadeIn className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent sm:w-28" />
          <div className="review-marquee overflow-hidden py-3">
            <div className="review-marquee-track flex w-max gap-5">
              {duplicatedReviews.map((review, index) => (
                <article
                  key={`${review.name}-${index}`}
                  className="dark-glass-card w-[20rem] shrink-0 rounded-lg p-6 transition sm:w-[26rem]"
                >
                  <p className="mb-5 text-lg tracking-[0.16em] text-coral">
                    {"★".repeat(review.rating)}
                  </p>
                  <p className="min-h-36 text-base leading-7 text-mist/70 sm:text-lg">
                    "{review.text}"
                  </p>
                  <div className="mt-7 border-t border-white/[0.06] pt-4">
                    <p className="font-bold text-cream">{review.name || "Verified Client"}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-coral/80">
                      Verified Client
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/70 bg-midnight px-5 py-12 text-cream sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl">Fetty's Junk Removal</p>
            <p className="mt-3 max-w-md text-mist/62">
              Veteran-owned Belle Isle junk removal and Orlando cleanout service with a cleaner standard and the same local identity.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-mist/70 sm:grid-cols-3">
            {["Belle Isle", "info@fettysrentals.com", "425-359-7073"].map((item) => (
              <p key={item} className="inline-flex items-center gap-2">
                <Check size={15} className="text-coral" />
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-6">
          <div className="flex flex-col gap-4 text-xs text-mist/48 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Website designed &amp; developed by{" "}
              <span className="font-semibold text-mist/70">{developerCredit.name}</span>
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {developerCredit.links.map((link) => (
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full py-1 text-mist/54 underline-offset-4 transition hover:text-coral hover:underline hover:drop-shadow-[0_0_10px_rgba(157,188,244,0.24)]"
                    aria-label={`${link.label} for ${developerCredit.name}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <span key={link.label} className="rounded-full py-1 text-mist/38">
                    {link.label}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
