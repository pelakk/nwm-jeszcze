(function () {
  const { games, codeSets, articleData } = window.LOOTVAULT_DATA;
  const app = document.querySelector("#app");
  const toast = document.querySelector("#toast");
  let toastTimer;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const gameUrl = (game) => `/${game.slug}-codes/`;
  const articleUrl = (article) => `/blog/${article.slug}/`;
  const getGame = (slug) => games.find((game) => game.slug === slug);
  const getArticle = (slug) => articleData.find((article) => article.slug === slug);
  const icon = (name, size = 20) => {
    const paths = {
      search: '<circle cx="11" cy="11" r="7"></circle><path d="m16 16 4 4"></path>',
      arrow: '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>',
      copy: '<rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"></path>',
      spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z"></path><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z"></path>',
      star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"></path>',
      thumbUp: '<path d="M7 10v12"></path><path d="M15 5.9 14 10h6.2a2 2 0 0 1 1.9 2.6l-2.2 7A2 2 0 0 1 18 21H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3.1a2 2 0 0 0 1.8-1.1l2.4-4.8A1.8 1.8 0 0 1 15 5.9Z"></path>',
      thumbDown: '<path d="M7 14V2"></path><path d="m15 18  -1  -4h6.2a2 2 0 0 0 1.9-2.6l-2.2-7A2 2 0 0 0 18 3H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3.1a2 2 0 0 1 1.8 1.1l2.4 4.8A1.8 1.8 0 0 0 15 18Z"></path>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
      close: '<path d="m18 6-12 12M6 6l12 12"></path>',
      check: '<path d="m5 12 4 4L19 6"></path>',
      clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
      book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"></path><path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20"></path>'
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
  };
  const vaultStorageKey = "lootvault-my-vault";
  const voteStorageKey = "lootvault-code-votes";
  const readStoredObject = (key) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch {
      showToast("Saved browser data could not be read.");
      return {};
    }
  };
  const writeStoredObject = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      showToast("Your browser could not save this setting.");
      return false;
    }
  };
  const readVault = () => {
    const saved = readStoredObject(vaultStorageKey);
    return Array.isArray(saved.games) ? saved.games.filter((slug) => games.some((game) => game.slug === slug)) : [];
  };
  const codeVoteKey = (game, entry) => `${game.slug}:${entry.code}`;
  const voteControls = (game, entry) => {
    const vote = readStoredObject(voteStorageKey)[codeVoteKey(game, entry)];
    return `<span class="local-vote" data-vote-group="${escapeHtml(codeVoteKey(game, entry))}" aria-label="Local vote for this sample code">
      <button class="vote-button${vote === "up" ? " vote-up-selected" : ""}" type="button" data-code-vote="${escapeHtml(codeVoteKey(game, entry))}" data-vote="up" aria-label="This code worked" aria-pressed="${vote === "up"}">${icon("thumbUp", 14)}</button>
      <button class="vote-button${vote === "down" ? " vote-down-selected" : ""}" type="button" data-code-vote="${escapeHtml(codeVoteKey(game, entry))}" data-vote="down" aria-label="This code did not work" aria-pressed="${vote === "down"}">${icon("thumbDown", 14)}</button>
      <small>${vote ? "Your vote saved" : "Your vote"} · this device</small>
    </span>`;
  };
  const gameArt = (game, className = "game-cover") => `<span class="${className} game-art game-art-${escapeHtml(game.slug)}" style="--game-color:${game.color}" role="img" aria-label="${escapeHtml(game.name)} artwork"><i></i></span>`;
  const gameMark = (game, className = "feed-game-mark") => `<span class="${className} game-art game-art-${escapeHtml(game.slug)}" style="--game-color:${game.color}" aria-hidden="true"></span>`;
  const sampleCount = (game) => codeEntries(game).length;
  const gameCard = (game, compact = false) => `
    <a class="game-card${compact ? " game-card-compact" : ""}" href="${gameUrl(game)}">
      ${gameArt(game)}
      <span class="game-card-copy"><strong>${escapeHtml(game.name)}</strong><small>${escapeHtml(game.genre)}</small><span class="game-card-count">${sampleCount(game)} demo ${sampleCount(game) === 1 ? "entry" : "entries"} <i></i></span></span>
      <span class="card-arrow">${icon("arrow", 16)}</span>
    </a>`;
  const articleCard = (article, featured = false) => {
    const game = getGame(article.game);
    return `<a class="article-card${featured ? " article-card-featured" : ""}" href="${articleUrl(article)}">
      <span class="article-art${game ? ` game-art game-art-${escapeHtml(game.slug)}` : ""}" style="--game-color:${game ? game.color : "#00e5ff"}">
        <span class="article-art-tag">${escapeHtml(article.category)}</span><span class="article-art-mark" aria-hidden="true"></span>
        <span class="article-art-title">${escapeHtml(game ? game.name : "LootVault")}</span>
      </span>
      <span class="article-card-body"><span class="article-card-meta">${escapeHtml(game ? game.name : "LootVault")} <i>·</i> ${escapeHtml(article.readTime)}</span>
      <strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.excerpt)}</span>
      <span class="text-link">Read guide ${icon("arrow", 15)}</span></span>
    </a>`;
  };
  const codeEntries = (game) => {
    const provided = codeSets[game.slug];
    if (provided) return provided;
    const safeInitials = game.initials.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    return [{ code: `DEMO-${safeInitials}-26`, reward: "Sample reward — replace with a verified offer", status: "active", type: "sample" }];
  };
  const codeRow = (entry, game) => {
    const status = entry.status === "expired"
      ? '<span class="status-badge status-expired">Expired sample</span>'
      : entry.type === "new-only"
        ? '<span class="status-badge status-new-player">New player sample</span>'
        : entry.status === "new"
          ? '<span class="status-badge status-new">New sample</span>'
          : entry.verified
            ? '<span class="status-badge status-active">Verified active</span>'
          : '<span class="status-badge status-sample">Sample only</span>';
    const isNewPlayer = entry.type === "new-only";
    const configuredAffiliate = game.affiliateUrl;
    const action = isNewPlayer && configuredAffiliate
      ? `<a class="button button-outline button-small" href="${escapeHtml(configuredAffiliate)}" rel="sponsored nofollow" data-affiliate="${escapeHtml(game.slug)}">Claim offer ${icon("arrow", 14)}</a>`
      : entry.status === "expired"
        ? '<span class="expired-copy">Unavailable</span>'
        : `<button class="copy-button copy-button-large" type="button" data-copy="${escapeHtml(entry.code)}" aria-label="Copy sample ${escapeHtml(entry.code)}">${icon("copy", 15)} COPY CODE</button>`;
    return `<tr class="${entry.status === "expired" ? "row-expired" : ""}">
      <td data-label="CODE"><span class="code-value">${escapeHtml(entry.code)}</span></td>
      <td data-label="EXAMPLE REWARD">${escapeHtml(entry.reward)}</td>
      <td data-label="STATUS"><span class="code-status-cell">${status}${voteControls(game, entry)}</span></td>
      <td data-label="ACTION">${action}</td>
    </tr>`;
  };
  const myVaultPanel = () => {
    const favorites = readVault().map(getGame).filter(Boolean);
    if (!favorites.length) return "";
    return `<section class="my-vault" id="my-vault" aria-label="My Vault saved games">
      <div class="my-vault-heading"><div><span class="vault-star">${icon("star", 16)}</span><span><strong>MY VAULT</strong><small>Your saved games, ready when you are.</small></span></div><span class="vault-count">${favorites.length} SAVED</span></div>
      <div class="my-vault-games">${favorites.map((game) => `<div class="vault-game"><a href="${gameUrl(game)}">${gameArt(game, "vault-game-art")}<span><strong>${escapeHtml(game.name)}</strong><small>${sampleCount(game)} demo ${sampleCount(game) === 1 ? "entry" : "entries"}</small></span></a><button type="button" class="vault-remove" data-remove-favorite="${escapeHtml(game.slug)}" aria-label="Remove ${escapeHtml(game.name)} from My Vault">${icon("close", 15)}</button></div>`).join("")}</div>
    </section>`;
  };
  const recommendedGames = (game) => {
    const priorities = {
      "genshin-impact": ["wuthering-waves", "honkai-star-rail", "afk-journey"],
      "honkai-star-rail": ["genshin-impact", "afk-journey", "raid-shadow-legends"],
      "raid-shadow-legends": ["afk-journey", "honkai-star-rail", "genshin-impact"],
      "whiteout-survival": ["rise-of-kingdoms", "lords-mobile", "state-of-survival"]
    };
    const matches = (priorities[game.slug] || games.filter((candidate) => candidate.slug !== game.slug && /RPG/i.test(candidate.genre)).map((candidate) => candidate.slug))
      .map(getGame).filter((candidate) => candidate && candidate.slug !== game.slug);
    return matches.slice(0, 3);
  };
  const recommendationCard = (game) => {
    const article = articleData.find((candidate) => candidate.game === game.slug);
    const link = game.affiliateUrl;
    const cta = link
      ? `<a class="button button-primary" href="${escapeHtml(link)}" rel="sponsored nofollow" data-affiliate="${escapeHtml(game.slug)}">${escapeHtml(game.offer?.cta || "PLAY FREE NOW")} ${icon("arrow", 14)}</a>`
      : `<a class="button button-primary" href="${gameUrl(game)}">EXPLORE GAME ${icon("arrow", 14)}</a>`;
    return `<article class="recommendation-card"><div class="recommendation-art" style="--game-color:${game.color}">${gameArt(game, "recommendation-cover")}<span class="recommendation-type">PLAYER PICK</span></div><div class="recommendation-copy"><strong>${escapeHtml(game.name)}</strong><p>${escapeHtml(game.offer?.description || article?.excerpt || `${game.genre} · ${game.platform}`)}</p>${link ? '<small class="recommendation-disclosure">Partner link · offer terms apply</small>' : '<small class="recommendation-disclosure">No partner offer configured</small>'}${cta}</div></article>`;
  };
  const renderMyVaultPanel = () => {
    const existing = document.querySelector(".my-vault");
    const markup = myVaultPanel();
    if (!markup) {
      existing?.remove();
      renderVaultNavigation();
      return;
    }
    if (existing) existing.outerHTML = markup;
    else document.querySelector(".hero")?.insertAdjacentHTML("beforebegin", markup);
    renderVaultNavigation();
  };
  const renderVaultNavigation = () => {
    const nav = document.querySelector("#main-nav");
    const current = nav?.querySelector(".vault-nav-link");
    const favorites = readVault().length;
    if (!nav) return;
    if (!favorites) {
      current?.remove();
      return;
    }
    const markup = `<a class="vault-nav-link" href="/#my-vault">${icon("star", 14)}<span>My Vault</span><span class="vault-nav-count">${favorites}</span></a>`;
    if (current) current.outerHTML = markup;
    else nav.insertAdjacentHTML("beforeend", markup);
  };
  const setVaultMembership = (gameSlug, shouldSave) => {
    const favorites = readVault().filter((slug) => slug !== gameSlug);
    if (shouldSave) favorites.push(gameSlug);
    if (!writeStoredObject(vaultStorageKey, { games: favorites })) return false;
    renderMyVaultPanel();
    return true;
  };
  const updateMeta = (title, description) => {
    document.title = `${title} | LootVault`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = description;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${location.origin}${location.pathname}`;
  };
  const shell = (content, active = "") => `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="/" aria-label="LootVault home"><span class="brand-mark">L</span><span>LOOT<span class="brand-accent">VAULT</span></span></a>
        <nav class="main-nav" id="main-nav" aria-label="Main navigation">
          <a class="${active === "games" ? "nav-active" : ""}" href="/games/">Games</a>
          <a class="${active === "blog" ? "nav-active" : ""}" href="/blog/">Guides &amp; tier lists</a>${readVault().length ? `<a class="vault-nav-link" href="/#my-vault">${icon("star", 14)}<span>My Vault</span><span class="vault-nav-count">${readVault().length}</span></a>` : ""}
          <a href="/about-us/">About</a>
        </nav>
        <div class="header-right"><span class="header-live"><i></i> PLAYER RESOURCE HUB</span><button class="mobile-menu" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button></div>
      </div>
    </header>
    <main>${content}</main>
    <footer class="site-footer">
      <div class="footer-main">
        <div class="footer-brand"><a class="brand" href="/"><span class="brand-mark">L</span><span>LOOT<span class="brand-accent">VAULT</span></span></a><p>Player-first game rewards and guides. Always verify offers with official sources.</p></div>
        <div class="footer-links"><strong>Explore</strong><a href="/games/">All games</a><a href="/blog/">Guides &amp; tier lists</a><a href="/about-us/">About us</a></div>
        <div class="footer-links"><strong>Information</strong><a href="/contact/">Contact</a><a href="/privacy-policy/">Privacy policy</a><a href="/affiliate-disclosure/">Affiliate disclosure</a></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} LootVault. Independent fan resource.</span><span>Not affiliated with game publishers.</span></div>
    </footer>`;

  function renderHome() {
    updateMeta("Game codes, rewards & guides", "Discover game reward pages, player-first guides, and tier list explainers at LootVault.");
    const popular = games.filter((game) => game.popular).slice(0, 6);
    const latest = articleData.slice(0, 3);
    const featuredCodeRows = games.filter((game) => game.popular).slice(0, 5).map((game) => {
      const entry = codeEntries(game).find((candidate) => candidate.status !== "expired");
      return { game, entry };
    });
    app.innerHTML = shell(`
      ${myVaultPanel()}
      <section class="hero">
        <div class="hero-grid"></div><div class="hero-glow"></div>
        <div class="hero-content">
          <div class="eyebrow"><span class="eyebrow-line"></span> YOUR NEXT REWARD STARTS HERE</div>
          <h1>Play more.<br><span>Claim smarter.</span></h1>
          <p class="hero-description">Game codes, player-tested guides, and the info you need to make your next move.</p>
          <div class="hero-search-wrap">
            <label class="hero-search">${icon("search")}<input id="home-search" type="search" autocomplete="off" placeholder="Search games or guides…" aria-label="Search games or guides"><kbd>⌘ K</kbd></label>
            <div id="search-results" class="search-results" hidden></div>
          </div>
          <div class="hero-proof"><span>${icon("check", 15)} 20+ games covered</span><span>${icon("check", 15)} Player-first guides</span></div>
        </div>
        <aside class="hero-codefeed" aria-label="Sample game codes">
          <div class="feed-heading"><span><i></i> THE DROP ZONE</span><span class="feed-sample">SAMPLE</span></div>
          <h2>Codes on the <span>radar.</span></h2>
          <p>Example entries from popular games</p>
          <div class="feed-list">${featuredCodeRows.slice(0, 3).map(({ game, entry }) => `
            <a class="feed-row" href="${gameUrl(game)}">
              ${gameMark(game)}
              <span class="feed-code-copy"><strong>${escapeHtml(game.name)}</strong><code>${escapeHtml(entry.code)}</code></span>
              <span class="feed-row-arrow">${icon("arrow", 15)}</span>
            </a>`).join("")}</div>
          <a class="feed-footer-link" href="/games/">Browse all 20 games ${icon("arrow", 14)}</a>
        </aside>
        <div class="hero-bottom"><span>SCROLL TO EXPLORE</span><span class="hero-bottom-line"></span><span>20 GAMES · SAMPLE DATA</span></div>
      </section>
      <section class="section how-it-works" aria-labelledby="how-it-works-title">
        <div class="how-it-works-heading">
          <div><div class="eyebrow"><span class="eyebrow-line"></span> THE LOOTVAULT LOOP</div><h2 id="how-it-works-title">Find rewards.<br><span>Skip the guesswork.</span></h2></div>
          <p>Go from game page to in-game rewards in three simple steps. Clear labels help you know what you’re looking at before you try a code.</p>
        </div>
        <div class="how-steps">
          <article class="how-step">
            <div class="how-step-visual how-step-visual-search">
              <span class="how-step-number">01</span>
              <div class="how-search-art">${icon("search", 28)}<span>20+ GAME PAGES</span></div>
            </div>
            <div class="how-step-copy"><span>START HERE</span><h3>Pick your game</h3><p>Search the directory for your game’s reward page, codes, and player guides.</p></div>
          </article>
          <article class="how-step">
            <div class="how-step-visual how-step-visual-check">
              <span class="how-step-number">02</span>
              <div class="how-status-art"><span>ENTRY DETAILS</span><strong><i></i> Reward &amp; status labels</strong><small>Check eligibility before redeeming</small></div>
            </div>
            <div class="how-step-copy"><span>KNOW BEFORE YOU CLAIM</span><h3>Check the details</h3><p>Review the reward, eligibility, and status. Demo entries are clearly labeled—not passed off as live codes.</p></div>
          </article>
          <article class="how-step">
            <div class="how-step-visual how-step-visual-claim">
              <span class="how-step-number">03</span>
              <div class="how-claim-art"><code>YOUR CODE</code><span>${icon("copy", 15)} COPY CODE</span><small>Redeem through the official game</small></div>
            </div>
            <div class="how-step-copy"><span>BACK IN THE GAME</span><h3>Redeem with confidence</h3><p>Copy a code when available, then follow the game’s official redemption steps to claim your reward.</p></div>
          </article>
        </div>
      </section>
      <section class="section section-trending">
        <div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> START EXPLORING</div><h2>Popular <span>games</span></h2></div><a class="text-link" href="/games/">View all games ${icon("arrow", 16)}</a></div>
        <div class="game-grid">${popular.map((game) => gameCard(game)).join("")}</div>
      </section>
      <section class="section code-desk-section">
        <div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> THE CODE DESK</div><h2>Reward tracker <span>preview</span></h2></div><span class="sample-label">SAMPLE ENTRIES · NOT LIVE</span></div>
        <div class="code-table-wrap home-code-table-wrap"><table class="code-table home-code-table"><thead><tr><th>GAME / CODE</th><th>EXAMPLE REWARD</th><th>STATUS / VOTE</th><th>ACTION</th></tr></thead><tbody>${featuredCodeRows.map(({ game, entry }) => `<tr><td data-label="GAME / CODE"><a class="home-code-game" href="${gameUrl(game)}">${gameMark(game)}<span>${escapeHtml(game.name)}<code>${escapeHtml(entry.code)}</code></span></a></td><td data-label="EXAMPLE REWARD">${escapeHtml(entry.reward)}</td><td data-label="STATUS / VOTE"><span class="code-status-cell"><span class="status-badge status-sample">Sample only</span>${voteControls(game, entry)}</span></td><td data-label="ACTION"><button class="copy-button copy-button-large" type="button" data-copy="${escapeHtml(entry.code)}">${icon("copy", 15)} COPY CODE</button></td></tr>`).join("")}</tbody></table></div>
        <p class="code-desk-note">All entries above are examples, not current or verified game codes. Always check official game channels.</p>
      </section>
      <section class="section latest-section">
        <div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> THE PLAYER'S PLAYBOOK</div><h2>Guides worth <span>your time</span></h2></div><a class="text-link" href="/blog/">Explore all guides ${icon("arrow", 16)}</a></div>
        <div class="article-grid">${latest.map((article, index) => articleCard(article, index === 0)).join("")}</div>
      </section>
      <section class="affiliate-banner"><div class="affiliate-symbol">${icon("spark", 26)}</div><div><span class="eyebrow">YOUR NEXT DROP STARTS HERE</span><h2>Find your game. <span>Find your next move.</span></h2><p>Jump into the full directory for game-specific reward pages and player guides. Sample listings are always labeled.</p></div><a class="button button-primary" href="/games/">BROWSE ALL GAMES ${icon("arrow", 15)}</a></section>
      <section class="section home-directory"><div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> BUILT FOR EVERY PLAYER</div><h2>Your games. <span>Your next move.</span></h2></div><a class="text-link" href="/games/">Browse directory ${icon("arrow", 16)}</a></div><p>From RPGs and Roblox experiences to mobile strategy, find your game and get straight to what matters.</p></section>
    `);
    bindHomeSearch();
  }

  function bindHomeSearch() {
    const input = document.querySelector("#home-search");
    const results = document.querySelector("#search-results");
    if (!input || !results) return;
    const performSearch = () => {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) {
        results.hidden = true;
        results.innerHTML = "";
        return;
      }
      const matchingGames = games.filter((game) => `${game.name} ${game.genre}`.toLowerCase().includes(query)).slice(0, 4);
      const matchingArticles = articleData.filter((article) => `${article.title} ${article.category} ${article.excerpt}`.toLowerCase().includes(query)).slice(0, 3);
      const items = [
        ...matchingGames.map((game) => `<a class="search-result" href="${gameUrl(game)}"><span class="result-icon" style="--game-color:${game.color}">${escapeHtml(game.initials)}</span><span><strong>${escapeHtml(game.name)}</strong><small>Game codes · ${escapeHtml(game.genre)}</small></span>${icon("arrow", 15)}</a>`),
        ...matchingArticles.map((article) => `<a class="search-result" href="${articleUrl(article)}"><span class="result-icon result-icon-guide">${icon("book", 16)}</span><span><strong>${escapeHtml(article.title)}</strong><small>Guide · ${escapeHtml(article.readTime)}</small></span>${icon("arrow", 15)}</a>`)
      ];
      results.innerHTML = items.length ? items.join("") : '<p class="search-empty">No matches yet. Try another game or guide.</p>';
      results.hidden = false;
    };
    input.addEventListener("input", performSearch);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") results.hidden = true;
      if (event.key === "Enter") {
        const firstLink = results.querySelector("a");
        if (firstLink && !results.hidden) navigate(firstLink.href);
      }
    });
  }

  function renderGames() {
    updateMeta("All games", "Browse game reward pages and guides by title.");
    app.innerHTML = shell(`
      <section class="page-hero"><div class="eyebrow"><span class="eyebrow-line"></span> THE GAME DIRECTORY</div><h1>Find your <span>game.</span></h1><p>Pick a title to explore its rewards page, helpful guides, and player resources.</p>
      <label class="directory-search">${icon("search")}<input id="directory-search" type="search" placeholder="Filter ${games.length} games…" aria-label="Filter games"><span>${games.length} GAMES</span></label></section>
      <section class="section directory-section"><div class="directory-count"><strong id="game-count">${games.length} games</strong><span>New titles and verified info are added over time.</span></div><div class="game-grid" id="directory-grid">${games.map((game) => gameCard(game)).join("")}</div><p id="no-games" class="search-empty" hidden>No games match that search.</p></section>
    `, "games");
    const input = document.querySelector("#directory-search");
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      const matches = games.filter((game) => `${game.name} ${game.genre} ${game.platform}`.toLowerCase().includes(query));
      document.querySelector("#directory-grid").innerHTML = matches.map((game) => gameCard(game)).join("");
      document.querySelector("#game-count").textContent = `${matches.length} ${matches.length === 1 ? "game" : "games"}`;
      document.querySelector("#no-games").hidden = matches.length > 0;
    });
  }

  function renderGame(game) {
    if (!game) return renderNotFound();
    const allCodes = codeEntries(game);
    const activeCodes = allCodes.filter((entry) => entry.status !== "expired");
    const expiredCodes = allCodes.filter((entry) => entry.status === "expired");
    const related = articleData.filter((article) => article.game === game.slug);
    const similarGames = recommendedGames(game);
    const beginnerGuide = related.find((article) => article.category === "Beginner Guides");
    const isSaved = readVault().includes(game.slug);
    const signupUrl = game.affiliateUrl || game.officialUrl;
    const hasVerifiedPartnerOffer = Boolean(game.affiliateUrl && game.offer?.verified);
    const ctaUrl = signupUrl || (beginnerGuide ? articleUrl(beginnerGuide) : "/games/");
    const ctaText = hasVerifiedPartnerOffer
      ? "CLAIM STARTER BONUS"
      : signupUrl
        ? "PLAY FREE NOW"
        : beginnerGuide
          ? "READ BEGINNER GUIDE"
          : "EXPLORE MORE GAMES";
    const starterBenefits = hasVerifiedPartnerOffer
      ? (game.offer?.benefits || ["Official partner offer", "Check eligibility before signup", "Review terms on the publisher site"])
      : signupUrl
        ? ["Official Publisher Destination", "Direct Account & Game Download", "Verified Free-to-Play Access"]
        : ["Game-specific player guides", "Quick access to game codes", "Beginner-friendly tips"];
    updateMeta(`${game.name} codes & rewards`, `Explore the ${game.name} reward page and related player guides. Sample listings are not live-verified.`);
    const affiliateCta = `<a class="button button-gold starter-cta" href="${escapeHtml(ctaUrl)}"${game.affiliateUrl ? ' rel="sponsored nofollow" data-affiliate="' + escapeHtml(game.slug) + '"' : signupUrl ? ' target="_blank" rel="noopener noreferrer"' : ""}>${ctaText} ${icon("arrow", 15)}</a>`;
    app.innerHTML = shell(`
      <div class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/games/">Games</a><span>/</span><span>${escapeHtml(game.name)}</span></div>
      <section class="game-page-hero">${gameArt(game, "game-cover game-cover-large")}<div class="game-page-title"><div class="eyebrow"><span class="eyebrow-line"></span> ${escapeHtml(game.genre.toUpperCase())}</div><div class="game-heading-row"><h1>${escapeHtml(game.name)} <span>Codes</span></h1><button class="vault-toggle${isSaved ? " vault-toggle-saved" : ""}" type="button" data-vault-toggle="${escapeHtml(game.slug)}" aria-pressed="${isSaved}">${icon("star", 16)} <span>${isSaved ? "SAVED TO MY VAULT" : "ADD TO MY VAULT"}</span></button></div><p>${escapeHtml(game.platform)} <i>·</i> Independent player resource</p></div><div class="verified-pill verified-demo">EDITORIAL STATUS<br><small>Sample data · not verified</small></div></section>
      <div class="sample-notice"><span>!</span><p><strong>Sample page, not live code data.</strong> The codes and rewards below are examples for this prototype. Check official game channels before trying a code; no active offer is being promised.</p></div>
      <div class="game-page-layout"><div class="game-main-column">
        <section class="code-panel" id="active-codes"><div class="panel-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> REWARD TRACKER</div><h2>Code examples <span>(${activeCodes.length})</span></h2></div><span class="sample-label">NOT VERIFIED</span></div>
          <div class="code-table-wrap"><table class="code-table"><thead><tr><th>CODE</th><th>EXAMPLE REWARD</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>${activeCodes.map((entry) => codeRow(entry, game)).join("")}</tbody></table></div>
          <div class="how-to"><h3>How to redeem a code</h3><ol><li>Open the official ${escapeHtml(game.name)} game or publisher redemption page.</li><li>Sign in using the official account system, then locate the code redemption option.</li><li>Enter the code exactly as shown and confirm. Check in-game mail or inventory for rewards.</li></ol><p>Redemption steps vary by game, region, and platform. Use the publisher's official instructions if these steps differ.</p></div>
        </section>
        ${expiredCodes.length ? `<section class="code-panel expired-panel"><div class="panel-heading"><div><div class="eyebrow">ARCHIVE</div><h2>Expired <span>examples</span></h2></div></div><div class="code-table-wrap"><table class="code-table"><thead><tr><th>CODE</th><th>EXAMPLE REWARD</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>${expiredCodes.map((entry) => codeRow(entry, game)).join("")}</tbody></table></div></section>` : ""}
        ${similarGames.length ? `<section class="cross-promo"><div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> MORE WORLDS TO EXPLORE</div><h2>Playing ${escapeHtml(game.name)}? <span>You might also like these RPGs:</span></h2></div></div><div class="recommendation-grid">${similarGames.map(recommendationCard).join("")}</div><p class="recommendation-note">Recommendations are editorial picks. Affiliate offers appear only when a real partner link and offer terms are configured.</p></section>` : ""}
        ${related.length ? `<section class="related-section"><div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> LEVEL UP YOUR KNOW-HOW</div><h2>Related <span>guides</span></h2></div></div><div class="article-grid article-grid-related">${related.map((article) => articleCard(article)).join("")}</div></section>` : ""}
      </div><aside class="game-sidebar"><div class="starter-card starter-card-${escapeHtml(game.slug)}"><div class="starter-icon">${icon("spark", 22)}</div><div class="eyebrow">${hasVerifiedPartnerOffer ? "VERIFIED PARTNER OFFER" : game.affiliateUrl ? "OFFICIAL PARTNER LINK" : "READY, PLAYER ONE?"}</div><h2>${hasVerifiedPartnerOffer ? "Claim your starter " : "Get in the game. "}<span>${hasVerifiedPartnerOffer ? "bonus." : "the legit way."}</span></h2><p>${hasVerifiedPartnerOffer ? escapeHtml(game.offer.description) : game.affiliateUrl ? "Continue to the official publisher through our partner link. Your game and account are waiting." : game.officialUrl ? `Head to the official ${escapeHtml(game.name)} destination and jump into the game.` : beginnerGuide ? `New to ${escapeHtml(game.name)}? Start with our beginner guide and jump into the action.` : `Explore player resources for ${escapeHtml(game.name)}.`}</p><ul class="starter-benefits">${starterBenefits.map((benefit) => `<li>${icon("check", 14)}<span>${escapeHtml(benefit)}</span></li>`).join("")}</ul>${affiliateCta}<span class="starter-fineprint">${hasVerifiedPartnerOffer ? "Partner offer · check eligibility and terms." : game.affiliateUrl ? "Partner destination · publisher terms apply." : game.officialUrl ? "Official game destination · start playing today." : "Start with a player guide, then explore the game."}</span></div><div class="sidebar-note"><strong>Keep it legit</strong><p>Examples on this page are not live codes. Verify rewards with the publisher before redeeming.</p></div></aside></div>
    `, "games");
  }

  function renderBlog() {
    updateMeta("Guides & tier lists", "Browse beginner guides, tier list explainers, and player resources.");
    const categories = ["All guides", ...new Set(articleData.map((article) => article.category))];
    app.innerHTML = shell(`
      <section class="page-hero"><div class="eyebrow"><span class="eyebrow-line"></span> THE PLAYER'S PLAYBOOK</div><h1>Play with <span>the plan.</span></h1><p>Practical guides and rankings that explain the why, not just the what.</p></section>
      <section class="section blog-section"><div class="category-tabs" role="tablist" aria-label="Filter guides">${categories.map((category, index) => `<button class="category-tab${index === 0 ? " active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}</div><div class="article-grid blog-grid" id="blog-grid">${articleData.map((article) => articleCard(article)).join("")}</div></section>
    `, "blog");
    document.querySelectorAll(".category-tab").forEach((button) => button.addEventListener("click", () => {
      document.querySelectorAll(".category-tab").forEach((tab) => {
        tab.classList.toggle("active", tab === button);
        tab.setAttribute("aria-selected", String(tab === button));
      });
      const selected = button.dataset.category;
      const filtered = selected === "All guides" ? articleData : articleData.filter((article) => article.category === selected);
      document.querySelector("#blog-grid").innerHTML = filtered.map((article) => articleCard(article)).join("");
    }));
  }

  function renderArticle(article) {
    if (!article) return renderNotFound();
    const game = getGame(article.game);
    updateMeta(article.title, article.excerpt);
    const sections = article.sections.map(([heading, paragraphOne, paragraphTwo], index) => `
      <section class="article-content-section"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(paragraphOne)}</p><p>${escapeHtml(paragraphTwo)}</p>
      ${index === 1 && game ? `<a class="inline-code-widget" href="${gameUrl(game)}"><span class="widget-icon">${icon("spark", 20)}</span><span><strong>Looking for ${escapeHtml(game.name)} rewards?</strong><small>Visit the ${escapeHtml(game.name)} codes page. Sample entries are not live-verified.</small></span><span class="widget-arrow">${icon("arrow", 17)}</span></a>` : ""}
      </section>`).join("");
    const beginner = article.category === "Beginner Guides";
    const starterCta = beginner ? `<aside class="article-cta"><div class="starter-icon">${icon("spark", 21)}</div><div><span class="eyebrow">START YOUR JOURNEY</span><h3>Ready to try ${escapeHtml(game ? game.name : "this game")}?</h3><p>Browse game-specific resources. Any sample rewards are clearly labeled and not live offers.</p></div>${game && game.affiliateUrl ? `<a class="button button-gold" href="${escapeHtml(game.affiliateUrl)}" rel="sponsored nofollow" data-affiliate="${escapeHtml(game.slug)}">CLAIM PARTNER OFFER ${icon("arrow", 15)}</a>` : `<a class="button button-gold" href="${game ? gameUrl(game) : "/games/"}">BROWSE GAME CODES ${icon("arrow", 15)}</a>`}</aside>` : "";
    app.innerHTML = shell(`
      <div class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/blog/">Guides</a><span>/</span><span>${escapeHtml(article.category)}</span></div>
      <article class="article-page">
        <header class="article-header"><a class="article-category" href="/blog/">${escapeHtml(article.category)}</a><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.excerpt)}</p><div class="article-byline"><span class="author-avatar">LV</span><span>LootVault Editorial</span><i>·</i><span>${escapeHtml(article.readTime)}</span><i>·</i><span>Independent guide</span></div></header>
        <div class="article-layout"><div class="article-body"><div class="sample-notice article-notice"><span>i</span><p>This guide is general player information, not an official publisher announcement. Game details can change between updates.</p></div><p class="article-intro">${escapeHtml(article.intro)}</p>${starterCta}${sections}
          <div class="article-end"><span class="eyebrow">KEEP EXPLORING</span><h2>Make your next move.</h2><a class="button button-primary" href="${game ? gameUrl(game) : "/games/"}">${game ? `${escapeHtml(game.name)} codes page` : "Browse all games"} ${icon("arrow", 15)}</a></div>
        </div><aside class="article-aside"><div class="aside-sticky"><div class="aside-game-card"><div class="game-cover game-art game-art-${escapeHtml(game ? game.slug : "lootvault")}" style="--game-color:${game ? game.color : "#00e5ff"}"><span>${escapeHtml(game ? game.initials : "LV")}</span><i></i></div><span class="eyebrow">YOUR GAME</span><strong>${escapeHtml(game ? game.name : "LootVault")}</strong><p>Explore the dedicated game page and related player resources.</p><a class="text-link" href="${game ? gameUrl(game) : "/games/"}">View game page ${icon("arrow", 14)}</a></div><div class="aside-disclosure"><strong>How this site works</strong><p>We label sample data clearly. See our <a href="/affiliate-disclosure/">affiliate disclosure</a>.</p></div></div></aside></div>
      </article>
    `, "blog");
  }

  const staticPages = {
    "/about-us/": {
      title: "About LootVault",
      intro: "A clearer, more useful home for players looking for game rewards and practical guides.",
      sections: [
        ["What we do", "LootVault is an independent game resource concept built around reward-code pages, player guides, and straightforward explanations. We want game information to be easy to scan, useful on mobile, and honest about what has—and has not—been verified.", "This demo contains sample game entries, illustrative codes, and editorial examples. The sample codes are not real offers, and the site does not currently have live code verification or publisher partnerships."],
        ["Our approach", "We aim to identify the game and context for every listing, distinguish active information from archived entries, and direct players to official publisher sources for account actions. Guide recommendations should explain assumptions rather than promise guaranteed results.", "Game titles and marks belong to their respective owners. LootVault is an independent fan resource and is not affiliated with or endorsed by game publishers."],
        ["Before launch", "Live reward data, editorial review, contact handling, and any partner placements must be configured and verified before this prototype is used as a production service.", "If you find a problem in a future live listing, use the contact page once a verified contact channel is published."]
      ]
    },
    "/contact/": {
      title: "Contact",
      intro: "We welcome corrections, feedback, and questions about LootVault.",
      sections: [
        ["Corrections and feedback", "This prototype does not yet have a connected contact inbox, so messages submitted here will not be delivered. A verified contact address or form handler must be configured before launch.", "For account, payment, or redemption problems, contact the game's publisher through its official support channels. Never send your password, recovery codes, or payment details to a game-code website."],
        ["Business inquiries", "Partner and advertising inquiries should include the relevant game, a public company contact, and the terms of the proposed offer. We will not publish a promotion until the destination, eligibility, and reward details have been checked."]
      ]
    },
    "/privacy-policy/": {
      title: "Privacy policy",
      intro: "This prototype is designed to work without accounts, analytics, or advertising trackers.",
      sections: [
        ["Information this demo uses", "LootVault does not ask you to create an account or provide personal information. Favorites and code-vote selections are stored locally in your browser and are not sent to LootVault or shared with other visitors. The demo has no analytics integration.", "If you use the copy-code button, the selected sample code is sent to your browser's clipboard only after you click. This site does not receive a copy of that value. Affiliate-link clicks, when links are configured, are counted locally in your browser only."],
        ["Future services", "Before production launch, this policy must be updated to describe any hosting logs, analytics, contact forms, cookies, affiliate reporting, or other services actually enabled. We will not claim that a service is active until it has been configured.", "If a future version stores or shares personal information, this page should explain what is collected, why, how long it is kept, and how users can exercise applicable privacy rights."],
        ["External websites", "Links to game publishers or other websites may have their own privacy policies and terms. Review those policies before using an external service. LootVault is not responsible for the practices of independent publishers or third parties."]
      ]
    },
    "/affiliate-disclosure/": {
      title: "Affiliate disclosure",
      intro: "Transparency matters. This prototype does not currently use affiliate links or receive commissions.",
      sections: [
        ["Current status", "No partner URLs, paid placements, or affiliate tracking integrations are configured in this demo. Any starter-offer area is clearly marked as pending, and sample rewards are not live promotions.", "A future version may use affiliate links. If it does, links will be clearly identified and marked with appropriate sponsored and nofollow attributes. A commission would not increase the price you pay, but the partner's terms would apply."],
        ["Editorial independence", "A commercial relationship should never be presented as an independently verified game reward. We will identify paid placements, explain material eligibility conditions, and avoid guaranteed-value claims unless they are supported by the publisher's current terms.", "Always check the linked publisher's official offer page for availability, region, account eligibility, and expiration before signing up."]
      ]
    }
  };

  function renderStatic(page) {
    updateMeta(page.title, page.intro);
    app.innerHTML = shell(`
      <section class="page-hero static-hero"><div class="eyebrow"><span class="eyebrow-line"></span> LOOTVAULT / INFORMATION</div><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.intro)}</p></section>
      <article class="static-content">${page.sections.map(([heading, ...paragraphs]) => `<section><h2>${escapeHtml(heading)}</h2>${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>`).join("")}${location.pathname === "/contact/" ? '<form id="contact-form" class="contact-form"><label for="contact-message">Your message</label><textarea id="contact-message" name="message" rows="4" placeholder="Contact delivery is not configured in this demo." required></textarea><button class="button button-primary" type="submit">Send message ${icon("arrow", 15)}</button><p class="form-note">The form is visual only; no message will be sent.</p></form>' : ""}</article>
    `);
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("Contact delivery is not configured; no message was sent.");
    });
  }

  function renderNotFound() {
    updateMeta("Page not found", "The page you are looking for could not be found.");
    app.innerHTML = shell(`<section class="not-found"><span class="not-found-code">404</span><h1>Wrong turn, player.</h1><p>That page doesn't exist or may have moved.</p><a href="/" class="button button-primary">Back to home ${icon("arrow", 15)}</a></section>`);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("toast-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("toast-visible"), 2800);
  }

  function navigate(url, replace = false) {
    const target = new URL(url, location.href);
    if (target.origin !== location.origin) return;
    const destination = `${target.pathname}${target.search}${target.hash}`;
    history[replace ? "replaceState" : "pushState"]({}, "", destination);
    renderRoute();
    if (target.hash) {
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  function renderRoute() {
    const path = location.pathname.replace(/\/{2,}/g, "/");
    if (path === "/" || path === "/index.html") return renderHome();
    if (path === "/games/" || path === "/games") return renderGames();
    if (path === "/blog/" || path === "/blog") return renderBlog();
    if (staticPages[path]) return renderStatic(staticPages[path]);
    const articleMatch = path.match(/^\/blog\/([^/]+)\/?$/);
    if (articleMatch) return renderArticle(getArticle(articleMatch[1]));
    const gameMatch = path.match(/^\/([^/]+)-codes\/?$/);
    if (gameMatch) return renderGame(getGame(gameMatch[1]));
    renderNotFound();
  }

  document.addEventListener("click", async (event) => {
    const vaultToggle = event.target.closest("[data-vault-toggle]");
    if (vaultToggle) {
      const gameSlug = vaultToggle.dataset.vaultToggle;
      const saved = readVault().includes(gameSlug);
      if (!setVaultMembership(gameSlug, !saved)) return;
      vaultToggle.classList.toggle("vault-toggle-saved", !saved);
      vaultToggle.setAttribute("aria-pressed", String(!saved));
      vaultToggle.innerHTML = `${icon("star", 16)} <span>${saved ? "ADD TO MY VAULT" : "SAVED TO MY VAULT"}</span>`;
      showToast(saved ? "Removed from My Vault." : "Saved to My Vault on this device.");
      return;
    }

    const removeFavorite = event.target.closest("[data-remove-favorite]");
    if (removeFavorite) {
      const gameSlug = removeFavorite.dataset.removeFavorite;
      if (setVaultMembership(gameSlug, false)) showToast("Removed from My Vault.");
      return;
    }

    const voteButton = event.target.closest("[data-code-vote]");
    if (voteButton) {
      const votes = readStoredObject(voteStorageKey);
      const voteKey = voteButton.dataset.codeVote;
      const nextVote = votes[voteKey] === voteButton.dataset.vote ? null : voteButton.dataset.vote;
      if (nextVote) votes[voteKey] = nextVote;
      else delete votes[voteKey];
      if (!writeStoredObject(voteStorageKey, votes)) return;
      const group = voteButton.closest("[data-vote-group]");
      group.querySelectorAll("[data-code-vote]").forEach((button) => {
        const selected = button.dataset.vote === nextVote;
        button.setAttribute("aria-pressed", String(selected));
        button.classList.toggle("vote-up-selected", selected && nextVote === "up");
        button.classList.toggle("vote-down-selected", selected && nextVote === "down");
      });
      group.querySelector("small").textContent = nextVote ? "Your vote saved" : "Your vote";
      showToast("Vote saved on this device; it is not a shared community total.");
      return;
    }

    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copy);
        showToast("Code copied to clipboard!");
      } catch {
        showToast("Clipboard access failed. Please copy the code manually.");
      }
      return;
    }
    const affiliateLink = event.target.closest("[data-affiliate]");
    if (affiliateLink) {
      try {
        const key = `lootvault-affiliate-clicks:${affiliateLink.dataset.affiliate}`;
        localStorage.setItem(key, String(Number(localStorage.getItem(key) || "0") + 1));
      } catch {
        showToast("Your browser blocked local click measurement.");
      }
    }
    const menuButton = event.target.closest(".mobile-menu");
    if (menuButton) {
      const nav = document.querySelector("#main-nav");
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuButton.innerHTML = icon(open ? "close" : "menu");
      nav.classList.toggle("nav-open", open);
      return;
    }
    const link = event.target.closest("a[href]");
    if (link && !event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && link.target !== "_blank") {
      const target = new URL(link.href, location.href);
      if (target.origin === location.origin && !link.hasAttribute("data-affiliate")) {
        event.preventDefault();
        navigate(target.href);
      }
    }
  });
  document.addEventListener("click", (event) => {
    const results = document.querySelector("#search-results");
    if (results && !event.target.closest(".hero-search-wrap")) results.hidden = true;
  });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      const input = document.querySelector("#home-search");
      if (input) {
        event.preventDefault();
        input.focus();
      }
    }
  });
  window.addEventListener("popstate", () => {
    renderRoute();
    if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" }));
  });
  renderRoute();
})();
