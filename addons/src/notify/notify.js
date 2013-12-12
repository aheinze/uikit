(function($, UI){

    var container = false,
        messages  = {};


    var Notify = {

        notify: function(options){

            var msg = new Message(options);

            msg.show();
            
            return msg;
        },

        closeAll: function(){
            
            for(var id in messages) {
                messages[id].close();
            }
        }
    };

    var Message = function(options){

        var $this = this;

        if (!container) {
            container = $('<div class="uk-notify-container"></div>').appendTo('body');
        }

        this.options = $.extend({}, Notify.defaults, options);

        this.uuid    = "ID"+(new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
        this.element = this.status = $([
            '<div class="uk-notify-message" data-status="'+this.options.status+'">',
                this.options.message,
            '</div>'
        ].join(''));

        this.element.on("click", "uk-notify-close", function(){
            $this.close();
        });

        messages[this.uuid] = this;
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,

        show: function() {
            
            var $this = this;

            container.prepend(this.element);

            if(this.options.timeout) {
                this.timeout = setTimeout(function(){ $this.close(); }, $this.options.timeout);
            }
        },

        close: function() {
            
            this.element.remove();

            delete messages[this.uuid];
        }

    });


    Notify.defaults = {
        icon: false,
        title: false,
        message: "",
        status: "info",
        timeout: 3000
    };

    UI["notify"] = Notify.notify;
    UI["notify"].message = Message;

})(jQuery, jQuery.UIkit);