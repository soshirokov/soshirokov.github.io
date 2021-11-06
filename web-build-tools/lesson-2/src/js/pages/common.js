window.onload = () => {
    document.querySelectorAll('.conrtolBtn').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach((tab) => {
                tab.classList.remove('active');
            });
            document.querySelector(`#${btn.dataset.id}`).classList.add('active');
        });
    });
}