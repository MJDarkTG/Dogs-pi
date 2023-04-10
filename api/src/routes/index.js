const { Router } = require('express');
const morgar = require("morgan")
const express = require("express")
const cors = require("cors")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogsRouter');
const tempRouter = require('./temperamentsRouter');
const morgan = require('morgan');

const router = Router();

router.use(express.json());
router.use(morgan("dev"));
router.use(cors());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter);
router.use("/temperaments", tempRouter);


module.exports = router;
