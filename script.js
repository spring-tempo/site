// Конфигурация дайджестов (легко расширять)
const DIGESTS = [
  {
    id: "kunikov-desant",
    title: "Памятное мероприятие в честь 83-годовщины высадки десанта под командованием майора Цезаря Львовича Куникова",
    date: "03 февраля 2026",
    category: "city",
    categoryLabel: "Городские мероприятия",
    badge: "Городские мероприятия",
    cover: "./images/desant.jpeg",
    photos: [
      "./images/k1.jpg",
      "./images/k2.jpg",
      "./images/k3.jpg",
      "./images/k4.jpg",
      "./images/k5.jpg",
      "./images/k6.jpg",
      "./images/k7.jpg",
    ],
  },
  {
    id: "cs2-second-course",
    title: "Турнир по CS2 между РПО и КБ второго курса",
    date: "03 февраля 2026",
    category: "competitions",
    categoryLabel: "Соревнования",
    badge: "Соревнования",
    cover: "./images/CS2.jpg",
    photos: [
      "./images/с1.jpg",
      "./images/с2.jpg",
      "./images/с3.jpg",
      "./images/с4.jpg",
      "./images/с5.jpg",
      "./images/с6.jpg",
      "./images/с7.jpg",
    ],
  },
  {
    id: "cs2-first-course",
    title: "Турнир по CS2 между РПО и ГД первого курса",
    date: "10 февраля 2026",
    category: "competitions",
    categoryLabel: "Соревнования",
    badge: "Соревнования",
    cover: "./images/CS2.jpg",
    photos: [
      "./images/CS2.FirstCourse/1.jpg",
      "./images/CS2.FirstCourse/2.jpg",
      "./images/CS2.FirstCourse/3.jpg",
      "./images/CS2.FirstCourse/4.jpg",
      "./images/CS2.FirstCourse/5.jpg",
      "./images/CS2.FirstCourse/6.jpg",
      "./images/CS2.FirstCourse/7.jpg",
    ],
  },
  {
    id: "student-day",
    title: "День студента",
    date: "23 января 2026",
    category: "holidays",
    categoryLabel: "Праздники",
    badge: "Праздники",
    cover: "./images/IMG_4374.JPG",
    photos: [
      "./images/1.png",
      "./images/2.png",
      "./images/3.png",
      "./images/4.png",
      "./images/5.png",
      "./images/6.png",
    ],
  },
  {
    id: "Hero of Russia",
    title: "Встреча с Героем России Артёмом Владимировичем Чумаровым",
    date: "06 февраля 2026",
    category: "other",
    categoryLabel: "Прочие мероприятия",
    badge: "Прочие мероприятия",
    cover: "./images/admin.hero.of.russia/1.PNG",
    photos: [
      "./images/admin.hero.of.russia/1.PNG",
      "./images/admin.hero.of.russia/2.PNG",
      "./images/admin.hero.of.russia/3.PNG",
	  "./images/admin.hero.of.russia/4.PNG",
    ],
  },
  // {
    // id: "career-day",
    // title: "День карьеры",
    // date: "01 апреля 2026",
    // category: "other",
    // categoryLabel: "Прочие мероприятия",
    // badge: "Прочие мероприятия",
    // cover: "./images/career-day-cover.jpg",
    // photos: [
      // "./images/career1.jpg",
      // "./images/career2.jpg",
      // "./images/career3.jpg",
    // ],
  // },
];

const state = {
  filter: "all",
  gallery: {
    isOpen: false,
    digestId: null,
    index: 0,
  },
};

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  renderDigests();
  setupFilterControls();
  setupScrollButtons();
  setupFooterYear();
  setupGalleryControls();
});

// Рендер карточек дайджестов
function renderDigests() {
  const grid = qs(".digest-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  DIGESTS.forEach((digest) => {
    const card = document.createElement("article");
    card.className = "digest-card";
    card.dataset.category = digest.category;
    card.dataset.digestId = digest.id;

    card.innerHTML = `
      <div class="digest-card__image" style="background-image: url('${digest.cover}')">
        <span class="digest-card__badge">${digest.badge}</span>
      </div>
      <div class="digest-card__body">
        <h3 class="digest-card__title">${digest.title}</h3>
        <div class="digest-card__meta">
          <span>${digest.date}</span>
          <span class="digest-card__pill">
            <span class="digest-card__dot" style="width:6px;height:6px;border-radius:999px;background:var(--accent);display:inline-block;"></span>
            ${digest.categoryLabel}
          </span>
        </div>
        <span class="digest-card__link">Открыть галерею</span>
      </div>
    `;

    card.addEventListener("click", () => openGallery(digest.id, 0));

    fragment.appendChild(card);
  });

  grid.innerHTML = "";
  grid.appendChild(fragment);
  applyFilter(state.filter);
}

// Фильтрация
function setupFilterControls() {
  const chips = qsa(".chip[data-filter]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const value = chip.dataset.filter || "all";
      state.filter = value;

      chips.forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");

      applyFilter(value);
    });
  });
}

function applyFilter(filter) {
  const cards = qsa(".digest-card");
  cards.forEach((card) => {
    const category = card.dataset.category;
    const shouldShow = filter === "all" || category === filter;
    card.classList.toggle("digest-card--hidden", !shouldShow);
  });
}

// Плавный скролл по кнопкам
function setupScrollButtons() {
  qsa("[data-scroll-to]").forEach((btn) => {
    const targetSelector = btn.getAttribute("data-scroll-to");
    if (!targetSelector) return;

    btn.addEventListener("click", () => {
      const target = qs(targetSelector);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Год в футере
function setupFooterYear() {
  const yearEl = qs("#footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

// Галерея
function setupGalleryControls() {
  const backdrop = qs("[data-gallery-backdrop]");
  const closeBtn = qs("[data-gallery-close]");
  const prevBtn = qs("[data-gallery-prev]");
  const nextBtn = qs("[data-gallery-next]");

  if (!backdrop) return;

  // Закрытие по клику по фону
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      closeGallery();
    }
  });

  closeBtn?.addEventListener("click", closeGallery);
  prevBtn?.addEventListener("click", () => changePhoto(-1));
  nextBtn?.addEventListener("click", () => changePhoto(1));

  document.addEventListener("keydown", (event) => {
    if (!state.gallery.isOpen) return;
    if (event.key === "Escape") {
      closeGallery();
    } else if (event.key === "ArrowLeft") {
      changePhoto(-1);
    } else if (event.key === "ArrowRight") {
      changePhoto(1);
    }
  });
}

function openGallery(digestId, startIndex = 0) {
  const digest = DIGESTS.find((d) => d.id === digestId);
  if (!digest) return;

  state.gallery.isOpen = true;
  state.gallery.digestId = digestId;
  state.gallery.index = Math.min(
    Math.max(startIndex, 0),
    Math.max(digest.photos.length - 1, 0)
  );

  const backdrop = qs("[data-gallery-backdrop]");
  if (!backdrop) return;

  backdrop.classList.add("is-open");
  backdrop.setAttribute("aria-hidden", "false");

  updateGalleryView();
}

function closeGallery() {
  const backdrop = qs("[data-gallery-backdrop]");
  if (!backdrop) return;

  state.gallery.isOpen = false;
  state.gallery.digestId = null;
  state.gallery.index = 0;

  backdrop.classList.remove("is-open");
  backdrop.setAttribute("aria-hidden", "true");
}

function changePhoto(step) {
  if (!state.gallery.isOpen || !state.gallery.digestId) return;
  const digest = DIGESTS.find((d) => d.id === state.gallery.digestId);
  if (!digest) return;

  const total = digest.photos.length;
  if (!total) return;

  state.gallery.index = (state.gallery.index + step + total) % total;
  updateGalleryView();
}

function updateGalleryView() {
  const digest = DIGESTS.find((d) => d.id === state.gallery.digestId);
  if (!digest) return;

  const photoUrl = digest.photos[state.gallery.index];

  const imageEl = qs("[data-gallery-image]");
  const titleEl = qs("[data-gallery-title]");
  const dateEl = qs("[data-gallery-date]");
  const counterEl = qs("[data-gallery-counter]");

  if (imageEl) {
    imageEl.style.backgroundImage = `url('${photoUrl}')`;
  }
  if (titleEl) {
    titleEl.textContent = digest.title;
  }
  if (dateEl) {
    dateEl.textContent = digest.date;
  }
  if (counterEl) {
    counterEl.textContent = `${state.gallery.index + 1} / ${digest.photos.length}`;
  }
}