!(function(e, t, n, r, s, o, i, c, u, a, d, p, l, m) {
  for (
    d = e.CrdsComponents = e.CrdsComponents || {},
      (p = t.createElement("style")).innerHTML =
        "heart-button{visibility:hidden}.hydrated{visibility:inherit}",
      p.setAttribute("data-styles", ""),
      l = t.head.querySelector("meta[charset]"),
      t.head.insertBefore(p, l ? l.nextSibling : t.head.firstChild),
      (function(e, t, n) {
        (e["s-apps"] = e["s-apps"] || []).push("CrdsComponents"),
          n.componentOnReady ||
            (n.componentOnReady = function() {
              var t = this;
              function n(n) {
                if (t.nodeName.indexOf("-") > 0) {
                  for (var r = e["s-apps"], s = 0, o = 0; o < r.length; o++)
                    if (e[r[o]].componentOnReady) {
                      if (e[r[o]].componentOnReady(t, n)) return;
                      s++;
                    }
                  if (s < r.length)
                    return void (e["s-cr"] = e["s-cr"] || []).push([t, n]);
                }
                n(null);
              }
              return e.Promise ? new e.Promise(n) : { then: n };
            });
      })(e, 0, a),
      s = s || d.resourcesUrl,
      p = (l = t.querySelectorAll("script")).length - 1;
    p >= 0 && !(m = l[p]).src && !m.hasAttribute("data-resources-url");
    p--
  );
  (l = m.getAttribute("data-resources-url")),
    !s && l && (s = l),
    !s &&
      m.src &&
      (s =
        (l = m.src.split("/").slice(0, -1)).join("/") +
        (l.length ? "/" : "") +
        "crds-components/"),
    (p = t.createElement("script")),
    (function(e, t, n, r) {
      return (
        !(t.search.indexOf("core=esm") > 0) &&
        (!(
          !(t.search.indexOf("core=es5") > 0 || "file:" === t.protocol) &&
          e.customElements &&
          e.customElements.define &&
          e.fetch &&
          e.CSS &&
          e.CSS.supports &&
          e.CSS.supports("color", "var(--c)") &&
          "noModule" in n
        ) ||
          (function(e) {
            try {
              return new Function('import("")'), !1;
            } catch (e) {}
            return !0;
          })())
      );
    })(e, e.location, p)
      ? (p.src = s + "crds-components.nfqwxnv1.js")
      : ((p.src = s + "crds-components.ckpndhrs.js"),
        p.setAttribute("type", "module"),
        p.setAttribute("crossorigin", !0)),
    p.setAttribute("data-resources-url", s),
    p.setAttribute("data-namespace", "crds-components"),
    t.head.appendChild(p);
})(window, document, 0, 0, 0, 0, 0, 0, 0, HTMLElement.prototype);
