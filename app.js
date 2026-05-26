const GITHUB_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`;

function statusLabel(status) {
  const map = { active: 'Active', 'in-progress': 'In Progress', complete: 'Complete' };
  return map[status] || status;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function renderCard(project) {
  const statusClass = `status-${project.status}`;
  const githubHtml = project.github
    ? `<a href="${project.github}" target="_blank" class="github-link">${GITHUB_ICON} View source</a>`
    : `<span class="private-badge">private</span>`;

  return `
    <div class="project-card${project.featured ? ' featured' : ''}">
      <div class="card-header">
        <h3 class="card-title">${project.name}</h3>
        <span class="status-badge ${statusClass}">${statusLabel(project.status)}</span>
      </div>
      <p class="card-description">${project.description}</p>
      <div class="tech-tags">
        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span class="card-date">${formatDate(project.lastUpdated)}</span>
        ${githubHtml}
      </div>
    </div>
  `;
}

async function init() {
  const grid = document.getElementById('projects-grid');
  try {
    const res = await fetch('projects.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { projects } = await res.json();
    const featured = projects.filter(p => p.featured);
    const rest = projects.filter(p => !p.featured);
    grid.innerHTML = [...featured, ...rest].map(renderCard).join('');
  } catch (e) {
    grid.innerHTML = `<p class="loading">Failed to load projects: ${e.message}</p>`;
  }
}

// Subtle card glow that follows mouse
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.project-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

init();
