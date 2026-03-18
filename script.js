// ============================
// 1. Module de Ricardo
// ============================

function formaterRatio(nombre) {
  if (!isFinite(nombre)) return "—";
  if (Math.abs(nombre) < 0.01) return nombre.toExponential(2);
  return Number(nombre.toFixed(3)).toString();
}

function calculerRicardo() {
  const snPoisson = parseFloat(document.getElementById("sn-poisson").value);
  const snPhosphate = parseFloat(document.getElementById("sn-phosphate").value);
  const maPoisson = parseFloat(document.getElementById("ma-poisson").value);
  const maPhosphate = parseFloat(document.getElementById("ma-phosphate").value);

  const zoneResultats = document.getElementById("ricardo-resultats");

  if ([snPoisson, snPhosphate, maPoisson, maPhosphate].some((v) => isNaN(v) || v <= 0)) {
    zoneResultats.innerHTML =
      "<p class=\"ec-error\">Veuillez saisir des valeurs strictement positives pour tous les champs.</p>";
    return;
  }

  const coutOpPoissonSn = snPoisson / snPhosphate; // Poisson en termes de Phosphate
  const coutOpPoissonMa = maPoisson / maPhosphate;

  const coutOpPhosphateSn = snPhosphate / snPoisson; // Phosphate en termes de Poisson
  const coutOpPhosphateMa = maPhosphate / maPoisson;

  // Avantage absolu : simplement comparer les heures par unité
  const avantageAbsoluPoisson =
    snPoisson < maPoisson ? "Sénégal" : snPoisson > maPoisson ? "Maroc" : "Aucun (égalité)";
  const avantageAbsoluPhosphate =
    snPhosphate < maPhosphate ? "Sénégal" : snPhosphate > maPhosphate ? "Maroc" : "Aucun (égalité)";

  // Avantage comparatif : comparer les coûts d'opportunité
  let specialisePoisson = "";
  let specialisePhosphate = "";

  if (coutOpPoissonSn < coutOpPoissonMa) {
    specialisePoisson = "Sénégal";
    specialisePhosphate = "Maroc";
  } else if (coutOpPoissonSn > coutOpPoissonMa) {
    specialisePoisson = "Maroc";
    specialisePhosphate = "Sénégal";
  } else {
    specialisePoisson = "Aucun (coûts identiques)";
    specialisePhosphate = "Aucun (coûts identiques)";
  }

  zoneResultats.innerHTML = `
    <h3>Tableau des coûts d'opportunité</h3>
    <div class="ec-table-wrapper">
      <table class="ec-table">
        <thead>
          <tr>
            <th>Pays</th>
            <th>Heures / unité Poisson</th>
            <th>Heures / unité Phosphate</th>
            <th>Coût d'opportunité du Poisson<br><small>en termes de Phosphate</small></th>
            <th>Coût d'opportunité du Phosphate<br><small>en termes de Poisson</small></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sénégal</td>
            <td>${snPoisson}</td>
            <td>${snPhosphate}</td>
            <td>${formaterRatio(coutOpPoissonSn)}</td>
            <td>${formaterRatio(coutOpPhosphateSn)}</td>
          </tr>
          <tr>
            <td>Maroc</td>
            <td>${maPoisson}</td>
            <td>${maPhosphate}</td>
            <td>${formaterRatio(coutOpPoissonMa)}</td>
            <td>${formaterRatio(coutOpPhosphateMa)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="ec-summary">
      <h4>Avantage absolu</h4>
      <ul>
        <li>Poisson : <strong>${avantageAbsoluPoisson}</strong></li>
        <li>Phosphate : <strong>${avantageAbsoluPhosphate}</strong></li>
      </ul>

      <h4>Spécialisation (avantage comparatif)</h4>
      <ul>
        <li>Poisson : <strong>${specialisePoisson}</strong></li>
        <li>Phosphate : <strong>${specialisePhosphate}</strong></li>
      </ul>
    </div>
  `;
}

// ============================
// 2. Simulateur de politique commerciale
// ============================

const INSTRUMENTS = {
  droit_douane: {
    nom: "Droit de douane",
    mecanisme: "Taxe à l'importation qui renchérit le prix du bien étranger.",
    cout: "Principalement les consommateurs (prix plus élevés).",
    exemple: "Barrière classique à l'importation de nombreux biens.",
  },
  quotas: {
    nom: "Quotas",
    mecanisme: "Limite physique des quantités pouvant être importées.",
    cout: "Consommateurs via la rareté (prix ↑) et concurrents étrangers.",
    exemple: "Japon vs USA : limitation à 1,85 million de véhicules.",
  },
  contenu_local: {
    nom: "Contenu local",
    mecanisme: "Obligation d'utiliser un certain % de valeur ajoutée nationale.",
    cout: "Constructeurs / firmes étrangères devant adapter leur production.",
    exemple: "Côte d'Ivoire : 30 % d'assemblage local requis.",
  },
  barriere_admin: {
    nom: "Barrière administrative",
    mecanisme: "Ralentissement bureaucratique et procédures complexes.",
    cout: "Entreprises exportatrices (retards, coûts supplémentaires).",
    exemple: "Douane de Poitiers (1982) : formalités excessives.",
  },
};

function afficherInstrument(cle) {
  const tbody = document.getElementById("instrument-tbody");
  tbody.innerHTML = "";

  if (!cle || !INSTRUMENTS[cle]) {
    return;
  }

  const instrument = INSTRUMENTS[cle];

  const ligne = document.createElement("tr");
  ligne.innerHTML = `
    <td>${instrument.nom}</td>
    <td>${instrument.mecanisme}</td>
    <td>${instrument.cout}</td>
    <td>${instrument.exemple}</td>
  `;
  tbody.appendChild(ligne);
}

// ============================
// 3. Quiz d’auto-évaluation
// ============================

const QUESTIONS = [
  {
    id: "q1",
    chapitre: "Chapitre 01",
    intitule: "L’économie internationale étudie principalement…",
    options: [
      { id: "A", texte: "La politique intérieure des États." },
      { id: "B", texte: "Les relations commerciales, les taux de change et les flux entre pays." },
      { id: "C", texte: "Uniquement les marchés financiers nationaux." },
    ],
    bonneReponse: "B",
    explication:
      "L’économie internationale s’intéresse aux échanges de biens, services, capitaux et à la détermination des taux de change entre pays.",
  },
  {
    id: "q2",
    chapitre: "Chapitre 02",
    intitule:
      "Selon le modèle de Ricardo, un pays a intérêt à se spécialiser dans le bien pour lequel…",
    options: [
      { id: "A", texte: "Il utilise le plus de travail possible." },
      { id: "B", texte: "Son coût d’opportunité est le plus faible." },
      { id: "C", texte: "Les salaires sont les plus élevés." },
    ],
    bonneReponse: "B",
    explication:
      "L’avantage comparatif repose sur le coût d’opportunité relatif, pas sur le niveau absolu des coûts.",
  },
  {
    id: "q3",
    chapitre: "Chapitre 02",
    intitule: "Un coût d’opportunité se définit comme…",
    options: [
      { id: "A", texte: "Le coût financier explicite d’un bien." },
      { id: "B", texte: "La valeur de la meilleure alternative à laquelle on renonce." },
      { id: "C", texte: "Le montant des impôts payés sur un bien." },
    ],
    bonneReponse: "B",
    explication:
      "Le coût d’opportunité mesure ce que l’on sacrifie en choisissant une option plutôt qu’une autre.",
  },
];

function construireQuiz() {
  const conteneur = document.getElementById("quiz-container");
  conteneur.innerHTML = "";

  QUESTIONS.forEach((q, index) => {
    const bloc = document.createElement("article");
    bloc.className = "ec-question";
    bloc.dataset.questionId = q.id;

    const numero = index + 1;

    const optionsHtml = q.options
      .map(
        (opt) => `
        <label class="ec-option">
          <input type="radio" name="${q.id}" value="${opt.id}" />
          <span class="ec-option-letter">${opt.id}.</span>
          <span>${opt.texte}</span>
        </label>
      `
      )
      .join("");

    bloc.innerHTML = `
      <header>
        <p class="ec-question-meta">${q.chapitre} – Question ${numero}</p>
        <p class="ec-question-text">${q.intitule}</p>
      </header>
      <div class="ec-options">
        ${optionsHtml}
      </div>
      <div class="ec-question-feedback" aria-live="polite"></div>
    `;

    conteneur.appendChild(bloc);
  });
}

function validerQuiz() {
  let nbBonnes = 0;

  QUESTIONS.forEach((q) => {
    const bloc = document.querySelector(`.ec-question[data-question-id="${q.id}"]`);
    const feedbackZone = bloc.querySelector(".ec-question-feedback");
    const choix = bloc.querySelector(`input[name="${q.id}"]:checked`);

    if (!choix) {
      feedbackZone.innerHTML =
        '<p class="ec-error">Aucune réponse sélectionnée pour cette question.</p>';
      bloc.classList.remove("ec-question-correct", "ec-question-incorrect");
      bloc.classList.add("ec-question-empty");
      return;
    }

    const estCorrect = choix.value === q.bonneReponse;
    if (estCorrect) nbBonnes += 1;

    bloc.classList.remove("ec-question-empty");
    bloc.classList.toggle("ec-question-correct", estCorrect);
    bloc.classList.toggle("ec-question-incorrect", !estCorrect);

    const texteResultat = estCorrect ? "Bonne réponse !" : "Réponse incorrecte.";

    feedbackZone.innerHTML = `
      <p><strong>${texteResultat}</strong></p>
      <p><em>Correction :</em> ${q.explication}</p>
    `;
  });

  const global = document.getElementById("quiz-feedback-global");
  global.textContent = `Vous avez ${nbBonnes} bonne(s) réponse(s) sur ${QUESTIONS.length}.`;
}

function reinitialiserQuiz() {
  const conteneur = document.getElementById("quiz-container");
  conteneur.querySelectorAll("input[type=radio]").forEach((input) => {
    input.checked = false;
  });
  conteneur.querySelectorAll(".ec-question-feedback").forEach((zone) => {
    zone.innerHTML = "";
  });
  conteneur.querySelectorAll(".ec-question").forEach((bloc) => {
    bloc.classList.remove("ec-question-correct", "ec-question-incorrect", "ec-question-empty");
  });
  document.getElementById("quiz-feedback-global").textContent = "";
}

// ============================
// Initialisation
// ============================

document.addEventListener("DOMContentLoaded", () => {
  // Ricardo
  const btnRicardo = document.getElementById("btn-calcul-ricardo");
  if (btnRicardo) {
    btnRicardo.addEventListener("click", calculerRicardo);
  }

  // Politique commerciale
  const selectInstrument = document.getElementById("instrument-select");
  if (selectInstrument) {
    selectInstrument.addEventListener("change", (e) => {
      afficherInstrument(e.target.value);
    });
  }

  // Quiz
  construireQuiz();

  const btnValider = document.getElementById("btn-quiz-valider");
  const btnReset = document.getElementById("btn-quiz-reinitialiser");

  if (btnValider) btnValider.addEventListener("click", validerQuiz);
  if (btnReset) btnReset.addEventListener("click", reinitialiserQuiz);
});

