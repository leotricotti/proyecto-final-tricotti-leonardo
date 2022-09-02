// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f',
// 		'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
// 	}
// };

// fetch('https://google-finance4.p.rapidapi.com/search/?q=nasdaq&hl=en&gl=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response[1].price.previous_close))
// 	.catch(err => console.error(err));

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f',
// 		'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
// 	}
// };

// fetch('https://google-finance4.p.rapidapi.com/search/?q=ftse&hl=en&gl=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f',
		'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
	}
};

fetch('https://google-finance4.p.rapidapi.com/search/?q=nikkei&hl=en&gl=US', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));