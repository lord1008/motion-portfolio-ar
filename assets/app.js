(function () {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const art = window.PORTFOLIO_ART || {};
  const config = window.SITE_CONFIG || {};
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]);

  if (config.name) {
    const intro = document.getElementById("designer-intro");
    if (intro) intro.textContent = `أنا ${config.name} — مصمم موشن،`;
    const aboutLead = document.getElementById("about-lead");
    if (aboutLead) aboutLead.textContent = `أنا ${config.name}، مصمم موشن أعمل على تحويل الأفكار والرسائل إلى تجارب بصرية نابضة بالحياة.`;
    document.title = document.title.replace("أعمال الموشن", config.name);
  }

  const contactMethods = document.getElementById("contact-methods");
  if (contactMethods) {
    const methods = [];
    if (config.email) methods.push(`<p>راسلني على<br><a href="mailto:${escapeHtml(config.email)}">${escapeHtml(config.email)}</a></p>`);
    if (config.whatsapp && /^\d{7,15}$/.test(config.whatsapp)) methods.push(`<p><a href="https://wa.me/${config.whatsapp}" target="_blank" rel="noopener noreferrer">تواصل عبر واتساب ↗</a></p>`);
    if (config.behance && /^https?:\/\//i.test(config.behance)) methods.push(`<p><a href="${escapeHtml(config.behance)}" target="_blank" rel="noopener noreferrer">أعمالي على Behance ↗</a></p>`);
    if (config.instagram && /^https?:\/\//i.test(config.instagram)) methods.push(`<p><a href="${escapeHtml(config.instagram)}" target="_blank" rel="noopener noreferrer">حسابي على Instagram ↗</a></p>`);
    if (methods.length) contactMethods.innerHTML = `<div class="contact-methods">${methods.join("")}</div>`;
  }

  function mediaMarkup(project, detail = false) {
    const title = escapeHtml(project.title);
    if (project.video) {
      const src = escapeHtml(project.video);
      const poster = project.poster ? ` poster="${escapeHtml(project.poster)}"` : "";
      return `<video src="${src}"${poster} ${detail ? "controls" : "autoplay muted loop"} playsinline preload="metadata" aria-label="${title}"></video>`;
    }
    if (project.image) return `<img src="${escapeHtml(project.image)}" alt="${title}" loading="lazy">`;
    return art[project.art] || "";
  }

  const gallery = document.getElementById("gallery");
  if (gallery) {
    gallery.innerHTML = projects.map((project) => `
      <a class="work-card" href="project.html?id=${encodeURIComponent(project.id)}" aria-label="عرض ${escapeHtml(project.title)}">
        <div class="work-media">${mediaMarkup(project)}</div>
        <div class="work-overlay"><span><strong>${escapeHtml(project.title)}</strong><small>${escapeHtml(project.category)}</small></span><span class="arrow" aria-hidden="true">↗</span></div>
      </a>`).join("");
  }

  const detail = document.getElementById("project-detail");
  if (detail) {
    const id = new URLSearchParams(window.location.search).get("id");
    const project = projects.find((item) => item.id === id);
    if (!project) {
      detail.innerHTML = `<h1>هذا العمل غير موجود</h1><p><a class="project-link" href="index.html#portfolio">العودة إلى معرض الأعمال</a></p>`;
    } else {
      document.title = `${project.title} — أعمال الموشن`;
      const link = project.link && /^https?:\/\//i.test(project.link)
        ? `<a class="project-link" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">شاهد العمل الكامل ↗</a>` : "";
      const demo = !project.image && !project.video ? `<span class="demo-label">نموذج بصري تجريبي</span>` : "";
      detail.innerHTML = `<div class="project-head"><h1>${escapeHtml(project.title)}</h1><p>${escapeHtml(project.category)}</p></div>
        <div class="project-media">${mediaMarkup(project, true)}</div>
        <div class="project-info"><div><p>${escapeHtml(project.description || "")}</p>${link}</div>${demo}</div>`;
    }
  }

  const clock = document.getElementById("local-clock");
  if (clock) {
    const updateClock = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("ar", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now);
      const date = new Intl.DateTimeFormat("ar", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now);
      clock.textContent = `${time}\n${date}`;
      clock.dateTime = now.toISOString();
    };
    updateClock();
    setInterval(updateClock, 1000);
  }
}());
