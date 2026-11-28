// Menu do celular
const menuBotao = document.getElementById('menuBotao');
const menu = document.getElementById('menu');
menuBotao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuBotao.setAttribute('aria-expanded', aberto);
});
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => menu.classList.remove('aberto'))
);

// Filtro das lixeiras
const filtros = document.querySelectorAll('.filtro');
const lixeiras = document.querySelectorAll('.lixeira');
filtros.forEach(botao => {
  botao.addEventListener('click', () => {
    filtros.forEach(f => f.classList.remove('ativo'));
    botao.classList.add('ativo');
    const tipo = botao.dataset.tipo;
    lixeiras.forEach(l => {
      l.classList.toggle('oculta', tipo !== 'todos' && l.dataset.tipo !== tipo);
    });
  });
});

// Quiz
const perguntas = [
  { pergunta: 'Garrafa PET vai em qual lixeira?', opcoes: ['Azul', 'Vermelha', 'Verde', 'Amarela'], certa: 1 },
  { pergunta: 'Onde descartar uma lata de refrigerante?', opcoes: ['Amarela', 'Marrom', 'Azul', 'Verde'], certa: 0 },
  { pergunta: 'Caixa de papelão vai em qual lixeira?', opcoes: ['Vermelha', 'Verde', 'Azul', 'Marrom'], certa: 2 },
  { pergunta: 'Pote de vidro vai em qual lixeira?', opcoes: ['Amarela', 'Verde', 'Vermelha', 'Azul'], certa: 1 },
  { pergunta: 'Casca de banana vai em qual lixeira?', opcoes: ['Azul', 'Amarela', 'Vermelha', 'Marrom'], certa: 3 }
];
let atual = 0;
let acertos = 0;
const elProgresso = document.getElementById('quizProgresso');
const elPergunta = document.getElementById('quizPergunta');
const elOpcoes = document.getElementById('quizOpcoes');
const elResultado = document.getElementById('quizResultado');
const btnProxima = document.getElementById('quizProxima');

function mostrarPergunta() {
  const p = perguntas[atual];
  elProgresso.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
  elPergunta.textContent = p.pergunta;
  elResultado.textContent = '';
  btnProxima.hidden = true;
  elOpcoes.innerHTML = '';
  p.opcoes.forEach((texto, i) => {
    const b = document.createElement('button');
    b.textContent = texto;
    b.addEventListener('click', () => responder(i, b));
    elOpcoes.appendChild(b);
  });
}

function responder(i, botao) {
  const p = perguntas[atual];
  const botoes = elOpcoes.querySelectorAll('button');
  botoes.forEach(b => (b.disabled = true));
  botoes[p.certa].classList.add('certa');
  if (i === p.certa) {
    acertos++;
    elResultado.textContent = 'Certo! 🌱';
  } else {
    botao.classList.add('errada');
    elResultado.textContent = `Ops! A resposta é ${p.opcoes[p.certa]}.`;
  }
  btnProxima.textContent = atual === perguntas.length - 1 ? 'Ver resultado' : 'Próxima';
  btnProxima.hidden = false;
}

btnProxima.addEventListener('click', () => {
  if (btnProxima.textContent === 'Jogar de novo') {
    atual = 0; acertos = 0; mostrarPergunta(); return;
  }
  atual++;
  if (atual < perguntas.length) {
    mostrarPergunta();
  } else {
    elProgresso.textContent = '';
    elPergunta.textContent = `Você acertou ${acertos} de ${perguntas.length}!`;
    elOpcoes.innerHTML = '';
    elResultado.textContent = '';
    btnProxima.textContent = 'Jogar de novo';
  }
});
mostrarPergunta();

// Validação do formulário
const formulario = document.getElementById('formulario');
const aviso = document.getElementById('formAviso');
formulario.addEventListener('submit', e => {
  e.preventDefault();
  const nome = formulario.nome.value.trim();
  const email = formulario.email.value.trim();
  const mensagem = formulario.mensagem.value.trim();
  if (!nome || !email || !mensagem) {
    aviso.style.color = '#ffdddd';
    aviso.textContent = 'Preencha todos os campos.';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    aviso.style.color = '#ffdddd';
    aviso.textContent = 'Digite um e-mail válido.';
  } else {
    aviso.style.color = '#ffffff';
    aviso.textContent = `Obrigado, ${nome}! Mensagem enviada.`;
    formulario.reset();
  }
});
