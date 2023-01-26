
let arr = [1, 2, 3, 4, 5];
let target = 12;

console.log(NumberForTarget(arr, target))

function NumberForTarget(arr, target){
    let ans= new Array(2);
    
    for(let i=0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
            if(arr[i] + arr[j] == target){
                ans[0] = arr[i];
                ans[1] = arr[j];
                return ans;
            }else{
            }
        }
    }
    return -1;
}

