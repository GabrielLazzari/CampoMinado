

li_vars = [0, 0, 0]
li_texto = ['Partidas Jogadas: ', 'Partidas Ganhas: ', 'Partidas Perdidas: ']
li_storage = ['partidas_jogadas', 'partidas_ganhas', 'partidas_perdidas']
li_id = ['p1','p2', 'p3']

function atualizar(){
    for (var c in li_id){
        document.getElementById(li_id[c]).innerHTML = li_texto[c] + localStorage.getItem(li_storage[c]);
    }
}

function armazenar_status(valor){
    li_vars[valor] = localStorage.getItem(li_storage[valor]);
    li_vars[valor] = Number(li_vars[valor]) + 1;
    localStorage.setItem(li_storage[valor], li_vars[valor]);
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
var sec = 0;
var min = 0
var hora = 0
function cronometro(){

    setInterval(function () {
        var msg_t_segundos = document.getElementById("t_segundos");
        var msg_t_min = document.getElementById("t_minutos");
        var msg_t_horas = document.getElementById("t_horas");
        //Mostra o tempo decorrido
        msg_t_segundos.innerHTML = sec//parseInt(sec % 60);
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
    }, 1000);//No final é 1000 pra contar em segundos
}
