import {
  j as c,
  t as C,
  M as E,
  b as F,
  W as j,
  d as O,
  c as R,
  a as r,
  r as s,
  T as x,
} from "./assets/wsPort-b3c51948.js";

const I = () => {
    const [l, P] = s.useState(!1),
      [d, h] = s.useState([]),
      [p, W] = s.useState([]),
      [v, S] = s.useState(L),
      [f, m] = s.useState({ done: 0, total: 0 }),
      [b, g] = s.useState(!1),
      [k, w] = s.useState(null),
      [T, U] = s.useState(null),
      u = s.useCallback((e) => {
        const o = [],
          a = [],
          t = new URL(window.location.href);
        for (let i = 0; i < e.length; i++) {
          const n = e.item(i);
          if (!n) continue;
          const N = URL.createObjectURL(n);
          o.push(N),
            a.push(n.name),
            t.searchParams.append("trace", N),
            t.searchParams.append("traceFileName", n.name);
        }
        const y = t.toString();
        window.history.pushState({}, "", y), h(o), W(a), g(!1), w(null);
      }, []),
      D = s.useCallback(
        (e) => {
          e.preventDefault(), u(e.dataTransfer.files);
        },
        [u],
      ),
      M = s.useCallback(
        (e) => {
          e.preventDefault(), e.target.files && u(e.target.files);
        },
        [u],
      );
    return (
      s.useEffect(() => {
        const e = new URL(window.location.href).searchParams,
          o = e.getAll("trace");
        P(e.has("isServer"));
        for (const a of o)
          if (a.startsWith("file:")) {
            U(a || null);
            return;
          }
        e.has("isServer")
          ? R({
              onEvent(a, t) {
                a === "loadTrace" && (h(t.url ? [t.url] : []), g(!1), w(null));
              },
              onClose() {},
            }).then((a) => {
              a("ready");
            })
          : o.some((a) => a.startsWith("blob:")) || h(o);
      }, []),
      s.useEffect(() => {
        (async () => {
          if (d.length) {
            const e = (t) => {
              t.data.method === "progress" && m(t.data.params);
            };
            navigator.serviceWorker.addEventListener("message", e),
              m({ done: 0, total: 1 });
            const o = [];
            for (let t = 0; t < d.length; t++) {
              const y = d[t],
                i = new URLSearchParams();
              i.set("trace", y), p.length && i.set("traceFileName", p[t]);
              const n = await fetch(`contexts?${i.toString()}`);
              if (!n.ok) {
                l || h([]), w((await n.json()).error);
                return;
              }
              o.push(...(await n.json()));
            }
            navigator.serviceWorker.removeEventListener("message", e);
            const a = new E(o);
            m({ done: 0, total: 0 }), S(a);
          } else S(L);
        })();
      }, [l, d, p]),
      c("div", {
        className: "vbox workbench-loader",
        onDragOver: (e) => {
          e.preventDefault(), g(!0);
        },
        children: [
          c("div", {
            className: "hbox header",
            children: [
              r("div", {
                className: "logo",
                children: r("img", {
                  src: "playwright-logo.svg",
                  alt: "Playwright logo",
                }),
              }),
              r("div", { className: "product", children: "Playwright" }),
              v.title && r("div", { className: "title", children: v.title }),
              r("div", { className: "spacer" }),
              r(x, {
                icon: "color-mode",
                title: "Toggle color mode",
                toggled: !1,
                onClick: () => C(),
              }),
            ],
          }),
          r("div", {
            className: "progress",
            children: r("div", {
              className: "inner-progress",
              style: { width: f.total ? (100 * f.done) / f.total + "%" : 0 },
            }),
          }),
          r(j, { model: v }),
          T &&
            c("div", {
              className: "drop-target",
              children: [
                r("div", {
                  children:
                    "Trace Viewer uses Service Workers to show traces. To view trace:",
                }),
                c("div", {
                  style: { paddingTop: 20 },
                  children: [
                    c("div", {
                      children: [
                        "1. Click ",
                        r("a", { href: T, children: "here" }),
                        " to put your trace into the download shelf",
                      ],
                    }),
                    c("div", {
                      children: [
                        "2. Go to ",
                        r("a", {
                          href: "https://trace.playwright.dev",
                          children: "trace.playwright.dev",
                        }),
                      ],
                    }),
                    r("div", {
                      children:
                        "3. Drop the trace from the download shelf into the page",
                    }),
                  ],
                }),
              ],
            }),
          !l &&
            !b &&
            !T &&
            (!d.length || k) &&
            c("div", {
              className: "drop-target",
              children: [
                r("div", { className: "processing-error", children: k }),
                r("div", {
                  className: "title",
                  children: "Drop Playwright Trace to load",
                }),
                r("div", { children: "or" }),
                r("button", {
                  onClick: () => {
                    const e = document.createElement("input");
                    (e.type = "file"),
                      (e.multiple = !0),
                      e.click(),
                      e.addEventListener("change", (o) => M(o));
                  },
                  children: "Select file(s)",
                }),
                r("div", {
                  style: { maxWidth: 400 },
                  children:
                    "Playwright Trace Viewer is a Progressive Web App, it does not send your trace anywhere, it opens it locally.",
                }),
              ],
            }),
          l &&
            !d.length &&
            r("div", {
              className: "drop-target",
              children: r("div", {
                className: "title",
                children: "Select test to see the trace",
              }),
            }),
          b &&
            r("div", {
              className: "drop-target",
              onDragLeave: () => {
                g(!1);
              },
              onDrop: (e) => D(e),
              children: r("div", {
                className: "title",
                children: "Release to analyse the Playwright Trace",
              }),
            }),
        ],
      })
    );
  },
  L = new E([]);
(async () => {
  if ((F(), window.location.protocol !== "file:")) {
    if (
      (window.location.href.includes("isUnderTest=true") &&
        (await new Promise((l) => setTimeout(l, 1e3))),
      !navigator.serviceWorker)
    )
      throw new Error(`Service workers are not supported.
Make sure to serve the Trace Viewer (${window.location}) via HTTPS or localhost.`);
    navigator.serviceWorker.register("sw.bundle.js"),
      navigator.serviceWorker.controller ||
        (await new Promise((l) => {
          navigator.serviceWorker.oncontrollerchange = () => l();
        })),
      setInterval(function () {
        fetch("ping");
      }, 1e4);
  }
  O.render(r(I, {}), document.querySelector("#root"));
})();
