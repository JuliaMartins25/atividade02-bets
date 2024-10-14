import { Router } from "express";

const suspeitosRoutes = Router();

let suspeitos = [
{
    id: Math.floor(Math.random() * 1000000),
    nome: "Bruno Mars",
    profissao: "cantor",
    aposta: true, //envolvimento em apostas
    nivel: "Alto",
},
];

suspeitosRoutes.get("/", (req, res) => {
return res.status(200).json(suspeitos);
});

suspeitosRoutes.post("/", (req, res) => {
const { nome, profissao, aposta, nivel } = req.body;

  // Validação dos campos nome e profissão

if (!nome || !profissao) {
    return res.status(400).send({
    message: "O nome ou a profissão não foi preenchido!",
    });
}

// Validação do nivel de suspeita

if (!["Baixo", "Médio", "Alto"].includes(nivel)) {
    return res.status(400).send({
    message:
        "o suspeito não tem nível!",
    });
}

// Criar um novo suspeito
const novosuspeito = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    profissao,
    aposta: aposta || false, // Define como false por padrão se não informado
    nivel
};

suspeitos.push(novosuspeito);
return res.status(201).json({
    message: "suspeito cadastrado com sucesso!",
    novosuspeito,
});
});

// Rota GET: Buscar suspeito pelo ID

suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;
    const suspeito = suspeitos.find((suspeito) => suspeito.id == id);

    if (!suspeito) {
        return res.status(404).json({ message: "Suspeito não encontrado!" });
    }
        return res.status(200).json(suspeito);
});


// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
    const { id } = req.params; 
    const { nome, profissao, aposta, nivel } = req.body;

    const suspeito = suspeitos.find((suspeito) => suspeito.id === Number(id));

    if (!suspeito) {
        return res.status(404).json({ message: `Suspeito não encontrado!` });
    }

    if (!nome || !profissao) {
        return res.status(400).json({ message: "Nome e profissão são obrigatórios!" });
    }

    if (nivel && !["Baixo", "Médio", "Alto"].includes(nivel)) {
        return res.status(400).json({ message: "o suspeito não tem nível!" });
    }

   // Atualizar os campos do suspeito 

    suspeito.nome = nome || suspeito.nome;
    suspeito.profissao = profissao || suspeito.profissao;
    suspeito.aposta = aposta !== undefined ? aposta : suspeito.aposta; // Mantém o valor se não for passado
    suspeito.nivel = nivel || suspeito.nivel;

    return res.status(200).json({
        message: "Suspeito atualizado com sucesso!",
        suspeito,
    });
});

// Deletar o sujeito pelo id
suspeitosRoutes.delete("/:id", (req, res) => {
const { id } = req.params;

const suspeito = suspeitos.find((suspeito) => suspeito.id === Number(id));
if (!suspeito) {
    return res.status(404).json({ message: "suspeito não encontrado" });
}
suspeitos = suspeitos.filter((suspeito) => suspeito.id !== Number(id));
return res.status(200).json({ message: "suspeito deletado com sucesso!" });
});

export default suspeitosRoutes;