//=============== Program na prevod cisla do jednotlivych ciselnych sustav ===============



//=============== Funkcia hlavna ===============
function main(dtoIn) {
  //==== najčastejšie mužské mená v ČR ====
  const fnMale = [
    "Jan","Jiří","Josef","Petr","Pavel","Martin","Tomáš","Jaroslav","Miroslav","Zdeněk",
    "Václav","Michal","František","Karel","Lukáš","David","Ondřej","Radek","Roman","Marek",
    "Aleš","Daniel","Filip","Adam","Matěj","Dominik","Patrik","Jakub","Stanislav","Vojtěch",
    "Oldřich","Rostislav","Hynek","Libor","Bohumil","Miloš","Igor","Denis","Vilém","Eduard",
    "Leoš","Oto","Richard","Radim","Luboš","Erik","Sebastián","Tobiáš","Kryštof","Samuel"
  ];

  //==== najčastejšie ženské mená v ČR ====
  const fnFemale = [
    "Jana","Marie","Eva","Hana","Anna","Lenka","Kateřina","Alena","Petra","Lucie",
    "Jaroslava","Věra","Martina","Jitka","Veronika","Monika","Zuzana","Michaela","Markéta","Tereza",
    "Barbora","Simona","Ivana","Radka","Dagmar","Blanka","Olga","Pavla","Soňa","Renata",
    "Gabriela","Kristýna","Karolína","Eliška","Adéla","Klára","Dominika","Patricie","Amálie","Julie",
    "Nela","Emilie","Sofie","Valerie","Laura","Nikola","Denisa","Tamara","Milena","Ludmila"
  ];

  //==== najčastejšie mužské priezviská v ČR ====
  const snMale = [
    "Novák","Svoboda","Novotný","Dvořák","Černý","Kučera","Veselý","Horák","Němec","Marek",
    "Pokorný","Pospíšil","Hájek","Jelínek","Král","Růžička","Beneš","Fiala","Sedláček","Doležal",
    "Zeman","Kolář","Navrátil","Čermák","Vaněk","Urban","Blažek","Kříž","Kopecký","Mareš",
    "Štěpánek","Vacek","Moravec","Pavlík","Kovář","Krejčí","Konečný","Šimek","Dvořáček",
    "Kozák","Fousek","Vlček","Čech","Polák","Musil","Štěpán","Janda","Píša","Václavík"
  ];

  //==== najčastejšie ženské priezviská v ČR ====
  const snFemale = [
    "Nováková","Svobodová","Novotná","Dvořáková","Černá","Kučerová","Veselá","Horáková","Němcová","Marková",
    "Pokorná","Pospíšilová","Hájková","Jelínková","Králová","Růžičková","Benešová","Fialová","Sedláčková","Doležalová",
    "Zemanová","Kolářová","Navrátilová","Čermáková","Vaňková","Urbanová","Blažková","Křížová","Kopecká","Marešová",
    "Štěpánková","Vacková","Moravcová","Pavlíková","Kovářová","Krejčíová","Konečná","Šimková","Dvořáčková",
    "Kozáková","Fousková","Vlčková","Čechová","Poláková","Musilová","Štěpánová","Jandová","Píšová","Václavíková"
  ];

	//==== pohlavia a pracovné úvazky  ====
  const genders = ["male", "female"];
  const workloads = [10, 20, 30, 40];

	//==== vyber náhodný prvok pola ====
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

	//==== vyber náhodného čísla z intervalu -> Math.random()  +1 k hornej hranici(>= max) + zaokruhlenie nadol ====
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
	
	//==== vyber vek a vypočítaj dátum narodenia(zohladnit pocet dni v mesiaci) ====
  function generateBirthdate(ageMin, ageMax) {
    const age = getRandomInt(ageMin, ageMax);
    const now = new Date();
    const year = now.getFullYear() - age;
    const month = getRandomInt(0, 11);
    const maxDay = new Date(year, month + 1, 0).getDate();
	const day = getRandomInt(1, maxDay);

    return new Date(Date.UTC(year, month, day)).toISOString();
  }

	//==== výsledné pole ====
  const result = [];

	//==== hlavný cyklus -> vyber pohlavie, meno, priezvisko, dátum narodenia, úvazok, vytvorenie objektu a ulozenie do pola result ====
  for (let i = 0; i < dtoIn.count; i++) {
    const gender = getRandom(genders);

    const name =
      gender === "male"
        ? getRandom(fnMale)
        : getRandom(fnFemale);

    const surname =
      gender === "male"
        ? getRandom(snMale)
        : getRandom(snFemale);

    result.push({
      gender: gender,
      birthdate: generateBirthdate(dtoIn.age.min, dtoIn.age.max),
      name: name,
      surname: surname,
      workload: getRandom(workloads)
    });
  }
	//==== výsledok ====
  return result;
}

	//==== vstup ====
const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 35
  }
};

//====  spusti ==== 
const result = main(dtoIn);

//==== výpis ==== 
console.log(result);

//==== výpis na stranke ==== 
document.body.innerHTML = "<pre>" + JSON.stringify(result, null, 2) + "</pre>";