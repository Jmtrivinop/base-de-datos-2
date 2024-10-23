const { Schema, model } = require('mongoose');

const ContratoSchema = Schema({
    idFutbolista: {
        type: Schema.Types.ObjectId,
        ref: 'Futbolista',
        required: true
    },
    idEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fecha_fin: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },
    salario: {
        type: Number,
        required: [true, 'El salario es obligatorio']
    }
}, {
    collection: 'contratacion'
});

ContratoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}

module.exports = model('Contrato', ContratoSchema);
