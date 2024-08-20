import { Sequelize } from "sequelize";

const sequelize = new Sequelize('incidents', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao DB com sucesso!')
} catch (error) {
    console.log(`Não foi possível conectar: ${error}`)    
}

export default sequelize