"use client";
import { useState, useRef } from 'react'
import useMount from 'react-use/esm/useMount'
import useInterval from '@/hooks/useInterval'
import { loadImage } from '@/lib/utils'

const images = [
  '/images/react-snippet.png',
  '/images/laravel-snippet.png',
  '/images/html-snippet.png',
]

function loadAllImages() {
  Promise.all(images.map(loadImage))
}

export default function SlideShow() {
  const [index, setIndex] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)

  useMount(() => {
    loadAllImages()
  })

  useInterval(nextSlide, 6000)

  function nextSlide() {
    setIndex(index => (index >= (images.length - 1)) ? 0 : (index + 1))
  }

  return (
    <img
      ref={imgRef}
      src={images[index]}
      className={"block md:hidden shrink-0 object-cover object-top aspect-16/15 md:w-[40%] xl:w-[45%] rounded-lg shadow-lg transition-opacity opacity-100 not-md:-mt-[32px]"}
    />
  )
}
