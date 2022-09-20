// methods: index, show, updatem store, destroy
/**
 index: listagem de Sessions
 store: Criar uma Session
 update: Alterar uma Session
 destroy: Deletar uma Session
 */

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'email inválido' });

    const { email } = req.body;

    // Verificando se o usuário já existe
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
