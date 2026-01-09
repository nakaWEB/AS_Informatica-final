// Função para embaralhar array (Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Substitua a função renderProducts original por esta:
function renderProducts(products = PRODUTOS) {
    const grid = document.getElementById('productsGrid');

    const history = JSON.parse(localStorage.getItem('productHistory') || '[]');

    // Separa produtos vistos e não vistos
    const viewed = products.filter(p => history.includes(p.id));
    const notViewed = products.filter(p => !history.includes(p.id));

    // Embaralha ambos
    const shuffledViewed = shuffleArray(viewed);
    const shuffledNotViewed = shuffleArray(notViewed);

    // Combina: vistos primeiro, depois os outros
    const finalOrder = [...shuffledViewed, ...shuffledNotViewed];

    grid.innerHTML = finalOrder.map(product => `
        <div class="product-card" onclick="router.navigateToProduct('${product.id}')">
            <img src="${product.imagem}" alt="${product.nome}" class="product-card-image">
            <div class="product-card-content">
                <h3 class="product-card-title">${product.nome}</h3>
                <div class="product-card-price">R$ ${product.preco.toFixed(2)}</div>
                <div class="product-card-tags">
                    ${product.tags.slice(0, 3).map(tag =>
                        `<span class="product-card-tag">${tag}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Busca em tempo real
function performSearch() {
  const query = document.getElementById('searchInput').value;
  const results = searchEngine.search(query);
  renderProducts(results);
}

// Tags populares
function renderPopularTags() {
  const tags = searchEngine.getPopularTags(8);
  const container = document.getElementById('popularTags');
  
  container.innerHTML = tags.map(tag => 
    `<button class="tag-button" onclick="searchByTag('${tag}')">${tag}</button>`
  ).join('');
}

// Buscar por tag
function searchByTag(tag) {
  document.getElementById('searchInput').value = tag;
  const results = searchEngine.searchByTag(tag);
  renderProducts(results);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderPopularTags();
  
  // Busca em tempo real
  document.getElementById('searchInput').addEventListener('input', 
    debounce(performSearch, 300)
  );
  
  // Inicializar router
  router.init();
});

// Função debounce para performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

