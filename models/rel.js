const Cliente = require('./Cliente')
const Drone = require('./Drone')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Drone, { 
    foreignKey: 'idCliente', 
    as: 'dronesCliente', 
    onDelete: 'CASCADE' })

Drone.belongsTo(Cliente, {
    foreignKey: 'idCliente', 
    as: 'clienteBicicleta',
    allowNull: false
})

Drone.hasMany(Agendamento, {
    foreignKey: 'idDrone',
    as: 'agendamentosDrone',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Drone, {
    foreignKey: 'idDrone', 
    as: 'droneAgendamento',
    allowNull: false
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'agendamentosCliente',
    onDelete: 'CASCADE'
})
Agendamento.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

module.exports = { Cliente, Drone, Agendamento }