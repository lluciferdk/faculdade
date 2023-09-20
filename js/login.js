

// Capturando os 3 campos da tela.
let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnEntrar = document.getElementById('btn-entrar');

// aqui capturo o evento de click para tomar uma ação qualquer
btnEntrar.addEventListener('click', () => {
    // 1º Pegar o email digitado
    let userEmail = email.value;
    // 2º Pegar a senha digitada.
    let userSenha = senha.value;
    // 3º Validar se o email e senha estão corretos
    if (userEmail === "" || userSenha === "") {
        alert("O campo de e-mail e senha são obrigatórios!");
        return;
    }
    // Aqui precisamos enviar esse email e senha ao backend para saber se o usuário pode acessar o sistema.

    // 4º Caso esteja incorreto, mandar mensagem de usuário ou senha inválida.
    autenticar(userEmail, userSenha);
    // Não é necessário colocar "return" aqui, pois você quer continuar para a próxima linha.

    // 5º Caso esteja correto, ir para tela de cadastro de usuário
    
});

function autenticar(email, senha) {
    const urlBase = `http://localhost:3400`;

    fetch(`${urlBase}/login`, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, senha})
    })
    .then(response => response = response.json())

    .then(response => {

        if(!!response.mensagem){
            alert(response.mensagem);
            return;

        }else{

            alert("Usuario autenticado com sucesso!");

            salvarToken(response.token);
            salvarUsuario(response.usuario);

            window.open('cliente.html', '_self');
            }
        })
    }

    function salvarToken(token){
        localStorage.setItem('token', token)
    }

    function salvarUsuario(usuario){
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }