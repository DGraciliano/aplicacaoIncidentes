import User from '../models/User.mjs'

import bcrypt from 'bcryptjs'

export default class AuthController {
    static login (req,res) {
        res.render('auth/login')
    }

    static async loginPost (req, res) {

        const {email, password} = req.body

        // Check if user exists
        const user = await User.findOne({where : {email : email}})

        if(!user) {
            //mensagem de erro de usuário não existente
            req.flash('message', 'Usuário não existe, tente novamente ou faça o cadastro')
            res.render('auth/login')

            return
        }

        // Check if senha está correta
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message', 'Senha de usuário incorreta! Tente novamente.')
            res.render('auth/login')

            return
        }

        // Iniciar a sessão após confirmação do usuário e da senha
        req.session.userid = user.id
        //console.log(req.session)

        // Mensagem de sucesso na autenticação
        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')  
        })
    }

    static register (req,res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const {name, email, password, confirmpassword } = req.body

        // password match validation
        if(password != confirmpassword) {
            //mensagem de erro de senhas diferentes usando flash messages que é enviada para a view
            req.flash('message', 'As senhas não conferem, tente novamente')
            res.render('auth/register')
            
            return
        }

        // Check if user exists
        const checkIfUserExists = await User.findOne({where : {email : email}})

        if(checkIfUserExists) {
            req.flash('message', 'O email já está em uso!')
            res.render('auth/register')

            return
        }

        // Create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            
            const createdUser = await User.create(user)

            // Iniciar a sessão automaticamente
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')  
            })
        } catch (error) {
            console.log(error)
        }

    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

}