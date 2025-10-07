FT.manifest({
	"filename": "index.html",
	"width": 728,
	"height": 90,
	"clickTagCount": 3,
	"hideBrowsers": ["ie8"],
	"richLoads": [
		{"name": "RL1", "src": "2025_JetBlueRetail_BOStoFlorida_728x90__Dynamic_RL1"},
		{"name": "RL2", "src": "2025_JetBlueRetail_BOStoFlorida_728x90__Dynamic_RL2"}
	],
    "instantAds": [
		{"name": "RL1", 						"type": "richLoad"},
		{"name": "RL2", 						"type": "richLoad"},
		{"name": "feedEndpoint", 				"type": "text", 			"default": "https://cdn.flashtalking.com/feeds/jetblue/routes/jfk_pls.json?[%CACHEBUSTER%]"},
		{"name": "defaultFeedEndpoint", 		"type": "text",				"default": "https://cdn.flashtalking.com/feeds/jetblue/routes/default.json?[%CACHEBUSTER%]"},
		{"name": "segmentId", 					"type": "text", 			"default": "false	"},
		{"name": "one_way_text",					"type": "text",			"default": "one<br/>way<sup class='asterisk'>&ast;</sup>"},
		{"name": "restrictions_text",				"type": "text",			"default": "<span class='asterisk'>&ast;</span>Restrictions apply, base fare only."},
		{"name": "Retail_dynamic_clickTag_URL",		"type": "text",			"default": "http://www.jetblue.com"},
		{"name": "Retail_default_clickTag_URL",		"type": "text",			"default": "http://www.jetblue.com"},
		{"name": "PSA_dynamic_clickTag_URL",		"type": "text",			"default": "http://www.avis.com"}
    ]
});
