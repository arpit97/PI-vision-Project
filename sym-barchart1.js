// A barchart is created which is used to perform a comparison between attributes or tags.
(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "barchart1",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'Table',
				Height: 150,
				Width: 150,
				BackgroundColor: '#344c69',
				BorderRadius: 30	
			} 
		}
	}
	
	function getConfig(){
		return {
					"type": "serial",
					"categoryField": "attribute",
					"rotate": true,
					"autoMarginOffset": 40,
					"marginRight": 60,
					"marginTop": 60,
					"startDuration": 1,
					"fontSize": 13,
					"theme": "patterns",
					"categoryAxis": {
						"gridPosition": "start"
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-1",
							"labelText": "",
							"title": "graph 1",
							"type": "column",
							"valueField": "value"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"title": ""
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": [],
					"dataProvider": [
						{
							"attribute": "attribute 1",
							"column-1": 8
						},
						{
							"attribute": "attribute2",
							"column-1": 6
						}
					]
				}				
							
	}
	
	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		var labels;
		
		var container = elem.find('#container')[0];
		container.id = "barChart_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(container.id, getConfig());
		function convertToChart(data){
			return data.Rows.map(function(item,index){
				var i = labels[index].indexOf("|"); 	//Fetching Index of '|' char
				var lab = labels[index].substr(i+1);	//using substr function we are fetching the substring after '|'
				return{
					value:item.Value,
					attribute:lab
				}
			});
		}
		// function for getting label in case of typical update.
		function updateLabel(data){
			 labels = data.Rows.map(function(item){
				return item.Label;
			});
		}
		
		function dataUpdate(data){
			console.log(data);
			if( !data) return;
			if(data.Rows[0].Label) updateLabel(data);
			if(!labels || !chart) return;
			
			var dataprovider = convertToChart(data);
			chart.dataProvider= dataprovider;
			chart.validateData();
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 

	