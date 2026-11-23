function extractIslandName(label) {
  const match = String(label || "").match(/^\s*Ilha\s+\d+\s*[-–—]\s*(.+)$/i);

  return match ? match[1].trim() : "";
}

export function getMissionDestinationLabel(mission, { unknownPaths = false } = {}) {
  const destination = mission?.destination;

  if (!destination) return "";
  if (destination.kind !== "island") return destination.label || "";

  const floor = destination.floor ?? destination.floorMin;
  const base = floor ? `Ilha ${floor}` : String(destination.label || "Ilha").split(/\s[-–—]\s/)[0];
  if (unknownPaths) return base;

  const name = destination.islandName || extractIslandName(destination.label);

  return name ? `${base} - ${name}` : (destination.label || base);
}
