//ESSA AQUI É DEDICADA AOS USUÁRIOS

import express from "express";
import sql from "./database.js"
import { CompararHash, CriarHash } from "./utilits.js";

const routes = express.Router()

routes.post('/login', async (req, res) => {
try{ 
    const { email, senha } = req.body
    let user = await sql`select 
    * from people where email=${email}`

    const teste = await CompararHash(senha, user[0].senha)
    
    if(teste) {
        return res.status(200).json(user[0])
    }
    else {
        return res.status(401).json('Usuario ou senha incorreto!')
    }
}
   
    catch(error){
        return res.status(500).json('Erro de servidor')
    }
})

routes.post('/cadastrar', async (req, res) => {
    try{
    const { email, senha } = req.body
    const hash = await CriarHash(senha, 10)

    await sql`INSERT INTO people(email, senha, funcao) values (${email}, ${hash},'cliente')`
    return res.status(200).json('cadastrado com sucesso')

}
    catch(error){
        return res.status(500).json('Erro de Servidor')
    }
})

// DEDICADA AO CADASTRO DE CASAS

routes.get('/Imovel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const casa = await sql`SELECT * FROM Imovel WHERE id_imovel = ${id}`;

        if (casa.length === 0) {
            return res.status(404).json({ mensagem: 'Casa não encontrada.' });
        }

        return res.status(200).json(casa[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao buscar a casa.' });
    }
});



routes.post('/Imovel/cadastrar', async (req, res) => {
    try {
        const { nome_casa,tipo_moradia,finalidade,preco,rua,bairro,numero,cep,area_total,quartos,banheiros,vagas_garagem,disponibilidade
        } = req.body;

        await sql`
            INSERT INTO Imovel (
                nome_casa,
                tipo_moradia, 
                finalidade, 
                preco, 
                rua,
                bairro,
                numero,
                cep, 
                area_total, 
                quartos, 
                banheiros, 
                vagas_garagem
            ) VALUES (
                ${nome_casa},
                ${tipo_moradia}, 
                ${finalidade}, 
                ${preco}, 
                ${rua}
                ${bairro}
                ${numero}
                ${cep}, 
                ${area_total}, 
                ${quartos}, 
                ${banheiros}, 
                ${vagas_garagem}
                ${disponibilidade})`;

        return res.status(200).json('Deu certinho aqui!!!');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao cadastrar a casa.' });
    }
});

routes.put('/Imovel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nome_casa,
            tipo_moradia,
            finalidade,
            preco,
            rua,
            bairro,
            numero,
            CEP,
            area_total,
            quartos,
            banheiros,
            vagas_garagem,
            disponibilidade
        } = req.body;

        const update = await sql`
            UPDATE casas SET
                nome_casa = ${nome_casa},
                tipo_moradia = ${tipo_moradia},
                finalidade = ${finalidade},
                preco = ${preco},
                rua = ${rua},
                bairro = ${bairro},
                numero = ${numero},
                CEP = ${CEP},
                area_total = ${area_total},
                quartos = ${quartos},
                banheiros = ${banheiros},
                vagas_garagem = ${vagas_garagem},
                disponibilidade = ${disponibilidade}
            WHERE id_imovel = ${id}
        `;

        return res.status(200).json({ mensagem: 'Casa atualizada com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao atualizar a casa.' });
    }
});

routes.delete('/Imovel/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await sql`DELETE FROM Imovel WHERE id_imovel = ${id}`;

        return res.status(200).json({ mensagem: 'Casa excluída com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao excluir a casa.' });
    }
});


routes.post('/fotos_casa', async (req, res) =>{
    try{
        await sql`
        INSERT INTO fotos_casa(imagem)
	VALUES (${req.files.imagem.mimetype})`;
        return res.status(201).json('ok')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('Erro ao inserir fotos')
    }
})

routes.get('/fotos_casa', async (req, res) =>{
    try {
        const imagens = await sql`select * from fotos_casa`
        return res.status(200).json(imagens)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro ao encontrar imagens')
    }
})


export default routes

