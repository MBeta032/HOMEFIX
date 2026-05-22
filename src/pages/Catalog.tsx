import "../styles/Catalog.css"

const categorias = [
  { icono: "🔧", nombre: "Plomería" },
  { icono: "⚡", nombre: "Electricidad" },
  { icono: "🪚", nombre: "Carpintería" },
  { icono: "🎨", nombre: "Pintura" },
  { icono: "🧹", nombre: "Limpieza" },
  { icono: "🌿", nombre: "Jardinería" },
  { icono: "🔌", nombre: "Electrodomésticos" },
  { icono: "🏠", nombre: "Mantenimiento" },
]

function Catalogo() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Nuestros servicios</h1>
        <p>Explora todas las categorías disponibles en HomeFix</p>
      </div>

      <div className="catalogo-grid">
        {categorias.map((cat) => (
          <div key={cat.nombre} className="catalogo-card">
            <span className="catalogo-icono">{cat.icono}</span>
            <p>{cat.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalogo
