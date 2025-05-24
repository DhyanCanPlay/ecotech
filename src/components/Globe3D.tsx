'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import LoadingSpinner from './LoadingSpinner'

interface Globe3DProps {
  className?: string
}

export default function Globe3D({ className = '' }: Globe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const earthRef = useRef<THREE.Object3D>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const animationRef = useRef<number>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Stars background
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 500
    const starsArray = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount * 3; i++) {
      starsArray[i] = (Math.random() - 0.5) * 20
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsArray, 3))
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Load GLB Earth model
    const loader = new GLTFLoader()
    const modelUrl = '/l.glb' // Path relative to the public directory
    loader.load(
      modelUrl,
      (gltf) => {
      const earth = gltf.scene
      earth.scale.set(1, 1, 1) // Adjust scale if needed
      scene.add(earth)
      earthRef.current = earth
      setIsLoading(false)
      },
      undefined,
      (error) => {
      console.error('Error loading GLB:', error)
      setIsLoading(false)
      }
    )

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      if (earthRef.current) {
        earthRef.current.rotation.y += 0.003
      }

      if (cameraRef.current) {
        const time = Date.now() * 0.0003
        cameraRef.current.position.x = Math.sin(time) * 0.2
        cameraRef.current.position.y = Math.cos(time * 0.8) * 0.15
        cameraRef.current.lookAt(0, 0, 0)
      }

      stars.rotation.x += 0.0002
      stars.rotation.y += 0.0002

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      rendererRef.current?.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative ${className}`}
      style={{ minHeight: '500px' }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}
