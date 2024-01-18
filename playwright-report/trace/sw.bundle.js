var kr = Object.defineProperty;
var Cr = (n, t, e) =>
  t in n
    ? kr(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (n[t] = e);
var M = (n, t, e) => (Cr(n, typeof t != "symbol" ? t + "" : t, e), e);
function Ir(n, t) {
  const e = new Array(t.length).fill(0);
  return new Array(t.length).fill(0).map((r, s) => (i, a) => {
    (e[s] = (i / a) * t[s] * 1e3),
      n(
        e.reduce((c, l) => c + l, 0),
        1e3,
      );
  });
}
class Nr {
  constructor(t, e, r) {
    M(this, "_snapshots");
    M(this, "_index");
    M(this, "snapshotName");
    M(this, "_resources");
    M(this, "_snapshot");
    M(this, "_callId");
    (this._resources = t),
      (this._snapshots = e),
      (this._index = r),
      (this._snapshot = e[r]),
      (this._callId = e[r].callId),
      (this.snapshotName = e[r].snapshotName);
  }
  snapshot() {
    return this._snapshots[this._index];
  }
  viewport() {
    return this._snapshots[this._index].viewport;
  }
  render() {
    const t = (i, a, c, l) => {
        if (typeof i == "string") {
          const h = Fr(i);
          return c === "STYLE" || c === "style" ? Hr(h) : h;
        }
        if (!i._string)
          if (Array.isArray(i[0])) {
            const h = a - i[0][0];
            if (h >= 0 && h <= a) {
              const u = Ur(this._snapshots[h]),
                _ = i[0][1];
              _ >= 0 && _ < u.length && (i._string = t(u[_], h, c, l));
            }
          } else if (typeof i[0] == "string") {
            const h = i[0] === "NOSCRIPT" ? "X-NOSCRIPT" : i[0],
              u = Object.entries(i[1] || {}),
              _ = [];
            _.push("<", h);
            const m = "__playwright_current_src__",
              g = h === "IFRAME" || h === "FRAME",
              S = h === "A",
              f = h === "IMG",
              o = f && u.some((p) => p[0] === m),
              d =
                h === "SOURCE" &&
                c === "PICTURE" &&
                (l == null ? void 0 : l.some((p) => p[0] === m));
            for (const [p, w] of u) {
              let y = p;
              g && p.toLowerCase() === "src" && (y = "__playwright_src__"),
                f && p === m && (y = "src"),
                ["src", "srcset"].includes(p.toLowerCase()) &&
                  (o || d) &&
                  (y = "_" + y);
              let O = w;
              S && p.toLowerCase() === "href"
                ? (O = "link://" + w)
                : (p.toLowerCase() === "href" ||
                    p.toLowerCase() === "src" ||
                    p === m) &&
                  (O = Qe(w)),
                _.push(" ", y, '="', Lr(O), '"');
            }
            _.push(">");
            for (let p = 2; p < i.length; p++) _.push(t(i[p], a, h, u));
            Pr.has(h) || _.push("</", h, ">"), (i._string = _.join(""));
          } else i._string = "";
        return i._string;
      },
      e = this._snapshot;
    let r = t(e.html, this._index, void 0, void 0);
    return r
      ? ((r =
          (e.doctype ? `<!DOCTYPE ${e.doctype}>` : "") +
          [
            "<style>*,*::before,*::after { visibility: hidden }</style>",
            `<script>${Mr(this._callId, this.snapshotName)}<\/script>`,
          ].join("") +
          r),
        { html: r, pageId: e.pageId, frameId: e.frameId, index: this._index })
      : { html: "", pageId: e.pageId, frameId: e.frameId, index: this._index };
  }
  resourceByUrl(t, e) {
    const r = this._snapshot;
    let s, i;
    for (const c of this._resources) {
      if (
        typeof c._monotonicTime == "number" &&
        c._monotonicTime >= r.timestamp
      )
        break;
      c.response.status !== 304 &&
        c.request.url === t &&
        c.request.method === e &&
        (c._frameref === r.frameId ? (s = c) : (i = c));
    }
    let a = s ?? i;
    if (a && e.toUpperCase() === "GET") {
      for (const c of r.resourceOverrides)
        if (t === c.url && c.sha1) {
          a = {
            ...a,
            response: {
              ...a.response,
              content: { ...a.response.content, _sha1: c.sha1 },
            },
          };
          break;
        }
    }
    return a;
  }
}
const Pr = new Set([
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "MENUITEM",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR",
  ]),
  xn = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function Lr(n) {
  return n.replace(/[&<>"']/gu, (t) => xn[t]);
}
function Fr(n) {
  return n.replace(/[&<]/gu, (t) => xn[t]);
}
function Ur(n) {
  if (!n._nodes) {
    const t = [],
      e = (r) => {
        if (typeof r == "string") t.push(r);
        else if (typeof r[0] == "string") {
          for (let s = 2; s < r.length; s++) e(r[s]);
          t.push(r);
        }
      };
    e(n.html), (n._nodes = t);
  }
  return n._nodes;
}
function Mr(...n) {
  function t(e, ...r) {
    const s = [],
      i = [],
      a = [],
      c = (u) => {
        for (const _ of u.querySelectorAll("[__playwright_scroll_top_]"))
          s.push(_);
        for (const _ of u.querySelectorAll("[__playwright_scroll_left_]"))
          i.push(_);
        for (const _ of u.querySelectorAll("[__playwright_value_]")) {
          const m = _;
          m.type !== "file" &&
            (m.value = m.getAttribute("__playwright_value_")),
            _.removeAttribute("__playwright_value_");
        }
        for (const _ of u.querySelectorAll("[__playwright_checked_]"))
          (_.checked = _.getAttribute("__playwright_checked_") === "true"),
            _.removeAttribute("__playwright_checked_");
        for (const _ of u.querySelectorAll("[__playwright_selected_]"))
          (_.selected = _.getAttribute("__playwright_selected_") === "true"),
            _.removeAttribute("__playwright_selected_");
        for (const _ of r)
          for (const m of u.querySelectorAll(
            `[__playwright_target__="${_}"]`,
          )) {
            const g = m.style;
            (g.outline = "2px solid #006ab1"),
              (g.backgroundColor = "#6fa8dc7f"),
              a.push(m);
          }
        for (const _ of u.querySelectorAll("iframe, frame")) {
          const m = _.getAttribute("__playwright_src__");
          if (!m)
            _.setAttribute(
              "src",
              'data:text/html,<body style="background: #ddd"></body>',
            );
          else {
            const g = new URL(e(window.location.href)),
              S = g.pathname.lastIndexOf("/snapshot/");
            S !== -1 && (g.pathname = g.pathname.substring(0, S + 1)),
              (g.pathname += m.substring(1)),
              _.setAttribute("src", g.toString());
          }
        }
        {
          const _ = u.querySelector("body[__playwright_custom_elements__]");
          if (_ && window.customElements) {
            const m = (
              _.getAttribute("__playwright_custom_elements__") || ""
            ).split(",");
            for (const g of m)
              window.customElements.define(g, class extends HTMLElement {});
          }
        }
        for (const _ of u.querySelectorAll(
          "template[__playwright_shadow_root_]",
        )) {
          const m = _,
            g = m.parentElement.attachShadow({ mode: "open" });
          g.appendChild(m.content), m.remove(), c(g);
        }
        if ("adoptedStyleSheets" in u) {
          const _ = [...u.adoptedStyleSheets];
          for (const m of u.querySelectorAll(
            "template[__playwright_style_sheet_]",
          )) {
            const g = m,
              S = new CSSStyleSheet();
            S.replaceSync(g.getAttribute("__playwright_style_sheet_")),
              _.push(S);
          }
          u.adoptedStyleSheets = _;
        }
      },
      l = () => {
        window.removeEventListener("load", l);
        for (const _ of s)
          (_.scrollTop = +_.getAttribute("__playwright_scroll_top_")),
            _.removeAttribute("__playwright_scroll_top_");
        for (const _ of i)
          (_.scrollLeft = +_.getAttribute("__playwright_scroll_left_")),
            _.removeAttribute("__playwright_scroll_left_");
        document.styleSheets[0].disabled = !0;
        const u = new URL(window.location.href).searchParams;
        if (u.get("pointX") && u.get("pointY")) {
          const _ = +u.get("pointX"),
            m = +u.get("pointY"),
            g = a.length > 0,
            S = document.documentElement ? [document.documentElement] : [];
          for (const f of g ? a : S) {
            const o = document.createElement("x-pw-pointer");
            if (
              ((o.style.position = "fixed"),
              (o.style.backgroundColor = "#f44336"),
              (o.style.width = "20px"),
              (o.style.height = "20px"),
              (o.style.borderRadius = "10px"),
              (o.style.margin = "-10px 0 0 -10px"),
              (o.style.zIndex = "2147483646"),
              g)
            ) {
              const d = f.getBoundingClientRect(),
                p = d.left + d.width / 2,
                w = d.top + d.height / 2;
              (o.style.left = p + "px"),
                (o.style.top = w + "px"),
                (Math.abs(p - _) >= 2 || Math.abs(w - m) >= 2) &&
                  (o.style.backgroundColor = "#3646f4");
            } else (o.style.left = _ + "px"), (o.style.top = m + "px");
            document.documentElement.appendChild(o);
          }
        }
      },
      h = () => c(document);
    window.addEventListener("load", l),
      window.addEventListener("DOMContentLoaded", h);
  }
  return `
(${t.toString()})(${ze.toString()}${n.map((e) => `, "${e}"`).join("")})`;
}
const En = [
    "about:",
    "blob:",
    "data:",
    "file:",
    "ftp:",
    "http:",
    "https:",
    "mailto:",
    "sftp:",
    "ws:",
    "wss:",
  ],
  Dt = "http://playwright.bloburl/#";
function Qe(n) {
  n.startsWith(Dt) && (n = n.substring(Dt.length));
  try {
    const t = new URL(n);
    if (t.protocol === "javascript:" || t.protocol === "vbscript:")
      return "javascript:void(0)";
    if (!(t.protocol === "blob:") && En.includes(t.protocol)) return n;
    const r = "pw-" + t.protocol.slice(0, t.protocol.length - 1);
    return (
      (t.protocol = "https:"),
      (t.hostname = t.hostname ? `${r}--${t.hostname}` : r),
      t.toString()
    );
  } catch {
    return n;
  }
}
const vr = /url\(['"]?([\w-]+:)\/\//gi;
function Hr(n) {
  return n.replace(vr, (t, e) =>
    !(e === "blob:") && En.includes(e)
      ? t
      : t.replace(e + "//", `https://pw-${e.slice(0, -1)}--`),
  );
}
function ze(n) {
  const t = new URL(n);
  return t.pathname.endsWith("/snapshot.html") ? t.searchParams.get("r") : n;
}
class Wr {
  constructor(t, e) {
    M(this, "_snapshotStorage");
    M(this, "_resourceLoader");
    M(this, "_snapshotIds", new Map());
    (this._snapshotStorage = t), (this._resourceLoader = e);
  }
  serveSnapshot(t, e, r) {
    const s = this._snapshot(t.substring(9), e);
    if (!s) return new Response(null, { status: 404 });
    const i = s.render();
    return (
      this._snapshotIds.set(r, s),
      new Response(i.html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      })
    );
  }
  serveSnapshotInfo(t, e) {
    const r = this._snapshot(t.substring(13), e);
    return this._respondWithJson(
      r
        ? { viewport: r.viewport(), url: r.snapshot().frameUrl }
        : { error: "No snapshot found" },
    );
  }
  _snapshot(t, e) {
    const r = e.get("name");
    return this._snapshotStorage.snapshotByName(t.slice(1), r);
  }
  _respondWithJson(t) {
    return new Response(JSON.stringify(t), {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000",
        "Content-Type": "application/json",
      },
    });
  }
  async serveResource(t, e, r) {
    let s;
    const i = this._snapshotIds.get(r);
    for (const g of t)
      if (((s = i == null ? void 0 : i.resourceByUrl(Br(g), e)), s)) break;
    if (!s) return new Response(null, { status: 404 });
    const a = s.response.content._sha1,
      c = a ? (await this._resourceLoader(a)) || new Blob([]) : new Blob([]);
    let l = s.response.content.mimeType;
    /^text\/|^application\/(javascript|json)/.test(l) &&
      !l.includes("charset") &&
      (l = `${l}; charset=utf-8`);
    const u = new Headers();
    u.set("Content-Type", l);
    for (const { name: g, value: S } of s.response.headers) u.set(g, S);
    u.delete("Content-Encoding"),
      u.delete("Access-Control-Allow-Origin"),
      u.set("Access-Control-Allow-Origin", "*"),
      u.delete("Content-Length"),
      u.set("Content-Length", String(c.size)),
      u.set("Cache-Control", "public, max-age=31536000");
    const { status: _ } = s.response,
      m = _ === 101 || _ === 204 || _ === 205 || _ === 304;
    return new Response(m ? null : c, {
      headers: u,
      status: s.response.status,
      statusText: s.response.statusText,
    });
  }
}
function Br(n) {
  try {
    const t = new URL(n);
    return (t.hash = ""), t.toString();
  } catch {
    return n;
  }
}
function jr(n) {
  const t = new Map(),
    { files: e, stacks: r } = n;
  for (const s of r) {
    const [i, a] = s;
    t.set(
      `call@${i}`,
      a.map((c) => ({
        file: e[c[0]],
        line: c[1],
        column: c[2],
        function: c[3],
      })),
    );
  }
  return t;
}
function qr() {
  return {
    isPrimary: !1,
    traceUrl: "",
    startTime: Number.MAX_SAFE_INTEGER,
    endTime: 0,
    browserName: "",
    options: {
      deviceScaleFactor: 1,
      isMobile: !1,
      viewport: { width: 1280, height: 800 },
    },
    pages: [],
    resources: [],
    actions: [],
    events: [],
    errors: [],
    stdio: [],
    hasSource: !1,
  };
}
class Gr {
  constructor() {
    M(this, "_resources", []);
    M(this, "_frameSnapshots", new Map());
  }
  addResource(t) {
    (t.request.url = Qe(t.request.url)), this._resources.push(t);
  }
  addFrameSnapshot(t) {
    for (const s of t.resourceOverrides) s.url = Qe(s.url);
    let e = this._frameSnapshots.get(t.frameId);
    e ||
      ((e = { raw: [], renderers: [] }),
      this._frameSnapshots.set(t.frameId, e),
      t.isMainFrame && this._frameSnapshots.set(t.pageId, e)),
      e.raw.push(t);
    const r = new Nr(this._resources, e.raw, e.raw.length - 1);
    return e.renderers.push(r), r;
  }
  snapshotByName(t, e) {
    const r = this._frameSnapshots.get(t);
    return r == null ? void 0 : r.renderers.find((s) => s.snapshotName === e);
  }
  snapshotsForTest() {
    return [...this._frameSnapshots.keys()];
  }
  finalize() {
    this._resources.sort(
      (t, e) => (t._monotonicTime || 0) - (e._monotonicTime || 0),
    );
  }
}
class Yr {
  constructor() {
    M(this, "contextEntries", []);
    M(this, "pageEntries", new Map());
    M(this, "_snapshotStorage");
    M(this, "_version");
    M(this, "_backend");
    M(this, "_attachments", new Map());
    M(this, "_resourceToContentType", new Map());
    M(this, "_jsHandles", new Map());
    M(this, "_consoleObjects", new Map());
  }
  async load(t, e) {
    var c, l;
    this._backend = t;
    const r = [];
    let s = !1;
    for (const h of await this._backend.entryNames()) {
      const u = h.match(/(.+)\.trace/);
      u && r.push(u[1] || ""), h.includes("src@") && (s = !0);
    }
    if (!r.length) throw new Error("Cannot find .trace file");
    this._snapshotStorage = new Gr();
    const i = r.length * 3;
    let a = 0;
    for (const h of r) {
      const u = qr(),
        _ = new Map();
      (u.traceUrl = t.traceURL()), (u.hasSource = s);
      const m = (await this._backend.readText(h + ".trace")) || "";
      for (const f of m.split(`
`))
        this.appendEvent(u, _, f);
      e(++a, i);
      const g = (await this._backend.readText(h + ".network")) || "";
      for (const f of g.split(`
`))
        this.appendEvent(u, _, f);
      if (
        (e(++a, i),
        (u.actions = [..._.values()].sort((f, o) => f.startTime - o.startTime)),
        !t.isLive())
      ) {
        for (const f of u.actions.slice().reverse())
          if (!f.endTime && !f.error)
            for (const o of u.actions)
              o.parentId === f.callId &&
                f.endTime < o.endTime &&
                (f.endTime = o.endTime);
      }
      const S = await this._backend.readText(h + ".stacks");
      if (S) {
        const f = jr(JSON.parse(S));
        for (const o of u.actions) o.stack = o.stack || f.get(o.callId);
      }
      e(++a, i);
      for (const f of u.resources)
        (c = f.request.postData) != null &&
          c._sha1 &&
          this._resourceToContentType.set(
            f.request.postData._sha1,
            kt(f.request.postData.mimeType),
          ),
          (l = f.response.content) != null &&
            l._sha1 &&
            this._resourceToContentType.set(
              f.response.content._sha1,
              kt(f.response.content.mimeType),
            );
      this.contextEntries.push(u);
    }
    this._snapshotStorage.finalize(),
      this._jsHandles.clear(),
      this._consoleObjects.clear();
  }
  async hasEntry(t) {
    return this._backend.hasEntry(t);
  }
  async resourceForSha1(t) {
    const e = await this._backend.readBlob("resources/" + t);
    if (e)
      return new Blob([e], {
        type: this._resourceToContentType.get(t) || "application/octet-stream",
      });
  }
  attachmentForSha1(t) {
    return this._attachments.get(t);
  }
  storage() {
    return this._snapshotStorage;
  }
  _pageEntry(t, e) {
    let r = this.pageEntries.get(e);
    return (
      r ||
        ((r = { screencastFrames: [] }),
        this.pageEntries.set(e, r),
        t.pages.push(r)),
      r
    );
  }
  appendEvent(t, e, r) {
    if (!r) return;
    const s = this._modernize(JSON.parse(r));
    for (const i of s) this._innerAppendEvent(t, e, i);
  }
  _innerAppendEvent(t, e, r) {
    var s;
    switch (r.type) {
      case "context-options": {
        (this._version = r.version),
          (t.isPrimary = !0),
          (t.browserName = r.browserName),
          (t.channel = r.channel),
          (t.title = r.title),
          (t.platform = r.platform),
          (t.wallTime = r.wallTime),
          (t.sdkLanguage = r.sdkLanguage),
          (t.options = r.options),
          (t.testIdAttributeName = r.testIdAttributeName);
        break;
      }
      case "screencast-frame": {
        this._pageEntry(t, r.pageId).screencastFrames.push(r);
        break;
      }
      case "before": {
        e.set(r.callId, { ...r, type: "action", endTime: 0, log: [] });
        break;
      }
      case "input": {
        const i = e.get(r.callId);
        (i.inputSnapshot = r.inputSnapshot), (i.point = r.point);
        break;
      }
      case "log": {
        const i = e.get(r.callId);
        if (!i) return;
        i.log.push({ time: r.time, message: r.message });
        break;
      }
      case "after": {
        const i = e.get(r.callId);
        (i.afterSnapshot = r.afterSnapshot),
          (i.endTime = r.endTime),
          (i.result = r.result),
          (i.error = r.error),
          (i.attachments = r.attachments),
          r.point && (i.point = r.point);
        for (const a of ((s = r.attachments) == null
          ? void 0
          : s.filter((c) => c.sha1)) || [])
          this._attachments.set(a.sha1, a);
        break;
      }
      case "action": {
        e.set(r.callId, { ...r, log: [] });
        break;
      }
      case "event": {
        t.events.push(r);
        break;
      }
      case "stdout": {
        t.stdio.push(r);
        break;
      }
      case "stderr": {
        t.stdio.push(r);
        break;
      }
      case "error": {
        t.errors.push(r);
        break;
      }
      case "console": {
        t.events.push(r);
        break;
      }
      case "resource-snapshot":
        this._snapshotStorage.addResource(r.snapshot),
          t.resources.push(r.snapshot);
        break;
      case "frame-snapshot":
        this._snapshotStorage.addFrameSnapshot(r.snapshot);
        break;
    }
    (r.type === "action" || r.type === "before") &&
      (t.startTime = Math.min(t.startTime, r.startTime)),
      (r.type === "action" || r.type === "after") &&
        (t.endTime = Math.max(t.endTime, r.endTime)),
      r.type === "event" &&
        ((t.startTime = Math.min(t.startTime, r.time)),
        (t.endTime = Math.max(t.endTime, r.time))),
      r.type === "screencast-frame" &&
        ((t.startTime = Math.min(t.startTime, r.timestamp)),
        (t.endTime = Math.max(t.endTime, r.timestamp)));
  }
  _modernize(t) {
    if (this._version === void 0) return [t];
    const e = 6;
    let r = [t];
    for (let s = this._version; s < e; ++s)
      r = this[`_modernize_${s}_to_${s + 1}`].call(this, r);
    return r;
  }
  _modernize_0_to_1(t) {
    for (const e of t)
      e.type === "action" &&
        typeof e.metadata.error == "string" &&
        (e.metadata.error = {
          error: { name: "Error", message: e.metadata.error },
        });
    return t;
  }
  _modernize_1_to_2(t) {
    var e, r;
    for (const s of t)
      s.type !== "frame-snapshot" ||
        !s.snapshot.isMainFrame ||
        (s.snapshot.viewport = ((r =
          (e = this.contextEntries[0]) == null ? void 0 : e.options) == null
          ? void 0
          : r.viewport) || { width: 1280, height: 720 });
    return t;
  }
  _modernize_2_to_3(t) {
    for (const e of t) {
      if (e.type !== "resource-snapshot" || e.snapshot.request) continue;
      const r = e.snapshot;
      e.snapshot = {
        _frameref: r.frameId,
        request: {
          url: r.url,
          method: r.method,
          headers: r.requestHeaders,
          postData: r.requestSha1 ? { _sha1: r.requestSha1 } : void 0,
        },
        response: {
          status: r.status,
          headers: r.responseHeaders,
          content: { mimeType: r.contentType, _sha1: r.responseSha1 },
        },
        _monotonicTime: r.timestamp,
      };
    }
    return t;
  }
  _modernize_3_to_4(t) {
    const e = [];
    for (const r of t) {
      const s = this._modernize_event_3_to_4(r);
      s && e.push(s);
    }
    return e;
  }
  _modernize_event_3_to_4(t) {
    var r, s, i, a;
    if (t.type !== "action" && t.type !== "event") return t;
    const e = t.metadata;
    return e.internal || e.method.startsWith("tracing")
      ? null
      : t.type === "event"
        ? e.method === "__create__" && e.type === "ConsoleMessage"
          ? {
              type: "object",
              class: e.type,
              guid: e.params.guid,
              initializer: e.params.initializer,
            }
          : {
              type: "event",
              time: e.startTime,
              class: e.type,
              method: e.method,
              params: e.params,
              pageId: e.pageId,
            }
        : {
            type: "action",
            callId: e.id,
            startTime: e.startTime,
            endTime: e.endTime,
            apiName: e.apiName || e.type + "." + e.method,
            class: e.type,
            method: e.method,
            params: e.params,
            wallTime: e.wallTime || Date.now(),
            log: e.log,
            beforeSnapshot:
              (r = e.snapshots.find((c) => c.title === "before")) == null
                ? void 0
                : r.snapshotName,
            inputSnapshot:
              (s = e.snapshots.find((c) => c.title === "input")) == null
                ? void 0
                : s.snapshotName,
            afterSnapshot:
              (i = e.snapshots.find((c) => c.title === "after")) == null
                ? void 0
                : i.snapshotName,
            error: (a = e.error) == null ? void 0 : a.error,
            result: e.result,
            point: e.point,
            pageId: e.pageId,
          };
  }
  _modernize_4_to_5(t) {
    const e = [];
    for (const r of t) {
      const s = this._modernize_event_4_to_5(r);
      s && e.push(s);
    }
    return e;
  }
  _modernize_event_4_to_5(t) {
    var e, r;
    if (
      (t.type === "event" &&
        t.method === "__create__" &&
        t.class === "JSHandle" &&
        this._jsHandles.set(t.params.guid, t.params.initializer),
      t.type === "object")
    ) {
      if (t.class !== "ConsoleMessage") return null;
      const s =
        (e = t.initializer.args) == null
          ? void 0
          : e.map((i) => {
              if (i.guid) {
                const a = this._jsHandles.get(i.guid);
                return {
                  preview: (a == null ? void 0 : a.preview) || "",
                  value: "",
                };
              }
              return { preview: i.preview || "", value: i.value || "" };
            });
      return (
        this._consoleObjects.set(t.guid, {
          type: t.initializer.type,
          text: t.initializer.text,
          location: t.initializer.location,
          args: s,
        }),
        null
      );
    }
    if (t.type === "event" && t.method === "console") {
      const s = this._consoleObjects.get(
        ((r = t.params.message) == null ? void 0 : r.guid) || "",
      );
      return s
        ? {
            type: "console",
            time: t.time,
            pageId: t.pageId,
            messageType: s.type,
            text: s.text,
            args: s.args,
            location: s.location,
          }
        : null;
    }
    return t;
  }
  _modernize_5_to_6(t) {
    const e = [];
    for (const r of t)
      if ((e.push(r), !(r.type !== "after" || !r.log.length)))
        for (const s of r.log)
          e.push({ type: "log", callId: r.callId, message: s, time: -1 });
    return e;
  }
}
function kt(n) {
  const t = n.match(/^(.*);\s*charset=.*$/);
  return t ? t[1] : n;
}
const Vr = 15,
  L = 0,
  z = 1,
  Zr = 2,
  V = -2,
  W = -3,
  Ct = -4,
  ee = -5,
  Z = [
    0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767,
    65535,
  ],
  Tn = 1440,
  Kr = 0,
  Xr = 4,
  $r = 9,
  Jr = 5,
  Qr = [
    96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48,
    0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0,
    8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8,
    120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8,
    8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227,
    83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36,
    0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0,
    8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0,
    8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80,
    7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9,
    196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66,
    0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0,
    8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8,
    138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7,
    51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9,
    172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30,
    0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110,
    0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256,
    0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194,
    80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0,
    9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8,
    57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8,
    137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7,
    43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9,
    170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29,
    0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109,
    0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0,
    8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81,
    7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9,
    230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8,
    59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8,
    139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7,
    51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9,
    174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31,
    0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111,
    0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256,
    0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193,
    80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0,
    9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8,
    56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8,
    136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7,
    43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9,
    169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28,
    0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108,
    0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0,
    8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81,
    7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9,
    229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8,
    58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8,
    138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7,
    51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9,
    173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30,
    0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110,
    0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256,
    0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195,
    80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0,
    9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8,
    57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8,
    137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7,
    43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9,
    171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29,
    0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109,
    0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0,
    8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81,
    7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9,
    231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8,
    59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8,
    139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7,
    51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9,
    175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31,
    0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111,
    0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255,
  ],
  zr = [
    80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5,
    65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9,
    90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91,
    5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5,
    769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5,
    24577,
  ],
  es = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67,
    83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
  ],
  ts = [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 112, 112,
  ],
  ns = [
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
    769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
  ],
  rs = [
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13,
  ],
  te = 15;
function et() {
  const n = this;
  let t, e, r, s, i, a;
  function c(h, u, _, m, g, S, f, o, d, p, w) {
    let y, O, b, A, T, R, x, E, C, D, P, N, k, v, F;
    (D = 0), (T = _);
    do r[h[u + D]]++, D++, T--;
    while (T !== 0);
    if (r[0] == _) return (f[0] = -1), (o[0] = 0), L;
    for (E = o[0], R = 1; R <= te && r[R] === 0; R++);
    for (x = R, E < R && (E = R), T = te; T !== 0 && r[T] === 0; T--);
    for (b = T, E > T && (E = T), o[0] = E, v = 1 << R; R < T; R++, v <<= 1)
      if ((v -= r[R]) < 0) return W;
    if ((v -= r[T]) < 0) return W;
    for (r[T] += v, a[1] = R = 0, D = 1, k = 2; --T !== 0; )
      (a[k] = R += r[D]), k++, D++;
    (T = 0), (D = 0);
    do (R = h[u + D]) !== 0 && (w[a[R]++] = T), D++;
    while (++T < _);
    for (
      _ = a[b], a[0] = T = 0, D = 0, A = -1, N = -E, i[0] = 0, P = 0, F = 0;
      x <= b;
      x++
    )
      for (y = r[x]; y-- !== 0; ) {
        for (; x > N + E; ) {
          if (
            (A++,
            (N += E),
            (F = b - N),
            (F = F > E ? E : F),
            (O = 1 << (R = x - N)) > y + 1 && ((O -= y + 1), (k = x), R < F))
          )
            for (; ++R < F && !((O <<= 1) <= r[++k]); ) O -= r[k];
          if (((F = 1 << R), p[0] + F > Tn)) return W;
          (i[A] = P = p[0]),
            (p[0] += F),
            A !== 0
              ? ((a[A] = T),
                (s[0] = R),
                (s[1] = E),
                (R = T >>> (N - E)),
                (s[2] = P - i[A - 1] - R),
                d.set(s, (i[A - 1] + R) * 3))
              : (f[0] = P);
        }
        for (
          s[1] = x - N,
            D >= _
              ? (s[0] = 128 + 64)
              : w[D] < m
                ? ((s[0] = w[D] < 256 ? 0 : 32 + 64), (s[2] = w[D++]))
                : ((s[0] = S[w[D] - m] + 16 + 64), (s[2] = g[w[D++] - m])),
            O = 1 << (x - N),
            R = T >>> N;
          R < F;
          R += O
        )
          d.set(s, (P + R) * 3);
        for (R = 1 << (x - 1); T & R; R >>>= 1) T ^= R;
        for (T ^= R, C = (1 << N) - 1; (T & C) != a[A]; )
          A--, (N -= E), (C = (1 << N) - 1);
      }
    return v !== 0 && b != 1 ? ee : L;
  }
  function l(h) {
    let u;
    for (
      t ||
        ((t = []),
        (e = []),
        (r = new Int32Array(te + 1)),
        (s = []),
        (i = new Int32Array(te)),
        (a = new Int32Array(te + 1))),
        e.length < h && (e = []),
        u = 0;
      u < h;
      u++
    )
      e[u] = 0;
    for (u = 0; u < te + 1; u++) r[u] = 0;
    for (u = 0; u < 3; u++) s[u] = 0;
    i.set(r.subarray(0, te), 0), a.set(r.subarray(0, te + 1), 0);
  }
  (n.inflate_trees_bits = function (h, u, _, m, g) {
    let S;
    return (
      l(19),
      (t[0] = 0),
      (S = c(h, 0, 19, 19, null, null, _, u, m, t, e)),
      S == W
        ? (g.msg = "oversubscribed dynamic bit lengths tree")
        : (S == ee || u[0] === 0) &&
          ((g.msg = "incomplete dynamic bit lengths tree"), (S = W)),
      S
    );
  }),
    (n.inflate_trees_dynamic = function (h, u, _, m, g, S, f, o, d) {
      let p;
      return (
        l(288),
        (t[0] = 0),
        (p = c(_, 0, h, 257, es, ts, S, m, o, t, e)),
        p != L || m[0] === 0
          ? (p == W
              ? (d.msg = "oversubscribed literal/length tree")
              : p != Ct &&
                ((d.msg = "incomplete literal/length tree"), (p = W)),
            p)
          : (l(288),
            (p = c(_, h, u, 0, ns, rs, f, g, o, t, e)),
            p != L || (g[0] === 0 && h > 257)
              ? (p == W
                  ? (d.msg = "oversubscribed distance tree")
                  : p == ee
                    ? ((d.msg = "incomplete distance tree"), (p = W))
                    : p != Ct &&
                      ((d.msg = "empty distance tree with lengths"), (p = W)),
                p)
              : L)
      );
    });
}
et.inflate_trees_fixed = function (n, t, e, r) {
  return (n[0] = $r), (t[0] = Jr), (e[0] = Qr), (r[0] = zr), L;
};
const De = 0,
  It = 1,
  Nt = 2,
  Pt = 3,
  Lt = 4,
  Ft = 5,
  Ut = 6,
  qe = 7,
  Mt = 8,
  ke = 9;
function ss() {
  const n = this;
  let t,
    e = 0,
    r,
    s = 0,
    i = 0,
    a = 0,
    c = 0,
    l = 0,
    h = 0,
    u = 0,
    _,
    m = 0,
    g,
    S = 0;
  function f(o, d, p, w, y, O, b, A) {
    let T, R, x, E, C, D, P, N, k, v, F, be, I, le, U, H;
    (P = A.next_in_index),
      (N = A.avail_in),
      (C = b.bitb),
      (D = b.bitk),
      (k = b.write),
      (v = k < b.read ? b.read - k - 1 : b.end - k),
      (F = Z[o]),
      (be = Z[d]);
    do {
      for (; D < 20; ) N--, (C |= (A.read_byte(P++) & 255) << D), (D += 8);
      if (
        ((T = C & F), (R = p), (x = w), (H = (x + T) * 3), (E = R[H]) === 0)
      ) {
        (C >>= R[H + 1]), (D -= R[H + 1]), (b.win[k++] = R[H + 2]), v--;
        continue;
      }
      do {
        if (((C >>= R[H + 1]), (D -= R[H + 1]), E & 16)) {
          for (E &= 15, I = R[H + 2] + (C & Z[E]), C >>= E, D -= E; D < 15; )
            N--, (C |= (A.read_byte(P++) & 255) << D), (D += 8);
          (T = C & be), (R = y), (x = O), (H = (x + T) * 3), (E = R[H]);
          do
            if (((C >>= R[H + 1]), (D -= R[H + 1]), E & 16)) {
              for (E &= 15; D < E; )
                N--, (C |= (A.read_byte(P++) & 255) << D), (D += 8);
              if (
                ((le = R[H + 2] + (C & Z[E])),
                (C >>= E),
                (D -= E),
                (v -= I),
                k >= le)
              )
                (U = k - le),
                  k - U > 0 && 2 > k - U
                    ? ((b.win[k++] = b.win[U++]),
                      (b.win[k++] = b.win[U++]),
                      (I -= 2))
                    : (b.win.set(b.win.subarray(U, U + 2), k),
                      (k += 2),
                      (U += 2),
                      (I -= 2));
              else {
                U = k - le;
                do U += b.end;
                while (U < 0);
                if (((E = b.end - U), I > E)) {
                  if (((I -= E), k - U > 0 && E > k - U))
                    do b.win[k++] = b.win[U++];
                    while (--E !== 0);
                  else
                    b.win.set(b.win.subarray(U, U + E), k),
                      (k += E),
                      (U += E),
                      (E = 0);
                  U = 0;
                }
              }
              if (k - U > 0 && I > k - U)
                do b.win[k++] = b.win[U++];
                while (--I !== 0);
              else
                b.win.set(b.win.subarray(U, U + I), k),
                  (k += I),
                  (U += I),
                  (I = 0);
              break;
            } else if (!(E & 64))
              (T += R[H + 2]), (T += C & Z[E]), (H = (x + T) * 3), (E = R[H]);
            else
              return (
                (A.msg = "invalid distance code"),
                (I = A.avail_in - N),
                (I = D >> 3 < I ? D >> 3 : I),
                (N += I),
                (P -= I),
                (D -= I << 3),
                (b.bitb = C),
                (b.bitk = D),
                (A.avail_in = N),
                (A.total_in += P - A.next_in_index),
                (A.next_in_index = P),
                (b.write = k),
                W
              );
          while (!0);
          break;
        }
        if (E & 64)
          return E & 32
            ? ((I = A.avail_in - N),
              (I = D >> 3 < I ? D >> 3 : I),
              (N += I),
              (P -= I),
              (D -= I << 3),
              (b.bitb = C),
              (b.bitk = D),
              (A.avail_in = N),
              (A.total_in += P - A.next_in_index),
              (A.next_in_index = P),
              (b.write = k),
              z)
            : ((A.msg = "invalid literal/length code"),
              (I = A.avail_in - N),
              (I = D >> 3 < I ? D >> 3 : I),
              (N += I),
              (P -= I),
              (D -= I << 3),
              (b.bitb = C),
              (b.bitk = D),
              (A.avail_in = N),
              (A.total_in += P - A.next_in_index),
              (A.next_in_index = P),
              (b.write = k),
              W);
        if (
          ((T += R[H + 2]),
          (T += C & Z[E]),
          (H = (x + T) * 3),
          (E = R[H]) === 0)
        ) {
          (C >>= R[H + 1]), (D -= R[H + 1]), (b.win[k++] = R[H + 2]), v--;
          break;
        }
      } while (!0);
    } while (v >= 258 && N >= 10);
    return (
      (I = A.avail_in - N),
      (I = D >> 3 < I ? D >> 3 : I),
      (N += I),
      (P -= I),
      (D -= I << 3),
      (b.bitb = C),
      (b.bitk = D),
      (A.avail_in = N),
      (A.total_in += P - A.next_in_index),
      (A.next_in_index = P),
      (b.write = k),
      L
    );
  }
  (n.init = function (o, d, p, w, y, O) {
    (t = De), (h = o), (u = d), (_ = p), (m = w), (g = y), (S = O), (r = null);
  }),
    (n.proc = function (o, d, p) {
      let w,
        y,
        O,
        b = 0,
        A = 0,
        T = 0,
        R,
        x,
        E,
        C;
      for (
        T = d.next_in_index,
          R = d.avail_in,
          b = o.bitb,
          A = o.bitk,
          x = o.write,
          E = x < o.read ? o.read - x - 1 : o.end - x;
        ;

      )
        switch (t) {
          case De:
            if (
              E >= 258 &&
              R >= 10 &&
              ((o.bitb = b),
              (o.bitk = A),
              (d.avail_in = R),
              (d.total_in += T - d.next_in_index),
              (d.next_in_index = T),
              (o.write = x),
              (p = f(h, u, _, m, g, S, o, d)),
              (T = d.next_in_index),
              (R = d.avail_in),
              (b = o.bitb),
              (A = o.bitk),
              (x = o.write),
              (E = x < o.read ? o.read - x - 1 : o.end - x),
              p != L)
            ) {
              t = p == z ? qe : ke;
              break;
            }
            (i = h), (r = _), (s = m), (t = It);
          case It:
            for (w = i; A < w; ) {
              if (R !== 0) p = L;
              else
                return (
                  (o.bitb = b),
                  (o.bitk = A),
                  (d.avail_in = R),
                  (d.total_in += T - d.next_in_index),
                  (d.next_in_index = T),
                  (o.write = x),
                  o.inflate_flush(d, p)
                );
              R--, (b |= (d.read_byte(T++) & 255) << A), (A += 8);
            }
            if (
              ((y = (s + (b & Z[w])) * 3),
              (b >>>= r[y + 1]),
              (A -= r[y + 1]),
              (O = r[y]),
              O === 0)
            ) {
              (a = r[y + 2]), (t = Ut);
              break;
            }
            if (O & 16) {
              (c = O & 15), (e = r[y + 2]), (t = Nt);
              break;
            }
            if (!(O & 64)) {
              (i = O), (s = y / 3 + r[y + 2]);
              break;
            }
            if (O & 32) {
              t = qe;
              break;
            }
            return (
              (t = ke),
              (d.msg = "invalid literal/length code"),
              (p = W),
              (o.bitb = b),
              (o.bitk = A),
              (d.avail_in = R),
              (d.total_in += T - d.next_in_index),
              (d.next_in_index = T),
              (o.write = x),
              o.inflate_flush(d, p)
            );
          case Nt:
            for (w = c; A < w; ) {
              if (R !== 0) p = L;
              else
                return (
                  (o.bitb = b),
                  (o.bitk = A),
                  (d.avail_in = R),
                  (d.total_in += T - d.next_in_index),
                  (d.next_in_index = T),
                  (o.write = x),
                  o.inflate_flush(d, p)
                );
              R--, (b |= (d.read_byte(T++) & 255) << A), (A += 8);
            }
            (e += b & Z[w]),
              (b >>= w),
              (A -= w),
              (i = u),
              (r = g),
              (s = S),
              (t = Pt);
          case Pt:
            for (w = i; A < w; ) {
              if (R !== 0) p = L;
              else
                return (
                  (o.bitb = b),
                  (o.bitk = A),
                  (d.avail_in = R),
                  (d.total_in += T - d.next_in_index),
                  (d.next_in_index = T),
                  (o.write = x),
                  o.inflate_flush(d, p)
                );
              R--, (b |= (d.read_byte(T++) & 255) << A), (A += 8);
            }
            if (
              ((y = (s + (b & Z[w])) * 3),
              (b >>= r[y + 1]),
              (A -= r[y + 1]),
              (O = r[y]),
              O & 16)
            ) {
              (c = O & 15), (l = r[y + 2]), (t = Lt);
              break;
            }
            if (!(O & 64)) {
              (i = O), (s = y / 3 + r[y + 2]);
              break;
            }
            return (
              (t = ke),
              (d.msg = "invalid distance code"),
              (p = W),
              (o.bitb = b),
              (o.bitk = A),
              (d.avail_in = R),
              (d.total_in += T - d.next_in_index),
              (d.next_in_index = T),
              (o.write = x),
              o.inflate_flush(d, p)
            );
          case Lt:
            for (w = c; A < w; ) {
              if (R !== 0) p = L;
              else
                return (
                  (o.bitb = b),
                  (o.bitk = A),
                  (d.avail_in = R),
                  (d.total_in += T - d.next_in_index),
                  (d.next_in_index = T),
                  (o.write = x),
                  o.inflate_flush(d, p)
                );
              R--, (b |= (d.read_byte(T++) & 255) << A), (A += 8);
            }
            (l += b & Z[w]), (b >>= w), (A -= w), (t = Ft);
          case Ft:
            for (C = x - l; C < 0; ) C += o.end;
            for (; e !== 0; ) {
              if (
                E === 0 &&
                (x == o.end &&
                  o.read !== 0 &&
                  ((x = 0), (E = x < o.read ? o.read - x - 1 : o.end - x)),
                E === 0 &&
                  ((o.write = x),
                  (p = o.inflate_flush(d, p)),
                  (x = o.write),
                  (E = x < o.read ? o.read - x - 1 : o.end - x),
                  x == o.end &&
                    o.read !== 0 &&
                    ((x = 0), (E = x < o.read ? o.read - x - 1 : o.end - x)),
                  E === 0))
              )
                return (
                  (o.bitb = b),
                  (o.bitk = A),
                  (d.avail_in = R),
                  (d.total_in += T - d.next_in_index),
                  (d.next_in_index = T),
                  (o.write = x),
                  o.inflate_flush(d, p)
                );
              (o.win[x++] = o.win[C++]), E--, C == o.end && (C = 0), e--;
            }
            t = De;
            break;
          case Ut:
            if (
              E === 0 &&
              (x == o.end &&
                o.read !== 0 &&
                ((x = 0), (E = x < o.read ? o.read - x - 1 : o.end - x)),
              E === 0 &&
                ((o.write = x),
                (p = o.inflate_flush(d, p)),
                (x = o.write),
                (E = x < o.read ? o.read - x - 1 : o.end - x),
                x == o.end &&
                  o.read !== 0 &&
                  ((x = 0), (E = x < o.read ? o.read - x - 1 : o.end - x)),
                E === 0))
            )
              return (
                (o.bitb = b),
                (o.bitk = A),
                (d.avail_in = R),
                (d.total_in += T - d.next_in_index),
                (d.next_in_index = T),
                (o.write = x),
                o.inflate_flush(d, p)
              );
            (p = L), (o.win[x++] = a), E--, (t = De);
            break;
          case qe:
            if (
              (A > 7 && ((A -= 8), R++, T--),
              (o.write = x),
              (p = o.inflate_flush(d, p)),
              (x = o.write),
              (E = x < o.read ? o.read - x - 1 : o.end - x),
              o.read != o.write)
            )
              return (
                (o.bitb = b),
                (o.bitk = A),
                (d.avail_in = R),
                (d.total_in += T - d.next_in_index),
                (d.next_in_index = T),
                (o.write = x),
                o.inflate_flush(d, p)
              );
            t = Mt;
          case Mt:
            return (
              (p = z),
              (o.bitb = b),
              (o.bitk = A),
              (d.avail_in = R),
              (d.total_in += T - d.next_in_index),
              (d.next_in_index = T),
              (o.write = x),
              o.inflate_flush(d, p)
            );
          case ke:
            return (
              (p = W),
              (o.bitb = b),
              (o.bitk = A),
              (d.avail_in = R),
              (d.total_in += T - d.next_in_index),
              (d.next_in_index = T),
              (o.write = x),
              o.inflate_flush(d, p)
            );
          default:
            return (
              (p = V),
              (o.bitb = b),
              (o.bitk = A),
              (d.avail_in = R),
              (d.total_in += T - d.next_in_index),
              (d.next_in_index = T),
              (o.write = x),
              o.inflate_flush(d, p)
            );
        }
    }),
    (n.free = function () {});
}
const vt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
  he = 0,
  Ge = 1,
  Ht = 2,
  Wt = 3,
  Bt = 4,
  jt = 5,
  Ce = 6,
  Ie = 7,
  qt = 8,
  fe = 9;
function is(n, t) {
  const e = this;
  let r = he,
    s = 0,
    i = 0,
    a = 0,
    c;
  const l = [0],
    h = [0],
    u = new ss();
  let _ = 0,
    m = new Int32Array(Tn * 3);
  const g = 0,
    S = new et();
  (e.bitk = 0),
    (e.bitb = 0),
    (e.win = new Uint8Array(t)),
    (e.end = t),
    (e.read = 0),
    (e.write = 0),
    (e.reset = function (f, o) {
      o && (o[0] = g),
        r == Ce && u.free(f),
        (r = he),
        (e.bitk = 0),
        (e.bitb = 0),
        (e.read = e.write = 0);
    }),
    e.reset(n, null),
    (e.inflate_flush = function (f, o) {
      let d, p, w;
      return (
        (p = f.next_out_index),
        (w = e.read),
        (d = (w <= e.write ? e.write : e.end) - w),
        d > f.avail_out && (d = f.avail_out),
        d !== 0 && o == ee && (o = L),
        (f.avail_out -= d),
        (f.total_out += d),
        f.next_out.set(e.win.subarray(w, w + d), p),
        (p += d),
        (w += d),
        w == e.end &&
          ((w = 0),
          e.write == e.end && (e.write = 0),
          (d = e.write - w),
          d > f.avail_out && (d = f.avail_out),
          d !== 0 && o == ee && (o = L),
          (f.avail_out -= d),
          (f.total_out += d),
          f.next_out.set(e.win.subarray(w, w + d), p),
          (p += d),
          (w += d)),
        (f.next_out_index = p),
        (e.read = w),
        o
      );
    }),
    (e.proc = function (f, o) {
      let d, p, w, y, O, b, A, T;
      for (
        y = f.next_in_index,
          O = f.avail_in,
          p = e.bitb,
          w = e.bitk,
          b = e.write,
          A = b < e.read ? e.read - b - 1 : e.end - b;
        ;

      ) {
        let R, x, E, C, D, P, N, k;
        switch (r) {
          case he:
            for (; w < 3; ) {
              if (O !== 0) o = L;
              else
                return (
                  (e.bitb = p),
                  (e.bitk = w),
                  (f.avail_in = O),
                  (f.total_in += y - f.next_in_index),
                  (f.next_in_index = y),
                  (e.write = b),
                  e.inflate_flush(f, o)
                );
              O--, (p |= (f.read_byte(y++) & 255) << w), (w += 8);
            }
            switch (((d = p & 7), (_ = d & 1), d >>> 1)) {
              case 0:
                (p >>>= 3),
                  (w -= 3),
                  (d = w & 7),
                  (p >>>= d),
                  (w -= d),
                  (r = Ge);
                break;
              case 1:
                (R = []),
                  (x = []),
                  (E = [[]]),
                  (C = [[]]),
                  et.inflate_trees_fixed(R, x, E, C),
                  u.init(R[0], x[0], E[0], 0, C[0], 0),
                  (p >>>= 3),
                  (w -= 3),
                  (r = Ce);
                break;
              case 2:
                (p >>>= 3), (w -= 3), (r = Wt);
                break;
              case 3:
                return (
                  (p >>>= 3),
                  (w -= 3),
                  (r = fe),
                  (f.msg = "invalid block type"),
                  (o = W),
                  (e.bitb = p),
                  (e.bitk = w),
                  (f.avail_in = O),
                  (f.total_in += y - f.next_in_index),
                  (f.next_in_index = y),
                  (e.write = b),
                  e.inflate_flush(f, o)
                );
            }
            break;
          case Ge:
            for (; w < 32; ) {
              if (O !== 0) o = L;
              else
                return (
                  (e.bitb = p),
                  (e.bitk = w),
                  (f.avail_in = O),
                  (f.total_in += y - f.next_in_index),
                  (f.next_in_index = y),
                  (e.write = b),
                  e.inflate_flush(f, o)
                );
              O--, (p |= (f.read_byte(y++) & 255) << w), (w += 8);
            }
            if (((~p >>> 16) & 65535) != (p & 65535))
              return (
                (r = fe),
                (f.msg = "invalid stored block lengths"),
                (o = W),
                (e.bitb = p),
                (e.bitk = w),
                (f.avail_in = O),
                (f.total_in += y - f.next_in_index),
                (f.next_in_index = y),
                (e.write = b),
                e.inflate_flush(f, o)
              );
            (s = p & 65535),
              (p = w = 0),
              (r = s !== 0 ? Ht : _ !== 0 ? Ie : he);
            break;
          case Ht:
            if (
              O === 0 ||
              (A === 0 &&
                (b == e.end &&
                  e.read !== 0 &&
                  ((b = 0), (A = b < e.read ? e.read - b - 1 : e.end - b)),
                A === 0 &&
                  ((e.write = b),
                  (o = e.inflate_flush(f, o)),
                  (b = e.write),
                  (A = b < e.read ? e.read - b - 1 : e.end - b),
                  b == e.end &&
                    e.read !== 0 &&
                    ((b = 0), (A = b < e.read ? e.read - b - 1 : e.end - b)),
                  A === 0)))
            )
              return (
                (e.bitb = p),
                (e.bitk = w),
                (f.avail_in = O),
                (f.total_in += y - f.next_in_index),
                (f.next_in_index = y),
                (e.write = b),
                e.inflate_flush(f, o)
              );
            if (
              ((o = L),
              (d = s),
              d > O && (d = O),
              d > A && (d = A),
              e.win.set(f.read_buf(y, d), b),
              (y += d),
              (O -= d),
              (b += d),
              (A -= d),
              (s -= d) !== 0)
            )
              break;
            r = _ !== 0 ? Ie : he;
            break;
          case Wt:
            for (; w < 14; ) {
              if (O !== 0) o = L;
              else
                return (
                  (e.bitb = p),
                  (e.bitk = w),
                  (f.avail_in = O),
                  (f.total_in += y - f.next_in_index),
                  (f.next_in_index = y),
                  (e.write = b),
                  e.inflate_flush(f, o)
                );
              O--, (p |= (f.read_byte(y++) & 255) << w), (w += 8);
            }
            if (((i = d = p & 16383), (d & 31) > 29 || ((d >> 5) & 31) > 29))
              return (
                (r = fe),
                (f.msg = "too many length or distance symbols"),
                (o = W),
                (e.bitb = p),
                (e.bitk = w),
                (f.avail_in = O),
                (f.total_in += y - f.next_in_index),
                (f.next_in_index = y),
                (e.write = b),
                e.inflate_flush(f, o)
              );
            if (((d = 258 + (d & 31) + ((d >> 5) & 31)), !c || c.length < d))
              c = [];
            else for (T = 0; T < d; T++) c[T] = 0;
            (p >>>= 14), (w -= 14), (a = 0), (r = Bt);
          case Bt:
            for (; a < 4 + (i >>> 10); ) {
              for (; w < 3; ) {
                if (O !== 0) o = L;
                else
                  return (
                    (e.bitb = p),
                    (e.bitk = w),
                    (f.avail_in = O),
                    (f.total_in += y - f.next_in_index),
                    (f.next_in_index = y),
                    (e.write = b),
                    e.inflate_flush(f, o)
                  );
                O--, (p |= (f.read_byte(y++) & 255) << w), (w += 8);
              }
              (c[vt[a++]] = p & 7), (p >>>= 3), (w -= 3);
            }
            for (; a < 19; ) c[vt[a++]] = 0;
            if (((l[0] = 7), (d = S.inflate_trees_bits(c, l, h, m, f)), d != L))
              return (
                (o = d),
                o == W && ((c = null), (r = fe)),
                (e.bitb = p),
                (e.bitk = w),
                (f.avail_in = O),
                (f.total_in += y - f.next_in_index),
                (f.next_in_index = y),
                (e.write = b),
                e.inflate_flush(f, o)
              );
            (a = 0), (r = jt);
          case jt:
            for (; (d = i), !(a >= 258 + (d & 31) + ((d >> 5) & 31)); ) {
              let v, F;
              for (d = l[0]; w < d; ) {
                if (O !== 0) o = L;
                else
                  return (
                    (e.bitb = p),
                    (e.bitk = w),
                    (f.avail_in = O),
                    (f.total_in += y - f.next_in_index),
                    (f.next_in_index = y),
                    (e.write = b),
                    e.inflate_flush(f, o)
                  );
                O--, (p |= (f.read_byte(y++) & 255) << w), (w += 8);
              }
              if (
                ((d = m[(h[0] + (p & Z[d])) * 3 + 1]),
                (F = m[(h[0] + (p & Z[d])) * 3 + 2]),
                F < 16)
              )
                (p >>>= d), (w -= d), (c[a++] = F);
              else {
                for (
                  T = F == 18 ? 7 : F - 14, v = F == 18 ? 11 : 3;
                  w < d + T;

                ) {
                  if (O !== 0) o = L;
                  else
                    return (
                      (e.bitb = p),
                      (e.bitk = w),
                      (f.avail_in = O),
                      (f.total_in += y - f.next_in_index),
                      (f.next_in_index = y),
                      (e.write = b),
                      e.inflate_flush(f, o)
                    );
                  O--, (p |= (f.read_byte(y++) & 255) << w), (w += 8);
                }
                if (
                  ((p >>>= d),
                  (w -= d),
                  (v += p & Z[T]),
                  (p >>>= T),
                  (w -= T),
                  (T = a),
                  (d = i),
                  T + v > 258 + (d & 31) + ((d >> 5) & 31) ||
                    (F == 16 && T < 1))
                )
                  return (
                    (c = null),
                    (r = fe),
                    (f.msg = "invalid bit length repeat"),
                    (o = W),
                    (e.bitb = p),
                    (e.bitk = w),
                    (f.avail_in = O),
                    (f.total_in += y - f.next_in_index),
                    (f.next_in_index = y),
                    (e.write = b),
                    e.inflate_flush(f, o)
                  );
                F = F == 16 ? c[T - 1] : 0;
                do c[T++] = F;
                while (--v !== 0);
                a = T;
              }
            }
            if (
              ((h[0] = -1),
              (D = []),
              (P = []),
              (N = []),
              (k = []),
              (D[0] = 9),
              (P[0] = 6),
              (d = i),
              (d = S.inflate_trees_dynamic(
                257 + (d & 31),
                1 + ((d >> 5) & 31),
                c,
                D,
                P,
                N,
                k,
                m,
                f,
              )),
              d != L)
            )
              return (
                d == W && ((c = null), (r = fe)),
                (o = d),
                (e.bitb = p),
                (e.bitk = w),
                (f.avail_in = O),
                (f.total_in += y - f.next_in_index),
                (f.next_in_index = y),
                (e.write = b),
                e.inflate_flush(f, o)
              );
            u.init(D[0], P[0], m, N[0], m, k[0]), (r = Ce);
          case Ce:
            if (
              ((e.bitb = p),
              (e.bitk = w),
              (f.avail_in = O),
              (f.total_in += y - f.next_in_index),
              (f.next_in_index = y),
              (e.write = b),
              (o = u.proc(e, f, o)) != z)
            )
              return e.inflate_flush(f, o);
            if (
              ((o = L),
              u.free(f),
              (y = f.next_in_index),
              (O = f.avail_in),
              (p = e.bitb),
              (w = e.bitk),
              (b = e.write),
              (A = b < e.read ? e.read - b - 1 : e.end - b),
              _ === 0)
            ) {
              r = he;
              break;
            }
            r = Ie;
          case Ie:
            if (
              ((e.write = b),
              (o = e.inflate_flush(f, o)),
              (b = e.write),
              (A = b < e.read ? e.read - b - 1 : e.end - b),
              e.read != e.write)
            )
              return (
                (e.bitb = p),
                (e.bitk = w),
                (f.avail_in = O),
                (f.total_in += y - f.next_in_index),
                (f.next_in_index = y),
                (e.write = b),
                e.inflate_flush(f, o)
              );
            r = qt;
          case qt:
            return (
              (o = z),
              (e.bitb = p),
              (e.bitk = w),
              (f.avail_in = O),
              (f.total_in += y - f.next_in_index),
              (f.next_in_index = y),
              (e.write = b),
              e.inflate_flush(f, o)
            );
          case fe:
            return (
              (o = W),
              (e.bitb = p),
              (e.bitk = w),
              (f.avail_in = O),
              (f.total_in += y - f.next_in_index),
              (f.next_in_index = y),
              (e.write = b),
              e.inflate_flush(f, o)
            );
          default:
            return (
              (o = V),
              (e.bitb = p),
              (e.bitk = w),
              (f.avail_in = O),
              (f.total_in += y - f.next_in_index),
              (f.next_in_index = y),
              (e.write = b),
              e.inflate_flush(f, o)
            );
        }
      }
    }),
    (e.free = function (f) {
      e.reset(f, null), (e.win = null), (m = null);
    }),
    (e.set_dictionary = function (f, o, d) {
      e.win.set(f.subarray(o, o + d), 0), (e.read = e.write = d);
    }),
    (e.sync_point = function () {
      return r == Ge ? 1 : 0;
    });
}
const as = 32,
  os = 8,
  cs = 0,
  Gt = 1,
  Yt = 2,
  Vt = 3,
  Zt = 4,
  Kt = 5,
  Ye = 6,
  ge = 7,
  Xt = 12,
  ne = 13,
  ls = [0, 0, 255, 255];
function fs() {
  const n = this;
  (n.mode = 0),
    (n.method = 0),
    (n.was = [0]),
    (n.need = 0),
    (n.marker = 0),
    (n.wbits = 0);
  function t(e) {
    return !e || !e.istate
      ? V
      : ((e.total_in = e.total_out = 0),
        (e.msg = null),
        (e.istate.mode = ge),
        e.istate.blocks.reset(e, null),
        L);
  }
  (n.inflateEnd = function (e) {
    return n.blocks && n.blocks.free(e), (n.blocks = null), L;
  }),
    (n.inflateInit = function (e, r) {
      return (
        (e.msg = null),
        (n.blocks = null),
        r < 8 || r > 15
          ? (n.inflateEnd(e), V)
          : ((n.wbits = r), (e.istate.blocks = new is(e, 1 << r)), t(e), L)
      );
    }),
    (n.inflate = function (e, r) {
      let s, i;
      if (!e || !e.istate || !e.next_in) return V;
      const a = e.istate;
      for (r = r == Xr ? ee : L, s = ee; ; )
        switch (a.mode) {
          case cs:
            if (e.avail_in === 0) return s;
            if (
              ((s = r),
              e.avail_in--,
              e.total_in++,
              ((a.method = e.read_byte(e.next_in_index++)) & 15) != os)
            ) {
              (a.mode = ne),
                (e.msg = "unknown compression method"),
                (a.marker = 5);
              break;
            }
            if ((a.method >> 4) + 8 > a.wbits) {
              (a.mode = ne), (e.msg = "invalid win size"), (a.marker = 5);
              break;
            }
            a.mode = Gt;
          case Gt:
            if (e.avail_in === 0) return s;
            if (
              ((s = r),
              e.avail_in--,
              e.total_in++,
              (i = e.read_byte(e.next_in_index++) & 255),
              ((a.method << 8) + i) % 31 !== 0)
            ) {
              (a.mode = ne), (e.msg = "incorrect header check"), (a.marker = 5);
              break;
            }
            if (!(i & as)) {
              a.mode = ge;
              break;
            }
            a.mode = Yt;
          case Yt:
            if (e.avail_in === 0) return s;
            (s = r),
              e.avail_in--,
              e.total_in++,
              (a.need =
                ((e.read_byte(e.next_in_index++) & 255) << 24) & 4278190080),
              (a.mode = Vt);
          case Vt:
            if (e.avail_in === 0) return s;
            (s = r),
              e.avail_in--,
              e.total_in++,
              (a.need +=
                ((e.read_byte(e.next_in_index++) & 255) << 16) & 16711680),
              (a.mode = Zt);
          case Zt:
            if (e.avail_in === 0) return s;
            (s = r),
              e.avail_in--,
              e.total_in++,
              (a.need += ((e.read_byte(e.next_in_index++) & 255) << 8) & 65280),
              (a.mode = Kt);
          case Kt:
            return e.avail_in === 0
              ? s
              : ((s = r),
                e.avail_in--,
                e.total_in++,
                (a.need += e.read_byte(e.next_in_index++) & 255),
                (a.mode = Ye),
                Zr);
          case Ye:
            return (
              (a.mode = ne), (e.msg = "need dictionary"), (a.marker = 0), V
            );
          case ge:
            if (((s = a.blocks.proc(e, s)), s == W)) {
              (a.mode = ne), (a.marker = 0);
              break;
            }
            if ((s == L && (s = r), s != z)) return s;
            (s = r), a.blocks.reset(e, a.was), (a.mode = Xt);
          case Xt:
            return (e.avail_in = 0), z;
          case ne:
            return W;
          default:
            return V;
        }
    }),
    (n.inflateSetDictionary = function (e, r, s) {
      let i = 0,
        a = s;
      if (!e || !e.istate || e.istate.mode != Ye) return V;
      const c = e.istate;
      return (
        a >= 1 << c.wbits && ((a = (1 << c.wbits) - 1), (i = s - a)),
        c.blocks.set_dictionary(r, i, a),
        (c.mode = ge),
        L
      );
    }),
    (n.inflateSync = function (e) {
      let r, s, i, a, c;
      if (!e || !e.istate) return V;
      const l = e.istate;
      if (
        (l.mode != ne && ((l.mode = ne), (l.marker = 0)),
        (r = e.avail_in) === 0)
      )
        return ee;
      for (s = e.next_in_index, i = l.marker; r !== 0 && i < 4; )
        e.read_byte(s) == ls[i]
          ? i++
          : e.read_byte(s) !== 0
            ? (i = 0)
            : (i = 4 - i),
          s++,
          r--;
      return (
        (e.total_in += s - e.next_in_index),
        (e.next_in_index = s),
        (e.avail_in = r),
        (l.marker = i),
        i != 4
          ? W
          : ((a = e.total_in),
            (c = e.total_out),
            t(e),
            (e.total_in = a),
            (e.total_out = c),
            (l.mode = ge),
            L)
      );
    }),
    (n.inflateSyncPoint = function (e) {
      return !e || !e.istate || !e.istate.blocks
        ? V
        : e.istate.blocks.sync_point();
    });
}
function Sn() {}
Sn.prototype = {
  inflateInit(n) {
    const t = this;
    return (t.istate = new fs()), n || (n = Vr), t.istate.inflateInit(t, n);
  },
  inflate(n) {
    const t = this;
    return t.istate ? t.istate.inflate(t, n) : V;
  },
  inflateEnd() {
    const n = this;
    if (!n.istate) return V;
    const t = n.istate.inflateEnd(n);
    return (n.istate = null), t;
  },
  inflateSync() {
    const n = this;
    return n.istate ? n.istate.inflateSync(n) : V;
  },
  inflateSetDictionary(n, t) {
    const e = this;
    return e.istate ? e.istate.inflateSetDictionary(e, n, t) : V;
  },
  read_byte(n) {
    return this.next_in[n];
  },
  read_buf(n, t) {
    return this.next_in.subarray(n, n + t);
  },
};
function us(n) {
  const t = this,
    e = new Sn(),
    r = n && n.chunkSize ? Math.floor(n.chunkSize * 2) : 128 * 1024,
    s = Kr,
    i = new Uint8Array(r);
  let a = !1;
  e.inflateInit(),
    (e.next_out = i),
    (t.append = function (c, l) {
      const h = [];
      let u,
        _,
        m = 0,
        g = 0,
        S = 0;
      if (c.length !== 0) {
        (e.next_in_index = 0), (e.next_in = c), (e.avail_in = c.length);
        do {
          if (
            ((e.next_out_index = 0),
            (e.avail_out = r),
            e.avail_in === 0 && !a && ((e.next_in_index = 0), (a = !0)),
            (u = e.inflate(s)),
            a && u === ee)
          ) {
            if (e.avail_in !== 0) throw new Error("inflating: bad input");
          } else if (u !== L && u !== z) throw new Error("inflating: " + e.msg);
          if ((a || u === z) && e.avail_in === c.length)
            throw new Error("inflating: bad input");
          e.next_out_index &&
            (e.next_out_index === r
              ? h.push(new Uint8Array(i))
              : h.push(i.subarray(0, e.next_out_index))),
            (S += e.next_out_index),
            l &&
              e.next_in_index > 0 &&
              e.next_in_index != m &&
              (l(e.next_in_index), (m = e.next_in_index));
        } while (e.avail_in > 0 || e.avail_out === 0);
        return (
          h.length > 1
            ? ((_ = new Uint8Array(S)),
              h.forEach(function (f) {
                _.set(f, g), (g += f.length);
              }))
            : (_ = h[0] ? new Uint8Array(h[0]) : new Uint8Array()),
          _
        );
      }
    }),
    (t.flush = function () {
      e.inflateEnd();
    });
}
const de = 4294967295,
  ae = 65535,
  ds = 8,
  _s = 0,
  hs = 99,
  ps = 67324752,
  ms = 134695760,
  $t = 33639248,
  ws = 101010256,
  Jt = 101075792,
  bs = 117853008,
  Ne = 22,
  Ve = 20,
  Ze = 56,
  gs = 1,
  ys = 39169,
  xs = 10,
  Es = 1,
  Ts = 21589,
  Ss = 28789,
  As = 25461,
  Rs = 6534,
  Qt = 1,
  Os = 6,
  zt = 8,
  en = 2048,
  tn = 16,
  Ds = "/",
  $ = void 0,
  Fe = "undefined",
  An = "function";
class nn {
  constructor(t) {
    return class extends TransformStream {
      constructor(e, r) {
        const s = new t(r);
        super({
          transform(i, a) {
            a.enqueue(s.append(i));
          },
          flush(i) {
            const a = s.flush();
            a && i.enqueue(a);
          },
        });
      }
    };
  }
}
const ks = 64;
let Rn = 2;
try {
  typeof navigator != Fe &&
    navigator.hardwareConcurrency &&
    (Rn = navigator.hardwareConcurrency);
} catch {}
const Cs = {
    chunkSize: 512 * 1024,
    maxWorkers: Rn,
    terminateWorkerTimeout: 5e3,
    useWebWorkers: !0,
    useCompressionStream: !0,
    workerScripts: $,
    CompressionStreamNative:
      typeof CompressionStream != Fe && CompressionStream,
    DecompressionStreamNative:
      typeof DecompressionStream != Fe && DecompressionStream,
  },
  oe = Object.assign({}, Cs);
function On() {
  return oe;
}
function Is(n) {
  return Math.max(n.chunkSize, ks);
}
function Dn(n) {
  const {
    baseURL: t,
    chunkSize: e,
    maxWorkers: r,
    terminateWorkerTimeout: s,
    useCompressionStream: i,
    useWebWorkers: a,
    Deflate: c,
    Inflate: l,
    CompressionStream: h,
    DecompressionStream: u,
    workerScripts: _,
  } = n;
  if (
    (re("baseURL", t),
    re("chunkSize", e),
    re("maxWorkers", r),
    re("terminateWorkerTimeout", s),
    re("useCompressionStream", i),
    re("useWebWorkers", a),
    c && (oe.CompressionStream = new nn(c)),
    l && (oe.DecompressionStream = new nn(l)),
    re("CompressionStream", h),
    re("DecompressionStream", u),
    _ !== $)
  ) {
    const { deflate: m, inflate: g } = _;
    if (((m || g) && (oe.workerScripts || (oe.workerScripts = {})), m)) {
      if (!Array.isArray(m))
        throw new Error("workerScripts.deflate must be an array");
      oe.workerScripts.deflate = m;
    }
    if (g) {
      if (!Array.isArray(g))
        throw new Error("workerScripts.inflate must be an array");
      oe.workerScripts.inflate = g;
    }
  }
}
function re(n, t) {
  t !== $ && (oe[n] = t);
}
function Ns() {
  return "application/octet-stream";
}
const kn = [];
for (let n = 0; n < 256; n++) {
  let t = n;
  for (let e = 0; e < 8; e++)
    t & 1 ? (t = (t >>> 1) ^ 3988292384) : (t = t >>> 1);
  kn[n] = t;
}
class Ue {
  constructor(t) {
    this.crc = t || -1;
  }
  append(t) {
    let e = this.crc | 0;
    for (let r = 0, s = t.length | 0; r < s; r++)
      e = (e >>> 8) ^ kn[(e ^ t[r]) & 255];
    this.crc = e;
  }
  get() {
    return ~this.crc;
  }
}
class Cn extends TransformStream {
  constructor() {
    let t;
    const e = new Ue();
    super({
      transform(r, s) {
        e.append(r), s.enqueue(r);
      },
      flush() {
        const r = new Uint8Array(4);
        new DataView(r.buffer).setUint32(0, e.get()), (t.value = r);
      },
    }),
      (t = this);
  }
}
function Ps(n) {
  if (typeof TextEncoder > "u") {
    n = unescape(encodeURIComponent(n));
    const t = new Uint8Array(n.length);
    for (let e = 0; e < t.length; e++) t[e] = n.charCodeAt(e);
    return t;
  } else return new TextEncoder().encode(n);
}
const Y = {
    concat(n, t) {
      if (n.length === 0 || t.length === 0) return n.concat(t);
      const e = n[n.length - 1],
        r = Y.getPartial(e);
      return r === 32
        ? n.concat(t)
        : Y._shiftRight(t, r, e | 0, n.slice(0, n.length - 1));
    },
    bitLength(n) {
      const t = n.length;
      if (t === 0) return 0;
      const e = n[t - 1];
      return (t - 1) * 32 + Y.getPartial(e);
    },
    clamp(n, t) {
      if (n.length * 32 < t) return n;
      n = n.slice(0, Math.ceil(t / 32));
      const e = n.length;
      return (
        (t = t & 31),
        e > 0 &&
          t &&
          (n[e - 1] = Y.partial(t, n[e - 1] & (2147483648 >> (t - 1)), 1)),
        n
      );
    },
    partial(n, t, e) {
      return n === 32 ? t : (e ? t | 0 : t << (32 - n)) + n * 1099511627776;
    },
    getPartial(n) {
      return Math.round(n / 1099511627776) || 32;
    },
    _shiftRight(n, t, e, r) {
      for (r === void 0 && (r = []); t >= 32; t -= 32) r.push(e), (e = 0);
      if (t === 0) return r.concat(n);
      for (let a = 0; a < n.length; a++)
        r.push(e | (n[a] >>> t)), (e = n[a] << (32 - t));
      const s = n.length ? n[n.length - 1] : 0,
        i = Y.getPartial(s);
      return r.push(Y.partial((t + i) & 31, t + i > 32 ? e : r.pop(), 1)), r;
    },
  },
  Me = {
    bytes: {
      fromBits(n) {
        const e = Y.bitLength(n) / 8,
          r = new Uint8Array(e);
        let s;
        for (let i = 0; i < e; i++)
          i & 3 || (s = n[i / 4]), (r[i] = s >>> 24), (s <<= 8);
        return r;
      },
      toBits(n) {
        const t = [];
        let e,
          r = 0;
        for (e = 0; e < n.length; e++)
          (r = (r << 8) | n[e]), (e & 3) === 3 && (t.push(r), (r = 0));
        return e & 3 && t.push(Y.partial(8 * (e & 3), r)), t;
      },
    },
  },
  In = {};
In.sha1 = class {
  constructor(n) {
    const t = this;
    (t.blockSize = 512),
      (t._init = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
      (t._key = [1518500249, 1859775393, 2400959708, 3395469782]),
      n
        ? ((t._h = n._h.slice(0)),
          (t._buffer = n._buffer.slice(0)),
          (t._length = n._length))
        : t.reset();
  }
  reset() {
    const n = this;
    return (n._h = n._init.slice(0)), (n._buffer = []), (n._length = 0), n;
  }
  update(n) {
    const t = this;
    typeof n == "string" && (n = Me.utf8String.toBits(n));
    const e = (t._buffer = Y.concat(t._buffer, n)),
      r = t._length,
      s = (t._length = r + Y.bitLength(n));
    if (s > 9007199254740991)
      throw new Error("Cannot hash more than 2^53 - 1 bits");
    const i = new Uint32Array(e);
    let a = 0;
    for (
      let c = t.blockSize + r - ((t.blockSize + r) & (t.blockSize - 1));
      c <= s;
      c += t.blockSize
    )
      t._block(i.subarray(16 * a, 16 * (a + 1))), (a += 1);
    return e.splice(0, 16 * a), t;
  }
  finalize() {
    const n = this;
    let t = n._buffer;
    const e = n._h;
    t = Y.concat(t, [Y.partial(1, 1)]);
    for (let r = t.length + 2; r & 15; r++) t.push(0);
    for (
      t.push(Math.floor(n._length / 4294967296)), t.push(n._length | 0);
      t.length;

    )
      n._block(t.splice(0, 16));
    return n.reset(), e;
  }
  _f(n, t, e, r) {
    if (n <= 19) return (t & e) | (~t & r);
    if (n <= 39) return t ^ e ^ r;
    if (n <= 59) return (t & e) | (t & r) | (e & r);
    if (n <= 79) return t ^ e ^ r;
  }
  _S(n, t) {
    return (t << n) | (t >>> (32 - n));
  }
  _block(n) {
    const t = this,
      e = t._h,
      r = Array(80);
    for (let h = 0; h < 16; h++) r[h] = n[h];
    let s = e[0],
      i = e[1],
      a = e[2],
      c = e[3],
      l = e[4];
    for (let h = 0; h <= 79; h++) {
      h >= 16 && (r[h] = t._S(1, r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16]));
      const u =
        (t._S(5, s) +
          t._f(h, i, a, c) +
          l +
          r[h] +
          t._key[Math.floor(h / 20)]) |
        0;
      (l = c), (c = a), (a = t._S(30, i)), (i = s), (s = u);
    }
    (e[0] = (e[0] + s) | 0),
      (e[1] = (e[1] + i) | 0),
      (e[2] = (e[2] + a) | 0),
      (e[3] = (e[3] + c) | 0),
      (e[4] = (e[4] + l) | 0);
  }
};
const Nn = {};
Nn.aes = class {
  constructor(n) {
    const t = this;
    (t._tables = [
      [[], [], [], [], []],
      [[], [], [], [], []],
    ]),
      t._tables[0][0][0] || t._precompute();
    const e = t._tables[0][4],
      r = t._tables[1],
      s = n.length;
    let i,
      a,
      c,
      l = 1;
    if (s !== 4 && s !== 6 && s !== 8) throw new Error("invalid aes key size");
    for (t._key = [(a = n.slice(0)), (c = [])], i = s; i < 4 * s + 28; i++) {
      let h = a[i - 1];
      (i % s === 0 || (s === 8 && i % s === 4)) &&
        ((h =
          (e[h >>> 24] << 24) ^
          (e[(h >> 16) & 255] << 16) ^
          (e[(h >> 8) & 255] << 8) ^
          e[h & 255]),
        i % s === 0 &&
          ((h = (h << 8) ^ (h >>> 24) ^ (l << 24)),
          (l = (l << 1) ^ ((l >> 7) * 283)))),
        (a[i] = a[i - s] ^ h);
    }
    for (let h = 0; i; h++, i--) {
      const u = a[h & 3 ? i : i - 4];
      i <= 4 || h < 4
        ? (c[h] = u)
        : (c[h] =
            r[0][e[u >>> 24]] ^
            r[1][e[(u >> 16) & 255]] ^
            r[2][e[(u >> 8) & 255]] ^
            r[3][e[u & 255]]);
    }
  }
  encrypt(n) {
    return this._crypt(n, 0);
  }
  decrypt(n) {
    return this._crypt(n, 1);
  }
  _precompute() {
    const n = this._tables[0],
      t = this._tables[1],
      e = n[4],
      r = t[4],
      s = [],
      i = [];
    let a, c, l, h;
    for (let u = 0; u < 256; u++)
      i[(s[u] = (u << 1) ^ ((u >> 7) * 283)) ^ u] = u;
    for (let u = (a = 0); !e[u]; u ^= c || 1, a = i[a] || 1) {
      let _ = a ^ (a << 1) ^ (a << 2) ^ (a << 3) ^ (a << 4);
      (_ = (_ >> 8) ^ (_ & 255) ^ 99),
        (e[u] = _),
        (r[_] = u),
        (h = s[(l = s[(c = s[u])])]);
      let m = (h * 16843009) ^ (l * 65537) ^ (c * 257) ^ (u * 16843008),
        g = (s[_] * 257) ^ (_ * 16843008);
      for (let S = 0; S < 4; S++)
        (n[S][u] = g = (g << 24) ^ (g >>> 8)),
          (t[S][_] = m = (m << 24) ^ (m >>> 8));
    }
    for (let u = 0; u < 5; u++) (n[u] = n[u].slice(0)), (t[u] = t[u].slice(0));
  }
  _crypt(n, t) {
    if (n.length !== 4) throw new Error("invalid aes block size");
    const e = this._key[t],
      r = e.length / 4 - 2,
      s = [0, 0, 0, 0],
      i = this._tables[t],
      a = i[0],
      c = i[1],
      l = i[2],
      h = i[3],
      u = i[4];
    let _ = n[0] ^ e[0],
      m = n[t ? 3 : 1] ^ e[1],
      g = n[2] ^ e[2],
      S = n[t ? 1 : 3] ^ e[3],
      f = 4,
      o,
      d,
      p;
    for (let w = 0; w < r; w++)
      (o =
        a[_ >>> 24] ^
        c[(m >> 16) & 255] ^
        l[(g >> 8) & 255] ^
        h[S & 255] ^
        e[f]),
        (d =
          a[m >>> 24] ^
          c[(g >> 16) & 255] ^
          l[(S >> 8) & 255] ^
          h[_ & 255] ^
          e[f + 1]),
        (p =
          a[g >>> 24] ^
          c[(S >> 16) & 255] ^
          l[(_ >> 8) & 255] ^
          h[m & 255] ^
          e[f + 2]),
        (S =
          a[S >>> 24] ^
          c[(_ >> 16) & 255] ^
          l[(m >> 8) & 255] ^
          h[g & 255] ^
          e[f + 3]),
        (f += 4),
        (_ = o),
        (m = d),
        (g = p);
    for (let w = 0; w < 4; w++)
      (s[t ? 3 & -w : w] =
        (u[_ >>> 24] << 24) ^
        (u[(m >> 16) & 255] << 16) ^
        (u[(g >> 8) & 255] << 8) ^
        u[S & 255] ^
        e[f++]),
        (o = _),
        (_ = m),
        (m = g),
        (g = S),
        (S = o);
    return s;
  }
};
const Ls = {
    getRandomValues(n) {
      const t = new Uint32Array(n.buffer),
        e = (r) => {
          let s = 987654321;
          const i = 4294967295;
          return function () {
            return (
              (s = (36969 * (s & 65535) + (s >> 16)) & i),
              (r = (18e3 * (r & 65535) + (r >> 16)) & i),
              ((((s << 16) + r) & i) / 4294967296 + 0.5) *
                (Math.random() > 0.5 ? 1 : -1)
            );
          };
        };
      for (let r = 0, s; r < n.length; r += 4) {
        const i = e((s || Math.random()) * 4294967296);
        (s = i() * 987654071), (t[r / 4] = (i() * 4294967296) | 0);
      }
      return n;
    },
  },
  Pn = {};
Pn.ctrGladman = class {
  constructor(n, t) {
    (this._prf = n), (this._initIv = t), (this._iv = t);
  }
  reset() {
    this._iv = this._initIv;
  }
  update(n) {
    return this.calculate(this._prf, n, this._iv);
  }
  incWord(n) {
    if (((n >> 24) & 255) === 255) {
      let t = (n >> 16) & 255,
        e = (n >> 8) & 255,
        r = n & 255;
      t === 255
        ? ((t = 0), e === 255 ? ((e = 0), r === 255 ? (r = 0) : ++r) : ++e)
        : ++t,
        (n = 0),
        (n += t << 16),
        (n += e << 8),
        (n += r);
    } else n += 1 << 24;
    return n;
  }
  incCounter(n) {
    (n[0] = this.incWord(n[0])) === 0 && (n[1] = this.incWord(n[1]));
  }
  calculate(n, t, e) {
    let r;
    if (!(r = t.length)) return [];
    const s = Y.bitLength(t);
    for (let i = 0; i < r; i += 4) {
      this.incCounter(e);
      const a = n.encrypt(e);
      (t[i] ^= a[0]),
        (t[i + 1] ^= a[1]),
        (t[i + 2] ^= a[2]),
        (t[i + 3] ^= a[3]);
    }
    return Y.clamp(t, s);
  }
};
const _e = {
  importKey(n) {
    return new _e.hmacSha1(Me.bytes.toBits(n));
  },
  pbkdf2(n, t, e, r) {
    if (((e = e || 1e4), r < 0 || e < 0))
      throw new Error("invalid params to pbkdf2");
    const s = ((r >> 5) + 1) << 2;
    let i, a, c, l, h;
    const u = new ArrayBuffer(s),
      _ = new DataView(u);
    let m = 0;
    const g = Y;
    for (t = Me.bytes.toBits(t), h = 1; m < (s || 1); h++) {
      for (i = a = n.encrypt(g.concat(t, [h])), c = 1; c < e; c++)
        for (a = n.encrypt(a), l = 0; l < a.length; l++) i[l] ^= a[l];
      for (c = 0; m < (s || 1) && c < i.length; c++)
        _.setInt32(m, i[c]), (m += 4);
    }
    return u.slice(0, r / 8);
  },
};
_e.hmacSha1 = class {
  constructor(n) {
    const t = this,
      e = (t._hash = In.sha1),
      r = [[], []];
    t._baseHash = [new e(), new e()];
    const s = t._baseHash[0].blockSize / 32;
    n.length > s && (n = new e().update(n).finalize());
    for (let i = 0; i < s; i++)
      (r[0][i] = n[i] ^ 909522486), (r[1][i] = n[i] ^ 1549556828);
    t._baseHash[0].update(r[0]),
      t._baseHash[1].update(r[1]),
      (t._resultHash = new e(t._baseHash[0]));
  }
  reset() {
    const n = this;
    (n._resultHash = new n._hash(n._baseHash[0])), (n._updated = !1);
  }
  update(n) {
    const t = this;
    (t._updated = !0), t._resultHash.update(n);
  }
  digest() {
    const n = this,
      t = n._resultHash.finalize(),
      e = new n._hash(n._baseHash[1]).update(t).finalize();
    return n.reset(), e;
  }
  encrypt(n) {
    if (this._updated)
      throw new Error("encrypt on already updated hmac called!");
    return this.update(n), this.digest(n);
  }
};
const Fs = typeof crypto < "u" && typeof crypto.getRandomValues == "function",
  dt = "Invalid password",
  _t = "Invalid signature",
  ht = "zipjs-abort-check-password";
function Ln(n) {
  return Fs ? crypto.getRandomValues(n) : Ls.getRandomValues(n);
}
const pe = 16,
  Us = "raw",
  Fn = { name: "PBKDF2" },
  Ms = { name: "HMAC" },
  vs = "SHA-1",
  Hs = Object.assign({ hash: Ms }, Fn),
  tt = Object.assign({ iterations: 1e3, hash: { name: vs } }, Fn),
  Ws = ["deriveBits"],
  Ee = [8, 12, 16],
  ye = [16, 24, 32],
  se = 10,
  Bs = [0, 0, 0, 0],
  Un = "undefined",
  Mn = "function",
  We = typeof crypto != Un,
  Re = We && crypto.subtle,
  vn = We && typeof Re != Un,
  J = Me.bytes,
  js = Nn.aes,
  qs = Pn.ctrGladman,
  Gs = _e.hmacSha1;
let rn = We && vn && typeof Re.importKey == Mn,
  sn = We && vn && typeof Re.deriveBits == Mn;
class Ys extends TransformStream {
  constructor({
    password: t,
    signed: e,
    encryptionStrength: r,
    checkPasswordOnly: s,
  }) {
    super({
      start() {
        Object.assign(this, {
          ready: new Promise((i) => (this.resolveReady = i)),
          password: t,
          signed: e,
          strength: r - 1,
          pending: new Uint8Array(),
        });
      },
      async transform(i, a) {
        const c = this,
          { password: l, strength: h, resolveReady: u, ready: _ } = c;
        l
          ? (await Zs(c, h, l, X(i, 0, Ee[h] + 2)),
            (i = X(i, Ee[h] + 2)),
            s ? a.error(new Error(ht)) : u())
          : await _;
        const m = new Uint8Array(i.length - se - ((i.length - se) % pe));
        a.enqueue(Hn(c, i, m, 0, se, !0));
      },
      async flush(i) {
        const { signed: a, ctr: c, hmac: l, pending: h, ready: u } = this;
        await u;
        const _ = X(h, 0, h.length - se),
          m = X(h, h.length - se);
        let g = new Uint8Array();
        if (_.length) {
          const S = Se(J, _);
          l.update(S);
          const f = c.update(S);
          g = Te(J, f);
        }
        if (a) {
          const S = X(Te(J, l.digest()), 0, se);
          for (let f = 0; f < se; f++) if (S[f] != m[f]) throw new Error(_t);
        }
        i.enqueue(g);
      },
    });
  }
}
class Vs extends TransformStream {
  constructor({ password: t, encryptionStrength: e }) {
    let r;
    super({
      start() {
        Object.assign(this, {
          ready: new Promise((s) => (this.resolveReady = s)),
          password: t,
          strength: e - 1,
          pending: new Uint8Array(),
        });
      },
      async transform(s, i) {
        const a = this,
          { password: c, strength: l, resolveReady: h, ready: u } = a;
        let _ = new Uint8Array();
        c ? ((_ = await Ks(a, l, c)), h()) : await u;
        const m = new Uint8Array(_.length + s.length - (s.length % pe));
        m.set(_, 0), i.enqueue(Hn(a, s, m, _.length, 0));
      },
      async flush(s) {
        const { ctr: i, hmac: a, pending: c, ready: l } = this;
        await l;
        let h = new Uint8Array();
        if (c.length) {
          const u = i.update(Se(J, c));
          a.update(u), (h = Te(J, u));
        }
        (r.signature = Te(J, a.digest()).slice(0, se)),
          s.enqueue(pt(h, r.signature));
      },
    }),
      (r = this);
  }
}
function Hn(n, t, e, r, s, i) {
  const { ctr: a, hmac: c, pending: l } = n,
    h = t.length - s;
  l.length && ((t = pt(l, t)), (e = Js(e, h - (h % pe))));
  let u;
  for (u = 0; u <= h - pe; u += pe) {
    const _ = Se(J, X(t, u, u + pe));
    i && c.update(_);
    const m = a.update(_);
    i || c.update(m), e.set(Te(J, m), u + r);
  }
  return (n.pending = X(t, u)), e;
}
async function Zs(n, t, e, r) {
  const s = await Wn(n, t, e, X(r, 0, Ee[t])),
    i = X(r, Ee[t]);
  if (s[0] != i[0] || s[1] != i[1]) throw new Error(dt);
}
async function Ks(n, t, e) {
  const r = Ln(new Uint8Array(Ee[t])),
    s = await Wn(n, t, e, r);
  return pt(r, s);
}
async function Wn(n, t, e, r) {
  n.password = null;
  const s = Ps(e),
    i = await Xs(Us, s, Hs, !1, Ws),
    a = await $s(Object.assign({ salt: r }, tt), i, 8 * (ye[t] * 2 + 2)),
    c = new Uint8Array(a),
    l = Se(J, X(c, 0, ye[t])),
    h = Se(J, X(c, ye[t], ye[t] * 2)),
    u = X(c, ye[t] * 2);
  return (
    Object.assign(n, {
      keys: { key: l, authentication: h, passwordVerification: u },
      ctr: new qs(new js(l), Array.from(Bs)),
      hmac: new Gs(h),
    }),
    u
  );
}
async function Xs(n, t, e, r, s) {
  if (rn)
    try {
      return await Re.importKey(n, t, e, r, s);
    } catch {
      return (rn = !1), _e.importKey(t);
    }
  else return _e.importKey(t);
}
async function $s(n, t, e) {
  if (sn)
    try {
      return await Re.deriveBits(n, t, e);
    } catch {
      return (sn = !1), _e.pbkdf2(t, n.salt, tt.iterations, e);
    }
  else return _e.pbkdf2(t, n.salt, tt.iterations, e);
}
function pt(n, t) {
  let e = n;
  return (
    n.length + t.length &&
      ((e = new Uint8Array(n.length + t.length)),
      e.set(n, 0),
      e.set(t, n.length)),
    e
  );
}
function Js(n, t) {
  if (t && t > n.length) {
    const e = n;
    (n = new Uint8Array(t)), n.set(e, 0);
  }
  return n;
}
function X(n, t, e) {
  return n.subarray(t, e);
}
function Te(n, t) {
  return n.fromBits(t);
}
function Se(n, t) {
  return n.toBits(t);
}
const me = 12;
class Qs extends TransformStream {
  constructor({ password: t, passwordVerification: e, checkPasswordOnly: r }) {
    super({
      start() {
        Object.assign(this, { password: t, passwordVerification: e }),
          Bn(this, t);
      },
      transform(s, i) {
        const a = this;
        if (a.password) {
          const c = an(a, s.subarray(0, me));
          if (((a.password = null), c[me - 1] != a.passwordVerification))
            throw new Error(dt);
          s = s.subarray(me);
        }
        r ? i.error(new Error(ht)) : i.enqueue(an(a, s));
      },
    });
  }
}
class zs extends TransformStream {
  constructor({ password: t, passwordVerification: e }) {
    super({
      start() {
        Object.assign(this, { password: t, passwordVerification: e }),
          Bn(this, t);
      },
      transform(r, s) {
        const i = this;
        let a, c;
        if (i.password) {
          i.password = null;
          const l = Ln(new Uint8Array(me));
          (l[me - 1] = i.passwordVerification),
            (a = new Uint8Array(r.length + l.length)),
            a.set(on(i, l), 0),
            (c = me);
        } else (a = new Uint8Array(r.length)), (c = 0);
        a.set(on(i, r), c), s.enqueue(a);
      },
    });
  }
}
function an(n, t) {
  const e = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++) (e[r] = jn(n) ^ t[r]), mt(n, e[r]);
  return e;
}
function on(n, t) {
  const e = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++) (e[r] = jn(n) ^ t[r]), mt(n, t[r]);
  return e;
}
function Bn(n, t) {
  const e = [305419896, 591751049, 878082192];
  Object.assign(n, { keys: e, crcKey0: new Ue(e[0]), crcKey2: new Ue(e[2]) });
  for (let r = 0; r < t.length; r++) mt(n, t.charCodeAt(r));
}
function mt(n, t) {
  let [e, r, s] = n.keys;
  n.crcKey0.append([t]),
    (e = ~n.crcKey0.get()),
    (r = cn(Math.imul(cn(r + qn(e)), 134775813) + 1)),
    n.crcKey2.append([r >>> 24]),
    (s = ~n.crcKey2.get()),
    (n.keys = [e, r, s]);
}
function jn(n) {
  const t = n.keys[2] | 2;
  return qn(Math.imul(t, t ^ 1) >>> 8);
}
function qn(n) {
  return n & 255;
}
function cn(n) {
  return n & 4294967295;
}
const ln = "deflate-raw";
class ei extends TransformStream {
  constructor(
    t,
    { chunkSize: e, CompressionStream: r, CompressionStreamNative: s },
  ) {
    super({});
    const {
        compressed: i,
        encrypted: a,
        useCompressionStream: c,
        zipCrypto: l,
        signed: h,
        level: u,
      } = t,
      _ = this;
    let m,
      g,
      S = Gn(super.readable);
    (!a || l) && h && ((m = new Cn()), (S = Q(S, m))),
      i && (S = Vn(S, c, { level: u, chunkSize: e }, s, r)),
      a && (l ? (S = Q(S, new zs(t))) : ((g = new Vs(t)), (S = Q(S, g)))),
      Yn(_, S, () => {
        let f;
        a && !l && (f = g.signature),
          (!a || l) && h && (f = new DataView(m.value.buffer).getUint32(0)),
          (_.signature = f);
      });
  }
}
class ti extends TransformStream {
  constructor(
    t,
    { chunkSize: e, DecompressionStream: r, DecompressionStreamNative: s },
  ) {
    super({});
    const {
      zipCrypto: i,
      encrypted: a,
      signed: c,
      signature: l,
      compressed: h,
      useCompressionStream: u,
    } = t;
    let _,
      m,
      g = Gn(super.readable);
    a && (i ? (g = Q(g, new Qs(t))) : ((m = new Ys(t)), (g = Q(g, m)))),
      h && (g = Vn(g, u, { chunkSize: e }, s, r)),
      (!a || i) && c && ((_ = new Cn()), (g = Q(g, _))),
      Yn(this, g, () => {
        if ((!a || i) && c) {
          const S = new DataView(_.value.buffer);
          if (l != S.getUint32(0, !1)) throw new Error(_t);
        }
      });
  }
}
function Gn(n) {
  return Q(
    n,
    new TransformStream({
      transform(t, e) {
        t && t.length && e.enqueue(t);
      },
    }),
  );
}
function Yn(n, t, e) {
  (t = Q(t, new TransformStream({ flush: e }))),
    Object.defineProperty(n, "readable", {
      get() {
        return t;
      },
    });
}
function Vn(n, t, e, r, s) {
  try {
    const i = t && r ? r : s;
    n = Q(n, new i(ln, e));
  } catch (i) {
    if (t) n = Q(n, new s(ln, e));
    else throw i;
  }
  return n;
}
function Q(n, t) {
  return n.pipeThrough(t);
}
const ni = "message",
  ri = "start",
  si = "pull",
  fn = "data",
  ii = "ack",
  ai = "close",
  oi = "deflate",
  Zn = "inflate";
class ci extends TransformStream {
  constructor(t, e) {
    super({});
    const r = this,
      { codecType: s } = t;
    let i;
    s.startsWith(oi) ? (i = ei) : s.startsWith(Zn) && (i = ti);
    let a = 0;
    const c = new i(t, e),
      l = super.readable,
      h = new TransformStream({
        transform(u, _) {
          u && u.length && ((a += u.length), _.enqueue(u));
        },
        flush() {
          const { signature: u } = c;
          Object.assign(r, { signature: u, size: a });
        },
      });
    Object.defineProperty(r, "readable", {
      get() {
        return l.pipeThrough(c).pipeThrough(h);
      },
    });
  }
}
const li = typeof Worker != Fe;
class Ke {
  constructor(
    t,
    { readable: e, writable: r },
    {
      options: s,
      config: i,
      streamOptions: a,
      useWebWorkers: c,
      transferStreams: l,
      scripts: h,
    },
    u,
  ) {
    const { signal: _ } = a;
    return (
      Object.assign(t, {
        busy: !0,
        readable: e.pipeThrough(new fi(e, a, i), { signal: _ }),
        writable: r,
        options: Object.assign({}, s),
        scripts: h,
        transferStreams: l,
        terminate() {
          const { worker: m, busy: g } = t;
          m && !g && (m.terminate(), (t.interface = null));
        },
        onTaskFinished() {
          (t.busy = !1), u(t);
        },
      }),
      (c && li ? di : ui)(t, i)
    );
  }
}
class fi extends TransformStream {
  constructor(
    t,
    { onstart: e, onprogress: r, size: s, onend: i },
    { chunkSize: a },
  ) {
    let c = 0;
    super(
      {
        start() {
          e && Xe(e, s);
        },
        async transform(l, h) {
          (c += l.length), r && (await Xe(r, c, s)), h.enqueue(l);
        },
        flush() {
          (t.size = c), i && Xe(i, c);
        },
      },
      { highWaterMark: 1, size: () => a },
    );
  }
}
async function Xe(n, ...t) {
  try {
    await n(...t);
  } catch {}
}
function ui(n, t) {
  return { run: () => _i(n, t) };
}
function di(n, { baseURL: t, chunkSize: e }) {
  return (
    n.interface ||
      Object.assign(n, {
        worker: mi(n.scripts[0], t, n),
        interface: { run: () => hi(n, { chunkSize: e }) },
      }),
    n.interface
  );
}
async function _i(
  { options: n, readable: t, writable: e, onTaskFinished: r },
  s,
) {
  const i = new ci(n, s);
  try {
    await t.pipeThrough(i).pipeTo(e, { preventClose: !0, preventAbort: !0 });
    const { signature: a, size: c } = i;
    return { signature: a, size: c };
  } finally {
    r();
  }
}
async function hi(n, t) {
  let e, r;
  const s = new Promise((m, g) => {
    (e = m), (r = g);
  });
  Object.assign(n, {
    reader: null,
    writer: null,
    resolveResult: e,
    rejectResult: r,
    result: s,
  });
  const { readable: i, options: a, scripts: c } = n,
    { writable: l, closed: h } = pi(n.writable);
  nt(
    {
      type: ri,
      scripts: c.slice(1),
      options: a,
      config: t,
      readable: i,
      writable: l,
    },
    n,
  ) || Object.assign(n, { reader: i.getReader(), writer: l.getWriter() });
  const _ = await s;
  try {
    await l.getWriter().close();
  } catch {}
  return await h, _;
}
function pi(n) {
  const t = n.getWriter();
  let e;
  const r = new Promise((i) => (e = i));
  return {
    writable: new WritableStream({
      async write(i) {
        await t.ready, await t.write(i);
      },
      close() {
        t.releaseLock(), e();
      },
      abort(i) {
        return t.abort(i);
      },
    }),
    closed: r,
  };
}
let un = !0,
  dn = !0;
function mi(n, t, e) {
  const r = { type: "module" };
  let s, i;
  typeof n == An && (n = n());
  try {
    s = new URL(n, t);
  } catch {
    s = n;
  }
  if (un)
    try {
      i = new Worker(s);
    } catch {
      (un = !1), (i = new Worker(s, r));
    }
  else i = new Worker(s, r);
  return i.addEventListener(ni, (a) => wi(a, e)), i;
}
function nt(
  n,
  { worker: t, writer: e, onTaskFinished: r, transferStreams: s },
) {
  try {
    let { value: i, readable: a, writable: c } = n;
    const l = [];
    if (
      (i && ((n.value = i.buffer), l.push(n.value)),
      s && dn
        ? (a && l.push(a), c && l.push(c))
        : (n.readable = n.writable = null),
      l.length)
    )
      try {
        return t.postMessage(n, l), !0;
      } catch {
        (dn = !1), (n.readable = n.writable = null), t.postMessage(n);
      }
    else t.postMessage(n);
  } catch (i) {
    throw (e && e.releaseLock(), r(), i);
  }
}
async function wi({ data: n }, t) {
  const { type: e, value: r, messageId: s, result: i, error: a } = n,
    {
      reader: c,
      writer: l,
      resolveResult: h,
      rejectResult: u,
      onTaskFinished: _,
    } = t;
  try {
    if (a) {
      const { message: g, stack: S, code: f, name: o } = a,
        d = new Error(g);
      Object.assign(d, { stack: S, code: f, name: o }), m(d);
    } else {
      if (e == si) {
        const { value: g, done: S } = await c.read();
        nt({ type: fn, value: g, done: S, messageId: s }, t);
      }
      e == fn &&
        (await l.ready,
        await l.write(new Uint8Array(r)),
        nt({ type: ii, messageId: s }, t)),
        e == ai && m(null, i);
    }
  } catch (g) {
    m(g);
  }
  function m(g, S) {
    g ? u(g) : h(S), l && l.releaseLock(), _();
  }
}
let ie = [];
const $e = [];
let _n = 0;
async function bi(n, t) {
  const { options: e, config: r } = t,
    {
      transferStreams: s,
      useWebWorkers: i,
      useCompressionStream: a,
      codecType: c,
      compressed: l,
      signed: h,
      encrypted: u,
    } = e,
    { workerScripts: _, maxWorkers: m, terminateWorkerTimeout: g } = r;
  t.transferStreams = s || s === $;
  const S = !l && !h && !u && !t.transferStreams;
  (t.useWebWorkers = !S && (i || (i === $ && r.useWebWorkers))),
    (t.scripts = t.useWebWorkers && _ ? _[c] : []),
    (e.useCompressionStream = a || (a === $ && r.useCompressionStream));
  let f;
  const o = ie.find((p) => !p.busy);
  if (o) rt(o), (f = new Ke(o, n, t, d));
  else if (ie.length < m) {
    const p = { indexWorker: _n };
    _n++, ie.push(p), (f = new Ke(p, n, t, d));
  } else
    f = await new Promise((p) =>
      $e.push({ resolve: p, stream: n, workerOptions: t }),
    );
  return f.run();
  function d(p) {
    if ($e.length) {
      const [{ resolve: w, stream: y, workerOptions: O }] = $e.splice(0, 1);
      w(new Ke(p, y, O, d));
    } else
      p.worker
        ? (rt(p),
          Number.isFinite(g) &&
            g >= 0 &&
            (p.terminateTimeout = setTimeout(() => {
              (ie = ie.filter((w) => w != p)), p.terminate();
            }, g)))
        : (ie = ie.filter((w) => w != p));
  }
}
function rt(n) {
  const { terminateTimeout: t } = n;
  t && (clearTimeout(t), (n.terminateTimeout = null));
}
function gi() {
  ie.forEach((n) => {
    rt(n), n.terminate();
  });
}
const Kn = "HTTP error ",
  Oe = "HTTP Range not supported",
  Xn = "Writer iterator completed too soon",
  yi = "text/plain",
  xi = "Content-Length",
  Ei = "Content-Range",
  Ti = "Accept-Ranges",
  Si = "Range",
  Ai = "Content-Type",
  Ri = "HEAD",
  wt = "GET",
  $n = "bytes",
  Oi = 64 * 1024,
  bt = "writable";
class Be {
  constructor() {
    this.size = 0;
  }
  init() {
    this.initialized = !0;
  }
}
class ce extends Be {
  get readable() {
    const t = this,
      { chunkSize: e = Oi } = t,
      r = new ReadableStream({
        start() {
          this.chunkOffset = 0;
        },
        async pull(s) {
          const { offset: i = 0, size: a, diskNumberStart: c } = r,
            { chunkOffset: l } = this;
          s.enqueue(await G(t, i + l, Math.min(e, a - l), c)),
            l + e > a ? s.close() : (this.chunkOffset += e);
        },
      });
    return r;
  }
}
class gt extends Be {
  constructor() {
    super();
    const t = this,
      e = new WritableStream({
        write(r) {
          return t.writeUint8Array(r);
        },
      });
    Object.defineProperty(t, bt, {
      get() {
        return e;
      },
    });
  }
  writeUint8Array() {}
}
class Di extends ce {
  constructor(t) {
    super();
    let e = t.length;
    for (; t.charAt(e - 1) == "="; ) e--;
    const r = t.indexOf(",") + 1;
    Object.assign(this, {
      dataURI: t,
      dataStart: r,
      size: Math.floor((e - r) * 0.75),
    });
  }
  readUint8Array(t, e) {
    const { dataStart: r, dataURI: s } = this,
      i = new Uint8Array(e),
      a = Math.floor(t / 3) * 4,
      c = atob(s.substring(a + r, Math.ceil((t + e) / 3) * 4 + r)),
      l = t - Math.floor(a / 4) * 3;
    for (let h = l; h < l + e; h++) i[h - l] = c.charCodeAt(h);
    return i;
  }
}
class ki extends gt {
  constructor(t) {
    super(),
      Object.assign(this, {
        data: "data:" + (t || "") + ";base64,",
        pending: [],
      });
  }
  writeUint8Array(t) {
    const e = this;
    let r = 0,
      s = e.pending;
    const i = e.pending.length;
    for (e.pending = "", r = 0; r < Math.floor((i + t.length) / 3) * 3 - i; r++)
      s += String.fromCharCode(t[r]);
    for (; r < t.length; r++) e.pending += String.fromCharCode(t[r]);
    s.length > 2 ? (e.data += btoa(s)) : (e.pending = s);
  }
  getData() {
    return this.data + btoa(this.pending);
  }
}
class yt extends ce {
  constructor(t) {
    super(), Object.assign(this, { blob: t, size: t.size });
  }
  async readUint8Array(t, e) {
    const r = this,
      s = t + e;
    let a = await (t || s < r.size ? r.blob.slice(t, s) : r.blob).arrayBuffer();
    return a.byteLength > e && (a = a.slice(t, s)), new Uint8Array(a);
  }
}
class Jn extends Be {
  constructor(t) {
    super();
    const e = this,
      r = new TransformStream(),
      s = [];
    t && s.push([Ai, t]),
      Object.defineProperty(e, bt, {
        get() {
          return r.writable;
        },
      }),
      (e.blob = new Response(r.readable, { headers: s }).blob());
  }
  getData() {
    return this.blob;
  }
}
class Ci extends yt {
  constructor(t) {
    super(new Blob([t], { type: yi }));
  }
}
class Ii extends Jn {
  constructor(t) {
    super(t),
      Object.assign(this, {
        encoding: t,
        utf8: !t || t.toLowerCase() == "utf-8",
      });
  }
  async getData() {
    const { encoding: t, utf8: e } = this,
      r = await super.getData();
    if (r.text && e) return r.text();
    {
      const s = new FileReader();
      return new Promise((i, a) => {
        Object.assign(s, {
          onload: ({ target: c }) => i(c.result),
          onerror: () => a(s.error),
        }),
          s.readAsText(r, t);
      });
    }
  }
}
class Ni extends ce {
  constructor(t, e) {
    super(), Qn(this, t, e);
  }
  async init() {
    await zn(this, st, hn), super.init();
  }
  readUint8Array(t, e) {
    return er(this, t, e, st, hn);
  }
}
class Pi extends ce {
  constructor(t, e) {
    super(), Qn(this, t, e);
  }
  async init() {
    await zn(this, it, pn), super.init();
  }
  readUint8Array(t, e) {
    return er(this, t, e, it, pn);
  }
}
function Qn(n, t, e) {
  const { preventHeadRequest: r, useRangeHeader: s, forceRangeRequests: i } = e;
  (e = Object.assign({}, e)),
    delete e.preventHeadRequest,
    delete e.useRangeHeader,
    delete e.forceRangeRequests,
    delete e.useXHR,
    Object.assign(n, {
      url: t,
      options: e,
      preventHeadRequest: r,
      useRangeHeader: s,
      forceRangeRequests: i,
    });
}
async function zn(n, t, e) {
  const { url: r, useRangeHeader: s, forceRangeRequests: i } = n;
  if (Mi(r) && (s || i)) {
    const { headers: a } = await t(wt, n, tr(n));
    if (!i && a.get(Ti) != $n) throw new Error(Oe);
    {
      let c;
      const l = a.get(Ei);
      if (l) {
        const h = l.trim().split(/\s*\/\s*/);
        if (h.length) {
          const u = h[1];
          u && u != "*" && (c = Number(u));
        }
      }
      c === $ ? await mn(n, t, e) : (n.size = c);
    }
  } else await mn(n, t, e);
}
async function er(n, t, e, r, s) {
  const { useRangeHeader: i, forceRangeRequests: a, options: c } = n;
  if (i || a) {
    const l = await r(wt, n, tr(n, t, e));
    if (l.status != 206) throw new Error(Oe);
    return new Uint8Array(await l.arrayBuffer());
  } else {
    const { data: l } = n;
    return l || (await s(n, c)), new Uint8Array(n.data.subarray(t, t + e));
  }
}
function tr(n, t = 0, e = 1) {
  return Object.assign({}, xt(n), { [Si]: $n + "=" + t + "-" + (t + e - 1) });
}
function xt({ options: n }) {
  const { headers: t } = n;
  if (t) return Symbol.iterator in t ? Object.fromEntries(t) : t;
}
async function hn(n) {
  await nr(n, st);
}
async function pn(n) {
  await nr(n, it);
}
async function nr(n, t) {
  const e = await t(wt, n, xt(n));
  (n.data = new Uint8Array(await e.arrayBuffer())),
    n.size || (n.size = n.data.length);
}
async function mn(n, t, e) {
  if (n.preventHeadRequest) await e(n, n.options);
  else {
    const s = (await t(Ri, n, xt(n))).headers.get(xi);
    s ? (n.size = Number(s)) : await e(n, n.options);
  }
}
async function st(n, { options: t, url: e }, r) {
  const s = await fetch(e, Object.assign({}, t, { method: n, headers: r }));
  if (s.status < 400) return s;
  throw s.status == 416
    ? new Error(Oe)
    : new Error(Kn + (s.statusText || s.status));
}
function it(n, { url: t }, e) {
  return new Promise((r, s) => {
    const i = new XMLHttpRequest();
    if (
      (i.addEventListener(
        "load",
        () => {
          if (i.status < 400) {
            const a = [];
            i
              .getAllResponseHeaders()
              .trim()
              .split(/[\r\n]+/)
              .forEach((c) => {
                const l = c.trim().split(/\s*:\s*/);
                (l[0] = l[0]
                  .trim()
                  .replace(/^[a-z]|-[a-z]/g, (h) => h.toUpperCase())),
                  a.push(l);
              }),
              r({
                status: i.status,
                arrayBuffer: () => i.response,
                headers: new Map(a),
              });
          } else
            s(
              i.status == 416
                ? new Error(Oe)
                : new Error(Kn + (i.statusText || i.status)),
            );
        },
        !1,
      ),
      i.addEventListener(
        "error",
        (a) => s(a.detail ? a.detail.error : new Error("Network error")),
        !1,
      ),
      i.open(n, t),
      e)
    )
      for (const a of Object.entries(e)) i.setRequestHeader(a[0], a[1]);
    (i.responseType = "arraybuffer"), i.send();
  });
}
class rr extends ce {
  constructor(t, e = {}) {
    super(),
      Object.assign(this, {
        url: t,
        reader: e.useXHR ? new Pi(t, e) : new Ni(t, e),
      });
  }
  set size(t) {}
  get size() {
    return this.reader.size;
  }
  async init() {
    await this.reader.init(), super.init();
  }
  readUint8Array(t, e) {
    return this.reader.readUint8Array(t, e);
  }
}
class Li extends rr {
  constructor(t, e = {}) {
    (e.useRangeHeader = !0), super(t, e);
  }
}
class Fi extends ce {
  constructor(t) {
    super(), Object.assign(this, { array: t, size: t.length });
  }
  readUint8Array(t, e) {
    return this.array.slice(t, t + e);
  }
}
class Ui extends gt {
  init(t = 0) {
    Object.assign(this, { offset: 0, array: new Uint8Array(t) }), super.init();
  }
  writeUint8Array(t) {
    const e = this;
    if (e.offset + t.length > e.array.length) {
      const r = e.array;
      (e.array = new Uint8Array(r.length + t.length)), e.array.set(r);
    }
    e.array.set(t, e.offset), (e.offset += t.length);
  }
  getData() {
    return this.array;
  }
}
class Et extends ce {
  constructor(t) {
    super(), (this.readers = t);
  }
  async init() {
    const t = this,
      { readers: e } = t;
    (t.lastDiskNumber = 0),
      (t.lastDiskOffset = 0),
      await Promise.all(
        e.map(async (r, s) => {
          await r.init(),
            s != e.length - 1 && (t.lastDiskOffset += r.size),
            (t.size += r.size);
        }),
      ),
      super.init();
  }
  async readUint8Array(t, e, r = 0) {
    const s = this,
      { readers: i } = this;
    let a,
      c = r;
    c == -1 && (c = i.length - 1);
    let l = t;
    for (; l >= i[c].size; ) (l -= i[c].size), c++;
    const h = i[c],
      u = h.size;
    if (l + e <= u) a = await G(h, l, e);
    else {
      const _ = u - l;
      (a = new Uint8Array(e)),
        a.set(await G(h, l, _)),
        a.set(await s.readUint8Array(t + _, e - _, r), _);
    }
    return (s.lastDiskNumber = Math.max(c, s.lastDiskNumber)), a;
  }
}
class ve extends Be {
  constructor(t, e = 4294967295) {
    super();
    const r = this;
    Object.assign(r, {
      diskNumber: 0,
      diskOffset: 0,
      size: 0,
      maxSize: e,
      availableSize: e,
    });
    let s, i, a;
    const c = new WritableStream({
      async write(u) {
        const { availableSize: _ } = r;
        if (a)
          u.length >= _
            ? (await l(u.slice(0, _)),
              await h(),
              (r.diskOffset += s.size),
              r.diskNumber++,
              (a = null),
              await this.write(u.slice(_)))
            : await l(u);
        else {
          const { value: m, done: g } = await t.next();
          if (g && !m) throw new Error(Xn);
          (s = m),
            (s.size = 0),
            s.maxSize && (r.maxSize = s.maxSize),
            (r.availableSize = r.maxSize),
            await Ae(s),
            (i = m.writable),
            (a = i.getWriter()),
            await this.write(u);
        }
      },
      async close() {
        await a.ready, await h();
      },
    });
    Object.defineProperty(r, bt, {
      get() {
        return c;
      },
    });
    async function l(u) {
      const _ = u.length;
      _ &&
        (await a.ready,
        await a.write(u),
        (s.size += _),
        (r.size += _),
        (r.availableSize -= _));
    }
    async function h() {
      (i.size = s.size), await a.close();
    }
  }
}
function Mi(n) {
  const { baseURL: t } = On(),
    { protocol: e } = new URL(n, t);
  return e == "http:" || e == "https:";
}
async function Ae(n, t) {
  n.init && !n.initialized && (await n.init(t));
}
function sr(n) {
  return (
    Array.isArray(n) && (n = new Et(n)),
    n instanceof ReadableStream && (n = { readable: n }),
    n
  );
}
function ir(n) {
  n.writable === $ && typeof n.next == An && (n = new ve(n)),
    n instanceof WritableStream && (n = { writable: n });
  const { writable: t } = n;
  return (
    t.size === $ && (t.size = 0),
    n instanceof ve ||
      Object.assign(n, {
        diskNumber: 0,
        diskOffset: 0,
        availableSize: 1 / 0,
        maxSize: 1 / 0,
      }),
    n
  );
}
function G(n, t, e, r) {
  return n.readUint8Array(t, e, r);
}
const vi = Et,
  Hi = ve,
  ar =
    "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split(
      "",
    ),
  Wi = ar.length == 256;
function Bi(n) {
  if (Wi) {
    let t = "";
    for (let e = 0; e < n.length; e++) t += ar[n[e]];
    return t;
  } else return new TextDecoder().decode(n);
}
function at(n, t) {
  return t && t.trim().toLowerCase() == "cp437"
    ? Bi(n)
    : new TextDecoder(t).decode(n);
}
const or = "filename",
  cr = "rawFilename",
  lr = "comment",
  fr = "rawComment",
  ur = "uncompressedSize",
  dr = "compressedSize",
  _r = "offset",
  ot = "diskNumberStart",
  ct = "lastModDate",
  lt = "rawLastModDate",
  hr = "lastAccessDate",
  ji = "rawLastAccessDate",
  pr = "creationDate",
  qi = "rawCreationDate",
  Gi = "internalFileAttribute",
  Yi = "externalFileAttribute",
  Vi = "msDosCompatible",
  Zi = "zip64",
  Ki = [
    or,
    cr,
    dr,
    ur,
    ct,
    lt,
    lr,
    fr,
    hr,
    pr,
    _r,
    ot,
    ot,
    Gi,
    Yi,
    Vi,
    Zi,
    "directory",
    "bitFlag",
    "encrypted",
    "signature",
    "filenameUTF8",
    "commentUTF8",
    "compressionMethod",
    "version",
    "versionMadeBy",
    "extraField",
    "rawExtraField",
    "extraFieldZip64",
    "extraFieldUnicodePath",
    "extraFieldUnicodeComment",
    "extraFieldAES",
    "extraFieldNTFS",
    "extraFieldExtendedTimestamp",
  ];
class wn {
  constructor(t) {
    Ki.forEach((e) => (this[e] = t[e]));
  }
}
const Pe = "File format is not recognized",
  mr = "End of central directory not found",
  wr = "End of Zip64 central directory not found",
  br = "End of Zip64 central directory locator not found",
  gr = "Central directory header not found",
  yr = "Local file header not found",
  xr = "Zip64 extra field not found",
  Er = "File contains encrypted entry",
  Tr = "Encryption method not supported",
  ft = "Compression method not supported",
  ut = "Split zip file",
  bn = "utf-8",
  gn = "cp437",
  Xi = [
    [ur, de],
    [dr, de],
    [_r, de],
    [ot, ae],
  ],
  $i = { [ae]: { getValue: B, bytes: 4 }, [de]: { getValue: Le, bytes: 8 } };
class Ji {
  constructor(t, e = {}) {
    Object.assign(this, { reader: sr(t), options: e, config: On() });
  }
  async *getEntriesGenerator(t = {}) {
    const e = this;
    let { reader: r } = e;
    const { config: s } = e;
    if (
      (await Ae(r),
      (r.size === $ || !r.readUint8Array) &&
        ((r = new yt(await new Response(r.readable).blob())), await Ae(r)),
      r.size < Ne)
    )
      throw new Error(Pe);
    r.chunkSize = Is(s);
    const i = await ra(r, ws, r.size, Ne, ae * 16);
    if (!i) {
      const x = await G(r, 0, 4),
        E = q(x);
      throw B(E) == ms ? new Error(ut) : new Error(mr);
    }
    const a = q(i);
    let c = B(a, 12),
      l = B(a, 16);
    const h = i.offset,
      u = j(a, 20),
      _ = h + Ne + u;
    let m = j(a, 4);
    const g = r.lastDiskNumber || 0;
    let S = j(a, 6),
      f = j(a, 8),
      o = 0,
      d = 0;
    if (l == de || c == de || f == ae || S == ae) {
      const x = await G(r, i.offset - Ve, Ve),
        E = q(x);
      if (B(E, 0) != bs) throw new Error(wr);
      l = Le(E, 8);
      let C = await G(r, l, Ze, -1),
        D = q(C);
      const P = i.offset - Ve - Ze;
      if (B(D, 0) != Jt && l != P) {
        const N = l;
        (l = P), (o = l - N), (C = await G(r, l, Ze, -1)), (D = q(C));
      }
      if (B(D, 0) != Jt) throw new Error(br);
      m == ae && (m = B(D, 16)),
        S == ae && (S = B(D, 20)),
        f == ae && (f = Le(D, 32)),
        c == de && (c = Le(D, 40)),
        (l -= c);
    }
    if (g != m) throw new Error(ut);
    if (l < 0 || l >= r.size) throw new Error(Pe);
    let p = 0,
      w = await G(r, l, c, S),
      y = q(w);
    if (c) {
      const x = i.offset - c;
      if (B(y, p) != $t && l != x) {
        const E = l;
        (l = x), (o = l - E), (w = await G(r, l, c, S)), (y = q(w));
      }
    }
    const O = i.offset - l - (r.lastDiskOffset || 0);
    if (
      (c != O && O >= 0 && ((c = O), (w = await G(r, l, c, S)), (y = q(w))),
      l < 0 || l >= r.size)
    )
      throw new Error(Pe);
    const b = K(e, t, "filenameEncoding"),
      A = K(e, t, "commentEncoding");
    for (let x = 0; x < f; x++) {
      const E = new Qi(r, s, e.options);
      if (B(y, p) != $t) throw new Error(gr);
      Sr(E, y, p + 6);
      const C = !!E.bitFlag.languageEncodingFlag,
        D = p + 46,
        P = D + E.filenameLength,
        N = P + E.extraFieldLength,
        k = j(y, p + 4),
        v = (k & 0) == 0,
        F = w.subarray(D, P),
        be = j(y, p + 32),
        I = N + be,
        le = w.subarray(N, I),
        U = C,
        H = C,
        Tt = v && (we(y, p + 38) & tn) == tn,
        St = B(y, p + 42) + o;
      Object.assign(E, {
        versionMadeBy: k,
        msDosCompatible: v,
        compressedSize: 0,
        uncompressedSize: 0,
        commentLength: be,
        directory: Tt,
        offset: St,
        diskNumberStart: j(y, p + 34),
        internalFileAttribute: j(y, p + 36),
        externalFileAttribute: B(y, p + 38),
        rawFilename: F,
        filenameUTF8: U,
        commentUTF8: H,
        rawExtraField: w.subarray(P, N),
      });
      const [At, Or] = await Promise.all([
        at(F, U ? bn : b || gn),
        at(le, H ? bn : A || gn),
      ]);
      Object.assign(E, {
        rawComment: le,
        filename: At,
        comment: Or,
        directory: Tt || At.endsWith(Ds),
      }),
        (d = Math.max(St, d)),
        await Ar(E, E, y, p + 6);
      const je = new wn(E);
      (je.getData = (Ot, Dr) => E.getData(Ot, je, Dr)), (p = I);
      const { onprogress: Rt } = t;
      if (Rt)
        try {
          await Rt(x + 1, f, new wn(E));
        } catch {}
      yield je;
    }
    const T = K(e, t, "extractPrependedData"),
      R = K(e, t, "extractAppendedData");
    return (
      T && (e.prependedData = d > 0 ? await G(r, 0, d) : new Uint8Array()),
      (e.comment = u ? await G(r, h + Ne, u) : new Uint8Array()),
      R &&
        (e.appendedData =
          _ < r.size ? await G(r, _, r.size - _) : new Uint8Array()),
      !0
    );
  }
  async getEntries(t = {}) {
    const e = [];
    for await (const r of this.getEntriesGenerator(t)) e.push(r);
    return e;
  }
  async close() {}
}
class Qi {
  constructor(t, e, r) {
    Object.assign(this, { reader: t, config: e, options: r });
  }
  async getData(t, e, r = {}) {
    const s = this,
      {
        reader: i,
        offset: a,
        diskNumberStart: c,
        extraFieldAES: l,
        compressionMethod: h,
        config: u,
        bitFlag: _,
        signature: m,
        rawLastModDate: g,
        uncompressedSize: S,
        compressedSize: f,
      } = s,
      o = (e.localDirectory = {}),
      d = await G(i, a, 30, c),
      p = q(d);
    let w = K(s, r, "password");
    if (((w = w && w.length && w), l && l.originalCompressionMethod != hs))
      throw new Error(ft);
    if (h != _s && h != ds) throw new Error(ft);
    if (B(p, 0) != ps) throw new Error(yr);
    Sr(o, p, 4),
      (o.rawExtraField = o.extraFieldLength
        ? await G(i, a + 30 + o.filenameLength, o.extraFieldLength, c)
        : new Uint8Array()),
      await Ar(s, o, p, 4, !0),
      Object.assign(e, {
        lastAccessDate: o.lastAccessDate,
        creationDate: o.creationDate,
      });
    const y = s.encrypted && o.encrypted,
      O = y && !l;
    if (y) {
      if (!O && l.strength === $) throw new Error(Tr);
      if (!w) throw new Error(Er);
    }
    const b = a + 30 + o.filenameLength + o.extraFieldLength,
      A = f,
      T = i.readable;
    Object.assign(T, { diskNumberStart: c, offset: b, size: A });
    const R = K(s, r, "signal"),
      x = K(s, r, "checkPasswordOnly");
    x && (t = new WritableStream()), (t = ir(t)), await Ae(t, S);
    const { writable: E } = t,
      { onstart: C, onprogress: D, onend: P } = r,
      N = {
        options: {
          codecType: Zn,
          password: w,
          zipCrypto: O,
          encryptionStrength: l && l.strength,
          signed: K(s, r, "checkSignature"),
          passwordVerification:
            O && (_.dataDescriptor ? (g >>> 8) & 255 : (m >>> 24) & 255),
          signature: m,
          compressed: h != 0,
          encrypted: y,
          useWebWorkers: K(s, r, "useWebWorkers"),
          useCompressionStream: K(s, r, "useCompressionStream"),
          transferStreams: K(s, r, "transferStreams"),
          checkPasswordOnly: x,
        },
        config: u,
        streamOptions: {
          signal: R,
          size: A,
          onstart: C,
          onprogress: D,
          onend: P,
        },
      };
    let k = 0;
    try {
      ({ outputSize: k } = await bi({ readable: T, writable: E }, N));
    } catch (v) {
      if (!x || v.message != ht) throw v;
    } finally {
      const v = K(s, r, "preventClose");
      (E.size += k), !v && !E.locked && (await E.getWriter().close());
    }
    return x ? void 0 : t.getData ? t.getData() : E;
  }
}
function Sr(n, t, e) {
  const r = (n.rawBitFlag = j(t, e + 2)),
    s = (r & Qt) == Qt,
    i = B(t, e + 6);
  Object.assign(n, {
    encrypted: s,
    version: j(t, e),
    bitFlag: {
      level: (r & Os) >> 1,
      dataDescriptor: (r & zt) == zt,
      languageEncodingFlag: (r & en) == en,
    },
    rawLastModDate: i,
    lastModDate: sa(i),
    filenameLength: j(t, e + 22),
    extraFieldLength: j(t, e + 24),
  });
}
async function Ar(n, t, e, r, s) {
  const { rawExtraField: i } = t,
    a = (t.extraField = new Map()),
    c = q(new Uint8Array(i));
  let l = 0;
  try {
    for (; l < i.length; ) {
      const d = j(c, l),
        p = j(c, l + 2);
      a.set(d, { type: d, data: i.slice(l + 4, l + 4 + p) }), (l += 4 + p);
    }
  } catch {}
  const h = j(e, r + 4);
  Object.assign(t, {
    signature: B(e, r + 10),
    uncompressedSize: B(e, r + 18),
    compressedSize: B(e, r + 14),
  });
  const u = a.get(gs);
  u && (zi(u, t), (t.extraFieldZip64 = u));
  const _ = a.get(Ss);
  _ && (await yn(_, or, cr, t, n), (t.extraFieldUnicodePath = _));
  const m = a.get(As);
  m && (await yn(m, lr, fr, t, n), (t.extraFieldUnicodeComment = m));
  const g = a.get(ys);
  g ? (ea(g, t, h), (t.extraFieldAES = g)) : (t.compressionMethod = h);
  const S = a.get(xs);
  S && (ta(S, t), (t.extraFieldNTFS = S));
  const f = a.get(Ts);
  f && (na(f, t, s), (t.extraFieldExtendedTimestamp = f));
  const o = a.get(Rs);
  o && (t.extraFieldUSDZ = o);
}
function zi(n, t) {
  t.zip64 = !0;
  const e = q(n.data),
    r = Xi.filter(([s, i]) => t[s] == i);
  for (let s = 0, i = 0; s < r.length; s++) {
    const [a, c] = r[s];
    if (t[a] == c) {
      const l = $i[c];
      (t[a] = n[a] = l.getValue(e, i)), (i += l.bytes);
    } else if (n[a]) throw new Error(xr);
  }
}
async function yn(n, t, e, r, s) {
  const i = q(n.data),
    a = new Ue();
  a.append(s[e]);
  const c = q(new Uint8Array(4));
  c.setUint32(0, a.get(), !0);
  const l = B(i, 1);
  Object.assign(n, {
    version: we(i, 0),
    [t]: at(n.data.subarray(5)),
    valid: !s.bitFlag.languageEncodingFlag && l == B(c, 0),
  }),
    n.valid && ((r[t] = n[t]), (r[t + "UTF8"] = !0));
}
function ea(n, t, e) {
  const r = q(n.data),
    s = we(r, 4);
  Object.assign(n, {
    vendorVersion: we(r, 0),
    vendorId: we(r, 2),
    strength: s,
    originalCompressionMethod: e,
    compressionMethod: j(r, 5),
  }),
    (t.compressionMethod = n.compressionMethod);
}
function ta(n, t) {
  const e = q(n.data);
  let r = 4,
    s;
  try {
    for (; r < n.data.length && !s; ) {
      const i = j(e, r),
        a = j(e, r + 2);
      i == Es && (s = n.data.slice(r + 4, r + 4 + a)), (r += 4 + a);
    }
  } catch {}
  try {
    if (s && s.length == 24) {
      const i = q(s),
        a = i.getBigUint64(0, !0),
        c = i.getBigUint64(8, !0),
        l = i.getBigUint64(16, !0);
      Object.assign(n, {
        rawLastModDate: a,
        rawLastAccessDate: c,
        rawCreationDate: l,
      });
      const h = Je(a),
        u = Je(c),
        _ = Je(l),
        m = { lastModDate: h, lastAccessDate: u, creationDate: _ };
      Object.assign(n, m), Object.assign(t, m);
    }
  } catch {}
}
function na(n, t, e) {
  const r = q(n.data),
    s = we(r, 0),
    i = [],
    a = [];
  e
    ? ((s & 1) == 1 && (i.push(ct), a.push(lt)),
      (s & 2) == 2 && (i.push(hr), a.push(ji)),
      (s & 4) == 4 && (i.push(pr), a.push(qi)))
    : n.data.length >= 5 && (i.push(ct), a.push(lt));
  let c = 1;
  i.forEach((l, h) => {
    if (n.data.length >= c + 4) {
      const u = B(r, c);
      t[l] = n[l] = new Date(u * 1e3);
      const _ = a[h];
      n[_] = u;
    }
    c += 4;
  });
}
async function ra(n, t, e, r, s) {
  const i = new Uint8Array(4),
    a = q(i);
  ia(a, 0, t);
  const c = r + s;
  return (await l(r)) || (await l(Math.min(c, e)));
  async function l(h) {
    const u = e - h,
      _ = await G(n, u, h);
    for (let m = _.length - r; m >= 0; m--)
      if (
        _[m] == i[0] &&
        _[m + 1] == i[1] &&
        _[m + 2] == i[2] &&
        _[m + 3] == i[3]
      )
        return { offset: u + m, buffer: _.slice(m, m + r).buffer };
  }
}
function K(n, t, e) {
  return t[e] === $ ? n.options[e] : t[e];
}
function sa(n) {
  const t = (n & 4294901760) >> 16,
    e = n & 65535;
  try {
    return new Date(
      1980 + ((t & 65024) >> 9),
      ((t & 480) >> 5) - 1,
      t & 31,
      (e & 63488) >> 11,
      (e & 2016) >> 5,
      (e & 31) * 2,
      0,
    );
  } catch {}
}
function Je(n) {
  return new Date(Number(n / BigInt(1e4) - BigInt(116444736e5)));
}
function we(n, t) {
  return n.getUint8(t);
}
function j(n, t) {
  return n.getUint16(t, !0);
}
function B(n, t) {
  return n.getUint32(t, !0);
}
function Le(n, t) {
  return Number(n.getBigUint64(t, !0));
}
function ia(n, t, e) {
  n.setUint32(t, e, !0);
}
function q(n) {
  return new DataView(n.buffer);
}
Dn({ Inflate: us });
const aa = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        BlobReader: yt,
        BlobWriter: Jn,
        Data64URIReader: Di,
        Data64URIWriter: ki,
        ERR_BAD_FORMAT: Pe,
        ERR_CENTRAL_DIRECTORY_NOT_FOUND: gr,
        ERR_ENCRYPTED: Er,
        ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND: br,
        ERR_EOCDR_NOT_FOUND: mr,
        ERR_EOCDR_ZIP64_NOT_FOUND: wr,
        ERR_EXTRAFIELD_ZIP64_NOT_FOUND: xr,
        ERR_HTTP_RANGE: Oe,
        ERR_INVALID_PASSWORD: dt,
        ERR_INVALID_SIGNATURE: _t,
        ERR_ITERATOR_COMPLETED_TOO_SOON: Xn,
        ERR_LOCAL_FILE_HEADER_NOT_FOUND: yr,
        ERR_SPLIT_ZIP_FILE: ut,
        ERR_UNSUPPORTED_COMPRESSION: ft,
        ERR_UNSUPPORTED_ENCRYPTION: Tr,
        HttpRangeReader: Li,
        HttpReader: rr,
        Reader: ce,
        SplitDataReader: Et,
        SplitDataWriter: ve,
        SplitZipReader: vi,
        SplitZipWriter: Hi,
        TextReader: Ci,
        TextWriter: Ii,
        Uint8ArrayReader: Fi,
        Uint8ArrayWriter: Ui,
        Writer: gt,
        ZipReader: Ji,
        configure: Dn,
        getMimeType: Ns,
        initReader: sr,
        initStream: Ae,
        initWriter: ir,
        readUint8Array: G,
        terminateWorkers: gi,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  xe = aa;
class oa {
  constructor(t, e) {
    M(this, "_zipReader");
    M(this, "_entriesPromise");
    M(this, "_traceURL");
    (this._traceURL = t),
      xe.configure({ baseURL: self.location.href }),
      (this._zipReader = new xe.ZipReader(
        new xe.HttpReader(la(t), {
          mode: "cors",
          credentials: "include",
          preventHeadRequest: !0,
        }),
        { useWebWorkers: !1 },
      )),
      (this._entriesPromise = this._zipReader
        .getEntries({ onprogress: e })
        .then((r) => {
          const s = new Map();
          for (const i of r) s.set(i.filename, i);
          return s;
        }));
  }
  isLive() {
    return !1;
  }
  traceURL() {
    return this._traceURL;
  }
  async entryNames() {
    return [...(await this._entriesPromise).keys()];
  }
  async hasEntry(t) {
    return (await this._entriesPromise).has(t);
  }
  async readText(t) {
    var i;
    const r = (await this._entriesPromise).get(t);
    if (!r) return;
    const s = new xe.TextWriter();
    return await ((i = r.getData) == null ? void 0 : i.call(r, s)), s.getData();
  }
  async readBlob(t) {
    const r = (await this._entriesPromise).get(t);
    if (!r) return;
    const s = new xe.BlobWriter();
    return await r.getData(s), s.getData();
  }
}
class ca {
  constructor(t) {
    M(this, "_entriesPromise");
    M(this, "_traceURL");
    (this._traceURL = t),
      (this._entriesPromise = fetch(
        "/trace/file?path=" + encodeURIComponent(t),
      ).then(async (e) => {
        const r = JSON.parse(await e.text()),
          s = new Map();
        for (const i of r.entries) s.set(i.name, i.path);
        return s;
      }));
  }
  isLive() {
    return !0;
  }
  traceURL() {
    return this._traceURL;
  }
  async entryNames() {
    return [...(await this._entriesPromise).keys()];
  }
  async hasEntry(t) {
    return (await this._entriesPromise).has(t);
  }
  async readText(t) {
    const e = await this._readEntry(t);
    return e == null ? void 0 : e.text();
  }
  async readBlob(t) {
    const e = await this._readEntry(t);
    return (e == null ? void 0 : e.status) === 200
      ? await (e == null ? void 0 : e.blob())
      : void 0;
  }
  async _readEntry(t) {
    const r = (await this._entriesPromise).get(t);
    if (r) return fetch("/trace/file?path=" + encodeURIComponent(r));
  }
}
function la(n) {
  let t =
    n.startsWith("http") || n.startsWith("blob")
      ? n
      : `file?path=${encodeURIComponent(n)}`;
  return (
    t.startsWith("https://www.dropbox.com/") &&
      (t = "https://dl.dropboxusercontent.com/" + t.substring(24)),
    t
  );
}
self.addEventListener("install", function (n) {
  self.skipWaiting();
});
self.addEventListener("activate", function (n) {
  n.waitUntil(self.clients.claim());
});
const fa = new URL(self.registration.scope).pathname,
  ue = new Map(),
  He = new Map();
async function ua(n, t, e, r) {
  var c;
  await Rr();
  let s = He.get(e);
  s || ((s = new Set()), He.set(e, s)), s.add(n);
  const i = new Yr();
  try {
    const [l, h] = Ir(r, [0.5, 0.4, 0.1]),
      u = n.endsWith("json") ? new ca(n) : new oa(n, l);
    await i.load(u, h);
  } catch (l) {
    throw (
      (console.error(l),
      (c = l == null ? void 0 : l.message) != null &&
      c.includes("Cannot find .trace file") &&
      (await i.hasEntry("index.html"))
        ? new Error(
            "Could not load trace. Did you upload a Playwright HTML report instead? Make sure to extract the archive first and then double-click the index.html file or put it on a web server.",
          )
        : t
          ? new Error(
              `Could not load trace from ${t}. Make sure to upload a valid Playwright trace.`,
            )
          : new Error(
              `Could not load trace from ${n}. Make sure a valid Playwright Trace is accessible over this url.`,
            ))
    );
  }
  const a = new Wr(i.storage(), (l) => i.resourceForSha1(l));
  return ue.set(n, { traceModel: i, snapshotServer: a }), i;
}
async function da(n) {
  const t = n.request,
    e = await self.clients.get(n.clientId),
    r = self.registration.scope.startsWith("https://");
  if (t.url.startsWith(self.registration.scope)) {
    const l = new URL(ze(t.url)),
      h = l.pathname.substring(fa.length - 1);
    if (h === "/ping") return await Rr(), new Response(null, { status: 200 });
    const u = l.searchParams.get("trace");
    if (h === "/contexts")
      try {
        const _ = await ua(
          u,
          l.searchParams.get("traceFileName"),
          n.clientId,
          (m, g) => {
            e.postMessage({
              method: "progress",
              params: { done: m, total: g },
            });
          },
        );
        return new Response(JSON.stringify(_.contextEntries), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (_) {
        return new Response(
          JSON.stringify({ error: _ == null ? void 0 : _.message }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }
    if (h.startsWith("/snapshotInfo/")) {
      const { snapshotServer: _ } = ue.get(u) || {};
      return _
        ? _.serveSnapshotInfo(h, l.searchParams)
        : new Response(null, { status: 404 });
    }
    if (h.startsWith("/snapshot/")) {
      const { snapshotServer: _ } = ue.get(u) || {};
      if (!_) return new Response(null, { status: 404 });
      const m = _.serveSnapshot(h, l.searchParams, l.href);
      return (
        r &&
          m.headers.set("Content-Security-Policy", "upgrade-insecure-requests"),
        m
      );
    }
    if (h.startsWith("/sha1/")) {
      const _ = l.searchParams.has("download"),
        m = h.slice(6);
      for (const g of ue.values()) {
        const S = await g.traceModel.resourceForSha1(m);
        if (S)
          return new Response(S, {
            status: 200,
            headers: _ ? _a(g.traceModel, m) : void 0,
          });
      }
      return new Response(null, { status: 404 });
    }
    return fetch(n.request);
  }
  const s = ze(e.url),
    i = new URL(s).searchParams.get("trace"),
    { snapshotServer: a } = ue.get(i) || {};
  if (!a) return new Response(null, { status: 404 });
  const c = [t.url];
  return (
    r &&
      t.url.startsWith("https://") &&
      c.push(t.url.replace(/^https/, "http")),
    a.serveResource(c, t.method, s)
  );
}
function _a(n, t) {
  const e = n.attachmentForSha1(t);
  if (!e) return;
  const r = new Headers();
  return (
    r.set("Content-Disposition", `attachment; filename="${e.name}"`),
    e.contentType && r.set("Content-Type", e.contentType),
    r
  );
}
async function Rr() {
  const n = await self.clients.matchAll(),
    t = new Set();
  for (const [e, r] of He)
    n.find((s) => s.id === e) ? r.forEach((s) => t.add(s)) : He.delete(e);
  for (const e of ue.keys()) t.has(e) || ue.delete(e);
}
self.addEventListener("fetch", function (n) {
  n.respondWith(da(n));
});
