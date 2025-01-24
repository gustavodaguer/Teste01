const jwt = require("jsonwebtoken");

// Middleware para verificar JWT
function authMiddleware(roles) {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token não fornecido" });

    // Verifica o token JWT
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Token inválido" });

      // Verifica o papel do usuário (Admin, Gerente, Caixa)
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Acesso negado" });
      }

      req.user = decoded;
      next();
    });
  };
}

module.exports = authMiddleware;
