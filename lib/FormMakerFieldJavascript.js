var FormMakerFieldJavascript = FormMakerFieldJavascript || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'javascript';
    this.clone        = function () {
        return new FormMakerFieldJavascript( form_maker_instance );
    }
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.create       = function ( field ) {
        var js  = document.createElement('script');
        js.text = field.script;
        return js;
    }

    this.init         = function ( form_maker_instance ) {
        if ( form_maker_instance ) {
            this.install_into( form_maker_instance );
        }
    }
    this.init( form_maker_instance );
} );
