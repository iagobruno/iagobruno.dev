import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!delay && delay !== 0) return;

    const id = setInterval(() => savedCallback.current(), delay)

    return () => {
      clearInterval(id)
    }
  }, [delay])
}
