import { type RefObject, useEffect, useState } from 'react'

export interface Dimensions {
  width: number
  height: number
}

/**
 * Hook to track container dimensions using ResizeObserver.
 * Automatically updates when the container is resized.
 *
 * @param containerRef - React ref to the container element
 * @param initialDimensions - Initial dimensions before first measurement
 * @returns Current dimensions of the container
 */
export function useContainerDimensions(
  containerRef: RefObject<HTMLElement | null>,
  initialDimensions: Dimensions = { width: 400, height: 300 },
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()

    const observer = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [containerRef])

  return dimensions
}
