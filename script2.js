const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Добавляем alpha: true для прозрачного фона
renderer.setSize(window.innerWidth, window.innerHeight); // Устанавливаем размер рендера на половину экрана
renderer.shadowMap.enabled = true; // Включаем тени
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Используем мягкие тени
document.getElementById('model-container2').appendChild(renderer.domElement);

// Создаем несколько источников света для равномерного освещения модели
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Фоновое освещение
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Рассеянный свет
scene.add(hemisphereLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(-10, 10, 90);
directionalLight1.castShadow = true; // Включаем тени для направленного света
directionalLight1.shadow.mapSize.width = 2048;
directionalLight1.shadow.mapSize.height = 2048;
directionalLight1.shadow.camera.near = 0.5;
directionalLight1.shadow.camera.far = 5000;
directionalLight1.shadow.camera.left = -10;
directionalLight1.shadow.camera.right = 10;
directionalLight1.shadow.camera.top = 10;
directionalLight1.shadow.camera.bottom = -10;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(10, 10, -90);
directionalLight2.castShadow = true; // Включаем тени для направленного света
directionalLight2.shadow.mapSize.width = 2048;
directionalLight2.shadow.mapSize.height = 2048;
directionalLight2.shadow.camera.near = 0.5;
directionalLight2.shadow.camera.far = 5000;
directionalLight2.shadow.camera.left = -10;
directionalLight2.shadow.camera.right = 10;
directionalLight2.shadow.camera.top = 10;
directionalLight2.shadow.camera.bottom = -10;
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight3.position.set(90, -10, 10);
directionalLight3.castShadow = false; // Включаем тени для направленного света
directionalLight3.shadow.mapSize.width = 2048;
directionalLight3.shadow.mapSize.height = 2048;
directionalLight3.shadow.camera.near = 0.5;
directionalLight3.shadow.camera.far = 5000;
directionalLight3.shadow.camera.left = -10;
directionalLight3.shadow.camera.right = 10;
directionalLight3.shadow.camera.top = 10;
directionalLight3.shadow.camera.bottom = -10;
scene.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight4.position.set(-90, -10, -10);
directionalLight4.castShadow = false; // Включаем тени для направленного света
directionalLight4.shadow.mapSize.width = 2048;
directionalLight4.shadow.mapSize.height = 2048;
directionalLight4.shadow.camera.near = 0.5;
directionalLight4.shadow.camera.far = 5000;
directionalLight4.shadow.camera.left = -10;
directionalLight4.shadow.camera.right = 10;
directionalLight4.shadow.camera.top = 10;
directionalLight4.shadow.camera.bottom = -10;
scene.add(directionalLight4);

// Добавляем мягкий, но сильный источник света сверху
const topLight = new THREE.DirectionalLight(0xffffff, 0.5); // Увеличиваем интенсивность света
topLight.position.set(0, 100, 0); // Располагаем свет сверху
topLight.castShadow = false; // Включаем тени для направленного света
topLight.shadow.mapSize.width = 2048;
topLight.shadow.mapSize.height = 2048;
topLight.shadow.camera.near = 0.5;
topLight.shadow.camera.far = 5000;
topLight.shadow.camera.left = -10;
topLight.shadow.camera.right = 10;
topLight.shadow.camera.top = 10;
topLight.shadow.camera.bottom = -10;
scene.add(topLight);

// Устанавливаем позицию и ориентацию камеры
camera.position.set(0, 0, 15); // Поднимаем камеру и отдаляем её
camera.lookAt(0, 0, 0); // Направляем камеру на центр сцены

// Загрузчик GLB модели
const loader = new THREE.GLTFLoader();

// Загрузка модели
let model;
loader.load('totallyspace.glb', function(gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1); // Увеличиваем масштаб модели
    model.position.y = -2; // Опускаем модель ниже
    model.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true; // Включаем тени для мешей
            child.receiveShadow = true; // Включаем тени для мешей
        }
    });
    scene.add(model);
    animate();
}, undefined, function(error) {
    console.error(error);
});

// Добавление управления мышью
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Включаем плавное затухание
controls.dampingFactor = 0.25; // Коэффициент затухания
controls.enableZoom = true; // Включаем зум
controls.enablePan = false; // Отключаем панорамирование
controls.minDistance = 1; // Минимальное расстояние камеры
controls.maxDistance = 100; // Максимальное расстояние камеры
controls.minPolarAngle = 0; // Минимальный угол полярного вращения
controls.maxPolarAngle = Math.PI; // Максимальный угол полярного вращения

// Функция для анимации и рендеринга сцены
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Обновляем управление

    // Вращение модели вокруг вертикальной оси
    if (model) {
        model.rotation.y += 0.01; // Медленное вращение
    }

    renderer.render(scene, camera);
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});





