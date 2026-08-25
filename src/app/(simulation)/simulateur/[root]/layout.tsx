import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'
import { PropsWithChildren } from 'react'

type Props = { params: Promise<{ root: DottedName }> }

export async function generateMetadata({ params }: Props) {
  const { root } = await params

  return getMetadataObject({
    title: 'Mon séjour durable',
    description: "Calculez l'empreinte de votre festival en 5 minutes !",
    alternates: {
      canonical: `/simulateur/${root}`,
    },
  })
}

export default async function Layout({ params, children }: PropsWithChildren<Props>) {
  const { root } = await params
  return <FormProvider root={root}>{children}</FormProvider>
}
