function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here

    function brackets(array) {
        var j;
        var n;
        var lengArray=array.length;
        for (var i=0;i<lengArray;i++){
            if (array[i]===')'){
                var k=0;
                j=i;
                while (array[j]!=="("){
                    j--;
                    if (array[j]!=='('){
                        k++;
                    }
                }
                var newArr=array.slice([i-k], [i]);
                var r=i-k;
                n=count(newArr);
                array.splice(r-1, k+2, n[0]);
                arrayLeng = array.length;
                break;
            }
        }
        return(array);
    }

    function count(array) {
        var lengArray=array.length;
        var simbols={
            "+":1,
            "-":1,
            "*":2,
            "/":2,
            "(":3,
            ')':3
        };
        var lastSimbol;
        var lastNumber;

        var numbersArray=[];
        var numbersLeng;
        var simbolsLeng;
        var simbolsArray=[];
        var c;

        for (i=0;i<array.length;i++){
            if ((array[i]==='-')&&(array[i+1]!=='(')&&(array[i+1]!==')')){
                array[i]='+';
                array[i+1]=array[i+1]*(-1);
            }
        }

        for (i=0;i<array.length;i++){
            if (array[i]==='/'){
                array[i]='*';
                array[i+1]=1/array[i+1];
            }
        }

        for (i=0;i<lengArray;i++){
            if (typeof array[i]==="number"){
                numbersArray.push(array[i]);
                numbersLeng=numbersArray.length;
                lastNumber=array[i];
            }
            if (typeof array[i]!=="number"){
                if ((array[i]>=lastSimbol)&&(lastSimbol!==undefined)){
                    switch (lastSimbol) {
                        case '-':
                            c=numbersArray[numbersLeng-2]-numbersArray[numbersLeng-1];
                            break;
                        case '+':
                            c=numbersArray[numbersLeng-2]+numbersArray[numbersLeng-1];
                            break;
                        case '*':
                            c=numbersArray[numbersLeng-2]*numbersArray[numbersLeng-1];
                            break;
                        case '/':
                            c=numbersArray[numbersLeng-2]/numbersArray[numbersLeng-1];
                            break;
                    }
                    numbersArray.splice(numbersLeng-2,2, c);
                    simbolsArray.splice(simbolsLeng-1,2);
                }
                simbolsArray.push(array[i]);
                simbolsLeng=simbolsArray.length;
                lastSimbol=array[i];
            }
        }

        //console.log('__________');
        i=simbolsArray.length-1;
        j=numbersArray.length-1;

        var s;
        var ch;
        for (i=numbersArray.length-1;i>=0;i--){
            j=i-1;

            ch=numbersArray[i];
            if (i>0){
                s=simbolsArray[j];
                switch (s) {
                    case '-':
                        c=numbersArray[numbersArray.length-2]-numbersArray[numbersArray.length-1];
                        break;
                    case '+':
                        c=numbersArray[numbersArray.length-2]+numbersArray[numbersArray.length-1];
                        break;
                    case '*':
                        c=numbersArray[numbersArray.length-2]*numbersArray[numbersArray.length-1];
                        break;
                    case '/':
                        c=numbersArray[numbersArray.length-2]/numbersArray[numbersArray.length-1];
                        break;
                }
                // console.log(numbersArray);
                numbersArray.splice(numbersArray.length-2,2, c);

            }


        }

        return(numbersArray);
    }

    function bugCheck(array) {
        answer='good!';
        for (i=0;i<array.length;i++){
            if ((array[i]==='/')&&(array[i+1]==='0')){
                throw "TypeError: Division by zero."
            }
        }
        return(answer)
    }



    var a=expr;
    var array=[];
    for (i=0;i<a.length;i++){
        if (a[i]!==' '){
            array.push(a[i])
        }

    }

    var err=0;
    var totalBr=0;
    var openBr=0;
    var closeBr=0;
    for (i=0;i<array.length;i++){
        if ((array[i]==='/')&&(array[i+1]==='0')){
            throw new Error("TypeError: Division by zero.");

        }



        for (j=0;j<array.length;j++){

            if (array[j]==="("){
                openBr++;
            }
            if (array[j]===")"){
                closeBr--;
            }
            totalBr=openBr+closeBr;
            if (totalBr<0){
                throw new Error("ExpressionError: Brackets must be paired");
            }

        }

        if (totalBr!==0){
            throw new Error("ExpressionError: Brackets must be paired");
        }
    }


    if (err===0){
        var n;
        var arrayLeng = array.length;
        l=arrayLeng-1;
        while (l>=0){
            if ((array[l]!=='+')&&(array[l]!=='-')&&(array[l]!=='*')&&(array[l]!=='/')&&(array[l]!=='(')&&(array[l]!==')')&&
                (array[l+1]!=='+')&&(array[l+1]!=='-')&&(array[l+1]!=='*')&&(array[l+1]!=='/')&&(array[l+1]!=='(')&&(array[l+1]!==')')&&(array[l+1]!==undefined)){
                n=array[l]+array[l+1];
                array.splice(l, 2, n);
                arrayLeng = array.length;

            }
            l--
        }
        for (i=0;i<arrayLeng;i++){
            if((array[i]!=='+')&&(array[i]!=='-')&&(array[i]!=='*')&&(array[i]!=='/')&&(array[i]!=='(')&&(array[i]!==')')){
                array[i]=array[i]*1;
            }

        }
        for (i=0;i<array.length;i++){
            if (array[i]===')'){
                array=brackets(array)
            }
        }
        answer=count(array)[0];


    }




    return(answer);

}

module.exports = {
    expressionCalculator
}