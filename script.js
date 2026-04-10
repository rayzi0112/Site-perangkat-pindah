// ===== UTILITY FUNCTIONS =====

// Fungsi untuk mendapatkan elemen pesan
function getMessageElement(form) {
    let messageDiv = form.querySelector('.message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        form.parentElement.insertBefore(messageDiv, form.nextSibling);
    }
    return messageDiv;
}

// Fungsi untuk validasi email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fungsi untuk validasi password
function isValidPassword(password) {
    return password.length >= 6;
}

// Fungsi untuk validasi nomor telepon
function isValidPhone(phone) {
    const phoneRegex = /^[0-9\-]{10,}$/;
    return phoneRegex.test(phone);
}

// ===== PASSWORD TOGGLE FUNCTIONALITY =====

// Logika Tampilkan/Sembunyikan Password (Eye Icon)
document.querySelectorAll('.toggle-eye, .toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        let input = null;
        if (this.dataset.target) {
            input = document.getElementById(this.dataset.target);
        }
        input = input || this.parentElement.querySelector('.pass-input') ||
                this.parentElement.querySelector('input[type="password"]');

        if (!input) return;

        if (input.type === 'password') {
            input.type = 'text';
            if (this.classList.contains('fa-eye')) {
                this.classList.replace('fa-eye', 'fa-eye-slash');
            }
        } else {
            input.type = 'password';
            if (this.classList.contains('fa-eye-slash')) {
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }
    });
});

// ===== REMEMBER ME FUNCTIONALITY =====

// Muat data login yang disimpan jika user memilih "Ingat Saya"
function loadRememberedLogin() {
    const emailInput = document.getElementById('loginEmail') || document.getElementById('email');
    const rememberCheckbox = document.getElementById('remember-log') || document.getElementById('remember');
    const rememberedEmail = localStorage.getItem('rememberedLoginEmail');
    const rememberChecked = localStorage.getItem('rememberLoginChecked') === 'true';

    if (emailInput && rememberCheckbox && rememberedEmail && rememberChecked) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
}

function saveRememberedLogin(email, remember) {
    if (remember) {
        localStorage.setItem('rememberedLoginEmail', email);
        localStorage.setItem('rememberLoginChecked', 'true');
    } else {
        localStorage.removeItem('rememberedLoginEmail');
        localStorage.removeItem('rememberLoginChecked');
    }
}

// ===== FORM HANDLERS =====

// Penanganan Submit Form Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail')?.value ||
                  document.getElementById('email')?.value ||
                  e.target.querySelector('input[type="email"]')?.value;
    const password = document.getElementById('loginPassword')?.value ||
                     document.getElementById('password')?.value ||
                     e.target.querySelector('.pass-input')?.value ||
                     e.target.querySelector('input[type="password"]')?.value;
    const messageDiv = getMessageElement(e.target);

    // Validasi email kosong
    if (!email) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Email tidak boleh kosong.';
        return;
    }

    // Validasi format email
    if (!isValidEmail(email)) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Format email tidak valid.';
        return;
    }

    // Validasi password kosong
    if (!password) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Kata sandi tidak boleh kosong.';
        return;
    }

    // Validasi panjang password
    if (!isValidPassword(password)) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Kata sandi minimal 6 karakter.';
        return;
    }

    // Simulasi login berhasil
    const rememberMe = (document.getElementById('remember-log') || document.getElementById('remember'))?.checked;
    saveRememberedLogin(email, rememberMe);

    messageDiv.className = 'message success';
    messageDiv.textContent = 'Login berhasil! Selamat datang.';

    // Reset form setelah 2 detik, tetapi pertahankan email jika disimpan
    setTimeout(() => {
        if (!rememberMe) {
            e.target.reset();
        }
        messageDiv.textContent = '';
    }, 2000);
});

// Penanganan Submit Form Register
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = document.getElementById('fullName')?.value || form.querySelector('input[type="text"]')?.value;
    const email = document.getElementById('registerEmail')?.value || form.querySelector('input[type="email"]')?.value;
    const phoneNumber = document.getElementById('phoneNumber')?.value || form.querySelector('input[type="tel"]')?.value;
    const password = document.getElementById('registerPassword')?.value ||
                     document.getElementById('regPass')?.value ||
                     form.querySelector('input[type="password"]')?.value;
    const confirmPassword = document.getElementById('confirmRegisterPassword')?.value ||
                           document.getElementById('confirmPass')?.value ||
                           Array.from(form.querySelectorAll('input[type="password"]'))[1]?.value;
    const agreeTerms = document.getElementById('agreeTerms')?.checked ||
                      document.getElementById('agree')?.checked ||
                      form.querySelector('input[type="checkbox"]')?.checked;
    const messageDiv = getMessageElement(form);

    // Validasi nama lengkap kosong
    if (!fullName) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Nama lengkap tidak boleh kosong.';
        return;
    }

    // Validasi nama lengkap minimal 3 karakter
    if (fullName.length < 3) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Nama lengkap minimal 3 karakter.';
        return;
    }

    // Validasi email kosong
    if (!email) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Email tidak boleh kosong.';
        return;
    }

    // Validasi format email
    if (!isValidEmail(email)) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Format email tidak valid.';
        return;
    }

    // Validasi nomor telepon kosong
    if (!phoneNumber) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Nomor telepon tidak boleh kosong.';
        return;
    }

    // Validasi format nomor telepon
    if (!isValidPhone(phoneNumber)) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Nomor telepon tidak valid. Gunakan format: 08xx-xxxx-xxxx';
        return;
    }

    // Validasi password kosong
    if (!password) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Kata sandi tidak boleh kosong.';
        return;
    }

    // Validasi panjang password
    if (!isValidPassword(password)) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Kata sandi minimal 6 karakter.';
        return;
    }

    // Validasi konfirmasi password
    if (!confirmPassword) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Konfirmasi kata sandi tidak boleh kosong.';
        return;
    }

    // Validasi kedua password cocok
    if (password !== confirmPassword) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Kata sandi tidak cocok.';
        return;
    }

    // Validasi kesepakatan syarat & ketentuan
    if (!agreeTerms) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Anda harus menyetujui Syarat & Ketentuan.';
        return;
    }

    // Validasi keamanan password (saran)
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        messageDiv.className = 'message warning';
        messageDiv.textContent = 'Saran: Gunakan kombinasi huruf besar, huruf kecil, dan angka untuk keamanan lebih baik.';
        setTimeout(() => {
            completeRegistration(messageDiv, form);
        }, 2000);
        return;
    }

    // Simulasi registrasi berhasil
    completeRegistration(messageDiv, form);
});

// Fungsi untuk menyelesaikan registrasi
function completeRegistration(messageDiv, form) {
    messageDiv.className = 'message success';
    messageDiv.textContent = 'Akun berhasil didaftarkan! Anda akan diarahkan ke halaman login.';

    // Reset form
    form.reset();

    // Redirect ke login setelah 3 detik
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
}

// ===== FORGET PASSWORD FUNCTIONALITY =====

// Fungsi untuk kembali ke form forget email
function backToForget() {
    document.getElementById('forgetBox').classList.remove('hidden');
    document.getElementById('verifyBox').classList.add('hidden');
    document.getElementById('resetBox').classList.add('hidden');
}

// Tahap 1: Penanganan Submit Form Forget Password (Input Email)
if (document.getElementById('forgetForm')) {
    document.getElementById('forgetForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgetEmail').value;
        const messageDiv = document.getElementById('forgetMessage') || getMessageElement(e.target);

        // Validasi email kosong
        if (!email) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Email tidak boleh kosong.';
            return;
        }

        // Validasi format email
        if (!isValidEmail(email)) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Format email tidak valid.';
            return;
        }

        // Simulasi pengiriman email
        messageDiv.className = 'message success';
        messageDiv.textContent = 'Kode verifikasi telah dikirim ke email Anda. Silakan periksa inbox atau folder spam.';

        // Pindah ke tahap verifikasi setelah 2 detik
        setTimeout(() => {
            document.getElementById('forgetBox').classList.add('hidden');
            document.getElementById('verifyBox').classList.remove('hidden');
            messageDiv.textContent = '';
        }, 2000);
    });
}

// Tahap 2: Penanganan Submit Form Verifikasi Kode
if (document.getElementById('verifyForm')) {
    document.getElementById('verifyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('verifyCode').value;
        const messageDiv = document.getElementById('verifyMessage') || getMessageElement(e.target);

        // Validasi kode kosong
        if (!code) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Kode verifikasi tidak boleh kosong.';
            return;
        }

        // Validasi kode (simulasi: harus 6 digit)
        if (code.length !== 6 || isNaN(code)) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Kode verifikasi harus 6 digit angka.';
            return;
        }

        // Simulasi verifikasi kode berhasil
        messageDiv.className = 'message success';
        messageDiv.textContent = 'Kode verifikasi benar! Silakan buat kata sandi baru.';

        // Pindah ke tahap reset password setelah 2 detik
        setTimeout(() => {
            document.getElementById('verifyBox').classList.add('hidden');
            document.getElementById('resetBox').classList.remove('hidden');
            messageDiv.textContent = '';
        }, 2000);
    });
}

// Tahap 3: Penanganan Submit Form Reset Password
if (document.getElementById('resetForm')) {
    document.getElementById('resetForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const messageDiv = document.getElementById('resetMessage') || getMessageElement(e.target);

        // Validasi password kosong
        if (!newPassword || !confirmPassword) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Semua field harus diisi.';
            return;
        }

        // Validasi panjang password
        if (!isValidPassword(newPassword)) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Kata sandi minimal 6 karakter.';
            return;
        }

        // Validasi kedua password sama
        if (newPassword !== confirmPassword) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Kata sandi tidak cocok. Silakan coba lagi.';
            return;
        }

        // Validasi password tidak boleh plain text
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
            messageDiv.className = 'message warning';
            messageDiv.textContent = 'Saran: Gunakan kombinasi huruf besar, huruf kecil, dan angka untuk keamanan lebih baik.';
            return;
        }

        // Simulasi reset password berhasil
        messageDiv.className = 'message success';
        messageDiv.textContent = 'Kata sandi berhasil direset! Anda akan diarahkan ke halaman login.';

        // Reset form dan redirect setelah 3 detik
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    });
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    loadRememberedLogin();
});