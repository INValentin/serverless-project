import {
    saveTodo, getTodosForUser as getUserTodos,
    updateTodo as performUpdateTodo,
    deleteTodo as performDeleteTodo
} from './todosAcess'
import { generateSignedUploadUrl } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
// import * as uuid from 'uuid'
// import * as createError from 'http-errors'


const logger = createLogger("todo")

// TODO: Implement businessLogic


export const createTodo = async (newItem: TodoItem): Promise<TodoItem> => {
    const todo = await saveTodo(newItem)
    logger.info("Created todo..")
    return todo
}

export const getTodosForUser = async (userId: string): Promise<TodoItem[]> => {
    logger.info("Fetching user todos..")
    return getUserTodos(userId)
}

export const createAttachmentPresignedUrl = (todoId: string): string => {
    // const todo:TodoItem = await getTodo(todoId)
    
    const uploadUrl = generateSignedUploadUrl(todoId)
    logger.info("Generated upload url...")
    return uploadUrl
}

export const updateTodo = async (todoId: string, userId: string, updateTodo: TodoUpdate) => {
    logger.info("Updating todo...")
    return performUpdateTodo(todoId, userId, updateTodo)
}
export const deleteTodo = async (todoId: string, userId: string) => {
    logger.info("Deleting todo...")
    return performDeleteTodo(todoId, userId)
}