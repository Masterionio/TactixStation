// HTTPS Redirect Script (to be included early in your main frontend JS or in an Express.js backend)

// Frontend version — add this in your main JS entry point or inside a <script> tag in your index.html:
if (window.location.protocol !== 'https:') {
  window.location.href = 'https://' + window.location.host + window.location.pathname + window.location.search;
}
