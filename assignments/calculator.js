function calculator(num1, num2, operator){
    var num1 = Number(num1);
    var num2 = Number(num2);
    switch (operator) {
        case 'topla':            
            return num1 + num2;
        case 'cikart':            
            return num1 - num2;
        case 'bol':            
            return num1 / num2;
        case 'carp':            
            return num1 * num2;
        case 'yuzde':                     
            return num1 % num2; ;
    
        default:
            return 'Invalit operator!';
    }
}


module.exports = {
    calculator
}