import { SupportedRegions } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import supportedRegions from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele/public/supportedRegions.json'

/**
 * This function is used to get the supported regions. It can be called directly from a server component.
 */
export function getSupportedRegions(): SupportedRegions {
  return supportedRegions
}
