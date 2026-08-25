import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'

// Gathered from nosgestesclimat-site
const filteredDottedNames: DottedName[] = [
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
  'transport . infolettre',
  'métrique',
  'déforestation',
  'logement . électricité verte',
  'logement . chauffage . électricité',
  'futureco-data . transport . ferry . distance aller . orthodromique',
  'futureco-data . transport . ferry . durée du voyage',
  'futureco-data . transport . ferry . vitesse en kmh',
  'futureco-data . transport . ferry . cabine',
  'futureco-data . transport . ferry . groupe',
  'futureco-data . transport . ferry . consommation de services',
  'futureco-data . transport . ferry . voiture',
  'services sociétaux . devenir producteur photovoltaique',
  'services sociétaux . bien placer argent',
]

export const filterRelevantMissingVariables = ({
  missingVariables,
  extendedFoldedSteps,
  selfDottedName
}: {
  missingVariables: DottedName[]
  extendedFoldedSteps: DottedName[]
  selfDottedName?: DottedName
}) => {
  return missingVariables.filter((dottedName: DottedName) => {
    const isFolded = extendedFoldedSteps.indexOf(dottedName) >= 0
    const isManuallyExcluded = !filteredDottedNames?.includes(dottedName)

    const ignoreSelf = !selfDottedName || selfDottedName === dottedName
    return isManuallyExcluded && !isFolded && !ignoreSelf
  })
}
