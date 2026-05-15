/**
 * Configuração global do site — preencha os campos quando desejar publicar dados reais.
 * Elementos com data-site="chave" recebem o valor correspondente no carregamento.
 */
const siteConfig = {
  nomeBlog: "",
  razaoSocial: "51.741.716 MARCOS PAULO SILVA RODRIGUES",
  cnpj: "51.741.716/0001-80",
  endereco:
    "Rua Príncipe de Nassau, 37 — Complemento: Casa 72 — Fortaleza – CE — CEP 60340-095",
  email: "ramom2023marcos@gmail.com",
  telefone: "(85) 9624-0802",
};

function applySiteConfig() {
  const brandFallback = "Mobilidade Urbana";

  document.querySelectorAll("[data-site]").forEach(function (el) {
    if (el.tagName === "A" && el.getAttribute("data-site") === "email") return;
    const key = el.getAttribute("data-site");
    if (!key || !(key in siteConfig)) return;
    const value = siteConfig[key];
    const str = typeof value === "string" ? value : "";
    el.textContent = str;
  });

  document.querySelectorAll("[data-site-brand]").forEach(function (el) {
    const name = siteConfig.nomeBlog && siteConfig.nomeBlog.trim();
    el.textContent = name || brandFallback;
  });

  document.querySelectorAll('a[data-site="email"]').forEach(function (el) {
    const v = siteConfig.email && String(siteConfig.email).trim();
    if (v) {
      el.textContent = v;
      el.setAttribute("href", "mailto:" + v);
      el.removeAttribute("aria-disabled");
    } else {
      el.textContent = "";
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applySiteConfig);
} else {
  applySiteConfig();
}
