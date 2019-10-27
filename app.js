const Mta = require('mta-gtfs');
const exec = require('child_process').exec
const moment = require('moment')
let mta = new Mta({
  key: 'YOUR_MTA_KEY', 
  feed_id: 1
});

// setInterval(() => {
// mta.schedule('G26', 31).then(function (result) {
	
// 	const northG = moment.unix((result.schedule.G26.N[0].arrivalTime)).toNow('mm')
// 	const northGtwo = moment.unix((result.schedule.G26.N[1].arrivalTime)).toNow('mm')
// 	let number = northG.split(' ')
// 	if(northG === "a few seconds"){
// 		number = 1
// 	}
// 	number = number[0]
	
// 	const imageChange = execFile('sudo', ['./led-image-viewer', `MTA-tracker/Gtrain_${number[0]}`]['--led-rows=16', '--led-chain=2'], () => {
// 		if(error){
// 			throw error;
// 		}
// 	})

// })
// }, 1000)

setInterval(() => {
	mta.schedule('G26', 31).then(function (result) {
			
		const northG = moment.unix((result.schedule.G26.N[0].arrivalTime)).toNow('mm')
		const northGtwo = moment.unix((result.schedule.G26.N[1].arrivalTime)).toNow('mm')
		let number
		let numberTwo
		number = northG.split(' ')
		numberTwo = northGtwo.split(' ')
		number = number[0]
		numberTwo = numberTwo[0]
		if(number === "a"){  // if number is less than 1 it returns the string "a few seconds"
			number = 1
		}
		if(numberTwo === "a"){  // if number is less than 1 it returns the string "a few seconds"
			numberTwo = 1
		}

		const child = exec(`sh train1_shellscripts/train${number}.sh`,
				(error, stdout, stderr) => {
					console.log(stdout)
					console.log(stderr)
					if(error !== null) {
					console.log(`exect error: ${error}`)
					}
				})

		setTimeout(() => { 
			const child2 = exec(`sh train2_shellscripts/train${number}.sh`,
				(error, stdout, stderr) => {
					console.log(stdout)
					console.log(stderr)
					if(error !== null) {
					console.log(`exect error: ${error}`)
				}
		})
	}, 14005)
	})
	}, 28500)