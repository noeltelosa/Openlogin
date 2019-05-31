var $j=jQuery.noConflict();Highcharts.theme={colors:["#4572A7"]};var highchartsOptions=Highcharts.getOptions();Highcharts.setOptions({credits:{enabled:false}});$j(document).ready(function(){var j="";var b=null;var c=new Object();var i=0;var g=-1;var h=$j("#lm-subfilters");var e=$j("#div-filter-products");var d=$j("#div-filter-features");var f=$j("#div-filter-users");function a(){c=new Object();$j("#results").empty();$j("#productsList").empty();$j("#featuresList").empty();$j("#usersList").empty();$j("#products").val("");$j("#features").val("");$j("#users").val("");$j("#breadcrumb").empty();j=$j("#primaryView").val();$j("#breadcrumb").append('<ul><li><a href="/LicenseMonitor/index.htm">Home</a></li><li>'+j+"</li></ul>");b=null;var k=null;$j("#current_view").empty();$j("#current_view").append(j);$j(".filters-menu").attr("style","display: block;");h.addClass("hidden");if(j=="Product"){e.removeClass("hidden");d.addClass("hidden");f.addClass("hidden");$j("#primary-filter").append(e);$j("#productsFilter").removeAttr("multiple");$j("#filter-products").addClass("active");$j("#filter-features").removeAttr("class");$j("#filter-users").removeAttr("class");$j("#products").focus();k=$j("#productsFilter").val();$j.getRecentCheckouts(20);}else{if(j=="Feature Name"){e.addClass("hidden");d.removeClass("hidden");f.addClass("hidden");$j("#primary-filter").append(d);$j("#featuresFilter").removeAttr("multiple");$j("#filter-features").addClass("active");$j("#filter-products").removeAttr("class");$j("#filter-users").removeAttr("class");$j("#features").focus();k=$j("#featuresFilter").val();$j.getMaxUtilization(20);}else{if(j=="User"){e.addClass("hidden");d.addClass("hidden");f.removeClass("hidden");$j("#primary-filter").append(f);$j("#usersFilter").removeAttr("multiple");$j("#filter-users").addClass("active");$j("#filter-products").removeAttr("class");$j("#filter-features").removeAttr("class");$j("#users").focus();k=$j("#usersFilter").val();$j("#results").empty();$j.getMaxUsers(20);}else{$j.getRecentCheckouts(10);$j.getMaxUtilization(10);$j.getMaxUsers(10);g=-1;$j(".filters-menu","#lm-filternavigation").attr("style","display: none;");}}}if(b!=k){b=k;$j.serverSide();}}$j("#primaryView").change(function(){a();});jQuery.extend({alterTablesorter:function(k){$j(".tl_"+k+" table.thirdlayer.tablesorter").tablesorter({textExtraction:{2:function(m){var l=$j(m).text();var n=$j(m).find("div").attr("title");return(n!=undefined)?n:l;}}});},getSelectedItem:function(){if(j=="Product"){selectedItem=$j("#productsFilter").val();}else{if(j=="Feature Name"){selectedItem=$j("#featuresFilter").val();}else{if(j=="User"){selectedItem=$j("#usersFilter").val();}}}if(b!=selectedItem){b=selectedItem;$j.serverSide();}},showFilters:function(){h.removeClass("hidden");if(j=="Product"){d.removeClass("hidden");f.removeClass("hidden");h.append(d);h.append(f);}else{if(j=="Feature Name"){e.removeClass("hidden");f.removeClass("hidden");h.append(e);h.append(f);}else{if(j=="User"){e.removeClass("hidden");d.removeClass("hidden");h.append(e);h.append(d);}}}},checkoutData:function(q){var s=(q.CheckoutTime).split("T");var p=new Date().getTime();var m=s[0].replace(/-/g,"/");var k=new Date(m+" "+s[1]+" +00");var n=k.getFullYear()+"-"+$j.padnumber(k.getMonth()+1)+"-"+$j.padnumber(k.getDate());var o=$j.padnumber(k.getHours())+":"+$j.padnumber(k.getMinutes())+":"+$j.padnumber(k.getSeconds());var l=Date.parse(k);var r=p-l;var u="";var t=$j(document.createElement("div"));if(r>1000){if(Math.floor(r/86400000)>0){u=Math.floor(r/86400000)+"d";if((Math.floor((r%86400000)/3600000)>0)||(Math.floor((r%3600000)/60000)>0)){u=u+", ";}}if(Math.floor((r%86400000)/3600000)>0){u=u+Math.floor((r%86400000)/3600000)+"h";if(Math.floor((r%3600000)/60000)>0){u=u+", ";}}if(Math.floor((r%3600000)/60000)>0){u=u+Math.floor((r%3600000)/60000)+"m";}}else{"Just now.";}t.text(u).attr("title",n+" "+o);return t;},addSlashes:function(k){k=k.replace(/\\/g,"\\\\");k=k.replace(/\'/g,"\\'");k=k.replace(/\"/g,'\\"');k=k.replace(/\0/g,"\\0");return k;},padnumber:function(k){if(k<10){return("0"+k);}else{return k;}},userBadge:function(k){var l=$j(document.createElement("div")).attr("id","userbadge").tooltip({bodyHandler:function(){return'<dl><dt class="username">'+k.UserName+'</dt><div class="userdata"><dd><label>Full name:</label> '+k.FullName+"</dd><dd><label>E-mail:</label> "+k.Email+"</dd><dd><label>Title:</label> "+k.Title+"</dd><dd><label>Division:</label> "+k.Division+"</dd><dd><label>Location:</label> "+k.Location+"</dd></div></dl>";}});return l.prepend('<img src="/Content/Icons/id_card16.png" border="0">');},createHashDiv:function(){var k=function(){return(((1+Math.random())*65536)|0).toString(16).substring(1);};return $j(document.createElement("div")).attr("id","popup_"+k()+k()+"-"+k()+"-"+k()+"-"+k()+"-"+k()+k()+k());},popupDiv:function(){var k=$j.createHashDiv();$j("#subcontents").append(k);$j(k).dialog({minWidth:960,modal:true,close:function(l,m){$j(k).remove();}});return k;},historyDiv:function(l,k){historyDiv=$j.createHashDiv().append('<div id="chart" />').appendTo("#subcontents");$j.getJSON("/licensemonitor/getHistory.htm",{product:l,feature:k,callback:"?"},function(m){var n=new Highcharts.StockChart({chart:{renderTo:"chart",alignTicks:true,height:400},rangeSelector:{buttons:[{type:"week",count:1,text:"W"},{type:"month",count:1,text:"M"},{type:"month",count:3,text:"Q"},{type:"year",count:1,text:"Y"},{type:"all",text:"All"}],selected:1,inputEnabled:false},title:{text:k},subtitle:{text:l},xAxis:{maxZoom:7*24*3600000},tooltip:{yDecimals:2},series:m});});historyDiv.dialog({width:798,height:448,minWidth:400,minHeight:250,modal:true,resizable:false,close:function(m,n){historyDiv.remove();}});},escapeIllegalCharacter:function(l){var k=l.replace(/([?\\#;&,.+*~\':"!^$[\]()=>|\/\ ])/g,"\\$1");return k;},toSafeName:function(k){var l=k.replace(/[,]/g,"-_").replace(/[;]/g,"_-").toLowerCase().replace(/[^a-z0-9-_]/g,"__");return l;},clearerDiv:function(){var k=$j(document.createElement("div")).addClass("clearer");return k;},getUserView:function(k,l){$j.ajaxSetup({cache:false});$j.getJSON("/licensemonitor/getUserView.htm",{type:"Users",item:k},function(m){var r;var q;var n=$j.toSafeName(m.UserName);var p=$j(document.createElement("div")).addClass("firstlayerlabel").text(m.UserName);if(m.FullName!=null&&m.FullName!=""){p.append($j.userBadge(m));}var o=$j(document.createElement("div")).addClass("firstlayer").attr("id",n).append(p);var s=$j(document.createElement("div")).addClass("userview").attr("id","userview-"+m.UserName).append(o);$j(l).append(s);$j.each(m.ProductsList,function(x,z){var D=$j.toSafeName(z.ProductName+"-"+m.UserName);var F=$j(document.createElement("a")).addClass("secondlayerlabel").attr("id",D).text(z.ProductName);var u=$j.toSafeName(m.UserName+z.ProductName);var A=$j.toSafeName(z.ProductName);var E=$j(document.createElement("div")).addClass("secondlayer").addClass(u).addClass(z.Mapping).addClass(A).append(F).append($j.clearerDiv());$j("#"+n).append($j(E));var I=$j(document.createElement("thead"));var H=$j(document.createElement("tbody"));var v=$j(document.createElement("th")).text("Feature Name");var w=$j(document.createElement("th")).text("Hostname");var t=$j(document.createElement("th")).text("Checkout Time");var y=$j(document.createElement("th")).text("Licenses");var G=$j(document.createElement("th")).text("Statistics").attr("colspan","2");var C=$j.toSafeName(z.ProductName+"-"+m.UserName);var B=$j(document.createElement("tr")).append(v).append(w).append(t).append(y).append(G);var J=m.UserName+z.ProductName;var L=$j(document.createElement("table")).addClass("thirdlayer").addClass("list").addClass("tablesorter").attr("name",J).append(B);var K=$j(document.createElement("div")).addClass("thirdlayerTemp").addClass("tl_"+D).addClass(A).addClass("hidden");$j.each(z.FeaturesList,function(N,M){var O=(M.LicenseCountSum/M.Available)*100;if(isNaN(O)){O=0;}else{if(O>100){O=100;}}var P=(M.TotalMaxInUse/M.Available)*100;if(isNaN(P)){P=0;}else{if(P>100){P=100;}}if(M.CheckoutsList.length!=0){$j.each(M.CheckoutsList,function(W,Q){var Z=$j.toSafeName(z.ProductName+"-"+M.FeatureName);var T=$j.toSafeName(M.FeatureName);var Y=$j(document.createElement("tr")).addClass("tableRow").addClass(T);var S=$j(document.createElement("td")).text(M.FeatureName).addClass("usagelabel");var V=$j(document.createElement("td")).text(Q.Host).addClass("userhost");var R=$j(document.createElement("td")).append($j.checkoutData(Q)).addClass("usercheckout");var X=$j(document.createElement("td")).addClass("userlicense").append(M.LicenseCountSum);var ab=$j(document.createElement("a")).text("History").click(function(){$j.historyDiv(z.ProductName,M.FeatureName);});var U=$j(document.createElement("td")).addClass("historylink").append(ab);var ae=$j(document.createElement("div")).addClass("usagefigures").text(M.LicenseCountSum+"/"+M.Available);var aa=$j(document.createElement("div")).addClass("usagebar").attr("style","width: "+O+"%;").append("&nbsp;");var ac=$j(document.createElement("div")).addClass("usagebartotal").attr("style","width: "+P+"%;").append("&nbsp;");var ad=$j(document.createElement("div")).addClass("usagebarwrapper").append($j(aa)).append(ac);var af=$j(document.createElement("td")).append(ad).append(ae).addClass("usageinfo");Y.append(S).append(V).append(R).append(X).append(U).append(af);H.append(Y);});}});L.append(I).append(H).tablesorter();K.append(L).append($j.clearerDiv());$j("#"+n).append(K);});$j.ajaxSetup({cache:false});});},getProductView:function(k,l){$j.ajaxSetup({cache:false});$j.getJSON("/licensemonitor/getProductView.htm",{type:"Products",item:k},function(m){var p=$j(document.createElement("div")).addClass("firstlayerlabel").text(m.ProductName);var o=$j(document.createElement("div")).addClass("firstlayer").addClass(m.Mapping).attr("id",m.ProductName).append(p);var q=$j(document.createElement("div")).addClass("productview").attr("id","productview-"+m.ProductName).append(o);$j(l).append(q);var n=$j.escapeIllegalCharacter(m.ProductName);$j.each(m.FeaturesList,function(x,t){var A=$j.toSafeName(m.ProductName+"-"+t.FeatureName);var F=t.FeatureName.replace(/[ ]/g,"_");var N=(t.LicenseCountSum/t.Available)*100;if(isNaN(N)){N=0;}else{if(N>100){N=100;}}var M=$j(document.createElement("a")).addClass("secondlayerlabel").addClass("ubartext").attr("id",A).text(t.FeatureName);var I=$j(document.createElement("a")).text("History").click(function(){$j.historyDiv(m.ProductName,t.FeatureName);});var L=$j(document.createElement("div")).addClass("historylink").append(I);var K=$j(document.createElement("div")).addClass("usagefigures").text(t.LicenseCountSum+"/"+t.Available);var H=$j(document.createElement("div")).addClass("usagebar").attr("style","width: "+N+"%;").append("&nbsp;");var J=$j(document.createElement("div")).addClass("usagebarwrapper").append(H);var s=m.ProductName+F;var u=$j.toSafeName(t.FeatureName);var B=$j(document.createElement("div")).addClass("secondlayer").addClass(u).addClass(s).append(M).append(J).append(K).append(L).append($j.clearerDiv());$j("#"+n).append($j(B));var G=$j(document.createElement("th")).text("User Name");var w=$j(document.createElement("th")).addClass("userhostname").text("Hostname");var r=$j(document.createElement("th")).addClass("usercheckout").text("Checkout Time");var y=$j(document.createElement("th")).addClass("userlicense").text("Licenses");var z=$j(document.createElement("tr")).append(G).append(w).append(r).append(y);var D=$j(document.createElement("thead")).append(z);var C=$j(document.createElement("tbody"));var E=m.ProductName+t.FeatureName;var v=$j(document.createElement("table")).addClass("thirdlayer").addClass("list").addClass("tablesorter").attr("name",E);$j.each(t.UsersList,function(O,Q){if(Q.CheckoutsList.length!=0&&t.LicenseCountSum>0){$j.each(Q.CheckoutsList,function(U,R){var Y=$j.addSlashes(Q.UserName);var T=$j(document.createElement("td")).text(R.Host);var S=$j(document.createElement("td")).append($j.checkoutData(R));var V=$j(document.createElement("td")).text(R.LicenseCount);var X=$j(document.createElement("div"));var Z=$j(document.createElement("a")).text(Q.UserName).click(function(){$j.getUserView(Q.UserName,$j.popupDiv());});var Y=$j.addSlashes(Q.UserName);var aa=$j(document.createElement("td")).addClass("userdiv").append(X).append(Z);if(Q.FullName!=null&&Q.FullName!=""){aa.append($j.userBadge(Q));}var W=$j(document.createElement("tr")).addClass("tableRow").addClass(Q.UserName);if(R.LicenseCount==0){W=W.addClass("hidden");}W=W.append(aa).append(T).append(S).append(V);C.append(W);});}v.tablesorter().append(D).append(C);var P=$j(document.createElement("div")).addClass("thirdlayerTemp").addClass("tl_"+A).addClass("hidden").addClass(t.FeatureName).append(v).append($j.clearerDiv());$j("#"+n).append(P);});});$j.filterProduct();$j.ajaxSetup({cache:false});});},getFeatureView:function(k,l){$j.ajaxSetup({cache:false});$j.getJSON("/licensemonitor/getFeatureView.htm",{type:"Features",item:k},function(m){var n=$j.toSafeName(m.FeatureName);var q=$j(document.createElement("div")).addClass("firstlayerlabel").text(m.FeatureName);var p=$j(document.createElement("div")).addClass("firstlayer").addClass(m.FeatureName).attr("id",n).append(q);var o=$j(document.createElement("div")).addClass("featureview").attr("id","featureview-"+m.FeatureName).append(p);$j(l).append(o);$j.each(m.ProductsList,function(v,x){usageperc=(x.LicenseCountSum/x.LicenseAvailable)*100;if(isNaN(usageperc)){usageperc=0;}else{if(usageperc>100){usageperc=100;}}var z=$j.toSafeName(x.ProductName+"-"+m.FeatureName);var B=$j(document.createElement("a")).attr("id",z).addClass("secondlayerlabel").addClass("ubartext").text(x.ProductName);var I=$j(document.createElement("a")).text("History").click(function(){$j.historyDiv(x.ProductName,m.FeatureName);});var L=$j(document.createElement("div")).addClass("historylink").append(I);var K=$j(document.createElement("div")).addClass("usagefigures").text(x.LicenseCountSum+"/"+x.LicenseAvailable);var H=$j(document.createElement("div")).addClass("usagebar").attr("style","width: "+usageperc+"%;").append("&nbsp;");var J=$j(document.createElement("div")).addClass("usagebarwrapper").append(H);var s=m.FeatureName+x.ProductName;var A=$j(document.createElement("div")).addClass("secondlayer").addClass(x.ProductName).addClass(s).addClass(x.Mapping).attr("id",x.ProductName+v).append(B).append(J).append(K).append(L).append($j.clearerDiv());$j("#"+n).append(A);var G=$j(document.createElement("th")).text("User Name");var u=$j(document.createElement("th")).text("Hostname").addClass("userhostname");var r=$j(document.createElement("th")).text("Checkout Time").addClass("usercheckout");var w=$j(document.createElement("th")).text("Licenses").addClass("userlicense");var y=$j(document.createElement("tr")).append(G).append(u).append(r).append(w);var D=$j(document.createElement("thead")).append(y);var E=m.FeatureName+x.ProductName;var C=$j(document.createElement("tbody"));$j.each(x.UsersList,function(M,N){if(N.CheckoutsList.length!=0){$j.each(N.CheckoutsList,function(R,O){var V=$j.addSlashes(N.UserName);var W=$j(document.createElement("a")).text(N.UserName).click(function(){$j.getUserView(N.UserName,$j.popupDiv());});var U=$j(document.createElement("div")).append(W);var X=$j(document.createElement("td")).append(U).addClass("userdiv");var Q=$j(document.createElement("td")).text(O.Host);var P=$j(document.createElement("td")).append($j.checkoutData(O));var S=$j(document.createElement("td")).text(O.LicenseCount);if(N.FullName!=null&&N.FullName!=""){U.append($j.userBadge(N));}var T=$j(document.createElement("tr")).addClass("tableRow").addClass(N.UserName).append(X).append(Q).append(P).append(S);C.append(T);});}});var t=$j(document.createElement("table")).addClass("thirdlayer").addClass("list").addClass("tablesorter").attr("name",E).append(D).append(C).tablesorter();var F=$j(document.createElement("div")).addClass("thirdlayerTemp").addClass(x.ProductName).addClass("tl_"+z).addClass("hidden").append(t).append($j.clearerDiv());$j("#"+n).append(F);});$j.filterFeature();$j.ajaxSetup({cache:false});});},searchProducts:function(k){$j.ajaxSetup({cache:false});$j.getJSON("/licensemonitor/getAllProducts.htm",{query:k},function(l){$j.ajaxSetup({cache:false});});},filterProduct:function(){if($j("#featuresList").children("li").size()>0){$j(".secondlayer").addClass("hidden");$j(".thirlayerTemp").addClass("hidden");$j("#productsList li").each(function(n,m){var o=$j(m).text();var p=$j.toSafeName(o);$j("#featuresList li").each(function(r,q){var s=$j(q).text();var t=$j.toSafeName(s);$j(".secondlayer."+t).removeClass("hidden");});});if($j("#usersList").children("li").size()>0){var l=0;var k=0;$j(".tableRow").addClass("hidden");$j("#usersList li").each(function(n,m){var o=$j(m).text();var p=$j.escapeIllegalCharacter(o);$j(".tableRow."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.escapeIllegalCharacter(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}else{if($j("#usersList").children("li").size()>0){var l=0;var k=0;$j(".tableRow").addClass("hidden");$j("#usersList li").each(function(n,m){var o=$j(m).text();var p=$j.escapeIllegalCharacter(o);$j(".tableRow."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.escapeIllegalCharacter(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}},filterFeature:function(){if($j("#productsList").children("li").size()>0){$j(".secondlayer").addClass("hidden");$j(".thirlayerTemp").addClass("hidden");$j("#featuresList li").each(function(n,m){var o=$j(m).text();var p=$j.escapeIllegalCharacter(o);$j("#productsList li").each(function(r,q){var s=$j(q).text();var t=$j.escapeIllegalCharacter(s);$j(".secondlayer."+t).removeClass("hidden");});});if($j("#usersList").children("li").size()>0){var l=0;var k=0;$j(".tableRow").addClass("hidden");$j("#usersList li").each(function(n,m){var o=$j(m).text();var p=$j.escapeIllegalCharacter(o);$j(".tableRow."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.escapeIllegalCharacter(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}else{if($j("#usersList").children("li").size()>0){var l=0;var k=0;$j(".tableRow").addClass("hidden");$j("#usersList li").each(function(n,m){var o=$j(m).text();var p=$j.escapeIllegalCharacter(o);$j(".tableRow."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.escapeIllegalCharacter(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}},filterUser:function(){if($j("#productsList").children("li").size()>0){$j(".secondlayer").addClass("hidden");$j(".thirlayerTemp").addClass("hidden");$j("#usersList li").each(function(n,m){var o=$j(m).text();var p=$j.escapeIllegalCharacter(o);$j("#productsList li").each(function(r,q){var s=$j(q).text();var t=$j.toSafeName(s);$j(".secondlayer."+t).removeClass("hidden");});});if($j("#featuresList").children("li").size()>0){var l=0;var k=0;$j(".tableRow").addClass("hidden");$j("#featuresList li").each(function(n,m){var o=$j(m).text();var p=$j.toSafeName(o);$j(".tableRow."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.toSafeName(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}else{if($j("#featuresList").children("li").size()>0){var l=0;var k=0;$j(".tableRow").addClass("hidden");$j("#featuresList li").each(function(n,m){var o=$j(m).text();var p=$j.toSafeName(o);$j(".tableRow."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.toSafeName(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}},serverSide:function(){if(b!=null){if(j=="Product"){$j.getProductView(b,"#results");if(g!=0){$j("#results").empty();}g=0;}else{if(j=="Feature Name"){$j.getFeatureView(b,"#results");if(g!==1){$j("#results").empty();}g=1;}else{if(j=="User"){$j.getUserView(b,"#results");if(g!==2){$j("#results").empty();}g=2;}}}}},getRecentCheckouts:function(k){$j.ajaxSetup({cache:false});$j.getJSON("/licensemonitor/getRecentCheckouts.htm",{count:k},function(m){var u=$j(document.createElement("div"));var s=$j(document.createElement("tbody"));var w=$j(document.createElement("div")).text(k+" Most Recent Checkouts").addClass("tableTitle");var l=$j(document.createElement("th")).text("Checkout Time");var q=$j(document.createElement("th")).text("Product");var n=$j(document.createElement("th")).text("Feature Name");var x=$j(document.createElement("th")).text("Username");var o=$j(document.createElement("th")).text("Hostname");var p=$j(document.createElement("th")).attr("colspan","2").text("Licenses");var v=$j(document.createElement("tr")).append(l).append(q).append(n).append(x).append(o).append(p);var t=$j(document.createElement("thead")).append(v);var r=$j(document.createElement("table")).append(t);$j.each(m,function(I,y){var R=$j.addSlashes(y.UserName);var M=$j.addSlashes(y.ProductName);var G=$j.addSlashes(y.FeatureName);var N=$j(document.createElement("a")).text(y.ProductName).click(function(){$j.getProductView(M,$j.popupDiv());});var E=$j(document.createElement("a")).text(y.FeatureName).click(function(){$j.getFeatureView(G,$j.popupDiv());});var S=$j(document.createElement("a")).text(y.UserName).click(function(){$j.getUserView(y.UserName,$j.popupDiv());});var P=(y.CheckoutTime).split("T");var C=P[0].replace(/-/g,"/");var z=new Date(C+" "+P[1]+" +00");var B=z.getFullYear()+"-"+$j.padnumber(z.getMonth()+1)+"-"+$j.padnumber(z.getDate());var D=$j.padnumber(z.getHours())+":"+$j.padnumber(z.getMinutes())+":"+$j.padnumber(z.getSeconds());var X=(y.MaxInUse/y.TotalMaxInUse)*100;if(isNaN(X)){X=0;}else{if(X>100){X=100;}}var Y=(y.TotalMaxInUse/y.MaxAvailable)*100;if(isNaN(X)){Y=0;}else{if(Y>100){Y=100;}}var L=$j(document.createElement("div")).addClass("ubartext").text(y.MaxInUse);var W=$j(document.createElement("div")).addClass("usagefigures").text(y.TotalMaxInUse+"/"+y.MaxAvailable);var T=$j(document.createElement("div")).addClass("usagebar").attr("style","width: "+X+"%;").append("&nbsp;");var U=$j(document.createElement("div")).addClass("usagebartotal").attr("style","width: "+Y+"%;").append($j(T)).append("&nbsp;");var V=$j(document.createElement("div")).addClass("usagebarwrapper").attr("title","Total max in use / Max Available: "+y.TotalMaxInUse+"/"+y.MaxAvailable).append($j(U));var A=$j(document.createElement("td")).text(B+" "+D);var O=$j(document.createElement("td")).append(N);var F=$j(document.createElement("td")).append(E);var Z=$j(document.createElement("td")).append(S);var H=$j(document.createElement("td")).text(y.Host);var J=$j(document.createElement("td")).addClass("specialCell1").append(L);var K=$j(document.createElement("td")).addClass("specialCell2").append(V).append(W);var Q=$j(document.createElement("tr")).append(A).append(O).append(F).append(Z).append(H).append(J).append(K);s.append(Q);});r.append(s).addClass("tablesorter").addClass("list").tablesorter();u.addClass("dashboardReport").append(w).append(r);$j("#results").append(u);$j.ajaxSetup({cache:false});});},getMaxUsers:function(k){$j.ajaxSetup({cache:false});$j.getJSON("/licensemonitor/getMaxUsers.htm",{count:k},function(l){var r=$j(document.createElement("div"));var t=$j(document.createElement("div")).text(k+" Top Users").addClass("tableTitle");var m=$j(document.createElement("th")).text("Feature Name");var u=$j(document.createElement("th")).text("Username");var n=$j(document.createElement("th")).text("Licenses");var s=$j(document.createElement("tr")).append(m).append(u).append(n);var q=$j(document.createElement("thead")).append(s);var o=$j(document.createElement("table")).append(q);var p=$j(document.createElement("tbody"));$j.each(l,function(y,A){var C=$j.addSlashes(A.UserName);var x=$j.addSlashes(A.FeatureName);var v=$j(document.createElement("a")).text(A.FeatureName).click(function(){$j.getFeatureView(x,$j.popupDiv());});var D=$j(document.createElement("a")).text(A.UserName).click(function(){$j.getUserView(A.UserName,$j.popupDiv());});var w=$j(document.createElement("td")).append(v);var E=$j(document.createElement("td")).append(D);var z=$j(document.createElement("td")).text(A.MaxInUse);var B=$j(document.createElement("tr")).append(w).append(E).append(z);p.append(B);});o.append(p).addClass("tablesorter").addClass("list").tablesorter();r.addClass("dashboardReport").append(t).append(o);$j("#results").append(r);$j.ajaxSetup({cache:false});});},getMaxUtilization:function(k){$j.ajaxSetup({cache:false});$j.getJSON("/licensemonitor/getMaxUtilization.htm",{count:k},function(l){var t=$j(document.createElement("div"));var m=$j(document.createElement("th")).text("Feature Name");var o=$j(document.createElement("th")).text("Max Utilization");var n=$j(document.createElement("th")).attr("colspan","2").text("Max Available");var v=$j(document.createElement("div")).text("Top "+k+" Max Utilization").addClass("tableTitle");var s=$j(document.createElement("th")).text("Product");var u=$j(document.createElement("tr")).append(s).append(m).append(o).append(n);var r=$j(document.createElement("thead")).append(u);var p=$j(document.createElement("table")).append(r);var q=$j(document.createElement("tbody"));$j.each(l,function(z,N){var G=$j.addSlashes(N.ProductName);var y=$j.addSlashes(N.FeatureName);var H=$j(document.createElement("a")).text(N.ProductName).click(function(){$j.getProductView(G,$j.popupDiv());});var w=$j(document.createElement("a")).text(N.FeatureName).click(function(){$j.getFeatureView(y,$j.popupDiv());});var E=Math.round(((N.MaxInUse/N.MaxAvailable)*100)*100)/100;var D=E;if(isNaN(E)){E=0;}else{if(E>100){E=100;}}var C=$j(document.createElement("div")).addClass("ubartext").text(N.MaxAvailable);var M=$j(document.createElement("div")).addClass("usagefigures").text(N.MaxInUse+"/"+N.MaxAvailable);var K=$j(document.createElement("div")).addClass("usagebar").attr("style","width: "+E+"%;").append("&nbsp;");var L=$j(document.createElement("div")).addClass("usagebarwrapper").attr("title","Max in use / Max Available: "+N.MaxInUse+"/"+N.MaxAvailable).append(K);var I=$j(document.createElement("td")).append(H);var x=$j(document.createElement("td")).append(w);var F=$j(document.createElement("td")).text(D+"%");var A=$j(document.createElement("td")).addClass("specialCell1").append(N.MaxAvailable);var B=$j(document.createElement("td")).addClass("specialCell2").append($j(L)).append($j(M));var J=$j(document.createElement("tr")).append(I).append(x).append(F).append(A).append(B);q.append(J);});p.append(q).addClass("tablesorter").addClass("list").tablesorter();t.addClass("dashboardReport").append(v).append(p);$j("#results").append(t);$j.ajaxSetup({cache:false});});},getFilteredItems:function(){var m=new Array();var k=new Array();var n=new Array();var l=new Object;$j("#productsList li").each(function(p,o){m[p]=$j(o).text();});$j("#featuresList li").each(function(p,o){k[p]=$j(o).text();});$j("#usersList li").each(function(p,o){n[p]=$j(o).text();});l.products=m;l.features=k;l.users=n;return l;},pause:function(l){var k=new Date();while((new Date())-k<=l){}}}),$j(".selectBox").change(function(){$j.getSelectedItem();});$j("#button").click(function(){$j.getFilteredItems();});$j(".secondlayerlabel").live("click",function(){var k=$j(this).attr("id");var l=$j("div.tl_"+k+" > table > tbody > tr").size();var m=$j("div.tl_"+k+" > table").find("tr.hidden").size();if(l!=m){$j(".tl_"+k).toggleClass("hidden");}$j.alterTablesorter(k);});$j(".selectedproducts").live("click",function(){var l=$j(this).text();var m=$j.escapeIllegalCharacter(l);var n=$j.toSafeName(l);$j(this).remove();var k=$j.getFilteredItems();if((j=="Product")&&(b!=null)){$j("#productview-"+m).remove();if($j("#productsList").children("li").size()==0){d.addClass("hidden");f.addClass("hidden");h.addClass("hidden");$j("#featuresList").children("li").remove();$j("#usersList").children("li").remove();}}else{if(j=="Feature Name"){if($j("#productsList").children("li").size()>0){$j("."+m).addClass("hidden");$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{$j(".secondlayer").removeClass("hidden");if($j("#featuresList").children("li").size()>0){$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}}else{if(j=="User"){if($j("#productsList").children("li").size()>0){$j("."+n).addClass("hidden");$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.toSafeName(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{$j(".secondlayer").removeClass("hidden");if($j("#featuresList").children("li").size()>0){$j("#featuresList li").each(function(p,o){var q=$j(o).text();var r=$j.escapeIllegalCharacter(q);$j("."+r).removeClass("hidden");});$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.toSafeName(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}}}}if($j(".selectedList li").length==0){g=-1;a();}});$j(".selectedfeatures").live("click",function(){var l=$j(this).text();var m=$j.escapeIllegalCharacter(l);var n=$j.toSafeName(l);$j(this).remove();var k=$j.getFilteredItems();if((j=="Feature Name")&&(b!=null)){$j("#featureview-"+m).remove();if($j("#featuresList").children("li").size()==0){e.addClass("hidden");f.addClass("hidden");h.addClass("hidden");$j("#productsList").children("li").remove();$j("#usersList").children("li").remove();}}else{if(j=="Product"){if($j("#featuresList").children("li").size()>0){$j("."+n).addClass("hidden");$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{$j(".secondlayer").removeClass("hidden");if($j("#usersList").children("li").size()>0){$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}}else{if(j=="User"){if($j("#featuresList").children("li").size()>0){$j("."+n).addClass("hidden");$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.toSafeName(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{$j(".tableRow").removeClass("hidden");if($j("#productsList").children("li").size()>0){$j("#productsList li").each(function(p,o){var r=$j(o).text();var q=$j.toSafeName(r);$j(".secondlayer."+q).removeClass("hidden");});}else{$j(".secondlayer").removeClass("hidden");}}}}}if($j(".selectedList li").length==0){g=-1;a();}});$j(".selectedusers").live("click",function(){var l=$j(this).text();var m=$j.escapeIllegalCharacter(l);var n=$j.toSafeName(l);$j(this).remove();var k=$j.getFilteredItems();if((j=="User")&&(b!=null)){$j("#userview-"+m).remove();if($j("#usersList").children("li").size()==0){e.addClass("hidden");d.addClass("hidden");h.addClass("hidden");$j("#productsList").children("li").remove();$j("#featuresList").children("li").remove();}}else{if(j=="Feature Name"){if($j("#usersList").children("li").size()>0){$j("."+m).addClass("hidden");$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{$j(".tableRow").removeClass("hidden");if($j("#productsList").children("li").size()>0){$j("#productsList li").each(function(p,o){var q=$j(o).text();$j(".secondlayer."+q).removeClass("hidden");});}else{$j(".secondlayer").removeClass("hidden");}}}else{if(j=="Product"){if($j("#usersList").children("li").size()>0){$j("."+m).addClass("hidden");$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{$j(".tableRow").removeClass("hidden");if($j("#featuresList").children("li").size()>0){$j("#featuresList li").each(function(q,o){var p=$j(o).text();$j(".secondlayer."+p).removeClass("hidden");});}else{$j(".secondlayer").removeClass("hidden");}}}}}if($j(".selectedList li").length==0){g=-1;a();}});$j("#products").autocomplete({source:function(k,l){c=$j.getFilteredItems();$j.ajax({url:"/licensemonitor/getAllProducts.htm",dataType:"json",data:{term:k.term,products:c.products,features:c.features,users:c.users},success:function(m){l(m);}});},minLength:2,select:function(k,l){b=l.item.value;$j("#productsList").append('<li class="selectedproducts">'+b+"</li>");if(j=="Product"){$j.serverSide();$j.showFilters();}else{if(j=="Feature Name"){$j(".secondlayer").addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");$j("#productsList li").each(function(n,m){var o=$j(m).text();var p=$j.escapeIllegalCharacter(o);if(p.match(/ /g)!=null){var p=p.replace(/\\ /g,".");}$j(".secondlayer."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.escapeIllegalCharacter(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{if(j=="User"){$j(".secondlayer").addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");$j("#productsList li").each(function(n,m){var o=$j(m).text();var p=$j.toSafeName(o);$j(".secondlayer."+p).removeClass("hidden");});$j("table").each(function(n){var m=$j(this).attr("name");if(m!=null){m=$j.toSafeName(m);var o=$j(this).find("tr").length-1;var p=$j(this).find("tr.hidden").length;if(o==p){$j(".secondlayer."+m).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}}l.item.value="";}});$j("#features").autocomplete({source:function(k,l){c=$j.getFilteredItems();$j.ajax({url:"/licensemonitor/getAllFeatures.htm",dataType:"json",data:{term:k.term,products:c.products,features:c.features,users:c.users},success:function(m){l(m);}});},minLength:2,select:function(k,n){b=n.item.value;$j("#featuresList").append('<li class="selectedfeatures">'+b+"</li>");if(j=="Feature Name"){$j.serverSide();$j.showFilters();}else{if(j=="Product"){$j(".secondlayer").addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");$j("#featuresList li").each(function(p,o){var q=$j(o).text();var r=$j.toSafeName(q);$j(".secondlayer."+r).removeClass("hidden");});$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{if(j=="User"){if($j("#productsList").children("li").size()>0){$j(".secondlayer").addClass("hidden");$j(".thirlayerTemp").addClass("hidden");$j("#productsList li").each(function(p,o){var q=$j(o).text();var r=$j.toSafeName(q);$j(".secondlayer."+r).removeClass("hidden");});}var m=0;var l=0;$j(".tableRow").addClass("hidden");$j("#featuresList li").each(function(p,o){var q=$j(o).text();var r=$j.toSafeName(q);$j("."+r).removeClass("hidden");});$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.toSafeName(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}}n.item.value="";}});$j("#users").autocomplete({source:function(k,l){c=$j.getFilteredItems();$j.ajax({url:"/licensemonitor/getAllUsers.htm",dataType:"json",data:{term:k.term,products:c.products,features:c.features,users:c.users},success:function(m){l(m);}});},minLength:2,select:function(k,n){b=n.item.value;$j("#usersList").append('<li class="selectedusers">'+b+"</li>");if(j=="User"){$j.serverSide();$j.showFilters();}else{if(j=="Feature Name"){if($j("#productsList").children("li").size()>0){$j(".secondlayer").addClass("hidden");$j(".thirlayerTemp").addClass("hidden");$j("#productsList li").each(function(p,o){var q=$j(o).text();var r=$j.escapeIllegalCharacter(q);if(r.match(/ /g)!=null){var r=r.replace(/\\ /g,".");}$j(".secondlayer."+r).removeClass("hidden");});}var m=0;var l=0;$j(".tableRow").addClass("hidden");$j("#usersList li").each(function(p,o){var q=$j(o).text();var r=$j.escapeIllegalCharacter(q);if(r.match(/ /g)!=null){var r=r.replace(/\\ /g,".");}$j("."+r).removeClass("hidden");});$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}else{if(j=="Product"){if($j("#featuresList").children("li").size()>0){$j(".secondlayer").addClass("hidden");$j(".thirlayerTemp").addClass("hidden");$j("#featuresList li").each(function(p,o){var q=$j(o).text();var r=$j.toSafeName(q);$j(".secondlayer."+r).removeClass("hidden");});}var m=0;var l=0;$j(".tableRow").addClass("hidden");$j("#usersList li").each(function(p,o){var q=$j(o).text();var r=$j.escapeIllegalCharacter(q);if(r.match(/ /g)!=null){var r=r.replace(/\\ /g,".");}$j("."+r).removeClass("hidden");});$j("table").each(function(p){var o=$j(this).attr("name");if(o!=null){o=$j.escapeIllegalCharacter(o);var q=$j(this).find("tr").length-1;var r=$j(this).find("tr.hidden").length;if(q==r){$j(".secondlayer."+o).addClass("hidden");$j(".thirdlayerTemp").addClass("hidden");}}});}}}n.item.value="";}});$j("#loading").bind("ajaxSend",function(){$j(this).show();}).bind("ajaxStop",function(){$j(this).hide();}).bind("ajaxError",function(){$j(this).hide();});$j.getRecentCheckouts(10);$j.getMaxUtilization(10);$j.getMaxUsers(10);});