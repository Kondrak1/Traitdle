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
  'vegapunk', 'atlas', 'lilith', 'bonney', 'lucci', 'kaku',
  'silvers rayleigh', 'scopper gaban', 'crocus', 'buggy', 'shanks', 'benn beckman',
  'lucky roux', 'yasopp', 'limejuice', 'bonk punch', 'building snake', 'hongo', 'rockstar',
  'marco', 'jozu', 'vista', 'thatch', 'izo', 'rakuyo', 'namur', 'blamenco', 'fossa', 'curiel',
  'atmos', 'haruta', 'kingdew', 'blenheim', 'whitey bay',
  'katakuri', 'smoothie', 'cracker', 'perospero', 'oven', 'daifuku', 'compote', 'snack',
  'streusen', 'mont dor', 'tamago', 'pekoms', 'bobbin', 'galette',
  'king', 'queen', 'jack', 'who s who', 'sasaki', 'black maria', 'ulti', 'page one',
  'x drake', 'sheepshead', 'ginrummy', 'holdem', 'speed', 'babanuki',
  'shiryu', 'jesus burgess', 'van augur', 'laffitte', 'doc q', 'stronger', 'catarina devon',
  'vasco shot', 'avalo pizarro', 'sanjuan wolf', 'kuzan', 'moria',
  'daz bonez', 'galdino', 'alvida', 'mihawk', 'perona',
  'monkey d dragon', 'sabo', 'emporio ivankov', 'bartholomew kuma', 'koala', 'karasu',
  'morley', 'belo betty', 'lindbergh', 'inazuma', 'hack', 'terry gilteo',
  'monkey d garp', 'sengoku', 'tsuru', 'sakazuki', 'kuzan', 'borsalino', 'issho', 'aramaki',
  'smoker', 'tashigi', 'koby', 'helmeppo', 'hina', 'momonga', 'onigumo', 'doberman',
  'dalmatian', 'stainless', 't bone', 'sentomaru', 'prince grus', 'hibari', 'kujaku',
  'rob lucci', 'kaku', 'stussy', 'kalifa', 'blueno', 'jabura', 'kumadori', 'fukuro',
  'spandam', 'spandine', 'who s who',
  'don krieg', 'gin', 'pearl', 'arlong', 'hatchan', 'kuroobi', 'chew', 'kuro', 'jango',
  'sham', 'buchi', 'mohji', 'cabaji', 'benn beckman',
  'nefertari cobra', 'vivi', 'kaya', 'dalton', 'wapol', 'rebecca', 'kyros', 'leo',
  'shirley', 'fisher tiger', 'jinbe', 'hody jones', 'neptune', 'shirahoshi',
  'imu', 'nerona imu', 'jaygarcia saturn', 'marcus mars', 'topman warcury',
  'shepherd ju peter', 'ethanbaron v nusjuro', 'figarland garling', 'shepherd somers',
  'nami', 'roronoa zoro', 'sanji', 'nico robin', 'franky', 'brook', 'usopp', 'jinbe',
  'tony tony chopper', 'monkey d luffy'
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
