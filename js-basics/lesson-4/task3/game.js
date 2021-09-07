'use strict';

const game = {
    init() {
        console.clear();
        console.log('Добро пожаловать на игру Кто хочет стать миллионером!\nВас ждет 5 интересных вопросов.\nДля старта игры введите game.run(); в консоль');
    },

    score: 0,
    roundNum: 0,

    run() {
        while (this.roundNum < questions.length) {
            round.ask(this.roundNum);
            let answer = this.getAnswer();
            this.score += round.checkAnswer(this.roundNum++, answer);
        }
        this.result();
    },

    getAnswer() {
        while (true) {
            let answer = prompt('Введите букву выбранного ответа a, b, c или d. Чтобы выйти, нажмите Отмена');

            if (!answer) {
                console.log('Игра закончена');
                return;
            }
            if (!round.answersLetters.includes(answer)) {
                continue;
            }
            return answer;
        }
    },

    result() {
        console.log(`Игра окончена, ваш счет ${this.score} баллов из ${questions.length}\nЧтобы начать сначала, введите game.run() в консоль`)
        this.score = 0;
        this.roundNum = 0;
    }
}

game.init();