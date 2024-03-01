import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {Raycaster, Vector2} from "three";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})

export class ModelComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef | undefined;

  // Stage Properties
  @Input() public fieldOfView: number = 75;
  @Input('nearClipping') public nearClippingPane: number = 0.1;
  @Input('farClipping') public farClippingPane: number = 1000;

  // Scene properties
  private camera: THREE.PerspectiveCamera | undefined;
  private controls: OrbitControls | undefined;
  private ambientLight: THREE.AmbientLight | undefined;
  private light1: THREE.PointLight | undefined;
  private light2: THREE.PointLight | undefined;
  private light3: THREE.PointLight | undefined;
  private light4: THREE.PointLight | undefined;
  private model: any;
  private directionalLight: THREE.DirectionalLight | undefined;
  private raycaster: Raycaster | undefined;
  private mouse: Vector2 | undefined;

  // Helper Properties

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();
  private renderer: THREE.WebGLRenderer | undefined;
  private scene: THREE.Scene | undefined;

  // Animate the model
  private animateModel() {
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
  }

  // Create the controls
  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    const container = this.canvas.parentElement;
    if(container) {
      container.appendChild(renderer.domElement);
    }
    if (this.camera && this.scene) {
      this.controls = new OrbitControls(this.camera, renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.enableZoom = true;
      this.controls.enablePan = true;
      this.controls.update();
    }
  };

  // Create the scene
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.scene.fog = new THREE.Fog(0x000000, 1, 10);

    const planeGeometry = new THREE.PlaneGeometry(10, 10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, opacity: 1, transparent: true});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0,0,0);
    this.scene.add(plane);
    plane.castShadow = false;
    plane.receiveShadow = true;

    this.loaderGLTF.load('assets/robot/scene.gltf', (gltf: GLTF):void => {
      this.model = gltf.scene.children[0];
      console.log(this.model);

      if(this.model) {
        const box = new THREE.Box3().setFromObject(this.model);

        const size = new THREE.Vector3();
        box.getSize(size);

        const center = new THREE.Vector3();
        box.getCenter(this.model.position);

        const desiredScale = 3;
        const scaleV3 = new THREE.Vector3().setScalar(desiredScale);
        const scaleTemp = new THREE.Vector3().copy(scaleV3).divide(size);
        const scale = Math.min(scaleTemp.x, Math.min(scaleTemp.y, scaleTemp.z));

        this.model.scale.setScalar(scale);
        this.model.position.set(0, size.y * scale / 2 - this.model.position.y * scale, 0);
        this.scene!.add(this.model);
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.camera?.lookAt(center);
      }
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.rotation.y = Math.PI/6;
    this.camera.position.set(3,1,2);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0xffffff, 5);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0xffffff, 5);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0xffffff, 5);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0xffffff, 5);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  // Start the rendering loop
  private startRenderingLoop() {
    // Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: ModelComponent = this;
    (function render() {
      if (component.scene && component.camera && component.renderer) {
        component.renderer.render(component.scene, component.camera);
      }
     //component.animateModel();
      requestAnimationFrame(render);
    }());
  }

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
}
