

li_vars = [0, 0]
li_texto = ['Partidas Jogadas: ', 'Partidas Perdidas: ']
li_storage = ['partidas_jogadas', 'partidas_perdidas']
li_id = ['p1', 'p4']

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
    armazenar_status(1);
}

atualizar()


