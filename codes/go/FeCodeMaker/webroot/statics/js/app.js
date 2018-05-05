;(function(Vue){
    var MAPP = {
        // app config 
        config : {
            debug           : false,
            appname         : '代码脚手架@PLP.FEteam@TJ - author simo',
            appel           : '#app',
            componentTplPre : '#tpl-page-', // 组件模版前缀
            staticPath      : './statics/',
            imagePath       : './statics/image/',
            apiurl          : '/api',//'http://dd.huiyizhuce.com/thirdInterface/voteScoringapi',
            apiaction       : {
                    'user'  : '/user',
                    'creator/commonform'  : '/creator/commonform',
                    'creator/commonlist'      : '/creator/commonlist',
            }
        }, // app config end

        _data : {},

        // helper======================================================
        // app base
        helper : {
            getData : function(path, query, cb) {
                path = MAPP.config.apiurl + path;
                query = query || {};
                cb = cb || function(){};
                $.get(path, query, function(d){
                    if(!d) return;
                    cb(d);
                }, 'json')
            },
            postData : function(path, query, cb) {
                path = MAPP.config.apiurl + path;
                query = query || {};
                cb = cb || function(){};
                $.post(path, query, function(d){
                    if(!d) return;
                    cb(d);
                }, 'json')
            },
            numAnimate : function(context, key, num, delay) {
                delay = delay || 3000;
                var n0 = num,
                    n1 = Math.floor(num),
                    n = 0;
                if(!n1) {return}
                context[key] = 0;
                setTimeout(function(){
                 var timer = setInterval(function(){
                        if(n>=n1) {
                            context[key] = n0;
                            clearInterval(timer);
                            return;
                        }
                        n ++;
                        context[key] = n;
                    }, 2000/num)   
                }, delay);
                
            }
        }, // helper end

        // service======================================================
        // app layer 
        services : {
            createCommonform : function(data, cb) {
                MAPP.helper.postData(MAPP.config.apiaction['creator/commonform'], data, cb);
            },
            createCommonlist : function(data, cb) {
                MAPP.helper.getData(MAPP.config.apiaction['creator/commonlist'], data, cb);
            },

            decorator : {
                scoreFixed : function(s) {
                    s = s || 0;
                    return parseFloat(s).toFixed(2);
                },
                userlist : function(d) {
                    $.each(d, function(index, item){
                        d[index].name = d[index].title = item.personName;
                        d[index].type = 'usershow';                        
                        d[index].id = d[index].value = item.personId;
                        d[index].avatar = d[index].imgHead;
                    })
                    return d;
                },
                user : function(d) {
                    d.name = d.personName;
                    d.avatar = d.imgHead;
                    d.scores = [];
                    var scoredef = {
                        '展板评分' : '--',
                        '初赛评分' : '--',
                        '观众评委评分' : '--',
                        '决赛评委评分' : '--',
                    }
                    d.scoring = $.extend(scoredef, d.scoring);
                    $.each(d.scoring, function(key, val){
                        d.scores.push({
                            'name' : key,
                            'value' : val
                        });
                    });
                    d.scores.push({
                        'name' : '总分',
                        'value' : MAPP.services.decorator.scoreFixed(d.totalScore)
                    })
                    return d;
                },
                rank : function(d) {
                    $.each(d, function(index, item){
                        d[index].name = item.personName;
                        d[index].avatar = item.imgHead;
                        d[index].id = item.personId;                        
                        d[index].score = MAPP.services.decorator.scoreFixed(item.totalScore);                        
                    });
                    return d;
                },
                award : function(d) {
                    $.each(d, function(index, item){
                        d[index].levelname = item.levelOfAwardWinning;
                        d[index].name = item.personName;
                        d[index].avatar = item.imgHead;
                        d[index].id = item.personId;                        
                        //d[index].score = item.totalScore;                        
                        d[index].score = MAPP.services.decorator.scoreFixed(item.totalScore);                        
                    });
                    return d;
                }
            },
        }, // service end

        // components======================================================
        // components
        components : {
            tplheader : {
                data : function(){
                    return {
                        navlist : [
                            {
                                label : '首页',
                                link : '/'
                            },
                            {
                                label : '表单生成器',
                                link : '/creator/commonform'
                            },
                            {
                                label : '列表生成器',
                                link : '/creator/commonlist'
                            },
                        ]
                    }
                }
            },

            index : {
                data : function(){
                    return {
                        title : 'PLP@TJ code creator',
                    }
                }
            },

            waiting : {
                data : function(){
                    return {
                        pagetext : MAPP.config.imagePath + 'waiting-text.png'
                    }
                }
            },

            // 列表生成页面
            creatorCommonlist : {
                created : function() {
                    this.addline()
                },
                cmoputed : { },
                mounted : function(){},
                data : function() {
                    var data = {
                        result : '',
                        listconf : {
                            'path'  : '',
                            'compment' : '',
                            'listurl': '',
                            'searchconf' : {
                                items : [],
                                buttons : []
                            },
                            'colconf' : []
                        },
                        colitemconf : {
                            issearch : false, // 是否是搜索字段, 决定searchconf配置项的显藏
                            colitem : [
                                {
                                    label : '字段(model)',
                                    model : 'model',
                                    value : ''
                                },
                                {
                                    label : '字段(label)',
                                    model : 'label',
                                    value : ''
                                },
                                {
                                    label : '装饰组件',
                                    model : 'compment',
                                    value : ''
                                }
                            ],
                            searchconf : [
                                {
                                    label : '显示类型(type)',
                                    model : 'type',
                                    value : 'text',
                                    items : [
                                            {
                                                label : '单行文本',
                                                value : 'text'
                                            },
                                            {
                                                label : '多行文本',
                                                value : 'textarea'
                                            },
                                            {
                                                label : '隐藏文本',
                                                value : 'hidden',
                                            },
                                            {
                                                label : '密码',
                                                value : 'password'
                                            },
                                            {
                                                label : '下拉',
                                                value : 'select'
                                            },
                                            {
                                                label : '复选',
                                                value : 'checkbox'
                                            },
                                            {
                                                label : '单选',
                                                value : 'radio'
                                            },
                                            {
                                                label : '日期',
                                                value : 'date'
                                            },
                                            {
                                                label : '日期范围',
                                                value : 'datepicker'
                                            },
                                            {
                                                label : '省市联选',
                                                value : 'city'
                                            },
                                            {
                                                label : '组件',
                                                value : 'compment'
                                            }
                                    ],
                                },
                                {
                                    label : '组件名称',
                                    model : 'compment',
                                    value : '',
                                    hide : true
                                },
                                {
                                    label : '子选项，用于select、checkbox、radio',
                                    model : 'items',
                                    value : [], // 可以是字符串，定义一个接口地址，自动获取数据源；可以是匿名函数；可以是固定的字典数据
                                    hide : true
                                },
                                {
                                    label : '默认值',
                                    model : 'value',
                                    value : ''
                                },
                                {
                                    label : '验证规则, 支持正则、标记字符、自定义函数字符串',
                                    model : 'rules',
                                    value : ''
                                }
                            ], // 单列 searchconf END
                        }
                    }
                    return data;
                },
                methods : {
                    setsearch : function(val, rowindex, colindex) {
                        this.listconf.colconf[rowindex][colindex]['issearch'] = !this.listconf.colconf[rowindex][colindex]['issearch'];
                    },
                    addline : function() {
                        var conf = $.extend(true, {}, this.colitemconf);
                        this.listconf.colconf.push(conf);
                    },
                    delline : function(index) {
                        this.listconf.colconf.splice(index, 1)
                    },
                    // 子数据源
                    createSubData : function(val, rowindex, colindex) {
                        val = val || "";
                        val = val.split(/\n/);
                        var row = this.listconf.colconf[rowindex];
                        if(!val || !val.length) {return;}
                        var t = this;
                        row.searchconf[colindex].value = []
                        $.each(val, function(i, v){
                            v = v.split(' ');
                            if(v.length<2) {return true}
                            row.searchconf[colindex].value.push({
                                label : v[0],
                                value : v[1]
                            })
                        })
                    },
                    // 类型改变
                    typechange : function(val, rowindex, colindex) {
                        var row = this.listconf.colconf[rowindex];
                        console.log('???', rowindex, colindex, row.searchconf)
                        //console.log(rowindex, colindex, val, row.searchconf.items[colindex*1+1]);
                        // 配置type=compment时，可输入组件名称
                        if(row.searchconf[colindex*1+1]) {
                            // 默认使用类型字段的下一个字段当做组件输入框
                            row.searchconf[colindex*1+1].hide = val=='compment'? false : true;
                        }

                        // 
                        if(row.searchconf[colindex*1+2]) {
                            row.searchconf[colindex*1+2].hide = 'radio,checkbox,select'.indexOf(val)>-1? false : true;
                        }
                    },
                    submit : function() {
                        var rst = {}
                        rst.listurl = this.listconf.listurl;
                        rst.path = this.listconf.path;
                        rst.compment = this.listconf.compment;
                        rst.searchconf = {
                            items : [],
                            buttons : []
                        }
                        rst.colconf =[]; 
                        console.log(this.listconf.colconf)
                        $.each(this.listconf.colconf, function(i, item) {
                            var colitem = {}
                            $.each(item.colitem, function(k, col){
                                console.log(k, col)
                                colitem[col.model] = col.value;
                            })
                            rst.colconf.push(colitem);

                            // 整理搜索表单
                            if(!item.issearch) {return true}
                            $.each(item.searchconf, function(index, itemconf) {
                                $.each(itemconf, function(i, v) {
                                    if(v.hide) {return true} // 隐藏数据项(组件名称、子数据列表)，不组装
                                    //subdata.items[index][v.model] = v.value;
                                    colitem[v.model] = v.value;
                                })
                            });
                            rst.searchconf.items.push(colitem);
                        });
                        console.log("----", rst)
                    }
                }
            },

            // 表单生成页面
            creatorCommonform : {
                created : function() {
                    // 默认有一行
                    this.addline();
                },
                computed : {
                },
                mounted : function() {
                },
                data : function() {
                    var data = {
                        result : '',
                        formconf : {
                            'path' : '', // 当前页面路由
                            'compment' : '', // 当前页面组件名称
                            'suburl' : '',
                            'type' : '',
                            'buttons' : [], // 操作按钮
                            'items' : [],
                        },
                        subitemconf : {
                            label : '',

                        },
                        lineconf : [
                            {
                                label : '字段(model)',
                                model : 'model',
                                value : ''
                            },
                            {
                                label : '字段(label)',
                                model : 'label',
                                value : ''
                            },
                            {
                                label : '显示类型(type)',
                                model : 'type',
                                value : 'text',
                                items : [
                                        {
                                            label : '单行文本',
                                            value : 'text'
                                        },
                                        {
                                            label : '多行文本',
                                            value : 'textarea'
                                        },
                                        {
                                            label : '隐藏文本',
                                            value : 'hidden',
                                        },
                                        {
                                            label : '密码',
                                            value : 'password'
                                        },
                                        {
                                            label : '下拉',
                                            value : 'select'
                                        },
                                        {
                                            label : '复选',
                                            value : 'checkbox'
                                        },
                                        {
                                            label : '单选',
                                            value : 'radio'
                                        },
                                        {
                                            label : '日期',
                                            value : 'date'
                                        },
                                        {
                                            label : '日期范围',
                                            value : 'datepicker'
                                        },
                                        {
                                            label : '省市联选',
                                            value : 'city'
                                        },
                                        {
                                            label : '组件',
                                            value : 'compment'
                                        }
                                ],
                            },
                            {
                                label : '组件名称',
                                model : 'compment',
                                value : '',
                                hide : true
                            },
                            {
                                label : '子选项，用于select、checkbox、radio',
                                model : 'items',
                                value : [], // 可以是字符串，定义一个接口地址，自动获取数据源；可以是匿名函数；可以是固定的字典数据
                                hide : true
                            },
                            {
                                label : '默认值',
                                model : 'value',
                                value : ''
                            },
                            {
                                label : '验证规则, 支持正则、标记字符、自定义函数字符串',
                                model : 'rules',
                                value : ''
                            }
                        ], // line conf END
                    }
                    return data;
                },
                methods : {
                    // 子数据源
                    createSubData : function(val, rowindex, colindex) {
                        val = val.split(/\n/);
                        if(!val || !val.length) {return;}
                        var t = this;
                        t.formconf.items[rowindex][colindex].value = []
                        $.each(val, function(i, v){
                            v = v.split(' ');
                            if(v.length<2) {return true}
                            t.formconf.items[rowindex][colindex].value.push({
                                label : v[0],
                                value : v[1]
                            })
                        })
                    },
                    // 类型改变
                    typechange : function(val, rowindex, colindex) {
                        console.log(rowindex, colindex, val, this.formconf.items[rowindex][colindex*1+1]);
                        // 配置type=compment时，可输入组件名称
                        if(this.formconf.items[rowindex][colindex*1+1]) {
                            // 默认使用类型字段的下一个字段当做组件输入框
                            this.formconf.items[rowindex][colindex*1+1].hide = val=='compment'? false : true;
                        }

                        // 
                        if(this.formconf.items[rowindex][colindex*1+2]) {
                            this.formconf.items[rowindex][colindex*1+2].hide = 'radio,checkbox,select'.indexOf(val)>-1? false : true;
                        }
                    },
                    addline : function() {
                        var conf = $.extend(true, {}, this.lineconf);
                        this.formconf.items.push(conf);
                    },
                    delline : function(index) {
                        this.formconf.items.splice(index, 1)
                    },
                    submit : function() {
                        console.log(this.formconf)
                        var subdata = {},
                            webdata = {};
                        webdata.suburl = subdata.suburl = this.formconf.suburl;
                        webdata.path = subdata.path = this.formconf.path;
                        webdata.compment = subdata.compment = this.formconf.compment;
                        webdata.items = [];
                       subdata.items = [];
                        $.each(this.formconf.items, function(index, itemconf) {
                            var d = {}
                            $.each(itemconf, function(i, v) {
                                if(v.hide) {return true} // 隐藏数据项(组件名称、子数据列表)，不组装
                                //subdata.items[index][v.model] = v.value;
                                d[v.model] = v.value;
                            })
                            webdata.items.push(d);
                            subdata.items.push(JSON.stringify(d));
                        })

                        this.result = JSON.stringify(webdata, null, 2);

                        // 直接传递json字符串
                        subdata.jsonstr = this.result;
                        MAPP.services.createCommonform(subdata, function(d){
                            console.log('form callback::', d)
                        });
                        console.log('subdata::', subdata, webdata)
                        //this.result = this.result.replace(/\\/g, "");
                    }
                }
            },
            
            'error' : {
                'template' : '<p>访问有误</p>'
            }
        }, // component end

        // ======================================================
        routes : {
            '/' : 'index',
            '/creator/commonform' : 'creatorCommonform',
            '/creator/commonlist' : 'creatorCommonlist',
        }, // routers end

        createRoutes : function() {
            //console.log('createRoutes :: components::', this.components['usershow'])
            if(this._routes) {return this._routes;}
            var routes = [];
            for(var i in this.routes) {
                //console.log('createRoutes :: components::', this.routes[i], x[this.routes[i]])
                routes.push({
                    'component': this.components[this.routes[i]],
                    'path': i
                });
            }
            this._routes = routes;
            return routes;
        },

        createRouter : function() {
            var routes = this.createRoutes();
            //console.log('routes', routes);
            this.router =  new VueRouter({
                routes : routes
            });
        },

        createComponent : function(name, conf) {
            if(!conf['template']) {conf['template']=this.config.componentTplPre + name}
            return Vue.component(name, conf);
        },

        createComponents : function() {
            var components = this.components;
            for(var i in components) {
                this.components[i] = this.createComponent(i, components[i]);
            }
            console.log('components::', this.components)
        },

        render : function(appel) {
            if(this._render){return this._render}
            appel = appel || this.config.appel;
            Vue.prototype.$simo = {_data:{}};
            this._render = new Vue({
                debug : true,
                el: appel,
                data : {
                    currentRoute : window.location.hash.replace('#', '')
                },
                created : function() {
                },
                updated : function() {
                },
                router: this.router
            });
            return this._render;
        },

        // ued 体验优化
        beauty : function() {
            $(document).on('mouseover', 'input,select', function(){
                $(this).focus();
            })
        },

        init : function() {
            $('head title').text(this.config.appname)
            this.createRoutes();
            this.createComponents();
            this.createRouter();
            this.beauty();
            return this;
        },
        run : function() {
            this.render();
        },
    }

    MAPP
        .init()
        .run();
}(Vue));
