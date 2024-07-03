const { verify } = require("jsonwebtoken");
/**
 * Middleware para validar o token de acesso.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * @param {Function} next - A função de callback que passa para o próximo middleware.
 * 
 * @returns {Object} - Se não autenticado, retorna uma resposta com status 401 e mensagem de erro.
 * Se autenticado, armazena as informações do usuário na requisição e permite o prosseguimento do codigo.
 */
const validateToken = (req, res, next) => {
  const acessToken = req.cookies["accessToken"];
  if (!acessToken) {
    return res
      .status(401)
      .json({ error: "User not Authenticated!", cookie: req.cookies });
  }
  try {
    const validToken = verify(acessToken, process.env.SECRET_KEY);
    if (validToken) {
      req.user = validToken;
      return next();
    }
  } catch (err) {
    res.clearCookie("accessToken")
    return res.status(401).json({ error: err });
  }
};
module.exports = { validateToken };
