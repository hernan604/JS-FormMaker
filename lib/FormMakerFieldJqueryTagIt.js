/*
example: 
                {
                },
*/
var FormMakerFieldJqueryTagIt = FormMakerFieldJqueryTagIt || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'jquery-tagit';
    this.clone        = function () {
        return new FormMakerFieldJqueryTagIt( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this._ref_field   = undefined;
    this._ref_label   = undefined;

    this.create_field = function ( field, value ) {
        var tagit = $('<ul/>')
            .attr( 'type', field.type )
            .attr( 'name', field.id )
            .attr( 'id', field.id )
//          .attr( 'value', field.value )
            .addClass( 'tagit' )
            ;

        _this._ref_field  = tagit;
        tagit._ref_field = _this;
    }
    this.create_label = function ( field, value ) {
        if ( field.label ) {
            _this._ref_label = $('<label/>')
                .attr('for',field.id)
                .html(field.label)
                ;
        }
    }
    this.set_default_value = function ( field, value ) {
        if ( field.default_value ) {
        //  _this._ref_field.prop( 'checked', field.default_value );
        }
    } 
    this.apply_events = function ( field, value ) {
        if ( field.events && field.events ) {
            for ( var ev in field.events ) {
                _this._ref_field[ ev ]( field.events[ ev ] );
            }
        }
    }
    this.load_saved_values = function ( field, value ) {
// value = ["Carnaval 2014 [1111]","Bla bla bla [222]"];
        if ( typeof value != "undefined" ) {
            _this.set_value( value );
        }
    }
    this.create       = function ( field, value ) {
        _this.create_field( field, value );
        _this.create_label( field, value );
        _this.set_default_value( field, value );
        _this.apply_events( field, value );
        _this.load_saved_values( field, value );
        return [ _this._ref_label , _this._ref_field ];
    }
    this.set_value    = function ( tag_list ) {
      //this._ref_field.val( value );        
//console.log( tag_list );
        for ( var i = 0, tag; tag = tag_list[ i ]; i++ ) {
            this._ref_field.append( $( '<li/>' ).html( tag ) );
        }
    }
    this.init         = function ( form_maker_instance ) {
        if ( form_maker_instance ) {
            this.install_into( form_maker_instance );
        }
    }
    this.init( form_maker_instance );
} );
