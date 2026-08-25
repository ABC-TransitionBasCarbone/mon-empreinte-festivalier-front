import { getSubcatsOfCategory } from '@/helpers/publicodes/getSubcatsOfCategory'
import { DottedName, NGCRuleNode } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'

type Props = {
  questions: DottedName[]
  categories: string[]
  subcategories: string[]
  missingVariables: Record<string, number>
  safeGetRule: (rule: DottedName) => NGCRuleNode | undefined
}

export default function getSortedQuestionsList({
  questions,
  categories,
  subcategories,
  missingVariables,
  safeGetRule
}: Props): DottedName[] {
  const baseSortedQuestions = questions.sort((a, b) => {
    const aSplittedName = a.split(' . ');
    const bSplittedName = b.split(' . ');

    // We first sort by category
    if (
      categories.indexOf(aSplittedName[0]) >
      categories.indexOf(bSplittedName[0])
    ) {
      return 1;
    }
    if (
      categories.indexOf(aSplittedName[0]) <
      categories.indexOf(bSplittedName[0])
    ) {
      return -1;
    }

    // then by subcategory
    const categoryOfBothQuestions = aSplittedName[0];
    const aCategoryAndSubcategory = aSplittedName[0] + ' . ' + aSplittedName[1];
    const bCategoryAndSubcategory = bSplittedName[0] + ' . ' + bSplittedName[1];

    const subcategoriesOfBothQuestions = getSubcatsOfCategory(
      categoryOfBothQuestions as DottedName,
      subcategories as DottedName[]
    );

    if (
      subcategoriesOfBothQuestions.indexOf(
        aCategoryAndSubcategory as DottedName
      ) >
      subcategoriesOfBothQuestions.indexOf(
        bCategoryAndSubcategory as DottedName
      )
    ) {
      return 1;
    }
    if (
      subcategoriesOfBothQuestions.indexOf(
        aCategoryAndSubcategory as DottedName
      ) <
      subcategoriesOfBothQuestions.indexOf(
        bCategoryAndSubcategory as DottedName
      )
    ) {
      return -1;
    }

    // then by missing variables score
    return missingVariables[b] - missingVariables[a];
  });

  // Step 2: Sort by order within each category
  const questionsByCategory: { [category: string]: { key: string; ordre: number }[] } = {};

  // Organize questions by category
  baseSortedQuestions.forEach((key) => {
    const rule = safeGetRule(key);
    const ordre = rule?.rawNode?.ordre !== undefined ? rule.rawNode.ordre : Infinity;

    const category = key.split(' . ')[0];

    if (!questionsByCategory[category]) {
      questionsByCategory[category] = [];
    }

    questionsByCategory[category].push({ key, ordre });
  });

  // Sort questions by order within each category
  const finalSortedKeys: string[] = [];

  Object.keys(questionsByCategory).forEach((category) => {
    const questions = questionsByCategory[category];

    questions.sort((a, b) => a.ordre - b.ordre);

    questions.forEach((item) => {
      finalSortedKeys.push(item.key);
    });
  });

  return finalSortedKeys;
}
