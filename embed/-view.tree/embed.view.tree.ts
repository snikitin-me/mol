namespace $ { export class $mol_embed extends $mol_view {

	/// dom_name \object
	dom_name() {
		return "object"
	}

	/// uri \
	uri() {
		return ""
	}

	/// mime \
	mime() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	data <= uri 
	/// 	type <= mime
	attr() {
		return ({
			...super.attr() ,
			"data" :  this.uri() ,
			"type" :  this.mime() ,
		})
	}

} }

