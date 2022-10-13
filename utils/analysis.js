const request = require('request')

const analysis = (business_id,callback)=>{
    const URL = 'https://esamudaay-api-smeet.herokuapp.com/productInfo/'+ business_id + '?format=json'
    request({url: URL,json: true},(error,response)=>{
        if(error){
            callback('Unable to fetch analysis report',undefined)
        }
        else{
            callback(undefined,{
                TotalSKU: response.body.TotalSKU,
                ImageMissing: response.body.ImageMissing,
                SKUpropMissing : response.body.SKUpropMissing,
                MFRnameMissing: response.body.MFRnameMissing,
                MFRaddMissing : response.body.MFRaddMissing,
            })
        }
    })
}

module.exports = analysis