import { addPersonCRM, setFormTicket } from "./ajax";

let reqForm;

export async function requestCrmUserData(json) {
	let name = json["first_name"] === undefined ? "" : json["first_name"],
		phone = json["phone"] === undefined ? "" : json["phone"],
		email = json["email"] === undefined ? "" : json["email"],
		points_amount = json["points_amount"] === undefined ? "" : json["points_amount"],
		type_of_program = json["type_of_program_pipedrive"] === undefined ? "" : json["type_of_program_pipedrive"];
	name += json["last_name"] === undefined ? "" : " " + json["last_name"];
	// data for adding a lead
	reqForm = {
		//статичные
		title: name + " (website)",
		owner_id: 20580979,
		"957b07223a08444eea7d2b54052850d3d3d81522": email,
	};
	if (phone != "") {
		reqForm["31559b4d1b62a55c3cd3d31fdd4749946019ebbd"] = phone;
	}
	if (name != "") {
		reqForm["4bb2da9192ebd999d3fa40d96158960a10225267"] = name;
	}
	if (type_of_program != "") {
		reqForm["070b236038f170aee360b08eb62f9af4e5206a36"] = type_of_program;
	}
	if (points_amount != "") {
		reqForm["e3fa20378e1f66129d8ed61a7dec468397ac021c"] = points_amount.replace(/,/g, '');;
	}
	let reqAddPerson = JSON.stringify({
		name: name,
		owner_id: 20580979,
		org_id: null,
		email: [
			{
				value: email,
			},
		],
		phone: [
			{
				value: phone === undefined ? "" : phone,
			},
		],
	});

	await addPersonCRM(reqAddPerson);
}

export async function sendReqSetForm(id) {
	reqForm.person_id = id;
	await setFormTicket(JSON.stringify(reqForm));
}

//SF adding leads
//Sales Force API
export async function addLeadToSalesForce(json) {
	json["formtype"] = "lead";
	json["utmSource"] =
		localStorage.getItem("utm_source") != "undefined" ? localStorage.getItem("utm_source") : "organic";
	json["utm_medium"] = localStorage.getItem("utm_medium") != "undefined" ? localStorage.getItem("utm_medium") : "";

	json["utm_campaign"] =
		localStorage.getItem("utm_campaign") != "undefined" ? localStorage.getItem("utm_campaign") : "";
	json["utm_content"] = localStorage.getItem("utm_content") != "undefined" ? localStorage.getItem("utm_content") : "";
	json["utm_term"] = localStorage.getItem("utm_term") != "undefined" ? localStorage.getItem("utm_term") : "";
	await fetch(`https://flyer-club.com/flightbooking/salesforce_auth.php`, {
		//https://flyer-club.com/
		method: "POST",
		body: JSON.stringify(json),
	})
		.then(async (response) => {
			console.log("🚀 ~ .then ~ response:", response)
			//location.href = "../thankyouorder/";
		})
		.catch(async (error) => {
			console.log("🚀 ~ addLeadToSalesForce ~ error:", error)
			//location.href = "../thankyouorder/";
		});
}
