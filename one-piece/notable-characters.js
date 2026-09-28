const notableCharacterNames = new Set([
  'monkey d luffy', 'roronoa zoro', 'nami', 'usopp', 'sanji', 'tony tony chopper',
  'nico robin', 'franky', 'brook', 'jinbe', 'nefertari vivi', 'karoo',
  'portgas d ace', 'sabo', 'shanks', 'marshall d teach', 'edward newgate',
  'charlotte linlin', 'kaido', 'big mom', 'buggy', 'dracule mihawk',
  'boa hancock', 'silvers rayleigh', 'gol d roger', 'rocks d xebec',
  'donquixote rosinante', 'donquixote doflamingo', 'trafalgar d water law',
  'eustass kid', 'killer', 'x drake', 'scratchmen apoo', 'basil hawkins',
  'capone bege', 'jewelry bonney', 'uroge', 'bartolomeo', 'cavendish',
  'boichi', 'yamato', 'momotaro', 'kozuki momonosuke', 'kozuki oden',
  'kin emon', 'raizo', 'kiku', 'ashura doji', 'nekomamushi', 'inuarashi',
  'marco', 'jozu', 'vista', 'izou', 'thatch', 'denjiro', 'katakuri',
  'smoothie', 'cracker', 'perospero', 'king', 'queen', 'jack', 'ulti',
  'page one', 'who s who', 'black maria', 'kaidou', 'gecko moria', 'perona',
  'crocodile', 'bon clay', 'bentham', 'daz bonez', 'galdino', 'mr 3',
  'rob lucci', 'kaku', 'kalifa', 'blueno', 'spandam', 'caesar clown',
  'monet', 'vergo', 'bellamy', 'senor pink', 'trebol', 'diamante', 'pica',
  'magellan', 'shiryu', 'kuma', 'bartholomew kuma', 'emporio ivankov',
  'monkey d dragon', 'koala', 'karasu', 'morley', 'belo betty',
  'monkey d garp', 'sengoku', 'koby', 'smoker', 'tashigi', 'hina',
  'sakazuki', 'akainu', 'kuzan', 'aokiji', 'borsalino', 'kizaru',
  'issho', 'fujitora', 'aramaki', 'ryokugyu', 'tsuru', 'momonga',
  'enel', 'wyper', 'vinsmoke judge', 'vinsmoke reiju', 'vinsmoke sanji',
  'vinsmoke ichiji', 'vinsmoke niji', 'vinsmoke yonji', 'rebecca', 'leo',
  'fisher tiger', 'shirahoshi', 'neptune', 'hody jones', 'arlong',
  'wiper', 'wapol', 'dalton', 'dr kureha', 'dr hiluluk', 'foxy',
  'fukuro', 'vivi', 'carrot', 'pedro', 'morgans', 'stussy', 'sentomaru',
  'vegapunk', 'atlas', 'lilith', 'bonney', 'lucci', 'kaku'
].map(name => name.replace(/[^a-z0-9]+/g, ' ').trim()));

function notableNameKey(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/\s*\[.*?\]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function isNotableCharacter(character) {
  const key = notableNameKey(character.name);
  const bounty = Number(String(character.bounty || '').replace(/[^0-9]/g, '')) || 0;
  return notableCharacterNames.has(key) || bounty >= 1000000000;
}
