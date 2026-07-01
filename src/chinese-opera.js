// chinese-opera.js
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

let scene, camera, renderer, disc, animationId;

export async function initStage(container) {
    // create renderer within container
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const geometry = new THREE.CircleGeometry(2.2, 64);
    // Use image from Chinese-s-opera- repo raw CDN
    const textureUrl = 'https://raw.githubusercontent.com/qqcatchan/Chinese-s-opera-/main/IMG_4102.png';
    const texture = new THREE.TextureLoader().load(textureUrl,
        () => {},
        undefined,
        (err) => { console.warn('載入貼圖錯誤', err); }
    );
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    disc = new THREE.Mesh(geometry, material);
    scene.add(disc);

    window.addEventListener('resize', onWindowResize);
}

export function startStage() {
    if (!renderer) return;
    function animate() {
        if (disc) disc.rotation.y += 0.01;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    }
    if (!animationId) animate();
}

export function stopStage() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = null;
}

function onWindowResize() {
    const container = renderer.domElement.parentElement;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}
