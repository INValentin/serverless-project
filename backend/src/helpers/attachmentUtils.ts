import * as AWS from 'aws-sdk'
import {  } from 'aws-sdk/clients/s3'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
    signatureVersion: "v4"
}) 

// TODO: Implement the fileStogare logic
// XAWS.S3.

const BUCKET_NAME = process.env.ATTACHMENT_S3_BUCKET
const EXPIRATION = process.env.SIGNED_URL_EXPIRATION


export const generateSignedUploadUrl = (todoId: string):string => {
    const url = s3.getSignedUrl("putObject", {
        Bucket: BUCKET_NAME,
        Key: todoId,
        Expires: parseInt(EXPIRATION)
    })
    return url
}
