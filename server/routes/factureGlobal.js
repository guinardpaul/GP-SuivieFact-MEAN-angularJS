const FactureGlobal = require('../models/FactureGlobal');

module.exports = (router) => {

    /**
     * GET ALL FactureGlobal
     */
    router.get('/facture-global', (req, res, next) => {
        FactureGlobal.find((err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    });

    /**
     * GET ALL FactureGlobal BY CLIENT
     */
    router.get('/facture-global/client/:client', (req, res, next) => {
        if (!req.params.client) {
            res.json({
                success: false,
                message: 'client_id not provided'
            });
        } else {
            // associe client to params
            // {} display all FactureGlobal informations
            FactureGlobal.find({ 'client': req.params.client }, {}, (err, data) => {
                if (data) {
                    res.json(data);
                } else {
                    res.json({
                        success: false,
                        message: 'Facture Global not found'
                    });
                }
            });
        }
    });

    /**
     * GET ONE FactureGlobal BY REF_FACTUREGLOBAL
     */
    router.get('/facture-global/ref/:ref_factureGlobal', (req, res, next) => {
        if (!req.params.ref_factureGlobal) {
            res.json({
                success: false,
                message: 'Ref not provided'
            });
        } else {
            // associe ref to params
            // {} display all FactureGlobal informations
            FactureGlobal.findOne({ 'ref_factureGlobal': req.params.ref_factureGlobal }, {}, (err, facture) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    });
                }
                if (facture) {
                    res.json({
                        success: true,
                        message: 'Facture global with ref "' + req.params.ref_factureGlobal + '" already exists'
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Facture Global not found'
                    });
                }
            });
        }
    });

    /**
     * GET ONE FactureGlobal
     */
    router.get('/facture-global/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id_fact not provided'
            });
        } else {
            FactureGlobal.findById(req.params.id, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                }
                if (data) {
                    res.json(data);
                } else {
                    res.json({
                        success: false,
                        message: 'Facture Global not found'
                    });
                }
            });
        }
    });

    /**
     * SAVE FactureGlobal
     */
    router.post('/facture-global', (req, res, next) => {
        if (!req.body) {
            res.json({
                success: false,
                message: 'Data not provided'
            });
        } else {
            FactureGlobal.create(req.body, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        obj: data,
                        msg: 'Facture Global created'
                    });
                }
            });
        }
    });

    /**
     * UPDATE FactureGlobal
     */
    router.put('/facture-global/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id_fact not provided'
            });
        } else {
            FactureGlobal.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    FactureGlobal.findById(req.params.id, (err, data) => {
                        res.json({
                            success: true,
                            obj: data,
                            msg: 'Facture Global updated'
                        });
                    });
                }
            });
        }
    });

    /**
     * REMOVE FactureGlobal
     */
    router.delete('/facture-global/:id', (req, res, next) => {
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'id_fact not provided'
            });
        } else {
            FactureGlobal.findByIdAndRemove(req.params.id, req.body, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                }
                if (data != null) {
                    res.json({ success: true, msg: 'Facture Global deleted' });
                } else {
                    res.json({ success: false, msg: 'Error. Facture Global doesn\'t exist' });
                }
            });
        }
    });

    return router;
}