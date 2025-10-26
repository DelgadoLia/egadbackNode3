const users = require("../modelo/users.json");

exports.login = (req, res) => {
    const { cuenta } = req.body || {};
    const contrasena = req.body?.contrasena ?? req.body?.["contrasena"];

    if(!cuenta || !contrasena){
        return res.status(400).json({
            error: "Faltan todos los campos >:( ",
            ejemplo: {cuenta: "Elia", contrasena: "Domingo"}
        });
    }


const match = users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);

if(!match){
    return res.status(401).json({error: "Credenciales invalidas tonto :0"});
}

return res.status(200).json({
    mensaje: "Acceso permitido", 
    usuario: { cuenta: match.cuenta, contrasena : match.contrasena  }
});

}