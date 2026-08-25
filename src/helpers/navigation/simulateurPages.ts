import { RegionType, TerritoriesType } from '@/utils/territories'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'

type Props = {
  question?: DottedName
  region: RegionType
  territory: TerritoriesType
}
export const getLinkToSimulateur = ({ question, region, territory }: Props) => {
  // If no question is provided, we return
  if (!question) {
    return `/region/${region}/territoire/${territory}/simulateur/bilan`
  }
  //
  return `/region/${region}/territoire/${territory}/simulateur/bilan?question=${question
    .replaceAll(' . ', '.')
    .replaceAll(' ', '_')}`
}
