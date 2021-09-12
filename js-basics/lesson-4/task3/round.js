'use sctrict';

const round = {
    answersToShuffle: [],
    answersLetters: ['a', 'b', 'c', 'd'],

    /**
     * Метод для каждого раунда викторины выводит в консоль вопрос и перетасованные варианты ответа
     * @param {number} id - номер раунда викторины, не может быть больше размера массива возможных вопросов
     */
    ask(id) {
        console.clear();
        console.log(`Вопрос №${id + 1}`);
        console.log(questions[id].question + '\n\n');
        this.answersToShuffle = [];
        this.answersToShuffle = this.answersToShuffle.concat(questions[id].answerOptions);

        this.answersToShuffle.sort(function () {
            return 0.5 - Math.random();
        });

        for (let i = 0; i < this.answersToShuffle.length; i++) {
            console.log(this.answersLetters[i] + ' ' + this.answersToShuffle[i]);
        }
    },

    checkAnswer(id, answer) {
        checkedAnswer = this.answersLetters.indexOf(answer);
        checkedAnswer = this.answersToShuffle[checkedAnswer];
        if (checkedAnswer == questions[id].correctAnswer) {
            console.log('Верно!');
            return 1;
        } else {
            console.log('Неправильно!');
            return 0;
        }
    }
}