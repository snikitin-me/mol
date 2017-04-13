namespace $ { export class $mol_app_demo extends $mol_book {

	/// title @ \$mol demonstrations
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Placeholder $mol_book_placeholder title <= title
	@ $mol_mem()
	Placeholder() {
		return new $mol_book_placeholder().setup( obj => { 
			obj.title = () => this.title()
		} )
	}

	/// filter_hint @ \Search demo...
	filter_hint() {
		return $mol_locale.text( this.locale_contexts() , "filter_hint" )
	}

	/// filter_string?val \
	@ $mol_mem()
	filter_string( val? : any ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Filter_string $mol_search 
	/// 	hint <= filter_hint 
	/// 	query?val <=> filter_string?val
	@ $mol_mem()
	Filter_string() {
		return new $mol_search().setup( obj => { 
			obj.hint = () => this.filter_hint()
			obj.query = ( val? : any ) => this.filter_string( val )
		} )
	}

	/// Nav_head $mol_row sub / <= Filter_string
	@ $mol_mem()
	Nav_head() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Filter_string() )
		} )
	}

	/// nav_hierarchy null
	nav_hierarchy() {
		return <any> null
	}

	/// nav_option!id null
	nav_option( id : any ) {
		return <any> null
	}

	/// Nav $mol_app_demo_nav 
	/// 	hierarchy <= nav_hierarchy 
	/// 	record!id <= nav_option!id 
	/// 	needle <= filter_string?val
	@ $mol_mem()
	Nav() {
		return new $mol_app_demo_nav().setup( obj => { 
			obj.hierarchy = () => this.nav_hierarchy()
			obj.record = ( id : any ) => this.nav_option(id)
			obj.needle = () => this.filter_string()
		} )
	}

	/// Menu $mol_page 
	/// 	minimal_width 200 
	/// 	head / <= Nav_head 
	/// 	Body <= Nav
	@ $mol_mem()
	Menu() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 200
			obj.head = () => [].concat( this.Nav_head() )
			obj.Body = () => this.Nav()
		} )
	}

	/// main_content /
	main_content() {
		return [] as any[]
	}

	/// Detail $mol_app_demo_page 
	/// 	minimal_width 600 
	/// 	title <= title 
	/// 	body <= main_content
	@ $mol_mem()
	Detail() {
		return new $mol_app_demo_page().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.title()
			obj.body = () => this.main_content()
		} )
	}

	/// blocks / 
	/// 	<= Menu 
	/// 	<= Detail
	blocks() {
		return [].concat( this.Menu() , this.Detail() )
	}

	/// pages <= blocks
	pages() {
		return this.blocks()
	}

	/// welcome_text \
	welcome_text() {
		return ""
	}

	/// Welcome_text $mol_text text <= welcome_text
	@ $mol_mem()
	Welcome_text() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.welcome_text()
		} )
	}

	/// Welcome $mol_scroll sub / <= Welcome_text
	@ $mol_mem()
	Welcome() {
		return new $mol_scroll().setup( obj => { 
			obj.sub = () => [].concat( this.Welcome_text() )
		} )
	}

	/// Samples /
	Samples() {
		return [] as any[]
	}

	/// Detail_row $mol_row sub / <= Samples
	@ $mol_mem()
	Detail_row() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Samples() )
		} )
	}

	/// detail_empty_prefix @ \No one demo with prefix "
	detail_empty_prefix() {
		return $mol_locale.text( this.locale_contexts() , "detail_empty_prefix" )
	}

	/// selected \
	selected() {
		return ""
	}

	/// detail_empty_postfix @ \"
	detail_empty_postfix() {
		return $mol_locale.text( this.locale_contexts() , "detail_empty_postfix" )
	}

	/// Detail_empty_message $mol_status sub / 
	/// 	<= detail_empty_prefix 
	/// 	<= selected 
	/// 	<= detail_empty_postfix
	@ $mol_mem()
	Detail_empty_message() {
		return new $mol_status().setup( obj => { 
			obj.sub = () => [].concat( this.detail_empty_prefix() , this.selected() , this.detail_empty_postfix() )
		} )
	}

} }

namespace $ { export class $mol_app_demo_page extends $mol_page {

	/// Close_icon $mol_icon_cross
	@ $mol_mem()
	Close_icon() {
		return new $mol_icon_cross()
	}

	/// close_arg * demo null
	close_arg() {
		return ({
			"demo" :  <any> null ,
		})
	}

	/// Close $mol_link 
	/// 	sub / <= Close_icon 
	/// 	arg <= close_arg
	@ $mol_mem()
	Close() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.Close_icon() )
			obj.arg = () => this.close_arg()
		} )
	}

	/// tools / <= Close
	tools() {
		return [].concat( this.Close() )
	}

} }

namespace $ { export class $mol_app_demo_nav extends $mol_grid {

	/// row_height 32
	row_height() {
		return 32
	}

	/// hierarchy_col \title
	hierarchy_col() {
		return "title"
	}

	/// Head null
	Head() {
		return <any> null
	}

	/// arg!id *
	arg( id : any ) {
		return ({
		})
	}

	/// Expand!id $mol_check_expand 
	/// 	expanded?val <=> cell_expanded!id?val 
	/// 	level <= cell_level!id
	@ $mol_mem_key()
	Expand( id : any ) {
		return new $mol_check_expand().setup( obj => { 
			obj.expanded = ( val? : any ) => this.cell_expanded(id , val )
			obj.level = () => this.cell_level(id)
		} )
	}

	/// Option!id $mol_link 
	/// 	arg <= arg!id 
	/// 	sub / 
	/// 		<= Expand!id 
	/// 		<= cell_content!id
	@ $mol_mem_key()
	Option( id : any ) {
		return new $mol_link().setup( obj => { 
			obj.arg = () => this.arg(id)
			obj.sub = () => [].concat( this.Expand(id) , this.cell_content(id) )
		} )
	}

} }

