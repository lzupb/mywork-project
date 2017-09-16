
//some ace helper functions
(function($$ , undefined) {//$$ is ace.helper
    $$.unCamelCase = function(str) {
        return str.replace(/([a-z])([A-Z])/g, function(match, c1, c2){ return c1+'-'+c2.toLowerCase() })
    }
    $$.strToVal = function(str) {
        var res = str.match(/^(?:(true)|(false)|(null)|(\-?[\d]+(?:\.[\d]+)?)|(\[.*\]|\{.*\}))$/i);

        var val = str;
        if(res) {
            if(res[1]) val = true;
            else if(res[2]) val = false;
            else if(res[3]) val = null;
            else if(res[4]) val = parseFloat(str);
            else if(res[5]) {
                try { val = JSON.parse(str) }
                catch (err) {}
            }
        }

        return val;
    }
    $$.getAttrSettings = function(el, attr_list, prefix) {
        var list_type = attr_list instanceof Array ? 1 : 2;
        //attr_list can be Array or Object(key/value)
        var prefix = prefix ? prefix.replace(/([^\-])$/ , '$1-') : '';
        prefix = 'data-' + prefix;

        var settings = {}
        for(var li in attr_list) if(attr_list.hasOwnProperty(li)) {
            var name = list_type == 1 ? attr_list[li] : li;
            var attr_val, attr_name = $$.unCamelCase(name.replace(/[^A-Za-z0-9]{1,}/g , '-')).toLowerCase()

            if( ! ((attr_val = el.getAttribute(prefix + attr_name))  ) ) continue;
            settings[name] = $$.strToVal(attr_val);
        }

        return settings;
    }

    $$.scrollTop = function() {
        return document.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
    }
    $$.winHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight;
    }
    $$.redraw = function(elem, force) {
        var saved_val = elem.style['display'];
        elem.style.display = 'none';
        elem.offsetHeight;
        if(force !== true) {
            elem.style.display = saved_val;
        }
        else {
            //force redraw for example in old IE
            setTimeout(function() {
                elem.style.display = saved_val;
            }, 10);
        }
    }
})(ace.helper);