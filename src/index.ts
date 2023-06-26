import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


// TODO: Routing aplikasi akan kita tulis di sini
app.get('/feed', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  })
  res.json(posts)
})

app.post('/post', async (req: Request, res: Response) => {
  const { content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      content,
      author: { connect: { email: authorEmail } }
    }
  })
  res.json(result)
})

app.get('/post/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.put('/post/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      ...req.body
    }
  })

  res.json(post)
})


app.delete(`/post/:id`, async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.post('/user', async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: { ...req.body }
  })
  res.json(result)
})

app.get('/:username', async (req: Request, res: Response) => {
  const { username } = req.params
  const user = await prisma.user.findUnique({
    where: { username: String(username) }
  })
  res.json(user)
})



// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404))
})

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:3000`)
)