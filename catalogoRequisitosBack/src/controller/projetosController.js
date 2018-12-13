const express = require('express')
const cProjeto = require('../model/core/cProjeto')
const cTarefa = require('../model/core/cTarefa')

module.exports = function (server) {
    let router = express.Router()
    server.use('/projetos', router)

    let authMiddleware = require('../middleware/authMiddleware')
    router.use(authMiddleware)

    // buscar por projeto
    router.get('/', async (req, res) => {
        try {       
            const projetos = await cProjeto.find({ status: true }).populate('usuario', 'tarefas')
            return res.send({ projetos })

        } catch (err) {
            return res.status(400).send({ Error: 'Erro ao buscar todos os projetos' })
        }
    })

    // buscar por nome projeto
    router.get('/:nome', async (req, res) => {
        try {
            const projetos = await cProjeto.findOne({
                 nome: req.params.nome, 
                 status: true 
                }, 'nome descricao usuario tarefas').populate('usuario', 'tarefas')

            return res.send({ projetos })

        } catch (err) {
            return res.status(400).send({ Error: 'Erro ao buscar todos os projetos' })
        }
    })

    //buscar por Id do Projeto
    router.get('/projetoId/:projetoId', async (req, res) => {
        try {
            console.log(req.params.projetoId)
            const projeto = await cProjeto.findById(req.params.projetoId).populate('usuario', 'tarefas')
            return res.send({ projeto })

        } catch (err) {
            return res.status(400).send({ Error: 'Erro ao buscar esse projeto, tente novamente' })
        }
    })
//98995.9702
    //Gravar Projeto
    router.post('/', async (req, res) => {

        try {
            const { nome, descricao, tarefas } = req.body

            const projeto = await cProjeto.create({ nome, descricao, usuario: req.usuario })

            await Promise.all(tarefas.map(async tarefa => {
                const projetoTarefa = new cTarefa({ ...tarefa, projeto: projeto._id })

                await projetoTarefa.save()

                projeto.tarefas.push(projetoTarefa)

            }))

            await projeto.save()

            return res.status(201).send({ projeto })

        } catch (err) {
            return res.status(400).send({ Error: 'Erro ao criar o projeto' }, err)
        }

    })

    //Alterar Projeto
    router.put('/:projetoId', async (req, res) => {
        // try {
        const { nome, descricao, tarefas } = req.body

        // console.log(nome, descricao, tarefas)           
        const projeto = await cProjeto.findByIdAndUpdate(req.params.projetoId, {
            nome,
            descricao,
            usuario: req.usuario
        }, { new: true })

        //atualiza as tarefas
        if (projeto.tarefas !== undefined) {
            projeto.tarefas = []
            await cTarefa.remove({ projeto: projeto._id })
        }

        //Grava em Bloco os projetos e Tarefas
        await Promise.all(tarefas.map(async tarefa => {
            const projetoTarefa = new cTarefa({ ...tarefa, projeto: projeto._id })

            await projetoTarefa.save()

            projeto.tarefas.push(projetoTarefa)
            // projetoTarefa.save().then(tarefa => projeto.tarefas.push(tarefa))
        }))

        await projeto.save()

        return res.status(200).send({ projeto })

        // } catch (err) {
        //     return res.status(400).send({ Error: 'Erro ao alterar o projeto' })
        // }
    })

    //Deletar Projeto
    router.delete('/:projetoId', async (req, res) => {
        try {

            const projeto = await cProjeto.findByIdAndRemove(req.params.projetoId).populate('usuario')

            if (projeto.tarefas !== undefined) {
                projeto.tarefas = []
                await cTarefa.remove({ projeto: projeto._id })
            }

            return res.status(200).send({ projeto })

        } catch (err) {
            return res.status(400).send({ Error: 'Erro ao buscar esse projeto, tente novamente' })
        }
    })

}