var FormMakerFieldPassword = FormMakerFieldPassword || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'password';
    this.clone        = function () {
        return new FormMakerFieldPassword( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field, value ) {
        var input = $('<input></input>')
            .attr( 'name', field.id )
            .attr( 'id', field.id )
            .attr( 'placeholder', field.placeholder ? field.placeholder : undefined )
            .attr( 'type', 'password' )
            .val( field.default_value ? field.default_value : undefined )

        this._ref_field  = input;
        input._ref_field = this;

        var label;
        if ( field.label ) {
            label = $('<label/>')
                .attr('for',field.id)
                .html(field.label)
                ;
        }

        if ( field.events ) {
            for ( var ev in field.events ) {
              console.log( ev );
                input[ ev ]( field.events[ ev ] );
            }
        }
        if ( typeof value != "undefined" ) {
            _this.set_value( value );
        }
        return [label,input];
    }
    this.set_value    = function ( value ) {
        this._ref_field.val( value );        
    }
    this.init         = function ( form_maker_instance ) {
        if ( form_maker_instance ) {
            this.install_into( form_maker_instance );
        }
    }
    this.init( form_maker_instance );
} );
