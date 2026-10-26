const seats = document.querySelectorAll("#seats article");
const reserveOptions = document.querySelectorAll("#reserve-seat option");

const available = document.querySelector("#available");
const occupied = document.querySelector("#occupées");
const revenue = document.querySelector("#recette");

const form = document.querySelector("#form-reserve");
const nameInput = document.querySelector("#Nom-dupassager");
const seatSelect = document.querySelector("#reserve-seat");
const msgReserve = document.querySelector("#msg-reserve");

let names = [];
for (let i = 0; i < 20; i++) {
  names.push("");
}

function updatePage() {
  let count = 0;

  for (let i = 0; i < 20; i++) {
    const smia = seats[i].querySelector("h3");
    const info = seats[i].querySelector("p");

    if (names[i] === "") {

      seats[i].className = "rounded-lg border border-green-200 bg-white p-2 text-center";
      smia.className = "font-bold text-green-700";
      info.className = "text-xs text-slate-500";
      info.textContent = "Libre";
    } else {

      seats[i].className = "rounded-lg border border-red-200 bg-white p-2 text-center";
      smia.className = "font-bold text-red-300";
      info.className = "text-xs border bg-white rounded-lg text-slate-500";
      info.textContent = names[i];

      count++;
    }
  } 
  available.textContent = 20 - count;
  occupied.textContent = count;
  revenue.textContent = (count * 80) + " DH";
  
}
getsave();
updatePage();
function updateSelectOptions() {
  seatSelect.innerHTML = '<option value="auto">Premier Siège Libre (automatique)</option>';
  
  for (let i = 0; i < 20; i++) {
    if (names[i] === "") {
      seatSelect.innerHTML += `<option value="${i + 1}">Siège ${i + 1}</option>`;
    }
  }
}
updateSelectOptions();

form.addEventListener("click", function (e) {
  e.preventDefault(); 

  const smiya = nameInput.value.trim();
  const choix = seatSelect.value;

  function mse7Message() {
    setTimeout(function() { 
      msgReserve.textContent = ""; 
      msgReserve.className = ""; 
    }, 3000);
  }

  if (smiya === "") {
    msgReserve.textContent = " Entrer votre nom";

    msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-rose-600 mt-3 block";
    mse7Message();
    return;
  }
  
  let dejaExiste = false;
  for (let i = 0; i < 20; i++) {
    if (names[i].trim() === smiya) {
      dejaExiste = true;
      break; 
    }
  }

  if (dejaExiste) {
    msgReserve.textContent = "Cette personne a déjà une réservation!";
    msgReserve.className = "w-full h-12 flex items-center justify-center rounded-lg font-semibold text-white bg-rose-600 mt-3";
    mse7Message();
    return;
  }

  let index;

  if (choix === "auto") {
    index = names.indexOf(""); 
    if (index === -1) {
      msgReserve.textContent = "Le bus est complet!";
      msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-rose-600 mt-3 block";
      mse7Message();
      return;
    }
  } 
  else {
    index = parseInt(choix) - 1;
    
    if (names[index] !== "") {
      msgReserve.textContent = "Ce siège est déjà occupé!";
      msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-rose-600 mt-3 block";
      mse7Message();
      return;
    }
  }
  names[index] = smiya;

  msgReserve.textContent = "Siège " + (index + 1) + " réservé pour " + smiya;
  msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-emerald-600 mt-3 block";

  nameInput.value = "";
  save();
  updatePage();
  updateSelectOptions();
  mse7Message();
});

function modifierReservation() {
  const btnModify = document.querySelector("#btnmodify");
  const selectPass = document.querySelector("#Passager");
  const inputNewName = document.querySelector("#Nouveau-nom");
  const selectNewSeat = document.querySelector("#Nouveau-siège");

  function refreshLists() {
    selectPass.innerHTML = '<option value="">Choisir un passager...</option>';
    selectNewSeat.innerHTML = '<option value="">Choisir un siège...</option>';

    for (let i = 0; i < 20; i++) {
      if (names[i] !== "") {
        selectPass.innerHTML += `<option value="${i}">${names[i]} (Siège ${i+1})</option>`;
      } else {
        selectNewSeat.innerHTML += `<option value="${i+1}">Siège ${i+1}</option>`;
      }
    }
  }

const msgModify = document.createElement("p");
btnModify.parentElement.appendChild(msgModify);

  function afficherlemessage(texte, couleur) {
  msgModify.textContent = texte;
  msgModify.className = `w-full h-12 flex items-center justify-center rounded-lg font-semibold text-white mt-3 bg-${couleur}-600`;
  
  setTimeout(function() {
    msgModify.textContent = "";
    msgModify.className = "";
  }, 3000);
}

  btnModify.addEventListener("click", function (e) {
  e.preventDefault();
  
  if (selectPass.value === "") {
    afficherlemessage("Choisir un passager!", "rose");
    return;
  }
    const index = selectPass.value;
    const newName = inputNewName.value.trim();
    const newSeat = selectNewSeat.value;

    if (newName === "" && newSeat === "") {
      afficherlemessage("Entrer un nouveau nom ou choisir un siège!", "red");
      return;
    }

    if (newName !== "") {
      names[index] = newName;
    }

    if (newSeat !== "") {
      const newIndex = parseInt(newSeat) - 1;
      const currentName = names[index];
      names[index] = "";
      names[newIndex] = currentName;
    }

    inputNewName.value = "";
    updatePage();         
    refreshLists();          
    afficherlemessage("Modification enregistrée!", "green");
    save();

  });
  form.addEventListener("click", function () {
    setTimeout(refreshLists, 100);
  });
  refreshLists();
}
modifierReservation();

function supprimerReservation() {
  const btnDelete = document.querySelector("#btnSupprimer");
  const selectDelete = document.querySelector("#Pass-ager");

  const msgDelete = document.createElement("p");
  btnDelete.parentElement.appendChild(msgDelete);
  
  function refreshListssuprimer() {
    selectDelete.innerHTML = '<option value="">Choisir un passager...</option>';
    for (let i = 0; i < 20; i++) {
      if (names[i]) {
        selectDelete.innerHTML += `<option value="${i}">${names[i]} (Siège ${i + 1})</option>`;
      }
    }
  }

  function afficherMsgDelete(texte, couleur) {
    msgDelete.textContent = texte;
    msgDelete.className = `w-full h-12 flex items-center justify-center rounded-lg font-semibold text-white mt-3 bg-${couleur}-600`;
    setTimeout(function () {
      msgDelete.textContent = "";
      msgDelete.className = "";
    }, 3000);
  }

  btnDelete.addEventListener("click", function (e) {
    e.preventDefault();

    if (selectDelete.value === "") {
      afficherMsgDelete("Choisir un passager à supprimer!", "red");
      return;
    }
    
    const index = selectDelete.value;
    names[index] = "";
    save();
    updatePage();
    refreshListssuprimer();
    afficherMsgDelete("Réservation supprimée avec succès!", "green");
  });

  form.addEventListener("click", function () {
    setTimeout(refreshListssuprimer, 100);
  });
  refreshListssuprimer();
}
supprimerReservation();

function save()
{
  localStorage.setItem("names", JSON.stringify(names));
}

function getsave(){
    const get = localStorage.getItem("names");
    if(get !== null)
    {
      names = JSON.parse(get);
    }
}