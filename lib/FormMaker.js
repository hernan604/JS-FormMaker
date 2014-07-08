
  var FormMaker = FormMaker || ( function ( args ) {
    "use strict";
    var _this             = this;
    this.version          = 0.0001;
    this.abstract         = "Build forms on the fly";
    this.installed_field  = {};
    
    this.generate_form = function ( form_definition ) {
        var form        = $('<form/>');
        var i           = 0;
        var field_list  = $( '<ul/>').attr( 'id', 'field-list');
        for ( var i = 0; i < form_definition.fields.length ; i++ ) {
            var container = $( '<li/>' ).attr( 'row', i );
            var item      = form_definition.fields[ i ];
            if ( ! item.length ) {
                var field = _this.create_field( item );
                field_list.append( container.append( field ) );
            } else {
                for ( var j = 0 ; j < item.length; j++ ) {
                    var _item = item[ j ];
                    var field = _this.create_field( _item );
                    container.append( field );
                }
                field_list.append( container );
            } 
        }
        form.append( field_list );
        form.prepend( $( '<h1/>' ).html(form_definition.name) );
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







