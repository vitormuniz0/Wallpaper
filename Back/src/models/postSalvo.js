import { DataTypes } from "sequelize";
import sequelize from "../connection";

const PostSalvo = sequelize.define('post_salvo', {
    id_post: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Nome da tabela de referencia
            key: 'id'  // nome da coluna
        }
    },
    postSalvo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCriacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}
);

export default PostSalvo;