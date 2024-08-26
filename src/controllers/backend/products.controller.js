const productModel = require('../../models/product');
const Category = require('../../models/category');

exports.create = async(request,response) => {

    const data = new  productModel({
        name: request.body.name,
        image: request.body.image,
        category_id : request.body.category_id,
        decription: request.body.decription,
        status: request.body.status,
        order: request.body.order,
    })

   var output = await data.save().then((success) => {
        var result = {
            status : true,
            message : 'Record found successfully.',
            data : success
        }

        response.send(result);
   }).catch((error) => {

        var error_messages = [];

        for(let field in error.errors){
            error_messages.push(error.errors[field].message);
        }


        var result = {
            status : false,
            message : 'Something went wrong !!',
            error_message : error_messages
        }

        response.send(result);
   });
}

exports.view = async(request,response) => {
    
    try {
        var productData = await productModel.find()
        .populate({
            path : 'category_id',
            select: { '_id': 1,'name':1,'image':1},
        } )
        // .populate({ path: 'categories', options: {strictPopulate: false} })
        .exec();

        if(productData.length != 0){
            var resp = {
                status : true,
                message : 'record found successfully !!',
                data : productData
            }
            
            response.send(resp);
        } else {
            var resp = {
                status : false,
                message : 'No record found !!'
            }
            
            response.send(resp);
        }

    } catch (error) {
        console.log(error);
        var resp = {
            status : false,
            message : 'Something went wrong !!'
        }
        
        response.send(resp);

    } 
}

exports.update = async(request,response) => {
    
}

exports.delete = async(request,response) => {

    await productModel.updateOne(
        {
            _id : request.params.id
        },
        {
            $set : {
                deleted_at : Date.now()
            }
        }
    )
    
    .then(() => {
        var resp = {
            status : true,
            message : 'record deleted successfully !!',
        }
        
        response.send(resp);
    }).catch(() => {
        var resp = {
            status : false,
            message : 'Something went wrong !!'
        }
        
        response.send(resp);
    })

}