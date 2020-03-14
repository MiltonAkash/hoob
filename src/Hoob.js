class Hoob{

    constructor( rawData = {} ) {
        this._initVal				=	rawData;
        this._patch					=	{};
        this._markAsDelete	        =	false;
        Object.assign(this,rawData);
        return this._connectProxy(rawData);

    }



    _connectProxy(){
        let self = this;
        return new Proxy( self, {

            set: function ( obj, key, value ) {

                self._patch[ key ]  = value;
                obj[ key ]          = value;
                return true;

            },

            deleteProperty: function( obj, key ) {

                delete self._patch[key];
                delete obj[key];

            }

        });
    }

    rollBackAttributes(){

        Object.assign(this,this._initVal,{
            _markAsDelete:false,
            _patch : {}
        });
        // this._patch         = {};
        // this._markAsDelete  = false;
        return this;

    }

    hasDirtyAttributes(){

        // Take difference between initval and this

        return Object.entries(this._patch).length || this._markAsDelete;

    }

    changedAttributes(){

        let mapObject = {};
        Object.keys( this._patch )
            .forEach(key => {
                mapObject[ key ] = [ this._initVal[ key ], this._patch[ key ] ];
            });
        return mapObject;

    }

    deleteRecord(){
        this._markAsDelete = true;
    }

    save(){

    }

}

module.exports = Hoob;
