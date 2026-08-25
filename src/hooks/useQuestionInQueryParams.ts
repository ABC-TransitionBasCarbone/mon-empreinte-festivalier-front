import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useUser } from '@/publicodes-state'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useQuestionInQueryParams = () => {
  const router = useRouter()
  const { region, territory } = useUser()

  const searchParams = useSearchParams()

  const questionInQueryParams = decodeURI(searchParams.get('question') || '')
    ?.replaceAll('.', ' . ')
    .replaceAll('_', ' ') as DottedName

  const setQuestionInQueryParams = useCallback(
    (question: DottedName) =>
      router.replace(
        getLinkToSimulateur({ question, region, territory }),

        { scroll: false }
      ),
    [region, router, territory]
  )

  return { questionInQueryParams, setQuestionInQueryParams }
}
