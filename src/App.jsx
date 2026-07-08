import { useEffect, useState } from "react";
import "./App.css";

const URL = "https://www.raydelto.org/agenda.php";

function App() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contactos, setContactos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarContactos();
  }, []);

  function cargarContactos() {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setContactos(data))
      .catch((err) => console.error(err));
  }

  function agregarContacto() {
    if (!nombre || !apellido || !telefono) {
      alert("Debe completar todos los campos.");
      return;
    }

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        telefono,
      }),
    })
      .then((res) => res.text())
      .then(() => {
        setMensaje("Contacto agregado correctamente.");

        setNombre("");
        setApellido("");
        setTelefono("");

        cargarContactos();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="container">
      <h1>Mi Agenda de Contactos</h1>

      <h2>Agregar contacto</h2>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <button onClick={agregarContacto}>
          Agregar
        </button>
      </div>

      <p className="mensaje">{mensaje}</p>

      <h2>Lista de contactos</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
          </tr>
        </thead>

        <tbody>
          {contactos.length === 0 ? (
            <tr>
              <td colSpan="3">No hay contactos.</td>
            </tr>
          ) : (
            contactos.map((contacto, index) => (
              <tr key={index}>
                <td>{contacto.nombre}</td>
                <td>{contacto.apellido}</td>
                <td>{contacto.telefono}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;