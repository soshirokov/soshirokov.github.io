/*
С помощью цикла for написать алгоритм для вывода чисел (выводите в консоль, с помощью console.log) от 0 до 10 включительно, чтобы результат выглядел так:
0 – это ноль
1 – нечетное число
2 – четное число
3 – нечетное число
...
10 – четное число
Для решения этой задачи используйте остаток от деления на 2, подробнее здесь
https://developer.mozilla.org/ru/docs/Learn/JavaScript/First_steps/Math#%D0%B0%D1%80%D0%B8%D1%84%D0%BC%D0%B 5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82 %D0%BE%D1%80%D1%8B и здесь https://developer.mozilla.org/en- US/docs/Web/JavaScript/Reference/Operators/Remainder
*/

for (let i = 0; i <= 10; i++) {
    if (i === 0) {
        console.log(i + ' – это ноль');
    } else if (i % 2) {
        console.log(i + ' – нечетное число');
    } else {
        console.log(i + ' – четное число');
    }
}