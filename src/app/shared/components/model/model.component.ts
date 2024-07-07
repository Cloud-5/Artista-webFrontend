// import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
// import * as THREE from "three";
// import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { isPlatformBrowser } from '@angular/common';


// @Component({
//   selector: 'app-model',
//   templateUrl: './model.component.html',
//   styleUrls: ['./model.component.scss']
// })

// export class ModelComponent implements OnInit, AfterViewInit {

//   @Input() objectUrl: string = '';
//   @Input() textureUrl: string = 'assets/bg-1-full.jpg';
//   //@Input() textureUrl: string = '';

//   @ViewChild('canvas') private canvasRef: ElementRef | undefined;

//   // Stage Properties
//   @Input() public fieldOfView: number = 75;
//   @Input('nearClipping') public nearClippingPane: number = 0.1;
//   @Input('farClipping') public farClippingPane: number = 1000;

//   // Scene properties
//   private camera: THREE.PerspectiveCamera | undefined;
//   private controls: OrbitControls | undefined;
//   private ambientLight: THREE.AmbientLight | undefined;
//   private light1: THREE.PointLight | undefined;
//   private light2: THREE.PointLight | undefined;
//   private light3: THREE.PointLight | undefined;
//   private light4: THREE.PointLight | undefined;
//   private model: any;
//   private directionalLight: THREE.DirectionalLight | undefined;

//   // Helper Properties

//   private get canvas(): HTMLCanvasElement {
//     return this.canvasRef?.nativeElement;
//   }

//   private loaderGLTF = new GLTFLoader();
//   private renderer: THREE.WebGLRenderer | undefined;
//   private scene: THREE.Scene | undefined;

  
//   // Animate the model
//   private animateModel() {
//     if (this.model) {
//       this.model.rotation.z += 0.005;
//     }
//   }
//   // Create the controls
//   private createControls() {
//     if (this.camera && this.renderer) {
//       this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//       this.controls.autoRotate = true;
//       this.controls.enableZoom = true;
//       this.controls.enablePan = true;
//       this.controls.update();
//     }
//   }

//   // Create the scene
//   private createScene() {
//       //* Scene
//   this.scene = new THREE.Scene();

//   if(this.textureUrl){
//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load(this.textureUrl, (texture) => {
//       this.scene!.background = texture;
//     });
//   } else {
//     this.scene!.background = new THREE.Color(0x1A1A1A);
//   }
 

//   this.loaderGLTF.load(this.objectUrl, (gltf: GLTF): void => {
//     this.model = gltf.scene;
//     console.log(this.model);

//     if (this.model) {
//       // Calculate the bounding box of the model
//       const box = new THREE.Box3().setFromObject(this.model);
//       const size = new THREE.Vector3();
//       box.getSize(size);
//       const maxDimension = Math.max(size.x, size.y, size.z);

//       // Define the desired size 
//       const desiredSize = 300;

//       // Calculate the scaling factor
//       const scaleFactor = desiredSize / maxDimension;

//       // Apply the scaling factor to the model
//       this.model.scale.set(scaleFactor, scaleFactor, scaleFactor);

//       // Recalculate the bounding box after scaling
//       const newBox = new THREE.Box3().setFromObject(this.model);
//       const newCenter = new THREE.Vector3();
//       newBox.getCenter(newCenter);

//       // Center the model
//       this.model.position.sub(newCenter);


//       this.scene!.add(this.model);
//       this.model.castShadow = true;
//       this.model.receiveShadow = true;
//       this.hideLoader();
//       }
//     }, undefined,(error) => {
//       console.error(error);
//       this.hideLoader();
//     });
//     //*Camera
//     let aspectRatio = this.getAspectRatio();
//     this.camera = new THREE.PerspectiveCamera(
//       this.fieldOfView,
//       aspectRatio,
//       this.nearClippingPane,
//       this.farClippingPane
//     )
//     // this.camera.rotation.y = Math.PI/6;
//     this.camera.position.x = -150;
//     this.camera.position.y = 100;
//     this.camera.position.z = 250;
//     this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     this.scene.add(this.ambientLight);
//     this.directionalLight = new THREE.DirectionalLight(0xffffff, 7);
//     this.directionalLight.position.set(0, 1, 0);
//     this.directionalLight.castShadow = true;
//     this.scene.add(this.directionalLight);
//     this.light1 = new THREE.PointLight(0xffffff, 1);
//     this.light1.position.set(0, 200, 400);
//     this.scene.add(this.light1);
//     this.light2 = new THREE.PointLight(0xffffff, 1);
//     this.light2.position.set(500, 100, 0);
//     this.scene.add(this.light2);
//     this.light3 = new THREE.PointLight(0xffffff, 1);
//     this.light3.position.set(0, 100, -500);
//     this.scene.add(this.light3);
//     this.light4 = new THREE.PointLight(0xffffff, 1);
//     this.light4.position.set(-500, 300, 500);
//     this.scene.add(this.light4);
//   }

//   private getAspectRatio() {
//     return this.canvas.clientWidth / this.canvas.clientHeight;
//   }

//   // Start the rendering loop
//   private startRenderingLoop() {
//     // Renderer
//     // Use canvas element in template
//     this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true,alpha: true });
//     this.renderer.setPixelRatio(devicePixelRatio);
//     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
//     let component: ModelComponent = this;
//     (function render() {
//       if (component.scene && component.camera && component.renderer) {
//         component.renderer.render(component.scene, component.camera);
//       }
//       //component.animateModel();
//       requestAnimationFrame(render);
//     }());
//   }

//   private isBrowser: boolean;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     this.isBrowser = isPlatformBrowser(platformId);
//   }

//   ngOnInit(): void {

//   }

//   ngAfterViewInit() {
//     if (this.isBrowser) {
//       this.createScene();
//       this.startRenderingLoop();
//       this.createControls();
//       this.addEventListeners();
//     }
//   }

//   private addEventListeners() {
//     const resetButton = document.getElementById('resetButton');
//     const fullscreenButton = document.getElementById('fullscreenButton');

//     resetButton?.addEventListener('click', () => this.resetPosition());
//     fullscreenButton?.addEventListener('click', () => this.toggleFullScreen());
//   }

//   private resetPosition() {
//     if (this.controls) {
//       this.controls.reset();
//     }
//   }

//   private toggleFullScreen() {
//     if (!document.fullscreenElement) {
//       this.canvas.requestFullscreen().catch(err => {
//         alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
//       });
//     } else {
//       document.exitFullscreen();
//     }
//   }
//   private hideLoader() {
//     const loader = document.getElementById('loader');
//     if (loader) {
//       loader.style.display = 'none';
//     }
//   }
// }

import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit, AfterViewInit {

  @Input() objectUrl: string = '';
  @Input() textureUrl: string = 'assets/bg-1-full.jpg';

  @ViewChild('canvas') private canvasRef: ElementRef | undefined;

  @Input() public fieldOfView: number = 75;
  @Input('nearClipping') public nearClippingPane: number = 0.1;
  @Input('farClipping') public farClippingPane: number = 1000;

  private camera: THREE.PerspectiveCamera | undefined;
  private controls: OrbitControls | undefined;
  private ambientLight: THREE.AmbientLight | undefined;
  private light1: THREE.PointLight | undefined;
  private light2: THREE.PointLight | undefined;
  private light3: THREE.PointLight | undefined;
  private light4: THREE.PointLight | undefined;
  private model: any;
  private directionalLight: THREE.DirectionalLight | undefined;

  private loaderGLTF = new GLTFLoader();
  private renderer: THREE.WebGLRenderer | undefined;
  private scene: THREE.Scene | undefined;

  private isBrowser: boolean;
  public loading: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  private animateModel() {
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
  }

  private createControls() {
    if (this.camera && this.renderer) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.enableZoom = true;
      this.controls.enablePan = true;
      this.controls.update();
    }
  }

  private createScene() {
    this.scene = new THREE.Scene();

    if (this.textureUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(this.textureUrl, (texture) => {
        this.scene!.background = texture;
      });
    } else {
      this.scene!.background = new THREE.Color(0x1A1A1A);
    }

    this.loaderGLTF.load(this.objectUrl, (gltf: GLTF): void => {
      this.model = gltf.scene;

      if (this.model) {
        const box = new THREE.Box3().setFromObject(this.model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const desiredSize = 300;
        const scaleFactor = desiredSize / maxDimension;
        this.model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        const newBox = new THREE.Box3().setFromObject(this.model);
        const newCenter = new THREE.Vector3();
        newBox.getCenter(newCenter);
        this.model.position.sub(newCenter);

        this.scene!.add(this.model);
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.loading = false; // Hide the loader
      }
    }, undefined, (error) => {
      console.error(error);
      this.loading = false; // Hide the loader on error
    });

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.x = -150;
    this.camera.position.y = 100;
    this.camera.position.z = 250;

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 7);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.light1 = new THREE.PointLight(0xffffff, 1);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);

    this.light2 = new THREE.PointLight(0xffffff, 1);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);

    this.light3 = new THREE.PointLight(0xffffff, 1);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);

    this.light4 = new THREE.PointLight(0xffffff, 1);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: ModelComponent = this;
    (function render() {
      if (component.scene && component.camera && component.renderer) {
        component.renderer.render(component.scene, component.camera);
      }
      requestAnimationFrame(render);
    }());
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.createScene();
      this.startRenderingLoop();
      this.createControls();
      this.addEventListeners();
    }
  }

  private addEventListeners() {
    const resetButton = document.getElementById('resetButton');
    const fullscreenButton = document.getElementById('fullscreenButton');

    resetButton?.addEventListener('click', () => this.resetPosition());
    fullscreenButton?.addEventListener('click', () => this.toggleFullScreen());
  }

  private resetPosition() {
    if (this.controls) {
      this.controls.reset();
    }
  }

  private toggleFullScreen() {
    if (!document.fullscreenElement) {
      this.canvas.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
