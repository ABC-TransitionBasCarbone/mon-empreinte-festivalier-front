'use client'

import getNamespace from '@/publicodes-state/helpers/getNamespace'
import {
  DottedName,
  NGCRuleNode,
  Suggestions,
} from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import { useMemo } from 'react'
import { FormattedSuggestion } from '../../types'
import { useUser } from '@/publicodes-state'
import { replacePlaceHolders } from '@/constants/territories/questions'

type Props = {
  dottedName: DottedName
  rule: NGCRuleNode | undefined
}

export default function useContent({ dottedName, rule }: Props) {
  const { territory } = useUser()
  const category = useMemo(() => {
    const namespace = getNamespace(dottedName) ?? ''
    // This is only used by "ui . pédagogie" rules. For them, we need to extract the category from the dottedName (ui . pedagogie . [category])
    if (namespace === 'ui') {
      return dottedName.split(' . ')[3] as DottedName
    }
    return namespace as DottedName
  }, [dottedName])

  const title = useMemo<string | undefined>(() => replacePlaceHolders(rule?.title, territory), [rule, territory])

  const abbreviatedTitle = useMemo<string | undefined>(
    () => replacePlaceHolders(rule?.rawNode.abréviation, territory),
    [rule, territory]
  )

  const label = useMemo<string | undefined>(
    () => replacePlaceHolders(rule?.rawNode.question, territory),
    [rule, territory]
  )
  const description = useMemo<string | undefined>(
    () => replacePlaceHolders(rule?.rawNode.description, territory),
    [rule, territory]
  )
  const icons = useMemo<string | undefined>(
    () => rule?.rawNode['icônes'],
    [rule]
  )
  const unit = useMemo<string | undefined>(() => rule?.rawNode['unité'], [rule])

  const assistance = useMemo<DottedName | undefined>(
    () => rule?.rawNode['aide'] as DottedName,
    [rule]
  )

  const questionPassee = useMemo<DottedName | undefined>(
    () => rule?.rawNode['question-passee'],
    [rule]
  )

  const descriptionPassee = useMemo<DottedName | undefined>(
    () => rule?.rawNode['description-passee'],
    [rule]
  )

  const plancher = useMemo<number>(() => rule?.rawNode['plancher'] ?? 0, [rule])

  const warning = useMemo<string | undefined>(
    () => replacePlaceHolders(rule?.rawNode['avertissement'], territory),
    [rule, territory]
  )

  const isInactive = useMemo<boolean>(
    () => rule?.rawNode['inactif'] === 'oui',
    [rule]
  )

  const suggestions = useMemo(() => {
    const suggestionsFolder = (rule?.rawNode.mosaique?.suggestions ||
      rule?.rawNode.suggestions) as Suggestions
    const suggestions = suggestionsFolder
      ? Object.keys(suggestionsFolder).map(
          (key) =>
            ({
              label: key,
              value: suggestionsFolder[key as keyof typeof suggestionsFolder],
            }) as FormattedSuggestion
        )
      : []

    return suggestions
  }, [rule])

  const excerpt = useMemo<string | undefined>(
    () => replacePlaceHolders(rule?.rawNode['résumé'], territory),
    [rule, territory]
  )

  // This is only used by "ui . pédagogie" rules
  const actions = useMemo<DottedName[] | undefined>(
    () => (rule as any)?.rawNode['actions'],
    [rule]
  )

  const informations = useMemo<DottedName[] | undefined>(
    () => (rule as any)?.rawNode['informations'],
    [rule]
  )

  const intensiteCouleur = useMemo<string | undefined>(() => (rule as any)?.rawNode['intensiteCouleur'], [rule])

  const unite = useMemo<string | undefined>(() => (rule as any)?.rawNode['unité'], [rule])

  const titreInformations = useMemo<string | undefined>(
    () => replacePlaceHolders((rule as any)?.rawNode['titre-informations'], territory),
    [rule, territory]
  )

  const descriptionInformations = useMemo<string | undefined>(
    () => replacePlaceHolders((rule as any)?.rawNode['description-informations'], territory),
    [rule, territory]
  )


  return {
    category,
    title,
    abbreviatedTitle,
    label,
    description,
    icons,
    unit,
    assistance,
    isInactive,
    suggestions,
    excerpt,
    plancher,
    warning,
    actions,
    informations,
    questionPassee,
    descriptionPassee,
    intensiteCouleur,
    unite,
    titreInformations,
    descriptionInformations
  }
}
