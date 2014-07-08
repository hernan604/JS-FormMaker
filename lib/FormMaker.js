
  var FormMaker = FormMaker || ( function ( args ) {
    "use strict";
    var _this             = this;
    this.version          = 0.0001;
    this.abstract         = "Build forms on the fly";
    this.installed_field  = {};

    this.set_values       = function ( field, obj_values, item ) { 
        if ( ! field.length ) { field = [ field ] }; //force field to be an array, because eventually it is
        for ( var x = 0; x < field.length; x ++ ) {
            var _f = field[ x ];
            ( obj_values && obj_values[ item.id ] && _f._ref_field && _f._ref_field.set_value )
                ? _f._ref_field.set_value( obj_values[ item.id ] )
                : undefined ;
        }
    }

    //form definition is the form definition.
    //obj_values is a hash object that contains the values for each field.    
    this.generate_form = function ( form_definition, obj_values ) {
        var form        = $('<form/>');
        var i           = 0;
        var field_list  = $( '<ul/>').attr( 'id', 'field-list');
        for ( var i = 0; i < form_definition.fields.length ; i++ ) {
            var container = $( '<li/>' ).attr( 'row', i );
            var item      = form_definition.fields[ i ];
            if ( ! item.length ) item = [ item ];
            for ( var j = 0 ; j < item.length; j++ ) {
                var _item = item[ j ];
                var field = _this.create_field( _item );
                this.set_values( field, obj_values, _item );
                container.append( field );
            }
            field_list.append( container );
        }
        form.append( field_list );
        ( form_definition.name )
          ? form.prepend( $( '<h1/>' ).html( form_definition.name ) )
          : undefined ;
        return form;
    }

    this.create_label = function ( item ) {
        var f = item;
        return ( f.label )
            ? $('<label/>').attr( 'for', name ).html( f.label)
            : undefined ;
    }
  
    this.create_field = function ( field ) {
        var f = field;
        return ( _this.installed_field[ f.type ] ) 
            ? _this.installed_field[ f.type ].create( f )
            : undefined ;
    } 

    BUILD_ARGS : {
        if ( args ) {
            for ( var i in args ) {
                if ( this.hasOwnProperty( i ) ) {
                    this[ i ] = args[ i ];
                }
            }
        }
    }

    return this;

  } )







