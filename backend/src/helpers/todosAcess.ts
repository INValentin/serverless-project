import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

// const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

const docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient()

const TODOS_TABLE = process.env.TODOS_TABLE
// const TODOS_INDEX_TABLE = process.env.TODOS_CREATED_AT_INDEX

export const saveTodo = async (newItem: TodoItem): Promise<TodoItem> => {
    await docClient.put({
        TableName: TODOS_TABLE,
        Item: newItem
    }).promise()

    return newItem
}

export const getTodosForUser = async (userId: string): Promise<TodoItem[]> => {
    const userTodos = await docClient.query({
        TableName: TODOS_TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId
        },
    }).promise()

    return userTodos.Items as TodoItem[]
}

export const updateTodo = async (todoId: string, userId: string, todoUpdate: TodoUpdate) => {
    await docClient.update({
        TableName: TODOS_TABLE,
        Key: {"userId": userId, "todoId": todoId},
        UpdateExpression: 'SET dueDate = :dueDate, done = :done',
        ExpressionAttributeValues: {
            ":dueDate": todoUpdate.dueDate,
            ":done": todoUpdate.done,
        }
    }).promise()
}

export const deleteTodo = async (todoId:string, userId: string) => {
    await docClient.delete({
        TableName: TODOS_TABLE,
        Key: {"userId": userId, "todoId": todoId},
    }).promise()
}
