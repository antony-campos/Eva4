import { useEffect, useState } from "react";

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    const [form, setForm] = useState({
        id: "",
        nombre: "",
        apePaterno: "",
        apeMaterno: "",
        user: "",
        password: "",
        estado: 1
    });

    const [editando, setEditando] = useState(false);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    // =========================
    // GET - LISTAR
    // =========================
    const obtenerUsuarios = async () => {

        const respuesta = await fetch("http://localhost:8080/api/usuarios.php");

        const datos = await respuesta.json();

        setUsuarios(datos);
    };

    // =========================
    // CAPTURAR FORMULARIO
    // =========================
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // =========================
    // POST - REGISTRAR
    // =========================
    const registrarUsuario = async () => {

        await fetch("http://localhost:8080/api/usuarios.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        limpiarForm();
        obtenerUsuarios();
    };

    // =========================
    // PUT - ACTUALIZAR
    // =========================
    const actualizarUsuario = async () => {

        await fetch("http://localhost:8080/api/usuarios.php", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        limpiarForm();
        setEditando(false);
        obtenerUsuarios();
    };

    // =========================
    // DELETE - ELIMINAR
    // =========================
    const eliminarUsuario = async (id) => {

        await fetch("http://localhost:8080/api/usuarios.php", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        obtenerUsuarios();
    };

    // =========================
    // EDITAR (cargar datos)
    // =========================
    const editarUsuario = (usuario) => {

        setForm(usuario);
        setEditando(true);
    };

    // =========================
    // LIMPIAR FORM
    // =========================
    const limpiarForm = () => {

        setForm({
            id: "",
            nombre: "",
            apePaterno: "",
            apeMaterno: "",
            user: "",
            password: "",
            estado: 1
        });
    };

    return (

        <div>

            <h2>Gestión de Usuarios</h2>

            {/* FORMULARIO */}
            <div>

                <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
                <input name="apePaterno" placeholder="Apellido Paterno" value={form.apePaterno} onChange={handleChange} />
                <input name="apeMaterno" placeholder="Apellido Materno" value={form.apeMaterno} onChange={handleChange} />
                <input name="user" placeholder="Usuario" value={form.user} onChange={handleChange} />
                <input name="password" placeholder="Password" value={form.password} onChange={handleChange} />

                {editando ? (
                    <button onClick={actualizarUsuario}>Actualizar</button>
                ) : (
                    <button onClick={registrarUsuario}>Guardar</button>
                )}

            </div>

            <hr />

            {/* TABLA */}
            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Paterno</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {usuarios.map(usuario => (

                        <tr key={usuario.id}>

                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apePaterno}</td>
                            <td>{usuario.user}</td>

                            <td>

                                <button onClick={() => editarUsuario(usuario)}>
                                    Editar
                                </button>

                                <button onClick={() => eliminarUsuario(usuario.id)}>
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Usuarios;