export function goToSection(id: string, extraOffset = 0) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 64 + extraOffset
  window.scrollTo({ top, behavior: document.body.classList.contains('motion-min') ? 'auto' : 'smooth' })
}
