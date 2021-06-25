
// PARA O TAMANHO DO TABULEIRO

var posx = document.getElementById("inputx");
var posy = document.getElementById("inputy");

function alterar_tamanho(){

    if (posx.value != "" && posy.value != ""){
        if ((posx.value >= 4 && posx.value <= 400) && (posy.value >= 4 && posy.value <= 400)){
            localStorage.setItem('posicaoX', posx.value)
            localStorage.setItem('posicaoY', posy.value)
            novo_jogo()
            clicar_corpo()
        } 
        
    }else{
        window.alert("Ambos valores de posição devem ser preenchidos")
    }
    
}

function tam_tabuleiro(){
    
        if (localStorage.getItem('posicaoX') == null){
            localStorage.setItem('posicaoX', "6")
        }
        if (localStorage.getItem('posicaoY') == null){
            localStorage.setItem('posicaoY', "6")
        }
    
}

tam_tabuleiro()
document.getElementById("inputx").value=localStorage.getItem('posicaoX');
document.getElementById("inputy").value=localStorage.getItem('posicaoY');


// PARA A GERAÇÃO DE BOMBAS

var padrao = document.getElementById('padrao');
var personalizado = document.getElementById("personalizado")

function porcent_bombas(valor){
    var dg = document.getElementById("digitar_bombas");
    v1 = localStorage.getItem('posicaoX');
    v2 = localStorage.getItem('posicaoY'); 
    if ((localStorage.getItem('porcentagem_bombas') == null) || valor == 0){
        localStorage.setItem('porcentagem_bombas', Math.round((v1*v2)*85/500))
    }else{
        if (valor == 1){
            
            localStorage.setItem('porcentagem_bombas', Math.round(dg.value))
            novo_jogo()
            //clicar_corpo()
        }
        
    }
    
}


porcent_bombas(0)

//PARA AS CORES DE FUNDO

var campo = document.getElementById("campo");
var confi = document.getElementById("configuracoes");
var sobre = document.getElementById("sobre");

// Branco, Azul, Verde, Vermelho
tom1 = ['white', 'rgb(0, 140, 245)', 'rgb(0, 255, 60)', 'rgb(255, 70, 0)'];
tom2 = ["rgb(199, 199, 199)", "rgb(0, 60, 255)", "rgb(0, 190, 60)", "rgb(255, 0, 0)"]

function mudar_cor(valor){
    //ms.innerHTML = valor
    document.body.style.backgroundColor = tom1[valor];
    campo.style.backgroundColor = tom1[valor];
    confi.style.backgroundColor = tom2[valor];
    sobre.style.backgroundColor = tom2[valor];

}




