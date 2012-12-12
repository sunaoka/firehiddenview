FBL.ns(function() { with(FBL) {

	var panelName = "HiddenFields";

	Firebug.registerStylesheet("chrome://firehiddenview/skin/firehiddenview.css");
	Firebug.registerStringBundle("chrome://firehiddenview/locale/firehiddenview.properties");

	Firebug.HiddenViewModel = extend(Firebug.Module, { 
		initialize: function(prefDomain, prefNames) {
			Firebug.Module.initialize.apply(this, arguments);
		},
		loadedContext: function(context) {
			if (context.loaded) {
				var elem = context.window.document.getElementsByTagName("INPUT");
				if (elem) {
					var items = [];
					for (var i = 0, l = elem.length; i < l; ++i) {
						if (elem[i].type == "hidden") {
							items[items.length] = {
								name: elem[i].name,
								value: elem[i].value
							};
						}
					}
					var parentNode = Firebug.currentContext.getPanel(panelName).panelNode;
					templateRep.table.replace({items: items}, parentNode, templateRep);
				}
			}
		}
	});

	function HiddenViewPanel() {}
	HiddenViewPanel.prototype = extend(Firebug.Panel, {
		name: panelName,
		title: $STR("firehiddenview.Hidden_fields"),
		searchable: false,
		editable: false,
		initialize: function() {
			Firebug.Panel.initialize.apply(this, arguments);
		}
	});
	
	Firebug.registerPanel(HiddenViewPanel);
	Firebug.registerModule(Firebug.HiddenViewModel);

	var templateRep = domplate({
		table:
			TABLE({"class": "hiddenviewTable", cellpadding: 0, cellspacing: 0},
				TBODY(
					TR({"class": "hiddenviewHeader"},
						TH({"class": "hiddenviewHeaderName"}, $STR("firehiddenview.Field.Name")),
						TH({"class": "hiddenviewHeaderValue"}, $STR("firehiddenview.Field.Value"))
					),
					FOR("item", "items",
						TAG("$row", {name: "$item.name", value: "$item.value"})
					)
				)
			),
		
		row:
			TR({"class": "hiddenviewRow"},
				TD({"class": "hiddenviewName"}, "$name"),
				TD({"class": "hiddenviewValue"}, "$value")
			)
		
	});

}});
