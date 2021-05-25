import { useState } from "react";

export default function useForm(initial = {}) {
	const [inputs, setInputs] = useState(initial);

	const handleChange = (e) =>{
		let { value, name, type } = e.target;

		if (type === "number") {
			value = parseInt(value);
		}

		if (type === "file") {
			const file = e.target.files;
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				[value] = reader.result;
			};
		}
		
		setInputs({
			...inputs,
			[name]: value
		});
	}

	const resetForms= () =>{
		setInputs(initial);
	}

	const clearForm = () =>{
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, value]) => [key, ""])
		);
		setInputs(blankState);
	}

	return {
		inputs,
		setInputs,
		handleChange,
		resetForms,
		clearForm
	};
}
