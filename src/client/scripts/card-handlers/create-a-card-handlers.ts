import {
  generateCard,
  generateNewCardForm,
} from '@/client/scripts/html-generator'

import { createACardAPI } from '@/client/api/create-a-card'

import { eventCollector } from '@/client/utils/event-collector'

import { CardData } from '../card'
import { updateColumnBadgeCount } from '@/client/modules/update-column-badge-count'
import { escapeHtml } from '@/client/utils/escape-html'

//  textarea 입력에 따라 카드추가 버튼 활성/비활성화
const textAreaKeyupHandler = (e) => {
  const okBtn = document.querySelector('.card-btn.add')

  const value = e.target.value.trim()
  if (!value) {
    okBtn.setAttribute('disabled', 'true')
  } else {
    okBtn.removeAttribute('disabled')
  }
}

// '새 카드 등록(+)' 버튼 클릭
const createCardFormHandler = ({ columnElm }: Pick<CardData, 'columnElm'>) => {
  const cardContainerElem = columnElm.querySelector('.cards-container')

  const newCardFormElm = generateNewCardForm({ content: '' })
  const textAreaElm = newCardFormElm.querySelector('textarea')

  cardContainerElem.prepend(newCardFormElm)
  textAreaElm.focus()
  eventCollector.add(textAreaElm, 'keyup', textAreaKeyupHandler)
}

export function createCardClient(
  /** Cards container element or column ID */
  cardsContainer: HTMLElement | number,
  cardId: number,
  content: string
) {
  const newCardElm = generateCard({ id: cardId, content })

  let container: HTMLElement

  if (typeof cardsContainer === 'number') {
    container = document.querySelector<HTMLElement>(
      `[data-column-id="${cardsContainer}"] .cards-container`
    )
  } else {
    container = cardsContainer
  }

  container.prepend(newCardElm)

  updateColumnBadgeCount(newCardElm.closest('.column'))
}

// '추가' 확인
const createCardHandler = async ({
  cardFormElm,
  ids,
}: Pick<CardData, 'cardFormElm' | 'ids'>) => {
  const textAreaElm = cardFormElm.querySelector('textarea')
  const content = escapeHtml(textAreaElm.value.trim())
  if (!content) return

  const [boardId, columnId] = ids

  const newCard = await createACardAPI({
    urlParam: { boardId, columnId },
    bodyParam: { content },
  })

  createCardClient(cardFormElm.parentElement, newCard.id, content)

  cardFormElm.remove()

  eventCollector.remove(textAreaElm, 'keyup')
}

export { createCardFormHandler, createCardHandler }
