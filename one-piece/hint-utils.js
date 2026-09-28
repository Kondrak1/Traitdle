const firstAppearanceEpisodeMap = [
  [1, 1], [100, 53], [200, 126], [300, 193], [400, 284],
  [500, 386], [600, 516], [700, 640], [800, 746], [900, 865],
  [1000, 1020], [1100, 1120], [1200, 1220]
];

function estimateFirstAppearanceEpisode(chapter) {
  if (!Number.isFinite(chapter)) return null;
  for (let index = 1; index < firstAppearanceEpisodeMap.length; index++) {
    const [nextChapter, nextEpisode] = firstAppearanceEpisodeMap[index];
    const [previousChapter, previousEpisode] = firstAppearanceEpisodeMap[index - 1];
    if (chapter <= nextChapter) {
      const progress = (chapter - previousChapter) / (nextChapter - previousChapter);
      return Math.max(1, Math.round(previousEpisode + progress * (nextEpisode - previousEpisode)));
    }
  }
  return Math.round(chapter * 1.02);
}

function firstAppearanceHint(character) {
  const raw = character.first_appearance_arc || '';
  const chapterMatch = String(raw).match(/Chapter\s+(\d+)/i);
  const chapter = Number(character.firstAppearanceChapter || (chapterMatch ? chapterMatch[1] : 0));
  if (!chapter) return 'First appearance: unavailable in the archive.';
  const episode = estimateFirstAppearanceEpisode(chapter);
  return `First appeared: Chapter ${chapter} / Episode ${episode}.`;
}

function affiliationHint(character) {
  return `Affiliation: ${character.affiliation || 'Unknown in the archive'}.`;
}

function appendHintMessage(container, text) {
  const line = document.createElement('span');
  line.textContent = text;
  container.append(line);
}
