

var img_campo = document.getElementById("img_campo");
var img_config = document.getElementById("img_confi");
var img_regras_definidas = document.getElementById("img_regras_definidas");
var img_dados = document.getElementById("img_dados");
var img_sobre = document.getElementById("img_sobre");

var campo = document.getElementById("campo");
campo.addEventListener("click", clicar_corpo);
var config = document.getElementById("configuracoes");
var regras_definidas = document.getElementById("regras_definidas");
var dados = document.getElementById("dados_jogador");
var sobre = document.getElementById("sobre");


lis2 = [campo, config, regras_definidas, dados, sobre]

var tabela_pricipal = document.querySelector('table')

function sobrepor(janela){
    maior = 0;
    for (var c=0; c < lis2.length; c++){
        //A janela clicada recebe um zindex maior
        if (c == janela){
            lis2[c].style.zIndex = 4;
        }else{
            lis2[c].style.zIndex = 3;
        }

        if (tabela_pricipal.clientHeight > 910){
            maior = (campo.clientHeight-60)+'px'; //Uma gambiarra q funciona, por algum motivo quando eu tentava concatenar o height(maior) da maior div, ele acumulava mais 60 junto
            lis2[c].style.height = maior;
        }else{
            lis2[c].style.height = '910px'
        }

    }
    
    
}
function clicar_corpo(){
    sobrepor(0)
}
clicar_corpo();