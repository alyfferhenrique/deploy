document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirecionar para a página de login se não estiver logado
        window.location.href = 'index.html';
        return;
    }

    const userName = document.getElementById('user-name');
    const btnLogout = document.getElementById('btn-logout');
    const apiData = document.getElementById('api-data');

    // Carregar informações do usuário
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    userName.textContent = usuario.nome || 'Usuário';

    // Função para carregar dados da API
    const carregarDados = async () => {
        try {
            const response = await fetch('/.netlify/functions/api/dados', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                // Token inválido ou expirado
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                window.location.href = 'index.html';
                return;
            }

            const data = await response.json();
            
            if (data.sucesso) {
                // Exibir dados na interface
                let html = '<ul class="data-list">';
                data.dados.itens.forEach(item => {
                    html += `<li>
                        <strong>${item.nome}</strong>
                        <span>R$ ${item.valor.toFixed(2)}</span>
                    </li>`;
                });
                html += '</ul>';
                
                apiData.innerHTML = html;
            } else {
                apiData.innerHTML = '<p class="error">Erro ao carregar dados</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            apiData.innerHTML = '<p class="error">Erro ao conectar com o servidor</p>';
        }
    };

    // Carregar dados ao iniciar
    carregarDados();

    // Configurar botão de logout
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    });
});
