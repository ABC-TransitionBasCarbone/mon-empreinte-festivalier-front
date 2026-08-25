'use server'

import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import HomepageContent from './_components/HomePageContent'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t(
      "Calculez l'empreinte de votre festival en 5 minutes !"
    ),
    description: t(
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone sur le climat.'
    ),
    alternates: {
      canonical: '',
    },
  })
}
export default async function Homepage() {
  return <HomepageContent />;
}
