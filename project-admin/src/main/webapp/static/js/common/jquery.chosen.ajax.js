/*jshint forin:true, noarg:true, noempty:true, eqeqeq:false, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, onevar:false, nomen:false, regexp:false, plusplus:false, newcap:true */
(function ($) {
    "use strict";
    var arrayRemove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
    //options.ajaxDynamicData  Funtion get dynamic ajax data
    $.fn.ajaxChosen = function (ajaxOptions, options, chosenOptions) {
        var select = $(this),
            chosen,
            keyRight,
            input,
            callback,
            throttle = false,
            requestQueue = [],
            typing = false,
            loadingImg = Env.context + '/images/loading.gif',
            minLength = 1;

        if ($('option', select).length === 0) {
            //adding empty option so you don't have to, and chosen can perform search correctly
            select.append('<option value=""></option>');
        }
        var setting = $.extend({allow_single_deselect:true, search_contains: true, useText: false}, chosenOptions);
        select.chosen(setting);
        chosen = select.next();
        input = $('input', chosen);
        //copy out success callback
        if ('success' in ajaxOptions && $.isFunction(ajaxOptions.success)) {
            callback = ajaxOptions.success;
        }
        ajaxOptions.complete = function(jqXHR, textStatus) {
            //console.error("complete---->"+textStatus);

        };
        ajaxOptions.error = function( jqXHR, textStatus, errorThrown ) {
            //console.error("complete---->"+textStatus);
            //console.error("errorThrown---->"+errorThrown);

        };
        //replace with our success callback
        ajaxOptions.success = function (data, textStatus, jqXHR) {
            var items = data,
                selected, valuesArray, valuesHash = {},
                requestQueueLength = requestQueue.length,
                old = false,
                keep = false,
                inputEmptied = false,
                inputEmptiedValue = '';
            if (typing) {
                //server returned a response, but it's about to become an older response
                //so discard it and wait until the user is done typing
                requestQueue.shift();
                return false;
            }
            //while the request was processing did the user "empty" the input box
            inputEmptiedValue = $.trim(input.val());//if we have a minLength > 1 then we have to preserve the value (TODO::watch out for potential XSS/other breakages)
            inputEmptied = inputEmptiedValue.length < minLength;
            //if additional processing needs to occur on the returned json
            if ('processItems' in options && $.isFunction(options.processItems)) {
                items = options.processItems(data);
            } else if ('results' in items) {
                //default behavior if process items isn't defined
                //expects there to be a results key in data returned that has the results of the search
                items = items.results;
            } else {
                console.log('Expected results key in data, but was not found. Options could not be built');
                return false;
            }

            //.chzn-choices is only present with multi-selects
            selected = $('option:selected', select).not(':empty').clone().attr('selected', true);
            //saving values for deduplication
            if (!$.isArray(select.val())) {
                valuesArray = [select.val()];
            } else {
                valuesArray = select.val();
            }
            $.each(valuesArray, function (i, value) {
                valuesHash[value] = 1;
            });
            $('option', select).remove();

            $('<option value=""/>').appendTo(select);
            //appending this even on single select in the event the user changes their mind and input is blurred. Keeps selected option selected
            //默认不保留原来的选项
            if(options.keepSelected) {
                selected.appendTo(select);
            }

            if (!inputEmptied && items) {
                if ($.isArray(items)) {
                    //array of kv pairs [{id:'', name:''}...]
                    $.each(items, function (i, opt) {
                        if (typeof valuesHash[opt.id] === 'undefined') {
                            $('<option value="' + opt.id + '">' + opt.name + '</option>').appendTo(select);
                        }
                    });
                } else {
                    //hash of kv pairs {'id':'name'...}
                    $.each(items, function (value, name) {
                        if (typeof valuesHash[value] === 'undefined') {
                            $('<option value="' + value + '">' + name + '</option>').appendTo(select);
                        }
                    });
                }
            }
            //update chosen
            if (items) {
                select.trigger("chosen:updated");
            }
            //right key, for highlight options after ajax is performed
            keyRight = $.Event('keyup');
            keyRight.which = 39;
            if (items && items.length > 0) {
                $('.no-results', chosen).hide();
            } else {
                if ('noResultHandler' in options && $.isFunction(options.noResultHandler)) {
                    options.noResultHandler();
                }
                $('.no-results', chosen).show();
            }

            //fire original success
            if (callback) {
                callback(data, textStatus, jqXHR);
            }
        };
        //set loading image
        options || (options = {});
        if ('loadingImg' in options) {
            loadingImg = options.loadingImg;
        }
        //set minimum length that will trigger autocomplete
        if ('minLength' in options) {
            minLength = options.minLength;
        }

        $('.chosen-search > input, .chosen-choices .search-field input', chosen).
            bind('keyup', processValue).
            bind('paste', function (e) {
                var that = this;
                setTimeout(function() {
                    processValue.call(that, e);
                }, 50);
            });

        function processValue(e) {
            var field = $(this),
                q = field.val();
            //don't fire ajax if...
            if ((e.type === 'paste' && field.is(':not(:focus)')) ||
                (e.which && (
                    (e.which ===  9)  ||//Tab
                    (e.which === 13)  ||//Enter
                    (e.which === 16)  ||//Shift
                    (e.which === 17)  ||//Ctrl
                    (e.which === 18)  ||//Alt
                    (e.which === 19)  ||//Pause, Break
                    (e.which === 20)  ||//CapsLock
                    (e.which === 27)  ||//Esc
                    (e.which === 33)  ||//Page Up
                    (e.which === 34)  ||//Page Down
                    (e.which === 35)  ||//End
                    (e.which === 36)  ||//Home
                    (e.which === 37)  ||//Left arrow
                    (e.which === 38)  ||//Up arrow
                    (e.which === 39)  ||//Right arrow
                    (e.which === 40)  ||//Down arrow
                    (e.which === 44)  ||//PrntScrn
                    (e.which === 45)  ||//Insert
                    (e.which === 144) ||//NumLock
                    (e.which === 145) ||//ScrollLock
                    (e.which === 91)  ||//WIN Key (Start)
                    (e.which === 93)  ||//WIN Menu
                    (e.which === 224) ||//command key
                    (e.which >= 112 && e.which <= 123)//F1 to F12
                    ))) { return false; }
            //backout of ajax dynamically
            if ('useAjax' in options && $.isFunction(options.useAjax)) {
                if (!options.useAjax(e)) { return false; }
            }
            //hide no results
            $('.no-results', chosen).hide();
            //backout if nothing is in input box
            if ($.trim(q).length < minLength) {
                if (throttle) { clearTimeout(throttle); }
                return false;
            }

            typing = true;

            //add query to data
            if ($.isArray(ajaxOptions.data)) {
                //array
                if (ajaxOptions.data[ajaxOptions.data.length - 1].name === 'q') {
                    ajaxOptions.data.pop();
                }
                ajaxOptions.data = ajaxOptions.data.concat({ name: 'q', value: q});
            } else {
                //hash
                if (!('data' in ajaxOptions)) {
                    ajaxOptions.data = {};
                }
                $.extend(ajaxOptions.data, { q: q });
            }
            //dynamically generate url
            if ('generateUrl' in options && $.isFunction(options.generateUrl)) {
                ajaxOptions.url = options.generateUrl(q);
            }
            if (options.ajaxDynamicData && $.isFunction(options.ajaxDynamicData)) {
                var dynamicData = options.ajaxDynamicData();
                if(dynamicData && dynamicData instanceof Object){
                    var data = $.extend(ajaxOptions.data, dynamicData);
                    ajaxOptions.data = data;
                }
            }

            //throttle that bitch, so we don't kill the server
            if (throttle) { clearTimeout(throttle); }
            throttle = setTimeout(function () {
                requestQueue.push(q);
                typing = false;
                $.ajax(ajaxOptions);
            }, 300);
        };

        return select;
    };
})(jQuery);
