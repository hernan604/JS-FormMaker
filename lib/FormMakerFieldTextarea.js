var FormMakerFieldTextarea = FormMakerFieldTextarea || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'textarea';
    this.clone        = function () {
        return new FormMakerFieldTextarea( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field, value ) {
        var textarea = $('<textarea></textarea>')
            .attr( 'name', field.id )
            .attr( 'id', field.id )
            .attr( 'placeholder', field.placeholder ? field.placeholder : undefined )
            .val( field.default_value ? field.default_value : undefined )

        this._ref_field  = textarea;
        textarea._ref_field = this;

        var label;
        if ( field.label ) {
            label = $('<label/>')
                .attr('for',field.id)
                .html(field.label)
                ;
        }
        if ( field.events && field.events.click ) {
            textarea.click( field.events.click );
        }
        if ( typeof value != "undefined" ) {
            _this.set_value( value );
        }

        return [label,textarea];
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
