const SESSION_PREFIX = "MD1.";

function encodeBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

function decodeBase64Url(text) {
  const padded = text.replaceAll("-", "+").replaceAll("_", "/").padEnd(
    Math.ceil(text.length / 4) * 4,
    "="
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

export function isSessionCode(value) {
  return value.trim().startsWith(SESSION_PREFIX);
}

export function encodeSessionCode(session) {
  return `${SESSION_PREFIX}${encodeBase64Url(JSON.stringify(session))}`;
}

export function decodeSessionCode(code) {
  const trimmed = code.trim();

  if (!isSessionCode(trimmed)) {
    throw new Error("Código de sessão inválido.");
  }

  return JSON.parse(decodeBase64Url(trimmed.slice(SESSION_PREFIX.length)));
}
