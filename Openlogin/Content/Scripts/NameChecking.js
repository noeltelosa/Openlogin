var $j = jQuery.noConflict();
 function ValidateName(elementId,dbVal) {
    
     var content = $j.trim($j("#" + elementId).val());
     var length_ = 0;
     var message = "Name field must have a value";
     var len = content.match(/[a-zA-Z_0-9_ <>()%.-]/g);
     
     var duplicate = false; var Name;
     $j('#MappingList td').each(function () {
         if (dbVal.toUpperCase() != "") {
             if ($j.trim($j(this).text().toUpperCase()) == content.toUpperCase() && dbVal.toUpperCase() != content.toUpperCase() && content.toUpperCase() != "") {
                 Name = $j(this).text(); duplicate = true; message = Name.replace(/</g, '&lt;') + " already exist";
             }
         }
         else {
             if ($j.trim($j(this).text().toUpperCase()) == content.toUpperCase()  && content.toUpperCase() != "") {
                 Name = $j(this).text(); duplicate = true; message = Name.replace(/</g, '&lt;') + " already exist";
             } 
         }

     });
     if (len != null && duplicate == false) { length_ = len.length; message = "Only alphanumeric characters(A to z, 0 to 9), space, and the following characters (<>()%_.-) are allowed as a Name"; }
     if (len == null && content != '' && length_ == 0 && duplicate == false) { message = "Only alphanumeric characters(A to z, 0 to 9), space, and the following characters (<>()%_.-) are allowed as a Name"; }
     
     if (len == null || content.length != length_ || duplicate == true ) {
                $j(function () {
                    if ($j('.flash').lenght != 0) { $j('.flash').remove(); }
                    var $flash = $j('<div  style="display:none;" >');
                    $flash.html(message);
                    $flash.toggleClass('flash');
                    $flash.toggleClass('flash-superError');
                    $j('#flash').prepend($flash);
                    $flash.slideDown('fast');
                    $flash.click(function () { $j(this).slideToggle('highlight'); });
                });
                 return false;    
        }
        else return true;
     }

