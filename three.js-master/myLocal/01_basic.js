import * as THREE from '../build/three.module.js';

class App {
    constructor() {
        const divContainer = document.querySelector("#webgi-container");
        this._divContainer = divContainer;//App 클래스의 필드로 저장

        const renderer = new THREE.WebGL1Renderer({ antialias: true});
        //THREE 객체의 WebGL1Renderer 를 antialias: true 로 설정하면
        //이를 통해 만들어지는 object는 경계선이 pixel의 계단형상으로 보이지 않고
        //부드럽게 표현된다.
        console.log("내 PC의 PixelRatio 값 확인 : "+window.devicePixelRatio);
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        //renderer.domElement 는
        //canvus 타입의 dom 객체임
        this._renderer = renderer;
        
        const scene = new THREE.Scene();
        //THREE 객체에 새로운 Scene을 만들어 줌.
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        window.onresize = this.resize.bind(this); 
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupCamera() {//카메라 강좌에서 다시 설명
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight() {//광원 강좌에서 다시 설명
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel() {//Mesh(object3D) 강좌에서 다시 다루기
        const geometry = new THREE.BoxGeometry(1, 1, 1);//가로, 세로, 깊이
        const material = new THREE.MeshPhongMaterial({color: 0x44a88});

        const cube = new THREE.Mesh(geometry, material);

        this._scene.add(cube);
        this._cube = cube;
    }
    //https://www.youtube.com/watch?v=vjKuk5Vp93k 13:44/18:37 까지 봄. 이어서 보면 여기에 추가하기.
}

window.onload = function() {
    new App();
}