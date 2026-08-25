'use client'

import { actionsClickFilter } from '@/constants/tracking/pages/actions'
import {
  getBackgroundColor,
  getBackgroundLightColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import { useSearchParams } from 'next/navigation'

type Props = {
  dottedName: DottedName
  countByCategory: any
}

export default function Filter({ dottedName, countByCategory }: Props) {
  const { title } = useRule(dottedName)
  const { setQueryParams } = useQueryParams()

  const metric = useSearchParams().get('métrique') || ''
  const categorySelected = useSearchParams().get('catégorie') || ''

  const isSelected = categorySelected === dottedName

  const buildURL = () => {
    const searchParamsStart = metric || !isSelected ? '?' : ''

    const metricSearchParam = metric ? `métrique=${metric}&` : ''

    setQueryParams({
      searchParamsPart: `${searchParamsStart}${metricSearchParam}${isSelected ? '' : `catégorie=${dottedName}`}`,
    })
  }

  return (
    <li
      className={`height-[1.8rem] rounded-md ${!categorySelected || categorySelected === dottedName
        ? getBackgroundLightColor(dottedName)
        : 'bg-gray-200'
        }`}
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        className={`p-2 text-xs font-bold ${getTextDarkColor(dottedName)}`}
        onClick={() => {
          trackEvent(actionsClickFilter(dottedName))
          buildURL()
        }}>
        {title}{' '}
        <span
          className={`ml-2 inline-block w-4 rounded-full bg-white ${getTextDarkColor(dottedName)}`}>
          {countByCategory[dottedName] || 0}
        </span>
      </button>
    </li>
  )
}
