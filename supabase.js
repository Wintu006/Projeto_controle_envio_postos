const SUPABASE_URL = "https://dvyoypsyouamgxoauvbg.supabase.co";
const SUPABASE_KEY = "sb_publishable_lveeEZsiV0M4VJ8-TwphEw_vGHB1Eor";

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
    alert("Login realizado!");
    verificarUsuario();
  }
}

async function verificarUsuario() {
  const { data } = await supabaseClient.auth.getUser();

  if (data.user) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('sistema').style.display = 'block';
  } else {
    document.getElementById('login').style.display = 'block';
    document.getElementById('sistema').style.display = 'none';
  }
}

// roda ao carregar
verificarUsuario();