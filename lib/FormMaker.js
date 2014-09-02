
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
        var field_list  = _this.generate_field_list( form_definition, obj_values );
        form.append( field_list );
        ( form_definition.name )
          ? form.prepend( $( '<h1/>' ).html( form_definition.name ) )
          : undefined ;
        return form;
    }

    this.generate_field_list = function ( form_definition, obj_values ) {
        var i           = 0;
        var field_list  = $( '<ul/>').attr( 'id', 'field-list');
        for ( var i = 0; i < form_definition.fields.length ; i++ ) {
            var container = $( '<li/>' ).attr( 'row', i );
            var item      = form_definition.fields[ i ];
            if ( ! item.length ) item = [ item ];
            for ( var j = 0 ; j < item.length; j++ ) {
                var _item = item[ j ];
                var field_val = ( obj_values && obj_values[ _item.id ] )
                    ? obj_values[ _item.id ]
                    : undefined;
                var field = _this.create_field( _item , field_val );
                container.append( field );
              //console.log( field );
              //console.log( "^^ field ^^" );
            }
            field_list.append( container );
        }
        return $( "<div></div>" ).addClass('fieldlist').append( field_list );
    }

    this.create_label = function ( item ) {
        var f = item;
        return ( f.label )
            ? $('<label/>').attr( 'for', name ).html( f.label)
            : undefined ;
    }
  
    this.create_field = function ( field, value ) {
        var f = field;
        if ( _this.installed_field[ f.type ] ) {
            var field_class = _this.installed_field[ f.type ].clone();
            return field_class.create( f, value );
        }
        return undefined;
    } 
  //this.create_field = function ( field, value ) {
  //    var f = field;
  //    return ( _this.installed_field[ f.type ] ) 
  //        ? _this.installed_field[ f.type ].create( f, value )
  //        : undefined ;
  //} 


    this.serialize_html_form = function ( node ) {
        var obj = {};
        for ( var i = 0; i < node.find('>.fieldlist>#field-list>li').length; i++ ) {
            var item = $( node.find('>.fieldlist>#field-list>li').get(i) );
            if ( item.find('>.container-multiple').length ) {
                var container    = item.find('>.container-multiple');
                var obj_multiple = [];
                for ( var x = 0; x < container.find( '>.div_multi' ).length ; x++ ) {
                    var child = $( container.find( '>.div_multi' ).get(x) );
                    obj_multiple.push( _this.serialize_html_form( child ) );
                }
                obj[ container.attr('id') ] = obj_multiple;
            } else {
                var field;
                if ( item.find( "input" ).length == 1 ) {
                    field = item.find( "input" );
                    obj[field.attr('id')]= field.val();
                } else if ( item.find( 'textarea' ).length ) {
                    field = item.find( 'textarea' );
                    obj[field.attr('id')]= field.val();
                }
            }
        }
        return obj;
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







