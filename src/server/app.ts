// appRoot는 package.json이 위치한 프로젝트의 최상위 디렉토리를 가리킵니다
import appRoot from 'app-root-path'
import bodyParser from 'body-parser'
import express from 'express'

const app = express()
const PORT = 12100

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(appRoot.resolve('/public')))

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(appRoot.resolve('/public/index.html'))
})

app.use(router)

export { app, PORT }
