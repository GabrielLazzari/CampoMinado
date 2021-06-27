// CONTA DEFINIDA A CADA 500 QUADRINHOS UMA TAXA DE 85 BOMBAS

// MENSAGENS DO JOGO
var campo = document.getElementById("campo");
var msg = document.getElementById("msg");
var msgt = document.getElementById("msgt");
var msgt2 = document.getElementById("msgt2");
var bombas_restantes = document.getElementById("bombas_restantes");

// VARIAVEIS
var tabuleiro_x = localStorage.getItem('posicaoX'); // Tamanho do tabuleiro em x pega no aramazenamento ond o "configuracoe.js" criou
var tabuleiro_y = localStorage.getItem('posicaoY'); // Tamanho do tabuleiro em y
var comprimento = tabuleiro_x*tabuleiro_y; // Para delimitar os laços, dai faz uma conta so pra todos
var quantas_bombas = localStorage.getItem('porcentagem_bombas');
var lis_divs = []; // Cada um td da tabela é adicionado aqui para identificar o clique mais tarde
var lis_situacao = []; /* Cada valor é adicionado aqui, bomba, numero ou vazio onde:
    -1  -> bomba       
    0   -> vazio
    1-8 -> numero*/
var lis_bandeirinhas = [] //Vai armazenando a posição onde o jogador colocar bandeirinha
var lis_seganhou = [] // quando clicar com o direito em cima de uma bomba adiciona aqui
var lis_sec=[]; //Ajuda na verificaçao dos espacoes em brancos no clique do jogador
var primeiro_clique = -1;
var aleatorio=-4; //Variavel para criar a posição aleatoria das bombas

var controle=0; // Apenas para começar um novo jogo
var selecionar=0; // Qual o item na coluna que foi selecionado
var ganhou_ou_perdeu = 0; //Se ganhou ou perdeu o valor recebe 1

// QUANDO CLICAR EM UMA BOMBA
// recebe o nome da imagem e a posiçao dela na lis_divs, se for -1 significa que as img estão sendo adicionadas n a hora de gerar a tabela
function criar_img(nome_imagem, posicao){
    var criar_img = document.createElement('img')
    criar_img.setAttribute('src', nome_imagem)
    criar_img.setAttribute('class', "img_peca")
    if (posicao != -1){
        lis_divs[posicao].innerHTML = ''
        lis_divs[posicao].appendChild(criar_img)
    }
    return criar_img
}
// SE GANHO OU SE PERDE
function fim_de_jogo(valor, pos_explodiu){
    ganhou_ou_perdeu = 1;
    
    for(var c = 0; c < comprimento; c++){
        if (lis_situacao[c] == -1){
            criar_img("imgs/peca_bomba.png", c)
        }else{
            lis_divs[c].innerHTML = lis_situacao[c];
        }
           
    }

    if (valor == 0){
        criar_img("imgs/peca_qexplodiu.png", pos_explodiu)
        window.alert("Você Perdeu");
        partidas_bombaqueexplodiu();
    }else{
        window.alert("Você ganhou");
        partidas_queganhou();
    }
    

}


// COMO É UMA UNICA LISTA ESSE CODIGO DEFINE AS LATERAIS E CONFORME A POSIÇÃO PASSADA PARA ELE É DEFINIDO QUANDA VERIFICAÇÕES DEFEM SER FEITAS
var lis_verificacoes = []
function laterais(pos_primeira){    
    cont = 0
    // Esse for cordena as laterais do tabuleiro
    for (var l =0; l < comprimento; l ++){
        if(l == pos_primeira){
            // Aqui a lista das verificações não verica nada para a esquerda da posição zero
            if(cont == 0){
                lis_verificacoes = [+1, +tabuleiro_x,  +tabuleiro_x+1, +  -tabuleiro_x, -tabuleiro_x+1]
            }else{
                // Aqui a lista das verificações não verica nada para a direita do comprimento do tabuleiro
                if(cont==tabuleiro_x-1){
                    lis_verificacoes = [-1, +tabuleiro_x, +tabuleiro_x-1, -tabuleiro_x, -tabuleiro_x-1]
                // Se não cair em nehuma das duas dai é a lista padrão verifica todo os oito ao redor do valor passado    
                }else{
                    lis_verificacoes = [+1, -1, +tabuleiro_x,  +tabuleiro_x+1, + tabuleiro_x-1, -tabuleiro_x, -tabuleiro_x+1, -tabuleiro_x-1]    
                }
            }
        }
            
        cont+=1
        //Delimita o tamanho de cada linha do tabuleiro
        if(cont==tabuleiro_x){
            cont=0
        }                 
    }
}


function verificacoes_partida(pos_primeira, valor){ 
    // Aqui mostra na tela quantidades grandes de vazio conforme o jogador for clicando, qualquer valor que o jogador clicar e for vazio cai nesse if valor == 3
    if (valor == 3){
        var lis_blocosbrancos =[];
        
        if (lis_sec.indexOf(pos_primeira) == -1){
            lis_sec.push(pos_primeira);
            lis_blocosbrancos.push(pos_primeira);
            
            while (lis_blocosbrancos.length > 0){
                        
                laterais(lis_blocosbrancos[0]);
        
                for (var c =0; c < lis_verificacoes.length; c++){
                                    
                    t = lis_blocosbrancos[0] + lis_verificacoes[c];
                    if (t >=0 && t < comprimento){
                        if (lis_situacao[t] == 0){
                            if (lis_sec.indexOf(t) == -1){
                                lis_blocosbrancos.push(t);
                                lis_sec.push(t);
                            }  
                            
                        }

                        lis_divs[t].innerHTML = lis_situacao[t];

                    }
                }
                
                lis_blocosbrancos.shift();
            }          
        }
        // ISSO É APENAS ESTÉTICA, COLORIR OS NUMEROS
        /*for (var r=0; r <comprimento; r++){
            if (lis_situacao[r] == 0){
                lis_divs[r].innerHTML = ''
            }else{
                if (lis_situacao[r] == 1){
                    lis_divs[r].style.color = "blue"
                }
            }
        }*/
        
    }else{ 
        laterais(pos_primeira)  
            for (var c =0; c < lis_verificacoes.length; c++){
                t = pos_primeira + lis_verificacoes[c]
                if (t >=0 && t < comprimento){
                    // se igual a 1 verifica os 8 ao redor do primeiro clique e retorna verdadeiro
                    if (valor == 1){
                        if (aleatorio == t){
                            return true
                        }
                    //se o primero clique foi gerado dai gera os numeros ao redor das bombas, aqui so vai receber valores -1 e pra cada um ao redo dele rece +1, assim se tiver outra bomba por perto ele adiciona mais um tambem  
                    }else{
                        if (lis_situacao[t] != -1){
                            lis_situacao[t] += 1
                        }
                    }

                }
            }
            // No primeiro clique se nehum deu verdade ele retorna falso, isso quer dizer que nessa posição gerada aleatoria uma bomba(-1) pode ser colocada
            return false

        } 
}
    

// ADICIONAR AS BOMBAS NA LISTA
function adicionar_situacao(){
    for(var c = 0; c < comprimento; c++){
        //Vai gerar um numero aleatorio para cada bomba 
        if (c < quantas_bombas){
            //Se o numero aleatorio for onde o jogador clicou ou nas oito posiçãoes ao redor, ele gera outro numero 
            do{
                aleatorio = Math.floor(Math.random() * comprimento);
                var ret = verificacoes_partida(primeiro_clique, 1) // as oito verificações
            }while(ret == true || aleatorio == primeiro_clique || lis_situacao[aleatorio] == -1); // Tambem não deixa gerar bomba onde ja tem
            //A lista então na posição recebe o status -1 
            lis_situacao[aleatorio] = -1;
            
        }
        // Se a posição não tiver recebido -1 vai receber 0
        if (lis_situacao[c] != -1){
            lis_situacao[c] = 0;
        }
    }

    //Esse for para cada bomba vai levar para o mudulo que coloca os numeros ao redor
    for(var c = 0; c < comprimento; c++){
        if (lis_situacao[c] == -1){
            //lis_divs[c].style.backgroundColor = "blue"
            verificacoes_partida(c, 2)
        }
    }   
}

// DESABILITA O CLIQUE DIREITO NA TABELA PRINCIPAL DO JOGO
document.getElementById("campo").oncontextmenu = function(){
return false;
}

// RETORNA SE FOI CLICADO COM O DIREITO(2) OU ESQUERDO(0)
var direito_ou_esquerdo
function clique_direito(event){
    direito_ou_esquerdo = event.button
}

// PARA O TEMPO (AINDA N FUNCIONA)
if ((ganhou_ou_perdeu == 0) && (primeiro_clique != -1)){
    cronometro()
}

// DETECTA OS CLIQUES NO TABULEIRO
function clique_campo(){

    for(var c = 0; c < comprimento; c++){

        lis_divs[c].addEventListener("mouseup", function () {
        selecionar = lis_divs.indexOf(this)

        if (ganhou_ou_perdeu == 0){


            // Quando eu detectar o primeiro clique entra a qui
            if (primeiro_clique == -1){
                primeiro_clique = selecionar;
                // Auqi então vai para a função adicionar as bombas na lista
                adicionar_situacao();
                
                //Aqui é estética para no primeiro clique aparecerem já os numero  
                verificacoes_partida(selecionar, 3)

                // PARA A QUANTIDADE DE PARTIDAS JOGADAS
                total_partidas() // Função está no dados_jogador.js

            }else{
                //Depois de tudo criado começa as verificaçoes do jogo   
                if (lis_bandeirinhas.indexOf(selecionar) == -1){
                    
                    if (direito_ou_esquerdo == 2){
                        lis_bandeirinhas.push(selecionar)
                        lis_divs[selecionar].innerHTML = 't';
                        if (lis_situacao[selecionar] == -1){
                            lis_seganhou.push(selecionar)
                        }
                        criar_img("imgs/peca_bandeira.png", selecionar)


                    }else{
                        if (direito_ou_esquerdo == 0){
                           lis_divs[selecionar].innerHTML = lis_situacao[selecionar];
                            if (lis_situacao[selecionar] == 0){
                                verificacoes_partida(selecionar, 3)
                            }
                            // se clicar em uma bomba perde o jogo
                            if(lis_situacao[selecionar] == -1){
 
                                fim_de_jogo(0, selecionar)
                            }  
                        }
                    }

                }else{
                    if(direito_ou_esquerdo == 2){
                        // Libera novamente para a posição ser clicad, "remove a bandeira"
                        criar_img("imgs/peca.png", selecionar)
                        apaga = lis_bandeirinhas.indexOf(selecionar);
                        lis_bandeirinhas.splice(apaga, 1);
                        if (lis_situacao[selecionar] == -1){
                            apaga2 = lis_seganhou.indexOf(selecionar);
                            lis_seganhou.splice(apaga2, 1);
                        }
                        
                        //lis_divs[selecionar].innerHTML = lis_situacao[selecionar];
                    }
                }
                // Verifica para ganha se apenas as bombas foram marcadas
                if (((lis_seganhou.length) == quantas_bombas) && (lis_seganhou.length) == (lis_bandeirinhas.length)){
                    fim_de_jogo(1, -1)
                }
                            
            }
            bombas_restantes.innerHTML =  quantas_bombas-lis_bandeirinhas.length;
            
        }
        })   
    }  
}


// COMEÇAR UM NOVO JOGO, AQUI CRIA A TABELA VISÍVEL NO HTML
function criar_campo(){     
    // Cria a tabela vazia
    var tabela = document.createElement("table");

    // Para adicionar colunas e linha na tabela
    for (var c = 0; c < tabuleiro_y; c++) {
        // tCria uma linha
        var tabela_tr = document.createElement("tr");

        for (var i = 0; i < tabuleiro_x; i++) {
            
            // Cria uma coluna
            var tabela_td = document.createElement("td");
             
            tabela_td.appendChild(criar_img("imgs/peca.png", -1))

            // Lis_divs acumula todos td criados
            lis_divs.push(tabela_td)

            // Adiciona o item na coluna
            tabela_tr.appendChild(tabela_td);
            }

        //Adiciona as colunas na tabela
        tabela.appendChild(tabela_tr);
    }
    // A sessão no html recebe a tabela
    campo.appendChild(tabela);
}

// RESETAR AS VARIÁVES QUANDO CLICAR EM NOVO JOGO
function novo_jogo(){
    
    tabuleiro_x = localStorage.getItem('posicaoX');
    tabuleiro_y = localStorage.getItem('posicaoY');
    comprimento = tabuleiro_x*tabuleiro_y;
    quantas_bombas = localStorage.getItem('porcentagem_bombas');
    lis_divs = [];
    lis_situacao = [];
    lis_seganhou = [];
    lis_bandeirinhas = [];
    lis_sec=[];
    primeiro_clique = -1;
    selecionar=0;
    ganhou_ou_perdeu = 0;
    campo.innerHTML = '';
    bombas_restantes.innerHTML = quantas_bombas

    iniciar()
}

//CHAMAR AS FUNÇOES PARA O JOGO FUNCIONAR
// Atabela visivel é criada apenas uma vez e depois ele entra no clique campo para detectar os cliques do jogador
function iniciar(){
    criar_campo()
    clique_campo()

}
bombas_restantes.innerHTML = quantas_bombas

iniciar()

