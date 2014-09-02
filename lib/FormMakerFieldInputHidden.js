var FormMakerFieldInputHidden = FormMakerFieldInputHidden || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'hidden';
    this.clone        = function () {
        return new FormMakerFieldInputHidden( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field, value ) {
        var input = $('<input></input>')
            .attr( 'name', field.id )
            .attr( 'id', field.id )
            .attr( 'type', 'hidden' )
        this._ref_field  = input;
        input._ref_field = this;

        if ( field.events && field.events.click ) {
            input.click( field.events.click );
        }
        if ( typeof value != "undefined" ) {
            _this.set_value( value );
        }
        if ( field.events && field.events ) {
            for ( var ev in field.events ) {
                input[ ev ]( field.events[ ev ] );
            }
        }
        return [input];
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
