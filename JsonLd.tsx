:root {
  --bg: #f7f5ef;
  --surface: #ffffff;
  --surface-soft: #eef4f7;
  --text: #17252d;
  --muted: #56666f;
  --line: #d5dde0;
  --blue: #176b87;
  --blue-dark: #0b4f68;
  --green: #287a54;
  --green-soft: #e5f4ea;
  --orange: #d66b1e;
  --orange-soft: #fff0df;
  --red: #b3261e;
  --focus: #ffbf47;
  --radius: 18px;
  --shadow: 0 8px 24px rgb(24 52 64 / 8%);
  --content: 1160px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans JP", sans-serif;
  font-size: 16px;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
a { color: var(--blue-dark); text-underline-offset: .18em; }
a:hover { text-decoration-thickness: 2px; }
button, input, select { font: inherit; }
button, .button {
  min-height: 44px;
  border: 1px solid var(--blue-dark);
  border-radius: 999px;
  padding: .65rem 1.1rem;
  background: var(--surface);
  color: var(--blue-dark);
  cursor: pointer;
  font-weight: 700;
}
.button { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; }
.button.primary, button.primary { background: var(--blue-dark); color: white; }
:focus-visible { outline: 4px solid var(--focus); outline-offset: 3px; }
img { display: block; max-width: 100%; height: auto; }
h1, h2, h3 { line-height: 1.3; letter-spacing: .01em; }
h1 { font-size: clamp(2rem, 5vw, 4.25rem); margin: .25em 0; }
h2 { font-size: clamp(1.55rem, 3vw, 2.35rem); margin: 0 0 .6em; }
h3 { font-size: 1.22rem; margin: .25em 0 .55em; }
p { margin: .5em 0 1em; }
main { min-height: 60vh; }
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.skipLink {
  position: fixed;
  z-index: 1000;
  top: .5rem;
  left: .5rem;
  transform: translateY(-180%);
  padding: .7rem 1rem;
  background: white;
  border: 2px solid var(--blue-dark);
}
.skipLink:focus { transform: translateY(0); }
.siteHeader {
  position: sticky;
  top: 0;
  z-index: 50;
  min-height: 68px;
  background: rgb(255 255 255 / 96%);
  border-bottom: 1px solid var(--line);
}
.headerInner {
  width: min(calc(100% - 32px), var(--content));
  min-height: 68px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.brand { display: flex; align-items: center; gap: .6rem; color: var(--text); text-decoration: none; min-height: 44px; }
.areaSwitcher { display: flex; align-items: center; gap: .35rem; font-size: .8rem; font-weight: 700; }
.areaSwitcher select { min-height: 44px; max-width: 8.5rem; }
.brandMark { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: var(--orange-soft); color: var(--orange); font-weight: 900; }
.brand strong, .brand small { display: block; line-height: 1.15; }
.brand small { margin-top: .15rem; color: var(--muted); font-size: .7rem; letter-spacing: .08em; }
.primaryNav { display: flex; align-items: center; gap: .15rem; }
.primaryNav a { min-height: 44px; padding: .55rem .8rem; display: flex; align-items: center; border-radius: 999px; text-decoration: none; font-weight: 700; color: var(--text); }
.primaryNav a[aria-current="page"] { background: var(--surface-soft); color: var(--blue-dark); }
.menuButton { display: none; }
.page, .section {
  width: min(calc(100% - 32px), var(--content));
  margin-inline: auto;
}
.page { padding: 2rem 0 5rem; }
.section { padding-block: clamp(2.5rem, 6vw, 5.5rem); }
.sectionHeader { max-width: 720px; margin-bottom: 1.5rem; }
.eyebrow { display: block; color: var(--green); font-size: .78rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.lead { max-width: 720px; color: var(--muted); font-size: clamp(1.05rem, 2vw, 1.3rem); }
.hero {
  width: min(calc(100% - 32px), var(--content));
  margin: clamp(1rem, 3vw, 2.5rem) auto 0;
  display: grid;
  grid-template-columns: 1.04fr .96fr;
  min-height: min(680px, 75vh);
  border-radius: 28px;
  overflow: hidden;
  background: var(--surface);
  box-shadow: var(--shadow);
}
.heroCopy { padding: clamp(2rem, 5vw, 5rem); align-self: center; }
.heroCopy h1 span { color: var(--blue-dark); }
.heroActions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.5rem; }
.hero .mediaFigure, .hero .imageFrame, .hero img { height: 100%; }
.hero img { object-fit: cover; }
.mediaFigure { margin: 0; }
.imageFrame { position: relative; overflow: hidden; background: var(--surface-soft); }
.imageFrame img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.imageLabel { position: absolute; right: .65rem; bottom: .65rem; padding: .2rem .65rem; border-radius: 999px; background: rgb(0 0 0 / 70%); color: white; font-size: .75rem; font-weight: 800; }
.mediaFigure figcaption { padding: .35rem .65rem; color: var(--muted); font-size: .72rem; background: #fafafa; }
.cardGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.1rem; }
.card { min-width: 0; display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); }
.cardBody { display: flex; flex: 1; flex-direction: column; padding: 1rem; }
.cardBody h3 a::after { content: ""; position: absolute; inset: 0; }
.cardBody h3 a { position: static; }
.card { position: relative; }
.card .tagList, .card .metaLine { position: relative; z-index: 1; }
.metaLine { margin-top: auto; color: var(--muted); font-size: .86rem; }
.tagList, .chipRow { display: flex; gap: .5rem; flex-wrap: wrap; }
.tagList span, .chip { border: 1px solid var(--line); border-radius: 999px; padding: .25rem .65rem; background: var(--surface); font-size: .8rem; }
.chip { min-height: 44px; display: inline-flex; align-items: center; }
.compactMeta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .35rem .7rem; margin: .5rem 0 1rem; }
.compactMeta div { padding: .45rem .55rem; background: var(--surface-soft); border-radius: 10px; }
.compactMeta dt { font-size: .7rem; color: var(--muted); }
.compactMeta dd { margin: 0; font-weight: 750; font-size: .88rem; }
.trustPanel { margin-block: 1.5rem; padding: 1.1rem; background: var(--green-soft); border: 1px solid #a8d7b9; border-radius: var(--radius); }
.trustPanel > div:first-child { display: flex; flex-direction: column; margin-bottom: .7rem; }
.trustPanel dl { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .5rem; margin: 0; }
.trustPanel dl div { padding: .55rem; background: rgb(255 255 255 / 64%); border-radius: 10px; }
.trustPanel dt { font-size: .72rem; color: var(--muted); }
.trustPanel dd { margin: 0; font-weight: 700; }
.trustPanel summary { min-height: 44px; display: flex; align-items: center; cursor: pointer; font-weight: 700; }
.breadcrumbs ol { display: flex; flex-wrap: wrap; gap: .35rem; margin: 0 0 1.2rem; padding: 0; list-style: none; font-size: .84rem; }
.breadcrumbs li + li::before { content: "›"; margin-right: .35rem; color: var(--muted); }
.detailLayout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 2rem; align-items: start; }
.detailMain { min-width: 0; }
.summaryBox { padding: 1rem 1.1rem; border-left: 5px solid var(--orange); background: var(--orange-soft); border-radius: 0 var(--radius) var(--radius) 0; }
.summaryBox h2 { margin-top: 0; font-size: 1.05rem; }
.summaryBox dl { display: grid; gap: .55rem; margin-bottom: 0; }
.summaryBox dl div { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); gap: .7rem; }
.summaryBox dt { font-weight: 800; }
.summaryBox dd { margin: 0; }
.actionPanel { position: sticky; top: 90px; padding: 1rem; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); }
.actionPanel a, .actionPanel button { width: 100%; margin-bottom: .55rem; }
.saveShare { display: grid; gap: .55rem; }
.relatedList { display: grid; gap: .65rem; padding: 0; list-style: none; }
.relatedList a { display: block; min-height: 44px; padding: .8rem; border: 1px solid var(--line); border-radius: 12px; background: white; font-weight: 700; }
.routeSteps { counter-reset: steps; padding: 0; list-style: none; }
.routeSteps li { display: grid; grid-template-columns: 42px minmax(0, 1fr); gap: .75rem; padding: .8rem 0; border-bottom: 1px solid var(--line); }
.routeSteps li::before { content: counter(steps); counter-increment: steps; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: var(--blue-dark); color: white; font-weight: 800; }
.practicalGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .8rem; }
.practicalBox { padding: 1rem; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); }
.practicalBox ul { padding-left: 1.2rem; }
.notice { padding: 1rem; border: 1px solid #e2bd72; background: #fff8df; border-radius: var(--radius); }
.mapDiagram { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; padding: 1.2rem; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface-soft); }
.mapExplorerLayout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, .8fr); gap: 1rem; align-items: start; }
.mapPin { min-height: 72px; text-align: left; }
.mapPin span { display: inline-grid; place-items: center; width: 1.8rem; height: 1.8rem; margin-right: .4rem; border-radius: 50%; background: var(--blue-dark); color: white; }
.mapPin.isActive, .mapSpotList .isActive { outline: 3px solid var(--orange); outline-offset: 2px; }
.mapSpotList { display: grid; gap: .65rem; max-height: 34rem; overflow: auto; padding: .2rem; }
.mapArea { padding: 1rem; border: 2px solid var(--blue); border-radius: var(--radius); background: white; }
.mapArea ul { padding-left: 1.2rem; }
.filterPanel { padding: 1rem; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); }
.filterRow { display: flex; flex-wrap: wrap; gap: .65rem; align-items: end; }
.field { display: grid; gap: .25rem; min-width: min(100%, 220px); }
.field label { font-weight: 750; }
.field input, .field select { min-height: 44px; border: 1px solid #82939b; border-radius: 10px; padding: .6rem .75rem; background: white; color: var(--text); }
.activeFilters { display: flex; gap: .45rem; flex-wrap: wrap; margin-top: .8rem; }
.searchResults { display: grid; gap: .75rem; margin-top: 1rem; }
.searchResult { padding: 1rem; background: white; border: 1px solid var(--line); border-radius: var(--radius); }
.searchResult h2 { font-size: 1.1rem; margin: 0; }
.emptyState { padding: 1.5rem; border: 2px dashed #91a1a8; border-radius: var(--radius); background: white; }
.policy { max-width: 800px; }
.policy section { margin-block: 2.2rem; }
.siteFooter { padding: 3rem max(16px, calc((100% - var(--content)) / 2)) 7rem; background: #15313c; color: white; }
.siteFooter a { color: white; }
.footerGrid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; }
.footerGrid nav { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem; }
.footerGrid nav a { min-height: 44px; display: flex; align-items: center; }
.footerNote { color: #cfdee3; font-size: .9rem; }
.mobileNav { display: none; }

@media (max-width: 900px) {
  .cardGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hero { grid-template-columns: 1fr; min-height: auto; }
  .hero .mediaFigure { min-height: 260px; }
  .detailLayout { grid-template-columns: 1fr; }
  .actionPanel { position: static; }
  .trustPanel dl, .practicalGrid, .mapDiagram { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mapExplorerLayout { grid-template-columns: 1fr; }
  .menuButton { display: inline-flex; align-items: center; }
  .primaryNav {
    display: none;
    position: absolute;
    top: 68px;
    right: 16px;
    left: 16px;
    padding: .7rem;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: white;
    box-shadow: var(--shadow);
  }
  .primaryNav.isOpen { display: grid; }
}

@media (max-width: 640px) {
  body { padding-bottom: calc(68px + env(safe-area-inset-bottom)); }
  .page, .section, .hero, .headerInner { width: min(calc(100% - 24px), var(--content)); }
  .areaSwitcher { margin-left: auto; }
  .areaSwitcher span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .areaSwitcher select { max-width: 6.5rem; }
  .heroCopy { padding: 1.4rem; }
  .hero .mediaFigure { min-height: 220px; }
  .cardGrid, .trustPanel dl, .practicalGrid, .mapDiagram, .footerGrid { grid-template-columns: 1fr; }
  .compactMeta { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .footerGrid nav { grid-template-columns: 1fr; }
  .siteFooter { padding-inline: 16px; padding-bottom: 2rem; }
  .mobileNav {
    position: fixed;
    z-index: 80;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: .35rem .4rem calc(.35rem + env(safe-area-inset-bottom));
    background: rgb(255 255 255 / 98%);
    border-top: 1px solid var(--line);
  }
  .mobileNav a { min-height: 56px; display: grid; place-items: center; align-content: center; color: var(--text); text-decoration: none; border-radius: 10px; line-height: 1.15; }
  .mobileNav a[aria-current="page"] { background: var(--surface-soft); color: var(--blue-dark); font-weight: 800; }
  .mobileNav span { font-size: 1.2rem; }
}

@media (max-width: 360px) {
  .headerInner { flex-wrap: wrap; padding-block: .4rem; }
  .brand strong, .brand small { display: none; }
  .brandMark { width: 34px; height: 34px; }
  .areaSwitcher { order: 3; flex: 1 0 100%; }
  .areaSwitcher select { width: 100%; max-width: none; }
  .primaryNav { top: 100%; }
  .compactMeta { grid-template-columns: 1fr; }
  .summaryBox dl div { grid-template-columns: 1fr; gap: .1rem; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
}
