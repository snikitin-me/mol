namespace $ { export class $mol_app_inventory_enter extends $mol_view {

	/// domain $mol_app_inventory_domain
	@ $mol_mem()
	domain() {
		return new $mol_app_inventory_domain()
	}

	/// entered?val false
	@ $mol_mem()
	entered( val? : any ) {
		return ( val !== void 0 ) ? val : false
	}

	/// loginLabel @ \User name
	loginLabel() {
		return $mol_locale.text( this.locale_contexts() , "loginLabel" )
	}

	/// loginErrors /
	loginErrors() {
		return [] as any[]
	}

	/// login?val \
	@ $mol_mem()
	login( val? : any ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// loginControl $mol_string value?val <=> login?val
	@ $mol_mem()
	loginControl() {
		return new $mol_string().setup( obj => { 
			obj.value = ( val? : any ) => this.login( val )
		} )
	}

	/// loginField $mol_form_field 
	/// 	name <= loginLabel 
	/// 	errors <= loginErrors 
	/// 	control <= loginControl
	@ $mol_mem()
	loginField() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.loginLabel()
			obj.errors = () => this.loginErrors()
			obj.control = () => this.loginControl()
		} )
	}

	/// passwordLabel @ \Pass word
	passwordLabel() {
		return $mol_locale.text( this.locale_contexts() , "passwordLabel" )
	}

	/// passwordErrors /
	passwordErrors() {
		return [] as any[]
	}

	/// password?val \
	@ $mol_mem()
	password( val? : any ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// passControl $mol_string 
	/// 	value?val <=> password?val 
	/// 	type \password
	@ $mol_mem()
	passControl() {
		return new $mol_string().setup( obj => { 
			obj.value = ( val? : any ) => this.password( val )
			obj.type = () => "password"
		} )
	}

	/// passwordField $mol_form_field 
	/// 	name <= passwordLabel 
	/// 	errors <= passwordErrors 
	/// 	control <= passControl
	@ $mol_mem()
	passwordField() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.passwordLabel()
			obj.errors = () => this.passwordErrors()
			obj.control = () => this.passControl()
		} )
	}

	/// submitLabel @ \Log in
	submitLabel() {
		return $mol_locale.text( this.locale_contexts() , "submitLabel" )
	}

	/// event_submit?event null
	@ $mol_mem()
	event_submit( event? : any ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// submit_blocked false
	submit_blocked() {
		return false
	}

	/// submit $mol_button_major 
	/// 	sub / <= submitLabel 
	/// 	event_click?event <=> event_submit?event 
	/// 	disabled <= submit_blocked
	@ $mol_mem()
	submit() {
		return new $mol_button_major().setup( obj => { 
			obj.sub = () => [].concat( this.submitLabel() )
			obj.event_click = ( event? : any ) => this.event_submit( event )
			obj.disabled = () => this.submit_blocked()
		} )
	}

	/// form $mol_form 
	/// 	form_fields / 
	/// 		<= loginField 
	/// 		<= passwordField 
	/// 	buttons / <= submit
	@ $mol_mem()
	form() {
		return new $mol_form().setup( obj => { 
			obj.form_fields = () => [].concat( this.loginField() , this.passwordField() )
			obj.buttons = () => [].concat( this.submit() )
		} )
	}

	/// message \
	message() {
		return ""
	}

	/// sub / 
	/// 	<= form 
	/// 	<= message
	sub() {
		return [].concat( this.form() , this.message() )
	}

	/// messageNoAccess @ \Access denied
	messageNoAccess() {
		return $mol_locale.text( this.locale_contexts() , "messageNoAccess" )
	}

} }
