var FormMakerFieldEmptyDiv = FormMakerFieldEmptyDiv || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'empty-div';
    this.clone        = function () {
        return new FormMakerFieldEmptyDiv( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field, value ) {
        var div = $('<div></div>')
            .attr( 'name', field.id )
            .attr( 'id', field.id )
            ;
        ( field.css_class )
            ? div.addClass( field.css_class )
            : undefined;
        return [div];
    }
    this.init         = function ( form_maker_instance ) {
        if ( form_maker_instance ) {
            this.install_into( form_maker_instance );
        }
    }
    this.init( form_maker_instance );
} );
