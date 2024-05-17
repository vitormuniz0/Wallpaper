const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password',{
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com Sucesso!.');
  } catch (error) {
    console.error('Conexão deu erro:', error);
  }

export default sequelize;