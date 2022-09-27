import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'
import uuid from "uuid"
const middy = require('middy')

const BUCKET_NAME = process.env.ATTACHMENT_S3_BUCKET

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const todoId = uuid.v4()

    const attachmentUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${todoId}`

    const newItem: TodoItem  = {
      userId: getUserId(event),
      todoId: uuid.v4(),
      name: newTodo.name,
      dueDate: newTodo.dueDate,
      done: false,
      createdAt: Date.now().toString(),
      attachmentUrl
    }

    await createTodo(newItem)

    return {
      statusCode: 201,
      body: JSON.stringify({item: newTodo})
    }
})

handler.use(
  cors({
    credentials: true
  })
)
