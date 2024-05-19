import Sequelize from 'sequelize';

export const sequelize = new Sequelize('wallpaper', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com Sucesso!.');
  } catch (error) {
    console.error('Conexão deu erro:', error);
    throw error;
  }
}



export default {testConnection};