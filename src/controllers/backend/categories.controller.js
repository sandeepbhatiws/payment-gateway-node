const categoryModel = require('../../models/category');
var slugify = require('slugify');

exports.create = async(request,response) => {

    const slug = slugify(request.body.name, {
        lower: true,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
    });

    // select query allrecords find particulat to slug

    // if slug value grether than 1 or equal to 1

    // var slug = slug-+records.lenght


    const data = new  categoryModel({
        name: request.body.name,
        slug: slug,
        image: request.body.image,
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
        
        // var categoryData = await categoryModel.find({ deleted_at : null });
        // var categoryData = await categoryModel.find({ name: request.body.name });
        // var categoryData = await categoryModel.findOne();
        // var categoryData = await categoryModel.findById('668d63cc39ab9d07a54b672d');
        // var categoryData = await categoryModel.find().sort({'order':'asc', 'name':'desc'});

        // var categoryData = await categoryModel.find(
        //     {
        //         $and: [
        //             { 
        //                 status: 1,
        //                 order: 50,
        //             },
        //             {
        //                 $or :[
        //                     {
        //                         order : 40,
        //                     },
        //                     {
        //                         // order: 50
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // );

        // var categoryData = await categoryModel.find({ status : 1 , order : { $gt : 5 } }).select('name image status order').limit(5).skip(5);

        // const condition = {
        //     deleted_at : null,
        // }

        // if(request.body.status != ''){
        //     condition.status = request.body.status;
        // }

        // if(request.body.name != ''){
        //     // condition.name = request.body.name;

        //     // condition.name = new RegExp("^"+request.body.name);
        //     condition.name = new RegExp(request.body.name,"i");
        // }

        // var categoryData = await categoryModel.find(condition);

        // const condition = [];
        // const condition = [{
        //     deleted_at : null
        // }];

        // if(request.body.status != ''){
        //     condition.push({ status: request.body.status});
        // }

        // if(condition.length > 0){
        //     var filter = { $or : condition } 
        // } else {
        //     var filter = {}   
        // }

        // var categoryData = await categoryModel.find(filter);

        
        const addCondition = [{
            deleted_at : null,
        }];

        const orCondition = [];

        if(request.body.order != undefined) {
            if(request.body.order != ''){
                orCondition.push({ order: request.body.order});
            }
        }
            
        if(request.body.name != undefined) {
            if(request.body.name != ''){
                orCondition.push({ name: new RegExp(request.body.name,"i") });
            }
        }

        if(addCondition.length > 0){
            var filter = { $and : addCondition } 
        } else {
            var filter = {}   
        }

        if(orCondition.length > 0){
            filter.$or = orCondition;
        }

        var categoryData = await categoryModel.find(filter);


        // var newcategoryData = await categoryModel.find(
        //     {
        //         name : {
        //             $exists : false
        //         }
        //     }
        // );

        var newcategoryData = await categoryModel.find(
                {
                    order : {
                        $type : 16
                    }
                }
            );

        if(newcategoryData.length != 0){
            var resp = {
                status : true,
                message : 'record found successfully !!',
                data : newcategoryData
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
    
    // await categoryModel.findByIdAndDelete(request.query.id)

    // await categoryModel.findByIdAndDelete(request.body.id)

    // await categoryModel.deleteOne({ _id : request.params.id })

    // await categoryModel.findByIdAndDelete(request.params.id)

    await categoryModel.updateOne(
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