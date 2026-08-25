'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Slide
  from '@/app/(simulation)/(large-layout-nosticky)/fin/_components/carbone/subcategories/subcategory/actions/Slide'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import Action from './Action'

type Props = {
  informations: DottedName[] | undefined
  category: string
  regionalInfo?: boolean
}

export default function Carousel({ informations, category, regionalInfo }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect, informations?.length])

  return (
    <>
      {informations && informations.length > 0 && (
        <div>
          <div className="relative overflow-hidden w-full p-4" ref={emblaRef}>
            <div className={twMerge(
              "flex flex-nowrap",
              informations.length < 3 ? "justify-center" : ""
            )}>
              {informations.map((ruleName, index) => (
                regionalInfo ? <Slide key={ruleName} ruleName={ruleName} category={category} index={index} /> : <Action key={ruleName} action={ruleName} index={index} />
              ))}
            </div>
            {
              informations.length > 3 && <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-primary-700 bg-opacity-70 p-3 text-white border-2 border-primary-700 shadow-sm hover:bg-primary-900 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <button
                  onClick={scrollNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-primary-700 bg-opacity-70 p-3 text-white border-2 border-primary-700 shadow-sm hover:bg-primary-900 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button></>}
          </div>
          {informations.length > 3 && <div className="flex">
            <div className="ml-auto flex justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                  className={twMerge(
                    'h-3 w-3 rounded-full',
                    selectedIndex === index ? 'bg-primary-900' : 'bg-gray-300'
                  )}
                />
              ))}
            </div>
          </div>}
        </div>
      )}
    </>
  )
}
