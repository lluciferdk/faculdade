const URL = 'http://localhost:3400/clientes';
let modoEdicao = false;

let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaCliente = document.querySelector('table>tbody');
let modalCliente = new bootstrap.Modal(document.getElementById("modal-cliente"), {});
let tituloModal = document.querySelector('h4.modal-title');

let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

let formModal = {
    id: document.getElementById('id'),
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    telefone: document.getElementById('id'),
    cpf: document.getElementById('cpf'),
    dataCadastro: document.getElementById('dataCadastro'),

}

btnAdicionar.addEventListener('click', () =>{
    modoEdicao = false;
    tituloModal.textContent = "Adicionar cliente"
    modalCliente.show();
});

btnSalvar.addEventListener('click', () => {
    // 1º pegar os cliente safado
    let cliente = obterClienteDoModal();

    // 2º cliente bobo nao boto os dado certo
    if(!cliente.cpf || !cliente.email){
        alert("E-mail e CPF são campos obrigatórios.")
        return;
    }

    modalCliente.hide();
});

btnCancelar.addEventListener('click', () => {
    modalCliente.hide();
});

function obterClienteDoModal(){
    
    return new Cliente({
        id: formModal.id.value,
        email: formModal.email.value,
        nome: formModal.nome.value,
        cpf: formModal.cpf.value,
        telefone: formModal.telefone.value,
        // dataCadastro: formModal.dataCadastro.value,
    });

}

function obterClientes() {
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação');
            }
            return response.json();
        })
        .then(response => {
            popularTabela(response);
        })
        .catch(error => {
            console.error(error);
        });
}

function editarCliente(id){
    modoEdicao = true;
    tituloModal.textContent = "Editar cliente"
    modalCliente.show();
    // alert('Aqui vou editar o cliente' + id);
}

function excluirCliente(id){
    alert('Aqui vou excluir o cliente' + id);
}

function criarLinhaNaTabela(cliente) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCPF = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdTelefone = document.createElement('td');
    let tdDataCadastro = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.textContent = cliente.id;
    tdNome.textContent = cliente.nome;
    tdCPF.textContent = cliente.cpfOuCnpj;
    tdEmail.textContent = cliente.email;
    tdTelefone.textContent = cliente.telefone;
    tdDataCadastro.textContent = cliente.dataCadastro;

    tdAcoes.innerHTML = `
        <button onclick="editarCliente(${cliente.id})" class="btn btn-outline-primary btn-sm mr-2">Editar</button>
        <button onclick="excluirCliente(${cliente.id})" class="btn btn-outline-primary btn-sm mr-3">Excluir</button>
    `;

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCPF);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tr.appendChild(tdDataCadastro);
    tr.appendChild(tdAcoes);

    tabelaCliente.appendChild(tr);
}

function popularTabela(clientes) {
    clientes.forEach(cliente => {
        criarLinhaNaTabela(cliente);
    });
}


function adicionarClienteBackEnd(cliente) {
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Autorization': "token"
        },
        body : JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(response => {
        let cliente = new Cliente(response);
        console.log(cliente)
    })
    .catch(error => {
        console.log(error)
    })
}


obterClientes();

