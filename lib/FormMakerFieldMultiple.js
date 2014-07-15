var FormMakerFieldMultiple = FormMakerFieldMultiple || ( function ( form_maker_instance ) {
    "use strict";
    var _this         = this;
    this.field_type   = 'multiple';
    this.install_into = function ( form_maker_instance ) {
        form_maker_instance.installed_field[ this.field_type ] = this;
    }
    this.clone_container = function ( ev ) {
      console.log( _this.field_rendered );
      var clone = _this.field_rendered.clone(1,1);
    //$( ev.currentTarget ).closest( '.container-multiple' ).append( clone );
      $( ev.currentTarget ).closest( '.div_multi' ).after( clone );
    }

    this.del_container = function ( ev ) {
        var item = $( ev.currentTarget );
        if ( item.closest('.container-multiple').find('>.div_multi').length > 1 ) {
          //dont allow delete last item... always leave at least one
          item.closest('.div_multi').remove();
        }
    }
    this._ref_main    = form_maker_instance;
    this.field_rendered = undefined;
    this.create       = function ( field, value ) {

      var div_multi = $( "<div class='div_multi'></div>" )
          .append( _this._ref_main.generate_field_list( field ) )
      _this.append_actions( div_multi );
      _this.field_rendered  = div_multi.clone(1,1) ;

      if ( typeof value != "undefined" ) {
          div_multi = [];
          for ( var i =0; i < value.length ; i++ ) {
              var each_item_value = value[ i ];
              var set_of_fields = $( "<div class='div_multi'></div>" )
                  .append( _this._ref_main.generate_field_list( field , each_item_value ) ) 
              _this.append_actions( set_of_fields );
              div_multi.push( set_of_fields )
          }
      }

      var label = ( field.label ) 
          ? $("<label></label>").html( field.label )
          : undefined;
      var container = $( "<div class='container-multiple'></div>" )
          .attr( 'id', field.id )
          .append( label ) 
          .append( div_multi )
      this._ref_field       = container; //ref to this container
      container._ref_field  = _this;
      return container;
    }
//  this.set_value    = function ( value ) {
//      this._ref_field.val( value );        
//  }
    this.init         = function ( form_maker_instance ) {
        if ( form_maker_instance ) {
            this.install_into( form_maker_instance );
        }
    }
    this.init( form_maker_instance );
    this.append_actions = function ( div_multi ) {
        var div_action= $( "<div></div>" )
            .addClass( "action" )
            .appendTo( div_multi );
        var add_multi = $( "<div action='add'>add</div>" )
            .click( _this.clone_container )
            .appendTo(div_action);
        var del_multi = $( "<div action='del'>del</div>" )
            .click( _this.del_container )
            .appendTo(div_action);
    }
} );
