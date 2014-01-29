KISSY.ready(function (S) {

    S.use('editor', function () {

        var KE = KISSY.Editor;
        var cfg = {
            attachForm:true,
            baseZIndex:10000,
            //�Զ�����ʽ
            //customStyle:"p{color:purple;}",
            //�Զ����ⲿ��ʽ
            //customLink:["http://localhost/customLink.css","http://xx.com/y2.css"],
            //�Ƿ�һ��ʼ�Զ��۽�
            //focus:true,
            pluginConfig:{
                "image":{
                    upload:{
                        serverUrl:"/admin/upload/image",
                        serverParams:{
                        },
                        surfix:"png,jpg,jpeg,gif",
                        fileInput:"Filedata",
                        sizeLimit:1000 //k
                    }
                },
                //"font-size":false,
                //"font-family":false,
                //"font-bold":false,
                // "font-italic":false,
                //"font-underline":false,

//                "font-strikeThrough":{
//                    style:{
//                        element        : 'strike',
//                        overrides    : [
//                            {element        : 'span',
//                                attributes         : { style:'text-decoration: line-through;' }},
//                            { element : 's' },
//                            { element : 'del' }
//                        ]
//                    }
//                },
                "resize":{
                    direction:["y"]
                },

                dragupload:{
                    surfix:"png,jpg,jpeg,gif",
                    fileInput:"Filedata",
                    sizeLimit:1000,
                    serverUrl:"/code/upload/web/upload.jsp",
                    serverParams:{
                        waterMark:function () {
                            return true;
                        }
                    }
                }
            }
        };
        var editor = KE("#editor", S.clone(cfg)).use("elementpaths," +
            "preview," +
            "separator," +
            "undo,separator," +
            "removeformat,font,format,color,separator," +
            "list,indent," +
            "justify,separator,link," +
            "image," +
            "separator,table,resize," +
            "pagebreak,separator,maximize,dragupload");
    });
});