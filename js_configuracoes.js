

// PARA O TAMANHO DO TABULEIRO
var posx = document.getElementById("inputx");
var posy = document.getElementById("inputy");
function alterar_tamanho(){
    
    if (posx.value != "" && posy.value != ""){
        if ((posx.value >= 4 && posx.value <= 400) && (posy.value >= 4 && posy.value <= 400)){
            localStorage.setItem('tamX', posx.value)
            localStorage.setItem('tamY', posy.value)
            localStorage.setItem('porcentagem_bombas', Math.round((posx.value*posy.value)*85/500))
            // Atualizar na tela as bombas
            mostrar_bombas()
            // leva pra um novo jogo
            novo_jogo()
            // Tira a div das configuraçoes da tela 
            clicar_corpo()
            
        } 
    }else{
        window.alert("Ambos valores de posição devem ser preenchidos")
    }
    
}

function tam_tabuleiro(){
    if (localStorage.getItem('tamX') == null){
        localStorage.setItem('tamX', "20")
    }
    if (localStorage.getItem('tamY') == null){
        localStorage.setItem('tamY', "10")
    }
    document.getElementById("inputx").value=localStorage.getItem('tamX');
    document.getElementById("inputy").value=localStorage.getItem('tamY');
}

tam_tabuleiro()



// PARA A GERAÇÃO DE BOMBAS
var padrao = document.getElementById('bombas');
v1 = localStorage.getItem('tamX');
v2 = localStorage.getItem('tamY');

function mostrar_bombas(){
    v1 = localStorage.getItem('tamX');
    v2 = localStorage.getItem('tamY');
    document.getElementById("padrao_bombas").innerHTML = "Padrão: " + 
    (Math.round((v1*v2)*85/500)) + " bombas para " + v1+"x"+v2;

    document.getElementById("bombas").value =(localStorage.getItem('porcentagem_bombas'));
}

function alterar_bombas(){
    if (padrao.value != ""){
        if (padrao.value >= 1 && padrao.value < (v1*v2)-9){
            localStorage.setItem('porcentagem_bombas', padrao.value)

            document.getElementById("padrao_bombas").innerHTML = "Padrão: " + (Math.round((v1*v2)*85/500)) + " bombas, para " + v1+"x"+v2;
            novo_jogo()
            clicar_corpo()
        }
        document.getElementById("bombas").value =(localStorage.getItem('porcentagem_bombas'));
        
        
    }else{
        window.alert("A quantidade de bombas deve ser preenchida")
    }
}

function porcent_bombas(){
     
    if ((localStorage.getItem('porcentagem_bombas') == null)){
        localStorage.setItem('porcentagem_bombas', Math.round((v1*v2)*85/500));
    }
    mostrar_bombas()
}

porcent_bombas()



//PARA A COR DO TABULEIRO

var cor_tabuleiro = document.getElementById('cor_tabuleiro');

function cor_do_tabuleiro(sepagina){
    
    if (localStorage.getItem('cor_tabuleiro') == null){
        localStorage.setItem('cor_tabuleiro', "0");
    }else{
        if (cor_tabuleiro.value != ''){
            localStorage.setItem('cor_tabuleiro', cor_tabuleiro.value);
            
        }
    }
    
    cor_tabuleiro.value=localStorage.getItem('cor_tabuleiro');
    //So entra aqui quando não tiver carregando a pagina pela primeira vez
    if (sepagina == 1){
        novo_jogo()
        clicar_corpo()
    }

    
    
    
}

cor_do_tabuleiro(0)



//PARA AS CORES DOS NUMEROS
var numeros_coloridos = document.getElementById("numeros_coloridos");
var numeros_semcor = document.getElementById("numeros_semcor");

function cor_dos_numeros(valor){
    //Se valor for 1 é colorido senao preto
    // Esse colorir_numeros é uma verificação antes do switch no jogo principal
    colorir_numeros = valor
    clicar_corpo()

}



//PARA AS CORES DE FUNDO

var campo = document.getElementById("campo");
var confi = document.getElementById("configuracoes");
var regras_definidas = document.getElementById("regras_definidas");
var dados = document.getElementById("dados_jogador");
var sobre = document.getElementById("sobre");

// Branco, Azul, Verde, Vermelho
tom1 = ['white', 'rgb(0, 140, 245)', 'rgb(0, 255, 60)', 'rgb(255, 70, 0)'];
tom2 = ["rgb(199, 199, 199)", "rgb(0, 60, 255)", "rgb(0, 190, 60)", "rgb(255, 0, 0)"]

function mudar_cor_fundo(valor){
    document.body.style.backgroundColor = tom1[valor];
    campo.style.backgroundColor = tom1[valor];
    confi.style.backgroundColor = tom2[valor];
    regras_definidas.style.backgroundColor = tom2[valor];
    dados.style.backgroundColor = tom2[valor];
    sobre.style.backgroundColor = tom2[valor];

}