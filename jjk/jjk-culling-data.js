const jjkCullingGameCharacters = [
  { name: 'Kenjaku', gender: 'Male', age: 1000, power: 'Cursed Spirit Manipulation', type: 'Curse User', firstArc: 'Culling Game', affiliation: 'Culling Game', status: 'Alive', image: 'assets/characters/kenjaku.jpg' },
  { name: 'Hajime Kashimo', gender: 'Male', age: 400, power: 'Mythical Beast Amber', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Culling Game', status: 'Deceased', image: 'assets/characters/hajime-kashimo.jpg' },
  { name: 'Kinji Hakari', gender: 'Male', age: 18, power: 'Idle Death Gamble', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Tokyo Jujutsu High', status: 'Alive', image: 'assets/characters/kinji-hakari.jpg' },
  { name: 'Kirara Hoshi', gender: 'Unknown', age: 18, power: 'Love Rendezvous', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Tokyo Jujutsu High', status: 'Alive', image: 'assets/characters/kirara-hoshi.jpg' },
  { name: 'Fumihiko Takaba', gender: 'Male', age: 35, power: 'Comedian', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Culling Game', status: 'Alive', image: 'assets/characters/fumihiko-takaba.jpg' },
  { name: 'Hiromi Higuruma', gender: 'Male', age: 36, power: 'Deadly Sentencing', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Culling Game', status: 'Deceased', image: 'assets/characters/hiromi-higuruma.jpg' },
  { name: 'Hana Kurusu', gender: 'Female', age: 17, power: 'Technique Extinguishment', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Tokyo Jujutsu High', status: 'Alive', image: 'assets/characters/hana-kurusu.jpg' },
  { name: 'Angel', gender: 'Female', age: 1000, power: 'Technique Extinguishment', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Culling Game', status: 'Alive', image: 'assets/characters/angel.jpg' },
  { name: 'Ryu Ishigori', gender: 'Male', age: 400, power: 'Cursed Energy Discharge', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Sendai Colony', status: 'Deceased', image: 'assets/characters/ryu-ishigori.jpg' },
  { name: 'Yorozu', gender: 'Female', age: 1000, power: 'Construction', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Culling Game', status: 'Deceased', image: 'assets/characters/yorozu.jpg' },
  { name: 'Reggie Star', gender: 'Male', age: 400, power: 'Contractual Re-Creation', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Tokyo Colony No. 1', status: 'Deceased', image: 'assets/characters/reggie-star.jpg' },
  { name: 'Charles Bernard', gender: 'Male', age: 20, power: 'G Warstaff', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Tokyo Colony No. 1', status: 'Deceased', image: 'assets/characters/charles-bernard.jpg' },
  { name: 'Haba', gender: 'Male', age: 30, power: 'Helicopter', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Tokyo Colony No. 1', status: 'Deceased', image: 'assets/characters/haba.jpg' },
  { name: 'Hanyu', gender: 'Female', age: 30, power: 'Jet', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Tokyo Colony No. 1', status: 'Deceased', image: 'assets/characters/hanyu.jpg' },
  { name: 'Naoya Zenin', gender: 'Male', age: 27, power: 'Projection Sorcery', type: 'Curse User', firstArc: 'Culling Game', affiliation: 'Zenin Clan', status: 'Deceased', image: 'assets/characters/naoya-zenin.jpg' },
  { name: 'Naobito Zenin', gender: 'Male', age: 71, power: 'Projection Sorcery', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Zenin Clan', status: 'Deceased', image: 'assets/characters/naobito-zenin.jpg' },
  { name: 'Ogi Zenin', gender: 'Male', age: 54, power: 'Heavenly Restriction', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Zenin Clan', status: 'Deceased', image: 'assets/characters/ogi-zenin.jpg' },
  { name: 'Jinichi Zenin', gender: 'Male', age: 40, power: 'Cursed Energy', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Zenin Clan', status: 'Deceased', image: 'assets/characters/jinichi-zenin.jpg' },
  { name: 'Ranta Zenin', gender: 'Male', age: 20, power: 'Cursed Energy', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Zenin Clan', status: 'Deceased', image: 'assets/characters/ranta-zenin.jpg' },
  { name: 'Miyo Rokujyuushi', gender: 'Male', age: 40, power: 'Simple Domain', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Sakurajima Colony', status: 'Alive', image: 'assets/characters/miyo-rokujuushi.jpg' },
  { name: 'Miguel Oduol', gender: 'Male', age: 30, power: 'Black Rope', type: 'Curse User', firstArc: 'Culling Game', affiliation: 'Independent', status: 'Alive', image: 'assets/characters/miguel-oduol.jpg' },
  { name: 'Manami Suda', gender: 'Female', age: 30, power: 'Curse User', type: 'Curse User', firstArc: 'Culling Game', affiliation: 'Curse User Alliance', status: 'Alive', image: 'assets/characters/manami-suda.jpg' },
  { name: 'Toshihisa Negi', gender: 'Male', age: 30, power: 'Curse User', type: 'Curse User', firstArc: 'Culling Game', affiliation: 'Curse User Alliance', status: 'Alive', image: 'assets/characters/toshihisa-negi.jpg' },
  { name: 'Ui Ui', gender: 'Male', age: 11, power: 'Solitary Forbidden Area', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Jujutsu Sorcerers', status: 'Alive', image: 'assets/characters/ui-ui.jpg' },
  { name: 'Yuki Tsukumo', gender: 'Female', age: 28, power: 'Star Rage', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Jujutsu High', status: 'Deceased', image: 'assets/characters/yuki-tsukumo.jpg' },
  { name: 'Arata Nitta', gender: 'Male', age: 17, power: 'Pain Killer', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Kyoto Jujutsu High', status: 'Alive', image: 'assets/characters/arata-nitta.jpg' },
  { name: 'Riko Amanai', gender: 'Female', age: 14, power: 'Star Plasma Vessel', type: 'Civilian', firstArc: 'Hidden Inventory', affiliation: 'Jujutsu High', status: 'Deceased', image: 'assets/characters/riko-amanai.jpg' },
  { name: 'Misato Kuroi', gender: 'Female', age: 31, power: 'Caretaker', type: 'Civilian', firstArc: 'Hidden Inventory', affiliation: 'Star Plasma Vessel Association', status: 'Alive', image: 'assets/characters/misato-kuroi.jpg' },
  { name: 'Haruta Shigemo', gender: 'Male', age: 18, power: 'Miracles', type: 'Curse User', firstArc: 'Culling Game', affiliation: 'Curse User Alliance', status: 'Deceased', image: 'assets/characters/haruta-shigemo.jpg' },
  { name: 'Eso', gender: 'Male', age: 0, power: 'Rot Technique', type: 'Death Painting', firstArc: 'Death Painting', affiliation: 'Death Painting Wombs', status: 'Deceased', image: 'assets/characters/eso.jpg' },
  { name: 'Kechizu', gender: 'Male', age: 0, power: 'Rot Technique', type: 'Death Painting', firstArc: 'Death Painting', affiliation: 'Death Painting Wombs', status: 'Deceased', image: 'assets/characters/kechizu.jpg' },
  { name: 'Finger Bearer', gender: 'Unknown', age: 0, power: 'Cursed Energy', type: 'Cursed Spirit', firstArc: 'Fearsome Womb', affiliation: 'Cursed Spirit', status: 'Deceased', image: 'assets/characters/finger-bearer.jpg' },
  { name: 'Tengen', gender: 'Unknown', age: 1000, power: 'Immortality', type: 'Cursed Object', firstArc: 'Culling Game', affiliation: 'Jujutsu High', status: 'Alive', image: 'assets/characters/tengen.jpg' },
  { name: 'Dhruv Lakdawalla', gender: 'Male', age: 400, power: 'Shikigami', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Sendai Colony', status: 'Deceased', image: 'assets/characters/dhruv-lakdawalla.jpg' },
  { name: 'Kurourushi', gender: 'Unknown', age: 0, power: 'Cursed Cockroach', type: 'Cursed Spirit', firstArc: 'Culling Game', affiliation: 'Sendai Colony', status: 'Deceased', image: 'assets/characters/kurourushi.jpg' },
  { name: 'Takako Uro', gender: 'Female', age: 400, power: 'Sky Manipulation', type: 'Sorcerer', firstArc: 'Culling Game', affiliation: 'Sendai Colony', status: 'Alive', image: 'assets/characters/takako-uro.jpg' }
];
jjkCullingGameCharacters.forEach(character => { character.hairColor = ({'Yuji Itadori':'Pink','Megumi Fushiguro':'Black','Nobara Kugisaki':'Orange','Satoru Gojo':'White','Maki Zenin':'Green','Toge Inumaki':'White','Panda':'Black','Yuta Okkotsu':'Black','Kento Nanami':'Blond','Aoi Todo':'Black','Mai Zenin':'Black','Noritoshi Kamo':'Black','Kasumi Miwa':'Blue','Momo Nishimiya':'Orange','Mechamaru':'Black','Shoko Ieiri':'Brown','Suguru Geto':'Black','Toji Fushiguro':'Black','Masamichi Yaga':'Black','Utahime Iori':'Black','Choso':'Black and red','Mahito':'Blue-gray','Jogo':'Red','Hanami':'Green','Dagon':'Blue','Ryomen Sukuna':'Pink','Uraume':'White','Kenjaku':'Black','Hajime Kashimo':'White','Kinji Hakari':'Black','Kirara Hoshi':'Pink','Fumihiko Takaba':'Black','Hiromi Higuruma':'Black','Hana Kurusu':'Brown','Yorozu':'Black','Hanyu':'Black','Ranta Zenin':'Black','Manami Suda':'Black','Tengen':'White'}[character.name] || 'Black'); });

jjkCullingGameCharacters.forEach(character => {
  const existing = jjkCharacters.find(entry => entry.name === character.name);
  if (existing) Object.assign(existing, character);
  else jjkCharacters.push(character);
});

jjkCharacters.forEach(character => {
  if (!character.hairColor) character.hairColor = 'Black';
});
