const modules = require("./modules.json");

// M01 has a dedicated, fully developed page in src/modulos/.
// Keep the scaffold pagination for the remaining modules only.
module.exports = modules.filter(({ slug }) => !["modelos-capacidades-limites", "especificacion-y-diseno"].includes(slug));
