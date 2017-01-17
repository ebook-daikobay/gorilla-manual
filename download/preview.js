/*
 Copyright 2015 AXELL Corporation.
 H2MD Player JavaScript Library
 version 1.1.1
*/

	//再生中のH2MD
	var h2md_list=new Array();
	
	//H2MDに供給するBase64データ
	var h2md_file_base64=new Object();

	//H2MDからのデータリクエスト
	function request_callback(url,callback){
		var keys = Object.keys(h2md_file_base64);
		for( var i=0, l=keys.length; i<l; i+=1) {
			if(keys[i]==url){
				var data=h2md_file_base64[keys[i]];
				callback(data);
				return;
			}
		}
		console.log(""+url+" not found");
	}

	//ファイルドロップ
	var load_cnt;
	var target_load_cnt;

	function handleFileSelect(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		release_h2md();

		var files = evt.dataTransfer.files;

		load_cnt=0;
		target_load_cnt=files.length;

		var save_title=document.title;

		for (var i = 0;i<files.length;i++){
			var f=files[i];

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					var name=theFile.name;
					var data=e.target.result;
					
					//jsonpの素材が入力された場合b64に変換
					if(name.match(/js$/)){
						var matched=data.match(/H2MD.jsonpCallback\({\".*\":\"(.*)\"}\)/);
						if(matched){
							data=matched[1];
							name=name.replace(/js$/,"b64");
						}
					}
					
					h2md_file_base64[name]=data;
					load_cnt++;

					document.title="Loading "+load_cnt+"/"+target_load_cnt;

					if(load_cnt>=target_load_cnt){
						document.title=save_title;
						load_complete();
					}
				};
			})(f);

			if (!f.type.match('image.*')) {
				reader.readAsText(f, "utf-8");
			}else{
				reader.readAsDataURL(f);
			}
		}
	}

	//H2MDの開放
	function release_h2md(){
		for(var i=0;i<h2md_list.length;i++){
			if(h2md_list[i]){
				h2md_list[i].stop();
			}
		}
		document.getElementById("list").innerHTML="";
		h2md_list=new Array();
		h2md_file_base64=new Object();
	}
	
	//進捗状況の描画
	var PROGRESS_HEIGHT=20;

	function draw_progress(h2md,path,can,prog){
		var c=h2md.position().current_frame;
		var b=h2md.position().buffered_frame;
		var j=h2md.position().frames;

		var ctx=prog.getContext("2d");

		ctx.clearRect(0,0,can.width,can.height);
		ctx.strokeStyle = 'rgb(255, 255, 255)';

		ctx.beginPath();
		ctx.fillStyle = 'rgb(128, 128, 128)';
		ctx.rect(0,0,can.width,can.height);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = 'rgb(192,192,192)';
		ctx.rect(0,0,(b*can.width/j),can.height);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.rect(0,0,(c*can.width/j),can.height);
		ctx.fill();

		ctx.stroke();
	}
	
	//H2MDの開始
	function load_complete(){
		var keys = Object.keys(h2md_file_base64);
		for( var i=0, l=keys.length; i<l; i+=1) {
			if(keys[i].match(".s00000000.b64$")){
				var list=keys[i].split(".s00000000");
				var path=list[0];

				var h2md=new H2MD();

				var container = document.createElement('div');
				container.id = "container_"+path;
				
				var child=document.getElementById("list").appendChild(container);

				var canv = document.createElement('canvas');
				canv.id = path;
				canv.addEventListener("click", function(h2md){ return function(){
					if(h2md.playing()){
						h2md.pause();
					}else{
						h2md.play();
					}
				}}(h2md), false);
				child.appendChild(canv);
				
				var prog = document.createElement('canvas');
				prog.id = "prog_"+path;
				prog.addEventListener("click", function(h2md,event){
					var rect = event.target.getBoundingClientRect() ;
					var x = event.clientX - rect.left;
					var y = event.clientY - rect.top;
					h2md.seek(Math.floor(x/prog.width*h2md.info().frames));
					h2md.play();
				}.bind(this,h2md), false);
				child.appendChild(prog);

				h2md.request(request_callback);
				if(!location.href.match("progressive")){
					h2md.streaming(true);
				}
				h2md.error(function(error) { alert(error); });
				h2md.open(path,function(path,h2md,can,prog){ 
					document.getElementById("container_"+path).style.width=h2md.info().width;

					can.width=h2md.info().width;
					can.height=h2md.info().height;
					
					prog.width=h2md.info().width;
					prog.height=PROGRESS_HEIGHT;
					
					h2md.canvas(path);
					h2md.loop(0);
					h2md.play();
					h2md.timeupdate(draw_progress.bind(this,h2md,path,can,prog));
				}.bind(this,path,h2md,canv,prog));
				h2md_list.push(h2md);
			}
		}
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';
	}

	//イベント登録
	document.addEventListener('dragover', handleDragOver, false);
	document.addEventListener('drop', handleFileSelect, false);
