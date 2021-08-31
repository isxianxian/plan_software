var _cellEditState = false;
var _docEditState = false;


function getToolbarComboLayui(_tb, _id, _format,_type){
	layui.use('laydate', function(){
		if(!_format||_format == undefined){
			_format = 'yyyy-MM-dd'
		}
        if(!_type||_type == undefined){
			_type = 'date'
		}
		var calendarDIV = _tb.objPull[_tb.idPrefix + _id].obj.firstChild;

		var laydate = layui.laydate;
		//常规用法
		laydate.render({
			elem: calendarDIV,
			type: _type,
			format: _format,
            theme: '#00b7ee'
		});
	})
}
/**
 * 在工具条上将text对象替换成combo对象
 */
function getToolbarCombo(_tb, _id, _width) {
    var comboDIV = _tb.objPull[_tb.idPrefix + _id].obj;
    comboDIV.style.margin = '2px';
    comboDIV.style.marginTop = '2px';
    comboDIV.style.paddingTop = '1px';
    _tb.objPull[_tb.idPrefix + _id].obj.innerHTML = "";
    var c = new dhtmlXCombo(comboDIV, "alfa", _width ? _width : 150);
    c.DOMelem.style.height = "19px";
    c.DOMelem_input.onkeydown = function(a) {
        a = a || event;
        a.keyCode == 13 && _tb.callEvent("onEnter", [_id, this.value]);
    };
    return c;
}

function getToolbarCalendarWithFormat(_tb, _id, _format) {
    var calendarDIV = _tb.objPull[_tb.idPrefix + _id].obj.firstChild;
    var c = new dhtmlXCalendarObject(calendarDIV);
    c.setDateFormat(_format);
    c.attachEvent('onClick', function(d, t) {
        //t.focus()
    })
    return c;
}
/**
 * 用json字符串加载combo对象选项
 */
function comboLoadByJson(_cb, _json, _value, _text) {
    data = eval(_json);
    if (_value != null && _text != null) {
        for (var i = 0; i < data.length; i++) {
            _cb.addOption(data[i][_value], data[i][_text]);
        }
        return _cb;
    } else {
        _cb.addOption(data);
        return _cb;
    }
}
/**
 * 只读下拉框
 */
function eXcell_cororo(cell) {
    this.base = eXcell_coro;
    this.base(cell);
    this.isDisabled = function() {
        return true
    }; //设置只读
}
eXcell_cororo.prototype = new eXcell_coro;
/**
 * 复写master_checkbox，满足全选当前页，而不选择没有打开的页面。
 */
dhtmlXGridObject.prototype._in_header_master_checkbox_new = function(t, i, c) {
    t.innerHTML = c[0] + "<input type='checkbox' />" + c[1];
    var self = this;
    t.firstChild.onclick = function(e) {
        self._build_m_order();
        var j = self._m_order ? self._m_order[i] : i;
        var val = this.checked ? 1 : 0;
        /**	 
         * to check/uncheck checkboxes only in the current page.
         * self.forEachRow(function(id) {
         * var c = this.cells(id, j);
         * if (c.isCheckbox())
         * c.setValue(val)
         * });
         **/
        var state = self.getStateOfView();
        var startVal, endVal;
        if (state.length == 3) {
            startVal = state[0];
            endVal = state[2];
        } else {
            startVal = state[1];
            endVal = state[2]
        }
        for (var k = startVal; k < endVal; k++) {
            var c = self.cellById(self.getRowId(k), j);
            if (c.isCheckbox()) c.setValue(val);
        }
        /**	 * end..	 */
        (e || event).cancelBubble = true
    }
};
dhtmlXGridObject.prototype._in_header_master_checkbox_delete = function(a, b, c) {
    a.innerHTML = c[0] + "<input type='checkbox' />" + c[1] + "删除否";
    var d = this;
    a.getElementsByTagName("input")[0].onclick = function(a) {
        d._build_m_order();
        var c = d._m_order ? d._m_order[b] : b,
            g = this.checked ? 1 : 0;
        d.callEvent("onMasterCheck", [c, g ? !0 : !1]);
        d.forEachRowA(function(a) {
            var b = this.cells(a, c);
            b.isCheckbox() && (b.setValue(g), b.cell.wasChanged = !0);
            this.callEvent("onEditCell", [1, a, c, g])
        });
        (a || event).cancelBubble = !0
    }
};
/**
 * 翻页时清除checkbox勾选
 * _grid 为当前grid实例
 * 注意checkbox应为表格的第一列
 */
function clearCheckboxFun(_grid) {
    var state = _grid.getStateOfView();
    var startVal, endVal;
    if (state.length == 3) {
        startVal = state[0];
        endVal = state[2];
    } else {
        startVal = state[1];
        endVal = state[2]
    }
    for (var k = startVal; k < endVal; k++) {
        var c = _grid.cellById(_grid.getRowId(k), 0);
        if (c.isCheckbox()) c.setValue(0);
    }
}
/**
 * 有多选的grid中，选中新行的时候，对其他未被选中的行的checkbox清零
 * 传入当前grid实例和选中的行id
 * 注意checkbox应为表格的第一列
 */
function beforeSelectOnCheck(_grid, newId) {
    _grid.cells(newId, 0).setValue(1);
    //		======模仿ext的多选开始======
    //	 	var state=_grid.getStateOfView();
    //	 	var startVal,endVal;
    //		 if(state.length==3){
    //			startVal=state[0];
    //			endVal=state[2];
    //		 }else{
    //		 	startVal=state[1];
    //			endVal=state[2]
    //		 }
    //		for (var k=startVal; k<endVal; k++){
    //			var id=_grid.getRowId(k);
    //			if(id==newId){
    //				_grid.cells(newId,0).setValue(1);
    //			}else{
    //				_grid.cells(id,0).setValue(0);
    //			}
    //		}
    //		======模仿ext的多选结束======
}
/**
 * toolbar添加按钮
 * 传入工具栏对象和需要的按钮数组
 * 数组中第一个为状态，第二个为是否添加分隔符，第三个为按钮id，第四个为按钮位置，
 * 第五个为显示text，第六个为可编辑时图片，第七个为不可编辑时图片
 */
var buttonState = "disabled"; //按钮默认状态，visible可见  invisible不可见  enabled可编辑  disabled不可编辑
var separatorState = "false"; //是否添加分隔符
function addButtons(_toolbar, _buttons) {
    for (var i = 0; i < _buttons.length; i++) {
        _toolbar.addButton(_buttons[i][2], i + 10, _buttons[i][4], _buttons[i][5], _buttons[i][6]);
        var state = separatorState;
        if (_buttons[i][1] != "" && _buttons[i][1] != null) {
            state = _buttons[i][1];
        }
        if (state == "true") {
            _toolbar.addSeparator("sep" + i, parseInt(_buttons[i][3], 10) + 1);
        }
        state = buttonState;
        if (_buttons[i][0] != "" && _buttons[i][0] != null) {
            state = _buttons[i][0];
        }
        if (state == "enabled") {
            //可编辑
            _toolbar.ag(_buttons[i][2]);
        } else if (state == "disabled") {
            //不可编辑
            _toolbar.disableItem(_buttons[i][2]);
        } else if (state == "visible") {
            //可见
            _toolbar.showItem(_buttons[i][2]);
        } else {
            //其他全部不可见
            _toolbar.hideItem(_buttons[i][2]);
        }
    }
}
/**
 * 初始化工具条功能
 */
function e_initToolbar(_toolbar) {
    if (typeof(hideBtns) != "undefined" && hideBtns && hideBtns != null && hideBtns != "") {
        var hcols = hideBtns.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _toolbar.hideItem(hcols[hc]);
        }
    }
    if (typeof(showBtns) != "undefined" && showBtns && showBtns != null && showBtns != "") {
        var hcols = showBtns.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _toolbar.showItem(hcols[hc]);
        }
    }
}
/**
 * 初始化工具条功能(新)提供通用方法
 */
function e_initToolbarNew(_toolbar, _hideBtns, _showBtns) {
    if (typeof(_hideBtns) != "undefined" && _hideBtns && _hideBtns != null && _hideBtns != "") {
        var hcols = _hideBtns.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _toolbar.hideItem(hcols[hc]);
        }
    }
    if (typeof(_showBtns) != "undefined" && _showBtns && _showBtns != null && _showBtns != "") {
        var hcols = _showBtns.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _toolbar.showItem(hcols[hc]);
        }
    }
}
/**
 * 初始化grid
 */
function e_initMasterGrid(_grid) {
    if (typeof(hideCols) != "undefined" && hideCols && hideCols != "") {
        var hcols = hideCols.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            if (_grid.getColumnsNum() > hcols[hc]) {
                _grid.setColumnHidden(hcols[hc], true)
            }
        }
    }
}
/**
 * 初始化grid,提供通用方法
 */
function e_initGrid(_grid, _hideCols, _showCols) {
    if (typeof(_hideCols) != "undefined" && _hideCols && _hideCols != null && _hideCols != "") {
        var hcols = _hideCols.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            if (_grid.getColumnsNum() > hcols[hc]) {
                _grid.setColumnHidden(hcols[hc], true)
            }
        }
    }
    if (typeof(_showCols) != "undefined" && _showCols && _showCols != null && _showCols != "") {
        var hcols = _showCols.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            if (_grid.getColumnsNum() > hcols[hc]) {
                _grid.setColumnHidden(hcols[hc], false)
            }
        }
    }
}
/**
 * 判断按钮是否存在，并设置按钮可用不可用
 */
function btnState(_toolbar, _id, _state) {
    try {
        _toolbar.isEnabled(_id);
        if (_state == 'ag') {
            _toolbar.ag(_id);
        } else if (_state == "disable") {
            _toolbar.disableItem(_id);
        } else if (_state == "visible") {
            //可见
            _toolbar.showItem(_id);
        } else {
            //其他全部不可见
            _toolbar.hideItem(_id);
        }
    } catch (e) {}
}
/**
 * 超链接调用方法，通过此方法转入到具体方法中
 */
function _linkCallFun() {
    var numargs = arguments.length; // 获取被传递参数的个数
    if (numargs > 1) { //正常函数调用
        var obj = arguments[numargs - 2];
        var _grid = obj.parentElement.parentElement.grid;
        _grid.selectRowById(obj.parentElement.parentElement.idd, true, true, true);
        var funName = arguments[numargs - 1];
        for (var i = 0; i < numargs - 2; i++) {
            arguments[i] = decodeURIComponent(arguments[i])
        }
        if (this[funName]) return this[funName].apply(this, arguments);
    }
}
/**
 * 为toolbar上面添加日期选择
 */
function getToolbarCalendar(_tb, _id) {
    var calendarDIV = _tb.objPull[_tb.idPrefix + _id].obj.firstChild;
    var c = new dhtmlXCalendarObject(calendarDIV);
    c.setDateFormat("%Y-%m-%d %H:%i:%s");
}
/**
 * toolbar得到当前周日历控件
 * _tb toolbar对象,
 * _id 控件id,
 * _dateFomat 日期格式,
 * _start 星期起始天,
 * _hideTime 是否隐藏时间,
 * _setColorFlag 是否设置自定义天数的颜色,
 * _Color 自定义天数的颜色,
 * _customDates 自定义天数
 */
function getToolbarCalendar_week2(_tb, _id, _dateFomat, _start, _hideTime, _setColorFlag, _Color, _customDates) {
    var calendarDIV = _tb.objPull[_tb.idPrefix + _id].obj.firstChild;
    var c = new dhtmlXCalendarObject(calendarDIV);
    c.setDateFormat(_dateFomat);
    if (_start) {
        c.setWeekStartDay(_start)
    }
    if (_hideTime) {
        c.hideTime();
    }
    if (_setColorFlag) {
        //c.setCustomdays(_customDates,"background:"+_Color) ;
    }
    c.attachEvent("onClick", function(date) {
        var  x  =  date.getDay();
        if (x == 0) {
            x = 7
        }
        var  week1  =  getDate(date,   - x + 1);
        var  week7  =  getDate(date,   - x + 7);
        var weekIndex = GetWeekIndex(date)
        var msg  =  getDateFormat(week1) + ' 到 ' + getDateFormat(week7) + "(第" + weekIndex + "周)"
        _tb.setValue(_id, msg, false);
    })
    return c;
}
/**
 * toolbar得到当前周日历控件
 * _tb toolbar对象,
 * _id 控件id,
 * _dateFomat 日期格式,
 * _start 星期起始天,
 * _hideTime 是否隐藏时间,
 * _setColorFlag 是否设置自定义天数的颜色,
 * _Color 自定义天数的颜色,
 * _customDates 自定义天数
 */
function getToolbarCalendar_week(_tb, _id, _dateFomat, _start, _hideTime, _setColorFlag, _Color, _customDates) {
    var calendarDIV = _tb.objPull[_tb.idPrefix + _id].obj.firstChild;
    var c = new dhtmlXCalendarObject(calendarDIV);
    c.setDateFormat(_dateFomat);
    if (_start) {
        c.setWeekStartDay(_start)
    }
    if (_hideTime) {
        c.hideTime();
    }
    if (_setColorFlag) {
        c.setCustomdays(_customDates, "background:" + _Color);
    }
    c.attachEvent("onClick", function(date) {
        var  x  =  date.getDay();
        if (x == 0) {
            x = 7
        }
        var  week1  =  getDate(date,   - x + 1);
        var  week7  =  getDate(date,   - x + 7);
        var weekIndex = GetWeekIndex(date)
        var msg  =  getDateFormat(week1) + ' 到 ' + getDateFormat(week7) + "(第" + weekIndex + "周)"
        _tb.setValue(_id, msg, false);
    })
    return c;
}

function GetFirstWeekBegDay(year) {
    var tempdate = new Date(year, 0, 1);
    var temp = tempdate.getDay();
    temp = temp == 0 ? 7 : temp;
    tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
    return new Date(tempdate);
}

function GetWeekIndex(dateobj) {
    var firstDay = GetFirstWeekBegDay(dateobj.getFullYear());
    if (dateobj < firstDay) {
        firstDay = GetFirstWeekBegDay(dateobj.getFullYear() - 1);
    }
    d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
    return Math.floor(d / 7) + 1;
}
dhtmlXCalendarObject.setCustomdays = function(a, b) {
    if (a == null) this._clearCustomdays();
    else if (a != null)
        for (var c = this._extractDates(a), d = 0; d < c.length; d++) this._customdays[(new Date(c[d].getFullYear(), c[d].getMonth(), c[d].getDate(), 0, 0, 0, 0)).getTime()] = [!0, b];
    this._drawMonth(this._activeDate)
};
//获取日期差
function  getDate(date,  dayspan) {
    var  time  =  date.valueOf();
    time  +=  (dayspan  *  24  *  60  *  60  *  1000);
    return  new  Date(time);
}

function getDateFormat(dateRes) {
    return dateRes.getFullYear() + "-" + (dateRes.getMonth() + 101 + "").substring(1) + "-" + (dateRes.getDate() + 100 + "").substring(1)
}         
// 得到一周中的日期,w为0为当前周,1为下周
function  getWeek(w) {
    var  date  =  new  Date();
    var  x  =  date.getDay();
    if (x == 0) {
        x = 7
    }
    var  msg  =  "";
    var  week1  =  getDate(date,  w  *  7  -  x + 1);
    var  week2  =  getDate(date,  w  *  7  -  x + 2);
    var  week3  =  getDate(date,  w  *  7  -  x + 3);
    var  week4  =  getDate(date,  w  *  7  -  x + 4);
    var  week5  =  getDate(date,  w  *  7  -  x + 5);
    var  week6  =  getDate(date,  w  *  7  -  x + 6);
    var  week7  =  getDate(date,  w  *  7  -  x + 7);
    msg  =  getDateFormat(week1) + ',' + getDateFormat(week2) + ',' + getDateFormat(week3) + ',' + getDateFormat(week4) + ',' + getDateFormat(week5) + ',' + getDateFormat(week6) + ',' + getDateFormat(week7)
    return  msg;
}
//返回两个日期相差的周数
function WeeksBetw(date1, date2) {
    //这里的date1,date2都是Date对象
    var dt1 = date1.getTime();
    var dt2 = date2.getTime();
    return Math.ceil((dt1 - dt2) / 604800000); //除以一个星期的毫秒数
}
/**
 * 删除grid当前显示的选中行(适用于多选框的grid)
 * _grid grid对象
 * _dataprocessor dataprocessor对象
 * _checkColIndx checkbox所在的列索引
 */
function _deleteRow(_grid, _dataprocessor, _checkColIndx, info) {
    //得到选中的行
    var rowIds = _grid.getCheckedRows(_checkColIndx);
    var rowId = _grid.getSelectedRowId();
    var rowIdArr = new Array();
    //将选中rowid进行转换成数组
    rowIdArr = rowIds.split(",")
    if (rowIdArr.length > 0 && rowIdArr != '') {
        info = info == null || info == '' ? "删除后数据不可恢复，确认执行该操作？" : info
        if (confirm(info)) {
            for (var i = 0; i < rowIdArr.length; i++) {
                //删除行(标记行状态为删除)
                _grid.deleteRow(rowIdArr[i]);
            }
            //保存所有操作
            _dataprocessor.sendAllData();
        }
    } else if (rowId != "" && rowId != null && rowId != 'undefined') {
        info = info == null || info == '' ? "删除后数据不可恢复，确认执行该操作？" : info
        if (confirm(info)) {
            _grid.deleteRow(rowId)
        }
        //保存所有操作
        _dataprocessor.sendAllData();
    } else {
        alert("请勾选您要删除的行。");
    }
}
/**
 * 删除选中的行
 */
function _deleteSelectRows(_grid, _dataprocessor, info) {
    //得到选中的行
    var rowIds = _grid.getSelectedRowId();
    if (rowIds != null) {
        info = info == null || info == '' ? "删除后数据不可恢复，确认执行该操作？" : info
        if (confirm(info)) {
            _grid.deleteSelectedRows();
            //保存所有操作
            _dataprocessor.sendAllData();
        }
    } else {
        alert("请选择您要删除的行。");
    }
}
/**
 * DataProcessor相关事件
 * 如交互前加遮罩层，交互完成移除遮罩层
 * 如果有遮罩层，则传入_layout参数，没有不传
 * 交互出错弹出信息，交互成功需要执行什么方法
 * 如果有要执行的方法，将方法名传入第三个参数
 */
function dataProcessorFunction(_dataProcessor, _layout, callbackfun) {
    _dataProcessor.attachEvent("onBeforeUpdate", function() {
        try {
            _layout.progressOn();
        } catch (e) {}
        return true;
    })
    _dataProcessor.attachEvent("onAfterUpdateFinish", function() {
        try {
            _layout.progressOff();
        } catch (e) {}
    })
    _dataProcessor.attachEvent("onFullSync", function() {
        try {
            callbackfun.call();
        } catch (e) {}
    })
    _dataProcessor.defineAction("error", function(sid, response) {
        var message = sid.getAttribute("message");
        if (message != null) alert(message);
        return true;
    })
}
/**
 *  构造指标树
 *@param: isNotCheckBox为判定树节点是否能多选,0为单选,1为多选
 *@param: servletPath为路径
 *@param: func为回调函数
 */
var dhxWins
var indexTree
var treeToolbar
var dhxLayout
var zbArr = new Array();

function indexTreeWin(isNotCheckBox, func) {
    zbArr = new Array();
    dhxWins = new dhtmlXWindows();
    //弹出选择指标的对话框
    var win = dhxWins.createWindow("iconForModule", 0, 0, 500, 450);
    with(win) {
        setText('设置指标');
        allowMove();
        setModal(true);
        center();
        show();
        attachEvent("onClose", function() {
            return true;
        })
    }
    dhxLayout = new dhtmlXLayoutObject(win, "1C")
    var a = dhxLayout.cells("a")
    a.hideHeader();
    indexTree = a.attachTree("-1");
    treeToolbar = a.attachToolbar();
    with(treeToolbar) {
        setIconsPath(userImgPath);
        addButton("enter", 0, "确认", "jsp/res/images/icons_color/tick.png", "jsp/res/images/icons_color/tick.png");
        addSeparator("sep1", 1);
        addInput("indexStr", 2, '', 120);
        addButton("search", 3, "查找", "jsp/res/images/icons_color/a5查询.png", "jsp/res/images/icons_color/a5查询.png");
        attachEvent("onClick", function(id) {
            switch (id) {
                case "enter":
                    saveIndex(isNotCheckBox, func)
                    break;
                case "search":
                    searchIndex()
                    break;
            }
        })
        attachEvent("onEnter", function(id, value) {
            searchIndex()
        });
    }
    with(indexTree) {
        setImagePath(imgPath);
        enableCheckBoxes(isNotCheckBox);
        enableSmartXMLParsing(1);
    }
    loadIndexTree('')
}
/**
 * 加载指标树
 * @param: varName指标名称
 * @param: servletPath为url
 */
function loadIndexTree(varName) {
    indexTree.deleteChildItems('-1')
    var name = encodeURI(varName)
    dhxLayout.progressOn()
    indexTree.loadXML(BASEPATH + "/servlet/DhtmlxConnector?bo=sysConfig&ac=indexSetSetting&indexSetGrid=indexsTree&varName=" + name + "&rootId=0", function() {
        dhxLayout.progressOff()
        indexTree.openItem("0")
    });
}
/**
 * 查找指标
 * @param: servletPath为url
 */
function searchIndex() {
    var searchStr = treeToolbar.getValue('indexStr')
    indexTree.findItem(searchStr, 0, 0)
}
/**
 * 返回所选指标
 *@param: isNotCheckBox为判定树节点是否能多选,0为单选,1为多选
 *@param: func回调函数
 */
function saveIndex(isNotCheckBox, func) {
    if (isNotCheckBox == '1') {
        zbArr = indexTree.getAllChecked();
        if (zbArr.length == 0) {
            alert("请选择相应的指标");
            return;
        } else {
            dhxWins.window("iconForModule").close();
            if (typeof func === "function") {
                func();
            }
        }
    } else {
        var zbId = indexTree.getSelectedItemId();
        var zbName = indexTree.getSelectedItemText();
        dhxWins.window("iconForModule").close();
        zbArr.push(zbId);
        zbArr.push(zbName);
        if (typeof func === "function") {
            func();
        }
    }
}
/**
 * 构造单位树
 *@param: isNotCheckBox为判定树节点是否能多选,0为单选,1为多选
 *@param: upunitid 为上级单位id
 *@param: rootId 为根节点id
 *@param: func回调函数
 */
var wins;
var unitToolbar;
var unitTree;
var winLayout
var unitArr = new Array();

function unitTreeWin(isNotCheckBox, upunitid, rootId, func) {
    unitArr = new Array();
    wins = new dhtmlXWindows();
    var unitConfigWin = wins.createWindow({
        id: "unitConfigWin",
        caption: '单位配置',
        x: 20,
        y: 30,
        width: 500,
        height: 450,
        center: true,
        onClose: function() {
            unitConfigWin.setModal(false);
            unitConfigWin.hide()
        }
    });
    winLayout = unitConfigWin.attachLayout("1C");
    var winPanel = winLayout.cells("a");
    winPanel.hideHeader()
    unitToolbar = winPanel.attachToolbar();
    with(unitToolbar) {
        setIconsPath(userImgPath);
        addButton("enter", 0, "确认", "jsp/res/images/icons_color/tick.png", "jsp/res/images/icons_color/tick.png");
        addSeparator("sep1", 1);
        addInput("unitStr", 2, '', 120);
        addButton("search", 3, "查找", "jsp/res/images/icons_color/a5查询.png", "jsp/res/images/icons_color/a5查询.png");
        attachEvent("onClick", function(id) {
            switch (id) {
                case "enter":
                    saveUnit(isNotCheckBox, func)
                    break;
                case "search":
                    searchUnit()
                    break;
            }
        })
        attachEvent("onEnter", function(id, value) {
            searchUnit()
        });
    }
    unitTree = winPanel.attachTree(upunitid);
    with(unitTree) {
        setImagePath(imgPath);
        enableCheckBoxes(isNotCheckBox);
        enableSmartXMLParsing(1);
    }
    loadUnitTree('', upunitid, rootId);
    unitConfigWin.setModal(true);
    unitConfigWin.show()
}
/**
 * 加载单位树
 *@param: unitName单位名称
 *@param: basePath为项目根路径
 *@param: upunitid 为上级单位id
 *@param: rootId 为根节点i
 */
function loadUnitTree(unitName, upunitid, rootId) {
    unitTree.deleteChildItems('-1')
    var name = encodeURI(unitName)
    winLayout.progressOn();
    //		unitTree.setXMLAutoLoading(BASEPATH+"/servlet/DhtmlxServlet?ac=unitTreeNew&unitid="+rootId+"&unitName="+name);
    unitTree.loadXML(BASEPATH + "/servlet/DhtmlxServlet?ac=unitTreeNew&id=" + upunitid + "&unitid=" + rootId + "&unitName=" + name, function() {
        winLayout.progressOff();
        unitTree.openItem(rootId);
        unitTree.selectItem(rootId);
    });
}
/**
 * 查找单位
 *@param: basePath为项目根路径
 *@param: upunitid 为上级单位id
 *@param: rootId 为根节点i
 */
function searchUnit() {
    var searchStr = unitToolbar.getValue('unitStr')
    unitTree.findItem(searchStr, 0, 0)
}
/**
 *返回所选单位
 *@param: isNotCheckBox为判定树节点是否能多选,0为单选,1为多选
 *@param: func回调函数
 */
function saveUnit(isNotCheckBox, func) {
    if (isNotCheckBox == '1') {
        unitArr = unitTree.getAllChecked();
        if (unitArr.length == 0) {
            alert("请选择相应的单位");
            return;
        } else {
            wins.window("unitConfigWin").close();
            if (typeof func === "function") {
                func();
            }
        }
    } else {
        var unitId = unitTree.getSelectedItemId();
        var unitName = unitTree.getSelectedItemText();
        unitArr.push(unitId);
        unitArr.push(unitName);
        wins.window("unitConfigWin").close();
        if (typeof func === "function") {
            func();
        }
    }
}
/**
 * 构造变量表格
 *@param: isNotCheckBox为判定树节点是否能多选,0为单选,1为多选
 *@param: func回调函数
 */
var variableWindow;
var variableToolbar;
var variableTree;
var variableLayout
var variableArr = new Array();

function variableWin(isNotCheckBox, func) {
    variableArr = new Array();
    var wins = new dhtmlXWindows();
    variableWindow = wins.createWindow({
        id: "variableWin",
        caption: '变量配置',
        x: 20,
        y: 30,
        width: 500,
        height: 450,
        center: true,
        onClose: function() {
            variableWindow.setModal(false);
            variableWindow.hide()
        }
    });
    variableLayout = variableWindow.attachLayout("1C");
    var winPanel = variableLayout.cells("a");
    winPanel.hideHeader()
    variableToolbar = winPanel.attachToolbar();
    with(variableToolbar) {
        setIconsPath(userImgPath);
        addButton("enter", 0, "确认", "jsp/res/images/icons_color/tick.png", "jsp/res/images/icons_color/tick.png");
        addSeparator("sep1", 1);
        addInput("unitStr", 2, '', 120);
        addButton("search", 3, "查找", "jsp/res/images/icons_color/a5查询.png", "jsp/res/images/icons_color/a5查询.png");
        attachEvent("onClick", function(id) {
            switch (id) {
                case "enter":
                    saveVariable(isNotCheckBox, func)
                    break;
                case "search":
                    variableTree.findItem(getValue('unitStr'), 0, 0);
                    break;
            }
        })
        attachEvent("onEnter", function(id, value) {
            variableTree.findItem(value, 0, 0);
        });
    }
    //		variableGrid = winPanel.attachGrid();
    //		with(variableGrid){
    //			setImagePath(imgPath);
    //			setHeader(["选择","变量名称"]);
    //			setColSorting(",connector");
    //			setColTypes("ch,ro");
    //			setInitWidths("40,*");
    //			enableSmartRendering(true);
    //			setColumnMinWidth(400,1);
    //			setColAlign("center,center");
    //			init();
    //			if(isNotCheckBox == '0'){
    //				setColumnHidden(0,true);
    //			}
    //			variableLayout.progressOn();
    //			clearAndLoad(BASEPATH+"/servlet/DhtmlxConnector?bo=sysConfig&ac=variableWin",function(){
    //				variableLayout.progressOff();
    //			})
    //		}
    variableTree = winPanel.attachTree(0);
    with(variableTree) {
        setImagePath(imgPath);
        enableCheckBoxes(isNotCheckBox);
        enableSmartXMLParsing(1);
    }
    loadVariableTree();
    variableWindow.setModal(true);
    variableWindow.show()
}

function loadVariableTree() {
    variableTree.deleteChildItems('0')
    variableLayout.progressOn();
    variableTree.loadXML(BASEPATH + "/servlet/DhtmlxConnector?bo=sysConfig&ac=variableTree", function() {
        variableLayout.progressOff();
        var id = variableTree.getItemIdByIndex('0', 0)
        variableTree.openItem(id);
        variableTree.selectItem(id);
    });
}
/**
 * 在工具栏上创建一个input，用于按label顺序查找tree上的节点。
 * @param {Object} toolbar 工具栏对象
 * @param {Object} tree tree对象
 * @param {Object} id 查询框id
 * @param {Object} rootid 树的第一个节点的id
 * @param {Object} index 查询框位置
 * @param {Object} text 查询框默认内容
 * @param {Object} width 查询框宽度
 */
function _createTreeLabelSearchInput(toolbar, tree, rootid, id, index, defaultText, width) {
    var _hisSearchStr = '';
    this._treeLabelSearch_toolbar = toolbar;
    this._treeLabelSearch_tree = tree;
    this._rootid = rootid;
    _treeLabelSearch_toolbar.addText(id, index, '<input id="_' + id + '" type="text" value="' + defaultText + '" style="width:' + width + '"/>', width);
    document.getElementById('_' + id).onfocus = function() {
        var searchStr = document.getElementById('_' + id).value;
        if (searchStr == defaultText) {
            document.getElementById('_' + id).value = '';
        }
    }
    document.getElementById('_' + id).onkeypress = function(ev) {
        var ev = ev || window.event;
        var code;
        if (ev.keyCode) {
            code = ev.keyCode;
        } else if (ev.which) {
            code = ev.which;
        }
        if (code == 13) {
            var _searchStr = document.getElementById('_' + id).value;
            if (_searchStr != _hisSearchStr) {
                var _rootId = new Date().getFullYear();
                _treeLabelSearch_tree.selectItem(_rootId, true);
            }
            var _id = _treeLabelSearch_tree.findItemIdByLabel(_searchStr, 0);
            _treeLabelSearch_tree.selectItem(_id, true);
            _treeLabelSearch_tree.focusItem(_id);
            _hisSearchStr = _searchStr;
        }
    }
}
/**
 *返回所选指标
 *@param: isNotCheckBox为判定树节点是否能多选,0为单选,1为多选
 *@param: func回调函数
 */
function saveVariable(isNotCheckBox, func) {
    if (isNotCheckBox == '1') {
        variableArr = variableTree.getAllChecked();
        if (variableArr.length == 0) {
            alert("请选择相应的变量");
            return;
        } else {
            variableWindow.close();
            if (typeof func === "function") {
                func();
            }
        }
    } else {
        var varId = variableTree.getSelectedItemId();
        if (variableTree.getUserData(varId, "leaf") == 0) {
            alert("请选择具体的变量。")
            return
        }
        var varName = variableTree.getSelectedItemText();
        variableArr.push(varId);
        variableArr.push(varName);
        variableWindow.close();
        if (typeof func === "function") {
            func();
        }
    }
}
/**
 * 保存grid信息(适用常见的grid)
 * _grid grid对象
 * _checkColIndx checkbox所在的列索引
 */
function _saveData(_grid, _dataprocessor) {
    //停止编辑,让grid失去焦点
    _grid.editStop();
    if (_dataprocessor.updatedRows.length == 0) {
        alert('没有需要保存的数据。');
        return;
    }
    //保存所有操作
    _dataprocessor.sendAllData();
}
//获取系统时间   以yyyy-mm-dd hh:mm:ss 格式显示
function _getSysTime() {
    var date = new Date()
    var time = date.getFullYear() + "-" + (date.getMonth() + 101 + "").substring(1) + "-" + (date.getDate() + 100 + "").substring(1) + " " + (date.getHours() + 100 + "").substring(1) + ":" + (date.getMinutes() + 100 + "").substring(1) + ":" + (date.getSeconds() + 100 + "").substring(1)
    return time;
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//excel中的rank排序方法
function rank(_grid, a, b, e) {
    var arr = new Array();
    var rangeArr = b.split(":");
    var startCell = rangeArr[0];
    var startRowIndex = startCell.substring(1, startCell.indexOf('c'))
    var startcolIndex = startCell.substring(startCell.indexOf('c') + 1);
    var endCell = rangeArr[1];
    var endRowIndex = endCell.substring(1, endCell.indexOf('c'))
    var endcolIndex = endCell.substring(endCell.indexOf('c') + 1);
    for (var i = startRowIndex; i <= endRowIndex; i++) {
        for (var j = startcolIndex; j <= endcolIndex; j++) {
            if (_grid.cells2(i, j).getValue() !== "") arr.push(_grid.cells2(i, j).getValue());
        }
    }
    if (e == null || e == 0 || e == '') {
        //降序
        arr.sort(function(a, b) {
            return parseFloat(a) < parseFloat(b) ? 1 : -1
        })
    } else {
        //升序
        arr.sort(function(a, b) {
            return parseFloat(a) > parseFloat(b) ? 1 : -1
        })
    }
    return a !== "" ? arr.indexOf(a) + 1 : ""
}
/**
	打开窗口
	*/
function _showWindow(_url, _title, _w, _h, _isModal) {
    if (typeof(_isModal) == "undefined") {
        _isModal = true;
    }
    var wins = new dhtmlXWindows();
    var selectWinow = wins.createWindow({
        caption: _title ? _title : "",
        x: 20,
        y: 30,
        width: _w ? _w : 500,
        height: _h ? _h : 350,
        center: true,
        onClose: function() {
            selectWinow.setModal(false);
            selectWinow.hide();
        }
    });
    selectWinow.attachURL(_url)
    selectWinow.setModal(_isModal);
    selectWinow.show()
}
//toobar上放置日期控件
dhtmlXToolbarObject.prototype.addCalendar = function(id, pos, width, format, ro) {
    var w = width ? width : 150;
    var readonly = 'readonly';
    typeof ro == 'boolean' && !ro && (readonly = '');
    this.addText(id, pos, '');
    this.setItemToolTip(id, "日期选择");
    var carlendarHtml = "<input type='text' style='position:relative;width:" + w + "px;height:20px;font-size:11px;text-align:center;' " + readonly + " />";
    this.objPull[this.idPrefix + id].obj.innerHTML = carlendarHtml;
    this.objPull[this.idPrefix + id].obj.style.margin = '2px 0 2px 0';
    var inputEl = this.objPull[this.idPrefix + id].obj.firstChild;
    var c = new dhtmlXCalendarObject(inputEl);
    if (format) {
        format.length <= 8 && c.hideTime();
        c.setDateFormat(format);
    }
    this.objPull[this.idPrefix + id]._calendarObj = c;
    return c;
}
//加载grid并且选择第一行
function _loadGridS1(_layout, _grid, _url) {
    //		_layout.progressOn();
    _grid.clearAll(true);
    _grid.clearAndLoad(_url, function() {
        //			_layout.progressOff();
        if (_grid.getRowsNum() > 0) { //选择第一行
            _grid.selectRow(0, true, true, true);
        }
    });
}
//加载grid,并执行函数
function _loadGrid(_layout, _grid, _url, func) {
    //		_layout.progressOn();
	_grid.clearAll(true);
    _grid.clearAndLoad(_url, function() {
        //			_layout.progressOff();
        if (typeof func === "function") {
            func();
        }
    });
}
//加载grid,并执行函数(有遮罩层，适合耗时操作)
function _loadGridWithProcess(_layout, _grid, _url, func) {
    _layout.progressOn();
    _grid.clearAndLoad(_url, function() {
        _layout.progressOff();
        if (typeof func === "function") {
            func();
        }
    });
}
/*
 * _grid treegrid对象，支持一棵树
 * _num 展开层数
 */
function _expandByNum(_grid, _num) {
    if (_num <= 0) {
        return;
    }
    //改为展开部分层次
    if (_grid.getRowsNum() > 0) { //有就选择第一行
        var rowId = _grid.getRowId(0);
        _iterationExpand(_grid, rowId, _num)
    }
}

function _iterationExpand(_grid, _parentId, _num) {
    if (_num == 0) {
        return;
    }
    if (_grid.getAllSubItems(_parentId).length > 0) {
        _grid.openItem(_parentId); //展开节点
        _num = _num - 1
        var subItemsId = _grid.getAllSubItems(_parentId);
        var subItemArr = new Array()
        subItemArr = subItemsId.split(',')
        for (var i = 0; i < subItemArr.length; i++) {
            var sonItemId = _grid.getChildItemIdByIndex(subItemArr[i], i)
            _iterationExpand(_grid, sonItemId, _num)
        }
    }
}
/**
 * 表格增加区域选择方法
 */
function _setGridBlock(_grid, _dp) {
    _grid.enableBlockSelection(true);
    _grid.attachEvent("onKeyPress", function(keyCode, ctrlKey, shiftKey) {
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
/**
 * 区域选择时计算区域值
 */
function _caculateBlock(_grid, _layout) {
    var statusBar = _layout.attachStatusBar();
    _grid.attachEvent("onBlockSelected", function() {
        var selectionArea = _grid._selectionArea
        var leftTopCol = selectionArea.LeftTopCol;
        var leftTopRow = selectionArea.LeftTopRow;
        var rightBottomCol = selectionArea.RightBottomCol;
        var rightBottomRow = selectionArea.RightBottomRow;
        var count = 0;
        var numcount = 0;
        var sum = 0;
        var avg = 0;
        var flag = true;
        for (var i = leftTopRow; i < rightBottomRow + 1; i++) {
            for (var j = leftTopCol; j < rightBottomCol + 1; j++) {
                if (_grid.isColumnHidden(j)) {
                    continue;
                }
                var cellNode = _grid.cells2(i, j);
                if (cellNode) {
                    var data = cellNode.getValue();
                    if (data && data != "") {
                        count++;
                        if (!isNaN(data)) { //为数字时，总数增加，数字个数增加
                            numcount++;
                            sum += parseFloat(data);
                        } else {
                            flag = false;
                        }
                    }
                }
            }
        }
        var label = "计数: " + count;
        if (flag) { //全为数字时
            sum = _formatNumber(sum);
            avg = sum / numcount;
            avg = _formatNumber(avg);
            label = "计数：" + count + " &nbsp;&nbsp;&nbsp;&nbsp; 平均值：" + avg + " &nbsp;&nbsp;&nbsp;&nbsp; 求和：" + sum;
        }
        statusBar.setText(label);
    });
}

function _formatNumber(n) {
    var numExp = /[0-9]+[.]([0-9]*)[0|9]{5}[0-9]/g;
    var result = numExp.exec(n + "");
    if (result != null) {
        return n.toFixed(result[1].length);
    } else {
        return n;
    }
};
/*
 * 批量修改工具条上面按钮属性,可用、禁用、显示、隐藏
 * _tb 工具条对象（必选）
 * _btnsEnable 所有可用按钮id,id间','分割 （可选）
 * _btnsDisable 所有禁用用按钮id,id间','分割 （可选）
 * _btnsShow 所有显示按钮id,id间','分割 （可选）
 * _btnsHidden 所有隐藏按钮id,id间','分割 （可选）
 */
function _changeBtnsState(_tb, _btnsEnable, _btnsDisable, _btnsShow, _btnsHidden) {
    //可用
    if (typeof(_btnsEnable) != "undefined" && _btnsEnable && _btnsEnable != null && _btnsEnable != "") {
        var hcols = _hideBtns.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _tb.ag(hcols[hc]);
        }
    }
    //禁用
    if (typeof(_btnsDisable) != "undefined" && _btnsDisable && _btnsDisable != null && _showBtns != "") {
        var hcols = _btnsDisable.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _tb.disableItem(hcols[hc]);
        }
    }
    //显示
    if (typeof(_btnsShow) != "undefined" && _btnsShow && _btnsShow != null && _btnsShow != "") {
        var hcols = _btnsShow.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _tb.showItem(hcols[hc]);
        }
    }
    //隐藏
    if (typeof(_btnsHidden) != "undefined" && _btnsHidden && _btnsHidden != null && _btnsHidden != "") {
        var hcols = _btnsHidden.split(",")
        for (var hc = 0; hc < hcols.length; hc++) {
            _tb.hideItem(hcols[hc]);
        }
    }
}
//检查grid选中行
function _checkAndGetSelectedRowId(_grid) {
    //得到选中的行
    var rowIds = _grid.getSelectedRowId();
    if (rowIds != null) {
        return rowIds;
    } else {
        alert("请勾选您要操作的行。");
        return null;
    }
}
//检查grid选中行,checkbox
function _checkAndGetSelectedRowIdByCh(_grid, _checkColIndx, _txtColInd) {
    //得到选中的行
    var rowIds = _grid.getCheckedRows(_checkColIndx);
    if (rowIds != null) {
        if (_txtColInd != null) {
            var rowValues = "";
            _grid.forEachRow(function(id) {
                if (_grid.cells(id, _checkColIndx).getValue() == 1) {
                    rowValues += "," + _grid.cells(id, _txtColInd).getValue()
                }
            })
            rowValues = rowValues == "" ? "" : rowValues.substring(1);
            return rowValues;
        } else {
            return rowIds;
        }
    } else {
        alert("请勾选您要操作的行。");
        return null;
    }
}
//检查Tree选中节点
function _checkAndGetSelectedNodeId(_tree, _txt) {
    //得到选中的行
    var nodeId = _tree.getSelectedItemId();
    if (nodeId != null) {
        return nodeId;
    } else {
        alert(_txt ? _txt : "请选择节点");
        return null;
    }
}
/**
 * 多文件上传
 * grid grid对象
 * title win标题
 * uids 事物ID
 * type 事物类型
 * editable 可编辑 true/false
 * callFunc 回掉函数
 */
function _showFileWin(grid, title, uids, type, editable, callFunc) {
    if (grid) {
        grid.selectRowById(uids, true, true, true);
    }
    var vault = new Vault2(uids, type, 'blob', '1', false);
    vault.fileWin.setText(title);
    if (editable) {
        vault.setEditable(true);
    } else {
        vault.setEditable(false);
    }
    vault.fileWin.attachEvent('onClose', function() {
        if (typeof callFunc === "function") {
            callFunc();
        }
        return true;
    });
}
//单文件
function _showFileWin2(grid, title, type, uids, editable, callFunc) {
    if (grid) {
        grid.selectRowById(uids, true, true, true);
    }
    var vault = new Vault2(uids, type, 'blob', '1', true);
    vault.fileWin.setText(title);
    if (editable) {
        vault.setEditable(true);
    } else {
        vault.setEditable(false);
    }
    vault.fileWin.attachEvent('onClose', function() {
        if (typeof callFunc === "function") {
            callFunc();
        }
        return true;
    });
}
/**
 * 提供form加载方法，判断在所有combo加载完成之后再加载表单数据
 */
dhtmlXForm.prototype.loadAfterAll = function(url, callback) {
    var self = this;
    this._comboItem = [];
    this.forEachItem(function(id) {
        var type = self.getItemType(id);
        if (type == 'combo' && self.getCombo(id).optionsArr.length == 0) {
            self._comboItem.push(self.getCombo(id));
            self.getCombo(id).attachEvent('onXLE', function() {
                if (!this._loaded) {
                    this._loaded = true;
                    self.loadLast();
                }
            });
        } else if (type == 'tree') {
            self._comboItem.push(self.getTree(id));
            self.getTree(id).attachEvent('onXLE', function() {
                if (!this._loaded) {
                    this._loaded = true;
                    self.loadLast();
                }
            });
        }
    });
    this.loadLast = function() {
        var b = true;
        for (var i = 0; i < this._comboItem.length; i++) {
            var c = this._comboItem[i];
            if (!(c._loaded && c._loaded === true)) b = false;
        }
        b === true && this.load(url, function() {
            typeof callback == 'function' && callback();
        });
    }
    this._comboItem.length == 0 && this.load(url, function() {
        typeof callback == 'function' && callback();
    });
}
/**
 * 扩展工具栏，提供元素设置元素居中方法
 * may 20130322
 * @return
 */
dhtmlXToolbarObject.prototype.setItemCenter = function() {
    this.cont.style.width = "100%";
    var marginLeft = (this.cont.clientWidth - this.base.clientWidth) / 2;
    this.base.style.marginLeft = marginLeft + 'px';
    var self = this;
    this.cont.onresize = function() {
        var w = (self.cont.clientWidth - self.base.clientWidth) / 2;
        self.base.style.marginLeft = w + 'px';
    }
}
/**
 * 弹出1c grid窗口
 */
function popWin1CGrid(url, title, w, h, callFunc) {
    var dhxWins1 = new dhtmlXWindows();
    var win1 = dhxWins1.createWindow("popWin", 0, 0, w ? w : 300, h ? h : 400);
    with(win1) {
        setText(title ? title : "");
        allowMove();
        setModal(true);
        center();
        show();
        attachEvent("onClose", function() {
            return true;
        })
    }
    var dhxLayout1 = new dhtmlXLayoutObject(win1, "1C");
    var win1_a = dhxLayout1.cells("a")
    win1_a.hideHeader();
    win1_a.attachGrid().clearAndLoad(url, function() {
        if (typeof func === "function") {
            callFunc();
        }
    });;
}
//
dhtmlXGridObject.prototype._in_header_stat_tree_max = function(b, d, e) {
    this._stat_in_header(b, function() {
        var b = -999999999;
        if (0 == this.getRowsNum()) return "";
        this._h2.forEachChild(0, function(e) {
            e = parseFloat(this._get_cell_value(e.buff || this.rowsAr[e.id], d));
            isNaN(e) || (b = Math.max(b, e))
        }, this);
        return this._maskArr[d] ? this._aplNF((b == -999999999 ? 0.0 : b), d) : (b == -999999999 ? 0.0 : b)
    }, d, e)
};

/**
 * 在工具栏将Text换成calendar
 */

dhtmlXToolbarObject.prototype.addCalendar = function (id, pos, width, format, ro){
	var w = width?width:150;
	var readonly = 'readonly';
	typeof ro == 'boolean' && !ro && (readonly = '');
	this.addText(id, pos, '');
	this.setItemToolTip(id, "日期选择");
	var carlendarHtml = "<input type='text' style='position:relative;width:"+w
	+"px;height:20px;font-size:11px;margin:2px;text-align:center;' "+readonly+" />";
	this.objPull[this.idPrefix+id].obj.innerHTML = carlendarHtml;
	this.objPull[this.idPrefix+id].obj.style.margin='2px 0 2px 0';
	var inputEl = this.objPull[this.idPrefix+id].obj.firstChild;
	var c = new dhtmlXCalendarObject(inputEl);
	if(format){
	format.length <= 8 && c.hideTime();
	c.setDateFormat(format);
	}
	this.objPull[this.idPrefix+id]._calendarObj = c;
	return c; 
} 

/**
 * 获取在工具栏上calendar的值
 */
dhtmlXToolbarObject.prototype.getCalendarValue = function (id,type){
	type && type != '' && (id = type+'_'+id);
	return this.objPull[this.idPrefix+id].obj.firstChild.value;
} 

/**
 * 设置工具栏上calendar的值
 */
dhtmlXToolbarObject.prototype.setCalendarValue = function (id, value){
	this.objPull[this.idPrefix+id].obj.firstChild.value = value;
}

/**
 * 获取工具栏上的calendar对象
 */
dhtmlXToolbarObject.prototype.getCalendarEl = function (id){
	return this.objPull[this.idPrefix+id].obj.firstChild;
}

var getMonthWeek = function (a, b, c) { 
	/* 
	a = d = 当前日期 
	b = 6 - w = 当前周的还有几天过完（不算今天） 
	a + b 的和在除以7 就是当天是当前月份的第几周 
	*/ 
	var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate(); 
	return Math.ceil( (d + 6 - w) / 7  ); 
};
var getYearWeek = function (a, b, c) { 
	/* 
	date1是当前日期 
	date2是当年第一天 
	d是当前日期是今年第多少天 
	用d + 当前年的第一天的周差距的和在除以7就是本年第几周 
	*/ 
	var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1), 
	d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000); 
	return Math.ceil( (d + ((date2.getDay() + 1) - 1)) / 7  ); 
};