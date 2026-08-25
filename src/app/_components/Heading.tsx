'use client'

import Trans from '@/components/translation/Trans'
import Buttons from './heading/Buttons'
import Partners from './heading/Partners'
import Image from 'next/image'
import { TerritoriesType } from '@/utils/territories'
import { homePageTexts } from '@/constants/territories/homePage'

export default function Heading({ territory }: { territory: TerritoriesType }) {
  const image = homePageTexts[territory].backgroundImage ?? homePageTexts['general'].backgroundImage;

  return (
    <>
      {image ? <Image src={image.src} alt="background" width={image.width} height={image.height}
        className="self-center absolute w-full flex h-[588px] items-center justify-center overflow-hidden md:h-[36rem]" /> : null}
      <div className="relative flex h-[588px] items-center justify-center overflow-hidden p-4 md:h-[36rem]">
        <div className="relative mb-2 max-w-sm text-center md:mb-0 md:max-w-2xl text-white">
          <h1 className="md:text-5xl" style={{ textShadow: '1px 4px 10px black' }}>
            <Trans>MON EMPREINTE FESTIVALIER : Connaissez vous l’empreinte carbone de votre festival ?</Trans>
          </h1>
          <p className="md:text-2xl" style={{ textShadow: '1px 4px 10px black' }}>
            Obtenez une estimation en seulement 5 minutes !
          </p>
          <Buttons />
        </div>
      </div>
      <Partners territory={territory} />
    </>
  )
}
