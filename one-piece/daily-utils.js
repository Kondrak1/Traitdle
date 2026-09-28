const dailyProgressKey = 'one-piece-traitdle-daily-progress';
const dailyModeLabels = {
  classic: '❓ Classic',
  fruit: '🍇 Devil fruit',
  wanted: '💰 Wanted'
};

function getMstDateKey(date = new Date()) {
  return new Date(date.getTime() - 29 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function getDailyResetTimestamp() {
  const resetDay = new Date(Date.now() - 29 * 60 * 60 * 1000);
  return Date.UTC(resetDay.getUTCFullYear(), resetDay.getUTCMonth(), resetDay.getUTCDate() + 1) + 29 * 60 * 60 * 1000;
}

function readDailyProgress() {
  const today = getMstDateKey();
  try {
    const saved = JSON.parse(localStorage.getItem(dailyProgressKey) || '{}');
    return saved.date === today ? saved : { date: today, classic: null, fruit: null, wanted: null };
  } catch (error) {
    return { date: today, classic: null, fruit: null, wanted: null };
  }
}

function saveDailyScore(mode, score) {
  const progress = readDailyProgress();
  progress[mode] = score;
  localStorage.setItem(dailyProgressKey, JSON.stringify(progress));
  return progress;
}

function dailyProgressComplete(progress) {
  return ['classic', 'fruit', 'wanted'].every(mode => Number.isFinite(progress[mode]));
}

function formatDailyScore(progress) {
  return [
    `I've completed all the modes of #OnePiece Traitdle today:`,
    `${dailyModeLabels.classic}: ${progress.classic ?? '-'}`,
    `${dailyModeLabels.fruit}: ${progress.fruit ?? '-'}`,
    `${dailyModeLabels.wanted}: ${progress.wanted ?? '-'}`
  ].join('\n');
}

function updateDailyResetTimer(element) {
  if (!element) return;
  const remaining = Math.max(0, getDailyResetTimestamp() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  element.textContent = `Next daily reset at 10:00pm in ${hours}:${minutes}:${seconds}`;
}

function startDailyResetTimer(element) {
  updateDailyResetTimer(element);
  return window.setInterval(() => updateDailyResetTimer(element), 1000);
}

function enableCopyButton(button, text) {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const fallback = document.createElement('textarea');
      fallback.value = text;
      document.body.append(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    }
    button.textContent = 'Copied';
  });
}
