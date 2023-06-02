// Données IMC
const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// Element du DOM
const inputWeightElt = document.getElementById("input_weight");
const inputSizeElt = document.getElementById("input_size");
const buttonImcElt = document.getElementsByClassName("imc_button")[0];
const resultImcElt = document.getElementsByClassName("imc_result");
const conclusionImcElt = document.getElementsByClassName("imc_conclusion");

//Fonction qui compare l'IMC reçu au données de BMIData
function verif(imc) {
  for(let i = 0; i < BMIData.length; i++) {
    if(imc >= BMIData[5]["range"]) {
      resultImcElt[0].style.setProperty("color", `${BMIData[5]["color"]}`);
      resultImcElt[0].textContent = imc;
      conclusionImcElt[0].textContent = `Résultat : ${BMIData[5]["name"]}`;
    }
    else if(imc >= BMIData[i]["range"][0] && imc < BMIData[i]["range"][1]) {
      resultImcElt[0].style.setProperty("color", `${BMIData[i]["color"]}`);
      resultImcElt[0].textContent = imc;
      conclusionImcElt[0].textContent = `Résultat : ${BMIData[i]["name"]}`;
      break;
    };
  };
};

//Fonction permettant d'afficher les message d'erreurs de validation
function displayErrors(message) {
  resultImcElt[0].textContent = "Woops !"
  conclusionImcElt[0].textContent = message
}

//Fonction permettant de gérer les erreurs de validation
function validationErrors(valueWeight, valueSize) {
  const regexImc = /^[0-9]+$/;
  const messageErrorField = "Champs invalide";

  if(Number(valueWeight) === 0 || valueWeight === null || Number(valueSize) === 0 || valueSize === null) {
    displayErrors(messageErrorField);
    return false
  }

  else if(!regexImc.test(valueWeight) || !regexImc.test(valueSize)) {
    displayErrors(messageErrorField);
    return false
  }

  else {
    return true
  }
};

//Fonction de conversion des cm en m
function conversionMeters(size) {
  let meters = size / 100;
  return meters;
};

//Fonction pour calculer un IMC = poids en kg / taille² en m
function calculatesImc(poids ,taille) {
  const imc = poids / (taille * taille);
  verif(imc.toFixed(1))
};

//Fonction qui récupère les valeurs de nos input et qui apelle conversionMeters() & calculatesIMC
function getValues() {
  const weightValue = inputWeightElt.value;
  const sizeValueInCm = inputSizeElt.value;

  if(!validationErrors(weightValue, sizeValueInCm)) {
    return;
  };

  const sizeValueInMeters = conversionMeters(sizeValueInCm);

  console.log(calculatesImc(weightValue, sizeValueInMeters));
}

buttonImcElt.addEventListener("click", function() {
  getValues();
});




