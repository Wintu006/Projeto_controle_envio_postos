const SUPABASE_URL = "https://dvyoypsyouamgxoauvbg.supabase.co";
const SUPABASE_KEY = "SUA_CHAVE_AQUI"; // ⚠️ substitua corretamente

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cadastrar() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const { error } = await supabaseClient.auth.signUp({
    email,
    password: senha
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Usuário criado com sucesso!");
  }
}

async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    alert(error.message);
  } else {
    verificarUsuario();
  }
}

async function verificarUsuario() {
  const { data } = await supabaseClient.auth.getUser();

  if (data.user) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('sistema').style.display = 'block';

    // 🔥 carrega dados após login
    if (typeof carregarDados === "function") {
      carregarDados();
    }

  } else {
    document.getElementById('login').style.display = 'block';
    document.getElementById('sistema').style.display = 'none';
  }
}

async function logout() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    alert("Erro ao sair");
  } else {
    verificarUsuario();
  }
}

// expor funções globalmente
window.supabaseClient = supabaseClient;
window.cadastrar = cadastrar;
window.login = login;
window.logout = logout;
window.verificarUsuario = verificarUsuario;

window.onload = verificarUsuario;