dhtmlXToolbarObject.prototype.getItemById = function(a) {
    return this.objPull[this.idPrefix + a]
};
dhtmlXToolbarObject.prototype.ag = function(a) {
    this.enableItem(a)
};
function eXcell_ron(a) {
	if(a) {
		this.cell = a
		this.grid = this.cell.parentNode.grid
	}
    this.edit = function() {
    };
    this.isDisabled = function() {
        return true
    };
    this.getValue = function() {
        return this.cell._clearCell ? "" : this.cell._orig_value || this.grid._aplNFb(this.cell.innerHTML.toString()._dhx_trim(), this.cell._cellIndex).toString()
    }
}
eXcell_ron.prototype = new eXcell;
eXcell_ron.prototype.setValue = function(a) {
    if (a === 0) {
    } else {
        if (!a || a.toString()._dhx_trim() == "") {
            this.setCValue("&nbsp;");
            return this.cell._clearCell = true
        }
    }
    this.cell._orig_value = a;
    this.cell._clearCell = false;
    this.setCValue(a ? this.grid._aplNF(a, this.cell._cellIndex) : "0")
};

dhtmlXCalendarObject.prototype.langData["cn"] = {
			dateformat: '%Y-%m-%d',
		monthesFNames : ["&#19968;&#26376;", "&#20108;&#26376;", "&#19977;&#26376;", "&#22235;&#26376;", "&#20116;&#26376;",
				"&#20845;&#26376;", "&#19971;&#26376;", "&#20843;&#26376;", "&#20061;&#26376;", "&#21313;&#26376;", "&#21313;&#19968;&#26376;",
				"&#21313;&#20108;&#26376;"],
		monthesSNames : ["&#19968;", "&#20108;", "&#19977;", "&#22235;", "&#20116;",
				"&#20845;", "&#19971;", "&#20843;", "&#20061;", "&#21313;", "&#21313;&#19968;",
				"&#21313;&#20108;"],
		daysFNames : ["&#21608;&#26085;","&#21608;&#19968;", "&#21608;&#20108;", "&#21608;&#19977;", "&#21608;&#22235;", "&#21608;&#20116;",
				"&#21608;&#20845;"],
		daysSNames : ["&#26085;", "&#19968;", "&#20108;", "&#19977;", "&#22235;", "&#20116;",
				"&#20845;"],
			weekstart: 1,
			weekname: "w"
		}
dhtmlXCalendarObject.prototype.lang = "cn";


dhtmlXGridObject.prototype.i18n.paging = {
    results: "&#32467;&#26524;&#38598;",
    records: "&#31532;",
    to: "&#45;",
    page: "&#39029; ",
    perpage: "&#26465;&#47;&#39029;",
    first: "&#39318;&#39029;",
    previous: "&#19978;&#19968;&#39029;",
    found: "&#25214;&#21040;&#35760;&#24405;",
    next: "&#19979;&#19968;&#39029;",
    last: "&#26411;&#39029;",
    of: " &#47;",
    notfound: "&#26080;&#35760;&#24405;"
};

dhtmlXGridObject.prototype.setPagingSkin = function(a) {
    this._pgn_skin = this["_pgn_" + a];
    if (a == "toolbar") {
        this._pgn_skin_tlb = "dhx_terrace" ;
    }
};

dhtmlx.progressOn = function() {
    var c = document.createElement("DIV");
    c.className = "dhxcelltop_progress";
    document.body.appendChild(c);
    var a = document.createElement("DIV");
    a.className = "dhxcelltop_progress_img";
    document.body.appendChild(a);
    c = a = null
};
dhtmlx.progressOff = function() {
    var g = {dhxcelltop_progress: true,dhxcelltop_progress_img: true};
    for (var e = 0; e < document.body.childNodes.length; e++) {
        if (typeof (document.body.childNodes[e].className) != "undefined" && g[document.body.childNodes[e].className] == true) {
            g[document.body.childNodes[e].className] = document.body.childNodes[e]
        }
    }
    for (var c in g) {
        if (g[c] != true) {
            document.body.removeChild(g[c])
        }
        g[c] = null
    }
    g = null
};

dhtmlXWindows.prototype._vpOfUpd = function() {
    var e = false;
    for (var c in this._vpOf) {
        e = e || this._vpOf[c]
    }
    if (e == true) {
        if (document.body.className.match(/dhxwins_vp_auto/) == null) {
            document.body.className += " dhxwins_vp_auto"
        }
    } else {
        if (document.body.className.match(/dhxwins_vp_auto/) != null) {
            document.body.className = String(document.body.className).replace(/\s{0,}dhxwins_vp_auto/gi, "")
        }
    }
};

dhtmlXGridObject.prototype.clearHeaderConditions = function() {
    this._connector_sorting = "";
    if (this.filters) {
        this._connector_filter = "";
        for (var a = 0; a < this.filters.length; a++) this.filters[a][0].value = "",
        this.filters[a][0].old_value = ""
    }
}
dhtmlXGridObject.prototype.clearAndLoad = function() {
    var a = this._pgn_skin;
    this._pgn_skin = null;
    this.clearAll();
    this._pgn_skin = a;
    this._colls_loaded = false;
    if(this._dataprocessor){
    	this._dataprocessor.updatedRows = [];
    	this._dataprocessor._in_progress = {};
    	this._dataprocessor._invalid = {};
    	this._dataprocessor.messages = [];
    }
    this.load.apply(this, arguments)
}

/**
dhtmlXGridObject.prototype.setSubTreeA = dhtmlXGridObject.prototype.setSubTree
dhtmlXGridObject.prototype.setSubTree = function (a,b) {
	if(typeof(a)=="string")
		a = eval(a);
	this._renderSortA.apply(this, [a, b]);
}

function eXcell_stree(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid;
        if (!this.grid._sub_trees) {
            return
        }
        this._sub = this.grid._sub_trees[a._cellIndex];
        if (!this._sub) {
            return
        }
        this._sub = this._sub[0]
    }
    this.getValue = function() {
        return this.cell._val
    };
    this.setValue = function(c) {
        this.cell._val = c;
        c = this._sub.getItemText(this.cell._val);
        this.setCValue((c || "&nbsp;"), c)
    };
    this.edit = function() {
        this._sub.parentObject.style.display = "block";
        var e = this.grid.getPosition(this.cell);
        this._sub.parentObject.style.top = e[1] + "px";
        this._sub.parentObject.style.left = e[0] + "px";
        this._sub.parentObject.style.position = "absolute";
        this._sub.parentObject.style.backgroundColor = 'white';
        this._sub.parentObject.style.border = "1px solid silver";
        this._sub.parentObject.style.zIndex = 1;
        var c = this.grid.editStop;
        this.grid.editStop = function() {
        };
        this.grid.editStop = c
    };
    this.detach = function() {
        this._sub.parentObject.style.display = "none";
        if (this.grid._sub_id != null) {
            var c = this.cell._val;
            this.setValue(this._sub.getSelectedItemId());
            this.grid._sub_id = null;
            return this.cell._val != c
        }
    }
}
*/
