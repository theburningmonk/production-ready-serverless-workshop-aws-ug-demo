const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

const defaultResults = process.env.defaultResults || 8
const tableName = process.env.restaurants_table

const findRestaurantsByTheme = async (theme, count) => {
  const req = {
    TableName: tableName,
    Limit: count,
    FilterExpression: "contains(themes, :theme)",
    ExpressionAttributeValues: { ":theme": theme }
  }

  const resp = await dynamodb.scan(req).promise()
  return resp.Items
}

module.exports.handler = async (event, context) => {
  const req = JSON.parse(event.body)
  const theme = req.theme
  const restaurants = await findRestaurantsByTheme(theme, defaultResults)
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  }

  return response
}