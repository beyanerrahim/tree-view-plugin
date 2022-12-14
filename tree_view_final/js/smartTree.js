

$.fn.SmartTree = function (options) {

    var settings = $.extend({
        
        //left or right side of the tree
        rtl: "",
    
        //hide or show children (tree open or close)
        active: "",

        //make the tree immovable
        draggable: true,

        //Adding , deleting and modifying operatins
        editicons : true,
        addicons : true,
        removeicons : true,

        
       //colors of selets and nodes
        selectColor : "",
        selectedAttr : "",
        textColor : "",
        nodeColor : "",
        selectednodetextColor : "",


       //font size and font type
       fontSize : "",
       fontType : "",

        //callback functions
        add: function (added, name) { },
        remove: function (deleted) { },
        edit: function (edited, val) { },
        move: function (e, oldparent, newparent) { }

    },options);

       

   $($(this).find('ol').get().reverse()).each(function(){
    $(this).replaceWith($('<ul>'+ $(this).html() +'</ul>'))
   });


    $(this).not($(this).children()).addClass("tree");
    $(this).not($(this).children()).addClass("ltr");

    var tree = $(this);

    if (settings.rtl) {
        if ($(this).first().hasClass("ltr")) {
            $(this).first().removeClass("ltr")
        }
        $(this).first().addClass("rtl");
    }
    if (!settings.draggable) {
        $(this).find('li').each(function () {
            $(this).removeAttr("draggable");
        });
    }
    else{
       
        $(this).find('li').not($('.tree').children()).attr('draggable',"true");
    }
    $('.tree li ul').addClass('nested');
   


    $(".tree li").attr("class", "droptarget");
    $(".tree li").not($(".tree").children()).addClass("eleman");

    

    $(".tree li").addClass("dragtarget");

    var  hide_edit = "";
    var  hide_add ="";
    var  hide_remove ="";

    if(!settings.editicons){
        hide_edit = "invisible";
     }
     if(!settings.addicons){
        hide_add = "invisible";
     }
     if(!settings.removeicons){
        hide_remove = "invisible";
     }


    var id = 1;

    $(tree).find('li').each(function () {
        $(this).attr("data-id", id++);
       

        if ($(this).children("ul").length == 0) {
            var value = $(this).text().trim();
            $(this).text("");
            //$(this).attr("data-select", "selected");
            $(this).prepend(`<span class="node">
                                                 <span class="name summary"> ${value} </span>
                                                 <span class="icons">
                                                     <i class="fa-solid fa-pen-to-square ${hide_edit}" title="Edit Name"></i>
                                                     <i class="fa-solid fa-user-plus ${hide_add}" title="Add a Child"></i>
                                                     <i class="fa-solid fa-trash-can ${hide_remove}"title="Remove  Child"></i>
                                                </span>
                                     </span>`);

        } else {
            var value = $(this).contents().not($(this).children()).text().trim();
            $(this).contents().not($(this).children()).remove();
            if (value != '') {
                $(this).prepend(`<span class="node">
                                    <span class="caret"></span>
                                    <span class="name summary"> ${value} </span>
                                    <span class="icons">
                                            <i class="fa-solid fa-pen-to-square ${hide_edit}" title="Edit Name"></i>
                                            <i class="fa-solid fa-user-plus ${hide_add}" title="Add a Child"></i>
                                            <i class="fa-solid fa-trash-can ${hide_remove}" title="Remove  Child"></i>
                                    </span>
                                    
                        </span>`);

            }
        }
        check_selected($(this));
        
    });


    if(settings.nodeColor != ""){
        //console.log("hhhhhh");
        $(this).find('li .node').attr("style",`background:${settings.nodeColor}`);
        addselectedclass();
     }

     function check_node_color(){
        if(settings.nodeColor != ""){
            $(tree).find('li .node').attr("style",`background:${settings.nodeColor}`);
            addselectedclass();
         }
     }
     
     if( settings.fontType != ""){
        $(tree).find('li').attr("style",`font-family: ${settings.fontType}`)
     }
    function change_font_type(){
        if( settings.fontType != ""){
            $(tree).find('li').attr("style",`font-family: ${settings.fontType}`)
         }
    }


    if(settings.textColor != ""){
        $(tree).find("li").css("color", settings.textColor);
        $(tree).find("li .icons").css("color", settings.textColor);
    }
   
       function change_text_color(){
           if(settings.textColor != ""){
               $(tree).find("li").css("color", `${settings.textColor}`);
                $(tree).find("li .icons").css("color", settings.textColor);
            }
       }


    function change_text_color_input(){
        if(settings.textColor != ""){
            $(tree).find("li .inputvalue").css("color", `${settings.textColor}`);
      }
    }


   if(settings.selectednodetextColor != ""){
     //remove  .parent()
     $(tree).find("li .selected").css("color", `${settings.selectednodetextColor}`);
     $(tree).find("li .selected").children('.icons').css("color", `${settings.selectednodetextColor}`);
   }


   function selectednodeColor(){
    if(settings.selectednodetextColor != ""){
        $(tree).find("li .node").each(function(){

            if($(this).hasClass("selected")){
             
                $(this).css("color", `${settings.selectednodetextColor}`);
                $(this).children('.icons').css("color", `${settings.selectednodetextColor}`);
                $(this).find(".inputvalue").css("color", `${settings.selectednodetextColor}`);
            }else{
                if(settings.textColor != ""){
                    $(this).css("color", `${settings.textColor}`);
                     $(this).children('.icons').css("color", settings.textColor);
                     $(this).find("li .inputvalue").css("color", `${settings.textColor}`);
                 }else{
                    $(this).css("color", "#212529");
                    $(this).children('.icons').css("color", "#212529");
                    $(this).find("li .inputvalue").css("color","#212529" );
                 }
            }

        })

       
      }
   }
   function all_node_each_check_selected(){
    
        $(tree).find("li .node").each(function(){
           if(settings.nodeColor == ""){
           // console.log("mjdjk");
            if($(this).hasClass("selected")){
              //console.log("000");
                $(this).attr("style", `background: ${settings.selectedAttr} !important`);
                // $(this).children('.icons').css("color", `${settings.selectednodetextColor}`);
                // $(this).find(".inputvalue").css("color", `${settings.selectednodetextColor}`);
            }else{
               // console.log("9999");
                    $(this).css("background", "rgb(221, 220, 220) ");
                   
            }
        }
        })

       
   }

   if(settings.fontSize != ""){
        var size = settings.fontSize;
        if(size > 12 && size < 20){
            $(tree).find('li .node').css('font-size',size);
        }
   }

   function check_fontsize(){
    if(settings.fontSize != ""){
        var size = settings.fontSize;
        if(size > 12 && size < 20){
            $(tree).find('li .node').css('font-size',size);
        }
   }
   }


    if (settings.active) {
        $(this).children().children().children('.caret').addClass('caret-down');
        $(this).children().children('.nested').addClass('active');

        $("ul.nested").children().children().children('.caret').addClass('caret-down');
        $("ul.nested").children().children('.nested').addClass('active');
        //}
    }
    $(this).on('click', ".caret", function () {
        $(this).parent().parent().children('.nested').toggleClass("active");
        $(this).toggleClass("caret-down");
        save_all_input();

    });

    
    $(window).click((event) => {
        if (!$(event.target).closest('.node').length) {

            if ($('.node').hasClass("update")) {

                window_update(settings.edit);
                addselectedclass();

            }
            else {
                window_add(settings.add);
                check_node_color();
                addselectedclass();
            }
        } else {
            if ($(".inputvalue").length == 1) {
                $(".inputvalue").focus();
            }
        }
    });

    function addselectedclass(){
        //check_node_color();
        $(tree).find('li').each(function(){
            check_selected($(this));
        });
    }

    $(window).click((event) => {
        if (!$(event.target).closest('.node').length) {
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
        check_node_color();
        addselectedclass();
        selectednodeColor();
        check_fontsize();
       // window.getComputedStyle(event.target).opacity = 1;
     }
  });

 
  $(this).on('click', '.node', function () {

    if($(this).children('.caret').length != 0){
        $(tree).find('.selectNode').removeAttr("style");
       $(tree).find('li .node').removeClass('selectNode');
       all_node_each_check_selected();
       check_node_color();
       $(this).parent().find('.node').addClass("selectNode");
       

    }else{
        $(tree).find('.selectNode').removeAttr("style");
        $(tree).find('li .node').removeClass('selectNode');
        all_node_each_check_selected();
        check_node_color();
        $(this).addClass("selectNode");
        // if(settings.selectednodetextColor !=""){
        //     console.log("kkkjjjjjjj")
        //     $(".selectNode").css("color", `${settings.selectednodetextColor}`);
        //   }
      
    }

   if(settings.selectColor != ""){
   
      $(tree).find('.selectNode').attr("style",`background: ${settings.selectColor} !important;`);
      $('.inputvalue').css("background",settings.selectColor);

      //selectednodeColor();
      if(settings.selectednodetextColor !=""){
        //console.log("kkkjjjjjjj")
        $(".selectNode").css("color", `${settings.selectednodetextColor}`);
      }
    }
    if(settings.selectColor == "" &&  settings.selectedAttr != ""){
        $(tree).find('.selectNode').attr("style",`background: ${settings.selectColor} !important;`);
      $('.inputvalue').css("background",settings.selectColor);
    }

    selectednodeColor();
    if($('.inputvalue').length != 0  && settings.selectColor == ""){
         $('.inputvalue').css("background","#9dc2af")
    }
    input_color();
    check_fontsize();
});

function input_color(){

    if($('.inputvalue').length != 0  && !$('.inputvalue').parent().parent('.node').hasClass('selectNode')){

        if($('.inputvalue').parent().parent('.node').hasClass('selected')){

             if(settings.selectedAttr != ""){
                $('.inputvalue').css("background",`${settings.selectedAttr}`);
             }else{
                $('.inputvalue').css("background","rgb(214,200,209)");
             }
           

        }else{
            if(settings.nodeColor != ""){
                $('.inputvalue').css("background",`${settings.nodeColor}`);
             }else{
                $('.inputvalue').css("background","rgb(221,220,220)");
             }
          
        }
       



   }

}
    function check_draggable(){
        if(!settings.draggable){
                $('.inputvalue').parents('ul.tree').find('li').removeAttr("draggable");
            }else{
                $('.inputvalue').parents('ul.tree').find('li').not($(".tree").children()).attr("draggable", "true");
            }
    }
    function window_update(callback) {

        let val = ($('.inputvalue').val() || '').trim();
        if (val != '') {
            var newname = $(".inputvalue").val();
            var update = $(".inputvalue").parent().parent().parent();
            check_draggable();  
           
            $('.update').children('.name').html(newname);
            $('.node').removeClass("update");
            $('.tree .name').addClass("summary");
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
            addselectedclass();
            if (typeof callback == "function") {
                callback(update, newname);
            }
        } else {
            var namee = $(".inputvalue").data('old');
            var updated = $(".inputvalue").parent().parent().parent();
            check_draggable();
            $('.update').children('.name').html(namee);
            $('.node').removeClass("update");
            $('.tree .name').addClass("summary");
            $(tree).find('li .node').removeClass('selectNode');
        
            addselectedclass();
           
            if (typeof callback == "function") {
                callback(updated, namee);
            }
        }
    }

    function window_add(callback) {
        var valuename = ($('.inputvalue').val() || '').trim();
        if (valuename != "") {
            var newname = $(".inputvalue").val();
            var addedNode = $(".inputvalue").parent().parent().parent();
            check_draggable();
            $(".inputvalue").parent().next().css("display", "block");
            $(".inputvalue").parent().text(newname);
            $('.tree .name').addClass("summary");
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
            check_node_color();
            if (typeof callback == "function") {
                callback(addedNode, newname);
            }
        }
        else {
            check_draggable();
            $(".inputvalue").parent().parent().parent().remove();
            check_child();
            
        }
    }

    //adding a new child
    $(this).on('click', ".fa-user-plus", function () {
        add_child($(this), settings.add);
    });

    function add_child(node, callback) {

        var placeholder = "";
        if ($('.tree').hasClass('rtl')) {
            placeholder = "أدخل اسم"
        } else {
            placeholder = "Enter a Name";
        }
        check_updateClass();
        if ($('.inputvalue').length == 0) {
            if (node.parent().parent().parent().children("ul").length == 0) {
                node.parent().parent().prepend('<span class="caret caret-down"></span>');
                node.parent().parent().parent().append(`<ul class="nested">
                                                            <li class="eleman" data-id="${id++}">
                                                                 <span class="node" data>
                                                                 <span class="name">
                                                                     <input type="text" class="inputvalue" placeholder="${placeholder}">
                                                                     <i class="fa-solid fa-check correcticon" title="save"></i>
                                                                </span>
                                                                     <span class="icons" style="display:none;">
                                                                           <i class="fa-solid fa-pen-to-square ${hide_edit}" title="Edit Child" ></i>
                                                                           <i class="fa-solid fa-user-plus ${hide_add}" title="Add a Child"></i>
                                                                           <i class="fa-solid fa-trash-can ${hide_remove}" title="Remove Child"></i>
                                                                          
                                                                </span></span>
                                                            </li>
                                                    </ul>`);
                node.parent().parent().parent().children("ul").addClass("active");

            } else {
                node.parent().prevAll(".caret").addClass("caret-down");
                node.parent().parent().parent().children("ul").addClass("active");
                node.parent().parent().parent().children("ul").append(`<li class="eleman" data-id="${id++}">
                                                                           <span class="node">
                                                                               <span class="name">
                                                                                   <input type="text" class="inputvalue" placeholder="${placeholder}">
                                                                                <i class="fa-solid fa-check correcticon" title="save"></i>
                                                                              </span>
                                                                              <span class="icons" style="display:none;">
                                                                                    <i class="fa-solid fa-pen-to-square ${hide_edit}" title="Edit Child"></i>
                                                                                    <i class="fa-solid fa-user-plus ${hide_add}"  title="Add a Child"></i>
                                                                                    <i class="fa-solid fa-trash-can ${hide_remove}" title="Remove Child"></i>
                                                                               </span>
                                                                            </span>
                                                                     </li>`);

            }
            $('.inputvalue').focus();
            //check_data_select();
           //node.parent().parent().parent().attr("data-select", "selected");
           node.parents('ul.tree').find('li').removeAttr("draggable");
           change_font_type();
           change_text_color_input();
           change_text_color();
           selectednodeColor();
           check_fontsize();
        
           
        }
        else {

        }
        $('.tree .inputvalue').keypress(function (e) {
            var key = e.which;
            if (key == 13) 
            {
                var val = ($('.inputvalue').val() || '').trim();
                if (val != "") {
                    var newname = $(".inputvalue").val();
                    $(".inputvalue").parent().next().css("display", "block");
                    var addedNode = $(".inputvalue").parent().parent().parent();
                    check_draggable();
                    $(".inputvalue").parent().text(newname);
                    $('.tree .name').addClass("summary");
                    $(tree).find('.selectNode').removeAttr("style");
                    $(tree).find('li .node').removeClass('selectNode');
                    addselectedclass();
                  
                    check_node_color();
                    selectednodeColor();
                    check_fontsize();
                    if (typeof callback == "function") {
                        callback(addedNode, newname);
                    }
                }
                else {

                    $('.inputvalue').css("border-bottom", "1px solid red");
                    $('.inputvalue').on('keydown', function () {
                        $('.inputvalue').css("border-bottom", "1px solid rgb(143, 141, 141)");
                    });
                    check_fontsize();
                }
            }
        });
    }

//   function check_data_select(){

//   $('.tree li').each(function(){
//     if($(this).attr('data-select') == 'selected'){
//         //console.log("dddddddd");
//         $(this).children('.node').addClass('selected');
//     }
    
//   });

//   }
    function check_selected(ele) {
        var select = $(ele).data('select');
        if (select == "selected") {

            if(settings.selectedAttr != ""){
                $(ele).children('.node').addClass("selected");
                $(ele).children('.selected').attr("style",`background: ${settings.selectedAttr} !important`);
                //$(ele).children('.selected').css("background",settings.selectedAttr);
            }else{
                $(ele).children('.node').addClass("selected");
            }
           
        }
    }

    //remove child
    $(this).on('click', ".fa-trash-can", function () {

        remove_child($(this), settings.remove);
        check_fontsize();

    });

    function remove_child(node, callback) {
        //node.parent().parent().addClass("selectNode");
        var result = confirm('Are you sure you want to delete this node ?');
        if (!result) {
            return false;
        } else {

            var deletedNode = node.parent().parent().parent();
            node.parent().parent().parent().remove();
            
            check_child();
          

            if (typeof callback == "function") {
                callback(deletedNode);
            }
        }
       
    }
    //edit Name
    $(this).on('click', ".fa-pen-to-square", function () {
        edit_child($(this));
       
       

    });

    function edit_child(node) {
        $(tree).find('.selectNode').removeAttr("style");
        $(tree).find('li .node').removeClass('selectNode');
        check_updateClass();
        node.parent().parent(".node").addClass("update");
        var val = node.parent().prev().text().trim() || '';
        var valinput = node.parent().prev().text().trim() || '';
        var placeholder = "";
        if ($('.tree').hasClass('rtl')) {
            placeholder = "أدخل اسم"
        } else {
            placeholder = "Enter a Name";
        }
        if ($('.inputvalue').length == 0) {

            node.parent().prev().html("<input type='text' class='inputvalue' placeholder='" + placeholder + "' data-old='" + valinput + "' value='" + val + "'><i class='fa-solid fa-check correcticon'></i>");
            var len = $(".inputvalue");
            var t = len.val().trim() || '';
            var strLength = t.length;
            len.focus();
           
            len[0].setSelectionRange(strLength, strLength);

            node.parent().prev('.name').removeClass("summary");
            change_text_color();
            change_text_color_input();
            selectednodeColor();
            node.parents('ul.tree').find('li').removeAttr("draggable");
        }
        else {
          
        }
        $('.tree .inputvalue').keypress(function (e) {
            var key = e.which;
            if (key == 13)  
            {
               
                enter_edit(settings.edit);
                selectednodeColor();
                check_fontsize();
            }
        });
    }

    function enter_edit(callback) {
        if (($('.inputvalue').val() || '').trim() != '') {
            var newval = $('.inputvalue').val();
            var ee = $('.update').parent();
            check_draggable();
            $('.update').children('.name').html(newval);
            check_updateClass();
            $('.tree .name').addClass("summary");
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
            addselectedclass();
            check_node_color();
            if (typeof callback == 'function') {
                callback(ee, newval);
            }
        } else {
            var name = $(".inputvalue").data('old');
            var editedNode = $(".inputvalue").parent().parent().parent();
            check_draggable();
            $('.update').children('.name').html(name);
            check_updateClass();
            $('.tree .name').addClass("summary");
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
            addselectedclass();
            check_node_color();
          
            if (typeof callback == 'function') {
                callback(editedNode, name);
            }
        }
    }
    // save Name
    $(this).on('click', ".fa-check", function () {

        if ($('.node').hasClass("update")) {
            saveUpdated_child(settings.edit);
            check_node_color();
            check_fontsize();
            
        } else {
            saveadded_child($(this), settings.add);
            check_node_color();
            check_fontsize();
        }
    });

    function saveUpdated_child(callback) {
        var value = ($('.inputvalue').val() || '').trim();;
        if (value != '') {
            var newname = $(".inputvalue").val();
            var editedNode = $(".inputvalue").parent().parent().parent();
            check_draggable();
            $('.update').children('.name').html(newname);
            check_updateClass();
            $('.tree .name').addClass("summary");
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
           

            if (typeof callback == 'function') {
                callback(editedNode, newname);
            }
        } else {
            var name = $(".inputvalue").data('old');
            var edited = $(".inputvalue").parent().parent().parent();
            check_draggable();
            $('.update').children('.name').html($(".inputvalue").data('old'));

            check_updateClass();
            $('.tree .name').addClass("summary");
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
         
            if (typeof callback == 'function') {
                callback(edited, name);
            }
        }

    }
    function saveadded_child(node, callback) {

        if (($('.inputvalue').val() || '').trim() != "") {
            var value = $('.inputvalue').val();
            var addedNode = node.parent().parent().parent();
            check_draggable();
          
            node.parent().next().css("display", "block");
            node.parent().text(value);
            $('.tree .name').addClass("summary");
            $(tree).find('.selectNode').removeAttr("style");
            $(tree).find('li .node').removeClass('selectNode');
          
            //console.log("nnnnnnnnnn");
            if (typeof callback == "function") {
                callback(addedNode, value);
            }
        } else {
            $('.inputvalue').css("border-bottom", "1px solid red");
            $('.inputvalue').on('keydown', function () {
                $('.inputvalue').css("border-bottom", "1px solid rgb(143, 141, 141)");
            });
        }
    }

    function check_child() {

        $('.tree ul').each(function () {
            if ($(this).children().length == 0) {
                $(this).remove();
            }
        });
        $('.tree li').each(function () {
            if ($(this).children("ul").length == 0) {
                $(this).children().children(".caret").remove();
            }
        });
    }
    function save_all_input() {
        $('.inputvalue').each(function () {
            var value = $(this).val();
            if (value.trim() != "") {
                check_draggable();
                $(this).parent().next().css("display", "block");
                $(this).parent().text(value);
            } else {
                check_draggable();
                $(this).parent().parent().parent().remove();
                check_child();
            }
        });
        //check_node_color();
    }

    function check_updateClass() {
        if ($('.tree li .node').hasClass("update")) {
            $('.tree li .node').removeClass("update");
        }
    }
        $(this).find('li').on('dragstart', function (event) {        
            if(settings.draggable) {
            //event.style.opacity = ArhitectUtlityConstants.GHOSTPREVIEW.ghostOpacity;
            dragstart(event);
            selectednodeColor();
            }
        });
    
        function dragstart(event) {
            //$('.node').dragg();
           $(tree).find('.selectNode').removeAttr("style");
           $(tree).find('li .node').removeClass('selectNode');
           //$(tree).find('li .node').removeClass('selected');
           //$(tree).find('li .selected').removeAtte('style');

            $('.tree li').removeClass("moved");
            $('.tree li').removeClass("move_to");
            $("*").removeClass("draging");
            $("*").removeClass("oldparent");
            $('.tree li').removeClass("movedd");
            check_fontsize();
            if ( $('tree .moved').length < 1) {
                //console.log(event.target);
                event.target.classList.add("moved");
                //$('.tree .moved')
                $(event.target).parents('li').first().addClass('oldparent');
    
            }
        }

         $(tree).find('li').on('dragover', function (event) {
             
            if(settings.draggable) {
                $("*").removeClass("draging");
                event.preventDefault();

          if($(event.target).closest('.tree').is($('.moved').closest('.tree')) ){         

            if (((!$(event.target).parents().hasClass("moved")) && (event.target.className == "node" || event.target.className == "nested active" )) ) {
                event.target.style.background = "rgb(122, 124, 122)";
             
                $('.tree ul').removeAttr('style');
                event.target.classList.add("draging");
              
            }
         else if(((!$(event.target).parents().hasClass("moved")) && (event.target.parentNode.className == "node" || event.target.parentNode.className == "nested active"))){
               
               
                 event.target.parentNode.style.background = "rgb(122, 124, 122)";
                 $('.tree ul').removeAttr('style');
              
                event.target.parentNode.parentNode.classList.add("hovernodechild");
                event.target.parentNode.classList.add("draging");
              
                 
            }
        }
    }

        });
    
        $('.tree li:not(.moved)').on('drop', function (event) {
            if( settings.draggable) {
            drop($(this), event, settings.move);
            addselectedclass();
            check_node_color();
            selectednodeColor();
            check_fontsize();
      
            }
        });
    
        function drop(node, event, callback) {

         if($('.draging').closest('.tree').is($('.moved').closest('.tree')) ){
           
            if ($(".tree .move_to").length < 1 && $(".tree .draging").length >= 1) {
              
                if (!event.target.parentNode.classList.contains('moved')) {

                    if(node.hasClass("hovernodechild")){
                        
                        event.target.parentNode.parentNode.classList.add("move_to");
                    }
                    else{
                    
                        event.target.parentNode.classList.add("move_to");
                    }
                
                    if ($(".tree .move_to").children("ul").length >= 1) {
                        $(".tree .move_to").children("ul").addClass("movedd");
                        $(".tree .move_to").children("ul").append($(".moved").clone()).html();
                
                    } else {
                        
                            $('.node').each(function(){
                                if($(this).hasClass("move_to")){
                                    $(this).removeClass("move_to");
                                    $(this).parent('li').addClass('move_to');
                                }
                            });

                      $(".tree .move_to").children("span").prepend('<span class="caret caret-down"></span>');
                      $(".tree .move_to").append('<ul class="nested active"></ul>');
   
    
                        $(".tree .move_to").children("ul").addClass("movedd");
                        $(".tree .move_to").children("ul").append($(".moved").clone()).html();

                        if($(".tree .move_to").children(".node").children(".caret").length > 1){
                         
                            $(".tree .move_to").children(".node").children().eq(1).remove();
                           var r = $(".tree .move_to").children(".node").next().next().children();
                           $(".tree .move_to").children(".node").next().next().remove();
                            
                          }   
    
                    }
                    addselectedclass();

                    if (typeof callback == 'function') {
                        callback($(".move_to").children('ul').first().children('li').last(), $('.oldparent'), $('.draging').parent('li'));
                    }
    
                    check_moved();
                   
                    $('*').removeClass("hovernodechild");
                    
                    $('.tree li').removeClass("moved");
                    $('.tree li').removeClass("move_to");
                 
                    $("*").removeClass("draging");
                    $('.tree ul').removeClass("movedd");
    
                    $(tree).find('span.node').removeAttr("style");
    
                    check_child();
                   
                    event.preventDefault();
                    //  }
                }
            
            }
        }
        }
        $('.tree li').on('drag', function (event) {
            if(settings.draggable) {
           
            $('*').removeClass("draging");
            $('.tree li').removeClass("hovernodechild");
            //console.log(",,,");
            $(tree).find('span.node').removeAttr("style");
            $('.tree li').removeClass("draging");
           //$('.moved').children('.node').css('visibility','visible');
            //$('.tree .moved').children('.node').css("opacity","1");
            //$(tree).find('li .node').removeClass("selected");
            check_node_color();
            //$(tree).find('li .selected').removeAtte('style');
            selectednodeColor();
            $(tree).find('li .node').removeClass("selected");
            check_fontsize();
           
            //removeselectedclass();
            }
        });

      

        $('.tree li').on('dragend', function (event) {
            addselectedclass();
            selectednodeColor();
            check_fontsize();
        });
        
        function check_moved() {
            $('.tree .moved').each(function () {
                if (!$(this).closest("ul").hasClass("movedd") && !$(this).hasClass("move_to")) {
                    $(this).remove();
    
                }
    
            });
            if ($('.tree .moved').length > 1) {
                $('.tree .moved').first().remove();
            }
        }

    
};

