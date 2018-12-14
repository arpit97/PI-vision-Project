(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "radar",
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
			"type": "radar",
			"categoryField": "attribute",
			"startDuration": 2,
			"graphs": [
				{
					"balloonText": "[[value]]",
					"bullet": "round",
					"id": "AmGraph-1",
					"valueField": "value"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"axisTitleOffset": 20,
					"gridType": "circles",
					"id": "ValueAxis-1",
					"minimum": 0,
					"axisAlpha": 0.15,
					"dashLength": 3
				}
			],
			"allLabels": [],
			"balloon": {},
			"titles": [],
			"dataProvider": [
				{
					"attribute": "attribute 1",
				},
				{
					"attribute": "attribute 2",
				
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