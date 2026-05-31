// Runs before React hydration to set correct theme (prevents flash)
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var saved = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = saved || (prefersDark ? 'dark' : 'dark'); // default dark
        document.documentElement.setAttribute('data-theme', theme);
      } catch(e) {}
    })();
  `;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
