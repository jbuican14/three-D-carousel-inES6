
(function(scope, isLibraryExist) {
    const version = 1.01;
    let doc     = window.document;
    let qlobal  = '';

    let globalLib = (selector, context) => {
        return qlobal.query(selector, context);
    };

    const DomQuery = class {
        query(selector, context) { 
            return (context ? context.querySelectorAll(selector) : doc.querySelectorAll(selector)); 
        }
    }

    const SizzleAdapter = class {
        constructor(lib) {this.lib = lib;}
        query(selector, context) {
            return (context? this.lib(selector, context) : this.lib(selector, doc));
        }
    }

    
    globalLib.loadJS = (path, callback) => {
        let js  = doc.createElement('script');
        js.src  = path;
        js.type = 'text/javascript';

        js.onload = () => {
            callback();
            this.onload = this.onreadystatechange = null; 
        }

        js.onreadystatechange = () => {
            if(this.readState === 'complete') {
                this.onload(); 
            }
        }
        
        doc.getElementsByTagName('head')[0].appendChild(js);
            
    };

    globalLib.ready = (func) => {
        let last    = window.onload;
        let isReady = false;

        if(doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', () => {
                isReady = true;
                func();
            });
        }else {
            //Preventing overwrite any onload
            window.onload = () => {
                if(last)    last();
                if(isReady) func(); 
            }
        }        
    }

    globalLib.version = () => {
        return version;
    }

    //call globalLib
    globalLib.ready( () => {
        if(doc.querySelectorAll && doc.querySelectorAll('body:first-of-type')) {
            qlobal = new DomQuery(); 
        }else{
            globalLib.loadJS('https://cdnjs.cloudflare.com/ajax/libs/sizzle/2.3.4/sizzle.min.js', () => {
                qlobal = new SizzleAdapter(Sizzle);
            });
        }
    });

    
    if(!window.globalLib) {
        window.globalLib = globalLib; 
    }else {
        throw new Error("Global Library doesn't exist in window"); 
    }

}(window));