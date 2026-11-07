/**
 * ALFARGO Q-Commerce Architecture - Tab & Navigation Logic
 * Handles smooth switching between Warehouse, Mother Hub, and Hub.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const topologyNodes = document.querySelectorAll('.topology-node[data-target]');

  function switchTab(targetId) {
    if (!targetId) return;

    // 1. Update Navigation Buttons
    navButtons.forEach(btn => {
      const parent = btn.closest('.nav-item');
      if (parent && parent.dataset.target === targetId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // 2. Update Topology Flow Nodes
    topologyNodes.forEach(node => {
      if (node.dataset.target === targetId) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    // 3. Switch Tab Panels
    tabPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, `#${targetId}`);
    } else {
      location.hash = targetId;
    }
  }

  // Event Listeners for Nav Buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = btn.closest('.nav-item');
      if (parent) {
        switchTab(parent.dataset.target);
      }
    });
  });

  // Event Listeners for Topology Flow Nodes
  topologyNodes.forEach(node => {
    node.addEventListener('click', () => {
      switchTab(node.dataset.target);
    });
  });

  // Deep-linking: check URL hash on initial load
  const initialHash = window.location.hash.replace('#', '');
  const validTabs = ['beranda', 'warehouse', 'mother-hub', 'hub'];
  if (validTabs.includes(initialHash)) {
    switchTab(initialHash);
  } else {
    // Default to Warehouse
    switchTab('warehouse');
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (validTabs.includes(hash)) {
      switchTab(hash);
    }
  });
});

