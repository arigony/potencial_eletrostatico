import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const ELEMENTS = {
  H: { color: 0xf7f7f7, radius: 0.26, vdw: 1.2, en: 2.20 },
  C: { color: 0x30343b, radius: 0.38, vdw: 1.7, en: 2.55 },
  N: { color: 0x2769d8, radius: 0.36, vdw: 1.55, en: 3.04 },
  O: { color: 0xd83a3a, radius: 0.35, vdw: 1.52, en: 3.44 },
  F: { color: 0x8ee06b, radius: 0.32, vdw: 1.47, en: 3.98 },
  Cl: { color: 0x2cab55, radius: 0.48, vdw: 1.75, en: 3.16 }
};

const MOLECULES = {
  water: {
    name: "Agua",
    formula: "H2O",
    smiles: "O",
    atoms: [
      ["O", 0.000, 0.000, 0.000, -0.66],
      ["H", 0.957, 0.000, 0.000, 0.33],
      ["H", -0.239, 0.927, 0.000, 0.33]
    ],
    bonds: [[0, 1], [0, 2]],
    explanation: "O oxigenio concentra carga parcial negativa por ser mais eletronegativo. Os hidrogenios ficam parcialmente positivos, criando um dipolo forte e regioes favoraveis a ligacoes de hidrogenio."
  },
  ammonia: {
    name: "Amonia",
    formula: "NH3",
    smiles: "N",
    atoms: [
      ["N", 0.000, 0.000, 0.180, -0.72],
      ["H", 0.940, 0.000, -0.180, 0.24],
      ["H", -0.470, 0.814, -0.180, 0.24],
      ["H", -0.470, -0.814, -0.180, 0.24]
    ],
    bonds: [[0, 1], [0, 2], [0, 3]],
    explanation: "O nitrogenio puxa densidade eletronica das ligacoes N-H. A geometria piramidal faz os dipolos nao se cancelarem, deixando uma extremidade rica em eletrons no nitrogenio."
  },
  methanol: {
    name: "Metanol",
    formula: "CH4O",
    smiles: "CO",
    atoms: [
      ["C", 0.000, 0.000, 0.000, 0.18],
      ["O", 1.430, 0.000, 0.000, -0.58],
      ["H", 1.800, 0.890, 0.000, 0.38],
      ["H", -0.540, 0.930, 0.000, 0.04],
      ["H", -0.540, -0.465, 0.805, -0.01],
      ["H", -0.540, -0.465, -0.805, -0.01]
    ],
    bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5]],
    explanation: "A ligacao C-O polariza a molecula: oxigenio negativo e hidrogenio da hidroxila positivo. Essa separacao explica solubilidade em agua e capacidade de doar/aceitar ligacoes de hidrogenio."
  },
  ethanol: {
    name: "Etanol",
    formula: "C2H6O",
    smiles: "CCO",
    atoms: [
      ["C", -1.220, -0.070, 0.000, -0.05],
      ["C", 0.270, 0.210, 0.000, 0.16],
      ["O", 1.020, -0.980, 0.000, -0.58],
      ["H", 1.930, -0.770, 0.000, 0.38],
      ["H", -1.780, 0.860, 0.000, 0.02],
      ["H", -1.430, -0.670, 0.890, 0.01],
      ["H", -1.430, -0.670, -0.890, 0.01],
      ["H", 0.520, 0.800, 0.890, 0.03],
      ["H", 0.520, 0.800, -0.890, 0.03]
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]],
    explanation: "A parte alcoolica domina o mapa eletrostatico: oxigenio negativo e O-H positivo. A cadeia etilica e menos polar, entao o potencial fica mais neutro no trecho carbono-hidrogenio."
  },
  acetone: {
    name: "Acetona",
    formula: "C3H6O",
    smiles: "CC(=O)C",
    atoms: [
      ["C", 0.000, 0.000, 0.000, 0.55],
      ["O", 0.000, 1.230, 0.000, -0.55],
      ["C", -1.350, -0.620, 0.000, -0.08],
      ["C", 1.350, -0.620, 0.000, -0.08],
      ["H", -1.940, -0.250, 0.820, 0.03],
      ["H", -1.940, -0.250, -0.820, 0.03],
      ["H", -1.270, -1.710, 0.000, 0.02],
      ["H", 1.940, -0.250, 0.820, 0.03],
      ["H", 1.940, -0.250, -0.820, 0.03],
      ["H", 1.270, -1.710, 0.000, 0.02]
    ],
    bonds: [[0, 1, 2], [0, 2], [0, 3], [2, 4], [2, 5], [2, 6], [3, 7], [3, 8], [3, 9]],
    explanation: "A carbonila cria uma polarizacao forte: oxigenio e rico em densidade eletronica, enquanto o carbono carbonilico fica eletrofilico. Isso antecipa reacoes de adicao nucleofilica."
  },
  acetic_acid: {
    name: "Acido acetico",
    formula: "C2H4O2",
    smiles: "CC(=O)O",
    atoms: [
      ["C", -1.120, 0.000, 0.000, -0.08],
      ["C", 0.320, 0.000, 0.000, 0.70],
      ["O", 0.870, 1.120, 0.000, -0.55],
      ["O", 0.980, -1.120, 0.000, -0.50],
      ["H", 1.900, -0.920, 0.000, 0.42],
      ["H", -1.480, 1.020, 0.000, 0.03],
      ["H", -1.480, -0.510, 0.884, 0.02],
      ["H", -1.480, -0.510, -0.884, 0.02]
    ],
    bonds: [[0, 1], [1, 2, 2], [1, 3], [3, 4], [0, 5], [0, 6], [0, 7]],
    explanation: "O grupo carboxila concentra a quimica da molecula. Os oxigenios estabilizam carga negativa por ressonancia, enquanto o H da hidroxila e bastante positivo, explicando a acidez."
  },
  benzene: {
    name: "Benzeno",
    formula: "C6H6",
    smiles: "c1ccccc1",
    atoms: ringAtoms(),
    bonds: [[0, 1, 1.5], [1, 2, 1.5], [2, 3, 1.5], [3, 4, 1.5], [4, 5, 1.5], [5, 0, 1.5], [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]],
    explanation: "A simetria do anel aromatico cancela quase todo o dipolo. O mapa fica relativamente neutro, com densidade pi distribuida acima e abaixo do plano do anel."
  },
  chloromethane: {
    name: "Clorometano",
    formula: "CH3Cl",
    smiles: "CCl",
    atoms: [
      ["C", 0.000, 0.000, 0.000, 0.22],
      ["Cl", 1.780, 0.000, 0.000, -0.34],
      ["H", -0.540, 0.930, 0.000, 0.04],
      ["H", -0.540, -0.465, 0.805, 0.04],
      ["H", -0.540, -0.465, -0.805, 0.04]
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
    explanation: "O cloro puxa densidade eletronica da ligacao C-Cl. O carbono ligado ao halogenio fica parcialmente positivo, uma pista para reatividade em substituicoes nucleofilicas."
  },
  methyl_cyanoacrylate: {
    name: "Metil 2-cianoacrilato",
    formula: "C5H5NO2",
    smiles: "COC(=O)C(=C)C#N",
    atoms: [
      ["C", -2.800, 0.720, 0.000, 0.12],
      ["O", -1.650, 0.000, 0.000, -0.35],
      ["C", -0.450, 0.550, 0.000, 0.65],
      ["O", -0.350, 1.780, 0.000, -0.50],
      ["C", 0.720, -0.250, 0.000, -0.08],
      ["C", 1.850, 0.280, 0.000, 0.26],
      ["H", 2.050, 1.330, 0.000, 0.05],
      ["H", 2.660, -0.420, 0.000, 0.05],
      ["C", 0.670, -1.600, 0.000, 0.32],
      ["N", 0.630, -2.760, 0.000, -0.46],
      ["H", -3.620, 0.000, 0.000, 0.02],
      ["H", -2.900, 1.330, 0.890, 0.02],
      ["H", -2.900, 1.330, -0.890, 0.02]
    ],
    bonds: [
      [0, 1],
      [1, 2],
      [2, 3, 2],
      [2, 4],
      [4, 5, 2],
      [5, 6],
      [5, 7],
      [4, 8],
      [8, 9, 3],
      [0, 10],
      [0, 11],
      [0, 12]
    ],
    explanation: "Esta molecula combina ester, alqueno ativado e nitrila. A carbonila e a nitrila puxam densidade por conjugacao, deixando o carbono beta do alqueno positivo/eletrofilico; por isso nucleofilos iniciam a polimerizacao do cianoacrilato."
  }
};

Object.assign(MOLECULES, {
  ethyl_cyanoacrylate: {
    name: "Etil 2-cianoacrilato",
    formula: "C6H7NO2",
    smiles: "CCOC(=O)C(=C)C#N",
    atoms: [
      ["C", -4.050, 0.120, 0.000, -0.05],
      ["C", -2.700, 0.680, 0.000, 0.14],
      ["O", -1.620, -0.080, 0.000, -0.35],
      ["C", -0.400, 0.420, 0.000, 0.65],
      ["O", -0.230, 1.640, 0.000, -0.50],
      ["C", 0.720, -0.430, 0.000, -0.08],
      ["C", 1.900, 0.030, 0.000, 0.26],
      ["H", 2.170, 1.060, 0.000, 0.05],
      ["H", 2.650, -0.740, 0.000, 0.05],
      ["C", 0.590, -1.770, 0.000, 0.32],
      ["N", 0.480, -2.930, 0.000, -0.46],
      ["H", -4.820, 0.900, 0.000, 0.02],
      ["H", -4.200, -0.500, 0.880, 0.02],
      ["H", -4.200, -0.500, -0.880, 0.02],
      ["H", -2.580, 1.310, 0.880, 0.04],
      ["H", -2.580, 1.310, -0.880, 0.04]
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4, 2], [3, 5], [5, 6, 2], [6, 7], [6, 8], [5, 9], [9, 10, 3], [0, 11], [0, 12], [0, 13], [1, 14], [1, 15]],
    explanation: "O grupo ester e a nitrila retiram densidade do alqueno. A cadeia etil aumenta a parte apolar, mas o carbono beta continua positivo/eletrofilico, que e o ponto atacado no mecanismo de polimerizacao."
  },
  propyl_cyanoacrylate: {
    name: "Propil 2-cianoacrilato",
    formula: "C7H9NO2",
    smiles: "CCCOC(=O)C(=C)C#N",
    atoms: [
      ["C", -5.200, 0.080, 0.000, -0.05],
      ["C", -3.850, 0.650, 0.000, -0.04],
      ["C", -2.560, -0.100, 0.000, 0.14],
      ["O", -1.420, 0.650, 0.000, -0.35],
      ["C", -0.250, 0.080, 0.000, 0.65],
      ["O", -0.160, -1.150, 0.000, -0.50],
      ["C", 0.950, 0.840, 0.000, -0.08],
      ["C", 2.060, 0.250, 0.000, 0.26],
      ["H", 2.190, -0.820, 0.000, 0.05],
      ["H", 2.930, 0.880, 0.000, 0.05],
      ["C", 1.020, 2.190, 0.000, 0.32],
      ["N", 1.060, 3.350, 0.000, -0.46],
      ["H", -5.980, 0.840, 0.000, 0.02],
      ["H", -5.350, -0.540, 0.880, 0.02],
      ["H", -5.350, -0.540, -0.880, 0.02],
      ["H", -3.750, 1.280, 0.880, 0.02],
      ["H", -3.750, 1.280, -0.880, 0.02],
      ["H", -2.480, -0.720, 0.880, 0.04],
      ["H", -2.480, -0.720, -0.880, 0.04]
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5, 2], [4, 6], [6, 7, 2], [7, 8], [7, 9], [6, 10], [10, 11, 3], [0, 12], [0, 13], [0, 14], [1, 15], [1, 16], [2, 17], [2, 18]],
    explanation: "A cadeia propil deixa a molecula mais hidrofobica. O mapa negativo permanece nos oxigenios e no nitrogenio da nitrila, enquanto o carbono beta do alqueno fica positivo e sensivel ao ataque nucleofilico."
  },
  methyl_2_fluoroacrylate: acrylateDerivative({
    name: "Metil 2-fluoroacrilato",
    formula: "C4H5FO2",
    smiles: "COC(=O)C(F)=C",
    coreCharges: { esterMethyl: 0.16, esterO: -0.34, carbonylC: 0.62, carbonylO: -0.52, alphaC: 0.02, betaC: 0.16 },
    substituent: ["F", 0.850, -1.560, 0.000, -0.42],
    substituentBonds: [[4, 8]],
    hydrogens: [["H", 2.000, 1.110, 0.000, 0.06], ["H", 2.700, -0.380, 0.000, 0.06]],
    explanation: "O fluor aumenta a polarizacao local no carbono alfa. O mapa fica bem negativo no F e nos oxigenios, enquanto a carbonila conserva uma regiao positiva no carbono carbonilico."
  }),
  methyl_2_nitroacrylate: acrylateDerivative({
    name: "Metil 2-nitroacrilato",
    formula: "C4H5NO4",
    smiles: "COC(=O)C([N+](=O)[O-])=C",
    coreCharges: { esterMethyl: 0.18, esterO: -0.34, carbonylC: 0.68, carbonylO: -0.52, alphaC: -0.04, betaC: 0.32 },
    substituent: ["N", 0.780, -1.630, 0.000, 0.58],
    extraAtoms: [["O", -0.170, -2.260, 0.000, -0.54], ["O", 1.930, -2.050, 0.000, -0.54]],
    substituentBonds: [[4, 8], [8, 9, 2], [8, 10]],
    hydrogens: [["H", 2.000, 1.110, 0.000, 0.06], ["H", 2.700, -0.380, 0.000, 0.06]],
    explanation: "O nitro e um retirador forte de eletrons. Ele aprofunda regioes negativas nos oxigenios e aumenta o carater eletrofilico do alqueno conjugado ao ester."
  }),
  methyl_2_methylacrylate: acrylateDerivative({
    name: "Metil 2-metilacrilato",
    formula: "C5H8O2",
    smiles: "COC(=O)C(C)=C",
    coreCharges: { esterMethyl: 0.14, esterO: -0.34, carbonylC: 0.58, carbonylO: -0.50, alphaC: -0.10, betaC: 0.08 },
    substituent: ["C", 0.820, -1.640, 0.000, -0.08],
    extraAtoms: [["H", 0.000, -2.360, 0.000, 0.03], ["H", 1.470, -1.900, 0.850, 0.03], ["H", 1.470, -1.900, -0.850, 0.03]],
    substituentBonds: [[4, 8], [8, 9], [8, 10], [8, 11]],
    hydrogens: [["H", 2.000, 1.110, 0.000, 0.06], ["H", 2.700, -0.380, 0.000, 0.06]],
    explanation: "O metil doa densidade por efeito indutivo fraco. A polarizacao ainda e dominada pelo ester, mas o alqueno fica menos retirador de eletrons do que nos derivados nitro ou ciano."
  }),
  methyl_2_propylacrylate: acrylateDerivative({
    name: "Metil 2-propilacrilato",
    formula: "C7H12O2",
    smiles: "COC(=O)C(CCC)=C",
    coreCharges: { esterMethyl: 0.14, esterO: -0.34, carbonylC: 0.58, carbonylO: -0.50, alphaC: -0.10, betaC: 0.07 },
    substituent: ["C", 0.820, -1.640, 0.000, -0.06],
    extraAtoms: [
      ["C", 1.930, -2.430, 0.000, -0.05], ["C", 3.250, -1.800, 0.000, -0.04],
      ["H", 0.040, -2.400, 0.000, 0.02], ["H", 1.980, -3.060, 0.880, 0.02], ["H", 1.980, -3.060, -0.880, 0.02],
      ["H", 4.040, -2.540, 0.000, 0.02], ["H", 3.420, -1.180, 0.880, 0.02], ["H", 3.420, -1.180, -0.880, 0.02]
    ],
    substituentBonds: [[4, 8], [8, 9], [9, 10], [8, 11], [9, 12], [9, 13], [10, 14], [10, 15], [10, 16]],
    hydrogens: [["H", 2.000, 1.110, 0.000, 0.06], ["H", 2.700, -0.380, 0.000, 0.06]],
    explanation: "O propil aumenta bastante a area apolar. O mapa eletrostatico fica mais neutro na cadeia carbonada e mais intenso perto dos oxigenios do ester."
  })
});

const SMILES_LOOKUP = new Map(Object.entries(MOLECULES).map(([key, mol]) => [normalizeSmiles(mol.smiles), key]));
SMILES_LOOKUP.set("CCO", "ethanol");
SMILES_LOOKUP.set("CO", "methanol");
SMILES_LOOKUP.set("O", "water");
SMILES_LOOKUP.set("N", "ammonia");
SMILES_LOOKUP.set("CC(=O)C", "acetone");
SMILES_LOOKUP.set("CC(=O)O", "acetic_acid");
SMILES_LOOKUP.set("CCl", "chloromethane");
SMILES_LOOKUP.set("c1ccccc1", "benzene");
SMILES_LOOKUP.set("COC(=O)C(=C)C#N", "methyl_cyanoacrylate");
SMILES_LOOKUP.set("CCOC(=O)C(=C)C#N", "ethyl_cyanoacrylate");
SMILES_LOOKUP.set("CCCOC(=O)C(=C)C#N", "propyl_cyanoacrylate");
SMILES_LOOKUP.set("COC(=O)C(F)=C", "methyl_2_fluoroacrylate");
SMILES_LOOKUP.set("COC(=O)C([N+](=O)[O-])=C", "methyl_2_nitroacrylate");
SMILES_LOOKUP.set("COC(=O)C(C)=C", "methyl_2_methylacrylate");
SMILES_LOOKUP.set("COC(=O)C(CCC)=C", "methyl_2_propylacrylate");

const state = {
  moleculeKey: "water",
  spin: false,
  meshes: [],
  labels: [],
  mapPoints: null,
  dipoleArrow: null
};

const viewerElement = document.querySelector("#viewer");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101719);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
viewerElement.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

scene.add(new THREE.HemisphereLight(0xffffff, 0x243035, 1.8));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);

const atomGroup = new THREE.Group();
scene.add(atomGroup);

document.querySelector("#moleculeSelect").addEventListener("change", (event) => {
  state.moleculeKey = event.target.value;
  document.querySelector("#smilesInput").value = MOLECULES[state.moleculeKey].smiles;
  renderMolecule();
});

document.querySelector("#loadSmiles").addEventListener("click", () => {
  const smiles = normalizeSmiles(document.querySelector("#smilesInput").value);
  const key = SMILES_LOOKUP.get(smiles);
  if (!key) {
    showUnsupportedSmiles(smiles);
    return;
  }
  state.moleculeKey = key;
  document.querySelector("#moleculeSelect").value = key;
  renderMolecule();
});

for (const id of ["showCharges", "showDipole", "showMap"]) {
  document.querySelector(`#${id}`).addEventListener("change", renderMolecule);
}

document.querySelector("#resetView").addEventListener("click", () => fitCamera(MOLECULES[state.moleculeKey]));
document.querySelector("#toggleSpin").addEventListener("click", () => {
  state.spin = !state.spin;
});

window.addEventListener("resize", resize);
resize();
document.querySelector("#smilesInput").value = MOLECULES.water.smiles;
renderMolecule();
animate();

function ringAtoms() {
  const atoms = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI * 2 * i) / 6;
    atoms.push(["C", Math.cos(angle) * 1.39, Math.sin(angle) * 1.39, 0, -0.04]);
  }
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI * 2 * i) / 6;
    atoms.push(["H", Math.cos(angle) * 2.47, Math.sin(angle) * 2.47, 0, 0.04]);
  }
  return atoms;
}

function acrylateDerivative({ name, formula, smiles, coreCharges = {}, substituent, extraAtoms = [], substituentBonds, hydrogens, explanation }) {
  const charges = {
    esterMethyl: 0.16,
    esterO: -0.34,
    carbonylC: 0.60,
    carbonylO: -0.50,
    alphaC: 0.00,
    betaC: -0.16,
    ...coreCharges
  };
  const atoms = [
    ["C", -2.800, 0.720, 0.000, charges.esterMethyl],
    ["O", -1.650, 0.000, 0.000, charges.esterO],
    ["C", -0.450, 0.550, 0.000, charges.carbonylC],
    ["O", -0.350, 1.780, 0.000, charges.carbonylO],
    ["C", 0.720, -0.250, 0.000, charges.alphaC],
    ["C", 1.850, 0.280, 0.000, charges.betaC],
    ...hydrogens,
    substituent,
    ...extraAtoms,
    ["H", -3.620, 0.000, 0.000, 0.04],
    ["H", -2.900, 1.330, 0.890, 0.04],
    ["H", -2.900, 1.330, -0.890, 0.04]
  ];
  const methylHydrogenStart = atoms.length - 3;

  return {
    name,
    formula,
    smiles,
    atoms,
    bonds: [
      [0, 1],
      [1, 2],
      [2, 3, 2],
      [2, 4],
      [4, 5, 2],
      [5, 6],
      [5, 7],
      ...substituentBonds,
      [0, methylHydrogenStart],
      [0, methylHydrogenStart + 1],
      [0, methylHydrogenStart + 2]
    ],
    explanation
  };
}

function normalizeSmiles(value) {
  return String(value || "").replace(/\s+/g, "");
}

function renderMolecule() {
  const molecule = MOLECULES[state.moleculeKey];
  clearScene();
  drawBonds(molecule);
  drawAtoms(molecule);
  const esp = sampleElectrostaticPotential(molecule);

  if (document.querySelector("#showMap").checked) {
    drawElectrostaticSurface(molecule);
    drawElectrostaticMap(esp.points);
  }

  const dipole = calculateDipole(molecule);
  if (document.querySelector("#showDipole").checked && dipole.magnitude > 0.05) {
    drawDipole(dipole);
  }

  if (document.querySelector("#showCharges").checked) {
    drawChargeLabels(molecule);
  }

  updatePanel(molecule, dipole, esp);
  fitCamera(molecule);
}

function clearScene() {
  while (atomGroup.children.length) {
    const child = atomGroup.children.pop();
    if (child.geometry) child.geometry.dispose();
    if (child.material) child.material.dispose();
  }
}

function drawAtoms(molecule) {
  molecule.atoms.forEach(([symbol, x, y, z]) => {
    const element = ELEMENTS[symbol];
    const geometry = new THREE.SphereGeometry(element.radius, 32, 20);
    const material = new THREE.MeshStandardMaterial({
      color: element.color,
      roughness: 0.42,
      metalness: 0.05
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    atomGroup.add(sphere);
  });
}

function drawBonds(molecule) {
  molecule.bonds.forEach(([a, b, order = 1]) => {
    const start = vectorFromAtom(molecule.atoms[a]);
    const end = vectorFromAtom(molecule.atoms[b]);
    const offsets = order > 1 ? [-0.055, 0.055] : [0];
    offsets.forEach((offset) => addBondCylinder(start, end, offset));
  });
}

function addBondCylinder(start, end, offset) {
  const midpoint = start.clone().add(end).multiplyScalar(0.5);
  const direction = end.clone().sub(start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(0.07, 0.07, length, 18);
  const material = new THREE.MeshStandardMaterial({ color: 0xcfd6d4, roughness: 0.5 });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.copy(midpoint);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  if (offset !== 0) {
    const side = new THREE.Vector3(-direction.y, direction.x, 0).normalize().multiplyScalar(offset);
    cylinder.position.add(side);
  }
  atomGroup.add(cylinder);
}

function drawElectrostaticMap(points) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];
  points.forEach((point) => {
    positions.push(point.x, point.y, point.z);
    const color = colorForPotential(point.value);
    colors.push(color.r, color.g, color.b);
  });
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.018,
    vertexColors: true,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });
  atomGroup.add(new THREE.Points(geometry, material));
}

function drawElectrostaticSurface(molecule) {
  const surfaceGroup = new THREE.Group();
  molecule.atoms.forEach((atom, atomIndex) => {
    const [symbol, x, y, z] = atom;
    const element = ELEMENTS[symbol];
    const geometry = new THREE.SphereGeometry(element.vdw * 0.98, 48, 24);
    const position = geometry.getAttribute("position");
    const colors = [];

    for (let i = 0; i < position.count; i += 1) {
      const point = new THREE.Vector3(position.getX(i) + x, position.getY(i) + y, position.getZ(i) + z);
      const value = potentialAt(point, molecule);
      const color = colorForPotential(value);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      transparent: true,
      opacity: symbol === "H" && molecule.atoms.length > 10 ? 0.10 : 0.30,
      roughness: 0.72,
      metalness: 0.0,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    if (isMostlyBuried(atomIndex, molecule)) {
      mesh.material.opacity *= 0.65;
    }
    surfaceGroup.add(mesh);
  });
  atomGroup.add(surfaceGroup);
}

function drawDipole(dipole) {
  const direction = dipole.vector.clone().normalize();
  const length = Math.min(2.4, 0.65 + dipole.magnitude * 0.28);
  const origin = direction.clone().multiplyScalar(-length / 2);
  const arrow = new THREE.ArrowHelper(direction, origin, length, 0xffc857, 0.24, 0.12);
  atomGroup.add(arrow);
}

function drawChargeLabels(molecule) {
  molecule.atoms.forEach(([symbol, x, y, z, charge], index) => {
    if (molecule.atoms.length > 10 && symbol === "H") return;
    const sprite = makeTextSprite(`${symbol}${index + 1} ${signed(charge)}`);
    sprite.position.set(x, y + 0.58 + (index % 3) * 0.12, z);
    atomGroup.add(sprite);
  });
}

function makeTextSprite(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 80;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.strokeStyle = "rgba(18,25,28,0.18)";
  roundRect(ctx, 8, 8, 240, 58, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#172023";
  ctx.font = "700 26px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 38);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.92, 0.29, 1);
  return sprite;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function calculateDipole(molecule) {
  const center = molecule.atoms.reduce((acc, atom) => acc.add(vectorFromAtom(atom)), new THREE.Vector3()).multiplyScalar(1 / molecule.atoms.length);
  const vector = molecule.atoms.reduce((acc, atom) => {
    const [, x, y, z, charge] = atom;
    return acc.add(new THREE.Vector3(x, y, z).sub(center).multiplyScalar(charge));
  }, new THREE.Vector3());
  return { vector, magnitude: vector.length() * 4.803 };
}

function sampleElectrostaticPotential(molecule) {
  const points = [];
  let min = Infinity;
  let max = -Infinity;
  molecule.atoms.forEach((atom, atomIndex) => {
    const [symbol, x, y, z] = atom;
    const sampleCount = molecule.atoms.length > 12 ? 360 : 480;
    for (const radiusScale of [0.94, 1.08]) {
      const radius = ELEMENTS[symbol].vdw * radiusScale;
      for (let i = 0; i < sampleCount; i += 1) {
        const dir = fibonacciDirection(i, sampleCount);
        const pos = new THREE.Vector3(x, y, z).add(dir.multiplyScalar(radius));
        if (isBuriedPoint(pos, molecule, atomIndex)) continue;
        const value = potentialAt(pos, molecule);
        min = Math.min(min, value);
        max = Math.max(max, value);
        points.push({ x: pos.x, y: pos.y, z: pos.z, value });
      }
    }
  });
  return { points, min, max };
}

function fibonacciDirection(index, total) {
  const y = 1 - (index / (total - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = Math.PI * (3 - Math.sqrt(5)) * index;
  return new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
}

function isBuriedPoint(point, molecule, atomIndex) {
  return molecule.atoms.some((atom, index) => {
    if (index === atomIndex) return false;
    const symbol = atom[0];
    const distance = point.distanceTo(vectorFromAtom(atom));
    return distance < ELEMENTS[symbol].vdw * 0.56;
  });
}

function isMostlyBuried(atomIndex, molecule) {
  const atom = molecule.atoms[atomIndex];
  const center = vectorFromAtom(atom);
  const symbol = atom[0];
  const nearAtoms = molecule.atoms.filter((other, index) => {
    if (index === atomIndex) return false;
    return center.distanceTo(vectorFromAtom(other)) < (ELEMENTS[symbol].vdw + ELEMENTS[other[0]].vdw) * 0.68;
  });
  return nearAtoms.length >= 3;
}

function potentialAt(point, molecule) {
  return molecule.atoms.reduce((sum, atom) => {
    const distance = Math.max(0.45, point.distanceTo(vectorFromAtom(atom)));
    return sum + atom[4] / distance;
  }, 0);
}

function colorForPotential(value) {
  const clamped = Math.max(-0.32, Math.min(0.32, value));
  const neutral = new THREE.Color(0xf4f1e8);
  const negative = new THREE.Color(0xd64343);
  const positive = new THREE.Color(0x2866d7);
  if (clamped < 0) return neutral.clone().lerp(negative, Math.abs(clamped) / 0.32);
  return neutral.clone().lerp(positive, clamped / 0.32);
}

function updatePanel(molecule, dipole, esp) {
  document.querySelector("#moleculeName").textContent = molecule.name;
  document.querySelector("#formulaBadge").textContent = molecule.formula;
  document.querySelector("#methodNote").textContent = `Entrada ${molecule.smiles}. Geometria e cargas parciais por modelo heuristico de quimica organica.`;
  document.querySelector("#dipoleValue").textContent = dipole.magnitude.toFixed(2);
  document.querySelector("#espMin").textContent = esp.min.toFixed(3);
  document.querySelector("#espMax").textContent = esp.max.toFixed(3);
  document.querySelector("#atomCount").textContent = molecule.atoms.length;
  document.querySelector("#organicExplanation").textContent = molecule.explanation;

  const table = document.querySelector("#chargeTable");
  table.innerHTML = "";
  molecule.atoms.forEach(([symbol, , , , charge], index) => {
    const row = document.createElement("div");
    row.className = "charge-row";
    const color = charge < 0 ? "#d64343" : "#2866d7";
    const width = `${Math.min(100, Math.abs(charge) * 140)}%`;
    row.innerHTML = `
      <span class="charge-pill" style="background:${color}">${symbol}${index + 1}</span>
      <span class="charge-track"><span class="charge-fill" style="display:block;width:${width};background:${color}"></span></span>
      <span class="charge-value">${signed(charge)}</span>
    `;
    table.appendChild(row);
  });
}

function showUnsupportedSmiles(smiles) {
  const explanation = document.querySelector("#organicExplanation");
  explanation.textContent = `SMILES "${smiles}" ainda nao esta no conjunto educacional. Use exemplos como O, N, CO, CCO, CC(=O)C, CC(=O)O, CCl, c1ccccc1, COC(=O)C(=C)C#N, CCOC(=O)C(=C)C#N ou CCCOC(=O)C(=C)C#N.`;
}

function vectorFromAtom(atom) {
  return new THREE.Vector3(atom[1], atom[2], atom[3]);
}

function signed(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;
}

function fitCamera(molecule) {
  const box = new THREE.Box3();
  molecule.atoms.forEach((atom) => box.expandByPoint(vectorFromAtom(atom)));
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());
  controls.target.copy(center);
  camera.position.copy(center).add(new THREE.Vector3(0, 0, Math.max(5.4, size * 1.55)));
  controls.update();
}

function resize() {
  const rect = viewerElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  camera.aspect = rect.width / Math.max(1, rect.height);
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  if (state.spin) atomGroup.rotation.y += 0.006;
  controls.update();
  renderer.render(scene, camera);
}
