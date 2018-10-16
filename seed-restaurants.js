const { REGION, STAGE } = process.env

const AWS = require('aws-sdk')
AWS.config.region = REGION
const dynamodb = new AWS.DynamoDB.DocumentClient()
const ssm = new AWS.SSM()

let restaurants = [
  { 
    name: "Fangtasia", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png", 
    themes: ["true blood"] 
  },
  { 
    name: "Shoney's", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/shoney's.png", 
    themes: ["cartoon", "rick and morty"] 
  },
  { 
    name: "Freddy's BBQ Joint", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/freddy's+bbq+joint.png", 
    themes: ["netflix", "house of cards"] 
  },
  { 
    name: "Pizza Planet", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/pizza+planet.png", 
    themes: ["netflix", "toy story"] 
  },
  { 
    name: "Leaky Cauldron", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/leaky+cauldron.png", 
    themes: ["movie", "harry potter"] 
  },
  { 
    name: "Lil' Bits", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/lil+bits.png", 
    themes: ["cartoon", "rick and morty"] 
  },
  { 
    name: "Fancy Eats", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fancy+eats.png", 
    themes: ["cartoon", "rick and morty"] 
  },
  { 
    name: "Don Cuco", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/don%20cuco.png", 
    themes: ["cartoon", "rick and morty"] 
  },
];

const getTableName = async () => {
  return `restaurants-${STAGE}-yancui`
}

const run = async () => {
  const tableName = await getTableName()

  console.log(`table name: `, tableName)

  let putReqs = restaurants.map(x => ({
    PutRequest: {
      Item: x
    }
  }))
  
  const req = { 
    RequestItems: {}
  }
  req.RequestItems[tableName] = putReqs
  await dynamodb.batchWrite(req).promise()
}

run().then(() => console.log("all done")).catch(err => console.error(err.message))