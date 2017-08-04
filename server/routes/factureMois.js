const FactureMois = require('../models/FactureMois');

module.exports = (router) => {

    /**
     * GET ALL FactureMois
     */
    router.get('/facture-mois', (req, res, next) => {
        FactureMois.find((err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    });

    /**
     * GET ALL FactureMois BY FactureGlobal
     */
    router.get('/facture-mois/facture-global/:factureGlobal', (req, res, next) => {
        if (!req.params.factureGlobal) {
            res.json({
                success: false,
                message: 'factureGlobal._id not provided'
            });
        } else {
            // associe client to params
            // {} display all FactureMois informations
            FactureMois.find({ 'factureGlobal': req.params.factureGlobal }, {}, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    res.json(data);
                }
            });
        }
    });

    /**
     * GET ONE FactureMois
     */
    router.get('/facture-mois/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id not provided'
            });
        } else {
            FactureMois.findById(req.params.id, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    res.json(data);
                }
            });
        }
    });

    /**
     * SAVE FactureMois
     */
    router.post('/facture-mois', (req, res, next) => {
        if (!req.body) {
            res.json({
                success: false,
                message: 'data not provided'
            });
        } else {
            FactureMois.create(req.body, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        obj: data,
                        message: 'Facture Mois created'
                    });
                }
            });
        }
    });

    /**
     * UPDATE FactureMois
     */
    router.put('/facture-mois/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id not provided'
            });
        } else {
            FactureMois.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    FactureMois.findById(req.params.id, (err, data) => {
                        res.json({
                            success: true,
                            obj: data,
                            message: 'Facture Mois updated'
                        });
                    });
                }
            });
        }
    });

    /**
     * REMOVE FactureMois
     */
    router.delete('/facture-mois/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id not provided'
            });
        } else {
            FactureMois.findByIdAndRemove(req.params.id, req.body, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    if (data != null) {
                        res.json({
                            success: true,
                            message: 'Facture Mois deleted'
                        });
                    } else {
                        res.json({
                            success: true,
                            message: 'Error. Facture Mois doesn\'t exist'
                        });
                    }
                }
            });
        }
    });

    return router;
}