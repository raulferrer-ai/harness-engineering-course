const modules = require("./modules.json");

// Modules with dedicated learning pages are excluded from generic scaffold pagination.
// Keep the scaffold for modules whose detailed content is still pending.
module.exports = modules.filter(({ slug }) => !["modelos-capacidades-limites", "especificacion-y-diseno", "ingenieria-de-contexto", "desarrollo-asistido-y-revision", "agentes-herramientas-delegacion"].includes(slug));
