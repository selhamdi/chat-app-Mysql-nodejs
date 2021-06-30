const express = require("express");
const pool = require("../models/connection");
const router = express.Router()
const cors = require('cors')

router.get("/deleteConversation", (req, res) => {
    pool.query("SELECT * FROM ValidityTest WHERE Created >= DATEADD(minute, -10, GETDATE())", (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})



module.exports = router;

