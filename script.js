// =========================================================
// MARCENARIA OLIVEIRA — script compartilhado (menu mobile)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const navEl = document.querySelector('nav');
  if (!burgerBtn || !navEl) return;

  burgerBtn.addEventListener('click', () => {
    const isOpen = navEl.style.display === 'block';
    navEl.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
      navEl.style.position = 'absolute';
      navEl.style.top = '72px';
      navEl.style.left = '0';
      navEl.style.right = '0';
      navEl.style.background = 'var(--cream-soft)';
      navEl.style.padding = '20px 32px';
      navEl.style.borderBottom = '1px solid var(--line)';
      navEl.querySelector('ul').style.flexDirection = 'column';
      navEl.querySelector('ul').style.gap = '16px';
    }
  });
});
