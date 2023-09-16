const FetchData = async (props) => {
	axios
		.post(
			`https://api.airtable.com/v0/${baseId}/${tableIdOrName}/listRecords`,
			{
				view: 'grid',
				filterByFormula: `{lganame} = "${props}"`,
			},
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
			}
		)
		.then((response) => {
			var theresponse = JSON.parse(response.request.response);
			var finalres = theresponse.records[0].fields;
			setResponseData(finalres);
			setShowMore(true);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
};

export default FetchData;
