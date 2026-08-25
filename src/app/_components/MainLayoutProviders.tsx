'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { UserProvider } from '@/publicodes-state'
import { RegionFromGeolocation } from '@/publicodes-state/types'
import migrationInstructions from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele/public/migration.json'
import { PropsWithChildren, useEffect, useState } from 'react'
import { IframeOptionsProvider } from './mainLayoutProviders/IframeOptionsContext'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import { isCorrectRegion, isCorrectTerritory, isTerritoryFromRegion, RegionType, TerritoriesType } from '@/utils/territories'
import { initMatomo } from '@/utils/matomo/trackEvent'
import { usePathname } from 'next/navigation'

type Props = {
  initialRegion: RegionFromGeolocation
}
export default function MainLayoutProviders({
  children,
  initialRegion,
}: PropsWithChildren<Props>) {
  const [territory, setTerritory] = useState<TerritoriesType | null>(null);
  const [region, setRegion] = useState<RegionType>(RegionType.HdF);
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname()

  useEffect(() => {
    setMounted(true);
    initMatomo()
  }, []);

  useEffect(() => {
    const regionFromPath = pathName.match('/region/*') ? pathName.split('/')[2] : null;
    const territoryFromPath = pathName.match('/territoire/*') ? pathName.split('/')[4] : null;

    const regionFromLocalStorage = localStorage.getItem('region');
    const territoryFromLocalStorage = localStorage.getItem('territory');

    const region = pathName === '/' || regionFromPath ? regionFromPath : regionFromLocalStorage;
    const territory = pathName === '/' || regionFromPath ? territoryFromPath : territoryFromLocalStorage;

    if (isTerritoryFromRegion(territory ?? '', region ?? '')) {
      if (region && isCorrectRegion(region)) {
        setRegion(region);
        localStorage.setItem('region', region);
      } else {
        setRegion(RegionType.HdF);
        localStorage.setItem('region', RegionType.HdF);
      }
      if (territory && isCorrectTerritory(territory) && territory !== 'general') {
        setTerritory(territory);
        localStorage.setItem('territory', territory);
      } else {
        setTerritory('general');
        localStorage.setItem('territory', 'general');
      }
    } else {
      setTerritory('general');
      localStorage.setItem('territory', 'general');
      setRegion(RegionType.HdF);
      localStorage.setItem('region', RegionType.HdF);
    }
  }, [pathName]);

  if (!mounted || !territory) {
    return null;
  }

  return (
    <ErrorBoundary>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <UserProvider
            storageKey={`monsejourdurable-${territory}`}
            migrationInstructions={migrationInstructions}
            initialRegion={initialRegion}
            territory={territory}
            region={region}
          >
            <PreventNavigationProvider>
              <MainHooks>{children}</MainHooks>
            </PreventNavigationProvider>
          </UserProvider>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </ErrorBoundary>
  )
}
