// Menu page
const circle = document.querySelector('.circle');

document.addEventListener('mousemove', (event) => {
  const { pageX, pageY } = event;
  circle.style.left = `${pageX}px`;
  circle.style.top = `${pageY}px`;
});


  const slides = document.querySelectorAll(".slide-input");
  let currentIndex = 0;

  function showNextSlide() {
      slides[currentIndex].checked = false;
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].checked = true;
  }

  setInterval(showNextSlide, 3000);


// Game Page

const MODEL_SPACING = -10;
const TOTAL_MODELS = 17;
const SCALE = "1 1 1";
const MODEL_PATH = './models3d/log_cottage/scene.gltf';
const scene = document.querySelector('a-scene');

const createModels = (x, y, startZ, rotation = null) => {
  for (let i = 0; i < TOTAL_MODELS; i++) {
    const model = document.createElement('a-entity');
    const positionZ = startZ + i * MODEL_SPACING;

    model.setAttribute('gltf-model', MODEL_PATH);
    model.setAttribute('position', `${x} ${y} ${positionZ}`);
    model.setAttribute('scale', SCALE);
    if (rotation) model.setAttribute('rotation', rotation);
    scene.appendChild(model);
  }
};

const modelConfigs = [
  { x: 7, y: 0, startZ: -3 },
  { x: -7, y: 0, startZ: -3, rotation: "0 180 0" }
];

modelConfigs.forEach(({ x, y, startZ, rotation }) =>
  createModels(x, y, startZ, rotation)
);





const plate = document.querySelector("#interactive-plate");
let popupTimeout; 

const showPopup = () => {
  alert("Vous avez marché sur la plaque !");
};

plate.addEventListener("mouseenter", () => {
  popupTimeout = setTimeout(() => {
    showPopup();
  }, 500);
});

plate.addEventListener("mouseleave", () => {
  clearTimeout(popupTimeout);
});



const snowContainer = document.querySelector('#snow-container');
const snowflakeCount = 500; // Si tu veux plus de particule tu augmentes ça
const snowflakes = [];

for (let i = 0; i < snowflakeCount; i++) {
const snowflake = document.createElement('a-sphere');
snowflake.setAttribute('radius', '0.05');
snowflake.setAttribute('color', '#ffffff');
snowflake.setAttribute('position', {
x: (Math.random() - 0.5) * 320, // Si tu veux que les particules ailles plus loin sur l'axe x faut que tu augmentes le 50
y: Math.random() * 20,
z: (Math.random() - 0.5) * 320 // Idem pour le z
});
snowContainer.appendChild(snowflake);
snowflakes.push(snowflake);
}

function animateSnow() {
snowflakes.forEach(snowflake => {
const position = snowflake.getAttribute('position');
position.y -= 0.02;
if (position.y < -10) {
position.y = Math.random() * 20;
position.x = (Math.random() - 0.5) * 320; // Penses a modifier aussi les valeurs ici si tu modifies en haut
position.z = (Math.random() - 0.5) * 320; // Penses a modifier aussi les valeurs ici si tu modifies en haut
}
snowflake.setAttribute('position', position);
});
requestAnimationFrame(animateSnow);
}

animateSnow();

AFRAME.registerComponent('camera-bounds', {
  schema: {
    minX: { type: 'number', default: -10 },
    maxX: { type: 'number', default: 10 },
    minZ: { type: 'number', default: -10 },
    maxZ: { type: 'number', default: 10 }
  },
  tick: function () {
    const cameraEl = this.el;
    const position = cameraEl.object3D.position;

    // Apply boundaries to X and Z coordinates
    if (position.x < this.data.minX) position.x = this.data.minX;
    if (position.x > this.data.maxX) position.x = this.data.maxX;
    if (position.z < this.data.minZ) position.z = this.data.minZ;
    if (position.z > this.data.maxZ) position.z = this.data.maxZ;
  }
});



