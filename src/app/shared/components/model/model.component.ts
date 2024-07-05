import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})

export class ModelComponent implements OnInit, AfterViewInit {

  @Input() objectUrl: string = '';

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
  // private createControls = () => {
  //   const renderer = new CSS2DRenderer();
  //   renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  //   renderer.domElement.style.position = 'absolute';
  //   renderer.domElement.style.top = '0px';
  //   renderer.domElement.style.width = 'auto';
  //   renderer.domElement.style.height = 'auto';
  //   const container = this.canvas.parentElement;
  //   if(container) {
  //     container.appendChild(renderer.domElement);
  //   }
  //   if (this.camera && this.scene) {
  //     this.controls = new OrbitControls(this.camera,renderer.domElement);
  //     this.controls.autoRotate = true;
  //     this.controls.enableZoom = true;
  //     this.controls.enablePan = true;
  //     console.log("controls")
  //     this.controls.update();
  //     console.log("controles updated",this.controls)

  //   }
  // };
  private createControls() {
    if (this.camera && this.renderer) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.enableZoom = true;
      this.controls.enablePan = true;
      this.controls.update();
    }
  }

  // Create the scene
  private createScene() {
      //* Scene
  this.scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('assets/bg-1-full.jpg', (texture) => {
    this.scene!.background = texture;
  });

  this.loaderGLTF.load('assets/robot/scene.gltf', (gltf: GLTF): void => {
    this.model = gltf.scene;
    console.log(this.model);

    if (this.model) {
      // Calculate the bounding box of the model
      const box = new THREE.Box3().setFromObject(this.model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDimension = Math.max(size.x, size.y, size.z);

      // Define the desired size (e.g., 10 units)
      const desiredSize = 300;

      // Calculate the scaling factor
      const scaleFactor = desiredSize / maxDimension;

      // Apply the scaling factor to the model
      this.model.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Recalculate the bounding box after scaling
      const newBox = new THREE.Box3().setFromObject(this.model);
      const newCenter = new THREE.Vector3();
      newBox.getCenter(newCenter);

      // Center the model
      this.model.position.sub(newCenter);


      this.scene!.add(this.model);
      this.model.castShadow = true;
      this.model.receiveShadow = true;
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
    // this.camera.rotation.y = Math.PI/6;
    this.camera.position.x = -150;
    this.camera.position.y = 100;
    this.camera.position.z = 250;
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
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true,alpha: true });
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

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.createScene();
      this.startRenderingLoop();
      this.createControls();
    }
  }
}
