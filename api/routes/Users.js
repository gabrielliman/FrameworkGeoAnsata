const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');
const {sign} = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter todas as instâncias de um framework por usuário.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o ID do framework e ID do usuário.
 * @param {Object} res - O objeto de resposta (response) que retorna um array de instâncias associadas ao framework e usuário especificados.
 * 
 * @returns {Array} - Um array contendo todas as instâncias encontradas para o framework e usuário especificados.
 *                   Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/:frameworkId/:userId", async (req, res) => {
  const frameworkId = req.params.frameworkId;
  const userId = req.params.userId;
  const InstancesByFrameworkandUser = await Instances.findAll({
    where: {
      FrameworkID: frameworkId,
      UserID: userId,
    },
  });
  res.json(InstancesByFrameworkandUser);
});

/**
 * Rota para criar um novo usuário.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo os dados do novo usuário a ser criado (Username, Email, Password).
 * @param {Object} res - O objeto de resposta (response) que retorna a confirmação de criação do usuário ou erro se o usuário já existir.
 * 
 * @returns {Object} - Um objeto com a confirmação de que o usuário foi criado com sucesso.
 *                    Retorna erro se o Username ou Email já estiverem em uso.
 */
router.post("/", async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const existingUser = await Users.findAll({
      where: {
        [Op.or]: [{ Username: Username }, { Email: Email }],
      },
    });
    if (existingUser.length > 0) {
      res.json({ error: "Username or email already exists" });
      return;
    }else{
    await Users.create({
      Username: Username,
      Email: Email,
      Password: hashedPassword,
    });
    res.json({ confirmation: "User Created" });
  };
  } catch (error) {
    res.json({ error: "Internal server error" });
  }
});

/**
 * Rota para realizar o login de usuário.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo os dados de login do usuário (Username, Password).
 * @param {Object} res - O objeto de resposta (response) que retorna a confirmação de login ou erro se as credenciais estiverem incorretas.
 * 
 * @returns {Object} - Um objeto com a confirmação de que o usuário foi autenticado com sucesso.
 *                    Retorna erro se o usuário não existir ou se a combinação de Username e Password estiver incorreta.
 */
router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const user = await Users.findOne({ where: { Username: Username } });

    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }

    const match = await bcrypt.compare(Password, user.Password);

    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" });
    }

    //JWT
    const acessToken = sign({Username: user.Username, ID: user.ID, Email: user.Email, Admin: user.IsAdministrator},secretOrPrivateKey=process.env.SECRET_KEY);
    res.cookie("accessToken", acessToken,{
      maxAge: 1000*60*60*24*30,
      httpOnly: true
    });
     return res.json({ confirmation: "YOU LOGGED IN!!!" });

     
  } catch (error) {
    console.error("Error logging in:", error);
    return res.json({ error: "Internal server error" });
  }
});

/**
 * Rota para realizar o logout de usuário.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response) que retorna a confirmação de logout.
 * 
 * @returns {Object} - Um objeto com a mensagem de que o usuário foi deslogado com sucesso.
 *                    Retorna erro interno do servidor em caso de falha no logout.
 */
router.post("/logout", async (req, res) => {
  try{
  res.clearCookie("accessToken");
  res.json({ message: "Logged out successfully" });
}
catch(error){
  console.error("Error Logging out")
}});


/**
 * Rota para obter informações do usuário autenticado.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o token de autenticação com as informações do usuário.
 * @param {Object} res - O objeto de resposta (response) que retorna as informações do usuário autenticado (Username, Email, IsAdministrator).
 * 
 * @returns {Object} - Um objeto com as informações do usuário autenticado.
 *                    Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/me", validateToken, async (req, res) => {
  try {
    const userId = req.user.ID;
    const user = await Users.findByPk(userId, {
      attributes: ["Username", "Email", "IsAdministrator"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
