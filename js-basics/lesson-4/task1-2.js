/*
Сделайте в стиле es5, а затем в стиле es6 (по аналогии из дополнительных видео -> 3 примеры наследования -> механика наследования),
а) конструктор Post, который принимает параметры author, text, date и сохраняет их как свойства объекта. Объекты типа Post должны иметь метод edit, который будет принимать текст и записывать его в свойство text объекта.
б) конструктор AttachedPost, который принимает параметры author, text, date. Проинициализируйте эти свойства с помощью конструктора Post, чтобы не дублировать код. Также в конструкторе AttachedPost должно создаваться свойство highlighted со значением false. Унаследуйте в объектах типа AttachedPost методы из Post.
Объекты типа AttachedPost должны иметь метод makeTextHighlighted, который будет назначать свойству highlighted значение true.
*/
'use strict';

function PostES5(author, text, date) {
    this.author = author,
        this.text = text,
        this.date = date
}

PostES5.prototype.edit = function (text) {
    this.text = text;
}

function AttachedPostES5(author, text, date) {
    PostES5.call(this, author, text, date);
    this.highlighted = false;
}

AttachedPostES5.prototype = Object.create(PostES5.prototype);
AttachedPostES5.prototype.constructor = AttachedPostES5;

AttachedPostES5.prototype.makeTextHighlighted = function () {
    this.highlighted = true;
}

let attachedPostES5 = new AttachedPostES5('', '', '');
console.log(attachedPostES5);
attachedPostES5.edit('hello');
console.log(attachedPostES5);
attachedPostES5.makeTextHighlighted();
console.log(attachedPostES5);

class PostES6 {
    constructor(author, text, date) {
        this.author = author,
            this.text = text,
            this.date = date
    }

    edit(text) {
        this.text = text;
    }
}

class AttachedPostES6 extends PostES6 {
    constructor(author, text, date) {
        super(author, text, date);
        this.highlighted = false;
    }

    makeTextHighlighted() {
        this.highlighted = true;
    }
}

let attachedPostES6 = new AttachedPostES6('', '', '');
console.log(attachedPostES6);
attachedPostES6.edit('hello');
console.log(attachedPostES6);
attachedPostES6.makeTextHighlighted();
console.log(attachedPostES6);