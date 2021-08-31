dhtmlXForm.prototype.items.ueditor = {editor:{}, render:function (item, data) {
	var ta = (!isNaN(data.rows));
	item._type = "editor";
	item._enabled = true;
	this.doAddLabel(item, data);
	this.doAddInput(item, data, "DIV", null, true, true, "dhxlist_item_template");
	item._value = (data.value || "");
	item.childNodes[1].childNodes[0].className += " dhxeditor_inside";
	item._v_f = (data.valueFormat||"")
	var that = this;
	item.editorId = item.childNodes[1].childNodes[0].id
	var _ue_config = {
    autoHeight: false,
    toolbars: [
    ['fullscreen', 'source', 'undo', 'redo'],
    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
	]
	}
	if(data.ue_config){
		UE.utils.extend(_ue_config, data.ue_config)
	}
	this.editor[item._idd] = UE.getEditor(item.editorId, _ue_config);

	this.editor[item._idd].ready(function() {
		that.editor[item._idd].setContent(item._value);
		
	})
	/*
	UE.getEditor(item.editorId).attachEvent("onAccess", function (t, ev) {
		_dhxForm_doClick(document.body, "click");
		if (t == "blur") {
			that.doOnBlur(item, this);
		}
		item.callEvent("onEditorAccess", [item._idd, t, ev, this, item.getForm()]);
	});
	UE.getEditor(item.editorId).attachEvent("onToolbarClick", function (a) {
		item.callEvent("onEditorToolbarClick", [item._idd, a, this, item.getForm()]);
	});
	item.childNodes[0].childNodes[0].removeAttribute("for");
	*/
	item.childNodes[0].childNodes[0].onclick = function () {
		UE.getEditor(item.editorId).focus();
	};
	
	return this;
}, doOnBlur:function (item, editor) {
	var t = editor.getContent();
	if (item._value != t) {
		if (item.checkEvent("onBeforeChange")) {
			if (item.callEvent("onBeforeChange", [item._idd, item._value, t]) !== true) {
				editor.setContent(item._value);
				return;
			}
		}
		item._value = t;
		item.callEvent("onChange", [item._idd, t]);
	}
}, setValue:function (item, value) {
	if (item._value == value) {
		return;
	}
	item._value = value;
	UE.getEditor(item.editorId).setContent(item._value);
}, getValue:function (item) {
	item._value = UE.getEditor(item.editorId).getContent();
	return item._value;
	//return item._value.replace(new RegExp("\\r|\\n", "gi"),"<br>");;
}, enable:function (item) {
	var ue = this.editor[item._idd]
	ue.ready(function() {
		ue.setEnabled();
	})
	this.doEn(item);
}, disable:function (item) {
	UE.getEditor(item.editorId).setDisabled('fullscreen');
	this.doDis(item);
}, getUEditor:function (item) {
	return (UE.getEditor(item.editorId) || null);
}, destruct:function (item) {
	try{
		item.childNodes[0].childNodes[0].onclick = null;
		UE.getEditor(item.editorId).destroy();
		this.editor[item._idd] = null;
		this.d2(item);
		item = null;
	}catch(e){}
}, setFocus:function (item) {
	UE.getEditor(item.editorId)._focus();
}};
(function () {
	for (var a in {doAddLabel:1, doAddInput:1, doUnloadNestedLists:1, setText:1, getText:1, setWidth:1}) {
		dhtmlXForm.prototype.items.ueditor[a] = dhtmlXForm.prototype.items.template[a];
	}
})();
dhtmlXForm.prototype.items.ueditor.d2 = dhtmlXForm.prototype.items.select.destruct;
dhtmlXForm.prototype.items.ueditor.doEn = dhtmlXForm.prototype.items.select.enable;
dhtmlXForm.prototype.items.ueditor.doDis = dhtmlXForm.prototype.items.select.disable;
dhtmlXForm.prototype.getUEditor = function (name) {
	return this.doWithItem(name, "getUEditor");
};