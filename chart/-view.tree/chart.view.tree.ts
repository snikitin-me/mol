namespace $ { export class $mol_chart extends $mol_view {

	/// graphs /
	graphs() {
		return [] as any[]
	}

	/// Plot $mol_plot_pane 
	/// 	graphs <= graphs 
	/// 	gap_hor 48 
	/// 	gap_vert 24
	@ $mol_mem()
	Plot() {
		return new $mol_plot_pane().setup( obj => { 
			obj.graphs = () => this.graphs()
			obj.gap_hor = () => 48
			obj.gap_vert = () => 24
		} )
	}

	/// Legend $mol_chart_legend graphs <= graphs
	@ $mol_mem()
	Legend() {
		return new $mol_chart_legend().setup( obj => { 
			obj.graphs = () => this.graphs()
		} )
	}

	/// sub / 
	/// 	<= Plot 
	/// 	<= Legend
	sub() {
		return [].concat( this.Plot() , this.Legend() )
	}

} }

