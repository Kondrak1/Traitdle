const tcgSetSources = [
  'EB01', 'EB02', 'EB03', 'EB04',
  'OP01', 'OP02', 'OP03', 'OP04', 'OP05', 'OP06', 'OP07', 'OP08', 'OP09', 'OP10', 'OP11', 'OP12', 'OP13', 'OP14', 'OP15', 'OP16', 'OP17',
  'PRB01', 'PRB02'
];

const tcgSetReleaseData = {
  OP01: { releaseDate: '2022-12-02', releaseOrder: 1 },
  OP02: { releaseDate: '2023-03-10', releaseOrder: 2 },
  OP03: { releaseDate: '2023-06-30', releaseOrder: 3 },
  OP04: { releaseDate: '2023-09-22', releaseOrder: 4 },
  OP05: { releaseDate: '2023-12-08', releaseOrder: 5 },
  OP06: { releaseDate: '2024-03-15', releaseOrder: 6 },
  EB01: { releaseDate: '2024-05-03', releaseOrder: 7 },
  OP07: { releaseDate: '2024-06-28', releaseOrder: 8 },
  OP08: { releaseDate: '2024-09-13', releaseOrder: 9 },
  PRB01: { releaseDate: '2024-11-08', releaseOrder: 10 },
  OP09: { releaseDate: '2024-12-13', releaseOrder: 11 },
  OP10: { releaseDate: '2025-03-21', releaseOrder: 12 },
  EB02: { releaseDate: '2025-05-09', releaseOrder: 13 },
  OP11: { releaseDate: '2025-06-06', releaseOrder: 14 },
  OP12: { releaseDate: '2025-08-22', releaseOrder: 15 },
  PRB02: { releaseDate: '2025-10-03', releaseOrder: 16 },
  OP13: { releaseDate: '2025-11-07', releaseOrder: 17 },
  OP14: { releaseDate: '2026-01-16', releaseOrder: 18 },
  EB04: { releaseDate: '2026-01-16', releaseOrder: 19 },
  EB03: { releaseDate: '2026-02-20', releaseOrder: 20 },
  OP15: { releaseDate: '2026-04-03', releaseOrder: 21 },
  OP16: { releaseDate: '2026-06-12', releaseOrder: 22 },
  OP17: { releaseDate: '2026-08-28', releaseOrder: 23 }
};

const tcgFemaleNameParts = [
  'Boa.Hancock', 'Bonney', 'Catarina.Devon', 'Charlotte.Amande', 'Charlotte.Brûlée', 'Charlotte.Galette',
  'Charlotte.Pudding', 'Conis', 'Curly.Dadan', 'Hiyori', 'Jewelry', 'Kaya', 'Koala', 'Kozuki.Toki',
  'Kikunojo', 'Makino', 'Marguerite', 'Miss.All.Sunday', 'Miss.Doublefinger', 'Miss.Goldenweek',
  'Miss.Merry.Christmas', 'Miss.Valentine', 'Nami', 'Nefeltari.Vivi', 'Nico.Robin', 'Perona',
  'Rebecca', 'Reiju', 'Shirahoshi', 'Stussy', 'Sugar', 'Tashigi', 'Ulti', 'Uta', 'Viola', 'Yamato',
  'Vinsmoke.Sora', 'Vinsmoke.Reiju'
];

function tcgGender(card) {
  if (card.cardClass !== 'CHARACTER') return 'Unknown';
  if (card.name.includes(' & ')) return 'Mixed';
  if (tcgFemaleNameParts.some(part => card.name.toLowerCase().includes(part.toLowerCase()))) return 'Female';
  return 'Male';
}

async function loadTcgCards() {
  const sets = await Promise.all(tcgSetSources.map(async code => {
    const response = await fetch(`https://raw.githubusercontent.com/hugoprudente/optcgjson/main/output/${code}.json`);
    if (!response.ok) throw new Error(`Could not load ${code}`);
    return response.json();
  }));

  const cards = sets.flatMap(set => {
    if (['PRB01', 'PRB02'].includes(set.data.code)) return [];
    return set.data.cards
    .filter(card => ['SR', 'SEC'].includes(card.rarity) && ['2', '3', '4', '5', 'X'].includes(String(card.blockIcon)) && !card.isParallel && !/_r\d+$/i.test(card.id))
    .map(card => ({
      id: card.id,
      name: card.name.replace(/\./g, ' '),
      gender: tcgGender(card),
      cost: card.cost || 'N/A',
      colour: card.color?.join(' / ') || 'N/A',
      attribute: card.attribute?.join(' / ') || 'N/A',
      releaseSet: set.data.code,
      rarity: card.rarity,
      block: String(card.blockIcon),
      image: `assets/cards/${card.id}.png`,
      cardClass: card.cardClass
    }));
  });

  return cards.sort((left, right) => left.id.localeCompare(right.id));
}
