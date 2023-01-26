
function longestCommonSubs(X, Y, m, n ){
     
    var stuff = Array(m+1).fill().map(()=>Array(n+1).fill(0));

    var result = 0;

    for( i=0; i<=m; i++){
        for( j=0; j<=n; j++){
            if(i==0 || j==0){
                stuff[i][j] = 0;
            }else if( X[i-1] == Y[j-1] ){
                stuff[i][j]  =  stuff[i-1][j-1] + 1;
                result = Math.max(result, stuff[i][j])
            }else{
                stuff[i][j] = 0;
            }
        }

    }
    return result;
}


var X = "GAURAV"
var Y = "GAURAVAGARWAL"

var m = X.length;
var n = Y.length;

console.log(longestCommonSubs(X, Y, m, n))
// longestCommonSubs(X, Y, m, n)