import { db } from './firebase.js';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        home: document.getElementById('home'),
        write: document.getElementById('write'),
        saving: document.getElementById('saving'),
        board: document.getElementById('board'),
    };

    const goWriteBtn = document.getElementById('goWriteBtn');
    const goBoardBtn = document.getElementById('goBoardBtn');
    const saveBtn = document.getElementById('saveBtn');
    const goHomeBtn = document.getElementById('goHomeBtn');
    const confirmBtn = document.getElementById('confirmBtn');

    const savingText = document.getElementById('savingText');

    const nicknameInput = document.getElementById('nickname');
    const messageInput = document.getElementById('message');
    const songInput = document.getElementById('song');

    const postitContainer = document.getElementById('postitContainer');

    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[name].classList.add('active');
    }

    // 🔥 Firestore에서 포스트잇 불러오기
    async function renderPosts() {
        postitContainer.innerHTML = '';

        const q = query(
            collection(db, 'letters'),
            orderBy('createdAt', 'asc')
        );

        const snapshot = await getDocs(q);

        snapshot.forEach(doc => {
            const post = doc.data();

            const div = document.createElement('div');
            div.className = 'postit';
            div.innerHTML = `
                <div class="nickname">${post.nickname}</div>
                <div class="message">${post.message}</div>
                <div class="song">${post.song || ''}</div>
            `;

            postitContainer.appendChild(div);
        });
    }

    // 시작
    showScreen('home');

    // 홈 → 작성
    goWriteBtn.addEventListener('click', () => {
        showScreen('write');
    });

    // 홈 → 우편함
    goBoardBtn.addEventListener('click', async () => {
        await renderPosts();
        showScreen('board');
    });

    // 🔥 저장하기 → Firestore에 저장
    saveBtn.addEventListener('click', async () => {
        const nickname = nicknameInput.value.trim();
        const message = messageInput.value.trim();
        const song = songInput.value.trim();

        if (!nickname || !message) return;

        showScreen('saving');
        savingText.textContent = '저장중…';
        confirmBtn.style.visibility = 'hidden';

        try {
            await addDoc(collection(db, 'letters'), {
                nickname,
                message,
                song,
                createdAt: Date.now(),
            });

            savingText.textContent = '저장되었습니다!';
            confirmBtn.style.visibility = 'visible';

            nicknameInput.value = '';
            messageInput.value = '';
            songInput.value = '';
        } catch (error) {
            savingText.textContent = '저장에 실패했어요 😢';
            console.error(error);
        }
    });

    // 확인하기 → 우편함
    confirmBtn.addEventListener('click', async () => {
        await renderPosts();
        showScreen('board');
    });

    // 홈으로
    goHomeBtn.addEventListener('click', () => {
        showScreen('home');
    });
});
