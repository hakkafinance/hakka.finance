import { toPng } from 'html-to-image'
import { RefObject, useCallback, useRef } from 'react'

interface IResponse {
  eleRef: RefObject<HTMLDivElement>
  downloadImage(): void
}

export default function useHtmlToImage(): IResponse {
  const eleRef = useRef<HTMLDivElement>(null)

  const downloadImage = useCallback(() => {
    if (!eleRef.current) return
    toPng(eleRef.current, {
      cacheBust: true,
      skipAutoScale: true,
    }).then((dataUrl) => {
      if (!dataUrl) return
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'image.png'
      link.click()
    })
  }, [])

  return { eleRef, downloadImage }
}
