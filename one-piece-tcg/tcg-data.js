const tcgSetSources = [
  'EB01', 'EB02', 'EB03', 'EB04',
  'OP01', 'OP02', 'OP03', 'OP04', 'OP05', 'OP06', 'OP07', 'OP08', 'OP09', 'OP10', 'OP11', 'OP12', 'OP13', 'OP14', 'OP15', 'OP16', 'OP17',
  'PRB01', 'PRB02'
];

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

  const cards = sets.flatMap(set => set.data.cards
    .filter(card => ['SR', 'SEC'].includes(card.rarity) && ['2', '3', '4', '5', 'X'].includes(String(card.blockIcon)) && !card.isParallel)
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
      image: `https://images.weserv.nl/?url=en.onepiece-cardgame.com/images/cardlist/card/${card.id}.png`,
      cardClass: card.cardClass
    })));

  return cards.sort((left, right) => left.id.localeCompare(right.id));
}
