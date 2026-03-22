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
  const { data: userData } = await supabaseClient.auth.getUser();
  const user = userData.user;

  if (!user) return;

  const { data, error } = await supabaseClient
    .from('envios')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error(error);
    return;
  }

  dados = data;
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

  const { data: userData } = await supabaseClient.auth.getUser();
  const user = userData.user;

  const registros = postosSelecionados.map(posto => ({
    user_id: user.id,
    insumo,
    quantidade,
    posto,
    data
  }));

  const { error } = await supabaseClient
    .from('envios')
    .insert(registros);

  if (error) {
    alert("Erro ao salvar");
    console.error(error);
  } else {
    alert("Salvo com sucesso 🚀");

    // limpa formulário
    document.getElementById('insumo').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('data').value = '';
    document.querySelectorAll('#postos input').forEach(cb => cb.checked = false);

    carregarDados();
  }
}