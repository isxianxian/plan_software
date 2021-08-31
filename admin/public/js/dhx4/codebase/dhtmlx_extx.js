 /**
	  * 超链接调用方法，通过此方法转入到具体方法中
	  */
	 function _linkCallFun() {
	 	var numargs = arguments.length; // 获取被传递参数的个数
	 	if(numargs>1) { //正常函数调用
	 		var obj = arguments[numargs-2] ;
	 		var _grid=obj.parentElement.parentElement.grid;
	 		if(_grid!=null){
	 			_grid.selectRowById(obj.parentElement.parentElement.idd,true,true,true);
	 		}
	 		var funName = arguments[numargs-1] ;
	 		for(var i=0;i<numargs-2;i++){
	 			arguments[i]=decodeURIComponent(arguments[i]) 
	 		}
	 		if (this[funName]) return this[funName].apply(this, arguments);
	 	}
	 }