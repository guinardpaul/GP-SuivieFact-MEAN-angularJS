const Devis = require('../models/Devis');

module.exports = (router) => {

    /**
     * Get All Devis
     */
    router.get('/devis', (req, res, next) => {
        Devis.find((err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    });

    /**
     * GET ALL DEVIS BY CLIENT
     */
    router.get('/devis/client/:client', (req, res, next) => {
        if (!req.params.client) {
            res.json({
                success: false,
                message: 'client._id not provided'
            });
        } else {
            // associe client to params
            // {} display all Devis informations
            Devis.find({ 'client': req.params.client }, {}, (err, data) => {
                if (data) {
                    res.json(data);
                } else {
                    res.json({
                        success: false,
                        message: 'Devis not found'
                    });
                }
            });
        }
    });

    /**
     * GET ONE DEVIS
     */
    router.get('/devis/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id not provided'
            });
        } else {
            Devis.findById(req.params.id, (err, data) => {
                if (data) {
                    res.json(data);
                } else {
                    res.json({
                        success: false,
                        message: 'Devis not found'
                    });
                }
            });
        }
    });

    /**
     * SAVE DEVIS
     */
    router.post('/devis', (req, res, next) => {
        if (!req.body) {
            res.json({
                success: false,
                message: 'data not provided'
            });
        } else {
            Devis.create(req.body, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        obj: data,
                        msg: 'Devis created'
                    });
                }
            });
        }
    });

    /**
     * UPDATE DEVIS
     */
    router.put('/devis/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id not provided'
            });
        } else {
            Devis.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                } else {
                    // Récupère Devis Updated
                    Devis.findById(req.params.id, (err, data) => {
                        res.json({
                            success: true,
                            obj: data,
                            msg: 'Devis updated'
                        });
                    });
                }
            });
        }
    });

    /**
     * REMOVE DEVIS
     */
    router.delete('/devis/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id not provided'
            });
        } else {
            Devis.findByIdAndRemove(req.params.id, req.body, (err, data) => {
                if (data) {
                    res.json({
                        success: true,
                        msg: 'Devis deleted'
                    });
                } else {
                    res.json({
                        success: false,
                        msg: 'Error. Devis doesn\'t exist'
                    });
                }
            });
        }
    });

    return router;
}