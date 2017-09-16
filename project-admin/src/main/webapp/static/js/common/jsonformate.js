JE = {
    data: {}, /* 关联数据 */
    code: false, /* 格式化后的代码 */
    editUI: null, /* 关联编辑框 */
    name: 'JE', /* 实例名 */
    indent: '    ', /*缩进符'\t'或者4个' '*/
    onclick: Array, /*树点击通知*/
    format: function(compress) {
        var code = JE._format(JE.editUI.value, compress);
        if (code)JE.editUI.value = code;
        JE.editUI.focus();
        return code;
    },
    _format: function (txt, compress/*是否为压缩模式*/) {/* 格式化JSON源码(对象转换为JSON文本) */
        if (/^\s*$/.test(txt))return;
        try {
            var data = eval('(' + txt + ')');
        }
        catch (e) {
            JE.editUI.style.color = 'red';
            return;
        }
        ;
        JE.editUI.style.color = '#000';
        var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;
        var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
            nodeCount++;
            /*节点计数*/
            for (var i = 0, tab = ''; i < indent; i++)tab += This.indent;
            /* 缩进HTML */
            tab = compress ? '' : tab;
            /*压缩模式忽略缩进*/
            maxDepth = ++indent;
            /*缩进递增并记录*/
            if (value && value.constructor == Array) {/*处理数组*/
                draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);
                /*缩进'[' 然后换行*/
                for (var i = 0; i < value.length; i++)
                    notify(i, value[i], i == value.length - 1, indent, false);
                draw.push(tab + ']' + (isLast ? line : (',' + line)));
                /*缩进']'换行,若非尾元素则添加逗号*/
            } else if (value && typeof value == 'object') {/*处理对象*/
                draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);
                /*缩进'{' 然后换行*/
                var len = 0, i = 0;
                for (var key in value)len++;
                for (var key in value)notify(key, value[key], ++i == len, indent, true);
                draw.push(tab + '}' + (isLast ? line : (',' + line)));
                /*缩进'}'换行,若非尾元素则添加逗号*/
            } else {
                if (typeof value == 'string')value = '"' + value + '"';
                draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
            }
            ;
        };
        var isLast = true, indent = 0;
        notify('', data, isLast, indent, false);
        return draw.join('');
    }
};

JE.init = function (jsonAreaId) {/* 设置UI控件关联响应 */
    var $ = function (id) {
        return document.getElementById(id)
    };
    /* 关联UI */
    JE.editUI = $(jsonAreaId);
    /* 监听代码变化事件 */
    JE.editUI.oninput = JE.editUI.onpropertychange = function () {
        /* 格式化不刷新树 */
        if (/^\s*$/.test(this.value))return;
        clearTimeout(JE.update);
        try {
            JE.data = eval('(' + this.value + ')');
        } catch (e) {
            JE.editUI.style.color = 'red';
            return;
        }
        JE.editUI.style.color = '#000';
        return true;
    };
    if (window.ActiveXObject)
        document.execCommand("BackgroundImageCache", false, true);
    /* 格式化 */
};
