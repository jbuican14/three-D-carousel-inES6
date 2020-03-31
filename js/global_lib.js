(function(scope) {
    let doc = window.document;
    let globalNotation = {};
    let degreeValue, translateValue;

    let globalCarouselLib = (nums) => {
        return globalNotation.rotateY(nums);
    }

    const RotateY = class {
        rotateY(nums = 2) {
           return this.degreeValue = Math.round(360/nums);
        };
    };


    globalCarouselLib.ready = (func) => {
        let last = window.onload;
        let isReady = false;

        if(doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', ()=> {
                isReady = true;
                func();
            });
        } else {
            window.onload = () => {
                if(last) last();
                if(isReady) func();
            }
        }
    }

    globalCarouselLib.ready( 
        ()=> {
            globalNotation = new RotateY();            
        }
    );

    if(!window.globalCarouselLib) {
        window.globalCarouselLib = globalCarouselLib;
    }else {
        throw new Error("Global library doesn't exist in this window");
    }

}(window));