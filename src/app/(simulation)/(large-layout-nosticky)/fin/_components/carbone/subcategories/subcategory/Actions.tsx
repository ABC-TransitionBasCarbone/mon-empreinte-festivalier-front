import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { endClickActions } from '@/constants/tracking/pages/end'
import { useEngine, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import Carousel
  from '@/app/(simulation)/(large-layout-nosticky)/fin/_components/carbone/subcategories/subcategory/actions/Carousel'
import Button from '@/design-system/inputs/Button'
import { motion } from 'framer-motion'
import Markdown from '@/design-system/utils/Markdown'
import { useState } from 'react';
import { useClientTranslation } from '@/hooks/useClientTranslation'

type Props = {
  subcategory: DottedName
  noNumberedFootprint?: boolean
}

type ActionObject = {
  dottedName: DottedName
  value: number
}

export default function Actions({ subcategory, noNumberedFootprint }: Props) {
  const { getValue, safeGetRule } = useEngine()
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useClientTranslation()

  const { actions, informations, category, titreInformations, descriptionInformations } = useRule(subcategory)

  const filteredActions = actions?.filter((action) => {
    const rule = safeGetRule(action)
    const actionValue = getValue(action)

    return !!rule?.title && ((actionValue && typeof actionValue === 'number' && actionValue > 0) || (!rule.rawNode.formule && !rule.rawNode.variations && !rule.rawNode.valeur))
  })

  if (!filteredActions) {
    return null
  }

  const sortedActions = filteredActions
    .map((action) => ({
      dottedName: action,
      value: getValue(action) as number,
    }))
    .sort((a: ActionObject, b: ActionObject) => {
      if (!a.value) return -1
      if (!b.value) return 1

      return a.value > b.value ? -1 : 1
    }
    )
    .map((actionObject: ActionObject) => actionObject.dottedName)


  let customTitle = ''

  switch (category) {
    case 'transport':
      customTitle = '🚗 Transport'
      break
    case 'séjour':
      customTitle = '🚗 Transport'
      break
    case 'alimentation':
      customTitle = '🍽️ Alimentation'
      break
    case 'logement':
      customTitle = '🏠 Hébergement'
      break
    case 'divers':
      customTitle = '💻 Activités et loisirs'
      break
    default:
      customTitle = '📦 Autre catégorie'
      break
  }

  return (
    <>
      {!noNumberedFootprint && (
        <p className="mb-6">
          <Trans>
            Voici quelques idées pour vous aider à réduire votre impact :
          </Trans>
        </p>
      )}
      <div className="mb-4 flex flex-row justify-center gap-4">
        <Carousel informations={sortedActions} category={category} />
      </div>
      <p className="mb-6">
        <Trans>
          {titreInformations}
        </Trans>
        {informations && informations?.length > 0 && descriptionInformations ? (
          <Button
            type="button"
            onClick={() => {
              setIsOpen((previsOpen) => !previsOpen)
            }}
            color="secondary"
            size="xs"
            className={`inline-flex ml-2 h-6 w-6 items-center justify-center rounded-full p-0 align-text-bottom font-mono`}
            title={t("Voir plus d'informations")}>
            i
          </Button>
        ) : null}
      </p>
      {isOpen && descriptionInformations ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-3 origin-top rounded-xl border-2 border-primary-50 bg-gray-100 p-3 text-sm">
          <Markdown className="[&>blockquote]:mb-2 [&>blockquote]:mt-0 [&>blockquote]:p-0 [&>blockquote]:text-default [&>p]:mb-2">
            {descriptionInformations}
          </Markdown>{' '}
          <Button
            size="xs"
            color={'secondary'}
            onClick={() => {
              setIsOpen(false)
            }}
            title={t('Fermer')}>
            <Trans>Fermer</Trans>
          </Button>
        </motion.div>
      ) : null}
      <Carousel informations={informations} category={category} regionalInfo />
      <div className="flex justify-center">
        <Link
          onClick={() => trackEvent(endClickActions)}
          href={`/actions?catégorie=${category}`}
          className="text-center text-xs">
          <Trans>Voir tous les gestes</Trans> : {customTitle}
        </Link>
      </div>
    </>
  )
}
