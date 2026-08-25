import getSomme from '@/publicodes-state/helpers/getSomme'
import { DottedName, NGCRuleNode } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'

export function getRuleSumRules(rule: NGCRuleNode): DottedName[] | undefined {
  const somme = getSomme(rule.rawNode)

  if (!somme) {
    return
  }

  return somme.map((name) => `${rule.dottedName} . ${name}` as DottedName)
}
