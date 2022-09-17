
//methods: index, show, updatem store, destroy
/**
 index: listagem de Sessions
 store: Criar uma Session
 update: Alterar uma Session
 destroy: Deletar uma Session
 */

import User from "../models/User";

class SessionController {
    async store(req, res) {
        const { email } = req.body;

        //Verificando se o usuário já existe
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

export default new SessionController();