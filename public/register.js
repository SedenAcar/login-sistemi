document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM yüklendi');
    
    const registerForm = document.getElementById('registerForm');
    console.log('Register form:', registerForm);
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form gönderildi');

            // Form verilerini topla
            const formData = new FormData(registerForm);
            const userData = Object.fromEntries(formData.entries());

            try {
                // Sunucuya POST isteği gönder
                const response = await fetch('http://localhost:5500/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Kayıt başarılı:', data);
                    alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
                    // Giriş sayfasına yönlendir
                    window.location.href = 'index.html';
                } else {
                    console.error('Kayıt hatası:', data);
                    alert(`Kayıt hatası: ${data.message}`);
                }
            } catch (error) {
                console.error('İstek hatası:', error);
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        });
    } else {
        console.error('Register form bulunamadı! HTML içeriği:', document.body.innerHTML);
    }
});