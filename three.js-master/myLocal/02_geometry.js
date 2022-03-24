import * as THREE from '../build/three.module.js';
//import { OrbitControls } from "./../examples/jsm/controls/OrbitControls.js";
import * as OrbitControls from "../examples/jsm/controls/OrbitControls.js";

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
        this._setupControls();
        
        window.onresize = this.resize.bind(this); 
        this.resize();

        console.log(this.render);
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

    _setupControls(){//사용자 마우스에 따라 자동으로 회전하게 만들기
        // THREE.OrbitControls
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupModel() {//Mesh(object3D) 강좌에서 다시 다루기
        const geometry = new THREE.BoxGeometry(1, 1, 1);//가로, 세로, 깊이
        const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
        const cube = new THREE.Mesh(geometry, fillMaterial);

        const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial
        );

        const group = new THREE.Group();
        //group.add(cube);
        group.add(line);

        this._scene.add(group);
        this._cube = group;
    }

    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
    //https://www.youtube.com/watch?v=vjKuk5Vp93k 13:44/18:37 까지 봄. 이어서 보면 여기에 추가하기.
    render(time) {//time 단위는 밀리초
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time){
        time *= 0.001; // time을  분 단위로 바꿔줌
        console.log(time);
        //this._cube.rotation.x = time; 자동으로 오브젝트를 회전하게 함 1
        //this._cube.rotation.y = time; 자동으로 오브젝트를 회전하게 함 2
    }
}

window.onload = function() {
    new App();
}