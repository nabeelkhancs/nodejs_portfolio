module.exports.dropdown = (array, name, option = '',required= '', selected_id='') =>{
	if(required != '')
		var required= 'required';
	else
		var required = ''
	var dropdown;
	dropdown = "<select class='form-control' name='"+name+"' id='"+name+"' "+required+"> ";
	
	if(option != '')
		var select = option;
	else 
		var select = 'Select Option';

	dropdown += "<option value=''>"+select+"</option>";

	for(let arr of array){

		if(selected_id != ''){
			if(selected_id.toString() == arr._id.toString()){
				selected = 'selected';
			}else{
				selected = '';
			}
		}else
			selected = '';
		dropdown += "<option value='"+arr._id+"' "+selected+"> "+arr.name+" </option>";
	}

	dropdown += "</select>";
	
	return dropdown;

}