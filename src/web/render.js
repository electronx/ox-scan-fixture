// INTENTIONALLY INSECURE TEST FIXTURE — never run.
// DOM XSS sinks
export function renderComment(el, html) {
  el.innerHTML = html;
}
export function legacyBanner(html) {
  document.write(html);
}
