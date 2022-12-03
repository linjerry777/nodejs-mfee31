

function sum(num) {
    let sum = 0;
    if(num<0){
        for (let i = 0; i >= num; i--) {
            sum += i;
    
        }
    }else{
        for (let i = 0; i <= num; i++) {
            sum += i;
    
        }
    }
   
    console.log(sum)
}


sum(-10)
sum(10)


