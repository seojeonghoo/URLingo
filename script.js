document.addEventListener('DOMContentLoaded', () => {
    const originalUrlInput = document.getElementById('originalUrl');
    const shortenBtn = document.getElementById('shortenBtn');
    const resultContainer = document.getElementById('resultContainer');
    const shortenedUrlInput = document.getElementById('shortenedUrl');
    const copyBtn = document.getElementById('copyBtn');

    // TinyURL API를 사용하여 URL 단축
    async function shortenUrl(url) {
        try {
            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
            if (!response.ok) throw new Error('URL 단축에 실패했습니다.');
            return await response.text();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // URL 단축 버튼 클릭 이벤트
    shortenBtn.addEventListener('click', async () => {
        const originalUrl = originalUrlInput.value.trim();
        
        if (!originalUrl) {
            alert('URL을 입력해주세요.');
            return;
        }

        try {
            // URL 유효성 검사
            new URL(originalUrl);
            
            shortenBtn.disabled = true;
            shortenBtn.textContent = '처리중...';

            const shortUrl = await shortenUrl(originalUrl);
            shortenedUrlInput.value = shortUrl;
            resultContainer.style.display = 'block';

        } catch (error) {
            alert('유효한 URL을 입력해주세요.');
        } finally {
            shortenBtn.disabled = false;
            shortenBtn.textContent = '단축하기';
        }
    });

    // 복사 버튼 클릭 이벤트
    copyBtn.addEventListener('click', () => {
        shortenedUrlInput.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '복사됨!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    // Enter 키 입력 시 단축 실행
    originalUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            shortenBtn.click();
        }
    });
});

// 드래그, 우클릭 금지
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());
