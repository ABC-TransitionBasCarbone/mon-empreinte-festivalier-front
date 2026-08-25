'use client'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { useTempEngine, useUser } from '@/publicodes-state'

import { Post } from '@/types/posts'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import {
  DottedName,
  NGCRule,
  NGCRules,
} from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'

type Props = {
  actions: Post[]
}
export default function ActionPlusList({ actions }: Props) {
  const { rules } = useTempEngine()
  const { territory } = useUser()

  if (!rules) return null

  const plusListe = Object.entries(rules as NGCRules)
    .map(([dottedName, rule]) => ({ ...rule, dottedName }))
    .map((rule) => {
      const plus = actions.find(
        (action) => action.slug === rule.dottedName
      )?.content
      return { ...rule, plus }
    })
    .filter((r) => r.plus)

  return (
    <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-3">
      {plusListe.map((rule) => (
        <li key={rule.dottedName}>
          <Card
            className="h-[12rem] flex-col items-center justify-center no-underline!"
            tag={Link}
            href={'/actions/plus/' + encodeRuleName(rule.dottedName)}>
            <div className="mb-8 text-2xl">{rule.icônes || '🎯'}</div>
            <div className="text-center">
              {getRuleTitle(
                rule as NGCRule & { dottedName: DottedName; titre: string },
                territory
              )}
            </div>
          </Card>
        </li>
      ))}
    </ul>
  )
}
