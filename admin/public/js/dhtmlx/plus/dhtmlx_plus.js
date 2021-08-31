/*
 * author:lif
 * time:2016-05-30
 * 说明:
 *     1.此js提供封装了dhtmlx创建基本页面布局的方面
 *     2.设计上有1C Grid,2X Grid to Grid,2X Tree to Grid其他布局暂不提供
 *     3.同时封装grid中常用的单元格,如：自定义数字显示,自定义下拉框。
 *     4.同时封装 弹出窗
 * 
 * 已存在的功能：
 * 
 * 
 * 待实现的功能：
 * 
 * 
 * !!!注意!!!
 * 使用前确认：
 *     1.全局参数 path userImgPath 是否存在
 *     2.如果使用到了grid.chooseWin功能 需要 全局参数 connectorUrl
 */
/***dhtmlx页面基本对象,包含很多常用方法***/
function dhtmlxPageObject() {
}

/***1C布局对象***/
function dhtmlxPageObject1C(container, url) {
  //参数
  this.container = container;
  this.url = url;

  //布局
  var pattern = "1C";
  if (container == null) {
    container = document.body;
  } else {
    container = typeof (container) == "string" ? document.getElementById(container) : container;
  }
  if (container.attachObject) {
    this.layout = container.attachLayout(pattern);
  } else {
    this.layout = new dhtmlXLayoutObject(container, pattern);
  }

  this.cellA = this.layout.cells("a");
  this.cellA.hideHeader();
  this.toolbarA = this.cellA.attachToolbar();
  this.gridA = this.cellA.attachGrid();
  this.gridA.setDataSourUrl(url);
  this.dpA = new dataProcessor(url);
  this.dpA.setUpdateMode("off");
  this.dpA.initComp(this.gridA);

  this.gridA.setGridBlock()
  this.toolbarA._bindPageGridInit(this, this.gridA);

  this.gridA.refreshAll();
}
dhtmlxPageObject1C.prototype = new dhtmlxPageObject;

/***1C tree***/
function dhtmlxPageObject1CTree(container, urlA, treeRootId) {
  //参数
  this.container = container;
  this.urlA = urlA;

  //布局
  var pattern = "1C";
  if (container == null) {
    container = document.body;
  } else {
    container = typeof (container) == "string" ? document.getElementById(container) : container;
  }
  if (container.attachObject) {
    this.layout = container.attachLayout(pattern);
  } else {
    this.layout = new dhtmlXLayoutObject(container, pattern);
  }
  this.cellA = this.layout.cells("a");
  this.cellA.hideHeader();
  this.toolbarA = this.cellA.attachToolbar();
  this.treeA = this.cellA.attachTree(treeRootId);
  this.treeA.setDataSourUrl(urlA);
  this.toolbarA._bindPageTreeInit(this, this.treeA);

  this.treeA.refreshAll();
}
dhtmlxPageObject1CTree.prototype = new dhtmlxPageObject;

/***2X grid to grid***/
function dhtmlxPageObject2X1(container, pattern, urlA, urlB) {
  //参数
  this.container = container;
  this.urlA = urlA;
  this.urlB = urlB;
  //布局
  if (container == null) {
    container = document.body;
  } else {
    container = typeof (container) == "string" ? document.getElementById(container) : container;
  }
  if (container.attachObject) {
    this.layout = container.attachLayout(pattern);
  } else {
    this.layout = new dhtmlXLayoutObject(container, pattern);
  }

  this.cellA = this.layout.cells("a");
  this.cellA.hideHeader();
  this.toolbarA = this.cellA.attachToolbar();
  this.gridA = this.cellA.attachGrid();
  this.gridA.setDataSourUrl(urlA);
  this.dpA = new dataProcessor(urlA);
  this.dpA.setUpdateMode("off");
  this.dpA.initComp(this.gridA);

  this.gridA.setGridBlock()
  this.toolbarA._bindPageGridInit(this, this.gridA);

  this.cellB = this.layout.cells("b");
  this.cellB.hideHeader();
  this.toolbarB = this.cellB.attachToolbar();
  this.gridB = this.cellB.attachGrid();
  this.gridB.setDataSourUrl(urlB);
  this.dpB = new dataProcessor(urlB);
  this.dpB.setUpdateMode("off");
  this.dpB.initComp(this.gridB);

  this.gridB.setGridBlock()
  this.toolbarB._bindPageGridInit(this, this.gridB);

  this.gridA.bindGrid(this.gridB)

  this.gridA.refreshAll();
}
dhtmlxPageObject2X1.prototype = new dhtmlxPageObject;
/***2X tree to grid***/
function dhtmlxPageObject2X2(container, pattern, urlA, urlB, treeRootId) {
  //参数
  this.container = container;
  this.urlA = urlA;
  this.urlB = urlB;

  //布局
  if (container == null) {
    container = document.body;
  } else {
    container = typeof (container) == "string" ? document.getElementById(container) : container;
  }
  if (container.attachObject) {
    this.layout = container.attachLayout(pattern);
  } else {
    this.layout = new dhtmlXLayoutObject(container, pattern);
  }
  this.cellA = this.layout.cells("a");
  this.cellA.setWidth(250);
  this.toolbarA = this.cellA.attachToolbar();
  this.treeA = this.cellA.attachTree(treeRootId);
  this.treeA.setDataSourUrl(urlA);
  this.toolbarA._bindPageTreeInit(this, this.treeA);

  this.cellB = this.layout.cells("b");
  this.cellB.hideHeader();
  this.toolbarB = this.cellB.attachToolbar();
  this.gridB = this.cellB.attachGrid();
  this.gridB.setDataSourUrl(urlB);
  this.dpB = new dataProcessor(urlB);
  this.dpB.setUpdateMode("off");
  this.dpB.initComp(this.gridB);

  this.gridB.setGridBlock()
  this.toolbarB._bindPageGridInit(this, this.gridB);
  this.treeA.bindGrid(this.gridB)
  this.treeA.refreshAll();
}
dhtmlxPageObject2X2.prototype = new dhtmlxPageObject;
/***3X tree to grid to grid***/
function dhtmlxPageObject3X1(container, pattern, urlA, urlB, urlC, treeRootId) {
  //参数
  this.container = container;
  this.urlA = urlA;
  this.urlB = urlB;
  this.urlC = urlC;

  //布局
  if (container == null) {
    container = document.body;
  } else {
    container = typeof (container) == "string" ? document.getElementById(container) : container;
  }
  if (container.attachObject) {
    this.layout = container.attachLayout(pattern);
  } else {
    this.layout = new dhtmlXLayoutObject(container, pattern);
  }
  this.cellA = this.layout.cells("a");
  this.cellA.setWidth(250);
  this.toolbarA = this.cellA.attachToolbar();
  this.treeA = this.cellA.attachTree(treeRootId);
  this.treeA.setDataSourUrl(urlA);
  this.toolbarA._bindPageTreeInit(this, this.treeA);

  this.cellB = this.layout.cells("b");
  this.cellB.hideHeader();
  this.toolbarB = this.cellB.attachToolbar();
  this.gridB = this.cellB.attachGrid();
  this.gridB.setDataSourUrl(urlB);
  this.dpB = new dataProcessor(urlB);
  this.dpB.setUpdateMode("off");
  this.dpB.initComp(this.gridB);

  this.gridB.setGridBlock()
  this.toolbarB._bindPageGridInit(this, this.gridB);

  this.cellC = this.layout.cells("c");
  this.cellC.hideHeader();
  this.toolbarC = this.cellC.attachToolbar();
  this.gridC = this.cellC.attachGrid();
  this.gridC.setDataSourUrl(urlC);
  this.dpC = new dataProcessor(urlC);
  this.dpC.setUpdateMode("off");
  this.dpC.initComp(this.gridC);

  this.gridC.setGridBlock()
  this.toolbarC._bindPageGridInit(this, this.gridC);

  this.gridB.bindGrid(this.gridC)
  this.treeA.bindGrid(this.gridB)
  this.treeA.refreshAll();
}
dhtmlxPageObject2X2.prototype = new dhtmlxPageObject;
/***页面对象增强处理,提供页面公共方法***/
dhtmlxPageObject.prototype.showFileGrid = function () {
}

dhtmlXTreeObject.prototype.setDataSourUrl = function (_url) {
  this.initDataSourUrl = _url;
  this.dataSourUrl = _url;
}
dhtmlXTreeObject.prototype.bindGrid = function (_grid) {
  this._bindGrid = _grid;
  this.enableSmartXMLParsing(true);
  this.attachEvent('onClick', function (id) {
    var url = _grid.initDataSourUrl;
    if (url.indexOf("?") > -1) {
      url += "&parentId=" + id;
    } else {
      url += "?parentId=" + id;
    }
    _grid.refreshAll(url);
  })
}

dhtmlXTreeObject.prototype.refreshAll = function (_url) {
  if (_url == null || _url == '' || _url == undefined) {
    _url = this.dataSourUrl;
  }
  this.dataSourUrl = _url;
  var tree = this;
  this.loadXML(_url, function () {
    var nodeId = tree.getChildItemIdByIndex(tree.rootId, 0);
    if (nodeId != null) {
      tree.openItem(nodeId)
      tree.selectItem(nodeId, true)
    }
  })
}
/***DHTMLX增强处理***/
/*----Toolbar----*/
dhtmlXToolbarObject.prototype._bindPageGridInit = function (_pageObj, _grid) {
  this.pageObj = _pageObj;
  this.bindGrid = _grid;
  this._init4Grid();
}
dhtmlXToolbarObject.prototype._bindPageTreeInit = function (_pageObj, _tree) {
  this.pageObj = _pageObj;
  this.bindTree = _tree;
  this._init4Tree();
}
dhtmlXToolbarObject.prototype._init4Tree = function () {
  var tbObj = this;
  tbObj.setIconsPath(userImgPath);
  tbObj.addButton("unfold", 10, "全部展开", "icons_color/unfold.png", "icons_gray/unfold.png")
  tbObj.addButton("fold", 20, "全部折叠", "icons_color/fold.png", "icons_gray/fold.png")
  tbObj.attachEvent("onClick", function (id) {
    if (id == 'unfold' || id == 'fold') {
      eval("tbObj." + id + 'Handler()');
    }
  });
}
dhtmlXToolbarObject.prototype._init4Grid = function () {
  var tbObj = this;
  with (this) {
    setIconsPath(userImgPath);
    addText("t000", 0, "");
    //设置text为0px
    getItemById("t000").obj.style.padding = "0px";
    getItemById("t000").obj.style.marginRight = "0px";

    addButton("add", 10, "新增", "icons_color/a1.png", "icons_gray/a1.png");
    addButton("save", 20, "保存", "icons_color/e1.png", "icons_gray/e1.png");
    addButton("delete", 30, "删除", "icons_color/a4.png", "icons_gray/a4.png");
    addSeparator("sep_1", 40);
    addButton("refresh", 50, "刷新", "icons_color/refresh.png", "icons_gray/refresh.png");
    addSeparator("sep_2", 60);
    addButton("export", 70, "导出", "icons_color/e8export.png", "icons_gray/e8export.png");
    attachEvent("onClick", function (id) {
      if (id == 'add' || id == 'save' || id == 'delete' || id == 'refresh' || id == 'export') {
        eval("tbObj." + id + 'Handler()');
      }
    });
  }
}
dhtmlXToolbarObject.prototype.unfoldHandler = function () {
  this.bindTree.openAllItems(this.bindTree.rootId);
}
dhtmlXToolbarObject.prototype.foldHandler = function () {
  this.bindTree.closeAllItems();
}

dhtmlXToolbarObject.prototype.hideDefItem = function () {
  with (this) {
    hideItem('add'), hideItem('save'), hideItem('delete'), hideItem('sep_1'), hideItem('refresh'), hideItem('sep_2'), hideItem('export');
  }
}
dhtmlXToolbarObject.prototype.addHandler = function () {
  this.bindGrid.addRow(this.bindGrid.uid(), "", 0);
}
dhtmlXToolbarObject.prototype.saveHandler = function () {
  //停止编辑,让grid失去焦点
  this.bindGrid.editStop();
  if (this.bindGrid._dataprocessor.updatedRows.length == 0) {
    alert('没有需要保存的数据。');
    return;
  } else {
    for (var i = 0; i < this.bindGrid._dataprocessor.updatedRows.length; i++) {
      this.bindGrid._dataprocessor.set_invalid(this.bindGrid._dataprocessor.updatedRows[i], true);
      this.bindGrid._dataprocessor.setUpdated(this.bindGrid._dataprocessor.updatedRows[i], true);
    }
  }
  //保存所有操作
  this.bindGrid._dataprocessor.sendAllData();
}
dhtmlXToolbarObject.prototype.deleteHandler = function () {
  //得到选中的行
  var rowIds = this.bindGrid.getSelectedRowId();
  if (rowIds != null) {
    if (confirm("删除后数据不可恢复，确认执行该操作？")) {
      this.bindGrid.deleteSelectedRows();
      //保存所有操作
      this.bindGrid._dataprocessor.sendAllData();
    }
  } else {
    alert("请选择您要删除的行。");
  }
}
dhtmlXToolbarObject.prototype.refreshHandler = function () {
  this.bindGrid.refreshAll();
}
dhtmlXToolbarObject.prototype.exportHandler = function () {
  var type = this.bindGrid._export_type;
  var fn = this.bindGrid._export_name;
  if (type && type == "1") {//后台导出
    var url = this.bindGrid.xmlFileUrl;
    url = url.replace("&dhx_no_header=1", "");
    if (url.indexOf("?") > -1) {
      url += "&dhx_export=excel";
    } else {
      url += "?dhx_export=excel";
    }
    if (fn && fn != "") {
      url += "&dhx_export_name=" + encodeURI(fn);
    }
    if (this.bindGrid._sheetname && this.bindGrid._sheetname != "") {
      url += "&dhx_sheet_name=" + encodeURI(this.bindGrid._sheetname);
    }
    window.open(url);
  } else {
    var url = this.bindGrid.dataSourUrl;
    if (fn && fn != "") {
      url += "?fileName=" + encodeURI(fn);
    }
    this.bindGrid.toExcel(url)
  }
}
/*****dataProcessor****/
dataProcessor.prototype.initComp = function (a) {
  if (this.init_original) this.init_original.apply(this, arguments);
  a._dataprocessor = this;
  this.init(a);
  this.setTransactionMode("POST", !0);
  this.serverProcessor += (-1 != this.serverProcessor.indexOf("?") ? "&" : "?") + "editing=true"
  this.attachEvent("onFullSync", function () {
    try {
      a.refreshAll();
    } catch (e) { }
  })
  this.defineAction("error", function (sid, response) {
    var message = sid.getAttribute("message");
    if (message != null) alert(message);
    return true;
  })
}
/*----Grid----*/
dhtmlXGridObject.prototype.setExport = function (_filename, _type, _sheetname) {
  this._export_type = _type;
  this._export_name = _filename;
  this._sheetname = _sheetname;
}
dhtmlXGridObject.prototype.setCellValue = function (rid, cid, value) {
  var cindex = this.getColIndexById(cid);
  if (cindex > -1) {
    var cell = this.cells(rid, cindex);
    if (cell) {
      cell.setValue(value);
    }
  }
}
dhtmlXGridObject.prototype.getCellValue = function (rid, cid) {
  var cindex = this.getColIndexById(cid);
  if (cindex > -1) {
    var cell = this.cells(rid, cindex);
    if (cell) {
      return cell.getValue();
    }
  }
  return null;
}
dhtmlXGridObject.prototype.setDataSourUrl = function (_url) {
  this.initDataSourUrl = _url;
  this.dataSourUrl = _url;
}

dhtmlXGridObject.prototype.bindGrid = function (_grid) {
  this.onRowSelectEventId = this.attachEvent("onRowSelect", function (id, ind) {
    id = this.getSelectedRowId();//支持多选模式
    var _url = _grid.initDataSourUrl + "&_mainSelectedRowId=" + id;
    _grid.refreshAll(_url)
  });
}

//如果gird中重复点击一行记录不刷新页面
dhtmlXGridObject.prototype.bindGrid4 = function (_grid, oldId) {
  this.onRowSelectEventId = this.attachEvent("onRowSelect", function (id, ind) {
    id = this.getSelectedRowId();//支持多选模式
    var _url = _grid.initDataSourUrl + "&_mainSelectedRowId=" + id;
    if (oldId != id) {
      oldId = id;
      _grid.refreshAll(_url);
    }
  });
  return oldId;
}
dhtmlXGridObject.prototype.setGridBlock = function () {
  var _grid = this;
  var _dp = this._dataprocessor;
  _grid.enableBlockSelection(true);
  _grid.attachEvent("onKeyPress", function (keyCode, ctrlKey, shiftKey) {
    if (ctrlKey == true && keyCode == '86') {
      _grid.pasteBlockFromClipboard()
    } else if (ctrlKey == true && keyCode == '67') {
      _grid.copyBlockToClipboard()
    } else if (keyCode == '46') { //按下delete键
      var selectionArea = _grid._selectionArea
      if (selectionArea != null && selectionArea != "" && selectionArea != "undefined") {
        var leftTopCol = selectionArea.LeftTopCol;
        var leftTopRow = selectionArea.LeftTopRow;
        var rightBottomCol = selectionArea.RightBottomCol;
        var rightBottomRow = selectionArea.RightBottomRow;
        for (var i = leftTopRow; i <= rightBottomRow; i++) {
          for (var j = leftTopCol; j <= rightBottomCol; j++) {
            var cell = _grid.cells6(i, j);
            if (cell && !cell.isDisabled()) {
              if (cell.getValue() != "") {
                cell.setValue("");
                cell.cell.wasChanged = true; //改变单元格状态，否则不会保存
                if (_dp != null && _dp != '') {
                  _dp.setUpdated(_grid.getRowId(i), true);
                }
              }
            }
          }
        }
      }
    } else {
      return true;
    }
  });
}
dhtmlXGridObject.prototype.refreshAll = function (_url) {
  if (_url == null || _url == '' || _url == undefined) {
    _url = this.dataSourUrl;
  }
  this.dataSourUrl = _url;
  this._dataprocessor.serverProcessor = _url;
  dhtmlx.progressOn();
  var _grid = this;
  _grid.setXMLAutoLoading(_url);
  //写clearAndLoad时，4.4版本的表格加载分页有问题
  _grid.clearAll();
  _grid.load(_url, function () {
    dhtmlx.progressOff();
    try {
      //    		 var filterArr = new Array();
      //    		 filterArr = _grid.filters;
      //    		 var filter_flag = false;
      //    		 for(var i = 0; i < filterArr.length; i++){
      //    			 if(filterArr[2][0].value != ""){
      //    				 filter_flag = true;
      //    			 }
      //    		 }
      //    		 if(filter_flag){
      //    			 _grid.filterByAll();//过滤框内容依旧生效
      //    		 }
    } catch (e) { }
    if (_grid.getRowsNum() > 0) { //选择第一行
      _grid.selectRow(0, true, true, true);
    }
  });
}
/** 
 * 弹出选择窗口
 * _title 标题,_w 宽,_h 高,_gridFlag 后台加载grid标,_rowId 主grid行,_colId 主grid列
 * _editAble 编辑权限,_isCheck 是否带选择框,_callFunc 回掉函数
 */
dhtmlXGridObject.prototype.chooseWin = function (_title, _w, _h, _gridFlag, _rowId, _colId, _editAble, _isCheck, _callFunc) {
  if (typeof (connectorUrl) == "undefined") {
    alert("页面中缺少connectorUrl变量");
    return;
  }
  var mainGrid = this;
  var mainDp = this._dataprocessor;
  var dhxWins2 = new dhtmlXWindows();
  var win2 = dhxWins2.createWindow("chooseWin", 0, 0, _w, _h);
  with (win2) {
    setText(_title);
    allowMove();
    setModal(true);
    center();
    show();
    attachEvent("onClose", function () {
      setModal(false);
      hide();
    })
  }
  var url4Win = connectorUrl + '?ac=' + _gridFlag + '&mainRowId=' + _rowId + '&mainColId=' + _colId + '&editAble=' + _editAble + '&isCheck=' + _isCheck;
  var winPageObj = new dhtmlxPageObject1C(win2, url4Win)
  winPageObj.gridA.attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {
    if (_isCheck) {
      if (cInd == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
  winPageObj.gridA.attachEvent("onRowDblClicked", function (rId, cInd) {
    if (_isCheck) {
      winPageObj.gridA.cells(rId, 0).setValue(1);
    } else {
      chooseUserBtn()
    }
  });
  with (winPageObj.toolbarA) {
    hideDefItem()
    addButton("choose", 10, "确认选择", "/icons_color/tick18.png", "/icons_gray/tick18.png");
    if (_editAble) {
      ag("choose")
    } else {
      disableItem("choose")
    }
    attachEvent("onClick", function (id) {
      switch (id) {
        case "choose":
          chooseUserBtn()
          break;
      }
    });
  }
  //确认选择
  function chooseUserBtn() {
    var rowIds = '';
    if (_isCheck) {
      rowIds = _checkAndGetSelectedRowIdByCh(winPageObj.gridA, 0);
    } else {
      rowIds = winPageObj.gridA.getSelectedRowId()
    }
    if (rowIds == null || rowIds == '' || rowIds == undefined) {
      alert("请选中相应记录")
      return;
    }

    if (_callFunc) {
      if (typeof _callFunc === "function") {
        _callFunc(rowIds);
      }
    } else {
      mainGrid.cells(_rowId, mainGrid.getColIndexById(_colId)).setValue(rowIds);
      mainDp.setUpdated(_rowId, true);
    }
    win2.close();
  }
}

/****grid中cell类型扩展***/
/**
 * 只读单元格——整数型
 */
function eXcell_ron2Int(cell) {
  this.base = eXcell_ron;
  this.base(cell);
  this.setValue = function (val) {
    var inval = "";
    this.cell.original = val;
    if (isNaN(val) || val == '') {
      inval = "";
    } else {
      inval = parseInt(val);
    }
    this.cell.innerHTML = inval;
  };
  this.getValue = function () {
    return this.cell.original;
  }
};
eXcell_ron2Int.prototype = new eXcell_ron;
/**
 * 只读单元格——带百分号型，保留2位小数
 */
function eXcell_ron2Percent2(cell) {
  this.base = eXcell_ron;
  this.base(cell);
  this.setValue = function (val) {
    var inval = "";
    this.cell.original = val;
    if (isNaN(val) || val == '') {
      inval = "";
    } else {
      inval = (val * 100).toFixed(2) + "%";
    }
    this.cell.innerHTML = inval;
  };
  this.getValue = function () {
    return this.cell.original;
  }
};
eXcell_ron2Percent2.prototype = new eXcell_ron;
/**
 * 只读单元格——小数型，保留2位小数
 */
function eXcell_ron2Decimal2(cell) {
  this.base = eXcell_ron;
  this.base(cell);
  this.setValue = function (val) {
    var inval = "";
    this.cell.original = val;
    if (isNaN(val) || val == '') {
      inval = "";
    } else {
      inval = (val * 1).toFixed(2);
    }
    this.cell.innerHTML = inval;
  };
  this.getValue = function () {
    return this.cell.original;
  }
};
eXcell_ron2Decimal2.prototype = new eXcell_ron;
/**
 * 只读单元格——小数型，保留4位小数
 */
function eXcell_ron2Decimal4(cell) {
  this.base = eXcell_ron;
  this.base(cell);
  this.setValue = function (val) {
    var inval = "";
    this.cell.original = val;
    if (isNaN(val) || val == '') {
      inval = "";
    } else {
      inval = (val * 1).toFixed(4);
    }
    this.cell.innerHTML = inval;
  };
  this.getValue = function () {
    return this.cell.original;
  }
};
eXcell_ron2Decimal4.prototype = new eXcell_ron;
/**
 * 可编辑百分号
 */
function eXcell_edPercent(a) { //the eXcell name is defined here
  this.base = eXcell_ed;
  this.base(a);
  this.setValue = function (c) {
    if (isNaN(parseFloat(c))) {
      c = this.val || 0
    }
    this.setCValue("<span>" + c + "</span><span>%</span>", c);
  }
  this.getValue = function () {
    if (this.cell.childNodes.length > 1) {
      return this.cell.childNodes[0].innerHTML.toString()._dhx_trim()
    } else {
      return "0"
    }
  }
}
eXcell_edPercent.prototype = new eXcell_ed;
/**
 * 不可编辑百分号
 */
function eXcell_roPercent(a) { //the eXcell name is defined here
  this.base = eXcell_ro;
  this.base(a);
  this.setValue = function (c) {
    if (isNaN(parseFloat(c))) {
      c = this.val || 0
    }
    this.setCValue("<span>" + c + "</span><span>%</span>", c);
  }
  this.getValue = function () {
    if (this.cell.childNodes.length > 1) {
      return this.cell.childNodes[0].innerHTML.toString()._dhx_trim()
    } else {
      return "0"
    }
  }
}
eXcell_roPercent.prototype = new eXcell_ro;
/**
 * 只读下拉框
 */
function eXcell_cororo(cell) {
  this.base = eXcell_coro;
  this.base(cell);
  this.isDisabled = function () {
    return true
  }; //设置只读
}
eXcell_cororo.prototype = new eXcell_coro;

