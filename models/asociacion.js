const { User } = require('./User');
const { Persona } = require('./Persona');

// Definir las asociaciones
User.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' });
Persona.hasMany(User, { foreignKey: 'id_persona', as: 'usuarios' });

// Sin exportar nada ya que sólo se configuran asociaciones
