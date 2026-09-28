const dailyProgressKey = 'one-piece-traitdle-daily-progress';
const dailyModeLabels = {
  classic: '❓ Classic',
  fruit: '🍇 Devil fruit',
  wanted: '💰 Wanted'
};

const mountainTimeZone = 'America/Denver';
const mountainDateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: mountainTimeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hourCycle: 'h23',
  timeZoneName: 'shortOffset'
});

function getMountainDateTimeParts(date) {
  return Object.fromEntries(mountainDateTimeFormatter.formatToParts(date).filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
}

function getMountainOffsetMinutes(date) {
  const offset = getMountainDateTimeParts(date).timeZoneName;
  if (offset === 'GMT') return 0;
  const match = offset.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3] || 0);
  return match[1] === '+' ? minutes : -minutes;
}

function getMstDateKey(date = new Date()) {
  const parts = getMountainDateTimeParts(date);
  const localDate = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const gameDate = Number(parts.hour) < 22 ? new Date(localDate - 24 * 60 * 60 * 1000) : new Date(localDate);
  return gameDate.toISOString().slice(0, 10);
}

function getDailyResetTimestamp(now = new Date()) {
  const parts = getMountainDateTimeParts(now);
  const localDate = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const resetDate = Number(parts.hour) >= 22 ? localDate + 24 * 60 * 60 * 1000 : localDate;
  const resetLocalAsUtc = new Date(resetDate + 22 * 60 * 60 * 1000);
  return resetLocalAsUtc.getTime() - getMountainOffsetMinutes(resetLocalAsUtc) * 60 * 1000;
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

function readDailyGameState(storageKey, mode) {
  const date = getMstDateKey();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const state = saved.date === date ? saved.modes?.[mode] : null;
    return {
      guesses: Array.isArray(state?.guesses) ? state.guesses : [],
      over: state?.over === true
    };
  } catch (error) {
    return { guesses: [], over: false };
  }
}

function saveDailyGameState(storageKey, mode, guesses, over) {
  const date = getMstDateKey();
  let saved = { date, modes: {} };
  try {
    const existing = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (existing.date === date && existing.modes) saved = existing;
  } catch (error) {
    // Start a clean record when local storage contains invalid data.
  }
  saved.modes[mode] = { guesses: [...guesses], over: Boolean(over) };
  localStorage.setItem(storageKey, JSON.stringify(saved));
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
  let dateKey = getMstDateKey();
  updateDailyResetTimer(element);
  return window.setInterval(() => {
    const currentDateKey = getMstDateKey();
    if (currentDateKey !== dateKey) {
      window.location.reload();
      return;
    }
    updateDailyResetTimer(element);
  }, 1000);
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
