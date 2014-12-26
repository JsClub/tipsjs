(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['$'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('$'));
    } else {
        // Browser globals
        factory($);
    }
}(function($) {

    $.toast = function(info, options) {

        var opts = $.extend({}, $.toast.defaults, options);

        func.showOverlay(0);

        var tips = $('<p id="J_content" style="font-size:' + opts.font_size + 'px;text-align:center;vertical-align:middle;background-color:rgba(0,0,0,1);z-index:1000;position:fixed;width:' + opts.width + 'px;height:' + opts.height + 'px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;color:#fff;line-height:' + opts.height + 'px;">' + info + '</p>').appendTo('body');

        func.centershow(tips);

        setTimeout(function() {
            func.showOverlay(1);
	    tips.remove();
        }, opts.time);
    }

    $.toast.defaults = {
        time: 2000,
        width: 'auto',
        height: 'auto',
        font_size: 14
    };


    var func = {
        showOverlay: function(clear, opts) {
            var overlay = $('<div id="J_overlay" style="position:absolute;left:0;top:0;background:#000;_filter:alpha(opacity=50);z-index:999"></div>');

            if (!clear) {
                overlay.appendTo($('body')).css({
                    'width': func.getPageSize()[1],
                    'height': func.getPageSize()[0],
                    'opacity': 0.5
                });

            } else {
                $('#J_overlay').remove();
            }

        },
        centershow: function(divName) {
            var top = ($(window).height() - $(divName).height()) / 2;
            var left = ($(window).width() - $(divName).width()) / 2;
            var scrollTop = $(document).scrollTop() || 0;
            var scrollLeft = $(document).scrollLeft() || 0;
            $(divName).css({
                position: 'absolute',
                'top': top + scrollTop,
                'left': left + scrollLeft
            }).show();
        },
        getPageSize: function() {
            var xScroll, yScroll;
            if (window.innerHeight && window.scrollMaxY) {
                xScroll = window.innerWidth + window.scrollMaxX;
                yScroll = window.innerHeight + window.scrollMaxY;
            } else {
                if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac    
                    xScroll = document.body.scrollWidth;
                    yScroll = document.body.scrollHeight;
                } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari    
                    xScroll = document.body.offsetWidth;
                    yScroll = document.body.offsetHeight;
                }
            }
            var windowWidth, windowHeight;
            if (self.innerHeight) { // all except Explorer    
                if (document.documentElement.clientWidth) {
                    windowWidth = document.documentElement.clientWidth;
                } else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            } else {
                if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode    
                    windowWidth = document.documentElement.clientWidth;
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    if (document.body) { // other Explorers    
                        windowWidth = document.body.clientWidth;
                        windowHeight = document.body.clientHeight;
                    }
                }
            }
            if (yScroll < windowHeight) {
                pageHeight = windowHeight;
            } else {
                pageHeight = yScroll;
            }
            if (xScroll < windowWidth) {
                pageWidth = xScroll;
            } else {
                pageWidth = windowWidth;
            }
            arrayPageSize = new Array(pageHeight, pageWidth, windowWidth, windowHeight);
            return arrayPageSize;
        }

    }
}));
