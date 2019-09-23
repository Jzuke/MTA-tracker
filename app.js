const Mta = require('mta-gtfs');
// const { execFile } = require('child_process')
const moment = require('moment')
let mta = new Mta({
  key: 'YOUR_MTA_KEY', 
  feed_id: 1
});

setInterval(() => {
mta.schedule('G26', 31).then(function (result) {
	
	const northG = moment.unix((result.schedule.G26.N[0].arrivalTime)).toNow('mm')
	const northGtwo = moment.unix((result.schedule.G26.N[1].arrivalTime)).toNow('mm')
	let number = northG.split(' ')
	if(northG === "a few seconds"){
		number = 1
	}
	number = number[0]
	
	const imageChange = execFile('sudo', ['./led-image-viewer', `MTA-tracker/Gtrain_${number[0]}`]['--led-rows=16', '--led-chain=2'], () => {
		if(error){
			throw error;
		}
	})

})
}, 1000)


