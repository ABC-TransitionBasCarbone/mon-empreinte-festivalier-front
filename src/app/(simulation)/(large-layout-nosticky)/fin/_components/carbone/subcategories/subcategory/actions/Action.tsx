import { defaultMetric } from '@/constants/metric'
import {
  getBackgroundLightColor,
} from '@/helpers/getCategoryColorClass'
import { useCurrentSimulation, useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import { twMerge } from 'tailwind-merge'
import Card from './Card'

const colorClassName = ['200', '100', '50']

type Props = {
  action: DottedName
  index: number
  metric?: Metric
}

export default function Action({
  action,
  index,
  metric = defaultMetric,
}: Props) {
  const { actionChoices } = useCurrentSimulation()

  const isActionChoosen = actionChoices[action] === true

  const { numericValue: total } = useRule('bilan', metric)

  const { icons, title, numericValue, category } = useRule(action, metric)

  const hasNoValue = numericValue === 0

  const percent = Math.round((numericValue / total) * 100)

  return (
    <Card
      title={title}
      icon={icons}
      percent={!hasNoValue ? percent : undefined}
      category={category}
      isSelected={isActionChoosen}
      showPercentFallback
      className={twMerge(
        'min-h-[150px] min-w-[30%] ml-4',
        colorClassName[index],
        isActionChoosen
          ? 'bg-green-100'
          : getBackgroundLightColor(category).replace('100', colorClassName[index])
      )}
    />
  )
}
