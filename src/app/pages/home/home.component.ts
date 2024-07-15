import { Component, HostListener, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ArtServiceService } from './service/art-service.service';
import { ArtistServieService } from './service/artist-servie.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit  {
  artsData: any = {};
  artistsData: any = {};
  searchTerm: string = ''; // Added property to store search term

  currentIndex: number = 0;
  currentArtistIndex: number = 0;
  itemWidth: number = 25;
  gap: number = 16;
  dataLoaded: boolean = false;
  artData: any;
  categoryData: any[] = [];

  @ViewChild('canvas') private canvasRef: ElementRef | undefined
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

  private isBrowser: boolean | undefined;
  public loading: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ArtServiceService: ArtServiceService,
    private ArtistServieService: ArtistServieService,
    private router: Router
  ) {this.isBrowser = isPlatformBrowser(platformId);}



  ngOnInit(): void {
    this.getArtwork();
    this.loadArtistData();
    this.updateItemWidth();
  }

  loadArtistData(): void {
    this.ArtistServieService.getArtist().subscribe(
      (data: any[]) => {
        console.log(data);
        this.artistsData = data;
        this.dataLoaded = true;
      },
      (error) => {
        console.error('Error fetching artist data: ', error);
      }
    );
  }

  getArtwork(): void {
    this.ArtServiceService.getArtwork().subscribe(
      (data: any[]) => {
        console.log(data);
        this.artsData = data;
        this.dataLoaded = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // Method to handle search form submission
  onSearchSubmit(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search-art'], {
        queryParams: { q: this.searchTerm },
      });
    }
  }
  // logout() {
  //     // Clear local storage items related to user session
  //     localStorage.removeItem('uid');
  //     localStorage.removeItem('role');
  //     localStorage.removeItem('user_id');
  //     localStorage.removeItem('email');
  //     localStorage.removeItem('firebase_uid');

  //     // Navigate to the login page or home page after logout
  //     this.router.navigate(['/login']);
  //   }

  next(): void {
    if (this.currentIndex < this.artsData.length - 100 / this.itemWidth) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCarousel('.artwork-carousel', this.currentIndex);
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.artData.length - 100 / this.itemWidth;
    }
    this.updateCarousel('.artwork-carousel', this.currentIndex);
  }

  nextArtist(): void {
    if (
      this.currentArtistIndex <
      this.artistsData.length - 100 / this.itemWidth
    ) {
      this.currentArtistIndex++;
    } else {
      this.currentArtistIndex = 0;
    }
    this.updateCarousel('.artist-carousel', this.currentArtistIndex);
  }

  prevArtist(): void {
    if (this.currentArtistIndex > 0) {
      this.currentArtistIndex--;
    } else {
      this.currentArtistIndex = this.artistsData.length - 100 / this.itemWidth;
    }
    this.updateCarousel('.artist-carousel', this.currentArtistIndex);
  }

  updateCarousel(selector: string, index: number): void {
    const carousel = document.querySelector(selector) as HTMLElement;
    const gapAdjustment = (this.gap / window.innerWidth) * 100;
    const translateValue = -(index * (this.itemWidth + gapAdjustment));
    carousel.style.transform = `translateX(${translateValue}%)`;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateItemWidth();
  }

  updateItemWidth(): void {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.itemWidth = 25;
    } else if (width >= 992 && width < 1200) {
      this.itemWidth = 33.33;
    } else if (width >= 768 && width < 992) {
      this.itemWidth = 50;
    } else {
      this.itemWidth = 100;
    }
    this.updateCarousel('.artwork-carousel', this.currentIndex);
    this.updateCarousel('.artist-carousel', this.currentArtistIndex);
  }

  viewArtwork(artworkId: string): void {
    this.router.navigate(['/preview', artworkId]);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  private animateModel() {
    if (this.model) {
      this.model.rotation.y += 0.005;
    }
  }

  private createControls() {
    if (this.camera && this.renderer) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 1.0;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.minPolarAngle = Math.PI / 2;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.update();
    }
  }

  private createScene() {
    this.scene = new THREE.Scene();

    //this.scene!.background = new THREE.Color(0x1A1A1A);

    this.loaderGLTF.load('assets/house/scene.gltf', (gltf: GLTF): void => {
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
    let component: HomeComponent = this;
    (function render() {
      if (component.scene && component.camera && component.renderer) {
        component.renderer.render(component.scene, component.camera);
        component.controls?.update();  // Ensure the controls are updated
        component.animateModel();      // Ensure the model is animated
      }
      requestAnimationFrame(render);
    }());
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.createScene();
      this.startRenderingLoop();
      this.createControls();
    }
  }


}
