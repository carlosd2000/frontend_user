import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addItem } from "./services/itemService";
import "./App.css";
 

function Crud() {
  const [form, setForm] = useState({ name: "", icon: "", etiqueta: "", link:""});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(form);
    Swal.fire({ 
      title: "Datos ingresados",
      text: "informacion ingresada con éxito",
      icon: 'success',
      confirmButtonText: "OK",
    });
    setForm({ name: "", icon: "", etiqueta: "", link:""});
  };

  useEffect(() => {
    // Código para manejar las funciones de alternancia después de la carga del componente
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }
  }, []);

  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Registrarse</h1>
          <div className="social-icons">
            <a className="icon" href="https://mail.google.com"><i className="fa-brands fa-google-plus-g"></i></a>
            <a className="icon" href="https://facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
            <a className="icon" href="https://github.com"><i className="fa-brands fa-github"></i></a>
            <a className="icon" href="https://linkedin.com"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>o usa alguna de tus cuentas</span>
          <input
            name="name"
            placeholder="Digita el nombre"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Digita el correo"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="contraseña"
            placeholder="Digita la contraseña"
            value={form.contraseña}
            onChange={handleChange}
          />
          <label>
            ¿Eres empresa?
            <select
              name="es_empresa"
              value={form.es_empresa}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </label>
          <button type="submit">Agregar</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Iniciar Sesión</h1>
          <div className="social-icons">
            <a className="icon" href="https://mail.google.com"><i className="fa-brands fa-google-plus-g"></i></a>
            <a className="icon" href="https://facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
            <a className="icon" href="https://github.com"><i className="fa-brands fa-github"></i></a>
            <a className="icon" href="https://linkedin.com"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>o usa alguna de tus cuentas</span>
          <input
            name="email"
            placeholder="Digita el correo"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="contraseña"
            placeholder="Digita la contraseña"
            value={form.contraseña}
            onChange={handleChange}
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Ingrese sus datos personales para utilizar todas las funciones del sitio</p>
            <button className="hidden" id="login">Iniciar Sesión</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hola amigo</h1>
            <p>Regístrese con sus datos personales para utilizar todas las funciones del sitio</p>
            <button className="hidden" id="register">Registro</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crud;
