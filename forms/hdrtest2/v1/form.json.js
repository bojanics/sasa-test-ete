var formObj = {"_id":"599d5291d2d0de0007664515","machineName":"ewhyjxtmcncdriz:taz1","modified":"2018-01-16T15:17:24.927Z","title":"taz1","display":"form","name":"taz1","path":"taz1","project":"599d5201a0434200072250b3","action":"https://testapimgmtalfsasa1.azure-api.net/calc/add","_vid":0,"revisions":"","created":"2017-08-23T10:01:53.109Z","components":[{"customDefaultValue":"value = component.root.httprequest.queryjson.a;","labelPosition":"top","hideLabel":false,"lockKey":true,"properties":{"":""},"conditional":{"show":"","when":null,"eq":""},"tags":[],"type":"number","validate":{"required":true,"min":0,"max":9999,"step":"any","integer":"","multiple":"","custom":""},"clearOnHide":true,"hidden":false,"persistent":true,"protected":false,"defaultValue":"","suffix":"","prefix":"","placeholder":"","key":"n1","label":"Number '1'","inputType":"number","tableView":true,"input":true},{"labelPosition":"top","hideLabel":false,"properties":{"":""},"conditional":{"show":"","when":null,"eq":""},"tags":[],"type":"number","validate":{"required":true,"min":0,"max":9999,"step":"any","integer":"","multiple":"","custom":"valid =component.root.httprequest.queryjson.test=='mytest';"},"clearOnHide":true,"hidden":false,"persistent":true,"protected":false,"defaultValue":"","suffix":"","prefix":"","placeholder":"","key":"n2","label":"Number '2'","inputType":"number","tableView":true,"input":true,"lockKey":true},{"properties":{"":""},"tags":[],"labelPosition":"top","hideLabel":false,"type":"textfield","conditional":{"eq":"","when":null,"show":""},"validate":{"customPrivate":false,"custom":"","pattern":"","maxLength":"","minLength":"","required":false},"clearOnHide":true,"hidden":false,"persistent":true,"unique":false,"protected":false,"defaultValue":"https://prod-10.northcentralus.logic.azure.com/workflows/7e4f8bf5dad74347a56a07a32031705d/triggers/manual/paths/invoke/add?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EzFMVhiURY5EyXLEGkafNjbFxNp40VuIdPV-H0dZ2Zw","multiple":false,"suffix":"","prefix":"","placeholder":"","key":"url","label":"URL","inputMask":"","inputType":"text","tableView":true,"input":true,"customDefaultValue":""},{"hideLabel":false,"input":true,"label":"Add two numbers","tableView":false,"key":"addtwonumbers","size":"md","leftIcon":"","rightIcon":"","block":false,"action":"custom","disableOnInvalid":false,"theme":"primary","type":"button","tags":[],"conditional":{"show":"","when":null,"eq":""},"properties":{"":""},"lockKey":true,"event":"add2numbers","custom":"function addtwonumbers(url,formdata){\ndata['body']=undefined;\ndata['header']=undefined;\ndata['code']=undefined;\nif (typeof form !== 'undefined') {\n   form.submission=form.submission;\n}\nvar dataform = data;\nvar xhr = new XMLHttpRequest();\nxhr.open('POST',data['url'], false);\nxhr.onreadystatechange = function() {\nconsole.log('xhr.readyState='+xhr.readyState);\nconsole.log('xhr.status='+xhr.status);\nconsole.log('response='+xhr.responseText);\n    if (xhr.readyState == 4) {\n        var restxt = xhr.responseText;\nconsole.log('rt='+restxt);\nsetData(restxt,xhr.getAllResponseHeaders(),xhr.status);\n    }\n}\nxhr.setRequestHeader('Content-type','application/json');\nxhr.send(JSON.stringify(formdata));\n}\n\nfunction setData(restxt,resheaders,resstat) {\ndata['body']=restxt;\ndata['header']=resheaders;\ndata['code']=resstat;\nif (typeof form !== 'undefined') {\n   form.submission=form.submission;\n}\n}\n\n\nfunction test() {\n   var settings = {\n     \"crossDomain\": true,     \n     \"url\": url,\n     \"timeout\":30000,\n     \"method\": \"POST\",\n     \"headers\": {\n       \"content-type\": \"application/json\",\n       \"cache-control\": \"no-cache\"\n     },\n     \"data\": JSON.stringify(formdata),\n     \"dataType\": 'json',\n     \"contentType\": 'application/json'                          \n   }\n\n   $.ajax(settings).done(function (data,textStatus,request) {\n      //document.getElementById('mymessage').innerHTML='Calculation successfully performed!';\n      //console.log('data='+JSON.stringify(data));\n      //console.log('formdata='+JSON.stringify(formdata));\n      var datamerged = $.extend(formdata.data,data.data);\n      var datamergedstring = JSON.stringify(datamerged);\n      console.log('datamerged='+datamergedstring);\n      var initjson = JSON.parse('{\"data\":'+datamergedstring+'}');      \n      form.submission = initjson;      \nconsole.log('form submission set');\n   }).fail(function (err, textStatus, errorThrown) {\n      //document.getElementById('mymessage').innerHTML='Failed to calculate two numbers!';\n      console.log(\"AJAX REQUEST FAILED:\"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown+\", url=\"+url+\",formdata=\"+(formdata!=null ? JSON.stringify(formdata) : null));\n   });\n}\n\naddtwonumbers(data['url'],{\"data\":data});"},{"input":true,"label":"request bin ajax","tableView":false,"key":"requestbinajax","size":"md","leftIcon":"","rightIcon":"","block":false,"action":"custom","disableOnInvalid":false,"theme":"primary","type":"button","hideLabel":false,"tags":[],"conditional":{"show":"","when":null,"eq":""},"properties":{"":""},"custom":"$.ajax({\n        url: 'https://hookb.in/Ew797VjP',\n        type: \"POST\",\n\n      }).done(function(data) {\n        console.log(data)\n      }).fail(function(err) {\n        console.log(err)\n      });"},{"input":true,"label":"Req Bin","tableView":false,"key":"reqBin","size":"md","leftIcon":"","rightIcon":"","block":false,"action":"custom","disableOnInvalid":false,"theme":"primary","type":"button","hideLabel":false,"tags":[],"conditional":{"show":"","when":null,"eq":""},"properties":{"":""},"custom":"console.log('rqb req starts...');\n//var url = \"https://requestb.in/r8wxq9r8\";\nvar url = \"https://hookb.in/Ew797VjP\";\nvar xhr = new XMLHttpRequest();\n\nxhr.onload= function() {\nconsole.log('ONLOAD');\nconsole.log('status='+xhr.status);\nconsole.log('body='+xhr.responseText);\nconsole.log('header='+xhr.getAllResponseHeaders());\n         data['body']=xhr.responseText;\n         data['header']=xhr.getAllResponseHeaders();\n         data['code']=xhr.status;\n\n      if (typeof form !== 'undefined') {\n         form.submission=form.submission;\n      }\n}\n\nxhr.onerror= function() {\nconsole.log('ONERROR');\nconsole.log('status='+xhr.status);\nconsole.log('body='+xhr.responseText);\nconsole.log('header='+xhr.getAllResponseHeaders());\n         data['body']=xhr.responseText;\n         data['header']=xhr.getAllResponseHeaders();\n         data['code']=xhr.status;\n\n      if (typeof form !== 'undefined') {\n         form.submission=form.submission;\n      }\n}\n\nxhr.open(\"POST\",url,true);\nxhr.send(JSON.stringify(data));\nconsole.log('rqb req sent...');"},{"input":true,"tableView":true,"inputType":"number","label":"a","key":"a","placeholder":"","prefix":"","suffix":"","defaultValue":"","protected":false,"persistent":true,"hidden":false,"clearOnHide":true,"validate":{"required":false,"min":"","max":"","step":"any","integer":"","multiple":"","custom":""},"type":"number","hideLabel":false,"labelPosition":"top","tags":[],"conditional":{"show":"","when":null,"eq":""},"properties":{}},{"input":true,"tableView":true,"inputType":"number","label":"b","key":"b","placeholder":"","prefix":"","suffix":"","defaultValue":"","protected":false,"persistent":true,"hidden":false,"clearOnHide":true,"validate":{"required":false,"min":"","max":"","step":"any","integer":"","multiple":"","custom":""},"type":"number","hideLabel":false,"labelPosition":"top","tags":[],"conditional":{"show":"","when":null,"eq":""},"properties":{}},{"custom":"function addtwonumbers(url,formdata){\n   executeAjaxRequestWithAdalLogic(ADAL.config.clientId,addtwonumbersnoadal,url,formdata);\n}\n\nfunction addtwonumbersnoadal(token,url,formdata) {\n   var settings = {\n     \"crossDomain\": true,     \n     \"url\": url,\n     \"timeout\":30000,\n     \"method\": \"POST\",\n     \"headers\": {\n       \"content-type\": \"application/json\",\n       \"authorization\": \"Bearer \"+token,\n       \"cache-control\": \"no-cache\"\n     },\n     \"data\": JSON.stringify(formdata),\n     \"dataType\": 'json',\n     \"contentType\": 'application/json'                          \n   }\n\n   $.ajax(settings).done(function (data,textStatus,request) {\n      document.getElementById('mymessage').innerHTML='Calculation successfully performed!';\n      //console.log('data='+JSON.stringify(data));\n      //console.log('formdata='+JSON.stringify(formdata));\n      var datamerged = $.extend(formdata.data,data.data);\n      var datamergedstring = JSON.stringify(datamerged);\n      //console.log('datamerged='+datamergedstring);\n      var initjson = JSON.parse('{\"data\":'+datamergedstring+'}');\n      \n      form.submission = initjson;      \n   }).fail(function (err, textStatus, errorThrown) {\n      document.getElementById('mymessage').innerHTML='Failed to calculate two numbers!';\n      console.log(\"AJAX REQUEST FAILED:\"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown+\", url=\"+url+\",formdata=\"+(formdata!=null ? JSON.stringify(formdata) : null));\n      alert(\"AJAX REQUEST FAILED:\"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown+\", url=\"+url+\",formdata=\"+(formdata!=null ? JSON.stringify(formdata) : null));\n   });\n}\n\naddtwonumbers(data['url'],{\"data\":form.submission.data});","properties":{},"conditional":{"eq":"","when":null,"show":""},"tags":[],"hideLabel":false,"type":"button","theme":"primary","disableOnInvalid":false,"action":"custom","block":false,"rightIcon":"","leftIcon":"","size":"md","key":"submit2","tableView":false,"label":"Add 2 numbers ADAL - url field","input":true},{"custom":"function addtwonumbers(url,formdata){\n   executeAjaxRequestWithAdalLogic(ADAL.config.clientId,addtwonumbersnoadal,url,formdata);\n}\n\nfunction addtwonumbersnoadal(token,url,formdata) {\n   var settings = {\n     \"crossDomain\": true,     \n     \"url\": url,\n     \"timeout\":30000,\n     \"method\": \"POST\",\n     \"headers\": {\n       \"content-type\": \"application/json\",\n       \"authorization\": \"Bearer \"+token,\n       \"cache-control\": \"no-cache\"\n     },\n     \"data\": JSON.stringify(formdata),\n     \"dataType\": 'json',\n     \"contentType\": 'application/json'                          \n   }\n\n   $.ajax(settings).done(function (data,textStatus,request) {\n      document.getElementById('mymessage').innerHTML='Calculation successfully performed!';\n      //console.log('data='+JSON.stringify(data));\n      //console.log('formdata='+JSON.stringify(formdata));\n      var datamerged = $.extend(formdata.data,data.data);\n      var datamergedstring = JSON.stringify(datamerged);\n      //console.log('datamerged='+datamergedstring);\n      var initjson = JSON.parse('{\"data\":'+datamergedstring+'}');\n      \n      form.submission = initjson;      \n   }).fail(function (err, textStatus, errorThrown) {\n      document.getElementById('mymessage').innerHTML='Failed to calculate two numbers!';\n      console.log(\"AJAX REQUEST FAILED:\"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown+\", url=\"+url+\",formdata=\"+(formdata!=null ? JSON.stringify(formdata) : null));\n      alert(\"AJAX REQUEST FAILED:\"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown+\", url=\"+url+\",formdata=\"+(formdata!=null ? JSON.stringify(formdata) : null));\n   });\n}\n\naddtwonumbers(component.root.httprequest.queryjson.API_add_url,{\"data\":form.submission.data});","properties":{},"conditional":{"eq":"","when":null,"show":""},"tags":[],"hideLabel":false,"type":"button","theme":"primary","disableOnInvalid":false,"action":"custom","block":false,"rightIcon":"","leftIcon":"","size":"md","key":"submit3","tableView":false,"label":"Add 2 numbers ADAL - form httprequest API_add_url","input":true},{"isNew":false,"input":true,"label":"Add 2 numbers ADAL - submission API_add_url","tableView":false,"key":"submit4","size":"md","leftIcon":"","rightIcon":"","block":false,"action":"custom","disableOnInvalid":false,"theme":"primary","type":"button","hideLabel":false,"tags":[],"conditional":{"show":"","when":null,"eq":""},"properties":{},"custom":"function addtwonumbers(url,formdata){\n   executeAjaxRequestWithAdalLogic(ADAL.config.clientId,addtwonumbersnoadal,url,formdata);\n}\n\nfunction addtwonumbersnoadal(token,url,formdata) {\n   var settings = {\n     \"crossDomain\": true,     \n     \"url\": url,\n     \"timeout\":30000,\n     \"method\": \"POST\",\n     \"headers\": {\n       \"content-type\": \"application/json\",\n       \"authorization\": \"Bearer \"+token,\n       \"cache-control\": \"no-cache\"\n     },\n     \"data\": JSON.stringify(formdata),\n     \"dataType\": 'json',\n     \"contentType\": 'application/json'                          \n   }\n\n   $.ajax(settings).done(function (data,textStatus,request) {\n      document.getElementById('mymessage').innerHTML='Calculation successfully performed!';\n      //console.log('data='+JSON.stringify(data));\n      //console.log('formdata='+JSON.stringify(formdata));\n      var datamerged = $.extend(formdata.data,data.data);\n      var datamergedstring = JSON.stringify(datamerged);\n      //console.log('datamerged='+datamergedstring);\n      var initjson = JSON.parse('{\"data\":'+datamergedstring+'}');\n      \n      form.submission = initjson;      \n   }).fail(function (err, textStatus, errorThrown) {\n      document.getElementById('mymessage').innerHTML='Failed to calculate two numbers!';\n      console.log(\"AJAX REQUEST FAILED:\"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown+\", url=\"+url+\",formdata=\"+(formdata!=null ? JSON.stringify(formdata) : null));\n      alert(\"AJAX REQUEST FAILED:\"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown+\", url=\"+url+\",formdata=\"+(formdata!=null ? JSON.stringify(formdata) : null));\n   });\n}\n\naddtwonumbers(form.submission.data['API_add_url'],{\"data\":form.submission.data});"},{"input":true,"tableView":true,"inputType":"number","label":"c","key":"c","placeholder":"","prefix":"","suffix":"","defaultValue":"","protected":false,"persistent":true,"hidden":false,"clearOnHide":true,"validate":{"required":false,"min":"","max":"","step":"any","integer":"","multiple":"","custom":""},"type":"number","hideLabel":false,"labelPosition":"top","tags":[],"conditional":{"show":"","when":null,"eq":""},"properties":{},"disabled":true},{"labelPosition":"top","hideLabel":false,"disabled":true,"input":true,"tableView":true,"inputType":"number","label":"Result (Number1+Number2)","key":"res","placeholder":"","prefix":"","suffix":"","defaultValue":"","protected":false,"persistent":true,"hidden":false,"clearOnHide":true,"validate":{"custom":"","multiple":"","integer":"","step":"any","max":"","min":"","required":false},"type":"number","tags":[],"conditional":{"eq":"","when":null,"show":""},"properties":{"":""},"lockKey":true},{"lockKey":true,"properties":{"":""},"conditional":{"eq":"","when":null,"show":""},"tags":[],"labelPosition":"top","hideLabel":false,"type":"textarea","validate":{"custom":"","pattern":"","maxLength":"","minLength":"","required":false},"clearOnHide":true,"wysiwyg":false,"hidden":false,"persistent":true,"protected":false,"defaultValue":"","multiple":false,"rows":3,"suffix":"","prefix":"","placeholder":"","key":"header","label":"Response headers","tableView":true,"input":true},{"lockKey":true,"input":true,"tableView":true,"inputType":"text","inputMask":"","label":"response status","key":"code","placeholder":"","prefix":"","suffix":"","multiple":false,"defaultValue":"","protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"validate":{"required":false,"minLength":"","maxLength":"","pattern":"","custom":"","customPrivate":false},"conditional":{"show":"","when":null,"eq":""},"type":"textfield","hideLabel":false,"labelPosition":"top","tags":[],"properties":{"":""}},{"lockKey":true,"properties":{"":""},"conditional":{"eq":"","when":null,"show":""},"tags":[],"labelPosition":"top","hideLabel":false,"type":"textarea","validate":{"custom":"","pattern":"","maxLength":"","minLength":"","required":false},"clearOnHide":true,"wysiwyg":false,"hidden":false,"persistent":true,"protected":false,"defaultValue":"","multiple":false,"rows":3,"suffix":"","prefix":"","placeholder":"","key":"body","label":"Response","tableView":true,"input":true},{"custom":"data['formdata']=undefined;\nconsole.log('now step1');\ndata['formdata']=JSON.stringify(data);\nconsole.log('now step2');\nif (typeof form !== 'undefined') {\n   form.submission=form.submission;\n}","properties":{"":""},"conditional":{"eq":"","when":null,"show":""},"tags":[],"hideLabel":false,"type":"button","theme":"primary","disableOnInvalid":false,"action":"custom","block":false,"rightIcon":"","leftIcon":"","size":"md","key":"submit","tableView":false,"label":"Submit","input":true},{"lockKey":true,"properties":{"":""},"conditional":{"eq":"","when":null,"show":""},"tags":[],"labelPosition":"top","hideLabel":false,"type":"textarea","validate":{"custom":"","pattern":"","maxLength":"","minLength":"","required":false},"clearOnHide":true,"wysiwyg":false,"hidden":false,"persistent":true,"protected":false,"defaultValue":"","multiple":false,"rows":3,"suffix":"","prefix":"","placeholder":"","key":"formdata","label":"Form data","tableView":true,"input":true}],"owner":"599d5130a0434200072250ab","submissionAccess":[{"type":"create_own","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"create_all","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"read_own","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"read_all","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"update_own","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"update_all","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"delete_own","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"delete_all","roles":["599d5201a0434200072250b4","599d5201a0434200072250b6"]},{"type":"team_read","roles":[]},{"type":"team_write","roles":[]},{"type":"team_admin","roles":[]}],"access":[{"type":"create_own","roles":[]},{"type":"create_all","roles":[]},{"type":"read_own","roles":[]},{"type":"read_all","roles":["599d5201a0434200072250b4","599d5201a0434200072250b5","599d5201a0434200072250b6"]},{"type":"update_own","roles":[]},{"type":"update_all","roles":[]},{"type":"delete_own","roles":[]},{"type":"delete_all","roles":[]},{"type":"team_read","roles":[]},{"type":"team_write","roles":[]},{"type":"team_admin","roles":[]}],"tags":[],"type":"form"};
