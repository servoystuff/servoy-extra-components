/**
* Add foundset to the list of foundsets used to create the tree's root nodes. 
* 
* @example
* %%elementName%%.addRoots(foundset);
* 
* @param foundSet
*/
$scope.api.addRoots = function(foundset) {
	if(!$scope.model.foundsets) {
		$scope.model.foundsets = []
	}
	$scope.model.foundsets.push({datasourceID: getDatasourceID(foundset.getDataSource()), foundset: foundset});
	loadNextLevelOfFoundsets(foundset);
	setDataproviders($scope.model.foundsets);
}

/**
 * Loads the related foundsets (for a specified foundset) based on the given relations. 
 */
$scope.loadRelatedFoundset = function(index) {
	loadNextLevelOfFoundsets($scope.model.relatedFoundsets[index].foundset.foundset);
}

$scope.saveNodes = function(nodes) {
	$scope.model.nodes = nodes;
}

/**
* Clears all foundset roots of the tree.
* 
* @example
* %%elementName%%.removeAllRoots();
* 
*/
$scope.api.removeAllRoots = function() {
	if($scope.model.foundsets) {
		$scope.model.foundsets.length = 0;
	}
}
/**
* Set dataprovider for the text displayed from a datasource foundset. 
* 
* @example
* %%elementName%%.setTextDataprovider(databaseManager.getDataSource('example_data', 'categories'),'categoryname');
* 
* @param datasource 
* @param textdataprovider dataprovider of the displayed text
*/
$scope.api.setTextDataprovider = function(datasource, textdataprovider) {
	$scope.getBinding(datasource).textdataprovider = textdataprovider;
	if($scope.model.foundsets) {
		$scope.model.foundsets.forEach(function(element) {
			element.dataproviders.text = textdataprovider;
		});
	} else {
		if (!$scope.dataproviders) $scope.dataproviders = {};
		$scope.dataproviders["text"] = {value: textdataprovider};
	}
}

/**
* Set relation for displaying a datasource foundset. 
* 
* @example
* %%elementName%%.setNRelationName(databaseManager.getDataSource('example_data', 'categories'),'companies_to_categories');
* 
* @param datasource 
* @param nrelationname relation name
*/
$scope.api.setNRelationName = function(datasource, nrelationname) {
	$scope.getBinding(datasource).nrelationname = nrelationname;

	// load the related foundsets for this relation in case the setNRelationName api was called after addRoots api
	loadRelatedFoundsetsForRelationNameAPI(datasource, nrelationname);
}   

/**
* Set relation for displaying a datasource foundset. 
* 
* @example
* %%elementName%%.setNRelationName(databaseManager.getDataSource('example_data', 'categories'),'companies_to_categories');
* 
* @param datasource 
* @param nrelationname relation name
*/
$scope.api.setHasCheckBoxDataprovider = function(datasource, hascheckboxdataprovider) {
	$scope.getBinding(datasource).hascheckboxdataprovider = hascheckboxdataprovider;
	if($scope.model.foundsets) {
		$scope.model.foundsets.forEach(function(element) {
			element.dataproviders.hascheckbox = hascheckboxdataprovider;
		});
	} else {
		if (!$scope.dataproviders) $scope.dataproviders = {};
		$scope.dataproviders["hascheckbox"] = {value: hascheckboxdataprovider};
	}
}   

/**
* Set callback info for a datasource foundset display. 
* 
* @example
* %%elementName%%.setCallBackInfo(databaseManager.getDataSource('example_data', 'categories'),'myfunction','arg');
* 
* @param datasource 
* @param callbackfunction callback function name
* @param param
*/
$scope.api.setCallBackInfo = function(datasource, callbackfunction, param) {
	$scope.getBinding(datasource).callbackinfo = {f: callbackfunction, param: param }
}   

/**
* Set dataprovider for the checkbox displayed for a datasource foundset. 
* 
* @example
* %%elementName%%.setCheckBoxValueDataprovider(databaseManager.getDataSource('example_data', 'categories'),'enabled');
* 
* @param datasource 
* @param checkboxvaluedataprovider dataprovider of the displayed checkbox
*/
$scope.api.setCheckBoxValueDataprovider = function(datasource, checkboxvaluedataprovider) {
	$scope.getBinding(datasource).checkboxvaluedataprovider = checkboxvaluedataprovider;
	if($scope.model.foundsets) {
		$scope.model.foundsets.forEach(function(element) {
			element.dataproviders.checkboxvalue = checkboxvaluedataprovider;
		});
	} else {
		if (!$scope.dataproviders) $scope.dataproviders = {};
		$scope.dataproviders["checkboxvalue"] = {value: checkboxvaluedataprovider};
	}
}   

/**
* Set callback info for a datasource foundset checkbox display. 
* 
* @example
* %%elementName%%.setMethodToCallOnCheckBoxChange(databaseManager.getDataSource('example_data', 'categories'),'myfunction','arg');
* 
* @param datasource 
* @param callbackfunction callback function name
* @param param
*/
$scope.api.setMethodToCallOnCheckBoxChange = function(datasource, callbackfunction, param) {
	$scope.getBinding(datasource).methodToCallOnCheckBoxChange = {f: callbackfunction, param: param }  		
}

/**
* Set dataprovider for the tooltip text displayed for a datasource foundset. 
* 
* @example
* %%elementName%%.setToolTipTextDataprovider(databaseManager.getDataSource('example_data', 'categories'),'tooltip');
* 
* @param datasource 
* @param tooltiptextdataprovider dataprovider of the displayed checkbox
*/
$scope.api.setToolTipTextDataprovider = function(datasource, tooltiptextdataprovider) {
	$scope.getBinding(datasource).tooltiptextdataprovider = tooltiptextdataprovider;
	if($scope.model.foundsets) {
		$scope.model.foundsets.forEach(function(element) {
			element.dataproviders.tooltip = tooltiptextdataprovider;
		});
	} else {
		if (!$scope.dataproviders) $scope.dataproviders = {};
		$scope.dataproviders["tooltip"] = {value: tooltiptextdataprovider};
	}
}   

/**
* Set dataprovider for the image displayed in tree node for a datasource foundset. 
* 
* @example
* %%elementName%%.setImageURLDataprovider(databaseManager.getDataSource('example_data', 'categories'),'mymedia');
* 
* @param datasource 
* @param imageurldataprovider dataprovider of the node image
*/
$scope.api.setImageURLDataprovider = function(datasource, imageurldataprovider) {
	$scope.getBinding(datasource).imageurldataprovider = imageurldataprovider;
	if($scope.model.foundsets) {
		$scope.model.foundsets.forEach(function(element) {
			element.dataproviders.image = imageurldataprovider;
		});
	} else {
		if (!$scope.dataproviders) $scope.dataproviders = {};
		$scope.dataproviders["image"] = {value: imageurldataprovider};
	}
}   

/**
* Set the dataprovider name to retrieve column name and sort order for the child nodes. The provided data must be a string of form : column_name_used_for_sort sort_order(asc or desc)
* 
* @example
* %%elementName%%.setChildSortDataprovider(databaseManager.getDataSource('example_data', 'companies'),'company_sort');
* 
* @param datasource 
* @param childsortdataprovider dataprovider of the sort text
*/
$scope.api.setChildSortDataprovider = function(datasource, childsortdataprovider) {
	$scope.getBinding(datasource).childsortdataprovider = childsortdataprovider;
}   

/**
* Set callback info for a datasource foundset doubleclick event. 
* 
* @example
* %%elementName%%.setMethodToCallOnDoubleClick(databaseManager.getDataSource('example_data', 'categories'),'myfunction','arg');
* 
* @param datasource 
* @param callbackfunction callback function name
* @param param
*/
$scope.api.setMethodToCallOnDoubleClick = function(datasource, callbackfunction, param) {
	$scope.getBinding(datasource).methodToCallOnDoubleClick = {f: callbackfunction, param: param }  		
}   

/**
* Set callback info for a datasource foundset right click event. 
* 
* @example
* %%elementName%%.setMethodToCallOnRightClick(databaseManager.getDataSource('example_data', 'categories'),'myfunction','arg');
* 
* @param datasource 
* @param callbackfunction callback function name
* @param param
*/
$scope.api.setMethodToCallOnRightClick = function(datasource, callbackfunction, param) {
	$scope.getBinding(datasource).methodToCallOnRightClick = {f: callbackfunction, param: param }  		
}

$scope.getBinding = function(datasource) {
	if(!$scope.model.bindings) {
		$scope.model.bindings = [];
	}

	for(var i = 0; i < $scope.model.bindings.length; i++) {
		if($scope.model.bindings[i].datasource == getDatasourceID(datasource)) {
			return $scope.model.bindings[i];
		}
	}
	
	var lastIdx = $scope.model.bindings.length;
	$scope.model.bindings[lastIdx] = {
			datasource: getDatasourceID(datasource)
	};	
	return $scope.model.bindings[lastIdx];
}

/**
 * Sets selection node of the tree.
 *
 * @example
 * %%elementName%%.setSelectionPath([22])
 *
 * @param pk array of each level id
 */
$scope.api.setSelectionPath = function(pk) {
	$scope.model.selection = pk;
}

/**
 * Sets expanded state for a tree level. Expanding the tree may cause performance issues.
 *
 * @example
 * %%elementName%%.setNodeLevelVisible(2,true)
 *
 * @param level level in tree
 * @param state expanded state
 */
$scope.api.setNodeLevelVisible = function(level, state) {
	$scope.model.levelVisibility = {level: level, state: state};	
}

/**
 * Create relation info object used to set multiple child relations for a tree node
 * 
 * @param label 
 * @param nRelationName 
 * @return {relationInfo}
 */
$scope.api.createRelationInfo = function(label, nRelationName) {
	return {label: label, nRelationName: nRelationName};
}

/**
 * Set n-relation infos (array of RelationInfo objects created using tree.createRelationInfo() for having multiple child relations for one node)
 * 
 * @param datasource 
 * @param relationInfos 
 */
$scope.api.setNRelationInfos = function(datasource, relationInfos) {
	$scope.getBinding(datasource).nRelationInfos = relationInfos;

	// load the related foundsets for these relations in case the setNRelationInfos api was called after addRoots api
	loadRelatedFoundsetsForRelationInfosAPI(datasource, relationInfos);
}

/**
* Set intial checked checkboxes for a datasource foundset when no checkboxdataprovider is used 
* 
* @example
* %%elementName%%.setInitialCheckBoxValues(databaseManager.getDataSource('example_data', 'categories'),["1", "3", "5"]);
* 
* @param datasource 
* @param checkboxValues array of pks that should have the checkbox checked
*/
$scope.api.setInitialCheckBoxValues = function(datasource, initialCheckboxValues) {
	$scope.getBinding(datasource).initialCheckboxValues = initialCheckboxValues;
}

/**
* Set the nodes that should have checkbox for a datasource when no hascheckboxdataprovider is used
* 
* @example
* %%elementName%%.setHasCheckBoxValue(databaseManager.getDataSource('example_data', 'categories'),["1", "3", "5"]);
* 
* @param datasource 
* @param hasCheckboxValue array of pks that should have checkbox
*/
$scope.api.setHasCheckBoxValue = function(datasource, hasCheckboxValue) {
	$scope.getBinding(datasource).hasCheckboxValue = hasCheckboxValue;
}

/**
 * Loads the related foundsets. 
 */
function loadNextLevelOfFoundsets(foundset) {
	var nRelationName = $scope.getBinding(foundset.getDataSource()).nrelationname;
	var nRelationInfos = $scope.getBinding(foundset.getDataSource()).nRelationInfos;

	var relatedFoundsets = [];
	if (nRelationName && !nRelationInfos) {
		for (var i = 1; i <= foundset.getSize(); i++) {
			var record = foundset.getRecord(i);
			relatedFoundsets.push(record[nRelationName]);
		}
		addRelatedFoundsetsToModel(relatedFoundsets);
	} else if (nRelationInfos) {
		nRelationInfos.forEach(function (info) {
			for (var i = 1; i <= foundset.getSize(); i++) {
				var record = foundset.getRecord(i);
				relatedFoundsets.push(record[info.nRelationName]);
			}
		});
		addRelatedFoundsetsToModel(relatedFoundsets);
	}
}

// Two separate methods (for clarity reasons) for loading related foundsets (called from different API methods).
// We could make only one.  

/**
 * Loads the related foundsets for the given relation name.
 */
function loadRelatedFoundsetsForRelationNameAPI(datasource, nrelationname) {
	if ($scope.model.foundsets && $scope.model.foundsets.length > 0) {
		var relatedFoundsets = [];
		$scope.model.foundsets.forEach(function (el) {
			var foundset = el.foundset.foundset;
			if (foundset.getDataSource() === datasource) {
				for (var i = 1; i <= foundset.getSize(); i++) {
						var record = foundset.getRecord(i);
						if (record[nrelationname] && !record.isRelatedFoundSetLoaded(nrelationname)) { 
							relatedFoundsets.push(record[nrelationname]);
						}
				}
			}
		});

		addRelatedFoundsetsToModel(relatedFoundsets);
	}
}

/**
 * Loads the related foundsets for the given relations. 
 */
function loadRelatedFoundsetsForRelationInfosAPI(datasource, relationInfos) {
	if ($scope.model.foundsets && $scope.model.foundsets.length > 0) {
		var relatedFoundsets = [];
		$scope.model.foundsets.forEach(function (el) {
			var foundset = el.foundset.foundset;
			if (foundset.getDataSource() === datasource) {
				relationInfos.forEach(function (info) {
					for (var i = 1; i <= foundset.getSize(); i++) {
						var record = foundset.getRecord(i);
						if (record[info.nRelationName] && !record.isRelatedFoundSetLoaded(info.nRelationName)) { 
							relatedFoundsets.push(record[info.nRelationName]);
						}
					}
				});
			}
		});
		addRelatedFoundsetsToModel(relatedFoundsets);
	}
}

/**
 * Receives an array of foundsets and add them to model, setting also the data providers.
 */
function addRelatedFoundsetsToModel(relatedFoundsets) {
	relatedFoundsets.forEach(function (element) {
		if (element.getSize()) {
			$scope.model.relatedFoundsets.push({ datasourceID: getDatasourceID(element.getDataSource()), foundset: element });
		}
	});

	setDataproviders($scope.model.relatedFoundsets);
}

/**
 * Utility method for setting data providers to foundsets.
 */
function setDataproviders (foundsetsInfo) {
	if (foundsetsInfo && foundsetsInfo.length > 0) {
		for (var key in $scope.dataproviders) {
			if ($scope.dataproviders.hasOwnProperty(key)) {
				for (var i = 0; i < foundsetsInfo.length; i++) {
					foundsetsInfo[i].foundset.dataproviders[key] = $scope.dataproviders[key].value;
				}
			}
		}
		foundsetsInfo.forEach(function(element) {
			element.foundset.dataproviders.node_id = "node_id";
			element.foundset.dataproviders.parent_id = "parent_id";
		});
	}
}

/**
 * This method generates an ID for a given datasource and stores it. 
 * Used for passing an ID to client, not the whole data.
 */
function getDatasourceID (name) {
	if (!$scope.model.datasources) $scope.model.datasources = [];
	for(var i = 0; i < $scope.model.datasources.length; i++) {
		if($scope.model.datasources[i].name == name) {
			return $scope.model.datasources[i].id;
		} 
	}
	var lastIdx = $scope.model.datasources.length;
	$scope.model.datasources.push({name: name, id:lastIdx});
	return lastIdx;
}
