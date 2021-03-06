var FormMakerFieldSelect = FormMakerFieldSelect || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'select';
    this.clone        = function () {
        return new FormMakerFieldSelect( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field, value ) {
        var select = $('<select></select>')
            .attr( 'name', field.id )
            .attr( 'id', field.id )
        this._ref_field  = select;
        select._ref_field = this;

        if ( field.options ) {
            var options = field.options;
            for ( var i = 0; i < options.length; i++ ) {
                var option = $( '<option/>' )
                    .attr( 'value', options[i].value )
                    .html( options[i].text );
                select.append( option );
            }
        }

        var label;
        if ( field.label ) {
            label = $('<label/>')
                .attr('for',field.id)
                .html(field.label)
                ;
        }

        if ( field.default_value ) {
            select.val( field.default_value );
        }

        if ( field.events && field.events ) {
            for ( var ev in field.events ) {
                select[ ev ]( field.events[ ev ] );
            }
        }
        if ( typeof value != "undefined" ) {
            _this.set_value( value );
        }
        return [label,select];
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
