document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log('Gönderilen veriler:', { username, password });
            const data = await response.json();

            if (data.token) {
                // Token'ı localStorage'a kaydet
                localStorage.setItem('token', data.token);
                // Giriş başarılı, yeni sayfaya yönlendir
                window.location.href = 'welcome.html';
            } else {
                alert('Kullanıcı adı veya şifre hatalı!');
            }
        } catch (error) {
            console.error('Giriş hatası:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    });
});