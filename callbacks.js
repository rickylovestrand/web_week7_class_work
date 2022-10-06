let animals = ['Giraffe', 'Elephant', 'Yak']

animals.forEach(function(animal, yum){
    console.log(animal, yum)
})

animals.forEach((animal, index) => {
    console.log(animal, index)
})

animals.forEach(function(animal){
    console.log(animal)
})

animals.forEach(animal=>console.log(animal))