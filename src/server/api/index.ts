import express from 'express'

import { getABoardDataRouter } from './get-a-board-data'
import { getBoardsListRouter } from './get-boards-list'

import { createAColumnRouter } from './create-a-column'
import { modifyAColumnRouter } from './modify-a-column'
import { removeAColumnRouter } from './remove-a-column'

import { createACardRouter } from './create-a-card'
import { modifyACardRouter } from './modify-a-card'
import { modifyACardsOrderRouter } from './modify-cards-order'
import { RemoveACardRouter } from './remove-a-card'

import { getActivitiesListRouter } from './get-activities-list'

import { resetDatabaseRouter } from './reset-database'

const router = express.Router()

router.use(getABoardDataRouter)
router.use(getBoardsListRouter)

router.use(createAColumnRouter)
router.use(modifyAColumnRouter)
router.use(removeAColumnRouter)

router.use(createACardRouter)
router.use(modifyACardRouter)
router.use(modifyACardsOrderRouter)
router.use(RemoveACardRouter)

router.use(getActivitiesListRouter)

router.use(resetDatabaseRouter)

export { router as api }
