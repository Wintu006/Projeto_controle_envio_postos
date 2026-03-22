
let dados = [];

function renderizar() {
  const tbody = document.getElementById('tabela');
  tbody.innerHTML = '';

  dados.forEach(d => {
    tbody.innerHTML += `
      <tr>
        <td>${d.insumo}</td>
        <td>${d.quantidade}</td>
        <td>${d.posto}</td>
        <td>${d.data}</td>
      </tr>
    `;
  });
}

async function carregarDados() {
  const url = "https://sheetdb.io/api/v1/vinx1o8k4zxoi";

  const res = await fetch(url);
  dados = await res.json();
  renderizar();
}

async function adicionar() {
  const insumo = document.getElementById('insumo').value;
  const quantidade = document.getElementById('quantidade').value;
  const data = document.getElementById('data').value;

  const checkboxes = document.querySelectorAll('#postos input:checked');
  const postosSelecionados = Array.from(checkboxes).map(cb => cb.value);

  if (!insumo || !quantidade || !data || postosSelecionados.length === 0) {
    alert('Preencha tudo');
    return;
  }

  const registros = postosSelecionados.map(posto => ({
    insumo,
    quantidade,
    posto,
    data
  }));

  const url = "https://sheetdb.io/api/v1/vinx1o8k4zxoi";

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: registros })
  });

  document.getElementById('insumo').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('data').value = '';
  document.querySelectorAll('#postos input').forEach(cb => cb.checked = false);

  await carregarDados();
}

carregarDados();