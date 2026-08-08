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

  const tacticalCellTypes = [
    "wall", "floor", "party", "enemy", "hidden", "trap", "pit", "web",
    "difficult", "mechanism", "objective", "door", "advantage", "obstacle", "reinforcement"
  ];
  tacticalCellTypes.forEach((cell) => {
    const color = theme.tacticalColors?.[cell];
    if (color) root.style.setProperty(`--tactical-${cell}`, color);
    else root.style.removeProperty(`--tactical-${cell}`);
  });

  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme.header);
}
