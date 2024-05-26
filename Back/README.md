#Guia para chamar as apis , qual os paramentros precisa-se passar!#


#Inicializa o programa #

# NPM START #

#  http://localhost:3008 # HTTP DO SERVIDOR

#CRIAR USUÁRIO#

# /createUser #

{
    "nome":"teste",
    "email":"teste@gmail.com",
    "senha":"234567"
}

#BUSCAR USUÁRIO# 

# /users # 

#ATUALIZAR USUÁRIO#

# /updateUser/id #  ex: /deleteUser/2

{
    "nome":"teste",
    "email":"teste@gmail.com",
    "senha":"234567"
}

#DELETAR USUÁRIO#

# /deleteUser/id #   ex: /deleteUser/2

#CRIAR POST#

# /criarPost #

{
    "user_id":2,
    "categoria":"paisagem",
    "src":"file" //Aqui será onde o arquivo será importado!
}


#BUSCAR POST#

# /posts #

#SALVAR POST#

# /salvarPost #

{
    "user_id":"2",
    "categoria":"paisagem",
    "id_post": 6
}

#BUSCAR POST#

# /posts/id #  ex: /salvoId/2




