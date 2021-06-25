var ms = document.getElementById("msgt");

var img_campo = document.getElementById("img_campo");
var img_config = document.getElementById("img_confi");
var img_sobre = document.getElementById("img_sobre");
var img_dados = document.getElementById("img_dados");

var campo = document.getElementById("campo");
campo.addEventListener("click", clicar_corpo);
var config = document.getElementById("configuracoes");
var sobre = document.getElementById("sobre");
var dados = document.getElementById("dados_jogador");

lis2 = [campo, config, sobre, dados]


function sobrepor(janela){
    for (var c=0; c < lis2.length; c++){
        if (c == janela){
            lis2[c].style.zIndex = 4;
        }else{
            lis2[c].style.zIndex = 3;
        }
    }
}
function clicar_corpo(){
    sobrepor(0)
}