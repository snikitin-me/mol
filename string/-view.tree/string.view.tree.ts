namespace $ { export class $mol_string extends $mol_view {

	/// dom_name \input
	dom_name() {
		return "input"
	}

	/// enabled true
	enabled() {
		return true
	}

	/// disabled false
	disabled() {
		return false
	}

	/// value?val \
	@ $mol_mem()
	value( val? : any ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// value_changed?val <=> value?val
	@ $mol_mem()
	value_changed( val? : any ) {
		return this.value( val )
	}

	/// hint \
	hint() {
		return ""
	}

	/// type?val \text
	@ $mol_mem()
	type( val? : any ) {
		return ( val !== void 0 ) ? val : "text"
	}

	/// field * 
	/// 	^ 
	/// 	disabled <= disabled 
	/// 	value <= value_changed?val 
	/// 	placeholder <= hint 
	/// 	type <= type?val
	field() {
		return ({
			...super.field() ,
			"disabled" :  this.disabled() ,
			"value" :  this.value_changed() ,
			"placeholder" :  this.hint() ,
			"type" :  this.type() ,
		})
	}

	/// event_change?event null
	@ $mol_mem()
	event_change( event? : any ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event * 
	/// 	^ 
	/// 	input?event <=> event_change?event
	event() {
		return ({
			...super.event() ,
			"input" :  ( event? : any )=>  this.event_change( event ) ,
		})
	}

} }

