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

/**
 * 去除str空格
 * @param {Object} str
 */

function trim(str){   
    str = str.replace(/^(\s|\u00A0)+/,'');   
    for(var i=str.length-1; i>=0; i--){   
        if(/\S/.test(str.charAt(i))){   
            str = str.substring(0, i+1);   
            break;   
        }   
    }   
    return str;   
} 

/**
 * 检索字字符串是否以某个str开始
 * @param {Object} str
 */
String.prototype.startsWith = function(str){
		return this.indexOf(str,0) == 0;	
}

/**
 * 打开窗口，窗口中显示为url地址对应的页面
 */
function showURLWindow(title, url, w, h, _backFun){
    var _dhxWins = new dhtmlXWindows();
    var _reportWinUrl = _dhxWins.createWindow({
        id: "reportWin",
        caption: '',
        x: 20,
        y: 30,
        width: w ? w : 600,
        height: h ? h : 400,
        center: true,
        modal: true,
        onClose: function(){
            _reportWinUrl.setModal(false)
            _reportWinUrl.hide()
            if (_backFun) {
                _backFun.call()
            }
        }
    });
    _reportWinUrl.setModal(true);
    _reportWinUrl.setText(title);
    var _winLayout = _reportWinUrl.attachLayout("1C")
    var _winA = _winLayout.cells('a');
    _winA.hideHeader();
    _winA.attachURL(url, false);
    _reportWinUrl.show();
    return _reportWinUrl;
}

var vaultWin ;
function showVault(fileId, fileType, editable, title, w, h, _mainBackFun,allowedFileType,excludedFileType,file_souce,is_compress) {
	if(!vaultWin){
		var dhxWins = new dhtmlXWindows();
	    vaultWin = dhxWins.createWindow({
	        id: "vaultWin",
	        caption: title ||'文件管理',
	        x: 20,
	        y: 30,
	        width: w ? w : 550,
	        height: h ? h : 320,
	        center: true,
	        modal: true,
	        onClose: function(){
	            vaultWin.setModal(false)
	            vaultWin.hide()
	            if (_mainBackFun) {
	                _mainBackFun.call()
	            }
	        }
	    });
	}
	var url = path + "/admin/common/fileManage/index.do?bid="+fileId+"&btype="+fileType+"&editable="+editable ;
	if(allowedFileType){
		url += "&allowedFileType="+allowedFileType ;
	}
	if(excludedFileType){
		url += "&excludedFileType="+excludedFileType ;
	}
	if(file_souce){
		url += "&fileSouce="+file_souce ;
	}
	if(is_compress){
		url += "&isCompress="+is_compress ;
	}
	vaultWin.show();
	vaultWin.attachURL(url);
}
