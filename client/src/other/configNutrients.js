import { trackedNutrients } from './configs'
import { roundNutrientAmount } from './nutrientCalculations'
import _ from 'lodash'

export default (nutrients) => {

    const acceptedCorrectlyLabeledNutrients = [];

    const completeNutrients = _.concat(
        _.differenceBy(Object.values(trackedNutrients), nutrients, _.property('name')),
        nutrients
        )    

    for (let nutrient of completeNutrients) {

        if (trackedNutrients[nutrient.name]) {

            if (!nutrient.unitName) {
                
                nutrient = { ...nutrient, unitName: trackedNutrients[nutrient.name].unitName }

                acceptedCorrectlyLabeledNutrients.push({
                    ...nutrient,
                    ...trackedNutrients[nutrient.name],
                    ['amount']: nutrient.amount ? roundNutrientAmount(nutrient.amount, 10) : 0
                })
                
            }else if (trackedNutrients[nutrient.name].unitName === nutrient.unitName) {

                acceptedCorrectlyLabeledNutrients.push({
                    ...nutrient,
                    ...trackedNutrients[nutrient.name],
                    ['amount']: nutrient.amount ? roundNutrientAmount(nutrient.amount, 10) : 0
                })
                
            }
        }
    }

    return acceptedCorrectlyLabeledNutrients;
}