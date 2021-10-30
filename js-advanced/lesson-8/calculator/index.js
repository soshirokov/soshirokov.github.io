function addition(a, b) {
    if (!inspect(a, b)) {
        return null;
    }
    return a + b;
}

function subtraction(a, b) {
    if (!inspect(a, b)) {
        return null;
    }
    return a - b;
}

function multiplication(a, b) {
    if (!inspect(a, b)) {
        return null;
    }
    return a * b;
}

function division(a, b) {
    if (!inspect(a, b)) {
        return null;
    }
    return a / b;
}

function inspect(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return false;
    }
    return true;
}

module.exports = {
    addition,
    subtraction,
    multiplication,
    division
}