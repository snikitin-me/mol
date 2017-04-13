namespace $ { export class $mol_switch_demo extends $mol_row {

	/// title @ \Color switchers in various state
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// color?val \red
	@ $mol_mem()
	color( val? : any ) {
		return ( val !== void 0 ) ? val : "red"
	}

	/// option_red @ \Red
	option_red() {
		return $mol_locale.text( this.locale_contexts() , "option_red" )
	}

	/// option_green @ \Green
	option_green() {
		return $mol_locale.text( this.locale_contexts() , "option_green" )
	}

	/// option_blue @ \Blue
	option_blue() {
		return $mol_locale.text( this.locale_contexts() , "option_blue" )
	}

	/// Enabled $mol_switch 
	/// 	value?val <=> color?val 
	/// 	options * 
	/// 		red <= option_red 
	/// 		green <= option_green 
	/// 		blue <= option_blue
	@ $mol_mem()
	Enabled() {
		return new $mol_switch().setup( obj => { 
			obj.value = ( val? : any ) => this.color( val )
			obj.options = () => ({
			"red" :  this.option_red() ,
			"green" :  this.option_green() ,
			"blue" :  this.option_blue() ,
		})
		} )
	}

	/// Disabled $mol_switch 
	/// 	value?val <=> color?val 
	/// 	enabled false 
	/// 	options * 
	/// 		red <= option_red 
	/// 		green <= option_green 
	/// 		blue <= option_blue
	@ $mol_mem()
	Disabled() {
		return new $mol_switch().setup( obj => { 
			obj.value = ( val? : any ) => this.color( val )
			obj.enabled = () => false
			obj.options = () => ({
			"red" :  this.option_red() ,
			"green" :  this.option_green() ,
			"blue" :  this.option_blue() ,
		})
		} )
	}

	/// sub / 
	/// 	<= Enabled 
	/// 	<= Disabled
	sub() {
		return [].concat( this.Enabled() , this.Disabled() )
	}

} }

