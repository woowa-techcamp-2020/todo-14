import './styles/globalstyle.scss'
import './styles/page.scss'

import './scripts/card-dnd'
import './scripts/column-dnd'

import './scripts/init.ts'
import './scripts/column.ts'
import './scripts/card.ts'
import './scripts/activity.ts'

import './scripts/color-scheme.ts'
import { resetDatabaseAPI } from './api/reset-database'

import io from 'socket.io-client'
import { createCardClient } from './scripts/card-handlers'

function reset() {
  resetDatabaseAPI(
    parseInt(document.querySelector('.app').getAttribute('board-id'))
  ).then(() => {
    window.location.reload()
  })
}

window.addEventListener('load', () => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'z' && e.metaKey && e.shiftKey) {
      reset()
    }
  })

  document
    .querySelector<HTMLDivElement>('.reset')
    .addEventListener('click', reset)
})

export const socket = io('ws://localhost:12100')

socket.on('card', ([data]) => {
  const { type, payload } = data

  if (type === 'create') {
    createCardClient(payload.columnId, payload.cardId, payload.content)
  }
})

socket.on('connect', () => {
  // either with send()
  // socket.send('Hello!')

  // or with emit() and custom event names
  socket.emit(
    'salutations',
    'Hello222!',
    { mr: 'john' },
    Uint8Array.from([1, 2, 3, 4])
  )
})

// handle the event sent with socket.send()
socket.on('message', (data) => {
  console.log(data)
})

// handle the event sent with socket.emit()
socket.on('hello_world', (data) => {
  console.log(data)
})
