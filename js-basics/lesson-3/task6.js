/*
Нарисовать горку с помощью console.log (используя цикл for), как показано на рисунке, только у вашей горки должно быть 20 рядов, а не 5
*/
'use strict';

for (let rock = 'x'; rock.length <= 20; rock += 'x') {
    console.log(rock);
}