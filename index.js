let csvtojson = require('csvtojson')

async function start(file, testArr, k) {
    //Convert csv to array
    let csvArr = await csvtojson({ output: "line" }).fromFile(file)

    let data = []
    for (let i = 0; i < csvArr.length; i++) {
        let temp = csvArr[i].split(";")
        data.push(temp)
    }

    //Get Euclidean Distance
    let resultDistances = []
    let distance = 0
    for (let i = 0; i < csvArr.length; i++) {
        let resultDistance = {
            index : i
        }        

        distance = Math.sqrt( (Math.pow( parseFloat(data[i][0]) - parseFloat(testArr[0]), 2)) + (Math.pow( parseFloat(data[i][1]) - parseFloat(testArr[1]), 2)) + (Math.pow( parseFloat(data[i][2]) - parseFloat(testArr[2]), 2)) + (Math.pow( parseFloat(data[i][3]) - parseFloat(testArr[3]), 2)) + (Math.pow( parseFloat(data[i][4]) - parseFloat(testArr[4]), 2)), 2)
        resultDistance.distance = distance
        resultDistances.push(resultDistance)
    }
    
    //Sort result by distance
    resultDistances = resultDistances.sort((a, b) => a.distance - b.distance )

    //Retrieve amount of data (K)
    resultDistances = resultDistances.slice(0, k)

    //Count result
    let yes = 0
    let no = 0
    for (let i = 0; i < resultDistances.length; i++) {
        data[resultDistances[i].index][6] == 1 ? yes++ : no++
    }

    //Show the result
    yes > no ? console.log("Cured") : console.log("Not Cured");
}

//file.csv || array test data || K

//array index 0 = gender
//array index 1 = age
//array index 2 = time //month
//array index 3 = number of warts
//array index 4 = type of warts
//array index 5 = area of warts
start('./data.csv', [1, 35, 7, 10, 2, 60], 5)