import { useState } from 'react'

const teamMembers = [
  { name: "Philippe", role: "Team Principal", area: "Dirección" },
  { name: "Gabi", role: "Directora Deportiva", area: "Dirección" },
  { name: "Andrea", role: "Manager", area: "Dirección" },
  { name: "Laura C", role: "Finanzas", area: "Administración" },
  { name: "María", role: "Administración", area: "Administración" },
  { name: "Carlos", role: "Ingeniero Jefe", area: "Ingeniería" },
  { name: "Pablo", role: "Ingeniero de Datos", area: "Ingeniería" },
  { name: "Sergio", role: "Mecánico Jefe", area: "Mecánica" },
  { name: "Iván", role: "Mecánico", area: "Mecánica" },
  { name: "Rubén", role: "Mecánico", area: "Mecánica" },
  { name: "Diego", role: "Mecánico", area: "Mecánica" },
  { name: "Marcos", role: "Mecánico", area: "Mecánica" },
  { name: "Laura P", role: "Comunicación", area: "Marketing" },
  { name: "Sofía", role: "Diseño", area: "Marketing" },
  { name: "Álvaro", role: "Fotografía", area: "Marketing" },
  { name: "Nuria", role: "Hospitality", area: "Hospitality" },
  { name: "Elena", role: "Hospitality", area: "Hospitality" },
  { name: "Marta", role: "Hospitality", area: "Hospitality" },
  { name: "Tomás", role: "Logística", area: "Logística" },
  { name: "Javier", role: "Logística", area: "Logística" },
  { name: "Piloto 1", role: "Piloto", area: "Pilotos" },
  { name: "Piloto 2", role: "Piloto", area: "Pilotos" },
  { name: "Miguel", role: "Médico", area: "Médico" },
  { name: "Rosa", role: "Fisio", area: "Médico" },
  { name: "Fernando", role: "Seguridad", area: "Seguridad" },
  { name: "Luis", role: "Seguridad", area: "Seguridad" },
  { name: "Ana", role: "IT", area: "IT" },
  { name: "Jorge", role: "IT", area: "IT" },
  { name: "Raúl", role: "Relaciones Públicas", area: "RRPP" }
]

const events = [
  { id: 1, name: "Imola", date: "Mayo 2026", location: "Autodromo Enzo e Dino Ferrari, Italia", status: "planificando" },
  { id: 2, name: "Portimao", date: "Septiembre 2026", location: "Autodromo Internacional do Algarve, Portugal", status: "planificando" }
]

const initialStock = [
  { id: 1, item: "Neumáticos Slick", cantidad: 8, minimo: 4, unidad: "sets" },
  { id: 2, item: "Neumáticos Lluvia", cantidad: 2, minimo: 2, unidad: "sets" },
  { id: 3, item: "Aceite Motor", cantidad: 15, minimo: 10, unidad: "litros" },
  { id: 4, item: "Líquido Frenos", cantidad: 3, minimo: 5, unidad: "litros" },
  { id: 5, item: "Pastillas Freno", cantidad: 4, minimo: 4, unidad: "juegos" },
  { id: 6, item: "Combustible", cantidad: 200, minimo: 100, unidad: "litros" },
  { id: 7, item: "Guantes Mecánico", cantidad: 20, minimo: 15, unidad: "pares" },
  { id: 8, item: "Uniformes", cantidad: 5, minimo: 10, unidad: "unidades" }
]

const initialCashflow = [
  { id: 1, tipo: "ingreso", concepto: "Patrocinador Principal", importe: 50000, fecha: "2026-01-15", evento: "General" },
  { id: 2, tipo: "ingreso", concepto: "Patrocinador Secundario", importe: 20000, fecha: "2026-02-01", evento: "General" },
  { id: 3, tipo: "gasto", concepto: "Inscripción Imola", importe: 8000, fecha: "2026-02-15", evento: "Imola" },
  { id: 4, tipo: "gasto", concepto: "Transporte camión Imola", importe: 3500, fecha: "2026-03-01", evento: "Imola" },
  { id: 5, tipo: "gasto", concepto: "Hotel equipo Imola", importe: 4200, fecha: "2026-03-01", evento: "Imola" },
  { id: 6, tipo: "gasto", concepto: "Inscripción Portimao", importe: 8000, fecha: "2026-04-01", evento: "Portimao" }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stock, setStock] = useState(initialStock)
  const [cashflow, setCashflow] = useState(initialCashflow)
  const [compras, setCompras] = useState([])
  const [reuniones, setReuniones] = useState([])
  const [checklist, setChecklist] = useState([])
  const [newCompra, setNewCompra] = useState({ concepto: '', importe: '', proveedor: '', evento: 'Imola', solicitante: '', estado: 'pendiente' })
  const [newReunion, setNewReunion] = useState({ titulo: '', fecha: '', participantes: '', notas: '' })
  const [newChecklist, setNewChecklist] = useState({ tarea: '', evento: 'Imola', responsable: '', prioridad: 'media' })
  const [newCashflow, setNewCashflow] = useState({ tipo: 'gasto', concepto: '', importe: '', fecha: '', evento: 'General' })

  const totalIngresos = cashflow.filter(c => c.tipo === 'ingreso').reduce((a, b) => a + b.importe, 0)
  const totalGastos = cashflow.filter(c => c.tipo === 'gasto').reduce((a, b) => a + b.importe, 0)
  const balance = totalIngresos - totalGastos
  const stockAlertas = stock.filter(s => s.cantidad <= s.minimo)
  const comprasPendientes = compras.filter(c => c.estado === 'pendiente')

  const tabs = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'compras', label: '🛒 Compras' },
    { id: 'logistica', label: '✈️ Logística' },
    { id: 'staff', label: '👥 Staff' },
    { id: 'stock', label: '📦 Stock' },
    { id: 'cashflow', label: '💰 Cashflow' },
    { id: 'reuniones', label: '📅 Reuniones' },
    { id: 'checklist', label: '✅ Checklist' },
    { id: 'tarjetas', label: '💳 Tarjetas' }
  ]

  const addCompra = () => {
    if (!newCompra.concepto || !newCompra.importe) return
    const necesitaAprobacion = parseFloat(newCompra.importe) > 200
    setCompras([...compras, { 
      ...newCompra, 
      id: Date.now(), 
      importe: parseFloat(newCompra.importe),
      necesitaAprobacion,
      aprobadoPor: necesitaAprobacion ? 'Pendiente (Philippe/Gabi/Laura C)' : 'Auto-aprobado'
    }])
    setNewCompra({ concepto: '', importe: '', proveedor: '', evento: 'Imola', solicitante: '', estado: 'pendiente' })
  }

  const aprobarCompra = (id) => {
    setCompras(compras.map(c => c.id === id ? { ...c, estado: 'aprobada' } : c))
  }

  const rechazarCompra = (id) => {
    setCompras(compras.map(c => c.id === id ? { ...c, estado: 'rechazada' } : c))
  }

  const addReunion = () => {
    if (!newReunion.titulo || !newReunion.fecha) return
    setReuniones([...reuniones, { ...newReunion, id: Date.now() }])
    setNewReunion({ titulo: '', fecha: '', participantes: '', notas: '' })
  }

  const addChecklist = () => {
    if (!newChecklist.tarea) return
    setChecklist([...checklist, { ...newChecklist, id: Date.now(), completada: false }])
    setNewChecklist({ tarea: '', evento: 'Imola', responsable: '', prioridad: 'media' })
  }

  const toggleChecklist = (id) => {
    setChecklist(checklist.map(c => c.id === id ? { ...c, completada: !c.completada } : c))
  }

  const addCashflow = () => {
    if (!newCashflow.concepto || !newCashflow.importe) return
    setCashflow([...cashflow, { ...newCashflow, id: Date.now(), importe: parseFloat(newCashflow.importe) }])
    setNewCashflow({ tipo: 'gasto', concepto: '', importe: '', fecha: '', evento: 'General' })
  }

  const styles = {
    app: { fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#ffffff' },
    header: { backgroundColor: '#111', borderBottom: '2px solid #e30613', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
    logo: { fontSize: '24px', fontWeight: 'bold', color: '#e30613' },
    nav: { backgroundColor: '#111', padding: '0 20px', display: 'flex', gap: '4px', flexWrap: 'wrap', borderBottom: '1px solid #333' },
    tab: { padding: '10px 14px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', color: '#aaa', fontSize: '13px', borderBottom: '3px solid transparent' },
    activeTab: { padding: '10px 14px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', color: '#e30613', fontSize: '13px', borderBottom: '3px solid #e30613', fontWeight: 'bold' },
    content: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
    card: { backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
    cardTitle: { fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#e30613' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' },
    statCard: { backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '16px', textAlign: 'center' },
    statNumber: { fontSize: '28px', fontWeight: 'bold', color: '#e30613' },
    statLabel: { fontSize: '12px', color: '#aaa', marginTop: '4px' },
    input: { backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', padding: '8px', color: '#fff', fontSize: '13px', width: '100%', boxSizing: 'border-box' },
    select: { backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', padding: '8px', color: '#fff', fontSize: '13px', width: '100%', boxSizing: 'border-box' },
    button: { backgroundColor: '#e30613', border: 'none', borderRadius: '4px', padding: '8px 16px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
    buttonGreen: { backgroundColor: '#16a34a', border: 'none', borderRadius: '4px', padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: '12px' },
    buttonRed: { backgroundColor: '#dc2626', border: 'none', borderRadius: '4px', padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: '12px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th: { backgroundColor: '#222', padding: '10px', textAlign: 'left', borderBottom: '1px solid #444', color: '#aaa' },
    td: { padding: '10px', borderBottom: '1px solid #222', verticalAlign: 'top' },
    badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' },
    alert: { backgroundColor: '#7f1d1d', border: '1px solid #dc2626', borderRadius: '6px', padding: '12px', marginBottom: '12px' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px', marginBottom: '8px' }
  }

  const renderDashboard = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>🏁 Dashboard Virage</h2>
      <div style={styles.grid}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{teamMembers.length}</div>
          <div style={styles.statLabel}>Miembros del Equipo</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{events.length}</div>
          <div style={styles.statLabel}>Eventos 2026</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statNumber, color: balance >= 0 ? '#16a34a' : '#dc2626' }}>
            {balance.toLocaleString()}€
          </div>
          <div style={styles.statLabel}>Balance</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statNumber, color: stockAlertas.length > 0 ? '#f59e0b' : '#16a34a' }}>
            {stockAlertas.length}
          </div>
          <div style={styles.statLabel}>Alertas Stock</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statNumber, color: comprasPendientes.length > 0 ? '#f59e0b' : '#16a34a' }}>
            {comprasPendientes.length}
          </div>
          <div style={styles.statLabel}>Compras Pendientes</div>
        </div>
      </div>

      {stockAlertas.length > 0 && (
        <div style={styles.alert}>
          <strong>⚠️ Alertas de Stock:</strong>
          {stockAlertas.map(s => (
            <div key={s.id}>• {s.item}: {s.cantidad} {s.unidad} (mínimo: {s.minimo})</div>
          ))}
        </div>
      )}

      <div style={styles.grid}>
        {events.map(e => (
          <div key={e.id} style={styles.card}>
            <div style={styles.cardTitle}>🏎️ {e.name}</div>
            <div style={{ color: '#aaa', fontSize: '13px' }}>
              <div>📅 {e.date}</div>
              <div>📍 {e.location}</div>
              <div style={{ marginTop: '8px' }}>
                <span style={{ ...styles.badge, backgroundColor: '#1e3a5f', color: '#60a5fa' }}>
                  {e.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCompras = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>🛒 Gestión de Compras</h2>
      <div style={{ ...styles.alert, backgroundColor: '#1a1a00', borderColor: '#f59e0b' }}>
        <strong style={{ color: '#f59e0b' }}>⚠️ Política de compras:</strong>
        <span style={{ color: '#aaa', marginLeft: '8px' }}>Compras superiores a 200€ requieren aprobación de Philippe, Gabi o Laura C</span>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Nueva Compra</div>
        <div style={styles.formGrid}>
          <input style={styles.input} placeholder="Concepto *" value={newCompra.concepto} onChange={e => setNewCompra({...newCompra, concepto: e.target.value})} />
          <input style={styles.input} placeholder="Importe € *" type="number" value={newCompra.importe} onChange={e => setNewCompra({...newCompra, importe: e.target.value})} />
          <input style={styles.input} placeholder="Proveedor" value={newCompra.proveedor} onChange={e => setNewCompra({...newCompra, proveedor: e.target.value})} />
          <input style={styles.input} placeholder="Solicitante" value={newCompra.solicitante} onChange={e => setNewCompra({...newCompra, solicitante: e.target.value})} />
          <select style={styles.select} value={newCompra.evento} onChange={e => setNewCompra({...newCompra, evento: e.target.value})}>
            <option>Imola</option>
            <option>Portimao</option>
            <option>General</option>
          </select>
        </div>
        {newCompra.importe && parseFloat(newCompra.importe) > 200 && (
          <div style={{ color: '#f59e0b', fontSize: '12px', marginBottom: '8px' }}>
            ⚠️ Esta compra requiere aprobación de Philippe, Gabi o Laura C
          </div>
        )}
        <button style={styles.button} onClick={addCompra}>➕ Añadir Compra</button>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Lista de Compras ({compras.length})</div>
        {compras.length === 0 ? (
          <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>No hay compras registradas</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Concepto</th>
                <th style={styles.th}>Importe</th>
                <th style={styles.th}>Proveedor</th>
                <th style={styles.th}>Evento</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Aprobación</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {compras.map(c => (
                <tr key={c.id}>
                  <td style={styles.td}>{c.concepto}</td>
                  <td style={styles.td}>{c.importe}€</td>
                  <td style={styles.td}>{c.proveedor || '-'}</td>
                  <td style={styles.td}>{c.evento}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: c.estado === 'aprobada' ? '#14532d' : c.estado === 'rechazada' ? '#7f1d1d' : '#713f12',
                      color: c.estado === 'aprobada' ? '#86efac' : c.estado === 'rechazada' ? '#fca5a5' : '#fde68a'
                    }}>
                      {c.estado}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: '11px', color: c.necesitaAprobacion ? '#f59e0b' : '#aaa' }}>
                      {c.aprobadoPor}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {c.estado === 'pendiente' && (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button style={styles.buttonGreen} onClick={() => aprobarCompra(c.id)}>✓</button>
                        <button style={styles.buttonRed} onClick={() => rechazarCompra(c.id)}>✗</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )

  const renderLogistica = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>✈️ Logística</h2>
      {events.map(evento => (
        <div key={evento.id} style={styles.card}>
          <div style={styles.cardTitle}>🏎️ {evento.name} — {evento.date}</div>
          <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '12px' }}>📍 {evento.location}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ backgroundColor: '#222', borderRadius: '6px', padding: '12px' }}>
              <div style={{ color: '#60a5fa', fontWeight: 'bold', marginBottom: '8px' }}>✈️ Vuelos</div>
              <div style={{ color: '#aaa', fontSize: '12px' }}>
                <div>• Vuelos por confirmar</div>
                <div>• {teamMembers.length} miembros del equipo</div>
                <div style={{ marginTop: '8px', color: '#f59e0b' }}>Estado: Pendiente</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#222', borderRadius: '6px', padding: '12px' }}>
              <div style={{ color: '#34d399', fontWeight: 'bold', marginBottom: '8px' }}>🏨 Hotel</div>
              <div style={{ color: '#aaa', fontSize: '12px' }}>
                <div>• Hotel por confirmar</div>
                <div>• Habitaciones necesarias: ~15</div>
                <div style={{ marginTop: '8px', color: '#f59e0b' }}>Estado: Pendiente</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#222', borderRadius: '6px', padding: '12px' }}>
              <div style={{ color: '#f59e0b', fontWeight: 'bold', marginBottom: '8px' }}>🚛 Camión</div>
              <div style={{ color: '#aaa', fontSize: '12px' }}>
                <div>• Transporte de material</div>
                <div>• Ruta por planificar</div>
                <div style={{ marginTop: '8px', color: '#f59e0b' }}>Estado: Pendiente</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderStaff = () => {
    const areas = [...new Set(teamMembers.map(m => m.area))]
    return (
      <div>
        <h2 style={{ color: '#e30613', marginBottom: '20px' }}>👥 Staff ({teamMembers.length} miembros)</h2>
        {areas.map(area => (
          <div key={area} style={styles.card}>
            <div style={styles.cardTitle}>{area}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
              {teamMembers.filter(m => m.area === area).map(m => (
                <div key={m.name} style={{ backgroundColor: '#222', borderRadius: '6px', padding: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{m.name}</div>
                  <div style={{ color: '#aaa', fontSize: '12px' }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderStock = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>📦 Stock</h2>
      {stockAlertas.length > 0 && (
        <div style={styles.alert}>
          <strong>⚠️ {stockAlertas.length} items por debajo del mínimo</strong>
        </div>
      )}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Cantidad</th>
              <th style={styles.th}>Mínimo</th>
              <th style={styles.th}>Unidad</th>
              <th style={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(s => (
              <tr key={s.id}>
                <td style={styles.td}>{s.item}</td>
                <td style={styles.td}>{s.cantidad}</td>
                <td style={styles.td}>{s.minimo}</td>
                <td style={styles.td}>{s.unidad}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: s.cantidad <= s.minimo ? '#7f1d1d' : '#14532d',
                    color: s.cantidad <= s.minimo ? '#fca5a5' : '#86efac'
                  }}>
                    {s.cantidad <= s.minimo ? '⚠️ Bajo' : '✅ OK'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCashflow = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>💰 Cashflow</h2>
      <div style={styles.grid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statNumber, color: '#16a34a' }}>+{totalIngresos.toLocaleString()}€</div>
          <div style={styles.statLabel}>Total Ingresos</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statNumber, color: '#dc2626' }}>-{totalGastos.toLocaleString()}€</div>
          <div style={styles.statLabel}>Total Gastos</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statNumber, color: balance >= 0 ? '#16a34a' : '#dc2626' }}>{balance.toLocaleString()}€</div>
          <div style={styles.statLabel}>Balance</div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Nuevo Movimiento</div>
        <div style={styles.formGrid}>
          <select style={styles.select} value={newCashflow.tipo} onChange={e => setNewCashflow({...newCashflow, tipo: e.target.value})}>
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
          <input style={styles.input} placeholder="Concepto *" value={newCashflow.concepto} onChange={e => setNewCashflow({...newCashflow, concepto: e.target.value})} />
          <input style={styles.input} placeholder="Importe €" type="number" value={newCashflow.importe} onChange={e => setNewCashflow({...newCashflow, importe: e.target.value})} />
          <input style={styles.input} type="date" value={newCashflow.fecha} onChange={e => setNewCashflow({...newCashflow, fecha: e.target.value})} />
          <select style={styles.select} value={newCashflow.evento} onChange={e => setNewCashflow({...newCashflow, evento: e.target.value})}>
            <option>General</option>
            <option>Imola</option>
            <option>Portimao</option>
          </select>
        </div>
        <button style={styles.button} onClick={addCashflow}>➕ Añadir</button>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Movimientos</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Concepto</th>
              <th style={styles.th}>Importe</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Evento</th>
            </tr>
          </thead>
          <tbody>
            {cashflow.map(c => (
              <tr key={c.id}>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: c.tipo === 'ingreso' ? '#14532d' : '#7f1d1d',
                    color: c.tipo === 'ingreso' ? '#86efac' : '#fca5a5'
                  }}>
                    {c.tipo}
                  </span>
                </td>
                <td style={styles.td}>{c.concepto}</td>
                <td style={styles.td} style={{ color: c.tipo === 'ingreso' ? '#86efac' : '#fca5a5' }}>
                  {c.tipo === 'ingreso' ? '+' : '-'}{c.importe.toLocaleString()}€
                </td>
                <td style={styles.td}>{c.fecha}</td>
                <td style={styles.td}>{c.evento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderReuniones = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>📅 Reuniones</h2>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Nueva Reunión</div>
        <div style={styles.formGrid}>
          <input style={styles.input} placeholder="Título *" value={newReunion.titulo} onChange={e => setNewReunion({...newReunion, titulo: e.target.value})} />
          <input style={styles.input} type="datetime-local" value={newReunion.fecha} onChange={e => setNewReunion({...newReunion, fecha: e.target.value})} />
          <input style={styles.input} placeholder="Participantes" value={newReunion.participantes} onChange={e => setNewReunion({...newReunion, participantes: e.target.value})} />
          <input style={styles.input} placeholder="Notas" value={newReunion.notas} onChange={e => setNewReunion({...newReunion, notas: e.target.value})} />
        </div>
        <button style={styles.button} onClick={addReunion}>➕ Añadir Reunión</button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Reuniones Programadas ({reuniones.length})</div>
        {reuniones.length === 0 ? (
          <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>No hay reuniones programadas</div>
        ) : (
          reuniones.map(r => (
            <div key={r.id} style={{ backgroundColor: '#222', borderRadius: '6px', padding: '12px', marginBottom: '8px' }}>
              <div style={{ fontWeight: 'bold' }}>{r.titulo}</div>
              <div style={{ color: '#aaa', fontSize: '12px' }}>
                <span>📅 {r.fecha}</span>
                {r.participantes && <span style={{ marginLeft: '12px' }}>👥 {r.participantes}</span>}
                {r.notas && <div style={{ marginTop: '4px' }}>📝 {r.notas}</div>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderChecklist = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>✅ Checklist</h2>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Nueva Tarea</div>
        <div style={styles.formGrid}>
          <input style={styles.input} placeholder="Tarea *" value={newChecklist.tarea} onChange={e => setNewChecklist({...newChecklist, tarea: e.target.value})} />
          <select style={styles.select} value={newChecklist.evento} onChange={e => setNewChecklist({...newChecklist, evento: e.target.value})}>
            <option>Imola</option>
            <option>Portimao</option>
            <option>General</option>
          </select>
          <input style={styles.input} placeholder="Responsable" value={newChecklist.responsable} onChange={e => setNewChecklist({...newChecklist, responsable: e.target.value})} />
          <select style={styles.select} value={newChecklist.prioridad} onChange={e => setNewChecklist({...newChecklist, prioridad: e.target.value})}>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        <button style={styles.button} onClick={addChecklist}>➕ Añadir Tarea</button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Tareas ({checklist.length})</div>
        {checklist.length === 0 ? (
          <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>No hay tareas</div>
        ) : (
          checklist.map(c => (
            <div key={c.id} style={{ backgroundColor: '#222', borderRadius: '6px', padding: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="checkbox" checked={c.completada} onChange={() => toggleChecklist(c.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <div style={{ flex: 1, textDecoration: c.completada ? 'line-through' : 'none', color: c.completada ? '#666' : '#fff' }}>
                <span style={{ fontWeight: 'bold' }}>{c.tarea}</span>
                <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '8px' }}>({c.evento})</span>
                {c.responsable && <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '8px' }}>👤 {c.responsable}</span>}
              </div>
              <span style={{
                ...styles.badge,
                backgroundColor: c.prioridad === 'alta' ? '#7f1d1d' : c.prioridad === 'media' ? '#713f12' : '#14532d',
                color: c.prioridad === 'alta' ? '#fca5a5' : c.prioridad === 'media' ? '#fde68a' : '#86efac'
              }}>
                {c.prioridad}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderTarjetas = () => (
    <div>
      <h2 style={{ color: '#e30613', marginBottom: '20px' }}>💳 Tarjetas</h2>
      <div style={styles.card}>
        <iframe
          src="https://tarjeta-empresa.vercel.app"
          style={{ width: '100%', height: '700px', border: 'none', borderRadius: '6px' }}
          title="Tarjetas"
        />
      </div>
    </div>
  )

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard()
      case 'compras': return renderCompras()
      case 'logistica': return renderLogistica()
      case 'staff': return renderStaff()
      case 'stock': return renderStock()
      case 'cashflow': return renderCashflow()
      case 'reuniones': return renderReuniones()
      case 'checklist': return renderChecklist()
      case 'tarjetas': return renderTarjetas()
      default: return renderDashboard()
    }
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.logo}>🏎️ VIRAGE</div>
        <div style={{ color: '#aaa', fontSize: '13px' }}>Team Management App</div>
      </div>
      <div style={styles.nav}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={activeTab === tab.id ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  )
}
