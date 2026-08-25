import Question from '@/components/form/Question'
import { DottedName } from '@abc-transitionbascarbone/mon-empreinte-festivalier-modele'

type Props = {
  question: DottedName
}
export default function Voiture({ question, ...props }: Props) {
  /*const [isOpen, setIsOpen] = useState(false)*/
  return (
    <>
      <Question question={question} className="mb-4" {...props} />
      {/*<div className="mb-4 flex flex-col items-start">
        <Button
          color="link"
          size="xs"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          className="mb-2">
          {isOpen ? (
            <Trans>Fermer</Trans>
          ) : (
            <span className="flex items-center">
              <PencilIcon
                className="mr-2 stroke-primary-700"
                width="16"
                height="16"
              />

              <Trans>Détailler mes trajets</Trans>
            </span>
          )}
        </Button>
        {isOpen ? <JourneysInput question={question} {...props} /> : null}
      </div>*/}
    </>
  )
}
