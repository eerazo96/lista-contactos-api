const API_URL = 'http://localhost:3000/api/contacts';

const lista = document.getElementById('lista');
const modal = document.getElementById('modal');
const form = document.getElementById('form');

const nombre = document.getElementById('nombre');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');
const categoria = document.getElementById('categoria');

let editId = null;

const showModal = () => modal.classList.remove('hidden');
const hideModal = () => modal.classList.add('hidden');

async function cargarContactos() {
  const response = await fetch(API_URL);
  const data = await response.json();

  lista.innerHTML = '';

  data.data.forEach(c => {
    const div = document.createElement('div');

    div.className = 'contacto';

    div.innerHTML = `
      <div>
        <b>${c.nombre}</b><br>
        📧 ${c.email}<br>
        📱 ${c.telefono}<br>
        📂 ${c.categoria}
      </div>

      <div>
        <button onclick="editar(${c.id})">✏️</button>
        <button onclick="eliminarContacto(${c.id})">🗑️</button>
      </div>
    `;

    lista.appendChild(div);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = {
    nombre: nombre.value,
    telefono: telefono.value,
    email: email.value,
    categoria: categoria.value
  };

  if (editId) {
    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  form.reset();
  editId = null;
  hideModal();
  cargarContactos();
});

async function editar(id) {
  const response = await fetch(API_URL);
  const data = await response.json();

  const contacto = data.data.find(c => c.id === id);

  nombre.value = contacto.nombre;
  telefono.value = contacto.telefono;
  email.value = contacto.email;
  categoria.value = contacto.categoria;

  editId = id;
  showModal();
}

async function eliminarContacto(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  cargarContactos();
}

window.editar = editar;
window.eliminarContacto = eliminarContacto;

document.getElementById('btnNuevo').onclick = showModal;
document.getElementById('cerrar').onclick = hideModal;

cargarContactos();
