/*
jQWidgets v2.6.0 (2012-Dec-27)
Copyright (c) 2011-2013 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.extend(a.jqx._jqxGrid.prototype,{selectrow:function(b,c){this._applyrowselection(b,true,c)},selectallrows:function(){this.clearselection(false);var c=this.dataview.records.length;if(c>0){for(var b=0;b<c;b++){if(b<c-1){this.selectrow(b,false)}else{this.selectrow(b,true)}}}},unselectrow:function(b,c){this._applyrowselection(b,false,c)},selectcell:function(c,b){this._applycellselection(c,b,true)},unselectcell:function(c,b){this._applycellselection(c,b,false)},clearselection:function(c){this.selectedrowindex=-1;for(var b=0;b<this.selectedrowindexes.length;b++){this._raiseEvent(3,{rowindex:this.selectedrowindexes[b]})}this.selectedrowindexes=new Array();this.selectedcells=new Array();if(!c){return}this._renderrows(this.virtualsizeinfo)},getselectedrowindex:function(){return this.selectedrowindex},getselectedrowindexes:function(){return this.selectedrowindexes},getselectedcell:function(){return this.selectedcell},getselectedcells:function(){var b=new Array();for(obj in this.selectedcells){b[b.length]=this.selectedcells[obj]}return b},_getcellsforcopypaste:function(){var e=new Array();if(this.selectionmode.indexOf("cell")==-1){var h=this.selectedrowindexes;for(var d=0;d<h.length;d++){var c=h[d];for(var f=0;f<this.columns.records.length;f++){var g=c+"_"+this.columns.records[f].datafield;var b={rowindex:c,datafield:this.columns.records[f].datafield};e.push(b)}}}return e},deleteselection:function(){var c=this;var e=c.getselectedcells();if(this.selectionmode.indexOf("cell")==-1){e=this._getcellsforcopypaste()}if(e!=null&&e.length>0){for(var d=0;d<e.length;d++){var b=e[d];var f=c.getcolumn(b.datafield);var g=c.getcellvalue(b.rowindex,b.datafield);if(g!=""){c._raiseEvent(17,{rowindex:b.rowindex,datafield:b.datafield,value:g});if(d==e.length-1){c.setcellvalue(b.rowindex,b.datafield,"",true);if(f.displayfield!=f.datafield){c.setcellvalue(b.rowindex,f.displayfield,"",true)}}else{c.setcellvalue(b.rowindex,b.datafield,"",false);if(f.displayfield!=f.datafield){c.setcellvalue(b.rowindex,f.displayfield,"",true)}}c._raiseEvent(18,{rowindex:b.rowindex,datafield:b.datafield,oldvalue:g,value:""})}}this.dataview.updateview();this._renderrows(this.virtualsizeinfo)}},copyselection:function(){var f="";var l=this;this.clipboardselection={};this._clipboardselection=[];var k=l.getselectedcells();if(this.selectionmode.indexOf("cell")==-1){k=this._getcellsforcopypaste()}if(k!=null&&k.length>0){var m=999999999999999;var j=-1;for(var d=0;d<k.length;d++){var g=k[d];var b=l.getcolumn(g.datafield);var h=l.getcellvalue(g.rowindex,g.datafield);if(!this.clipboardselection[g.rowindex]){this.clipboardselection[g.rowindex]={}}this.clipboardselection[g.rowindex][g.datafield]=h;m=Math.min(m,g.rowindex);j=Math.max(j,g.rowindex)}for(var c=m;c<=j;c++){var e=0;this._clipboardselection[this._clipboardselection.length]={};if(this.clipboardselection[c]!=undefined){a.each(this.clipboardselection[c],function(i,n){if(e>0){f+="\t"}var o=n;if(n==null){o=""}l._clipboardselection[l._clipboardselection.length-1][e]=o;e++;f+=o})}if(c<j){f+="\n"}}}this.clipboardselectedtext=f;return f},pasteselection:function(){var j=this;var i=j.getselectedcells();if(this.selectionmode.indexOf("cell")==-1){i=this._getcellsforcopypaste()}if(i!=null&&i.length>0){var h=0;var d=undefined;var f=0;for(var e=0;e<i.length;e++){var g=i[e];var c=j.getcolumn(g.datafield);if(d!=undefined){if(g.rowindex!=d){h++;f=0}}d=g.rowindex;if(j._clipboardselection[h]){var b=null;b=j._clipboardselection[h][f++];if(b!=null){j._raiseEvent(17,{rowindex:g.rowindex,datafield:g.datafield,value:b});j.setcellvalue(g.rowindex,g.datafield,b,false);j._raiseEvent(18,{rowindex:g.rowindex,datafield:g.datafield,oldvalue:j.getcellvalue(g.rowindex,g.datafield),value:b})}}}this.dataview.updateview();this._renderrows(this.virtualsizeinfo)}},_applyrowselection:function(c,b,g,e,f){if(c==null){return false}var d=this.selectedrowindex;if(this.selectionmode=="singlerow"){if(b){this._raiseEvent(2,{rowindex:c,row:this.getrowdata(c)})}else{this._raiseEvent(3,{rowindex:c,row:this.getrowdata(c)})}this._raiseEvent(3,{rowindex:d});this.selectedrowindexes=new Array();this.selectedcells=new Array()}if(e==true){this.selectedrowindexes=new Array()}var h=this.selectedrowindexes.indexOf(c);if(b){this.selectedrowindex=c;if(this.selectedrowindexes.indexOf(c)==-1){this.selectedrowindexes.push(c);if(this.selectionmode!="singlerow"){this._raiseEvent(2,{rowindex:c,row:this.getrowdata(c)})}}else{if(this.selectionmode=="multiplerows"){this.selectedrowindexes.splice(h,1);this._raiseEvent(3,{rowindex:this.selectedrowindex,row:this.getrowdata(c)});this.selectedrowindex=this.selectedrowindexes.length>0?this.selectedrowindexes[this.selectedrowindexes.length-1]:-1}}}else{if(h>=0||this.selectionmode=="singlerow"||this.selectionmode=="multiplerowsextended"){this.selectedrowindexes.splice(h,1);this._raiseEvent(3,{rowindex:this.selectedrowindex,row:this.getrowdata(c)});this.selectedrowindex=-1}}if(g==undefined||g){this._rendervisualrows()}return true},_applycellselection:function(d,i,c,h){if(d==null){return false}if(i==null){return false}var e=this.selectedrowindex;if(this.selectionmode=="singlecell"){var g=this.selectedcell;if(g!=null){this._raiseEvent(16,{rowindex:g.rowindex,datafield:g.datafield})}this.selectedcells=new Array()}if(this.selectionmode=="multiplecellsextended"||this.selectionmode=="multiplecellsadvanced"){var g=this.selectedcell;if(g!=null){this._raiseEvent(16,{rowindex:g.rowindex,datafield:g.datafield})}}var f=d+"_"+i;var b={rowindex:d,datafield:i};if(c){this.selectedcell=b;if(!this.selectedcells[f]){this.selectedcells[f]=b;this.selectedcells.length++;this._raiseEvent(15,b)}else{if(this.selectionmode=="multiplecells"){this.selectedcells[f]=undefined;this.selectedcells.length--;this._raiseEvent(16,b)}}}else{this.selectedcells[f]=undefined;this.selectedcells.length--;this._raiseEvent(16,b)}if(h==undefined||h){this._rendervisualrows()}return true},_getcellindex:function(b){var c=-1;a.each(this.selectedcells,function(){c++;if(this[b]){return false}});return c},_clearhoverstyle:function(){if(undefined==this.hoveredrow||this.hoveredrow==-1){return}if(this.vScrollInstance.isScrolling()){return}if(this.hScrollInstance.isScrolling()){return}var b=this.table.find(".jqx-grid-cell-hover");if(b.length>0){b.removeClass(this.toTP("jqx-grid-cell-hover"));b.removeClass(this.toTP("jqx-fill-state-hover"))}this.hoveredrow=-1},_clearselectstyle:function(){var k=this.table[0].rows.length;var p=this.table[0].rows;var l=this.toTP("jqx-grid-cell-selected");var c=this.toTP("jqx-fill-state-pressed");var m=this.toTP("jqx-grid-cell-hover");var h=this.toTP("jqx-fill-state-hover");for(var g=0;g<k;g++){var b=p[g];var f=b.cells.length;var o=b.cells;for(var e=0;e<f;e++){var d=o[e];var n=a(d);if(d.className.indexOf("jqx-grid-cell-selected")!=-1){n.removeClass(l);n.removeClass(c)}if(d.className.indexOf("jqx-grid-cell-hover")!=-1){n.removeClass(m);n.removeClass(h)}}}},_selectpath:function(m,e){var l=this;var i=this._lastClickedCell?Math.min(this._lastClickedCell.row,m):0;var k=this._lastClickedCell?Math.max(this._lastClickedCell.row,m):0;if(i<=k){var h=this._getcolumnindex(this._lastClickedCell.column);var g=this._getcolumnindex(e);var f=Math.min(h,g);var d=Math.max(h,g);this.selectedcells=new Array();for(var b=i;b<=k;b++){for(var j=f;j<=d;j++){this._applycellselection(b,l._getcolumnat(j).datafield,true,false)}}this._rendervisualrows()}},_selectrowpath:function(e){if(this.selectionmode=="multiplerowsextended"){var c=this;var b=this._lastClickedCell?Math.min(this._lastClickedCell.row,e):0;var f=this._lastClickedCell?Math.max(this._lastClickedCell.row,e):0;if(b<=f){this.selectedrowindexes=new Array();for(var d=b;d<=f;d++){this._applyrowselection(d,true,false)}this._rendervisualrows()}}},_selectrowwithmouse:function(n,b,c,f,d,p){var j=b.row;if(j==undefined){return}var k=b.index;var q=this.hittestinfo[k].visualrow;if(this.hittestinfo[k].details){return}var l=q.cells[0].className;if(j.group){return}if(this.selectionmode=="multiplerows"||this.selectionmode=="multiplecells"||(this.selectionmode.indexOf("multiple")!=-1&&(p==true||d==true))){var o=c.indexOf(j.boundindex)!=-1;var t=j.boundindex+"_"+f;if(this.selectionmode.indexOf("cell")!=-1){var h=this.selectedcells[t]!=undefined;if(this.selectedcells[t]!=undefined&&h){this._selectcellwithstyle(n,false,k,f,q)}else{this._selectcellwithstyle(n,true,k,f,q)}if(p&&this._lastClickedCell==undefined){var g=this.getselectedcells();if(g&&g.length>0){this._lastClickedCell={row:g[0].rowindex,column:g[0].datafield}}}if(p&&this._lastClickedCell){this._selectpath(j.boundindex,f);this.mousecaptured=false;if(this.selectionarea.css("visibility")=="visible"){this.selectionarea.css("visibility","hidden")}}}else{if(o){if(d){this._applyrowselection(j.boundindex,false)}else{this._selectrowwithstyle(n,q,false,f)}}else{this._selectrowwithstyle(n,q,true,f)}if(p&&this._lastClickedCell==undefined){var i=this.getselectedrowindexes();if(i&&i.length>0){this._lastClickedCell={row:i[0],column:f}}}if(p&&this._lastClickedCell){this.selectedrowindexes=new Array();var e=this._lastClickedCell?Math.min(this._lastClickedCell.row,j.boundindex):0;var s=this._lastClickedCell?Math.max(this._lastClickedCell.row,j.boundindex):0;for(var m=e;m<=s;m++){this._applyrowselection(m,true,false,false)}this._rendervisualrows()}}}else{this._clearselectstyle();this._selectrowwithstyle(n,q,true,f);if(this.selectionmode.indexOf("cell")!=-1){this._selectcellwithstyle(n,true,k,f,q)}}if(!p){this._lastClickedCell={row:j.boundindex,column:f}}},_selectcellwithstyle:function(d,c,g,f,e){var b=a(e.cells[d._getcolumnindex(f)]);b.removeClass(this.toTP("jqx-grid-cell-hover"));b.removeClass(this.toTP("jqx-fill-state-hover"));if(c){b.addClass(this.toTP("jqx-grid-cell-selected"));b.addClass(this.toTP("jqx-fill-state-pressed"))}else{b.removeClass(this.toTP("jqx-grid-cell-selected"));b.removeClass(this.toTP("jqx-fill-state-pressed"))}},_selectrowwithstyle:function(e,h,b,j){var c=h.cells.length;var f=0;if(e.rowdetails&&e.showrowdetailscolumn){f=1}for(var g=f;g<c;g++){var d=h.cells[g];if(b){a(d).removeClass(this.toTP("jqx-grid-cell-hover"));a(d).removeClass(this.toTP("jqx-fill-state-hover"));if(e.selectionmode.indexOf("cell")==-1){a(d).addClass(this.toTP("jqx-grid-cell-selected"));a(d).addClass(this.toTP("jqx-fill-state-pressed"))}}else{a(d).removeClass(this.toTP("jqx-grid-cell-hover"));a(d).removeClass(this.toTP("jqx-grid-cell-selected"));a(d).removeClass(this.toTP("jqx-fill-state-hover"));a(d).removeClass(this.toTP("jqx-fill-state-pressed"))}}},_handlemousemoveselection:function(aa,n){if((n.selectionmode=="multiplerowsextended"||n.selectionmode=="multiplecellsextended"||n.selectionmode=="multiplecellsadvanced")&&n.mousecaptured){var Z=this.showheader?this.columnsheader.height()+2:0;var H=this._groupsheader()?this.groupsheader.height():0;var J=this.showtoolbar?this.toolbarheight:0;H+=J;var Y=this.host.offset();if(this.hasTransform){Y=a.jqx.utilities.getOffset(this.host)}var ac=this._getBodyOffset();Y.left+=ac.left;Y.top+=ac.top;var L=aa.pageX;var K=aa.pageY-H;if(Math.abs(this.mousecaptureposition.left-L)>3||Math.abs(this.mousecaptureposition.top-K)>3){var e=parseInt(this.columnsheader.offset().top);if(this.hasTransform){e=a.jqx.utilities.getOffset(this.columnsheader).top}if(L<Y.left){L=Y.left}if(L>Y.left+this.host.width()){L=Y.left+this.host.width()}var W=Y.top+Z;if(K<W){K=W+5}var I=parseInt(Math.min(n.mousecaptureposition.left,L));var f=-5+parseInt(Math.min(n.mousecaptureposition.top,K));var G=parseInt(Math.abs(n.mousecaptureposition.left-L));var O=parseInt(Math.abs(n.mousecaptureposition.top-K));I-=Y.left;f-=Y.top;this.selectionarea.css("visibility","visible");if(n.selectionmode=="multiplecellsadvanced"){var L=I;var s=L+G;var F=L;var m=n.hScrollInstance;var u=m.value;var g=n.table[0].rows[0];var S=0;var A=n.mousecaptureposition.clickedcell;var z=A;var l=false;var o=0;var ab=g.cells.length;if(n.mousecaptureposition.left<=aa.pageX){o=A}for(var V=o;V<ab;V++){var X=parseInt(a(this.columnsrow[0].cells[V]).css("left"));var h=X-u;if(n.columns.records[V].pinned){h=X;continue}var N=this._getcolumnat(V);if(N!=null&&N.hidden){continue}if(n.groupable&&n.groups.length>0){if(V<n.groups.length){continue}}var R=h+a(this.columnsrow[0].cells[V]).width();if(n.mousecaptureposition.left>aa.pageX){if(R>=L&&L>=h){z=V;l=true;break}}else{if(R>=s&&s>=h){z=V;l=true;break}}}if(!l){if(n.mousecaptureposition.left>aa.pageX){a.each(this.columns.records,function(i,k){if(n.groupable&&n.groups.length>0){if(i<n.groups.length){return true}}if(!this.pinned&&!this.hidden){z=i;return false}})}else{if(!n.groupable||(n.groupable&&!n.groups.length>0)){z=g.cells.length-1}}}var M=A;A=Math.min(A,z);z=Math.max(M,z);f+=5;f+=H;var Q=n.table[0].rows.indexOf(n.mousecaptureposition.clickedrow);var v=0;var d=-1;var t=-1;var c=0;for(var V=0;V<n.table[0].rows.length;V++){var r=a(n.table[0].rows[V]);if(V==0){c=r.offset().top}var E=r.height();var w=c-Y.top;if(d==-1&&w+E>=f){var b=false;for(var P=0;P<n.groups.length;P++){var U=r[0].cells[P].className;if(U.indexOf("jqx-grid-group-collapse")!=-1||U.indexOf("jqx-grid-group-expand")!=-1){b=true;break}}if(b){continue}d=V}c+=E;if(n.groupable&&n.groups.length>0){var b=false;for(var P=0;P<n.groups.length;P++){var U=r[0].cells[P].className;if(U.indexOf("jqx-grid-group-collapse")!=-1||U.indexOf("jqx-grid-group-expand")!=-1){b=true;break}}if(b){continue}var S=0;for(var T=n.groups.length;T<r[0].cells.length;T++){var D=r[0].cells[T];if(a(D).html()==""){S++}}if(S==r[0].cells.length-n.groups.length){continue}}if(d!=-1){v+=E}if(w+E>f+O){t=V;break}}if(d!=-1){f=a(n.table[0].rows[d]).offset().top-Y.top-H-2;var C=0;if(this.filterable&&this.showfilterrow){C=this.filterrowheight}if(parseInt(n.table[0].style.top)<0&&f<this.rowsheight+C){f-=parseInt(n.table[0].style.top);v+=parseInt(n.table[0].style.top)}O=v;var j=a(this.columnsrow[0].cells[A]);var B=a(this.columnsrow[0].cells[z]);I=parseInt(j.css("left"));G=parseInt(B.css("left"))-parseInt(I)+B.width()-2;I-=u;if(n.editcell&&n.editable&&n.endcelledit&&(A!=z||d!=t)){n.endcelledit(n.editcell.row,n.editcell.column,true,true)}}}this.selectionarea.width(G);this.selectionarea.height(O);this.selectionarea.css("left",I);this.selectionarea.css("top",f)}}},_handlemouseupselection:function(u,o){if(this.selectionarea.css("visibility")!="visible"){o.mousecaptured=false;return true}if(o.mousecaptured&&(o.selectionmode=="multiplerowsextended"||o.selectionmode=="multiplecellsextended"||o.selectionmode=="multiplecellsadvanced")){o.mousecaptured=false;if(this.selectionarea.css("visibility")=="visible"){this.selectionarea.css("visibility","hidden");var w=this.showheader?this.columnsheader.height()+2:0;var p=this._groupsheader()?this.groupsheader.height():0;var B=this.showtoolbar?this.toolbarheight:0;p+=B;var C=this.selectionarea.offset();var c=this.host.offset();if(this.hasTransform){c=a.jqx.utilities.getOffset(this.host);C=a.jqx.utilities.getOffset(this.selectionarea)}var n=C.left-c.left;var k=C.top-w-c.top-p;var s=k;var g=n+this.selectionarea.width();var D=n;var l=new Array();var e=new Array();if(o.selectionmode=="multiplerowsextended"){while(k<s+this.selectionarea.height()){var b=this._hittestrow(n,k);var f=b.row;var h=b.index;if(h!=-1){if(!e[h]){e[h]=true;l[l.length]=b}}k+=20}var s=0;a.each(l,function(){var i=this;var m=this.row;if(o.selectionmode!="none"&&o._selectrowwithmouse){if(u.ctrlKey){o._applyrowselection(m.boundindex,true,false,false)}else{if(s==0){o._applyrowselection(m.boundindex,true,false,true)}else{o._applyrowselection(m.boundindex,true,false,false)}}s++}})}else{if(o.selectionmode=="multiplecellsadvanced"){k+=2}var r=o.hScrollInstance;var t=r.value;var q=o.table[0].rows[0];var j=o.selectionarea.height();if(!u.ctrlKey&&j>0){o.selectedcells=new Array()}var A=j;while(k<s+A){var b=o._hittestrow(n,k);var f=b.row;var h=b.index;if(h!=-1){if(!e[h]){e[h]=true;for(var v=0;v<q.cells.length;v++){var d=parseInt(a(o.columnsrow[0].cells[v]).css("left"))-t;var z=d+a(o.columnsrow[0].cells[v]).width();if((D>=d&&D<=z)||(g>=d&&g<=z)||(d>=D&&d<=g)){o._applycellselection(f.boundindex,o._getcolumnat(v).datafield,true,false)}}}}k+=5}}if(o.autosavestate){if(o.savestate){o.savestate()}}o._renderrows(o.virtualsizeinfo)}}},selectprevcell:function(e,c){var f=this._getcolumnindex(c);var b=this.columns.records.length;var d=this._getprevvisiblecolumn(f);if(d!=null){this.clearselection();this.selectcell(e,d.datafield)}},selectnextcell:function(e,d){var f=this._getcolumnindex(d);var c=this.columns.records.length;var b=this._getnextvisiblecolumn(f);if(b!=null){this.clearselection();this.selectcell(e,b.datafield)}},_getfirstvisiblecolumn:function(){var b=this;var e=this.columns.records.length;for(var c=0;c<e;c++){var d=this.columns.records[c];if(!d.hidden&&d.datafield!=null){return d}}return null},_getlastvisiblecolumn:function(){var b=this;var e=this.columns.records.length;for(var c=e-1;c>=0;c--){var d=this.columns.records[c];if(!d.hidden&&d.datafield!=null){return d}}return null},_handlekeydown:function(v,o){var A=v.charCode?v.charCode:v.keyCode?v.keyCode:0;if(o.editcell&&o.selectionmode!="multiplecellsadvanced"){return true}else{if(o.editcell&&o.selectionmode=="multiplecellsadvanced"){if(A>=33&&A<=40){if(!v.altKey){if(o._cancelkeydown==undefined||o._cancelkeydown==false){o.endcelledit(o.editcell.row,o.editcell.column,false,true);o._cancelkeydown=false}else{o._cancelkeydown=false;return true}}else{o._cancelkeydown=false;return true}}else{return true}}}if(o.selectionmode=="none"){return true}if(o.showfilterrow&&o.filterable){if(this.filterrow){if(a(v.target).ischildof(this.filterrow)){return true}}}if(o.pageable){if(a(v.target).ischildof(this.pager)){return true}}if(this.showtoolbar){if(a(v.target).ischildof(this.toolbar)){return true}}if(this.showstatusbar){if(a(v.target).ischildof(this.statusbar)){return true}}var n=false;if(v.altKey){return true}if(v.ctrlKey){if(this.clipboard){var b=String.fromCharCode(A).toLowerCase();if(b=="c"||b=="x"){var m=this.copyselection();if(window.clipboardData){window.clipboardData.setData("Text",m)}}else{if(b=="v"){this.pasteselection()}}if(b=="x"){this.deleteselection()}}}var j=Math.round(o._gettableheight());var t=Math.round(j/o.rowsheight);var f=o.getdatainformation();switch(o.selectionmode){case"singlecell":case"multiplecells":case"multiplecellsextended":case"multiplecellsadvanced":var B=o.getselectedcell();if(B!=null){var e=this.getrowvisibleindex(B.rowindex);var h=e;var l=B.datafield;var q=o._getcolumnindex(l);var c=o.columns.records.length;var r=function(F,D,E){var C=function(J,G){var I=o.dataview.loadedrecords[J];if(I!=undefined&&G!=null){if(E||E==undefined){o.clearselection()}var H=I.boundindex;o.selectcell(H,G);o._oldselectedcell=o.selectedcell;n=true;o.ensurecellvisible(J,G);return true}return false};if(!C(F,D)){o.ensurecellvisible(F,D);C(F,D);if(o.virtualmode){o.host.focus()}}if(v.shiftKey&&A!=9){if(o.selectionmode=="multiplecellsextended"||o.selectionmode=="multiplecellsadvanced"){if(o._lastClickedCell){o._selectpath(F,D);o.selectedcell={rowindex:F,datafield:D};return}}}else{if(!v.shiftKey){o._lastClickedCell={row:F,column:D}}}};var w=v.shiftKey&&o.selectionmode!="singlecell"&&o.selectionmode!="multiplecells";var x=function(){r(0,l,!w)};var g=function(){var C=f.rowscount-1;r(C,l,!w)};var d=A==9&&!v.shiftKey;var i=A==9&&v.shiftKey;if(d||i){w=false}var k=v.ctrlKey;if(k&&A==37){var z=o._getfirstvisiblecolumn(q);if(z!=null){r(h,z.datafield)}}else{if(k&&A==39){var p=o._getlastvisiblecolumn(q);if(p!=null){r(h,p.datafield)}}else{if(A==39||d){var s=o._getnextvisiblecolumn(q);if(s!=null){r(h,s.datafield,!w)}else{if(!d){n=true}}}else{if(A==37||i){var z=o._getprevvisiblecolumn(q);if(z!=null){r(h,z.datafield,!w)}else{if(!i){n=true}}}else{if(A==36){x()}else{if(A==35){g()}else{if(A==33){if(h-t>=0){var y=h-t;r(y,l,!w)}else{x()}}else{if(A==34){if(f.rowscount>h+t){var y=h+t;r(y,l,!w)}else{g()}}else{if(A==38){if(k){x()}else{if(h>0){r(h-1,l,!w)}else{n=true}}}else{if(A==40){if(k){g()}else{if(f.rowscount>h+1){r(h+1,l,!w)}else{n=true}}}}}}}}}}}}}break;case"singlerow":case"multiplerows":case"multiplerowsextended":var h=o.getselectedrowindex();if(h==null||h==-1){return true}h=this.getrowvisibleindex(h);var u=function(D,E){var C=function(H){var J=o.dataview.loadedrecords[H];if(J!=undefined){var I=J.boundindex;var G=o.selectedrowindex;if(E||E==undefined){o.clearselection()}o.selectedrowindex=G;o.selectrow(I,false);var F=o.ensurerowvisible(H);if(!F){o._rendervisualrows()}n=true;return true}return false};if(!C(D)){o.ensurerowvisible(D);C(D,E);if(o.virtualmode){o.host.focus()}}if(v.shiftKey&&A!=9){if(o.selectionmode=="multiplerowsextended"){if(o._lastClickedCell){o._selectrowpath(D);o.selectedrowindex=D;return}}}else{if(!v.shiftKey){o._lastClickedCell={row:D}}}};var w=v.shiftKey&&o.selectionmode!="singlerow"&&o.selectionmode!="multiplerows";var x=function(){u(0,!w)};var g=function(){var C=f.rowscount-1;u(C,!w)};var k=v.ctrlKey;if(A==36||(k&&A==38)){x()}else{if(A==35||(k&&A==40)){g()}else{if(A==33){if(h-t>=0){var y=h-t;u(y,!w)}else{x()}}else{if(A==34){if(f.rowscount>h+t){var y=h+t;u(y,!w)}else{g()}}else{if(A==38){if(h>0){u(h-1,!w)}else{n=true}}else{if(A==40){if(f.rowscount>h+1){u(h+1,!w)}else{n=true}}}}}}}break}if(n){if(o.autosavestate){if(o.savestate){o.savestate()}}if(o.editcell!=null&&o.endcelledit){o.endcelledit(o.editcell.row,o.editcell.column,true,true)}return false}return true},_handlemousemove:function(s,n){if(n.vScrollInstance.isScrolling()){return}if(n.hScrollInstance.isScrolling()){return}var u;var o;var e;var m;var l;if(n.enablehover||n.selectionmode=="multiplerows"){u=this.showheader?this.columnsheader.height()+2:0;o=this._groupsheader()?this.groupsheader.height():0;var w=this.showtoolbar?this.toolbarheight:0;o+=w;e=this.host.offset();if(this.hasTransform){e=a.jqx.utilities.getOffset(this.host)}var j=this._getBodyOffset();e.left+=j.left;e.top+=j.top;m=s.pageX-e.left;l=s.pageY-u-e.top-o}if(n.selectionmode=="multiplerowsextended"||n.selectionmode=="multiplecellsextended"||n.selectionmode=="multiplecellsadvanced"){if(n.mousecaptured==true){return}}if(n.enablehover){if(n.disabled){return}if(this.vScrollInstance.isScrolling()||this.hScrollInstance.isScrolling()){return}var c=this._hittestrow(m,l);if(!c){return}var g=c.row;var h=c.index;if(this.hoveredrow!=-1&&h!=-1&&this.hoveredrow==h&&this.selectionmode.indexOf("cell")==-1){return}this._clearhoverstyle();if(h==-1||g==undefined){return}var p=this.hittestinfo[h].visualrow;if(p==null){return}if(this.hittestinfo[h].details){return}if(s.clientX>a(p).width()+a(p).offset().left){return}var z=0;if(n.rowdetails&&n.showrowdetailscolumn){z=1}if(p.cells.length==0){return}var k=p.cells[z].className;if(g.group||k.indexOf("jqx-grid-cell-selected")!=-1){return}this.hoveredrow=h;if(this.selectionmode.indexOf("cell")!=-1){var d=-1;var q=this.hScrollInstance;var r=q.value;for(var t=0;t<p.cells.length;t++){var f=parseInt(a(this.columnsrow[0].cells[t]).css("left"))-r;var v=f+a(this.columnsrow[0].cells[t]).width();if(v>=m&&m>=f){d=t;break}}if(d!=-1){var b=p.cells[d];if(b.className.indexOf("jqx-grid-cell-selected")==-1){if(b.className.indexOf("jqx-grid-group")==-1){a(b).addClass(this.toTP("jqx-grid-cell-hover"));a(b).addClass(this.toTP("jqx-fill-state-hover"))}}}return}for(var t=z;t<p.cells.length;t++){var b=p.cells[t];if(b.className.indexOf("jqx-grid-group")==-1){a(b).addClass(this.toTP("jqx-grid-cell-hover"));a(b).addClass(this.toTP("jqx-fill-state-hover"))}}}else{return true}}})})(jQuery);