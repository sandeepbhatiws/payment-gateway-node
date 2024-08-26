const coursesModel = require('../../models/courses');


exports.create = async(request,response) => {

    // console.log(request.body);
    // console.log(request.file);

    data = new coursesModel({
        name : request.body.name,
        price : request.body.price,
        duration : request.body.duration,
        description : request.body.description,
        status : request.body.status ?? 1,
        order : request.body.order ?? 1,
    });

    if(request.file != undefined){
        if(request.file.filename != ''){
            data.image = request.file.filename;
        }
    }

    await data.save().then((result) => {
        var res = {
            status : true,
            message : 'Record create succussfully',
            data : result
        }
    
        response.send(res);
    }).catch((error) => {
        var error_messages = [];

        for(let field in error.errors){
            // console.log(field);
            error_messages.push(error.errors[field].message);
        }

        var res = {
            status : false,
            message : 'Something went wrong',
            error_messages : error_messages
        }
    
        response.send(res);
    })
}

exports.view = async(request,response) => {

    var condition = {
        deleted_at : null
    }

    if(request.body.name != undefined){
        if(request.body.name != ''){
            condition.name = new RegExp(request.body.name,'i');
        }
    } 

    if(request.body.price != undefined){
        if(request.body.price != ''){
            condition.price = request.body.price;
        }
    }

    if(request.body.duration != undefined){
        if(request.body.duration != ''){
            condition.duration = new RegExp(request.body.duration,'i');
        }
    }

    if(request.body.status != undefined){
        if(request.body.status != ''){
            condition.status = request.body.status;
        }
    }

    console.log(condition);

    // const totalRecords = await coursesModel.find(condition).countDocuments();

    // const totalPriceSum = await coursesModel.aggregate(
    //     [{
    //         $group : {
    //             _id: null,
    //             totalSum : {
    //                 $sum : '$price'
    //             }
    //         }
    //     }]
    // );

    // const avgPrice = await coursesModel.aggregate(
    //     [{
    //         $group : {
    //             _id: null,
    //             totalAvg : {
    //                 $avg : '$price'
    //             }
    //         }
    //     }]
    // );

    // const minPrice = await coursesModel.aggregate(
    //     [{
    //         $group : {
    //             _id: null,
    //             totalmin : {
    //                 $min : '$price'
    //             }
    //         }
    //     }]
    // );

    // const maxPrice = await coursesModel.aggregate(
    //     [{
    //         $group : {
    //             _id: null,
    //             totalmax : {
    //                 $max : '$price'
    //             }
    //         }
    //     }]
    // );

    const totalCalclulation = await coursesModel.aggregate(
            [{
                $group : {
                    _id: null,
                    count : {
                        $sum : 1
                    },
                    totalPriceSum : {
                        $sum : '$price'
                    },
                    avgPrice : {
                        $avg : '$price'
                    },
                    minPrice : {
                        $min : '$price'
                    },
                    maxPrice : {
                        $max : '$price'
                    }
                }
            }]
        );

    await coursesModel.find(condition)
    .sort({order: 'asc'},{_id : 'desc'})
    .limit(10)
    .then((result) => {
        if(result.length > 0){
            var res = {
                status : true,
                message : 'Record found successfully !!',
                imagePath : 'http://localhost:5005/uploads/courses/',
                totalCalclulation : totalCalclulation,
                // totalPriceSum : totalPriceSum,
                // avgPrice : avgPrice,
                // minPrice : minPrice,
                // maxPrice : maxPrice,
                data : result
            }
        
            response.send(res);
        } else {
            var res = {
                status : false,
                message : 'No Record found !!',
                data : ''
            }
        
            response.send(res);
        }
    }).catch((error) => {
        var res = {
            status : false,
            message : 'Something went wrong !!',
        }
    
        response.send(res);
    });

    
}

exports.details = async(request,response) => {
    
    var condition = {
        deleted_at : null
    }

    await coursesModel.findById(request.params.id).then((result) => {
        if(result != ''){
            var res = {
                status : true,
                message : 'Record found successfully !!',
                data : result
            }
        
            response.send(res);
        } else {
            var res = {
                status : false,
                message : 'No Record found !!',
                data : ''
            }
        
            response.send(res);
        }
    }).catch((error) => {
        var res = {
            status : false,
            message : 'Something went wrong !!',
        }
    
        response.send(res);
    });
}

exports.update = async(request,response) => {

    console.log(request.file);
    data = {
        name : request.body.name,
        price : request.body.price,
        duration : request.body.duration,
        description : request.body.description,
        status : request.body.status ?? 1,
        order : request.body.order ?? 1,
    };

    if(request.file != undefined){
        if(request.file.filename != ''){
            data.image = request.file.filename;
        }
    }

    await coursesModel.updateOne(
        {
            _id : request.body.id
        }, 
        {
            $set : data
        }
        
    )
    .then((result) => {

        var res = {
            status : true,
            message : 'Record update succussfully',
            data : result
        }
    
        response.send(res);
    }).catch((error) => {
        var error_messages = [];

        for(let field in error.errors){
            // console.log(field);
            error_messages.push(error.errors[field].message);
        }

        var res = {
            status : false,
            message : 'Something went wrong',
            error_messages : error_messages
        }
    
        response.send(res);
    })
}

exports.changeStatus = async(request,response) => {

    const courseData = await coursesModel.findOne({
        _id : request.body.id
    });

    // console.log(courseData.length);

    if(courseData == null){
        var res = {
            status : false,
            message : 'Id not match in the database',
        }
    
        response.send(res);
    }

    await coursesModel.updateOne(
        {
            _id : request.body.id
        }, 
        {
            $set : {
                status : request.body.status
            }
        } 
    )
    .then((result) => {

        var res = {
            status : true,
            message : 'Record update succussfully',
            data : result
        }
    
        response.send(res);
    }).catch((error) => {

        var res = {
            status : false,
            message : 'Something went wrong',
        }
    
        response.send(res);
    })
}

exports.delete = async(request,response) => {

    console.log(request.body.id);
    const courseData = await coursesModel.findOne({
        _id : request.body.id,
        deleted_at : null
    });

    if(courseData == null){
        var res = {
            status : false,
            message : 'Id not match in the database',
        }
    
        response.send(res);
    }

    await coursesModel.updateOne(
        {
            _id : request.body.id
        }, 
        {
            $set : {
                deleted_at : Date.now()
            }
        } 
    )
    .then((result) => {

        var res = {
            status : true,
            message : 'Record delete succussfully',
        }
    
        response.send(res);
    }).catch((error) => {

        var res = {
            status : false,
            message : 'Something went wrong',
        }
    
        response.send(res);
    })

}

exports.multipleDelete = async(request,response) => {

    await coursesModel.updateMany(
        {
            _id : { $in : request.body.ids }
        }, 
        {
            $set : {
                deleted_at : Date.now()
            }
        } 
    )
    .then((result) => {

        var res = {
            status : true,
            message : 'Record delete succussfully',
        }
    
        response.send(res);
    }).catch((error) => {

        var res = {
            status : false,
            message : 'Something went wrong',
        }
    
        response.send(res);
    })

}