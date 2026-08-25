import Link from '@/components/Link'
import { homePageTexts } from '@/constants/territories/homePage'
import { TerritoriesType } from '@/utils/territories'
import Image from 'next/image'

export default function Partners({ territory }: { territory: TerritoriesType }) {
  const additionnalPartners = homePageTexts[territory].additionnalPartners

  return (
    <div className=" mb-4 flex justify-center md:-mt-10">
      <div className="relative mb-4 flex items-center justify-center gap-6 rounded-full bg-white py-4 md:mb-0 md:gap-8 md:px-24 md:py-10">
        <Link href="https://abc-transitionbascarbone.fr" target="_blank">
          <Image
            src="/images/misc/logo-abc-web.webp"
            alt="Logo de l'Association pour la transition Bas Carbone"
            width="90"
            height="30"
            className="h-auto w-20"
          />
        </Link>
        {additionnalPartners?.map((partner, idx) => <Link href={partner.href} target="_blank" key={`partner-${idx}`}>
          <Image
            src={partner.src}
            alt={partner.alt}
            width={partner.width}
            height={partner.height}
            className={`h-auto, ${partner.smallWidth ? 'w-24' : 'w-32'}`}
          />
        </Link>)}
      </div>
    </div>
  )
}
