const { Router } = require('express');
const axios = require('axios')
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js")

const dogsRouter = Router();

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


//TRAEMOS PERRITOS DEL API
const dogsApi = async () => {
    // 
    const getAxios = await axios.get(url)
    const mydogs = getAxios.data.map(dog => {
        let termerArray = [];
        if (dog.temperament) {
            termerArray = dog.temperament.split(", ");
        }
        let weightArray = []
        if (dog.weight) {
            weightArray = dog.weight.metric.split(" - ")
        }
        let heightArray = []
        if (dog.height) {
            heightArray = dog.height.metric.split(" - ")
        }
        return {
            id: dog.id,
            name: dog.name,
            weight: weightArray,
            height: heightArray,
            temperament: termerArray,
            life_span: dog.life_span,
            image: dog.image.url,
        }

    })
    return mydogs;
}
//traemos perritos de la base de datos
const dogsBd = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },

    })
}
// perritos de la api y de la bd
const dogsApiBd = async () => {
    const dApi = await dogsApi()
    const dBd = await dogsBd()
    const ApiBd = [...dApi, ...dBd]
    return ApiBd;
}
dogsRouter.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        const dogsAll = await dogsApiBd()
        if (name) {
            const dog = dogsAll.filter(dog => dog.name.toLowerCase() === name.toLowerCase())
            if (dog.length) {
                return res.status(200).send(dog)
            } else {
                return res.status(404).send("no existe perrito con ese nombre")
            }
        } else {
            return res.status(200).send(dogsAll)
        }
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
})

dogsRouter.get("/:idRaza", async (req, res) => {

    const { idRaza } = req.params;
    const dogsAll = await dogsApiBd()
    const dog = dogsAll.filter(dog => dog.id == idRaza)
    if (dog.length) {
        return res.status(200).send(dog)
    } else {
        return res.status(404).send("No existe perrito con ese id")
    }
})

dogsRouter.post("/", async (req, res) => {

    try {
        const {
            name,
            max_height,
            min_height,
            max_weigth,
            min_weight,
            life_span,
            temperament,
            image
        } = req.body;

        const AllHeight = [];
        AllHeight.push(max_height, min_height);
        const AllWeight = [];
        AllWeight.push(max_weigth, min_weight);

        const dog = await Dog.create({
            name,
            height: AllHeight,
            weight: AllWeight,
            life_span,
            image: image ? image : "https://www.eloccidental.com.mx/incoming/gvhext-richard-burlton-htpmedsyzag-unsplash.jpg/alternates/LANDSCAPE_768/richard-burlton-HTpmedSyZag-unsplash.jpg"
        })
        // console.log(dog.__proto__);
        const asociatedTemer = await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        dog.addTemperament(asociatedTemer);
        return res.status(201).send(dog)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
})
module.exports = dogsRouter;
