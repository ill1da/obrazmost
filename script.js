// КУБ
document.addEventListener('DOMContentLoaded', () => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Set alpha to true for transparency
    const targetDiv = document.querySelector('.right-slide');
  
    // Set canvas size to match the target div
    const width = targetDiv.clientWidth;
    const height = targetDiv.clientHeight;
    renderer.setSize(width, height);
  
    document.body.appendChild(renderer.domElement);
  
    // Create a glass-like material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x7E51D6,
      metalness: 0, 
      roughness: 1,
      thickness: 5,
      transparency: 1, 
      transparent: true,
      refractionRatio: 1,
      refraction: true,
      refractiveIndex: 1.5,
    });
  
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  
    // Add lights for even illumination
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.5);
    scene.add(hemisphereLight);
  
    // Remove axes helper (optional)
    scene.remove(scene.children.find(child => child instanceof THREE.AxesHelper));
  
    // Position the camera
    camera.position.z = 5;
  
    // Ensure cube maintains proportions
    const updateCameraAspect = () => {
      const aspect = targetDiv.clientWidth / targetDiv.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };
  
    // Rotate the cube
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.006;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
  
    // Handle window and target div resize
    const observer = new ResizeObserver(() => {
      const newWidth = targetDiv.clientWidth;
      const newHeight = targetDiv.clientHeight;
      renderer.setSize(newWidth, newHeight);
      updateCameraAspect();
    });
  
    observer.observe(targetDiv);
    window.addEventListener('resize', () => {
      const newWidth = targetDiv.clientWidth;
      const newHeight = targetDiv.clientHeight;
      renderer.setSize(newWidth, newHeight);
      updateCameraAspect();
    });
  
    // Append the renderer to the target div
    targetDiv.appendChild(renderer.domElement);
  
    // Initialize camera aspect
    updateCameraAspect();
  
    // Start animation
    animate();
  });