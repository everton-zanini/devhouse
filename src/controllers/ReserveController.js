import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";

class ReserveController {
    async store(req, res) {
        const { user_id } = req.headers
        const { house_id } = req.params;
        const { date } = req.body;

        const house = await House.findById(house_id);
        if(!house) return res.status(400).json({error:"Casa não existente."})
        if(house.status !== true) res.status(400).json({error:"Casa não disponível."})

        const user = await User.findById(user_id);
        if(String(user_id) === String(house.user)) res.status(400).json({error:"Casa pertence ao usuário, reserva não permitida."})

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        });

        const populateReserve = await Reserve.findOne({_id:reserve.id})
            .populate('user')
            .populate('house')
            .exec();

        return res.json(populateReserve);
    }
}

export default new ReserveController();