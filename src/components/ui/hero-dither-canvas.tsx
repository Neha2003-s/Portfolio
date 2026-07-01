import { useEffect, useRef } from "react"
import * as THREE from "three"

const fragmentShader = `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_time;
uniform float u_mouse_radius;
uniform float u_mouse_strength;
uniform bool u_has_mouse;

void main() {
    vec2 uv = v_texcoord;
    
    if (u_has_mouse) {
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 delta = (uv - u_mouse) * aspect;
        float dist = length(delta);
        
        if (dist < u_mouse_radius) {
            float strength = (u_mouse_radius - dist) / u_mouse_radius;
            float warp = sin(strength * 3.14159) * u_mouse_strength;
            uv += normalize(delta) * warp / aspect;
        }
    }
    
    vec4 texColor = texture2D(u_texture, uv);
    
    float alpha = texColor.a;
    float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    
    vec3 finalColor = vec3(0.04, 0.04, 0.04);
    
    bool isBackground = (alpha < 0.15) || (luma > 0.95);
    
    if (!isBackground) {
        if (luma < 0.35) {
            finalColor = vec3(0.94, 0.92, 0.88);
        } else {
            finalColor = vec3(0.83, 0.17, 0.17);
        }
    }
    
    gl_FragColor = vec4(finalColor, alpha);
}
`

export function HeroDitherCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5))
  const hasMouseRef = useRef<boolean>(false)
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5))

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
    })
    rendererRef.current = renderer

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load("/hero-dithered.svg")
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 v_texcoord;
        void main() {
          v_texcoord = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader,
      uniforms: {
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_texture: { value: texture },
        u_time: { value: 0 },
        u_mouse_radius: { value: 0.15 },
        u_mouse_strength: { value: 0.08 },
        u_has_mouse: { value: false },
      },
      transparent: true,
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const updateSize = () => {
      if (!containerRef.current || !rendererRef.current || !materialRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      rendererRef.current.setSize(w, h)
      materialRef.current.uniforms.u_resolution.value.set(w, h)
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    let animationFrameId: number

    const animate = (time: number) => {
      if (materialRef.current) {
        materialRef.current.uniforms.u_time.value = time * 0.001

        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1

        materialRef.current.uniforms.u_mouse.value.copy(mouseRef.current)
        materialRef.current.uniforms.u_has_mouse.value = hasMouseRef.current
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height
      targetMouseRef.current.set(x, y)
      hasMouseRef.current = true
    }

    const handleMouseLeave = () => {
      hasMouseRef.current = false
    }

    const container = containerRef.current
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", updateSize)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}

export default HeroDitherCanvas
