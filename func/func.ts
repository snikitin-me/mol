interface Function {
	name : string
}

namespace $ {
	
	export var $mol_func_name_dict = new $mol_dict< Function , string >()

	export function $mol_func_name( func : Function ) : string {
		if( func.name ) return func.name
		
		if( $mol_func_name_dict.has( func ) ) return $mol_func_name_dict.get( func )
		
		const name = Function.prototype.toString.call( func ).match( /^function ([a-z0-9_$]*)/ )[ 1 ]
		$mol_func_name_dict.set( func , name )
		
		return name
	}

}
