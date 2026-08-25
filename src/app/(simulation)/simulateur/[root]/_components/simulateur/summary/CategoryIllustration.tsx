'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import Image from 'next/image'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export default function CategoryIllustration({
  category,
  shouldHideIllustration,
}: {
  category: DottedName
  shouldHideIllustration?: boolean
}) {
  const { t } = useClientTranslation()

  const categoryProps = useMemo(() => {
    switch (category) {
      case 'transport':
        return {
          src: '/images/illustrations/transport.png',
          alt: t('Vélo devant une rivière'),
          className: '',
        }
      case 'alimentation':
        return {
          src: '/images/illustrations/alimentation.png',
          alt: t('Jus de fruits'),
          className: '',
        }
      case 'logement':
        return {
          src: '/images/illustrations/logement.png',
          alt: t('Une chambre'),
          className: 'min-w-[200px]',
        }
      case 'divers':
        return {
          src: '/images/illustrations/divers.png',
          alt: t('Paysage'),
          className: '',
        }
      case 'services sociétaux':
        return null
      default:
        return null
    }
  }, [category, t])

  if (!categoryProps || shouldHideIllustration) {
    return null
  }

  return (
    <Image
      src={categoryProps.src}
      alt={categoryProps.alt}
      width={300}
      height={500}
      className={twMerge(
        'bottom-0 ml-auto block max-w-[140px] md:static md:left-auto md:top-auto md:mx-auto md:max-w-[240px] md:opacity-100',
        categoryProps.className ?? ''
      )}
    />
  )
}
