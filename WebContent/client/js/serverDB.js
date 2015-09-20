globalCursorData = {
    callerRef: -1,
    valueList: -1,
    cursor: -1,
    target: {
        result: {
            value: -1
        }
    }
},
serverDB={};

serverDB.db={
		transaction:function(collectionType,mode){
            this.Transaction.collectionType = collectionType;
            this.Transaction.mode = mode;
            return this.Transaction;
		}
},
serverDB.db.Transaction={
	objectStore:function(collectionType){
   		this.ObjectStore.collectionType = collectionType;
        return this.ObjectStore;
    }
},
serverDB.db.Transaction.ObjectStore={
    put:function(a){
    	console.log('PUT called: '+this.collectionType+"->"+ JSON.stringify(a));
        var newResult = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4){ 
               	if (xmlhttp.status == 200) {
                    newResult.onsuccess(xmlhttp.responseText);
                }else{
                    newResult.onfailure(xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open("POST", "../http/db/"+this.collectionType+"/" + "PUT", true);
        if(a == undefined || a == null)
        	xmlhttp.send();
        else
        	xmlhttp.send(JSON.stringify(a));
    	return newResult;
    },
    get:function(a){
    	console.log('GET called: '+this.collectionType+"->"+ JSON.stringify(a));
    	var newResult = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4){ 
               	if (xmlhttp.status == 200) {
                    newResult.onsuccess({target:{result:JSON.parse(xmlhttp.responseText)}});
                }else{
                    newResult.onfailure(xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open("POST", "../http/db/"+this.collectionType+"/" + "GET?key="+a, true);
        if(a == undefined || a == null)
        	xmlhttp.send();
        else
        	xmlhttp.send(JSON.stringify(a));
    	return newResult;
    },
    index:function(a){
    	this.Index = {};
    	this.Index.indexOn = a;
    	this.Index.openCursor = function(openCursorOn){
    				var newResult = {};
    				var xmlhttp = new XMLHttpRequest();
    		        xmlhttp.onreadystatechange = function() {
    		            if (xmlhttp.readyState == 4){ 
    		               	if (xmlhttp.status == 200) {
                                   globalCursorData.valueList = JSON.parse(xmlhttp.responseText),
                               	   globalCursorData.cursor = 0;
                                   globalCursorData.target= {};
                                   if(globalCursorData.valueList.length>0){
                                	   globalCursorData.target.result={};
                                	   globalCursorData.target.result.value = globalCursorData.valueList[globalCursorData.cursor];
                                	   globalCursorData.callerRef = newResult;
                                       globalCursorData.target.result.continue = function(){
                                    	   globalCursorData.cursor=globalCursorData.cursor+1;
                                           if(globalCursorData.cursor >= globalCursorData.valueList.length){
                                           	globalCursorData.target.result=null;
                                           }else{
                                            globalCursorData.target.result.value = globalCursorData.valueList[globalCursorData.cursor];
                                           }
                                           globalCursorData.callerRef.onsuccess(globalCursorData);
                                        }
                                   }
                               	  newResult.onsuccess(globalCursorData);
    		                }else{
    		                    newResult.onerror(xmlhttp.responseText);
    		                }
    		            }
    		        };
    		        
    		        xmlhttp.open("POST", "../http/db/"+this.collectionType+"/INDEX?indexOn="+this.indexOn+"&key=collectionId&value=" + openCursorOn.lower, true);
    		        xmlhttp.send();
    		        
    				return newResult;
    			}
    	
    	this.Index.collectionType = this.collectionType;
    	return this.Index;
    },
    openCursor:function(a){
    	console.log('objectstore open cursor:'+a+':::'+this.collectionType);

		var newResult = {};
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4){ 
               	if (xmlhttp.status == 200) {
                       globalCursorData.valueList = JSON.parse(xmlhttp.responseText),
                   	   globalCursorData.cursor = 0;
                       globalCursorData.target= {};
                       if(globalCursorData.valueList.length>0){
                    	   globalCursorData.target.result={};
                    	   globalCursorData.target.result.value = globalCursorData.valueList[globalCursorData.cursor];
                    	   globalCursorData.callerRef = newResult;
                           globalCursorData.target.result.continue = function(){
                        	   globalCursorData.cursor=globalCursorData.cursor+1;
                               if(globalCursorData.cursor >= globalCursorData.valueList.length){
                               	globalCursorData.target.result=null;
                               }else{
                                globalCursorData.target.result.value = globalCursorData.valueList[globalCursorData.cursor];
                               }
                               globalCursorData.callerRef.onsuccess(globalCursorData);
                            }
                       }
                   	  newResult.onsuccess(globalCursorData);
                }else{
                    newResult.onerror(xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open("POST", "../http/db/"+this.collectionType+"/INDEX", true);
        xmlhttp.send();
        
		return newResult;
    },
    delete:function(a){
    	console.log('DELETE called: '+this.collectionType+"->"+ a);
    	var newResult = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4){ 
               	if (xmlhttp.status == 200) {
                    newResult.onsuccess(xmlhttp.responseText);
                }else{
                    newResult.onfailure(xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open("POST", "../http/db/"+this.collectionType+"/DELETE?key=" + a, true);
        xmlhttp.send();
    	return newResult;
    },
    clear:function(){
    	console.log('Clear called');
    	var newResult = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4){ 
               	if (xmlhttp.status == 200) {
                    newResult.onsuccess(xmlhttp.responseText);
                }else{
                    alert('Sorry! could not clear history! Please try again later!');
                }
            }
        };
        xmlhttp.open("POST", "../http/db/"+this.collectionType+"/CLEAR", true);
        xmlhttp.send();
    	return newResult;
    }
}, 
pm.indexedDB = {
    onerror: function(e, t) {
        console.log(e)
    },
    open: function() {
    	pm.indexedDB.db=serverDB.db;
    	pm.history.getAllRequests();
    	pm.envManager.getAllEnvironments();
    },
    addCollection: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collections"], "readwrite"),
            i = r.objectStore("collections"),
            s = i.put({
                id: e.id,
                name: e.name,
                timestamp: (new Date).getTime()
            });
        s.onsuccess = function() {
            t(e)
        }, s.onerror = function(e) {
            console.log(e.value)
        }
    },
    updateCollection: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collections"], "readwrite"),
            i = r.objectStore("collections"),
            s = IDBKeyRange.only(e.id),
            o = i.put(e);
        o.onsuccess = function(n) {
            t(e)
        }, o.onerror = function(e) {
            console.log(e.value)
        }
    },
    addCollectionRequest: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collection_requests"], "readwrite"),
            i = r.objectStore("collection_requests"),
            s = i.put({
                collectionId: e.collectionId,
                id: e.id,
                name: e.name,
                description: e.description,
                url: e.url.toString(),
                method: e.method.toString(),
                headers: e.headers.toString(),
                data: e.data.toString(),
                dataMode: e.dataMode.toString(),
                timestamp: e.timestamp
            });
        s.onsuccess = function() {
            t(e)
        }, s.onerror = function(e) {
            console.log(e.value)
        }
    },
    updateCollectionRequest: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collection_requests"], "readwrite"),
            i = r.objectStore("collection_requests"),
            s = IDBKeyRange.only(e.id),
            o = i.put(e);
        o.onsuccess = function(n) {
            t(e)
        }, o.onerror = function(e) {
            console.log(e.value)
        }
    },
    getCollection: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collections"], "readwrite"),
            i = r.objectStore("collections"),
            s = i.get(e);
        s.onsuccess = function(e) {
            var n = e.target.result;
            t(n)
        }, s.onerror = pm.indexedDB.onerror
    },
    getCollections: function(e) {
        var t = pm.indexedDB.db;
        if (t == null) return;
        var n = t.transaction(["collections"], "readwrite"),
            r = n.objectStore("collections"),
            i = IDBKeyRange.lowerBound(0),
            s = r.openCursor(i),
            o = 0,
            u = [];
        s.onsuccess = function(t) {
            var n = t.target.result;
            if (!n) {
                e(u);
                return
            }
            var r = n.value;
            o++, u.push(r), n["continue"]()
        }, s.onerror = function(e) {
            console.log(e)
        }
    },
    getAllRequestsInCollection: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collection_requests"], "readwrite"),
            i = IDBKeyRange.only(e.id),
            s = r.objectStore("collection_requests"),
            o = s.index("collectionId"),
            u = o.openCursor(i),
            a = [];
        u.onsuccess = function(n) {
            var r = n.target.result;
            if (!r) {
                t(e, a);
                return
            }
            var i = r.value;
            a.push(i), r["continue"]()
        }, u.onerror = pm.indexedDB.onerror
    },
    addRequest: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["requests"], "readwrite"),
            i = r.objectStore("requests"),
            s = i.put(e);
        s.onsuccess = function(n) {
            t(e)
        }, s.onerror = function(e) {
            console.log(e.value)
        }
    },
    getRequest: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["requests"], "readwrite"),
            i = r.objectStore("requests"),
            s = i.get(e);
        s.onsuccess = function(e) {
            var n = e.target.result;
            if (!n) return;
            t(n)
        }, s.onerror = pm.indexedDB.onerror
    },
    getCollectionRequest: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collection_requests"], "readwrite"),
            i = r.objectStore("collection_requests"),
            s = i.get(e);
        s.onsuccess = function(e) {
            var n = e.target.result;
            if (!n) return;
            return t(n), n
        }, s.onerror = pm.indexedDB.onerror
    },
    getAllRequestItems: function(e) {
        var t = pm.indexedDB.db;
        if (t == null) return;
        var n = t.transaction(["requests"], "readwrite"),
            r = n.objectStore("requests"),
            i = IDBKeyRange.lowerBound(0),
            s = r.index("timestamp"),
            o = s.openCursor(i),
            u = [];
        o.onsuccess = function(t) {
            var n = t.target.result;
            if (!n) {
                e(u);
                return
            }
            var r = n.value;
            u.push(r), n["continue"]()
        }, o.onerror = pm.indexedDB.onerror
    },
    deleteRequest: function(e, t) {
        try {
            var n = pm.indexedDB.db,
                r = n.transaction(["requests"], "readwrite"),
                i = r.objectStore(["requests"]),
                s = i["delete"](e);
            s.onsuccess = function() {
                t(e)
            }, s.onerror = function(e) {
                console.log(e)
            }
        } catch (o) {
            console.log(o)
        }
    },
    deleteHistory: function(e) {
        var t = pm.indexedDB.db,
            n = t.transaction(["requests"], "readwrite"),
            r = n.objectStore(["requests"]).clear();
        r.onsuccess = function(t) {
            e()
        }
    },
    deleteCollectionRequest: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collection_requests"], "readwrite"),
            i = r.objectStore(["collection_requests"]),
            s = i["delete"](e);
        s.onsuccess = function(n) {
            t(e)
        }, s.onerror = function(e) {
            console.log(e)
        }
    },
    deleteAllCollectionRequests: function(e) {
        var t = pm.indexedDB.db,
            n = t.transaction(["collection_requests"], "readwrite"),
            r = IDBKeyRange.only(e),
            i = n.objectStore("collection_requests"),
            s = i.index("collectionId"),
            o = s.openCursor(r);
        o.onsuccess = function(e) {
            var t = e.target.result;
            if (!t) return;
            var n = t.value;
            pm.collections.deleteCollectionRequest(n.id), t["continue"]()
        }, o.onerror = pm.indexedDB.onerror
    },
    deleteCollection: function(e, t) {
        var n = pm.indexedDB.db,
            r = n.transaction(["collections"], "readwrite"),
            i = r.objectStore(["collections"]),
            s = i["delete"](e);
        s.onsuccess = function() {
            pm.indexedDB.deleteAllCollectionRequests(e), t(e)
        }, s.onerror = function(e) {
            console.log(e)
        }
    },
    environments: {
        addEnvironment: function(e, t) {
            var n = pm.indexedDB.db,
                r = n.transaction(["environments"], "readwrite"),
                i = r.objectStore("environments"),
                s = i.put(e);
            s.onsuccess = function(n) {
                t(e)
            }, s.onerror = function(e) {
                console.log(e)
            }
        },
        getEnvironment: function(e, t) {
            var n = pm.indexedDB.db,
                r = n.transaction(["environments"], "readwrite"),
                i = r.objectStore("environments"),
                s = i.get(e);
            s.onsuccess = function(e) {
                var n = e.target.result;
                t(n)
            }, s.onerror = pm.indexedDB.onerror
        },
        deleteEnvironment: function(e, t) {
            var n = pm.indexedDB.db,
                r = n.transaction(["environments"], "readwrite"),
                i = r.objectStore(["environments"]),
                s = i["delete"](e);
            s.onsuccess = function() {
                t(e)
            }, s.onerror = function(e) {
                console.log(e)
            }
        },
        getAllEnvironments: function(e) {
            var t = pm.indexedDB.db;
            if (t == null) return;
            var n = t.transaction(["environments"], "readwrite"),
                r = n.objectStore("environments"),
                i = IDBKeyRange.lowerBound(0),
                s = r.index("timestamp"),
                o = s.openCursor(i),
                u = [];
            o.onsuccess = function(t) {
                var n = t.target.result;
                if (!n) {
                    e(u);
                    return
                }
                var r = n.value;
                u.push(r), n["continue"]()
            }, o.onerror = pm.indexedDB.onerror
        },
        updateEnvironment: function(e, t) {
            var n = pm.indexedDB.db,
                r = n.transaction(["environments"], "readwrite"),
                i = r.objectStore("environments"),
                s = IDBKeyRange.only(e.id),
                o = i.put(e);
            o.onsuccess = function(n) {
                t(e)
            }, o.onerror = function(e) {
                console.log(e.value)
            }
        }
    }
}