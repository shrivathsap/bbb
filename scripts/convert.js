plaintext = "";
ciphertext = "";
small = "abcdefghijklmnopqrstuvwxyz";
encrypt_bool = true;
list_of_ciphers = ['Caesar', 'Atbash', 'Alpha numeric'];
cipher = '';

function mod(n, m) {
  return ((n % m) + m) % m;
}

function find_index(list, value){
	for(let i=0; i<list.length; i++){//let keyword to restrict scope of i, without let this i interferes
									//with any i in other functions/loops that calls find_index
		if(list[i]==value){
			return i;
		}
	}
	return 'not found';
}

function get_plain_text(){
	plaintext = document.getElementById('plaintext').value;
	return plaintext;
}

function get_cipher_text(){
	ciphertext = document.getElementById('ciphertext').value;
	return ciphertext;
}

function put_plain_text(text){
	document.getElementById('plaintext').value = text;
}

function put_cipher_text(text){
	document.getElementById('ciphertext').value = text;
}

function setcipher() {
	var cipher_list = document.getElementById("cipher_list");
	cipher = find_index(list_of_ciphers, cipher_list.options[cipher_list.selectedIndex].text);
}

function caesar(text, shift=3){
	return_string = '';
	if(encrypt_bool) shift = shift;
	else shift = -shift;
	for(let i=0; i<text.length; i++){
		char = text[i];
		index = find_index(small, char.toLowerCase());
		if(index == 'not found') return_string += char;
		else{
			new_char_index = mod(index+shift, small.length);
			if (char == char.toUpperCase()){
				return_string += small[new_char_index].toUpperCase();
			}
			else {
				return_string += small[new_char_index];
			}
		}
	}
	return return_string;
}

function atbash(text){
	return_string = '';
	for(let i=0; i<text.length; i++){
		char = text[i];
		index = find_index(small, char.toLowerCase());
		if(index == 'not found') return_string += char;
		else{
			new_char_index = mod(-1-index, small.length);
			if (char == char.toUpperCase()){
				return_string += small[new_char_index].toUpperCase();
			}
			else {
				return_string += small[new_char_index];
			}
		}
	}
	return return_string;
}

function alpha_numeric(text){
	return_string = '';
	if(encrypt_bool){
		for(let i=0; i<text.length; i++){
			char = text[i];
			index = find_index(small, char.toLowerCase());
			if(index == 'not found') return_string += char;
			else return_string += ' '+(index+1)//mAgIc Of JaVaScRiPt
		}
	}
	else{
		split_space = text.split(' ');
		for(let i=0; i<split_space.length; i++){
			if(small[split_space[i]-1]) return_string += small[split_space[i]-1];
			else return_string += split_space[i];
		}
	}

	return return_string;
}

function convert(){
	setcipher();
	potential_plain = get_plain_text();
	potential_cipher = get_cipher_text();
	if(potential_plain == ''){
		encrypt_bool=false;
		to_convert = potential_cipher;
	}
	else{
		to_convert = potential_plain;
	}
	switch (cipher){
		case 0:
			converted = caesar(to_convert);
			break;
		case 1:
			converted = atbash(to_convert);
			break;
		case 2:
			converted = alpha_numeric(to_convert);
			break;
	}
	// converted = atbash(to_convert);
	if(encrypt_bool) put_cipher_text(converted);
	else put_plain_text(converted);
}
