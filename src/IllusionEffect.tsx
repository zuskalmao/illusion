import React, { useState, useRef, useEffect, useCallback } from 'react'

const GRID_SIZE = 15 // Adjust grid size for more/less dots
const DOT_SIZE = 8 // Size of each dot in pixels
const INTERACTION_RADIUS = 150 // How far the mouse affects the dots

const IllusionEffect: React.FC = () => {
  // State for the rendered mouse position (updated in animation frame)
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })
  // Ref to store the latest raw mouse position immediately
  const latestMousePos = useRef({ x: -9999, y: -9999 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | null>(null)

  // Update mouse position state in an animation frame
  const updateMousePosition = useCallback(() => {
    setMousePos(latestMousePos.current)
    animationFrameId.current = requestAnimationFrame(updateMousePosition)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        // Store the latest position immediately in the ref
        latestMousePos.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
      }
    }

    const handleMouseLeave = () => {
      // Reset latest position immediately
      latestMousePos.current = { x: -9999, y: -9999 }
    }

    const currentRef = containerRef.current
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove)
      currentRef.addEventListener('mouseleave', handleMouseLeave)
      // Start the animation frame loop
      animationFrameId.current = requestAnimationFrame(updateMousePosition)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove)
        currentRef.removeEventListener('mouseleave', handleMouseLeave)
      }
      // Cancel the animation frame on cleanup
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [updateMousePosition]) // Add updateMousePosition to dependency array

  const renderDots = () => {
    const dots = []
    const containerWidth = containerRef.current?.clientWidth ?? 0
    const containerHeight = containerRef.current?.clientHeight ?? 0
    // Ensure we don't divide by zero if container size is initially 0
    if (containerWidth === 0 || containerHeight === 0) return null;

    const spacingX = containerWidth / (GRID_SIZE + 1)
    const spacingY = containerHeight / (GRID_SIZE + 1)

    for (let i = 1; i <= GRID_SIZE; i++) {
      for (let j = 1; j <= GRID_SIZE; j++) {
        const dotX = i * spacingX
        const dotY = j * spacingY

        // Use the state `mousePos` for rendering, which is updated smoothly
        const dx = dotX - mousePos.x
        const dy = dotY - mousePos.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate effect based on distance
        const effect = Math.max(0, 1 - distance / INTERACTION_RADIUS)
        const scale = 1 + effect * 1.5 // Scale up dots closer to the mouse
        const opacity = 0.3 + effect * 0.7 // Increase opacity closer to the mouse
        const blur = (1 - effect) * 3 // Blur dots further away

        dots.push(
          <div
            key={`${i}-${j}`}
            className="illusion-dot"
            style={{
              // Use translate for potentially smoother positioning updates than left/top
              transform: `translate(${dotX - DOT_SIZE / 2}px, ${dotY - DOT_SIZE / 2}px) scale(${scale})`,
              width: `${DOT_SIZE}px`,
              height: `${DOT_SIZE}px`,
              opacity: opacity,
              filter: `blur(${blur}px)`,
            }}
          />
        )
      }
    }
    return dots
  }

  return (
    <div
      ref={containerRef}
      className="interactive-illusion-container relative w-full h-full overflow-hidden"
    >
      {renderDots()}
    </div>
  )
}

export default IllusionEffect
