namespace $ { export class $mol_suggest extends $mol_search {

	/// value?val \
	@ $mol_mem()
	value( val? : any ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// query?val <=> value?val
	@ $mol_mem()
	query( val? : any ) {
		return this.value( val )
	}

} }

