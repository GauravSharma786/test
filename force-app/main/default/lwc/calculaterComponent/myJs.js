export function additionNumber(num1 , num2 , operator){
    let res;
  switch (operator)
  {
        case "+" : res= num1 + num2; break;
        case "*" : res= num1 * num2; break;
        case "-" : res= num1 - num2; break;
        case "/" : res= num1 / num2; break;
        case "%" : res= num1 % num2; break; 
    }
    return res;
}