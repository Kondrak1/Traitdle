const dailyProgressKey = 'one-piece-traitdle-daily-progress';
const dailyModeLabels = {
  classic: '❓ Classic',
  fruit: '🍇 Devil fruit',
  wanted: '💰 Wanted',
  laugh: '🔊 Laugh'
};
const traitdleShareUrl = 'https://kondrak1.github.io/Traitdle/';
const traitdleWorldUrls = {
  onePiece: `${traitdleShareUrl}one-piece/onepiece.html`,
  tcg: `${traitdleShareUrl}one-piece-tcg/tcg.html`,
  jjk: `${traitdleShareUrl}jjk/jjk.html`,
  pokemon: `${traitdleShareUrl}pokemon/pokemon.html`,
  avatar: `${traitdleShareUrl}avatar/avatar.html`
};
const excludedCharacterNames = new Set([
  'Charlotte Angel',
  'Charlotte Broyé',
  'Charlotte Brûlée',
  'Charlotte Cinnamon',
  'Charlotte Citron',
  'Charlotte Custard',
  'Charlotte Praline',
  'Charlotte Prim',
  'Avalo Pizarro',
  'Bastille',
  'Bluejam',
  'Braham',
  'Brannew',
  'Carmel',
  'Chadros Higelyges [Brownbeard]',
  'Charlotte Snack',
  'Daruma',
  'Duval',
  'Elizabello II',
  'Fukaboshi',
  'Guernika',
  'Higuma',
  'Igaram',
  'Ikaros Much',
  'Ivan X',
  'Kamakiri',
  'Kentauros',
  'Kujaku',
  'Kurozumi Higurashi',
  'Makino',
  'Manboshi',
  'Manjaro',
  'Mashikaku',
  'Masira',
  'Matsuge',
  'Momonga',
  'Rosward Rosward',
  'Saldeath',
  'Shachi',
  'Sham',
  'Shimotsuki Kouzaburou',
  'Shimotsuki Ushimaru',
  'Shuri [Manmayer Gunko]',
  'Shyarly',
  'Spandine',
  'Squard',
  'Suleiman',
  'Uzuki Tempura',
  'Victoria Cindry',
  'Scotch [Yeti Cool Brother]',
  'Prince Grus',
  'Porchemy',
  'Nezumi',
  'Nero',
  'Minister of the Right',
  'Minister of the Left',
  'Kelly Funk',
  'Bobby Funk',
  'Holedem',
  'Genbo',
  'Chimney',
  'Conis',
  'Coribou',
  'Gotti',
  'Hotori',
  'Jigoro',
  'Kotori',
  'Kuroobi',
  'Mohji',
  'Riku Doldo III',
  'Ryuboshi'
]);

function normalizeCharacterName(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function characterNameVariants(value) {
  const name = String(value || '').trim();
  const variants = new Set([normalizeCharacterName(name)]);
  const withoutAliases = name.replace(/\s*[\[(].*?[\])]/g, '').trim();
  if (withoutAliases !== name) variants.add(normalizeCharacterName(withoutAliases));
  for (const match of name.matchAll(/[\[(]([^\])]+)[\])]/g)) {
    variants.add(normalizeCharacterName(match[1]));
  }
  return [...variants].filter(Boolean);
}

function characterNameMatches(character, value) {
  const search = normalizeCharacterName(value);
  return Boolean(search) && characterNameVariants(character.name).some(name => name === search || name.includes(search));
}

function displayCharacterName(character) {
  return String(character.name || '').replace(/\s*[\[(].*?[\])]/g, '').trim();
}

function characterIdentityKey(value) {
  return normalizeCharacterName(String(value || '').replace(/\s*[\[(].*?[\])]/g, ''));
}

function characterIdentitiesMatch(first, second) {
  const secondVariants = new Set(characterNameVariants(second));
  return characterNameVariants(first).some(variant => secondVariants.has(variant));
}

function isAllowedCharacter(character) {
  return character && !excludedCharacterNames.has(character.name);
}

const mountainTimeZone = 'America/Denver';
const dailyResetHour = 18;
const dailyResetOverride = { date: '2026-09-28', revision: 'reset-1' };
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
  const gameDate = Number(parts.hour) < dailyResetHour ? new Date(localDate - 24 * 60 * 60 * 1000) : new Date(localDate);
  const dateKey = gameDate.toISOString().slice(0, 10);
  return dateKey === dailyResetOverride.date ? `${dateKey}-${dailyResetOverride.revision}` : dateKey;
}

function getDailyResetTimestamp(now = new Date()) {
  const parts = getMountainDateTimeParts(now);
  const localDate = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const resetDate = Number(parts.hour) >= dailyResetHour ? localDate + 24 * 60 * 60 * 1000 : localDate;
  const resetLocalAsUtc = new Date(resetDate + dailyResetHour * 60 * 60 * 1000);
  return resetLocalAsUtc.getTime() - getMountainOffsetMinutes(resetLocalAsUtc) * 60 * 1000;
}

function readDailyProgress() {
  const today = getMstDateKey();
  try {
    const saved = JSON.parse(localStorage.getItem(dailyProgressKey) || '{}');
    return saved.date === today ? saved : { date: today, classic: null, fruit: null, wanted: null, laugh: null };
  } catch (error) {
    return { date: today, classic: null, fruit: null, wanted: null, laugh: null };
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
  const modeStorageKeys = {
    classic: 'one-piece-traitdle-daily-guesses',
    fruit: 'one-piece-traitdle-daily-guesses',
    wanted: 'one-piece-traitdle-daily-guesses',
    laugh: 'one-piece-laughdle-daily-guesses'
  };
  return ['classic', 'fruit', 'wanted', 'laugh'].every(mode => {
    if (Number.isFinite(progress[mode])) return true;
    const storageKey = modeStorageKeys[mode];
    return Boolean(storageKey && readDailyGameState(storageKey, mode).over);
  });
}

function appendShareLink(text, url = traitdleShareUrl) {
  return `${text}\n${url}`;
}

function formatDailyScore(progress) {
  return appendShareLink([
    `I've completed all the modes of #OnePiece Traitdle today:`,
    `${dailyModeLabels.classic}: ${progress.classic ?? '-'}`,
    `${dailyModeLabels.fruit}: ${progress.fruit ?? '-'}`,
    `${dailyModeLabels.wanted}: ${progress.wanted ?? '-'}`,
    `${dailyModeLabels.laugh}: ${progress.laugh ?? '-'}`
  ].join('\n'), traitdleWorldUrls.onePiece);
}

function updateDailyResetTimer(element) {
  if (!element) return;
  const remaining = Math.max(0, getDailyResetTimestamp() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  element.textContent = `Next daily reset at 6:00pm in ${hours}:${minutes}:${seconds}`;
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
  button.onclick = async () => {
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
  };
}
