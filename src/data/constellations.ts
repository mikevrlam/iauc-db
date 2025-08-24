const constellations = [
  {
    name: "Andromeda",
    abbr: {
      iau: "And",
      nasa: "Andr",
    },
  },
  {
    name: "Antlia",
    abbr: {
      iau: "Ant",
      nasa: "Antl",
    },
  },
  {
    name: "Apus",
    abbr: {
      iau: "Aps",
      nasa: "Apus",
    },
  },
  {
    name: "Aquarius",
    abbr: {
      iau: "Aqr",
      nasa: "Aqar",
    },
  },
  {
    name: "Aquila",
    abbr: {
      iau: "Aql",
      nasa: "Aqil",
    },
  },
  {
    name: "Ara",
    abbr: {
      iau: "Ara",
      nasa: "Arae",
    },
  },
  {
    name: "Aries",
    abbr: {
      iau: "Ari",
      nasa: "Arie",
    },
  },
  {
    name: "Auriga",
    abbr: {
      iau: "Aur",
      nasa: "Auri",
    },
  },
  {
    name: "Boötes",
    abbr: {
      iau: "Boo",
      nasa: "Boot",
    },
  },
  {
    name: "Caelum",
    abbr: {
      iau: "Cae",
      nasa: "Cael",
    },
  },
  {
    name: "Camelopardalis",
    abbr: {
      iau: "Cam",
      nasa: "Caml",
    },
  },
  {
    name: "Cancer",
    abbr: {
      iau: "Cnc",
      nasa: "Canc",
    },
  },
  {
    name: "Canes Venatici",
    abbr: {
      iau: "CVn",
      nasa: "CVen",
    },
  },
  {
    name: "Canis Major",
    abbr: {
      iau: "CMa",
      nasa: "CMaj",
    },
  },
  {
    name: "Canis Minor",
    abbr: {
      iau: "CMi",
      nasa: "CMin",
    },
  },
  {
    name: "Capricornus",
    abbr: {
      iau: "Cap",
      nasa: "Capr",
    },
  },
  {
    name: "Carina",
    abbr: {
      iau: "Car",
      nasa: "Cari",
    },
  },
  {
    name: "Cassiopeia",
    abbr: {
      iau: "Cas",
      nasa: "Cass",
    },
  },
  {
    name: "Centaurus",
    abbr: {
      iau: "Cen",
      nasa: "Cent",
    },
  },
  {
    name: "Cepheus",
    abbr: {
      iau: "Cep",
      nasa: "Ceph",
    },
  },
  {
    name: "Cetus",
    abbr: {
      iau: "Cet",
      nasa: "Ceti",
    },
  },
  {
    name: "Chamaeleon",
    abbr: {
      iau: "Cha",
      nasa: "Cham",
    },
  },
  {
    name: "Circinus",
    abbr: {
      iau: "Cir",
      nasa: "Circ",
    },
  },
  {
    name: "Columba",
    abbr: {
      iau: "Col",
      nasa: "Colm",
    },
  },
  {
    name: "Coma Berenices",
    abbr: {
      iau: "Com",
      nasa: "Coma",
    },
  },
  {
    name: "Corona Australis",
    abbr: {
      iau: "CrA",
      nasa: "CorA",
    },
  },
  {
    name: "Corona Borealis",
    abbr: {
      iau: "CrB",
      nasa: "CorB",
    },
  },
  {
    name: "Corvus",
    abbr: {
      iau: "Crv",
      nasa: "Corv",
    },
  },
  {
    name: "Crater",
    abbr: {
      iau: "Crt",
      nasa: "Crat",
    },
  },
  {
    name: "Crux",
    abbr: {
      iau: "Cru",
      nasa: "Cruc",
    },
  },
  {
    name: "Cygnus",
    abbr: {
      iau: "Cyg",
      nasa: "Cygn",
    },
  },
  {
    name: "Delphinus",
    abbr: {
      iau: "Del",
      nasa: "Dlph",
    },
  },
  {
    name: "Dorado",
    abbr: {
      iau: "Dor",
      nasa: "Dora",
    },
  },
  {
    name: "Draco",
    abbr: {
      iau: "Dra",
      nasa: "Drac",
    },
  },
  {
    name: "Equuleus",
    abbr: {
      iau: "Equ",
      nasa: "Equl",
    },
  },
  {
    name: "Eridanus",
    abbr: {
      iau: "Eri",
      nasa: "Erid",
    },
  },
  {
    name: "Fornax",
    abbr: {
      iau: "For",
      nasa: "Forn",
    },
  },
  {
    name: "Gemini",
    abbr: {
      iau: "Gem",
      nasa: "Gemi",
    },
  },
  {
    name: "Grus",
    abbr: {
      iau: "Gru",
      nasa: "Grus",
    },
  },
  {
    name: "Hercules",
    abbr: {
      iau: "Her",
      nasa: "Herc",
    },
  },
  {
    name: "Horologium",
    abbr: {
      iau: "Hor",
      nasa: "Horo",
    },
  },
  {
    name: "Hydra",
    abbr: {
      iau: "Hya",
      nasa: "Hyda",
    },
  },
  {
    name: "Hydrus",
    abbr: {
      iau: "Hyi",
      nasa: "Hydi",
    },
  },
  {
    name: "Indus",
    abbr: {
      iau: "Ind",
      nasa: "Indi",
    },
  },
  {
    name: "Lacerta",
    abbr: {
      iau: "Lac",
      nasa: "Lacr",
    },
  },
  {
    name: "Leo",
    abbr: {
      iau: "Leo",
      nasa: "Leon",
    },
  },
  {
    name: "Leo Minor",
    abbr: {
      iau: "LMi",
      nasa: "LMin",
    },
  },
  {
    name: "Lepus",
    abbr: {
      iau: "Lep",
      nasa: "Leps",
    },
  },
  {
    name: "Libra",
    abbr: {
      iau: "Lib",
      nasa: "Libr",
    },
  },
  {
    name: "Lupus",
    abbr: {
      iau: "Lup",
      nasa: "Lupi",
    },
  },
  {
    name: "Lynx",
    abbr: {
      iau: "Lyn",
      nasa: "Lync",
    },
  },
  {
    name: "Lyra",
    abbr: {
      iau: "Lyr",
      nasa: "Lyra",
    },
  },
  {
    name: "Mensa",
    abbr: {
      iau: "Men",
      nasa: "Mens",
    },
  },
  {
    name: "Microscopium",
    abbr: {
      iau: "Mic",
      nasa: "Micr",
    },
  },
  {
    name: "Monoceros",
    abbr: {
      iau: "Mon",
      nasa: "Mono",
    },
  },
  {
    name: "Musca",
    abbr: {
      iau: "Mus",
      nasa: "Musc",
    },
  },
  {
    name: "Norma",
    abbr: {
      iau: "Nor",
      nasa: "Norm",
    },
  },
  {
    name: "Octans",
    abbr: {
      iau: "Oct",
      nasa: "Octn",
    },
  },
  {
    name: "Ophiuchus",
    abbr: {
      iau: "Oph",
      nasa: "Ophi",
    },
  },
  {
    name: "Orion",
    abbr: {
      iau: "Ori",
      nasa: "Orio",
    },
  },
  {
    name: "Pavo",
    abbr: {
      iau: "Pav",
      nasa: "Pavo",
    },
  },
  {
    name: "Pegasus",
    abbr: {
      iau: "Peg",
      nasa: "Pegs",
    },
  },
  {
    name: "Perseus",
    abbr: {
      iau: "Per",
      nasa: "Pers",
    },
  },
  {
    name: "Phoenix",
    abbr: {
      iau: "Phe",
      nasa: "Phoe",
    },
  },
  {
    name: "Pictor",
    abbr: {
      iau: "Pic",
      nasa: "Pict",
    },
  },
  {
    name: "Pisces",
    abbr: {
      iau: "Psc",
      nasa: "Pisc",
    },
  },
  {
    name: "Piscis Austrinus",
    abbr: {
      iau: "PsA",
      nasa: "PscA",
    },
  },
  {
    name: "Puppis",
    abbr: {
      iau: "Pup",
      nasa: "Pupp",
    },
  },
  {
    name: "Pyxis",
    abbr: {
      iau: "Pyx",
      nasa: "Pyxi",
    },
  },
  {
    name: "Reticulum",
    abbr: {
      iau: "Ret",
      nasa: "Reti",
    },
  },
  {
    name: "Sagitta",
    abbr: {
      iau: "Sge",
      nasa: "Sgte",
    },
  },
  {
    name: "Sagittarius",
    abbr: {
      iau: "Sgr",
      nasa: "Sgtr",
    },
  },
  {
    name: "Scorpius",
    abbr: {
      iau: "Sco",
      nasa: "Scor",
    },
  },
  {
    name: "Sculptor",
    abbr: {
      iau: "Scl",
      nasa: "Scul",
    },
  },
  {
    name: "Scutum",
    abbr: {
      iau: "Sct",
      nasa: "Scut",
    },
  },
  {
    name: "Serpens",
    abbr: {
      iau: "Ser",
      nasa: "Serp",
    },
  },
  {
    name: "Sextans",
    abbr: {
      iau: "Sex",
      nasa: "Sext",
    },
  },
  {
    name: "Taurus",
    abbr: {
      iau: "Tau",
      nasa: "Taur",
    },
  },
  {
    name: "Telescopium",
    abbr: {
      iau: "Tel",
      nasa: "Tele",
    },
  },
  {
    name: "Triangulum",
    abbr: {
      iau: "Tri",
      nasa: "Tria",
    },
  },
  {
    name: "Triangulum Australe",
    abbr: {
      iau: "TrA",
      nasa: "TrAu",
    },
  },
  {
    name: "Tucana",
    abbr: {
      iau: "Tuc",
      nasa: "Tucn",
    },
  },
  {
    name: "Ursa Major",
    abbr: {
      iau: "UMa",
      nasa: "UMaj",
    },
  },
  {
    name: "Ursa Minor",
    abbr: {
      iau: "UMi",
      nasa: "UMin",
    },
  },
  {
    name: "Vela",
    abbr: {
      iau: "Vel",
      nasa: "Velr",
    },
  },
  {
    name: "Virgo",
    abbr: {
      iau: "Vir",
      nasa: "Virg",
    },
  },
  {
    name: "Volans",
    abbr: {
      iau: "Vol",
      nasa: "Voln",
    },
  },
  {
    name: "Vulpecula",
    abbr: {
      iau: "Vul",
      nasa: "Vulp",
    },
  },
];

export default constellations;
