const EventHistory = require('../models/EventsHistory')
const User = require('../models/Users')
const moment = require('moment');
const {
    sequelize
} = require('../models/EventsHistory');

module.exports = {
    async getEvents(req, res) {
        try {
            const {UserId} = req.params;

            let histories = {},
                hardware = [];
            var obj = {};
            var cpu = {};
            await User.findByPk(UserId, {
                include: {
                    separate: true,
                    order: [['id', 'DESC']],
                    association: 'histories',
                    limit: 10
                }, 
            }).then((resultado) => {
                console.log(resultado)
                const x = resultado.get({
                    plain: true
                })

                hardware = x['histories']

                histories = hardware.map((registro) => {
                    const obj = {
                        id: registro.id,
                        userId: registro.UserId,
                        Oshi: registro.OshiStatus,
                        Gpu: registro.GPUStatus,
                        Cpu: registro.CpuStatus,
                        ctD: registro.createdAt
                    }
                    return obj;
                })

                obj = histories.map((resul) => {
                    const mpInfo = {
                        CpuFinal: resul.Cpu,
                        GpuFinal: resul.Gpu,
                        OshiFinal: resul.Oshi,
                        ctD: resul.ctD
                    }
                    return mpInfo
                })

                cpu = obj.map((resul) => {
                    const final = {
                        cpuDados: JSON.parse(resul.CpuFinal),
                        gpuDados: JSON.parse(resul.GpuFinal),
                        oshiDados: JSON.parse(resul.OshiFinal),
                        ctDDados: moment(resul.ctD).locale('pt-br').format('LLLL')
                    }
                    return final;
                });
            })
            return res.send({dadosHardware: cpu})
        } catch (error) {
            return res.send(error)
        }
    },
    async cadastrarEvento(req, res) {
        try {
            const {
                UserId
            } = req.body;
            const {
                OshiStatus,
                GPUStatus
            } = req.body;
            const x = await EventHistory.create({
                UserId: UserId,
                OshiStatus: OshiStatus,
                GPUStatus: GPUStatus
            })

            return res.send({
                x
            })

        } catch (error) {
            return res.send({
                error
            })
        }
    },
    async getAllUser(req, res) {

        const x = await User.findAll();
        const y = await EventHistory.findAll();

        res.status(200).send({
            message: "Done",
            pessoas: x,
            eventos: y
        });
    }
}