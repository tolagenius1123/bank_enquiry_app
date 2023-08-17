const API_URL = "https://api.paystack.co/bank/";
const SECRET_KEY = "sk_test_75806f2bdf376dc2bf0fb314292c5b4707363461";

let form = document.querySelector("form");
let selectElement = document.getElementById("bankList");
let selectedValue = null;
let customerName = document.getElementById("customerName");

fetch(API_URL, {
	method: "GET",
	headers: {
		Authorization: `Bearer ${SECRET_KEY}`,
	},
})
	.then((response) => response.json())
	.then((data) => {
		// Handle the response data
		console.log(data.data);
		let banks = "";
		data.data.map((bank) => {
			return (banks += `<option value=${bank.code}>${bank.name}</option>`);
		});
		let bankList = document.getElementById("bankList");
		bankList.innerHTML = banks;
	})
	.catch((error) => {
		// Handle errors
		console.error("Error:", error);
	});

selectElement.addEventListener("change", function () {
	const selectedOption = selectElement.options[selectElement.selectedIndex];
	selectedValue = selectedOption.value;

	console.log("Selected Value:", selectedValue);
});

const getUserDetails = async (accountNo, code) => {
	await fetch(
		`https://api.paystack.co/bank/resolve?account_number=${accountNo}&bank_code=${code}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${SECRET_KEY}`,
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			// Handle the response data
			console.log(data);
			customerName.innerText = data.data.account_name;
		})
		.catch((error) => {
			// Handle errors
			console.error("Error:", error);
		});
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let accountNumber = document.getElementById("accountNumber").value;
	console.log(accountNumber);

	let button = document.querySelector("button");
	button.innerText = "Submitting...";
	getUserDetails(accountNumber, selectedValue);

	setTimeout(() => {
		button.innerText = "Submit";
		form.reset();
	}, 3000);
});
