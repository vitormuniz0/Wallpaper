import { DataTypes } from "sequelize";
import sequelize from "../connection";

const PostCriado = sequelize.define('post_criado', {
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
    postCriado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}
);

export default PostCriado;