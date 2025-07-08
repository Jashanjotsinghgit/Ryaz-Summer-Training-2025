let input = document.querySelector("#board__input");
let buttons = document.querySelectorAll(".board__btn");
let operations = ['+','-','x','/','%'];
function calculate(expression){
    let expr = expression.replaceAll('x','*');
    input.value = eval(expr);
}
buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        let btnText = btn.innerText;
        if(btnText !== ''){
            if( btnText === 'C')
                input.value = ''
            else 
                input.value+= btnText;
        }
        else{
            let  btnValue = btn.value;
            if(btnValue === '=')
                calculate(input.value)

            else if(btnValue === 'del'){
               input.value = input.value.slice(0,-1); 
            }
            else if(operations.includes(btnValue)){
                let lastIndex = input.value.length-1;
                if(operations.includes(input.value[lastIndex])){
                    input.value = input.value.slice(0,-1);
                    input.value += btnValue;
                }
                else{
                     input.value+=btnValue;
                }
            }
            else
                input.value+=btnValue;
        }
        
    })
})
