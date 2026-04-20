import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_DESC =
  "EASSA (East African Stanford Students Association) at Stanford University: community, culture, events, and East African heritage for students, faculty, and alumni.";

const ROUTES = {
  "/": {
    title: "EASSA Stanford | East African Stanford Students Association",
    description: DEFAULT_DESC,
  },
  "/about": {
    title: "About EASSA Stanford | East African Student Association",
    description:
      "Learn about EASSA at Stanford: vision, leadership, East African culture, events, and how to stay connected.",
  },
  "/events": {
    title: "Events | EASSA Stanford",
    description:
      "Upcoming and past EASSA Stanford events: Nyama Choma Social, Sauti Motomoto, community gatherings, and more.",
  },
  "/culture": {
    title: "Culture | EASSA Stanford",
    description:
      "Explore East African culture through EASSA Stanford programs and cultural events.",
  },
};

function setMetaName(name, content) {
  let el = document.querySelector(`meta[name="${CSS.escape(name)}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkRel(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo() {
  const { pathname } = useLocation();
  const base = ROUTES[pathname] ?? ROUTES["/"];

  useEffect(() => {
    document.title = base.title;
    setMetaName("description", base.description);
    setMetaName(
      "keywords",
      "EASSA, EASSA Stanford, East African Stanford Students Association, Stanford University, East Africa, student organization, Stanford Africa, Nyama Choma, Sauti Motomoto"
    );

    const origin = window.location.origin;
    const url = `${origin}${pathname === "/" ? "/" : pathname}`;
    setMetaProperty("og:type", "website");
    setMetaProperty("og:title", base.title);
    setMetaProperty("og:description", base.description);
    setMetaProperty("og:url", url);
    setMetaProperty("og:locale", "en_US");
    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", base.title);
    setMetaName("twitter:description", base.description);

    setLinkRel("canonical", url);
  }, [pathname, base.title, base.description]);

  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EASSA Stanford",
      alternateName: ["East African Stanford Students Association", "EASSA"],
      description: DEFAULT_DESC,
      url: window.location.origin,
      sameAs: ["https://www.instagram.com/eassa_stanford/"],
    };
    let script = document.getElementById("ld-json-org");
    if (!script) {
      script = document.createElement("script");
      script.id = "ld-json-org";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }, []);

  return null;
}
