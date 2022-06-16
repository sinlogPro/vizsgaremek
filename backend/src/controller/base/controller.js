const express = require('express');
const baseService = require('../base/service');

module.exports = (model) => {
    const service = baseService(model);
    return {


        create(req, res, next) {
            // const validationErrors = new Model(req.body).validateSync();
            // if (validationErrors) {
            //     return next(
            //         new createError.BadRequest(validationErrors)
            //     );
            // }
        
            return service.create(req.body)
                .then(cp => {
                    res.status(201);
                    res.json(cp);
                })
//                .catch(err => next(new createError.InternalServerError(err.message)));
        },
         

        findAll(req, res, next) {
            return service.findAll()
                .then(list => res.json(list));
        },
        findOne(req, res, next) {
            return service.findOne(req.params.id)
                .then(entity => res.json(entity));
        },
        updateOne(req, res, next) {
            return service.updateOne(req.params.id, req.body)
                .then(entity => res.json(entity))
                .catch(err => {
                    res.statusCode = 501;
                    res.json(err);
                });
        }
    };
};