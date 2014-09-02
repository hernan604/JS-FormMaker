var FormMakerFieldUploadFile = FormMakerFieldUploadFile || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'upload_file';
    this.clone        = function () {
        return new FormMakerFieldUploadFile( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field, value ) {
        var input = $('<input></input>')
            .attr( 'name', field.id )
            .attr( 'id', field.id )
            .attr( 'type', 'file' )
            .attr( 'accept', ( field.accept ) ? field.accept : undefined )
            ;

        ( field.multiple )
            ? input.attr( 'multiple', 'multiple' )
            : undefined;

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
//      if ( typeof value != "undefined" ) {
//          _this.set_value( value );
//      }
        if ( field.events && field.events ) {
            for ( var ev in field.events ) {
                input[ ev ]( field.events[ ev ] );
            }
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
