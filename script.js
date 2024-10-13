// script.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Добавляем alpha: true для прозрачного фона
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8); // Устанавливаем размер рендера на весь экран
renderer.shadowMap.enabled = true; // Включаем тени
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Используем мягкие тени
document.getElementById('model-container').appendChild(renderer.domElement);

// Создаем несколько источников света для равномерного освещения модели
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Фоновое освещение
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Рассеянный свет
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true; // Включаем тени для направленного света
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

// Устанавливаем позицию и ориентацию камеры
camera.position.set(0, 7, 10); // Поднимаем камеру и отдаляем её
camera.lookAt(0, 2, 0); // Направляем камеру на центр сцены

// Загрузчик GLB модели
const loader = new THREE.GLTFLoader();

// Загрузка первой модели
let model;
loader.load('model.glb', function(gltf) {
    model = gltf.scene;
    model.scale.set(5, 5, 5); // Увеличиваем масштаб модели
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

// Загрузка второй модели
loader.load('model2.glb', function(gltf) {
    const model2 = gltf.scene;
    model2.scale.set(1, 1, 1); // Увеличиваем масштаб модели
    model2.position.set(-5, 7, 0); // Располагаем модель слева сверху
    model2.rotation.x = Math.PI / 3; // Поворачиваем модель по оси X
    model2.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true; // Включаем тени для мешей
            child.receiveShadow = true; // Включаем тени для мешей
        }
    });
    scene.add(model2);

    // Анимация вращения второй модели
    let rotationDirection = 1;
    function animateModel2() {
        if (model2.rotation.y >= Math.PI / 6 || model2.rotation.y <= -Math.PI / 6) {
            rotationDirection *= -1;
        }
        model2.rotation.y += rotationDirection * 0.01;
        requestAnimationFrame(animateModel2);
    }
    animateModel2();
}, undefined, function(error) {
    console.error(error);
});

// Функция для анимации и рендеринга сцены
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Обработчик событий для вращения первой модели при движении мыши
let previousMousePosition = {
    x: 0,
    y: 0
};

const rotationSpeed = 0.01; // Регулируем скорость вращения

renderer.domElement.addEventListener('mousemove', (e) => {
    if (model) {
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };

        // Вращение только вокруг вертикальной оси (ось Y)
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                0,
                deltaMove.x * rotationSpeed,
                0,
                'XYZ'
            ));

        model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);
    }

    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});




