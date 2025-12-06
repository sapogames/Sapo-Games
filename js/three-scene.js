import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Seleciona o container onde a cena 3D será renderizada
const container = document.querySelector(".hero-3d-container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Para cores mais precisas
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Configuração da textura de vídeo
const video = document.createElement("video");
video.src = "assets/3d/videosapoboy.mp4";
video.loop = true;
video.muted = true;
video.playsInline = true;
video.crossOrigin = "anonymous";
video.preload = "metadata";

// Carregar o vídeo
video.load();

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBAFormat;
videoTexture.flipY = false; // Essencial para texturas em modelos GLTF

// Função para iniciar vídeo
function startVideo() {
  video
    .play()
    .then(() => {
      console.log("Vídeo iniciado");
    })
    .catch((error) => {
      console.log("Aguardando interação para iniciar vídeo:", error);
      // Tenta novamente na interação do usuário
      const startOnInteraction = () => {
        video.play();
        window.removeEventListener("click", startOnInteraction);
        window.removeEventListener("touchstart", startOnInteraction);
      };
      window.addEventListener("click", startOnInteraction);
      window.addEventListener("touchstart", startOnInteraction);
    });
}

// Aguardar metadados antes de tentar reproduzir
video.addEventListener("loadedmetadata", startVideo);

// Carregar modelo
const loader = new GLTFLoader();

loader.load(
  "assets/3d/sapoboy.glb",
  function (gltf) {
    const model = gltf.scene;
    let sapoLogoTexture = null;
    let molduraTelaMesh = null;

    // Verificar estrutura do modelo
    console.log("Modelo carregado:", model);

    model.traverse((child) => {
      if (child.isMesh) {
        console.log(
          "Mesh encontrada:",
          child.name,
          "Material:",
          child.material?.name
        );

        // Encontra a textura "sapoboylogo" que já está no modelo
        if (child.material?.map?.name === "sapoboylogo") {
          console.log(
            "Textura 'sapoboylogo' encontrada no material:",
            child.material.name
          );
          sapoLogoTexture = child.material.map;
        }

        // Aplica a textura de vídeo na tela
        if (
          child.material &&
          (child.material.name === "tela.001" || child.name.includes("tela"))
        ) {
          console.log("Aplicando textura de vídeo em:", child.name);
          // Garante que o material seja Standard e aplica a textura
          child.material = new THREE.MeshStandardMaterial({
            map: videoTexture,
          });

          // Modifica o material existente em vez de criar um novo
          child.material.map = videoTexture;
          child.material.needsUpdate = true;
          child.material.side = THREE.FrontSide;
        }

        // Aplica a textura de imagem na moldura
        // Verifica se a mesh tem o nome "Cube001_2" ou se o material tem o nome "moldura tela"
        if (child.name === "Cube001_2") {
          console.log(
            "Mesh 'Cube001_2' (moldura) encontrada. Material:",
            child.material?.name
          );
          molduraTelaMesh = child;
        } else if (child.material && child.material.name === "moldura tela") {
          console.log(
            "Mesh com material 'moldura tela' encontrada:",
            child.name
          );
          molduraTelaMesh = child;
        }
      }
    });

    // Após percorrer o modelo, aplica a textura encontrada na moldura
    if (sapoLogoTexture && molduraTelaMesh) {
      console.log(
        "Aplicando a textura 'sapoboylogo' existente na 'moldura tela'."
      );
      // Clona o material para garantir que estamos modificando uma instância única
      const newMaterial = molduraTelaMesh.material.clone();
      newMaterial.map = sapoLogoTexture; // Aplica a textura ao novo material
      newMaterial.needsUpdate = true; // Garante que a textura seja carregada
      molduraTelaMesh.material = newMaterial; // Atribui o novo material à malha
      // Modifica o material existente da moldura para adicionar a textura do logo
      molduraTelaMesh.material.map = sapoLogoTexture;
      molduraTelaMesh.material.needsUpdate = true;
    } else {
      console.warn(
        "Não foi possível encontrar a textura 'sapoboylogo' ou a mesh 'moldura tela'."
      );
    }

    // Aumenta a escala do modelo (aqui você pode ajustar o tamanho)
    model.scale.set(1.5, 1.5, 1.5);

    scene.add(model);

    // Ajustar câmera para o modelo
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Move o posicionamento da câmera para dentro do callback de load
    camera.position.set(
      center.x,
      center.y,
      center.z + Math.max(size.x, size.y, size.z) * 1.5
    );
    controls.target.copy(center);
    camera.position.set(2, 1.8, 4.5); // Posição da câmera reajustada para o novo tamanho

    console.log("Modelo adicionado à cena");
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% carregado");
  },
  function (error) {
    console.error("Erro ao carregar modelo:", error);
  }
);

// Lidar com redimensionamento da janela
window.addEventListener("resize", function () {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Função de animação
function animate() {
  requestAnimationFrame(animate);

  // Atualizar textura de vídeo se estiver rodando
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    videoTexture.needsUpdate = true;
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
