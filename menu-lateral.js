// Novo menu-lateral-tags.js
const dadosTags = [
    {
        titulo: 'Material Escolar',
        tags: ['material escolar', 'lapis', 'caneta', 'caderno', 'papelaria', 'escolar', 'cores', 'desenho', 'arte']
    },
    {
        titulo: 'Informática',
        tags: ['informatica', 'PC', 'computador', 'processador', 'placa mãe', 'intel', 'AMD']
    },
    {
        titulo: 'Impressão',
        tags: ['impressão', 'folha', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'cartolina']
    },
    {
        titulo: 'Cabos e Acessórios',
        tags: ['cabo', 'VGA', 'HDMI', 'adaptador', 'rede']
    },
    {
        titulo: 'Adesivos',
        tags: ['adesivo', 'recorte', 'impreço', 'translúcido']
    },
    {
        titulo: 'Tintas',
        tags: ['tinta', 'EPSON', 'impressora']
    }
];

// Função para obter as tags mais populares do sistema
function getPopularTagsForMenu() {
    if (typeof searchEngine !== 'undefined') {
        return searchEngine.getPopularTags(20); // Pega as 20 tags mais populares
    }
    
    // Fallback se searchEngine não estiver disponível
    const allTags = {};
    PRODUTOS.forEach(produto => {
        produto.tags.forEach(tag => {
            allTags[tag] = (allTags[tag] || 0) + 1;
        });
    });
    
    return Object.entries(allTags)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 20)
        .map(([tag]) => tag);
}

// Função para categorizar tags populares
function categorizarTagsPopulares() {
    const tagsPopulares = getPopularTagsForMenu();
    const categorias = {};
    
    // Inicializar categorias
    dadosTags.forEach(categoria => {
        categorias[categoria.titulo] = [];
    });
    
    // Categorizar tags populares
    tagsPopulares.forEach(tag => {
        let encontrou = false;
        
        dadosTags.forEach(categoria => {
            if (categoria.tags.some(catTag => 
                tag.toLowerCase().includes(catTag.toLowerCase()) || 
                catTag.toLowerCase().includes(tag.toLowerCase())
            )) {
                categorias[categoria.titulo].push(tag);
                encontrou = true;
            }
        });
        
        // Se não encontrou categoria, adiciona em "Outros"
        if (!encontrou) {
            if (!categorias['Outros']) categorias['Outros'] = [];
            categorias['Outros'].push(tag);
        }
    });
    
    return categorias;
}

// Função para renderizar o menu com tags
function renderMenuComTags() {
    const menu = document.getElementById('menu');
    const tagsCategorizadas = categorizarTagsPopulares();
    
    // Limpar menu atual
    menu.innerHTML = '';
    
    // Adicionar categorias ao menu
    Object.entries(tagsCategorizadas).forEach(([categoria, tags]) => {
        if (tags.length > 0) { // Só adiciona categorias que têm tags
            const li = document.createElement('li');
            li.className = 'dropdown';
            
            li.innerHTML = `
                <a href="#">${categoria}</a>
                <ul class="submenu">
                    ${tags.map(tag => `
                        <li><a href="#" data-tag="${tag}">${tag}</a></li>
                    `).join('')}
                </ul>
            `;
            
            menu.appendChild(li);
        }
    });
}

// Função para buscar produtos por tag
function buscarPorTag(tag) {
    if (typeof searchEngine !== 'undefined') {
        const results = searchEngine.searchByTag(tag);
        renderProducts(results);
        
        // Scroll suave para os resultados
        const container = document.querySelector('.products-container');
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Event listener para cliques nas tags do menu
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    // Se for um link de tag do submenu
    if (link.dataset.tag) {
        e.preventDefault();
        buscarPorTag(link.dataset.tag);
        
        // Fechar submenu após clicar
        const dropdown = link.closest('.dropdown');
        const subMenu = dropdown.querySelector('.submenu');
        subMenu.classList.remove('ativo');
        dropdown.querySelector('a').classList.remove('ativo');
        return;
    }
    
    // Comportamento normal do dropdown
    const dropdown = link.parentElement;
    const sub = dropdown.querySelector('.submenu');
    if (!sub) return;
    
    e.preventDefault();
    
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

// Inicializar menu quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    renderMenuComTags();
});