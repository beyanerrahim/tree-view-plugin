$(document).ready(function(){
    $('.smart').SmartTree(
        {
        //  rtl: true,
         active: true,
        //draggable:false,

        // editicons : false,
        // addicons : false,
        // removeicons : false,

       selectColor : "#82d6eb",
        //selectedAttr : "#addbc1",
        selectedAttr : "#fff111",
        nodeColor : "rgb(195, 228, 226)",
        textColor : "orange",

        //font type and font size
        //fontType : 'Gill Sans',
        selectednodetextColor:"red",
        //fontType:'Franklin Gothic Medium',
     
        //fontSize: 18,

        remove : function(e){
           console.log("removed node tree 1");
           console.log(e);
           console.log(e.data('id'));
        },
        add : function(e , name){
            console.log("added node tree 1");
            console.log(e);
            console.log(e.data('id'));
            console.log(name);
        },
        edit : function(es , name){
            console.log("updated node tree 1");
            console.log(es);
            console.log(es.data('id'));
            console.log(name);
        },
        move : function(e , old_parent ,new_parent){
            console.log("moved node tree 1");
            console.log(e);
            console.log(e.data('id'));
            console.log(old_parent);
            console.log(old_parent.data('id'));
            console.log(new_parent);
            console.log(new_parent.data('id'));
        }
    }
    );
    $('.dd').SmartTree({
        //rtl: true,
        // nameColor: "green",
        active: true,
        nodeColor : "rgb(140, 161, 213)",
        // nodeColor : "red",
        //  selectColor : "#687372",
        //  undraggable:true,
       
    });
    $('.tt').SmartTree({
        rtl: false,
        active: true,
        // editicons : false,
        // nameColor: "yellow",
        // addicons : false,
        // removeicons : false,
    
        remove : function(){
            console.log("removed node tree 3");
         },
         add : function(){
             console.log("added node tree 3");
         },
         edit : function(){
             console.log("updated node tree 3");
         }
    });
   
});

