import { getPersonas } from '@/helpers/modelFetching/getPersonas'
import { Personas } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import { useLocale } from './useLocale'
import { usePRNumber } from './usePRNumber'

export function usePersonas(): UseQueryResult<Personas, Error> {
  const locale = useLocale()

  const { PRNumber } = usePRNumber()

  return useQuery({
    queryKey: ['personas', locale, PRNumber],
    queryFn: () => getPersonas({ locale, PRNumber }),
    placeholderData: keepPreviousData,
    staleTime: Infinity, // We don't want to import the personas multiple times
  })
}
