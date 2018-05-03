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
                    'creator/commonform'  : '/creatorForm',
                    'creator/commonlist'      : '/creatorList',
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

            // User show
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
                        formconf : {
                            'suburl' : '',
                            'type' : '',
                            'buttons' : [],
                            'items' : [],
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
                                            label : '---- 单行文本 ----',
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
                                            label : '自定义',
                                            value : 'comptent'
                                        },
                                ],
                            },
                            {
                                label : '默认值',
                                model : 'value',
                                value : ''
                            },
                            {
                                label : '验证规则',
                                model : 'rules',
                                value : ''
                            }
                        ], // line conf END
                    }
                    return data;
                },
                methods : {
                    addline : function() {
                        var conf = $.extend(true, {}, this.lineconf);
                        this.formconf.items.push(conf);
                    },
                    delline : function(index) {
                        this.formconf.items.splice(index, 1)
                    },
                    submit : function() {
                        console.log(this.formconf)
                        var subdata = {};
                        subdata.suburl = this.formconf.suburl;
                        subdata.items = [];
                        $.each(this.formconf.items, function(index, itemconf) {
                            subdata.items[index] = {};
                            $.each(itemconf, function(i, v) {
                                subdata.items[index][v.model] = v.value;
                            })
                        })
                        console.log('subdata::', subdata)
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

        init : function() {
            $('head title').text(this.config.appname)
            this.createRoutes();
            this.createComponents();
            this.createRouter();
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
