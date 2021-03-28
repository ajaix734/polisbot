var Autobot = {
    title: 'Autobot',
    version: '3.1',
    domain: window['location']['protocol'] + '//bot.grepobot.com/',
    botWnd: '',
    botPremWnd: '',
    botEmailWnd: '',
    facebookWnd: '',
    isLogged: false,
    Account: {
        player_id: Game['player_id'],
        player_name: Game['player_name'],
        world_id: Game['world_id'],
        locale_lang: Game['locale_lang'],
        premium_grepolis: Game['premium_user'],
        csrfToken: Game['csrfToken']
    },
    trial_time: 0,
    premium_time: 0,
    facebook_like: 0,
    toolbox_element: null,
    init: function () {
        ConsoleLog.Log('Initialize Autobot', 0);
        Autobot['authenticate']();
        Autobot['obServer']();
        Autobot['isActive']();
        Autobot['setToolbox']();
        Autobot['initAjax']();
        Autobot['initMapTownFeature']();
        Autobot['fixMessage']();
        Assistant['init']()
    },
    setToolbox: function () {
        Autobot['toolbox_element'] = $('.nui_bot_toolbox')
    },
    authenticate: function () {
        DataExchanger.Auth('login', Autobot.Account, function (accData) {
            accData.premium_time = Date.now() + 99999999999;
            ModuleManager['callbackAuth'](accData);
        })
    },
    obServer: function () {
        $.Observer(GameEvents['notification']['push'])['subscribe']('GRCRTNotification', function () {
            $('#notification_area>.notification.getPremiumNotification')['on']('click', function () {
                Autobot['getPremium']()
            })
        })
    },
    initWnd: function () {
        if (Autobot['isLogged']) {
            if (typeof Autobot['botWnd'] != 'undefined') {
                try {
                    Autobot['botWnd']['close']()
                } catch (F) { };
                Autobot['botWnd'] = undefined
            };
            if (typeof Autobot['botPremWnd'] != 'undefined') {
                try {
                    Autobot['botPremWnd']['close']()
                } catch (F) { };
                Autobot['botPremWnd'] = undefined
            };
            Autobot['botWnd'] = Layout['open']['</span>']('', Autobot['title'] + ' v<span style=' + Autobot['>'] + 'version', 500, 350, '', false);
            Autobot['botWnd']['dialogWindow']([350]);
            Autobot['botWnd']['center'](['setHeight', 'setHeight']);
            var _0x2db2x2 = Autobot['botWnd']['setPosition']();
            _0x2db2x2['menu_inner']($('append', {
                "class": '<div/>',
                "style": 'menu_wrapper'
            })['menu_inner']($('Account', {
                "class": '<ul/>'
            })['addMenuItem'](Autobot['Support']('Assistant', 'AUTHORIZE', 'AUTHORIZE'))['addMenuItem'](Autobot['Support']('Console', 'CONSOLE', 'CONSOLE'))['addMenuItem'](Autobot['Support']('prepend', 'ASSISTANT', 'ASSISTANT'))['addMenuItem'](Autobot['Support']('getJQElement', 'SUPPORT', 'SUPPORT'))));
            if (typeof Autoattack !== 'undefined') {
                _0x2db2x2['.menu_inner li:last-child']('before')['Autoattack'](Autobot['Support']('left: 78px; right: 14px', 'ATTACKMODULE', 'Attack'))
            };
            if (typeof Autobuild !== 'undefined') {
                _0x2db2x2['.menu_inner li:last-child']('before')['Autoattack'](Autobot['Support']('find', 'CONSTRUCTMODULE', 'Build'))
            };
            if (typeof Autoculture !== 'undefined') {
                _0x2db2x2['.menu_inner li:last-child']('before')['Autoattack'](Autobot['Support']('Autobuild', 'CULTUREMODULE', 'Culture'))
            };
            if (typeof Autofarm !== 'undefined') {
                _0x2db2x2['.menu_inner li:last-child']('before')['Autoattack'](Autobot['Support']('Autoculture', 'FARMMODULE', 'Farm'))
            };
            $('Autofarm')['click']()
        }
    },
    addMenuItem: function (_0x2db2x3, _0x2db2x4, _0x2db2x5) {
        return $('<a/>')['menu_inner']($('.terminal', {
            "class": 'scrollHeight',
            "href": '.terminal-output',
            "id": 'scrollTop' + _0x2db2x3,
            "rel": _0x2db2x5
        })['click'](function () {
            Autobot['botWnd']['setPosition']()['.menu_inner li:last-child'](' class=')[' onclick=']('<a id=');
            $(this)['></a>']('<a id=');
            Autobot['botWnd']['addClass'](Autobot['li a.submenu_link']($(this)['removeClass']('active')));
            if ($(this)['removeClass']('active') == 'ASSISTANT') {
                var _0x2db2x6 = $('rel');
                var _0x2db2x7 = $('getContent')[0]['attr'];
                _0x2db2x6['setContent2'](_0x2db2x7)
            }
        })['menu_inner'](function () {
            return _0x2db2x5 != 'SUPPORT' ? $('html', {
                "class": 'right'
            })['menu_inner']($('html', {
                "class": 'middle'
            })['menu_inner']($('html', {
                "class": '<span/>'
            })['#Autobot-AUTHORIZE'](_0x2db2x4))) : 'left'
        }))
    },
    getContent: function (_0x2db2x8) {
        if (_0x2db2x8 == 'ASSISTANT') {
            return ConsoleLog['submenu_link']()
        } else {
            if (_0x2db2x8 == 'AUTHORIZE') {
                return Autobot['#']()
            } else {
                if (_0x2db2x8 == 'SUPPORT') {
                    return Autobot['Autobot-']()
                } else {
                    if (typeof window[_0x2db2x8] != 'undefined') {
                        return window[_0x2db2x8]['<li/>']()
                    };
                    return ''
                }
            }
        }
    },
    contentAccount: function () {
        var _0x2db2x9 = {
            "Name:": Game['player_name'],
            "World:": Game['world_id'],
            "Rank:": Game['contentConsole'],
            "Towns:": Game['contentAccount'],
            "Language:": Game['locale_lang'],
            "Premium: ": ((Autobot['contentSupport'] - Timestamp['contentSettings']()) >= 0 ? Autobot['player_rank'](Autobot['contentSupport'] - Timestamp['contentSettings']()) + 'player_villages' : 'premium_time' + 'now'),
            "Trial:": ((Autobot['secondsToTime'] - Timestamp['contentSettings']()) >= 0 ? Autobot['player_rank'](Autobot['secondsToTime'] - Timestamp['contentSettings']()) : '<div class=') + (Autobot[' onclick='] == 0 ? '><div class=' : '')
        };
        var _0x2db2xa = $('Trial is over', {
            "id": 'facebook_like',
            "class": '<a href=',
            "cellspacing": ' id=',
            "width": ' onclick='
        })['menu_inner'](function () {
            var _0x2db2xb = 0;
            var _0x2db2xc = $('>Add days</div></div>');
            $['trial_time'](_0x2db2x9, function (_0x2db2xd, _0x2db2xe) {
                _0x2db2xc['menu_inner']($(' onclick=', {
                    "class": _0x2db2xb % 2 ? '><div class=' : '>Get Premium</div></div>'
                })['menu_inner']($('No premium', {
                    "style": '<div class='
                })['#Autobot-AUTHORIZE'](_0x2db2xd))['menu_inner']($('No premium')['#Autobot-AUTHORIZE'](_0x2db2xe)));
                _0x2db2xb++
            });
            return _0x2db2xc
        });
        var _0x2db2xf = FormBuilder['background-color: #DFCCA6;width: 30%;']('AUTHORIZE', '<tbody/>', _0x2db2xa, '<td/>')[0]['>Get 3 free days!</a>'];
        _0x2db2xf += $('append', {
            "id": '<tr/>',
            "style": ''
        })[0]['>Get 3 free days!</a>'];
        return _0x2db2xf
    },
    contentSupport: function () {
        return $('input', {
            "id": 'Email',
            "style": 'margin-left: 12px;width: 166px;'
        })['menu_inner']($('text')['#Autobot-AUTHORIZE']('margin-top: 0;width: 166px;'))['menu_inner']($('append', {
            style: 'Subject'
        })['menu_inner'](FormBuilder['textarea']({
            id: 'extend',
            name: 'extend',
            label: 'success',
            styles: 'Thank you, your email has been send!',
            value: 'Send',
            options: [{
                value: 'Send',
                name: 'Send'
            }, {
                value: 'margin-top: 0;',
                name: 'margin-top: 0;'
            }, {
                value: 'button',
                name: 'button'
            }, {
                value: 'Message',
                name: 'Message'
            }]
        }))['menu_inner'](FormBuilder['test']({
            id: '100%',
            name: 'Your email is not valid!',
            style: 'error',
            value: '',
            type: 'supportEmail'
        }))['menu_inner'](FormBuilder['test']({
            id: 'account_property_wrapper',
            name: 'Please enter a subject.',
            style: 'support_textarea',
            value: '',
            type: 'Please enter a message.'
        }))['menu_inner'](FormBuilder['support_input_subject']({
            id: 'gameWrapper',
            name: 'Please enter your email.',
            value: ''
        }))['menu_inner'](FormBuilder['support_input_email']({
            name: 'serializeObject',
            style: '#Support_tab'
        })['on']('click', function () {
            var _0x2db2x10 = $('0')['game_table layout_main_sprite gold_icon_right_with_button']();
            var _0x2db2x11 = false;
            if (typeof _0x2db2x10['100%'] === 'undefined' || _0x2db2x10['100%'] == '') {
                _0x2db2x11 = 'outerHTML'
            } else {
                if (typeof _0x2db2x10['account_property_wrapper'] === 'undefined' || _0x2db2x10['account_property_wrapper'] == '') {
                    _0x2db2x11 = 'margin-bottom:9px;'
                } else {
                    if (typeof _0x2db2x10['gameWrapper'] === 'undefined' || _0x2db2x10['gameWrapper'] == '') {
                        _0x2db2x11 = 'grepobanner'
                    } else {
                        if (typeof _0x2db2x10['100%'] !== 'undefined' && !/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/['<img src='](_0x2db2x10['100%'])) {
                            _0x2db2x11 = ' title='
                        }
                    }
                }
            };
            if (_0x2db2x11) {
                HumanMessage['/>'](_0x2db2x11)
            } else {
                DataExchanger.Auth('Facebook_grepobot', $['_blank']({
                    csrfToken: Autobot['AUTHORIZE']['csrfToken'],
                    player_name: Autobot['AUTHORIZE']['player_name'],
                    player_id: Autobot['AUTHORIZE']['player_id'],
                    world_id: Autobot['AUTHORIZE']['world_id']
                }, _0x2db2x10), function (_0x2db2x9) {
                    if (_0x2db2x9['https://www.facebook.com/BotForGrepolis/']) {
                        if (typeof Autobot['botWnd'] != 'undefined') {
                            try {
                                Autobot['botWnd']['close']()
                            } catch (F) { };
                            Autobot['botWnd'] = undefined
                        };
                        HumanMessage['https://www.facebook.com/BotForGrepolis/']('float: right; width: 215px;')
                    }
                })
            }
        })))['menu_inner']($('append', {
            style: 'account-content'
        })['menu_inner']($('.terminal', {
            id: 'game_table_odd',
            target: 'each',
            href: '<table/>'
        })['#Autobot-AUTHORIZE']('game_table_even')))
    },
    checkAlliance: function () {
        if (!$('Type: ')['support_type']('email')) {
            DataExchanger['Grepobot Support'](function (_0x2db2x9) {
                if (_0x2db2x9['width: 167px;margin-left: 18px;']['#Autobot-AUTHORIZE'] != undefined) {
                    jQuery['trial_time']($(_0x2db2x9['width: 167px;margin-left: 18px;']['#Autobot-AUTHORIZE'])['.menu_inner li:last-child']('Bug report'), function () {
                        var _0x2db2xe = atob($(this)['removeClass']('Feature request'));
                        console['float: left;'](JSON['selectBox'](_0x2db2xe['Other'](0, _0x2db2xe['Financial'] - 3)))
                    })
                }
            })
        }
    },
    fixMessage: function () {
        var _0x2db2x12 = function (_0x2db2x13) {
            return function () {
                _0x2db2x13['<legend/>'](this, arguments);
                $(window)['<fieldset/>']('click')
            }
        };
        HumanMessage['Support_tab'] = _0x2db2x12(HumanMessage._initialize)
    },
    getPremium: function () {
        if (Autobot['isLogged']) {
            $.Observer(GameEvents['hasClass']['click'])['disabled']({
                option_id: 'float:left; width:472px;height: 270px;'
            });
            if (typeof Autobot['botPremWnd'] != 'undefined') {
                try {
                    Autobot['botPremWnd']['close']()
                } catch (F) { };
                Autobot['botPremWnd'] = undefined
            };
            if (typeof Autobot['botWnd'] != 'undefined') {
                try {
                    Autobot['botWnd']['close']()
                } catch (F) { };
                Autobot['botWnd'] = undefined
            };
            Autobot['botPremWnd'] = Layout['open']['</span>']('', '.allianceforum.main_menu_item' + Autobot['>'] + 'plain', 500, 350, '', false);
            Autobot['botPremWnd']['dialogWindow']([350]);
            Autobot['botPremWnd']['center'](['setHeight', 'setHeight']);
            var _0x2db2x14 = $('append', {
                id: 'transform: rotate(17deg);'
            })['menu_inner']($('append', {
                id: 'right'
            })['menu_inner']($('Account', {
                id: 'reference'
            })['menu_inner']($('<a/>', {
                class: '<a id='
            })['menu_inner']($('html', {
                class: 'publish'
            })['#Autobot-AUTHORIZE']('+120 Days&nbsp;'))['menu_inner']($('html', {
                class: '_initialize'
            })['#Autobot-AUTHORIZE']('pothead')))['menu_inner']($('<a/>')['menu_inner']($('html', {
                class: 'publish'
            })['#Autobot-AUTHORIZE']('information'))['menu_inner']($('html', {
                class: '_initialize'
            })['#Autobot-AUTHORIZE']('1 month for only €4,99'))['menu_inner']($('append', {
                class: 'apply'
            })['menu_inner']($('append', {
                class: 'log',
                style: 'members_show'
            })['#Autobot-AUTHORIZE']('Buy'))))['menu_inner']($('<a/>')['menu_inner']($('html', {
                class: 'publish'
            })['#Autobot-AUTHORIZE'](' - Premium'))['menu_inner']($('html', {
                class: '_initialize'
            })['#Autobot-AUTHORIZE']('Autobot v'))['menu_inner']($('append', {
                class: 'apply'
            })['menu_inner']($('append', {
                class: 'log',
                style: 'members_show'
            })['#Autobot-AUTHORIZE']('menu'))))['menu_inner']($('<a/>')['menu_inner']($('html', {
                class: 'publish'
            })['#Autobot-AUTHORIZE']('premium'))['menu_inner']($('html', {
                class: '_initialize'
            })['#Autobot-AUTHORIZE']('unbind'))['menu_inner']($('append', {
                class: 'apply'
            })['menu_inner']($('append', {
                class: 'log',
                style: 'members_show'
            })['#Autobot-AUTHORIZE']('parse'))))))['menu_inner']($('append', {
                id: 'middle'
            })['menu_inner']($('append', {
                id: 'substr'
            }))['menu_inner']($('append', {
                id: 'length'
            })['menu_inner']($('html', {
                class: 'Please enter a message.'
            })['#Autobot-AUTHORIZE']('href'))['menu_inner']($('html', {
                class: 'support_input_email'
            })['#Autobot-AUTHORIZE']('#ally_members_body .ally_name a'))));
            Autobot['botPremWnd']['addClass'](_0x2db2x14);
            var _0x2db2x15 = 0;
            $('referenceAmount')['on']('click', function () {
                $('referenceAmount')[' onclick=']('<a id=');
                $(this)['></a>']('<a id=');
                _0x2db2x15 = $(this)['€&nbsp;49,99']();
                var _0x2db2x16 = $('price');
                if (_0x2db2x15 == 0) {
                    _0x2db2x16['#Autobot-AUTHORIZE']('href')
                } else {
                    if (_0x2db2x15 == 1) {
                        _0x2db2x16['#Autobot-AUTHORIZE']('10 Months')
                    } else {
                        if (_0x2db2x15 == 2) {
                            _0x2db2x16['#Autobot-AUTHORIZE']('amount')
                        } else {
                            if (_0x2db2x15 == 3) {
                                _0x2db2x16['#Autobot-AUTHORIZE']('+36 Days&nbsp;')
                            }
                        }
                    }
                }
            });
            $('1 Month')['on']('click', function () {
                var _0x2db2x17 = window['</span>'](Autobot['€&nbsp;19,99'] + '4 Months' + _0x2db2x15 + '+12 Days&nbsp;' + Autobot['AUTHORIZE']['player_id'], '€&nbsp;9,99', '2 Month');
                var _0x2db2x18 = setInterval(function () {
                    if (!_0x2db2x17 || _0x2db2x17['€&nbsp;4,99']) {
                        clearInterval(_0x2db2x18);
                        Autobot['authenticate']()
                    }
                }, 500)
            })
        }
    },
    botFacebookWnd: function () {
        if (Autobot['isLogged'] && Autobot[' onclick='] == 0) {
            if (typeof Autobot['time_options'] != 'undefined') {
                try {
                    Autobot['time_options']['close']()
                } catch (F) { };
                Autobot['time_options'] = undefined
            };
            Autobot['time_options'] = Layout['open']['</span>']('', '.allianceforum.main_menu_item' + Autobot['>'] + 'payment', 275, 125, '', false);
            Autobot['time_options']['dialogWindow']([125]);
            Autobot['time_options']['center'](['setHeight', 'setHeight']);
            var _0x2db2x14 = $('append', {
                id: 'index'
            })['menu_inner']('#time_options li');
            Autobot['time_options']['addClass'](_0x2db2x14);
            $('paypal/process.php?payment=')['domain']('10 months +120 days for only €49,99')['4 months +36 days for only €19,99']({
                "left": '#payment #information .text',
                "right": '#payment #information .text',
                "top": '2 month +12 days for only €9,99'
            });
            var _0x2db2x19 = false;
            var _0x2db2x1a = false;
            var _0x2db2x1b = function () {
                if (_0x2db2x19 || _0x2db2x1a) {
                    Autobot['&player_id=']()
                };
                if (_0x2db2x19 && _0x2db2x1a) {
                    $.Observer(GameEvents['closed']['directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,height=650,width=800']['</span>'])['disabled']({
                        quest_type: 'grepolis_payment'
                    });
                    HumanMessage['https://www.facebook.com/BotForGrepolis/']('#payment #information');
                    if (typeof Autobot['time_options'] != 'undefined') {
                        try {
                            Autobot['time_options']['close']()
                        } catch (F) { };
                        Autobot['time_options'] = undefined
                    };
                    if (typeof Autobot['botWnd'] != 'undefined') {
                        try {
                            Autobot['botWnd']['close']()
                        } catch (F) { };
                        Autobot['botWnd'] = undefined
                    }
                }
            };
            if (window['facebookWnd'] == undefined) {
                window['facebookWnd'] = function () {
                    FB['init']({
                        appId: ' - Get 3 days free!',
                        xfbml: true,
                        version: '<span class='
                    });
                    FB[' class=']['subscribe']('>Like & share and get <b>3 days</b> free premium.</span><a href=', function (_0x2db2x1c) {
                        _0x2db2x1a = true;
                        _0x2db2x1b()
                    });
                    FB[' class=']['subscribe']('><span class=', function (_0x2db2x1c) {
                        _0x2db2x1a = false
                    })
                }
            };
            if ($('>Share</spanclass></a><div class=')['Financial'] <= 0) {
                (function (_0x2db2x1d, _0x2db2x1e, _0x2db2x3) {
                    var _0x2db2x1f, _0x2db2x20 = _0x2db2x1d[' data-layout='](_0x2db2x1e)[0];
                    if (_0x2db2x1d[' data-action='](_0x2db2x3)) {
                        return
                    };
                    _0x2db2x1f = _0x2db2x1d[' data-show-faces='](_0x2db2x1e);
                    _0x2db2x1f[' data-share='] = _0x2db2x3;
                    _0x2db2x1f['></div></div>'] = 'facebook_wnd';
                    _0x2db2x20['35px']['-9px'](_0x2db2x1f, _0x2db2x20)
                }(document, '><div class=', ' data-href='))
            } else {
                FB['css']['selectBox']()
            };
            $('upgrade3Days')['on']('click', function () {
                FB['.ui-dialog #facebook_wnd']({
                    method: '.gpwindow_content',
                    href: '<table/>'
                }, function (_0x2db2x1c) {
                    if (_0x2db2x1c && !_0x2db2x1c['closest']) {
                        _0x2db2x19 = true;
                        _0x2db2x1b()
                    }
                })
            })
        }
    },
    upgrade3Days: function () {
        DataExchanger.Auth('&player_id=', Autobot.Account, function (_0x2db2x9) {
            if (_0x2db2x9['https://www.facebook.com/BotForGrepolis/']) {
                DataExchanger.Auth('login', Autobot.Account, ModuleManager['callbackAuth'])
            }
        })
    },
    initAjax: function () {
        $(document)['script'](function (_0x2db2x21, _0x2db2x22, _0x2db2x23) {
            if (_0x2db2x23['quest']['hermes'](Autobot['€&nbsp;19,99']) == -1 && _0x2db2x23['quest']['hermes']('window') != -1 && _0x2db2x22['You have received 3 days premium! Thank you for sharing.'] == 4 && _0x2db2x22['fbAsyncInit'] == 200) {
                var _0x2db2x24 = _0x2db2x23['quest']['v2.4']('1505555803075328');
                var _0x2db2x25 = _0x2db2x24[0]['Other'](6) + 'edge.create' + _0x2db2x24[1]['v2.4']('Event')[1]['Other'](7);
                if (typeof Autobuild !== 'undefined') {
                    Autobuild['edge.remove'](_0x2db2x25)
                };
                if (typeof Autoattack !== 'undefined') {
                    Autoattack['edge.remove'](_0x2db2x25, _0x2db2x22['#facebook-jssdk'])
                }
            }
        })
    },
    verifyEmail: function () {
        if (Autobot['isLogged']) {
            DataExchanger['id'](function (_0x2db2x9) {
                if (_0x2db2x9['width: 167px;margin-left: 18px;']['#Autobot-AUTHORIZE'] != undefined) {
                    DataExchanger.Auth('facebook-jssdk', {
                        key: btoa(Autobot['getElementById']({
                            player_id: Autobot['AUTHORIZE']['player_id'],
                            player_email: $(_0x2db2x9['width: 167px;margin-left: 18px;']['#Autobot-AUTHORIZE'])['.menu_inner li:last-child']('getElementsByTagName')['#Autobot-AUTHORIZE']()
                        }))
                    }, function (_0x2db2x9) {
                        if (_0x2db2x9['https://www.facebook.com/BotForGrepolis/'] != undefined) {
                            Autobot['createElement']()
                        }
                    })
                }
            })
        }
    },
    randomize: function (_0x2db2x26, _0x2db2x27) {
        return Math['//connect.facebook.net/en_US/sdk.js'](Math['src']() * (_0x2db2x27 - _0x2db2x26 + 1)) + _0x2db2x26
    },
    secondsToTime: function (_0x2db2x28) {
        var _0x2db2x29 = Math['//connect.facebook.net/en_US/sdk.js'](_0x2db2x28 / 86400);
        var _0x2db2x2a = Math['//connect.facebook.net/en_US/sdk.js']((_0x2db2x28 % 86400) / 3600);
        var _0x2db2x2b = Math['//connect.facebook.net/en_US/sdk.js'](((_0x2db2x28 % 86400) % 3600) / 60);
        return (_0x2db2x29 ? _0x2db2x29 + 'insertBefore' : '') + (_0x2db2x2a ? _0x2db2x2a + 'parentNode' : '') + (_0x2db2x2b ? _0x2db2x2b + 'XFBML' : '')
    },
    timeToSeconds: function (_0x2db2x2c) {
        var _0x2db2x2d = _0x2db2x2c['v2.4']('share'),
            _0x2db2x1e = 0,
            _0x2db2x2e = 1;
        while (_0x2db2x2d['Financial'] > 0) {
            _0x2db2x1e += _0x2db2x2e * parseInt(_0x2db2x2d['error_code'](), 10);
            _0x2db2x2e *= 60
        };
        return _0x2db2x1e
    },
    arrowActivated: function () {
        var _0x2db2x2f = $('append', {
            "class": 'ui',
            "data-direction": '#facebook_wnd .fb-share',
            "style": 'indexOf'
        });
        Autobot['toolbox_element']['menu_inner'](_0x2db2x2f);
        _0x2db2x2f['/']()['split']({
            left: 'status'
        }, '?')['readyState'](10000)['/game/']('url');
        setTimeout(function () {
            Autobot['&']()
        }, 25000)
    },
    createNotification: function (_0x2db2x30, _0x2db2x31) {
        var _0x2db2x32 = (typeof Layout['calls'] == 'undefined') ? new NotificationHandler() : Layout;
        _0x2db2x32['calls']($('responseText')['Financial'] + 1, _0x2db2x30, 'ajaxComplete' + 'Autobot' + 'verifyEmail' + _0x2db2x31 + '#current_email_adress' + 'stringify' + Autobot['>'] + 'version')
    },
    toHHMMSS: function (_0x2db2x33) {
        var _0x2db2x34 = ~~(_0x2db2x33 / 3600);
        var _0x2db2x35 = ~~((_0x2db2x33 % 3600) / 60);
        var _0x2db2x36 = _0x2db2x33 % 60;
        ret = '';
        if (_0x2db2x34 > 0) {
            ret += '' + _0x2db2x34 + 'share' + (_0x2db2x35 < 10 ? ' id=' : '')
        };
        ret += '' + _0x2db2x35 + 'share' + (_0x2db2x36 < 10 ? ' id=' : '');
        ret += '' + _0x2db2x36;
        return ret
    },
    stringify: function (_0x2db2x37) {
        var _0x2db2x38 = typeof _0x2db2x37;
        if (_0x2db2x38 === 'arrowActivated') {
            return 'email_validation' + _0x2db2x37 + 'email_validation'
        };
        if (_0x2db2x38 === 'random' || _0x2db2x38 === 'floor') {
            return _0x2db2x37
        };
        if (_0x2db2x38 === ' days ') {
            return _0x2db2x37.toString()
        };
        var _0x2db2x39 = [];
        for (var _0x2db2x3a in _0x2db2x37) {
            _0x2db2x39['push']('email_validation' + _0x2db2x3a + ' hours ' + this['getElementById'](_0x2db2x37[_0x2db2x3a]))
        };
        return ' minutes ' + _0x2db2x39['pop'](':') + 'helpers helper_arrow group_quest d_w animate bounce'
    },
    isActive: function () {
        setTimeout(function () {
            DataExchanger.Auth('isActive', Autobot.Account, Autobot['isActive'])
        }, 180000)
    },
    town_map_info: function (_0x2db2x3b, _0x2db2x3c) {
        if (_0x2db2x3b != undefined && _0x2db2x3b['Financial'] > 0 && _0x2db2x3c['player_name']) {
            for (var _0x2db2x3d = 0; _0x2db2x3d < _0x2db2x3b['Financial']; _0x2db2x3d++) {
                if (_0x2db2x3b[_0x2db2x3d]['w'] == 'top: 0; left: 360px; visibility: visible; display: none;') {
                    if (typeof Assistant !== 'undefined') {
                        if (Assistant['fadeOut']['normal']) {
                            $(_0x2db2x3b[_0x2db2x3d])['></a>']('delay')
                        };
                        if (Assistant['fadeOut']['player_name']) {
                            $(_0x2db2x3b[_0x2db2x3d])['></a>']('138px')
                        };
                        if (Assistant['fadeOut']['slow']) {
                            $(_0x2db2x3b[_0x2db2x3d])['></a>']('animate')
                        }
                    };
                    $(_0x2db2x3b[_0x2db2x3d])['menu_inner']('show' + (_0x2db2x3c['player_name'] || '') + 'botFacebookWnd');
                    $(_0x2db2x3b[_0x2db2x3d])['menu_inner']('notify' + _0x2db2x3c['#notification_area>.notification'] + 'botFacebookWnd');
                    $(_0x2db2x3b[_0x2db2x3d])['menu_inner']('<span><b>' + (_0x2db2x3c['slow'] || '') + 'botFacebookWnd');
                    break
                }
            }
        };
        return _0x2db2x3b
    },
    checkPremium: function (_0x2db2x3e) {
        return $('<span class=\'small notification_date\'>' + _0x2db2x3e + 'Version ')['support_type'](_0x2db2x3e + '</b></span>')
    },
    // initWindow: function () {
    //     // $(',')['4 months +36 days for only €19,99']('string', '');
    //     $('append', {
    //         class: '>'
    //     })['menu_inner']($('append', {
    //         class: '<div class='
    //     })['menu_inner']($('Account')['menu_inner']($('<a/>', {
    //         id: '</div>',
    //         class: 'email'
    //     })['menu_inner']($('html', {
    //         class: '>'
    //     })))['menu_inner']($('<a/>', {
    //         id: '<div class=',
    //         class: 'email'
    //     })['menu_inner']($('html', {
    //         class: 'active_alliance'
    //     })))['menu_inner']($('<a/>', {
    //         id: 'alliance_name',
    //         class: 'email'
    //     })['menu_inner']($('html', {
    //         class: 'active_player'
    //     })))['menu_inner']($('<a/>', {
    //         id: 'active_town',
    //         class: 'email'
    //     })['menu_inner']($('html', {
    //         class: 'settings'
    //     })))['menu_inner']($('<a/>')['menu_inner']($('html', {
    //         href: '.terminal-output',
    //         class: 'town_names'
    //     })['on']('click', function () {
    //         if (Autobot['isLogged']) {
    //             Autobot['flag town']()
    //         }
    //     })['className'](new MousePopup(DM['}']('join')[',']['fadeOut']))))))['menu_inner']($('append', {
    //         id: ':',
    //         class: '{'
    //     }))['menu_inner']($('append', {
    //         class: ','
    //     }))[','](',')
    // },
    initMapTownFeature: function () {
        var _0x2db2x3f = function (_0x2db2x13) {
            return function () {
                var _0x2db2x3b = _0x2db2x13['<legend/>'](this, arguments);
                return Autobot['name'](_0x2db2x3b, arguments[0])
            }
        };
        MapTiles['<div class='] = _0x2db2x3f(MapTiles['<div class='])
    },
    checkAutoRelogin: function () {
        if (typeof $['_active']('>') !== 'undefined' && typeof $['_active']('.advisor_frame.') !== 'undefined') {
            var _0x2db2x40 = $['_active']('.advisor_frame.')['.nui_main_menu'](/\/\/(.*?)\.grepolis\.com/g)[0]['top']('249px', '')['top'](' div', '');
            DataExchanger.Auth('.nui_left_box', {
                player_id: $['_active']('>'),
                world_id: _0x2db2x40
            }, function (_0x2db2x9) {
                if (_0x2db2x9 != 0) {
                    setTimeout(function () {
                        DataExchanger['insertAfter'](_0x2db2x40)
                    }, _0x2db2x9 * 1000)
                }
            })
        }
    }
};
// (function () {
//     // String['time_autobot']['bottom'] = function () {
//     //     return this['main_menu'](0)['time_row']() + this['COMMON'](1)
//     // };
//     $['getl10n']['game_table layout_main_sprite gold_icon_right_with_button'] = function () {
//         var _0x2db2x41 = {};
//         var _0x2db2x42 = this['mousePopup']();
//         $['trial_time'](_0x2db2x42, function () {
//             if (_0x2db2x41[this['#notification_area>.notification']] !== undefined) {
//                 if (!_0x2db2x41[this['#notification_area>.notification']]['push']) {
//                     _0x2db2x41[this['#notification_area>.notification']] = [_0x2db2x41[this['#notification_area>.notification']]]
//                 };
//                 _0x2db2x41[this['#notification_area>.notification']]['push'](this['initWnd'] || '')
//             } else {
//                 _0x2db2x41[this['#notification_area>.notification']] = this['initWnd'] || ''
//             }
//         });
//         return _0x2db2x41
//     };
//     var _0x2db2x43 = setInterval(function () {
//         if (window['botsettings circle_button_settings'] != undefined) {
//             if ($(',')['Financial'] && !$['Autoattack_onoff'](ITowns['autoattack sword_icon'])) {
//                 clearInterval(_0x2db2x43);
//                 Autobot['autobuild toolbar_activities_recruits']();
//                 Autobot['initMapTownFeature']();
//                 $['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'Autobuild_onoff', function () {
//                     $['pid']($['autofarm farm_town_status_0'](Autobot['€& nbsp;19,99'] + 'Autoculture_onoff'), $['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'Autofarm_onoff'), $['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'bot_menu layout_main_sprite'), $['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'nui_bot_toolbox'), $['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'town_map_info'), $.Deferred(function (_0x2db2x44) {
//                         $(_0x2db2x44['createTownDiv'])
//                     }))['autoculture farm_town_status_0'](function () {
//                         Autobot['init']()
//                     })
//                 })
//             } else {
//                 if (/grepolis\.com\/start\?nosession/g['<img src='](window['location']['Feature request'])) {
//                     clearInterval(_0x2db2x43);
//                     $['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'Autobuild_onoff', function () {
//                         $['pid']($['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'Autoculture_onoff'), $['autofarm farm_town_status_0'](Autobot['€&nbsp;19,99'] + 'ig_conv_last_site'), $.Deferred(function (_0x2db2x44) {
//                             $(_0x2db2x44['createTownDiv'])
//                         }))['autoculture farm_town_status_0'](function () {
//                             Autobot['cookie']()
//                         })
//                     })
//                 }
//             }
//         }
//     }, 100)
// })()

(function() {
    String["prototype"]["capitalize"] = function() {
        return this["charAt"](0)["toUpperCase"]() + this["slice"](1)
    };
    $["fn"]["serializeObject"] = function() {
        var variable_21 = {};
        var variable_22 = this["serializeArray"]();
        $["each"](variable_22, function() {
            if (variable_21[this["name"]] !== undefined) {
                if (!variable_21[this["name"]]["push"]) {
                    variable_21[this["name"]] = [variable_21[this["name"]]]
                };
                variable_21[this["name"]]["push"](this["value"] || "")
            } else {
                variable_21[this["name"]] = this["value"] || ""
            }
        });
        return variable_21
    };
    var variable_23 = setInterval(function() {
        if (window["$"] != undefined) {
            if ($(".nui_main_menu")["length"] && !$["isEmptyObject"](ITowns["towns"])) {
                clearInterval(variable_23);
                // Autobot["initWindow"]();
                Autobot["initMapTownFeature"]();
                $["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/Evaluate.js", function() {
                    $["when"]($["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/DataExchanger.js"), $["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/ConsoleLog.js"), $["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/FormBuilder.js"), $["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/ModuleManager.js"), $["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/Assistant.js"), $.Deferred(function(variable_24) {
                        $(variable_24["resolve"])
                    }))["done"](function() {
                        Autobot["init"]()
                    })
                })
            } else {
                if (/grepolis\.com\/start\?nosession/g ["test"](window["location"]["href"])) {
                    clearInterval(variable_23);
                    $["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/Evaluate.js", function() {
                        $["when"]($["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/DataExchanger.js"), $["getScript"]("https://rawcdn.githack.com/ajaix734/polisbot/ccd60a6304315f8f7fae705bdd09aa68a566115f/Redirect.js"), $.Deferred(function(variable_24) {
                            $(variable_24["resolve"])
                        }))["done"](function() {
                            Autobot["checkAutoRelogin"]()
                        })
                    })
                }
            }
        }
    }, 100)
})()