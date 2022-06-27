const express = require('express');
const baseService = require('../base/service');

module.exports = (model,  populateList = []) => {
    const service = baseService(model, populateList);
    return {
        // read - all
        findAll(req, res, next) {
            return service.findAll()
                .then(list => res.json(list));
        },
        // read - one
        findOne(req, res, next) {
            return service.findOne(req.params.id)
                .then(entity => res.json(entity));
        },
        // update
        updateOne(req, res, next) {
            return service.updateOne(req.params.id, req.body)
                .then(entity => res.json(entity))
                .catch(err => {
                    res.statusCode = 501;
                    res.json(err);
                });
        },
        // create
        create(req, res, next) {
            return service.create(req.body)
                .then(cp => {
                    res.statusCode = 201;
                    res.json(cp);
                })
        },
        // read - search
        search(req, res, next) {
            return service.findAll(req.query)
                .then(list => res.json(list));
        },
        // delete
        delete(req, res, next) {
            return service.delete(req.params.id)
                .then(entity => res.json({}))
                .catch(err => {
                    res.statusCode = 501;
                    res.json(err);
                });
        }
    };
};