const fs = require("fs")
const Mustache = require('mustache')
const http = require('superagent-promise')(require('superagent'), Promise)

const restaurantsApiRoot = process.env.restaurants_api
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const ordersApiRoot = process.env.orders_api

let html

function loadHtml () {
  if (!html) {
    console.log('loading index.html...')
    html = fs.readFileSync('static/index.html', 'utf-8')
    console.log('loaded')
  }
  
  return html
}

const getRestaurants = async () => {
  const httpReq = http.get(restaurantsApiRoot)
  return (await httpReq).body
}

module.exports.handler = async (event, context) => {
  const template = loadHtml()
  const restaurants = await getRestaurants()
  const dayOfWeek = days[new Date().getDay()]
  const view = { 
    dayOfWeek, 
    restaurants,
    searchUrl: `${restaurantsApiRoot}/search`,
    placeOrderUrl: `${ordersApiRoot}`
  }
  const html = Mustache.render(template, view)
  const response = {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=UTF-8'
    },
    body: html
  }

  return response
}