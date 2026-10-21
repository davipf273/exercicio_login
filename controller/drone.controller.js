const Drone = require('../models/Drone')
const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const CHAVE_SEGRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.modelo || !valores.marca || !valores.tipoServico || !valores.numeroSerie || !valores.idCliente){
        return res.status(400).json({message: 'Todos os campos são obrigatorios'})
    }

    try{
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({message: 'Cliente informado não existe!'})
        }
        const numeroSerieCriptografado = CryptoJS.AES.encrypt(valores.numeroSerie, CHAVE_SEGRETA).toString()

        const novoDrone = await Drone.create({
            modelo: valores.modelo,
            marca: valores.marca,
            tipoServico: valores.tipoServico,
            numeroSerie: numeroSerieCriptografado,
            idCliente: valores.idCliente
        })
        return res.status(404).json({message: 'Drone cadastrado com sucesso!',drone: novoDrone})
    }catch(err){
        console.error('Erro ao cadastrar Drone',err)
        return res.status(500).json({message: 'Erro ao cadastrar Drone!'})
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const drone = await Drone.findByPk(id)
        if (!drone) {
            return res.status(404).json({ message: 'Drone não encontrado!' })
        }

        const bytes = CryptoJS.AES.decrypt(drone.numeroSerie, CHAVE_SECRETA)
        const numeroSerieDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
        

        return res.status(200).json({
            codDrone: drone.codDrone,
            modelo: drone.modelo,
            marca: drone.marca,
            numeroSerie: numeroSerieDescriptografado,
            tipoServico: drone.tipoServico,
            idCliente: drone.idCliente
            
        })
    } catch (err) {
        console.error('Erro ao consultar drone:', err)
        return res.status(500).json({ message: 'Erro ao consultar drone!' })
    }
}

module.exports = {cadastrar, consultar}