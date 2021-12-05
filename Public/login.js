const inUsuario = document.querySelector("#nome");
const inSenha = document.querySelector("#senha");
const btnEntrar = document.querySelector("#btnEntrar");
const inCnfSenha= document.querySelector("#confirmaSenha");
const btnCriaUsuario = document.querySelector("#btnCriaUsuario");

btnEntrar?.addEventListener("click", function () {
return entrar()
});

btnCriaUsuario?.addEventListener("click", function () {
    return usuarioCriado();
})


 function entrar(){
    const usuario = {
        nome: inUsuario.value,
        senha: inSenha.value,  
    }; 
    if(usuarioLogado() || verificaCampos(usuario.nome, usuario.senha) ||verificaUsuarios(usuario)
    
    ) {
        return;
    }
    
    localStorage.setItem("usuario", JSON.stringify(usuario));
    window.location.href = 'http://127.0.0.1:5500/front%20end%201/html/pageRecados.html'
} 

function usuarioCriado(){
    const usuarios = contasLocalStorage();
    
    const novoUsuario = {
        nome: inUsuario.value,
        senha: inSenha.value,
        confirmaSenha: inCnfSenha.value,
    }; 
    if (verificaCampos( novoUsuario.nome, novoUsuario.senha, novoUsuario.confirmaSenha) ||
        !validaUsuarios(novoUsuario.nome));
       
        else if (inSenha.value != inCnfSenha.value){
            alert(" Erro, senhas diferentes")
        return false}

            window.location.href ='http://127.0.0.1:5500/front%20end%201/html/login.html'
           return localStorage.setItem("contas", JSON.stringify([...usuarios, novoUsuario]))
        }

function validaUsuarios (nome){
    const usuarios = contasLocalStorage();
    if(usuarios.findIndex(function (usuario){
        return usuario.nome === nome;
    }) !="-1" )
    { alert("Usuario já cadastrado")
        return false; }

    return true;
}
function verificaCampos(nome, senha, confirmaSenha){
if (!!nome && !!senha || !!confirmaSenha){
    return false;
}
alert("Preencha todos os campos");
return true;
}
function usuarioLogado() {
    if (!!localStorage.getItem("usuario")) {
      alert("Você já está logado");
      return true;
    }
    return false;
  }

  function verificaUsuarios(usuario) {
    const usuarios = contasLocalStorage();
  
    if (
      usuarios.find(function (nome) {
        return (
          nome.nome === usuario.nome &&
          nome.senha === usuario.senha
        );
      })
    ) {
      return false;
    }
  
    alert("Email ou senha incorretos");
    return true;
  }
function contasLocalStorage() {
     const usuarios = localStorage.getItem("contas");
     return JSON.parse(usuarios)??[];
    }


  


function adicionarRecado(){
  const inDescricao= document.querySelector("#inDescricao");
    const inDetalhamento = document.querySelector("#inDetalhamento");
  const descricao = inDescricao.value;
  const detalhamento = inDetalhamento.value;

  if( descricao =="" || detalhamento ==""){
    alert("informe descrição e detalhamento");
    inDescricao.focus();
    return;
  }

let tbRecados = document.querySelector("#tbRecados");

inserirLinha(tbRecados, descricao, detalhamento);

gravaRecados(descricao,detalhamento);

inDescricao.value = "";
inDetalhamento.value="";
inDescricao.focus();

}
 let btnSalvar = document.querySelector("#btnSalvar");
 btnSalvar.addEventListener('click', function (){
   console.log("salvou")
  return adicionarRecado();
 });

 function inserirLinha(tabela, descricao, detalhamento){
   const linha = tabela.insertRow(-1);
  const col1 = linha.insertCell(0);
  const col2 = linha.insertCell(1);
  const col3 = linha.insertCell(2);

col1.textContent = descricao;
col2.textContent = detalhamento;
col3.innerHTML ="<button type='button' id='btnApagar' class='btn btn-danger'>Apagar</button> <button type='button' id='btnEditar' class='btn btn-success'>Editar</button>"

 }
 function gravaRecados(descricao,detalhamento){
   if(localStorage.getItem("descricaoRecado")){
     const descricaoRecado = localStorage.getItem("descricaoRecado") + ";" + descricao;
     const detalhamentoRecado = localStorage.getItem("detalhamentoRecado") + ";" + detalhamento;

     localStorage.setItem("descricaoRecado", descricaoRecado);
     localStorage.setItem("detalhamentoRecado", detalhamentoRecado);
    
   }
   else{
     localStorage.setItem("descricaoRecado", descricao);
     localStorage.setItem("detalhamentoRecado",detalhamento);
   }
 }
function recuperaRecados(){
  if(localStorage.getItem("descricaoRecados")){
    let descricaoRecados = localStorage.getItem("descrcaoRecados").split(";");
    let detalhamentoRecado = localStorage.getItem("detalhamentoRecado").split(";");
    let tbRecados = document.getElementById("tbRecados");
    for( let i = 0; i < descricao.length; i++){
      inserirLinha(tbRecados,descricao[i],detalhamento[i])
    }
  }
}
recuperaRecados();

/* não consegui fazer funcionar os botes para remover os recados */