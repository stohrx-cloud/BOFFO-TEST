// Include this on every page that has a <div id="seasonalMenuLinks"></div>
// in its side menu. It fills that div with a link for each currently-enabled
// seasonal menu, and removes links for ones that are disabled.
//
// On a seasonal menu page itself, set window.CURRENT_SEASONAL_SLUG before
// including this script to exclude that page's own link from its own nav.
//
// Runs immediately (not on DOMContentLoaded) — safe because this script tag
// is always placed at the end of <body>, after #seasonalMenuLinks already
// exists in the DOM.

async function loadSeasonalNavLinks(){
    try {
        const res = await fetch('/api/seasonal-menus', { cache: 'no-store' });
        if (!res.ok) return;

        const menus = await res.json();
        const container = document.getElementById('seasonalMenuLinks');
        if (!container) return;

        const currentSlug = window.CURRENT_SEASONAL_SLUG || null;

        container.innerHTML = menus
            .filter(m => m.enabled && m.slug !== currentSlug)
            .map(m => `<a href="${m.slug}-menu.html">${m.name}</a>`)
            .join('');
    } catch (err) {
        console.error('Could not load seasonal menu links', err);
    }
}

loadSeasonalNavLinks();
