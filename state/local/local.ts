var localStorage = localStorage || <Storage> {
	getItem( key : string ) {
		return this[ ':' + key ]
	} ,
	setItem( key : string , value : string ) {
		this[ ':' + key ] = value
	} ,
	removeItem( key : string ) {
		this[ ':' + key ] = void 0
	}
}

namespace $ {
	
	export class $mol_state_local< Value > extends $mol_object {
		
		@ $mol_mem_key()
		static value< Value >( key : string , next? : Value , force? : $mol_atom_force ) : Value {
			if( next === void 0 ) return JSON.parse( localStorage.getItem( key ) || 'null' )
			
			if( next === null ) localStorage.removeItem( key )
			else localStorage.setItem( key , JSON.stringify( next ) )
			
			return next
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_local.value( this.prefix() + '.' + key , next )
		}
		
	}
	
}
