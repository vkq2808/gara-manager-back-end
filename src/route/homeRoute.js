import express from 'express';

const router = express.Router();

let homeRoute = (app) => {
    router.get("/", (req, res) => {

        return res.json({

        });

    });

    return app.use("/", router);
}

module.exports = router;