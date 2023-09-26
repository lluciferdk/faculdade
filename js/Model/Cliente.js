class Cliente {
    constructor(obj) {
        obj = obj || {};

        this.id = obj,id;
        this.nome = obj.cpf;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.dataCastro = obj.dataCadastro;
    }
}