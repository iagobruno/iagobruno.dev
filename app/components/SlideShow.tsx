"use client";
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { eventListenerTrigger, loadImage } from '../helpers'

const images = [
  '/snippets/html.png',
  '/snippets/react.png',
  '/snippets/laravel.png',
]

export default function SlideShow({ duration = 6_000 }) {
  const [index, setIndex] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    loadAllImages()

    const interval = setInterval(nextSlide, duration)
    return () => clearInterval(interval)
  }, [])

  async function nextSlide() {
    setIndex(index => (index >= (images.length - 1)) ? 0 : (index + 1))
  }

  function loadAllImages () {
    Promise.all(images.map(loadImage))
  }

  return (
    <img
      ref={imgRef}
      src={images[index]}
      className={"block md:w-[40%] rounded-md shadow-lg transition-opacity opacity-100"}
    />
  )
}
