import flash from 'express-flash'
import Incident from '../models/Incident.mjs'
import User from '../models/User.mjs'

import { Op } from 'sequelize'

export default class IncidentsControler {
    
    static async showIncidents(req, res) {
        
        // Obtém o ID do usuário da sessão
        const userID = req.session.userid

        // Parte da busca por incidentes usando palavras chave
        let order = 'ASC'

        // Busca a instância de todos os incidentes no banco de dados
        const incidentsData = await Incident.findAll({
            include: User,
            order: [['riskLevel', 'DESC'], ['createdAt', 'ASC']]
        })

        // Comando pega apenas os valores (dataValues)
        const incidents = incidentsData.map((result => result.get({plain: true})))

        if(userID === undefined){
            res.render('incidents/home', { search, incidents});
        }else {
            // Busca a instância do usuário no banco de dados pelo ID
            const userInstance = await User.findOne({
                where: {
                    id : userID,
                },
            })
            // Se a instância do usuário for encontrada, converte-a em um objeto simples
            // Se não, define 'user' como null
            const user = userInstance ? userInstance.get({ plain: true }) : null;

            res.render('incidents/home', { user, incidents});
        }
    }

    static async userIncidents(req, res) {
        // Obtém o ID do usuário da sessão
        const userID = req.session.userid

        if(userID === undefined){
            res.render('incidents/home', { search, incidents});
        }else {
            // Busca a instância do usuário no banco de dados pelo ID
            const userInstance = await User.findOne({
                where: {
                    id : userID,
                },
            })
        // Se a instância do usuário for encontrada, converte-a em um objeto simples
        // Se não, define 'user' como null
        const user = userInstance ? userInstance.get({ plain: true }) : null;

        const incidents = await Incident.findAll({
            where: {
                Userid: userID
            },
            include: User,
            raw:true})


        res.render('incidents/userIncidents', {user, incidents})
        }
    }

    static async reportIncident(req, res) {
        
        // Obtém o ID do usuário da sessão
        const userID = req.session.userid

        if(userID === undefined){
            res.render('incidents/home', { search, incidents});
        }else {
            // Busca a instância do usuário no banco de dados pelo ID
            const userInstance = await User.findOne({
                where: {
                    id : userID,
                },
            })
        // Se a instância do usuário for encontrada, converte-a em um objeto simples
        // Se não, define 'user' como null
        const user = userInstance ? userInstance.get({ plain: true }) : null;

        res.render('incidents/report', {user})
        }
    }

    static async reportIncidentPost(req, res) {

        let riskLevelNum = req.body.severity * req.body.urgency * req.body.tendency;
        let riskLevelLowTxt = '';
        let riskLevelMediumTxt = '';
        let riskLevelHighTxt = '';
        if(riskLevelNum < 27){
            riskLevelLowTxt = true;
            riskLevelMediumTxt = null;
            riskLevelHighTxt = null;
        }else if(riskLevelNum >= 27 && riskLevelNum < 64){
            riskLevelLowTxt = null;
            riskLevelMediumTxt = true;
            riskLevelHighTxt = null;
        }else if(riskLevelNum >= 64){
            riskLevelLowTxt = null;
            riskLevelMediumTxt = null;
            riskLevelHighTxt = true;
        }

        const incident = {
            description: req.body.description,
            riskGroup: req.body.riskGroup,
            severity: req.body.severity,
            urgency: req.body.urgency,
            tendency: req.body.tendency,
            riskLevel: riskLevelNum,
            riskLevelLow: riskLevelLowTxt,
            riskLevelMedium: riskLevelMediumTxt,
            riskLevelHigh: riskLevelHighTxt,
            UserId: req.session.userid
        }

        try {
            console.log(incident.UserId)
            await Incident.create(incident)

            req.flash('message', 'incidente criado com sucesso')

            req.session.save(() => {
                res.redirect('/incidents/userIncidents')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async dashboard(req, res) { 
        res.render('incidents/dashboard')
    }
}