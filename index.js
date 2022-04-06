function calculateBMI(weight, height){
    return weight / (height*height);
}

function calculateBMR(weight, height, ageOfUser, genderOfUser){
    const heightInCm = height*100;
    return genderOfUser=== "m"? 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50:
    10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
    
}

function calculateIdealWeight (height){
    return 22.5 * height *height;
}

function calculateDailyCalories(BMR,dailyExercise){
    return dailyExercise === "yes"? BMR * 1.6: BMR * 1.4;
}

function calculateDietWeeks (weightToLoseKg){
    return Math.abs(weightToLoseKg/0.5);
}

function calculateDietCalories(weightToLoseKg, dailyCalories){
    return weightToLoseKg > 0? dailyCalories-500: dailyCalories+500;
}

function validateNumberOfInputs(argv){
        if (argv.length !== 7){
        console.log(`You gave ${argv.length - 2} argument(s) to the program
  
    Please provide 5 arguments for
    
    weight (kg), 
    height (m), 
    age (years), 
    wether you exercise daily (yes or no)
    and your gender (m or f)
    
    Example:

    $ node index.js 82 1.79 32 yes m`);
     process.exit();
    }
}
 
function validateWeightHeightAndAge(weight, height, ageOfUser){
   if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
       console.log(`Please make sure weight, height and age are numbers`);
       process.exit();
   }
   if (ageOfUser<20){
       console.log(`This BMI calculator is designed for people over 20`);
       process.exit();
   }

   if (weight<30 || weight>300){
       console.log(`Please provide a number for weight in kilograms between 30 and 300
       weight (kg) example: 82`);
       process.exit();
   }
}

function validateDailyExercise(dailyExercise){
    if (dailyExercise!=="yes" && dailyExercise!=="no"){
        console.log(`Please specify if you exercise daily with "yes" or "no"
        whether you exercise daily (yes or no)`)
        process.exit();
    }
}

function validateGender(genderOfUser){
    if (genderOfUser!== "m" && genderOfUser!=="f"){
        console.log(`Gender: should be "m" or "f"`)
        process.exit()
    }

}

function formatOutput(userObject){
    return`
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${Math.round(userObject.weightInKg)} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${Math.round(userObject.BMI)}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${Math.round(userObject.weightInKg)} kg
    With a normal lifestyle you burn ${Math.round(userObject.dailyCalories)} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${Math.round(userObject.idealWeightKg)} kg:

    Eat ${Math.round(userObject.dietCalories)}  calories a day
    For ${Math.abs(Math.round(userObject.dietWeeks))} weeks`;
}

function bmiCalculator(){
    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateNumberOfInputs(process.argv);
    validateWeightHeightAndAge(weightInKg,heightInM,age);
    validateDailyExercise(dailyExercise);
    validateGender(gender);


    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const idealWeight = calculateIdealWeight(heightInM);
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
    const weightToLoseKg = weightInKg - idealWeight;
    const dietWeeks = calculateDietWeeks (weightToLoseKg);
    const dietCalories = calculateDietCalories(weightToLoseKg, dailyCalories);
     const user ={
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeightKg: idealWeight,
        dailyCalories: dailyCalories,
        weightToLoseKg: weightToLoseKg,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories,
     };
     const output =formatOutput(user);
     console.log(output);


}
bmiCalculator()