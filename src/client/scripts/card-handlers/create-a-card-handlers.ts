// '새 카드 등록(+)' 버튼 클릭
import { createACardAPI } from '@/client/api/create-a-card'
import { eventCollector } from '@/client/utils/event-collector'
import {
  generateCard,
  generateNewCardForm,
} from '@/client/scripts/html-generator'

//  textarea 입력에 따라 카드추가 버튼 활성/비활성화
const createCardOkBtnClickHandler = (e) => {
  const okBtn = document.querySelector('.card-btn.add')

  const value = e.target.value.trim()
  if (!value) {
    okBtn.setAttribute('disabled', 'true')
  } else {
    okBtn.removeAttribute('disabled')
  }
}

// '새 카드 등록(+)' 버튼 클릭
const createCardFormHandler = (columnElm: HTMLElement) => {
  const cardContainerElem = columnElm.querySelector('.cards-container')

  const newCardFormElm = generateNewCardForm({ content: '' })
  const textAreaElm = newCardFormElm.querySelector('textarea')

  cardContainerElem.prepend(newCardFormElm)
  eventCollector.add(textAreaElm, 'keyup', createCardOkBtnClickHandler)
}

// '추가' 확인
const createCardHandler = async (
  columnElm: HTMLElement,
  cardFormElm: HTMLElement,
  ids: [number, number, number]
) => {
  const textAreaElm = cardFormElm.querySelector('textarea')
  const content = textAreaElm.value.trim()
  if (!content) return

  const cardContainerElem = columnElm.querySelector('.cards-container')

  // const boardId = getBoardId()
  // const columnId = getColumnId(columnElm)
  const [boardId, columnId] = ids

  const newCard = await createACardAPI({
    urlParam: { boardId, columnId },
    bodyParam: { content },
  })
  const newCardElm = generateCard({ id: newCard.id, content })

  cardFormElm.remove()
  cardContainerElem.prepend(newCardElm)

  eventCollector.remove(textAreaElm, 'keyup')
}

export { createCardFormHandler, createCardHandler }
