namespace $ { export class $mol_string_demo extends $mol_row {

	/// title @ \String input field in various states
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// name?val \
	@ $mol_mem()
	name( val? : any ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Simple $mol_string value?val <=> name?val
	@ $mol_mem()
	Simple() {
		return new $mol_string().setup( obj => { 
			obj.value = ( val? : any ) => this.name( val )
		} )
	}

	/// Hint $mol_string 
	/// 	hint @ \Batman
	/// 	value?val <=> name?val
	@ $mol_mem()
	Hint() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => $mol_locale.text( this.locale_contexts() , "Hint" )
			obj.value = ( val? : any ) => this.name( val )
		} )
	}

	/// name2?val \Jocker
	@ $mol_mem()
	name2( val? : any ) {
		return ( val !== void 0 ) ? val : "Jocker"
	}

	/// Filled $mol_string value?val <=> name2?val
	@ $mol_mem()
	Filled() {
		return new $mol_string().setup( obj => { 
			obj.value = ( val? : any ) => this.name2( val )
		} )
	}

	/// Disabled $mol_string 
	/// 	disabled true 
	/// 	value?val <=> name2?val
	@ $mol_mem()
	Disabled() {
		return new $mol_string().setup( obj => { 
			obj.disabled = () => true
			obj.value = ( val? : any ) => this.name2( val )
		} )
	}

	/// sub / 
	/// 	<= Simple 
	/// 	<= Hint 
	/// 	<= Filled 
	/// 	<= Disabled
	sub() {
		return [].concat( this.Simple() , this.Hint() , this.Filled() , this.Disabled() )
	}

} }

