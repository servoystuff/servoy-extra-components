{
	"name": "servoyextra-select2tokenizer",
	"displayName": "select2tokenizer",
	"version": "1.0.0",
	"icon": "servoyextra/select2tokenizer/tags.png",
	"definition": "servoyextra/select2tokenizer/select2tokenizer.js",
	"libraries": [
		{
			"name": "select2.js",
			"version": "4.0.0",
			"url": "servoyextra/select2tokenizer/js/select2.min.js",
			"mimetype": "text/javascript"
		},
		{
			"name": "select2.css",
			"version": "4.0.0",
			"url": "servoyextra/select2tokenizer/css/select2.min.css",
			"mimetype": "text/css"
		},
		{
			"name": "select2-autotokenizer.css",
			"version": "1.0.0",
			"url": "servoyextra/select2tokenizer/css/select2-tokenizer.css",
			"mimetype": "text/css"
		}
	],
	"model":
	{
		"dataProviderID": { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID" , "callback":"onDataChangeCallback"}},
		"valuelistID": { "type" : "valuelist", "tags": { "scope" :"design", "logWhenOverMax" : false }, "for": "dataProviderID", "default":"autoVL" , "max" : 100}, 
		"visible" : {"type":"visible", "default":true},
        "allowNewEntries": {"type": "boolean", "default": false, "tags": {"scope" : "design"}}, 
        "closeOnSelect": {"type": "boolean", "default": true, "tags": {"scope" : "design"}}, 
        "selectOnClose": {"type": "boolean", "default": false, "tags": {"scope" : "design"}}, 
        "noMatchesFoundText": {"type": "tagstring", "default": "No matches found", "tags": {"scope" : "design"}},
        "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
        "placeholderText" : {"type": "tagstring", "default" : "Select...", "tags": {"scope" : "design"}}, 
        "toolTipText" : {"type" : "tagstring"}, 
        "styleClass" : {"type": "styleclass"},
        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onDataChangeMethodID"] },
        "readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": { "scope" :"runtime" } },
           
        "valueSeparator" : {"type" :"string", "tags" : {"scope" :"private"}, "values" : [{"NEW_LINE":"new_line"}, {"COMMA": "comma"}], "default" : "new_line"},    
        "maximumSelectionSize": {"type": "int", "tags": { "scope" :"private" }},
        "size" : {"type" :"dimension",  "default" : {"width":140, "height":20}}, 
        "location" : "point"

	},
	"handlers":
	{
		"onDataChangeMethodID" : {
	          "returns": "boolean", 
	         	
	        	"parameters":[
								{
						          "name":"oldValue",
								  "type":"${dataproviderType}"
								}, 
								{
						          "name":"newValue",
								  "type":"${dataproviderType}"
								}, 
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
		},
		"onFocusGainedMethodID" : { 	
	        "parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
	     }, 
	    "onFocusLostMethodID" : {
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
	        } 
	},
	"api": 
	{
	}
}