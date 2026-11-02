// Add your own links here. Empty entries stay hidden.
var LINKS = {
  github: "",
  linkedin: "",
  portfolio: { code: "", live: "" },
  zombie: { code: "", live: "" },
  react: { code: "", live: "" },
};
var EMAIL = "sharmapurvi938@gmail.com",
  $ = function (s, r) {
    return (r || document).querySelector(s);
  },
  $$ = function (s) {
    return [].slice.call(document.querySelectorAll(s));
  };
function toast(t) {
  var e = $("#toast");
  e.textContent = t;
  e.className = "on";
  setTimeout(function () {
    e.className = "";
  }, 1800);
}
function link(p, t, u) {
  if (!u) return;
  var a = document.createElement("a");
  a.className = "btn";
  a.textContent = t;
  a.href = u;
  a.target = "_blank";
  a.rel = "noopener";
  p.appendChild(a);
}
$$("[data-l]").forEach(function (d) {
  var o = LINKS[d.dataset.l];
  link(d, "Code", o.code);
  link(d, "Live demo", o.live);
});
link($("#soc"), "GitHub", LINKS.github);
link($("#soc"), "LinkedIn", LINKS.linkedin);
// theme
var r = document.documentElement;
try {
  var s = localStorage.getItem("th");
  if (s) r.dataset.theme = s;
} catch (e) {}
$("#th").onclick = function () {
  var d = r.dataset.theme
    ? r.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme:dark)").matches;
  r.dataset.theme = d ? "light" : "dark";
  try {
    localStorage.setItem("th", r.dataset.theme);
  } catch (e) {}
};
// filter
$$(".chips button").forEach(function (b) {
  b.onclick = function () {
    $$(".chips button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b);
    });
    $$(".card").forEach(function (c) {
      c.hidden = !(
        b.dataset.f === "all" ||
        c.dataset.t.split(" ").indexOf(b.dataset.f) > -1
      );
    });
  };
});
// actions
$("#pr").onclick = function () {
  window.print();
};
$("#cp").onclick = function () {
  var d = function () {
    toast("Email copied");
  };
  try {
    navigator.clipboard.writeText(EMAIL).then(d, function () {
      toast(EMAIL);
    });
  } catch (e) {
    toast(EMAIL);
  }
};
$("#f").onsubmit = function (e) {
  e.preventDefault();
  location.href =
    "mailto:" +
    EMAIL +
    "?subject=" +
    encodeURIComponent("Hello from " + $("#n").value) +
    "&body=" +
    encodeURIComponent($("#m").value);
};
// active nav
var io = new IntersectionObserver(
  function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting)
        $$("nav a").forEach(function (a) {
          a.classList.toggle(
            "on",
            a.getAttribute("href") === "#" + en.target.id,
          );
        });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
$$("section").forEach(function (x) {
  io.observe(x);
});
