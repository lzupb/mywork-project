(function () {

    /** require js config **/
    if (!window.require) {
        window.require = {
            config: function (config) {
                window.require = config;
            }
        };
    }
    require.config({
        paths : {
            'jquery': Env.context + '/static/js/lib/jquery',
            'bootstrap': Env.context + '/static/assets/js/bootstrap',
            'bootstrap-datepicker': Env.context + '/static/assets/js/date-time/bootstrap-datepicker',
            'jqGrid': Env.context + '/static/assets/js/jqGrid/jquery.jqGrid.src',
            'grid.locale-en': Env.context + '/static/assets/js/jqGrid/i18n/grid.locale-en',
            'ace-elements': Env.context + '/static/assets/js/ace-elements',
            'elements.scroller': Env.context + '/static/assets/js/ace/elements.scroller',
            'ace.sidebar': Env.context + '/static/assets/js/ace/ace.sidebar',
            'ace-extra': Env.context + '/static/assets/js/ace-extra',
            'ace': Env.context + '/static/assets/js/ace/ace'
        },
        shim: {
            "bootstrap": {
                deps: ['jquery']
            },
            "ace-elements" : {
                deps: ['jquery']
            },
            "ace": {
                deps: ['bootstrap', 'ace-elements']
            },
            "ace.sidebar": {
                deps: ['jquery', 'ace']
            }

        }
    });
}());