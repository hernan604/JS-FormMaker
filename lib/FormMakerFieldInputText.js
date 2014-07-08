var FormMakerFieldInputText = FormMakerFieldInputText || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'text';
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field ) {
        var input = $('<input></input>')
            .attr( 'name', field.id )
            .attr( 'id', field.id )
        this._ref_field  = input;
        input._ref_field = this;

        var label;
        if ( field.label ) {
            label = $('<label/>')
                .attr('for',field.id)
                .html(field.label)
                ;
        }

        if ( field.events && field.events.click ) {
            input.click( field.events.click );
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
