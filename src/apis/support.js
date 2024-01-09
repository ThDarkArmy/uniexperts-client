import APICaller from "APICaller";

export const getCases = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/case", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getCasesDetails = caseId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/case/${caseId}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addComment = ({ caseId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/case/${caseId}/comment`, method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getCaseTypes = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/case-types", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getCaseSubTypes = type =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/case-subtype", method: "GET", params: { type } })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const createCase = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/case", method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getFAQ = (query = "") =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/faq", method: "GET", params: { query } })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
