onload = () => {
    const burger = new Hamburger('big', [new Stuffing('cheese'), new Stuffing('salad')]);
    burger.getPrice();
    burger.getCalories();

    burger.addTopping(new Topping('spice'));
    burger.addTopping(new Topping('mayonnaise'));
    burger.getPrice();
    burger.getCalories();

    burger.removeTopping(new Topping('spice'));
    burger.getPrice();
    burger.getCalories();

    burger.getToppings();
    burger.getSize();
    burger.getStuffing();
};

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
        this.price = this.calculatePrice();
        this.calories = this.calculateCalories();
    }

    // Добавить добавку 
    addTopping(topping) {
        this.topping.push(topping);
        this.refreshAttrs();
    }

    // Убрать добавку
    removeTopping(topping) {
        this.topping = this.topping.filter(item => item.type !== topping.type);
        this.refreshAttrs();
    }

    refreshAttrs() {
        this.price = this.calculatePrice();
        this.calories = this.calculateCalories();
    }

    // Получить список добавок 
    getToppings() {
        console.log(this.topping);
    }

    // Узнать размер гамбургера 
    getSize() {
        console.log(this.size);
    }

    // Узнать начинку гамбургера 
    getStuffing() {
        console.log(this.stuffing);
    }

    // Рассчитать цену 
    calculatePrice() {
        let price = 0;

        switch (this.size) {
            case 'big': price += 100; break;
            case 'small': price += 50; break;
        }

        this.stuffing.forEach(item => {
            price += item.price;
        });

        this.topping.forEach(item => {
            price += item.price;
        });

        return price;
    }

    // Рассчитать калорийность 
    calculateCalories() {
        let calories = 0;

        switch (this.size) {
            case 'big': calories += 20; break;
            case 'small': calories += 40; break;
        }

        this.stuffing.forEach(item => {
            calories += item.calories;
        });

        this.topping.forEach(item => {
            calories += item.calories;
        });

        return calories;
    }

    //Вывести цену
    getPrice() {
        console.log(this.price);
    }

    //Вывести калорийность
    getCalories() {
        console.log(this.calories);
    }
}

class Topping {
    constructor(type) {
        this.type = type;
        this.price = this.getPrice();
        this.calories = this.getCalories();
    }

    getPrice() {
        switch (this.type) {
            case 'spice':
                return 15;
            case 'mayonnaise':
                return 20;
        }
    }

    getCalories() {
        switch (this.type) {
            case 'spice':
                return 0;
            case 'mayonnaise':
                return 5;
        }
    }
}

class Stuffing {
    constructor(type) {
        this.type = type;
        this.price = this.getPrice();
        this.calories = this.getCalories();
    }

    getPrice() {
        switch (this.type) {
            case 'cheese':
                return 10;
            case 'salad':
                return 20;
            case 'potato':
                return 15;
        }
    }

    getCalories() {
        switch (this.type) {
            case 'cheese':
                return 20;
            case 'salad':
                return 5;
            case 'potato':
                return 10;
        }
    }
}