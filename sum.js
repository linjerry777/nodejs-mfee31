

function sum(num) {
    let total = 0;
    if (num < 0) {
        for (let i = 0; i >= num; i--) {
            total += i;
            
        }
        return total;
    } else {
        for (let i = 0; i <= num; i++) {
            total += i;
            

        }
        return total;
    }

    
}

console.log(sum(-10))
console.log(sum(0))
console.log(sum(10))






