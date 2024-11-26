// Código en App.jsx

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getItems, addItem, updateItem, deleteItem } from "./services/itemService";
import "./App.css";


function Crud() {
  const [items, setItems] = useState([]);  
  const [form, setForm] = useState({ name: "", email: "", contraseña: "", es_empresa: Boolean });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    console.log(data);
    
    setItems(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateItem(editingId, form);
      Swal.fire({
        title: "ACTUALIZADO",
        text: "Datos actualizados con éxito",
        icon: 'success',
        confirmButtonText: "OK",
      });
      setEditingId(null);
    } else {
      await addItem(form);
      Swal.fire({
        title: "Datos ingresados",
        text: "Usuario ingresado con éxito",
        icon: 'success',
        confirmButtonText: "OK",
      });
    }
    setForm({ name: "", email: "", contraseña: "" , es_empresa: Boolean });
    loadItems();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
    Swal.fire({
      title: "Modo de edición",
      text: `Editando a ${item.name}`,
      icon: 'info',
      confirmButtonText: "Sí, entiendo",
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      await deleteItem(id);
      Swal.fire("Eliminado", "El elemento ha sido eliminado.", "success");
      loadItems();
    }
  };

  return (
    <div className="container">
      <h1>CRUD APP con React, Vite y Express</h1>
      <form onSubmit={handleSubmit}>
        <input name="name"
          placeholder="Digita el nombre"
          value={form.name}
          onChange={handleChange} />
        <input name="email"
          placeholder="Digita el correo"
          value={form.email}
          onChange={handleChange} />
        <input name="contraseña"
          placeholder="Digita la contraseña"
          value={form.contraseña}
          onChange={handleChange} />
        <label type= "empresa">
          ¿Eres empresa?
        <select
          name="es_empresa"
          value={form.es_empresa}
          onChange={handleChange}
        >
        <option>seleccionar </option>
        <option value={true}>Si</option>    
        <option value={false}>No</option>
  </select>
</label>

        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>
      <div className="item-list">
        {items.map((item) => (
          
          
          <div key={item._id} className="item">
            <span>
            <strong>{item.name}</strong>: {item.email} : {item.contraseña} : {String(item.es_empresa)}
            </span>

            <div className="item-buttons">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                Editar
              </button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crud;






