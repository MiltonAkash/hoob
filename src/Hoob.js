class Hoob{

    constructor( rawData = {} ) {
        this._initVal				=	rawData;
        // this._patch					=	{};
        this._markAsDelete	        =	false;
        Object.assign(this,rawData);
        // return this._connectProxy(rawData);

    }

    //
    //
    // _connectProxy(){
    //     let self = this;
    //     return new Proxy( self, {
    //
    //         set: function ( obj, key, value ) {
    //
    //             self._patch[ key ]  = value;
    //             obj[ key ]          = value;
    //             return true;
    //
    //         },
    //
    //         deleteProperty: function( obj, key ) {
    //
    //             delete self._patch[key];
    //             delete obj[key];
    //
    //         }
    //
    //     });
    // }

    rollBackAttributes(){

        // Object.assign(this,this._initVal,{
        //     _markAsDelete:false,
        //     _patch : {}
        // });
        // this._patch         = {};

        Object.keys(this).filter(Hoob.isExternal).forEach(key=>{
            delete this[key];
        });
        Object.assign(this,this._initVal);
        this._markAsDelete  = false;
        return this;

    }

    hasDirtyAttributes(){

        var _this = this;
        return Object.keys(this)
            .filter(Hoob.isExternal)
            .some(function(key){
                return  typeof _this._initVal[key] == 'undefined' || _this._initVal[key] != _this[key];
            });

    }

    changedAttributes(){
        let changes = [];
        var _this = this;
        return Object.keys(this)
            .filter(Hoob.isExternal)
            .every(function(key){
                return  typeof _this._initVal[key] == 'undefined' || _this._initVal[key] != _this[key];
            });


    }

    deleteRecord(){
        this._markAsDelete = true;
    }

    // save(){
    //
    //     this._
    //
    // }

    static isExternal( key ){
        const internalVar = ['_initVal','_markAsDelete'];
        return !internalVar.includes( key );
    }

}

module.exports = Hoob;
