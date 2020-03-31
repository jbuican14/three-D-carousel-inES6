describe("ThreeD", function(){
    var new3DCarouselObj;
    

    init = () => {
        console.log('init');

        console.log(typeof new3DCarouselObj);
    }
       
    it("global Carouse Library should return type of number", function(){

        globalCarouselLib.ready(init);
        new3DCarouselObj = globalCarouselLib(3); 
        console.log(new3DCarouselObj);
        expect(typeof new3DCarouselObj).toEqual('number');
    }); 

    it("global Carouse Library should return value of rotation", function(){
        globalCarouselLib.ready(init);
        new3DCarouselObj = globalCarouselLib(3); 
        console.log(new3DCarouselObj);
         expect(new3DCarouselObj).toEqual(120);
    });

});