const dados = [
    {
        titulo: 'Impressão',
        itens: [
            { nome: 'Folha A1', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A1' },
            { nome: 'Folha A2', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A2' },
            { nome: 'Folha A3', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A3' },
            { nome: 'Folha A4', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A4' },
            { nome: 'Folha A5', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A5' },
            { nome: 'Folha A6', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A6' }
        ]
    },
    {
        titulo: 'Cabos',
        itens: [
            { nome: 'Cabo VGA', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Cabo%20VGA' },
            { nome: 'Cabo HDMI', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Cabo%20HDMI' },
            { nome: 'Adaptador HDMI', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Adaptador%20HDMI' },
            { nome: 'Adaptador VGA', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Adaptador%20VGA' },
            { nome: 'Cabo de Rede', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Cabo%20de%20Rede' }
        ]
    },
    {
        titulo: 'Adesivos',
        itens: [
            { nome: 'Adesivo de Recorte', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Adesivo%20de%20Recorte' },
            { nome: 'Adesivo Impreço', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Adesivo%20Impreço' },
            { nome: 'Adesivo Translúcido', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Adesivo%20Translúcido' }
        ]
    },
    {
        titulo: 'Folhas',
        itens: [
            { nome: 'Folha A1', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A1' },
            { nome: 'Folha A2', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A2' },
            { nome: 'Folha A3', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A3' },
            { nome: 'Folha A4', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A4' },
            { nome: 'Folha A5', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A5' },
            { nome: 'Folha A6', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Folha%20A6' },
            { nome: 'Cartolina', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Cartolina' }
        ]
    },
    {
        titulo: 'Canetas e Lapis',
        itens: [
            { nome: 'Caneta esferografica', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Caneta%20esferografica' },
            { nome: 'Lapis faber Castelo', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Lapis%20faber%20Castelo' }
        ]
    },
    {
        titulo: 'Tinta Impressora',
        itens: [
            { nome: 'EPSON M105', url: 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20sobre%20Tinta%20EPSON%20M105' }
        ]
    }
];

const menu = document.getElementById('menu');

dados.forEach(secao => {
    const li = document.createElement('li');
    li.className = 'dropdown';

    li.innerHTML = `
        <a href="#">${secao.titulo}</a>
        <ul class="submenu">
            ${secao.itens.map(item => `<li><a href="#" data-url="${item.url}">${item.nome}</a></li>`).join('')}
        </ul>
    `;
    menu.appendChild(li);
});

// Função para redirecionar com confirmação
function redirecionarComConfirmacao(url) {
    if (confirm('Você será direcionado para nosso WhatsApp. Deseja continuar?')) {
        window.open(url, '_blank');
    }
}

// Comportamento dos dropdowns e links
menu.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    // Se for um link de item (tem data-url)
    if (link.dataset.url) {
        e.preventDefault();
        redirecionarComConfirmacao(link.dataset.url);
        return;
    }

    // Se for um link de categoria (dropdown)
    const dropdown = link.parentElement;
    const sub = dropdown.querySelector('.submenu');
    if (!sub) return;

    e.preventDefault();

    // Toggle do submenu
    const estaAberto = sub.classList.contains('ativo');

    // Fecha todos os submenus
    document.querySelectorAll('.submenu.ativo').forEach(s => s.classList.remove('ativo'));
    document.querySelectorAll('.dropdown > a.ativo').forEach(a => a.classList.remove('ativo'));

    // Abre o clicado se estava fechado
    if (!estaAberto) {
        sub.classList.add('ativo');
        link.classList.add('ativo');
    }
});

// Fecha ao clicar fora
addEventListener('click', e => {
    if (!e.target.closest('.menu-vertical')) {
        document.querySelectorAll('.submenu.ativo').forEach(s => s.classList.remove('ativo'));
        document.querySelectorAll('.dropdown > a.ativo').forEach(a => a.classList.remove('ativo'));
    }
});