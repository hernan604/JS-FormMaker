var FormMakerFieldSubmit = FormMakerFieldSubmit || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'submit';
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field ) {
        var input = $('<input></input>')
            .attr( 'type', 'submit' )
            .attr( 'name', field.id )
            .attr( 'id', field.id )
            ;
        if ( field.label ) {
            input.attr( 'value', field.label );
        }
        if ( field.events && field.events.click ) {
            input.click( field.events.click );
        }
        return input;
    }
    this.init         = function ( form_maker_instance ) {
        if ( form_maker_instance ) {
            this.install_into( form_maker_instance );
        }
    }
    this.init( form_maker_instance );
} );
