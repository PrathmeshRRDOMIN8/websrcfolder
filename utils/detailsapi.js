const request = require('request')

const detailsapi = (business_id,callback)=>{
    const URL = 'https://api.test.esamudaay.com/api/v1/businesses/'+business_id+'?format=json'
    request({url: URL,json: true},(error,response)=>{
        if(error){
            callback('Unable to fetch analysis report',undefined)
        }
        else{
            callback(undefined,{
                business_name: response.body.business_name,
                is_open: response.body.is_open,
                address_name: response.body.address.address_name,
                pretty_address: response.body.address.pretty_address,
                city: response.body.address.geo_addr.city,
                house: response.body.address.geo_addr.house,
                pincode: response.body.address.geo_addr.pincode,
                landmark : response.body.address.geo_addr.landmark,
                photo_url: response.body.images[0].photo_url,
                has_delivery: response.body.has_delivery,
                has_self_pick_up: response.body.has_self_pick_up,
                has_slot_delivery: response.body.has_slot_delivery,
                has_smartbox_delivery : response.body.has_smartbox_delivery,
                description : response.body.description,
                upi: response.body.payment_info.upi,
                bcats : response.body.bcats.name,
                ratings_count:response.body.ratings_info.ratings_count,
                base_type : response.body.base_type,
                chat_enabled : response.body.chat_enabled,
                ondc_enabled : response.body.ondc_enabled,
            })
        }
    })
}

module.exports = detailsapi