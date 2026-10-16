"use client";

import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, ArrowRight, Check, Plus, Minus, Menu, X, Search, MapPin, Code2, FileText, ChevronDown, Download, CheckCheck, MousePointer2 } from "lucide-react";
import { Brand } from "./brand";

type ReviewRequest = { plan?: string; website?: string };
const ReviewContext = createContext<(request?: ReviewRequest) => void>(() => {});
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export function ReviewProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [request, setRequest] = useState<ReviewRequest>({});
  const [ready, setReady] = useState(false);
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [formKey, setFormKey] = useState(0);
  function open(value: ReviewRequest = {}) { setRequest(value); setReady(false); setCopied(false); setFormKey(v => v + 1); dialog.current?.showModal(); }
  useEffect(() => {
    const modal = dialog.current;
    function lock() { document.body.style.overflow = modal?.open ? "hidden" : ""; }
    const observer = new MutationObserver(lock);
    if (modal) observer.observe(modal, { attributes: true, attributeFilter: ["open"] });
    return () => { observer.disconnect(); document.body.style.overflow = ""; };
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `UPSHIFT — SEO review request\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nWebsite: ${data.get("website") || "New website"}\nInterested in: ${data.get("service")}\nGoal: ${data.get("goal")}\n\nPlease contact me about my SEO review.`;
    setBrief(text); setReady(true);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "upshift-seo-brief.txt"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <ReviewContext.Provider value={open}>{children}<dialog ref={dialog} aria-label="Request a free SEO review" className="review-dialog" onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}><button className="dialog-close icon-button" aria-label="Close review request" onClick={() => dialog.current?.close()}><X size={22}/></button>{!ready ? <><span className="eyebrow"><span/> LET’S FIND YOUR NEXT STEP</span><h2>A fresh pair of eyes.<br/><em>A clearer way forward.</em></h2><p>Tell us a little about your business. Start with a focused review of your visibility and three priorities to explore.</p><form key={formKey} onSubmit={submit} className="review-form"><div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Alex Smith" maxLength={100}/></label><label>Work email<input type="email" name="email" autoComplete="email" required placeholder="alex@yourbusiness.co.uk" maxLength={200}/></label></div><label>Your website <span className="optional">(leave blank if you’re starting fresh)</span><input name="website" placeholder="yourbusiness.co.uk" defaultValue={request.website} maxLength={300}/></label><label>I’m interested in<select name="service" defaultValue={request.plan || "A free SEO review"}><option>A free SEO review</option><option>Local SEO — £495/month</option><option>Growth SEO — £995/month</option><option>Scale SEO — from £1,795/month</option><option>SEO Health Check — £395</option><option>SEO Refresh — from £1,250</option><option>New website — from £2,950</option></select><ChevronDown className="select-chevron" size={16}/></label><label>What would a good result look like?<textarea name="goal" required placeholder="More local enquiries, a website refresh, growing online sales…" rows={3} maxLength={2000}/></label><button className="button button-orange" type="submit">Prepare my review request <ArrowUpRight size={18}/></button><p className="form-privacy">Your details stay in this browser until you choose to email them. <a href="/privacy/">Privacy details</a>.</p></form></> : <div className="brief-ready"><span className="ready-icon"><Check size={30}/></span><span className="eyebrow">A GOOD FIRST STEP</span><h2>Your brief.<br/><em>Ready to go.</em></h2><p>{contactEmail ? "Open your email app to send your request. You can also keep a copy of your brief." : "Your request is prepared. This preview has no business inbox connected, so nothing has been sent. You can save your brief below."}</p><pre>{brief}</pre>{contactEmail ? <a className="button button-orange" href={`mailto:${contactEmail}?subject=${encodeURIComponent("My free SEO review")}&body=${encodeURIComponent(brief)}`}>Email my request <ArrowUpRight size={18}/></a> : null}<div className="brief-actions"><button className="button button-dark" onClick={download}>Download brief <Download size={17}/></button><button className="button button-outline" onClick={async () => { try { await navigator.clipboard.writeText(brief); setCopied(true); } catch { download(); } }}>{copied ? "Copied" : "Copy brief"}{copied ? <CheckCheck size={17}/> : <FileText size={17}/>}</button></div></div>}</dialog></ReviewContext.Provider>;
}

export function ReviewButton({ children, className = "button button-orange", plan, website }: { children: ReactNode; className?: string; plan?: string; website?: string }) {
  const open = useContext(ReviewContext);
  return <button className={className} onClick={() => open({ plan, website })}>{children}</button>;
}

export function Header() {
  const [menu, setMenu] = useState(false);
  return <header className="site-header"><div className="container header-inner"><Brand/><nav aria-label="Main navigation" className={menu ? "main-nav is-open" : "main-nav"}><a href="#services" onClick={() => setMenu(false)}>What we do</a><a href="#approach" onClick={() => setMenu(false)}>Our approach</a><a href="#pricing" onClick={() => setMenu(false)}>Pricing</a><a href="#questions" onClick={() => setMenu(false)}>FAQs</a><ReviewButton className="mobile-review button button-orange">Let’s talk growth <ArrowUpRight size={17}/></ReviewButton></nav><ReviewButton className="header-cta button button-dark">Let’s talk growth <ArrowUpRight size={16}/></ReviewButton><button className="mobile-menu icon-button" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div></header>;
}

export function HeroReview() {
  const [website, setWebsite] = useState("");
  const open = useContext(ReviewContext);
  return <form className="hero-review-form" onSubmit={e => { e.preventDefault(); open({ website }); }}><label className="sr-only" htmlFor="hero-url">Your website address</label><span className="url-icon"><Search size={18}/></span><input id="hero-url" name="website" placeholder="Your website URL" value={website} onChange={e => setWebsite(e.target.value)} aria-label="Your website URL" maxLength={300}/><button type="submit">Find my opportunities <ArrowUpRight size={18}/></button></form>;
}

const serviceSets = {
  existing: [
    { icon: Search, number:"01", title:"Find what’s holding you back.", description:"A proper look under the bonnet. We uncover crawl issues, missed searches and pages that aren’t pulling their weight.", tags:["Technical SEO", "Search & competitor audit"] },
    { icon: FileText, number:"02", title:"Make every page earn its place.", description:"Better structure. Sharper content. Clearer next steps. Turn your existing website into something people find and want to use.", tags:["On-page optimisation", "Content that converts"] },
    { icon: MapPin, number:"03", title:"Become the local first choice.", description:"Show up for people who need what you offer, where you offer it. Bring your website and Google Business Profile into focus.", tags:["Local SEO", "Google Business Profile"] },
  ],
  new: [
    { icon: Search, number:"01", title:"Start with what people search.", description:"We map your services to real customer intent before a single page is designed. A website with a commercial plan from day one.", tags:["Keyword & market research", "Search-led architecture"] },
    { icon: Code2, number:"02", title:"Build it beautifully. Build it fast.", description:"A bespoke Next.js website, crafted for mobile, accessible journeys and fast loading. With technical SEO built into the foundations.", tags:["Next.js development", "Mobile-first design"] },
    { icon: MousePointer2, number:"03", title:"Launch ready to win enquiries.", description:"Compelling service pages, clear calls to action and measurement set up properly. Then a practical plan for what comes next.", tags:["Conversion-focused pages", "Launch & measurement"] },
  ],
};

export function ServiceExplorer() {
  const [tab, setTab] = useState<"existing" | "new">("existing");
  return <><div className="service-switch" role="tablist" aria-label="Choose your website starting point"><button id="existing-tab" role="tab" aria-selected={tab === "existing"} aria-controls="service-panel" className={tab === "existing" ? "active" : ""} onClick={() => setTab("existing")}>I have a website <ArrowUpRight size={16}/></button><button id="new-tab" role="tab" aria-selected={tab === "new"} aria-controls="service-panel" className={tab === "new" ? "active" : ""} onClick={() => setTab("new")}>I need a new website <ArrowUpRight size={16}/></button></div><div id="service-panel" role="tabpanel" aria-labelledby={`${tab}-tab`} className="service-grid">{serviceSets[tab].map(service => <article className="service-card" key={service.number}><div className="service-card-top"><service.icon size={29} strokeWidth={1.4}/><span>{service.number} /</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><div className="service-footer"><span><Check size={16}/> WordPress, Shopify, Wix, Squarespace or something bespoke. We start where you are.</span><a className="text-link" href="#pricing">Find your fit <ArrowRight size={17}/></a></div></>;
}

export function OpportunityCalculator() {
  const [visitors, setVisitors] = useState(1000);
  const [conversion, setConversion] = useState(2);
  const [value, setValue] = useState(250);
  const [growth, setGrowth] = useState(50);
  const extraEnquiries = visitors * growth / 100 * conversion / 100;
  const extraValue = extraEnquiries * value;
  const currency = (v: number) => new Intl.NumberFormat("en-GB", { style:"currency", currency:"GBP", maximumFractionDigits:0 }).format(v);
  return <div className="calculator"><div className="calculator-inputs"><div className="calculator-caption"><span className="eyebrow">PUT SOME NUMBERS TO IT</span><span>01 — YOUR STARTING POINT</span></div><label htmlFor="visitors">Monthly organic visitors <output>{visitors.toLocaleString("en-GB")}</output></label><input id="visitors" type="range" min="100" max="10000" step="100" value={visitors} onChange={e => setVisitors(Number(e.target.value))}/><div className="calculator-fields"><label>Visitor-to-enquiry rate<div className="number-field"><input aria-label="Visitor to enquiry conversion rate" type="number" min="0.1" max="100" step="0.1" value={conversion} onChange={e => setConversion(Math.min(100, Math.max(0, Number(e.target.value))))}/><span>%</span></div></label><label>Value per enquiry<div className="number-field"><span>£</span><input aria-label="Expected revenue per enquiry in pounds" type="number" min="0" max="100000" step="10" value={value} onChange={e => setValue(Math.min(100000, Math.max(0, Number(e.target.value))))}/></div></label></div><p>Use expected revenue per enquiry, allowing for the enquiries that won’t become sales.</p><div className="growth-scenario"><label htmlFor="growth">Explore a traffic increase <output>+{growth}%</output></label><input id="growth" type="range" min="10" max="150" step="10" value={growth} onChange={e => setGrowth(Number(e.target.value))}/></div></div><div className="calculator-result" aria-live="polite"><span className="eyebrow">A LITTLE MORE TRAFFIC COULD MEAN</span><span className="result-enquiries">+{Number(extraEnquiries.toFixed(1))}<span>enquiries / month</span></span><div className="result-value"><span>{currency(extraValue)}</span><span>potential extra revenue per month</span></div><ReviewButton className="button button-cream">Let’s explore your opportunity <ArrowUpRight size={18}/></ReviewButton><p>Illustrative scenario, not a forecast. Assumes conversion rate and value stay constant. Revenue is before costs; traffic growth is not guaranteed.</p></div></div>;
}

const monthly = [
  { name:"Local", label:"BECOME THE NEARBY GO-TO", price:"495", suffix:"/ month", description:"For independent businesses ready to get found in their area.", features:["One location, focused local strategy", "Google Business Profile optimisation", "Up to 3 priority pages improved / month", "Local citation checks & guidance", "Monthly visibility & enquiry report"], cta:"Let’s grow locally", plan:"Local SEO — £495/month", featured:false },
  { name:"Growth", label:"TURN VISIBILITY INTO MOMENTUM", price:"995", suffix:"/ month", description:"For ambitious businesses with more services and bigger goals.", features:["Everything in Local", "Up to 6 priority pages improved / month", "2 researched content pieces / month", "Technical fixes & internal linking", "Competitor tracking & monthly call"], cta:"Find my next gear", plan:"Growth SEO — £995/month", featured:true },
  { name:"Scale", label:"COMPETE ON A BIGGER STAGE", price:"1,795", prefix:"from", suffix:"/ month", description:"For competitive markets, online shops and multiple locations.", features:["A bespoke, agreed monthly roadmap", "Up to 10 priority pages / month", "4 researched content pieces / month", "Technical & e-commerce SEO", "Outreach planning & strategy reviews"], cta:"Let’s talk bigger", plan:"Scale SEO — from £1,795/month", featured:false },
];
const projects = [
  { name:"Health Check", label:"KNOW WHERE YOU STAND", price:"395", suffix:"one-off", description:"A focused audit and an actionable plan for a small business website.", features:["Up to 25 core URLs reviewed", "Technical & on-page checks", "Search opportunity snapshot", "Prioritised action plan", "30-minute walkthrough"], cta:"Get a clearer picture", plan:"SEO Health Check — £395", featured:false },
  { name:"SEO Refresh", label:"GET YOUR EXISTING SITE MOVING", price:"1,250", prefix:"from", suffix:"one-off", description:"A focused improvement sprint for a website that deserves better.", features:["Health Check included", "Up to 8 service pages optimised", "Metadata & internal link improvements", "Agreed technical fixes", "Before & after handover report"], cta:"Refresh my website", plan:"SEO Refresh — from £1,250", featured:true },
  { name:"Fresh Start", label:"A BETTER BEGINNING", price:"2,950", prefix:"from", suffix:"one-off", description:"A bespoke new website, built to look good and get found.", features:["Up to 5 bespoke Next.js pages", "Search-led structure & page copy", "Responsive, accessible design", "Metadata, sitemap & schema setup", "Launch support & owner handover"], cta:"Build something better", plan:"New website — from £2,950", featured:false },
];

export function Pricing() {
  const [mode, setMode] = useState<"monthly" | "projects">("monthly");
  return <><div className="pricing-switch" role="group" aria-label="Pricing type"><button aria-pressed={mode === "monthly"} className={mode === "monthly" ? "active" : ""} onClick={() => setMode("monthly")}>Monthly momentum</button><button aria-pressed={mode === "projects"} className={mode === "projects" ? "active" : ""} onClick={() => setMode("projects")}>One-off projects</button></div><div className="pricing-grid">{(mode === "monthly" ? monthly : projects).map(plan => <article key={plan.name} className={`price-card${plan.featured ? " featured" : ""}`}>{plan.featured ? <span className="price-recommendation"><span>↗</span> {mode === "monthly" ? "THE SWEET SPOT FOR GROWING BUSINESSES" : "A FOCUSED STEP FORWARD"}</span> : null}<span className="price-eyebrow">{plan.label}</span><h3>{plan.name}<span>↗</span></h3><p className="plan-description">{plan.description}</p><div className="plan-price">{"prefix" in plan ? <span className="price-from">{plan.prefix}</span> : null}<span>£{plan.price}</span><span className="price-period">{plan.suffix}</span></div><ReviewButton className={`button ${plan.featured ? "button-orange" : "button-outline"}`} plan={plan.plan}>{plan.cta}<ArrowUpRight size={17}/></ReviewButton><span className="included-label">HERE’S WHAT’S INCLUDED</span><ul>{plan.features.map(feature => <li key={feature}><Check size={16}/>{feature}</li>)}</ul></article>)}</div><div className="pricing-footnote"><p>{mode === "monthly" ? "Monthly plans: 3-month initial term, then rolling monthly with 30 days’ notice. No separate setup fee." : "Projects are scoped and quoted before work begins. 50% to start, 50% on handover. Hosting, domains and ongoing SEO quoted separately."}</p><p>All prices in GBP, excluding VAT where applicable. Scope agreed in writing. No paid ads, paid placements or guaranteed rankings.</p></div><div className="pricing-help"><span>Not sure where to start? <b>That’s what the first conversation is for.</b></span><ReviewButton className="text-link">Find my fit <ArrowUpRight size={17}/></ReviewButton></div></>;
}

export const faqs = [
  { q:"Can you improve the website I already have?", a:"Usually, yes. We can work with WordPress, Shopify, Wix, Squarespace and custom websites. We review what can be improved within your platform and permissions before recommending a scope. If a rebuild would be better value, we explain why and price it separately." },
  { q:"How long does SEO take to work?", a:"Some technical and on-page changes can make a difference within weeks, but meaningful organic growth often takes several months. Your starting point, competition and implementation speed all matter. We set a baseline, agree useful measures and review progress monthly. There are no guaranteed timelines or positions." },
  { q:"What am I actually paying for each month?", a:"A defined amount of practical work: research, page improvements, content, technical fixes and reporting, according to your plan. We agree priorities before work starts and show what changed, what the data says and what comes next. Extra development or third-party costs require an agreed quote." },
  { q:"Can you guarantee the number one spot on Google?", a:"No responsible SEO provider can promise a particular ranking. Search engines control their results. Our commitment is to sound technical work, useful content, clear reporting and a strategy focused on qualified enquiries, rather than promises we cannot control." },
  { q:"Will SEO help with AI search results too?", a:"Clear, crawlable pages, useful first-hand information and accurate structured data support discoverability across search experiences. We build those foundations into the work. Inclusion or citations in Google AI features, ChatGPT or other answer engines cannot be guaranteed." },
  { q:"Do I have to commit to a long contract?", a:"Monthly SEO plans have a three-month initial term so there is time to research, implement and review. After that, plans roll monthly with 30 days’ notice. One-off projects have a fixed, agreed scope. Your domain, website and accounts remain under your control." },
];

export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return <div className="faq-list">{faqs.map((item, i) => <div className={`faq-item${active === i ? " expanded" : ""}`} key={item.q}><h3><button aria-expanded={active === i} aria-controls={`faq-answer-${i}`} onClick={() => setActive(active === i ? null : i)}><span>{item.q}</span>{active === i ? <Minus size={19}/> : <Plus size={19}/>}</button></h3><div id={`faq-answer-${i}`} hidden={active !== i}><p>{item.a}</p></div></div>)}</div>;
}
