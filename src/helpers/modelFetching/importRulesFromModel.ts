export async function importRulesFromModel({ fileName }: { fileName: string }) {
  console.log('dynamically importing rules', fileName)
  try {
    return await import(
      `@abc-transitionbascarbone/mon-empreinte-festivalier-modele/public/${fileName}`
    ).then((module) => module.default)
  } catch (e) {
    console.error('importFile error', e)
    return {}
  }
}
