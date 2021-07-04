
export const calculateAmountOfNutrient = (amount, modifier) => {
    return roundNutrientAmount(amount/100*modifier, 10) //calculates amount of nutrient based on calculator value and rounds it to two decimals
}



export const roundNutrientAmount = (amount, modifier) => {
    const roundedAmount = Math.round((amount)*modifier) / modifier;
    if(roundedAmount < 0){
        return 0
    }else{
        return roundedAmount
    }

}
