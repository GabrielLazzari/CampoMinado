
// ARMAZENAR O STATUS DAS PARTIDAS

li_vars = [0, 0, 0, 0]
//lo_texto é apenas pra deixar bonito na tela
li_texto = ['Partidas Jogadas: ', 'Partidas Ganhas: ', 'Partidas Perdidas: ']
//li_nome_texto é tanto o id do paragrafo quando o nome no storage
li_nome_texto = ['partidas_jogadas', 'partidas_ganhas', 'partidas_perdidas']


function atualizar(){
    for (var c in li_nome_texto){
        document.getElementById(li_nome_texto[c]).innerHTML = li_texto[c] + localStorage.getItem(li_nome_texto[c]);
    }
}

function armazenar_status(valor){
    li_vars[valor] = localStorage.getItem(li_nome_texto[valor]);
    li_vars[valor] = Number(li_vars[valor]) + 1;
    localStorage.setItem(li_nome_texto[valor], li_vars[valor]);
    atualizar()
}

function total_partidas(){
    armazenar_status(0);
}

function partidas_bombaqueexplodiu(){
    armazenar_status(2);
}

function partidas_queganhou(){
    armazenar_status(1)
}

atualizar()



// PRA O CRONOMETRO
var contando = 0;
var sec = 0;
var min = 0
var hora = 0
var msg_t_segundos = document.getElementById("t_segundos");
var msg_t_min = document.getElementById("t_minutos");
var msg_t_horas = document.getElementById("t_horas");


function iniciar_cronometro(){

    contando=setInterval(incrementatempo,1000);
}

function incrementatempo(){

    //Mostra o tempo decorrido
    msg_t_segundos.innerHTML = sec;
    msg_t_min.innerHTML = min
    msg_t_horas.innerHTML = hora  

    sec++;
    if (sec == 60){
        sec = 0
        min += 1
        if (min == 60){
            min = 0
            hora += 1
            if (hora == 24){
                sec = 0
                min = 0
                hora = 0
            }
        }
    }
}


function limpar_cronometro(parar_reiniciar){

    /*Se parar_reiniciar for igual a 1 é quando o jogador ganhou ou 
    perdeu dai so limpa o intervalo do contando e o tempo para na tela
    senão dai vai zerar as variaveis e atualizar na tela*/

    clearInterval(contando);
    if (parar_reiniciar == 0){
        sec = 0;
        min = 0;
        hora = 0;
        
        //Mostra o tempo decorrido
        msg_t_segundos.innerHTML = sec//parseInt(sec % 60);
        msg_t_min.innerHTML = min
        msg_t_horas.innerHTML = hora 
    }
    

}
