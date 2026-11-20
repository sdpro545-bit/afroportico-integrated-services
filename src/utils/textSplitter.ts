/**
 * Custom line-splitting utility for Apple.com-style masked line reveals.
 * Splits text into lines based on computed client offsets, wrapping each
 * line in an overflow:hidden container and an inner animated span.
 */

export interface SplitLinesResult {
  lines: HTMLElement[];
  revert: () => void;
}

export function splitLines(element: HTMLElement): SplitLinesResult {
  if (typeof window === "undefined" || !element) {
    return { lines: [], revert: () => {} };
  }

  // Preserve original HTML for full restoration on cleanup
  const originalHTML = element.innerHTML;
  const rawText = element.innerText.trim();

  if (!rawText) {
    return { lines: [], revert: () => {} };
  }

  // Split into words and temporarily wrap each to determine line breaks
  const words = rawText.split(/\s+/);
  element.innerHTML = words
    .map(
      (w) =>
        `<span class="temp-split-word" style="display:inline-block;white-space:nowrap;">${w}</span>`
    )
    .join(" ");

  const wordSpans = Array.from(
    element.querySelectorAll(".temp-split-word")
  ) as HTMLElement[];

  if (wordSpans.length === 0) {
    element.innerHTML = originalHTML;
    return { lines: [], revert: () => {} };
  }

  // Group words into lines by measuring their client top offset
  const linesMap: Map<number, string[]> = new Map();
  wordSpans.forEach((span) => {
    // Round to avoid subpixel jitter
    const top = Math.round(span.getBoundingClientRect().top);
    if (!linesMap.has(top)) {
      linesMap.set(top, []);
    }
    linesMap.get(top)!.push(span.innerText);
  });

  // Clear temporary spans and construct masked line containers
  element.innerHTML = "";
  const lineInners: HTMLElement[] = [];

  linesMap.forEach((wordsInLine) => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    mask.style.display = "block";
    mask.style.overflow = "hidden";
    mask.style.lineHeight = "inherit";

    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.style.display = "block";
    inner.style.willChange = "transform";
    inner.textContent = wordsInLine.join(" ");

    mask.appendChild(inner);
    element.appendChild(mask);
    lineInners.push(inner);
  });

  return {
    lines: lineInners,
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}
