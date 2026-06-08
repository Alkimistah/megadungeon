export { FLOOR_PROFILES as FLOOR_RANGES, getFloorProfile as getFloorRange } from "./floorProfiles/index.js";

export function applyTheme(theme) {
  const root = document.documentElement;
  const themeVariables = {
    "--page": theme.page,
    "--header": theme.header,
    "--header-border": theme.headerBorder,
    "--surface": theme.surface,
    "--surface-alt": theme.surfaceAlt,
    "--panel": theme.panel,
    "--border": theme.border,
    "--border-soft": theme.borderSoft,
    "--action": theme.action,
    "--action-hover": theme.actionHover,
    "--scrollbar-track": theme.scrollbarTrack,
    "--scrollbar-thumb": theme.scrollbarThumb,
    "--map-glow": theme.mapGlow
  };

  Object.entries(themeVariables).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });

  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme.header);
}
