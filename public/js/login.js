document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o usuário já está logado
    const token = localStorage.getItem('token');
    if (token) {
        // Redirecionar para o dashboard se já estiver logado
        window.location.href = 'dashboard.html';
    }

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obter valores do formulário
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        // Limpar mensagem de erro anterior
        errorMessage.style.display = 'none';
        
        try {
            // Enviar requisição para a API de autenticação
            const response = await fetch('/.netlify/functions/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });
            
            const data = await response.json();
            
            if (data.sucesso) {
                // Armazenar token e informações do usuário
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                
                // Redirecionar para o dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Exibir mensagem de erro
                errorMessage.textContent = data.mensagem || 'Erro ao fazer login';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            errorMessage.textContent = 'Erro ao conectar com o servidor';
            errorMessage.style.display = 'block';
        }
    });
});
