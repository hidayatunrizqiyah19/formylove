function bukaKado() {
    const overlay = document.getElementById('gift-overlay');
    const lagu = document.getElementById('bg-music');
    
    // Ambil elemen surat dan pemutar musik
    const wadahSurat = document.querySelector('.container');
    const wadahMusik = document.querySelector('.music-player');

    // 1. Jalankan Musik seketika saat kado di-klik
    lagu.play().catch(err => console.log("Musik memerlukan interaksi user terlebih dahulu"));
    
    // 2. Efek Ledakan Bunga Masif Menutup Layar
    const jumlahBunga = 120; 
    const bungaKoleksi = ['🌸', '🌹', '🌺', '🌷', '💗'];

    for (let i = 0; i < jumlahBunga; i++) {
        const elemenBunga = document.createElement('div');
        elemenBunga.classList.add('burst-flower');
        elemenBunga.innerText = bungaKoleksi[Math.floor(Math.random() * bungaKoleksi.length)];
        
        elemenBunga.style.top = '50%';
        elemenBunga.style.left = '50%';
        elemenBunga.style.fontSize = Math.random() * 20 + 30 + 'px';

        const sudut = Math.random() * Math.PI * 2;
        const jarak = Math.random() * 50 + 20; 
        const x = Math.cos(sudut) * jarak + 'vw';
        const y = Math.sin(sudut) * jarak + 'vh';

        elemenBunga.style.setProperty('--x', x);
        elemenBunga.style.setProperty('--y', y);

        document.body.appendChild(elemenBunga);

        // Hapus elemen bunga ledakan setelah 10 detik (sesuai durasi gerak CSS)
        setTimeout(() => { elemenBunga.remove(); }, 10000);
    }

    // 3. Sembunyikan Kotak Kado & Teks "tap to open" dengan cepat (300ms)
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000);
    }, 300);

    // 4. Memunculkan konten utama setelah 10 detik penuh
    setTimeout(() => {
        wadahSurat.classList.add('tampilkan-konten');
        wadahMusik.classList.add('tampilkan-konten');

        // Mulai Jalankan Hujan Bunga Gerimis dari Atas
        setInterval(buatBunga, 300);
    }, 10000); // Jeda waktu 10 detik
}

function buatBunga() {
    const bungaKoleksi = ['🌸', '🌹', '🌺', '🌷', '✨'];
    const emojiAcak = bungaKoleksi[Math.floor(Math.random() * bungaKoleksi.length)];
    
    const elemenBunga = document.createElement('div');
    elemenBunga.classList.add('flower');
    elemenBunga.innerText = emojiAcak;

    // Atur posisi horizontal acak dari kiri ke kanan layar
    elemenBunga.style.left = Math.random() * 100 + 'vw';
    
    // Atur ukuran bunga bervariasi acak
    elemenBunga.style.fontSize = Math.random() * 10 + 20 + 'px';
    
    // Atur kecepatan jatuh acak
    elemenBunga.style.animationDuration = Math.random() * 3 + 3 + 's';

    document.body.appendChild(elemenBunga);

    // Hapus elemen hujan bunga setelah selesai jatuh ke bawah
    setTimeout(() => {
        elemenBunga.remove();
    }, 6000);
}

function toggleMusik() {
    const lagu = document.getElementById('bg-music');
    const tombol = document.getElementById('music-btn');
    
    if (lagu.paused) {
        lagu.play();
        tombol.innerText = '🎵';
    } else {
        lagu.pause();
        tombol.innerText = '🔇';
    }
}

// Fungsi untuk memunculkan rahasia arti bunga saat diklik
function cekArtiBunga(emoji, artiPesan) {
    const kotakArti = document.getElementById('flower-meaning');
    
    kotakArti.style.opacity = '0';
    
    setTimeout(() => {
        kotakArti.innerHTML = `<strong style="color: #ffb7d2;">${emoji}</strong> — ${artiPesan}`;
        kotakArti.style.opacity = '1';
    }, 200);
}

// ================= EVENT LISTENER MODAL (KINI RAPI & TIDAK DOUBLE) =================
document.addEventListener("DOMContentLoaded", function() {
    const modalSurat = document.getElementById('custom-modal-surat');
    const tombolBuka = document.getElementById('open-envelope-btn');
    const tombolTutup = document.getElementById('close-envelope-btn');

    // Ketika tombol Buka Surat diklik
    if (tombolBuka) {
        tombolBuka.addEventListener('click', function() {
            if (modalSurat) {
                modalSurat.classList.remove('hidden'); 
                modalSurat.style.display = 'flex'; 
            }
        });
    }

    // Ketika tombol Kembali diklik
    if (tombolTutup) {
        tombolTutup.addEventListener('click', function() {
            if (modalSurat) {
                modalSurat.classList.add('hidden'); 
                modalSurat.style.display = 'none'; 
            }
        });
    }
}); 

// ================= LOGIKA PERPINDAHAN TAB (SUDAH DI LUAR & AMAN DI AKSES) =================
function gantiTab(event, tabId) {
    // 1. Sembunyikan semua konten tab terlebih dahulu
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // 2. Matikan background aktif di semua tombol navigasi
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 3. Tampilkan tab yang sedang di-klik dan beri efek aktif
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.classList.add('active');
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// ================= LOGIKA MINI GAME MEMORY CARD =================
document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard) return; // Mencegah error jika elemen belum siap

    // Daftar emoji berpasangan (4 pasang = 8 kartu)
    const cardIcons = ['🎂', '🎂', '🤍', '🤍', '🌹', '🌹', '✨', '✨'];
    
    // Acak posisi kartu (Randomize)
    let shuffledCards = cardIcons.sort(() => Math.random() - 0.5);

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    // Buat elemen HTML kartunya secara otomatis
    shuffledCards.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.icon = icon;

        card.innerHTML = `
            <div class="card-front">❓</div>
            <div class="card-back">${icon}</div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            // Kartu pertama yang diklik
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Kartu kedua yang diklik
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        // Kalau cocok, matikan fungsi klik dan biarkan terbuka
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedPairs++;
        resetBoard();

        // Cek kalau semua sudah pasang
        if (matchedPairs === 4) {
            document.getElementById('gameWinText').innerHTML = "🎉 Yey, Berhasil! You know me so well, now continue to the next surprise! 🤍";
        }
    }

    function unflipCards() {
        lockBoard = true;

        // Kalau tidak cocok, beri jeda sebentar (1 detik) lalu tutup lagi
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

});