const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicafocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const pauseBt = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioplay = new Audio('./sons/play.wav')
const audioFinalizar = new Audio('./sons/beep.mp3')
const audioPause = new Audio('./sons/pause.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicafocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
  alterarContexto('foco')
  focoBt.classList.add('active')
}); 

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});   

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(botao => botao.classList.remove('active'))
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch(contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                break;
        case "descanso-longo":
            titulo.innerHTML = `
               Hora de voltar à superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                break;
        default:
            break
    }
}

function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <= 0) {
        clearInterval(intervaloId);
        intervaloId = null;
        iniciarOuPausarBt.textContent = "Começar";
        pauseBt.src = "./imagens/play_arrow.png";
        return;
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar) 

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play();
        clearInterval(intervaloId);
        intervaloId = null;
        iniciarOuPausarBt.textContent = "Começar";
        pauseBt.src = "./imagens/play_arrow.png";
    } else {
        audioplay.play();
        intervaloId = setInterval(contagemRegressiva, 1000);
        iniciarOuPausarBt.textContent = "Pausar";
        pauseBt.src = "./imagens/pause.png";
    }
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    pauseBt.innerHTML = ` <img class="app__card-primary-butto-icon" src="./imagens/pause.png" alt="">`
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo()

