! function (b, q) {
  "function" == typeof define && define.amd ? define(["jquery"], q) : "object" == typeof module && module.exports ? module.exports = q(require("jquery")) : b.Strip = q(jQuery)
}(this, function (b) {
  function q() {
    return this.initialize.apply(this, r.call(arguments))
  }

  function C() {
    return this.initialize.apply(this, r.call(arguments))
  }

  function z(a) {
    var c = {
      type: "image"
    };
    return b.each(J, function (b, e) {
      var d = e.data(a);
      d && (c = d, c.type = b, c.url = a)
    }), c
  }

  function A(a) {
    return (a = (a || "").replace(/\?.*/g, "").match(/\.([^.]{3,4})$/))
      ? a[1].toLowerCase() : null
  }

  function x() {
    this.initialize.apply(this, r.call(arguments))
  }
  var t = {
      version: "1.6.4",
      Skins: {
        strip: {}
      }
    },
    l = function (a) {
      function b(b) {
        return (b = (new RegExp(b + "([\\d.]+)")).exec(a)) ? parseFloat(b[1]) : !0
      }
      return {
        IE: !(!window.attachEvent || -1 !== a.indexOf("Opera")) && b("MSIE "),
        Opera: -1 < a.indexOf("Opera") && (!!window.opera && opera.version && parseFloat(opera.version()) || 7.55),
        WebKit: -1 < a.indexOf("AppleWebKit/") && b("AppleWebKit/"),
        Gecko: -1 < a.indexOf("Gecko") && -1 === a.indexOf("KHTML") && b("rv:"),
        MobileSafari: !!a.match(/Apple.*Mobile.*Safari/),
        Chrome: -1 < a.indexOf("Chrome") && b("Chrome/"),
        ChromeMobile: -1 < a.indexOf("CrMo") && b("CrMo/"),
        Android: -1 < a.indexOf("Android") && b("Android "),
        IEMobile: -1 < a.indexOf("IEMobile") && b("IEMobile/")
      }
    }(navigator.userAgent),
    r = Array.prototype.slice,
    D = {
      within: function (a, c, d) {
        var e = b.extend({
            height: !0,
            width: !0
          }, d || {}),
          g = b.extend({}, c);
        d = 5;
        var y = e.width;
        for (e = e.height; 0 < d && (y && g.width > a.width || e && g.height > a.height);) {
          var m = 1,
            f = 1;
          y && g.width > a.width && (m = a.width / g.width);
          e && g.height > a.height && (f = a.height / g.height);
          g = Math.min(m, f);
          g = {
            width: Math.round(c.width * g),
            height: Math.round(c.height * g)
          };
          d--
        }
        return g.width = Math.max(g.width, 0), g.height = Math.max(g.height, 0), g
      }
    };
  b.extend(b.easing, {
    stripEaseInCubic: function (a, b, d, e, g) {
      return e * (b /= g) * b * b + d
    },
    stripEaseInSine: function (a, b, d, e, g) {
      return -e * Math.cos(b / g * (Math.PI / 2)) + e + d
    },
    stripEaseOutSine: function (a, b, d, e, g) {
      return e * Math.sin(b / g * (Math.PI / 2)) + d
    }
  });
  var h = function () {
    function a(a, e) {
      var c = a.charAt(0).toUpperCase() + a.substr(1);
      c = (a + " " + d.join(c + " ") + c).split(" ");
      a: {
        for (g in c)
          if (void 0 !== b.style[c[g]]) {
            var g = "prefix" == e ? c[g] : !0;
            break a
          } g = !1
      }
      return g
    }
    var b = document.createElement("div"),
      d = ["Webkit", "Moz", "O", "ms", "Khtml"],
      e = {
        animation: a("animation"),
        transform: a("transform"),
        prefixed: function (b) {
          return a(b, "prefix")
        }
      },
      g = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    try {
      var y = !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
    } catch (m) {
      y = !1
    }
    return {
      css: e,
      svg: g,
      touch: y
    }
  }();
  h.mobileTouch = h.touch && (l.MobileSafari || l.Android || l.IEMobile || l.ChromeMobile || !/^(Win|Mac|Linux)/.test(navigator.platform));
  var I = {
      viewport: function () {
        var a = {
          width: b(window).width()
        };
        a.height = l.MobileSafari || l.Android && l.Gecko ? document.documentElement.clientWidth / window.innerWidth * window.innerHeight : b(window).height();
        return a
      }
    },
    E = function (a) {
      var b = function () {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments))
      };
      a.extend(b.prototype, {
        initialize: function (b) {
          this.options =
            a.extend({
              test: function () {},
              success: function () {},
              timeout: function () {},
              callAt: !1,
              intervals: [
                [0, 0],
                [1E3, 10],
                [2E3, 50],
                [4E3, 100],
                [2E4, 500]
              ]
            }, b || {});
          this._test = this.options.test;
          this._success = this.options.success;
          this._timeout = this.options.timeout;
          this._time = this._ipos = 0;
          this._delay = this.options.intervals[this._ipos][1];
          this._callTimeouts = [];
          this.poll();
          this._createCallsAt()
        },
        poll: function () {
          this._polling = setTimeout(a.proxy(function () {
            if (this._test()) return void this.success();
            if (this._time += this._delay,
              this._time >= this.options.intervals[this._ipos][0]) {
              if (!this.options.intervals[this._ipos + 1]) return void("function" == a.type(this._timeout) && this._timeout());
              this._ipos++;
              this._delay = this.options.intervals[this._ipos][1]
            }
            this.poll()
          }, this), this._delay)
        },
        success: function () {
          this.abort();
          this._success()
        },
        _createCallsAt: function () {
          this.options.callAt && a.each(this.options.callAt, a.proxy(function (b, c) {
            var e = c[0],
              d = c[1];
            e = setTimeout(a.proxy(function () {
              d()
            }, this), e);
            this._callTimeouts.push(e)
          }, this))
        },
        _stopCallTimeouts: function () {
          a.each(this._callTimeouts,
            function (a, b) {
              clearTimeout(b)
            });
          this._callTimeouts = []
        },
        abort: function () {
          this._stopCallTimeouts();
          this._polling && (clearTimeout(this._polling), this._polling = null)
        }
      });
      var d = function () {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments))
      };
      return a.extend(d.prototype, {
        supports: {
          naturalWidth: "naturalWidth" in new Image
        },
        initialize: function (b, c, d, f) {
          return this.img = a(b)[0], this.successCallback = c, this.errorCallback = d, this.isLoaded = !1, this.options = a.extend({
              method: "onload",
              pollFallbackAfter: 1E3
            },
            f || {}), "onload" != this.options.method && this.supports.naturalWidth ? void this.poll() : void this.load()
        },
        poll: function () {
          this._poll = new b({
            test: a.proxy(function () {
              return 0 < this.img.naturalWidth
            }, this),
            success: a.proxy(function () {
              this.success()
            }, this),
            timeout: a.proxy(function () {
              this.error()
            }, this),
            callAt: [
              [this.options.pollFallbackAfter, a.proxy(function () {
                this.load()
              }, this)]
            ]
          })
        },
        load: function () {
          this._loading = setTimeout(a.proxy(function () {
            var b = new Image;
            this._onloadImage = b;
            b.onload = a.proxy(function () {
              b.onload =
                function () {};
              this.supports.naturalWidth || (this.img.naturalWidth = b.width, this.img.naturalHeight = b.height, b.naturalWidth = b.width, b.naturalHeight = b.height);
              this.success()
            }, this);
            b.onerror = a.proxy(this.error, this);
            b.src = this.img.src
          }, this))
        },
        success: function () {
          this._calledSuccess || (this._calledSuccess = !0, this.abort(), this.waitForRender(a.proxy(function () {
            this.isLoaded = !0;
            this.successCallback(this)
          }, this)))
        },
        error: function () {
          this._calledError || (this._calledError = !0, this.abort(), this._errorRenderTimeout =
            setTimeout(a.proxy(function () {
              this.errorCallback && this.errorCallback(this)
            }, this)))
        },
        abort: function () {
          this.stopLoading();
          this.stopPolling();
          this.stopWaitingForRender()
        },
        stopPolling: function () {
          this._poll && (this._poll.abort(), this._poll = null)
        },
        stopLoading: function () {
          this._loading && (clearTimeout(this._loading), this._loading = null);
          this._onloadImage && (this._onloadImage.onload = function () {}, this._onloadImage.onerror = function () {})
        },
        waitForRender: function (a) {
          this._renderTimeout = setTimeout(a)
        },
        stopWaitingForRender: function () {
          this._renderTimeout
            && (clearTimeout(this._renderTimeout), this._renderTimeout = null);
          this._errorRenderTimeout && (clearTimeout(this._errorRenderTimeout), this._errorRenderTimeout = null)
        }
      }), d
    }(jQuery);
  q.supported = h.css.transform && h.css.animation;
  b.extend(q.prototype, {
    initialize: function (a, c) {
      this.element = b(a);
      this.element[0] && (this.classPrefix = "strp-", this.setOptions(c || {}), this.element.addClass(this.classPrefix + "spinner"), this.element.append(this._rotate = b("<div>").addClass(this.classPrefix + "spinner-rotate")), this.build(), this.start())
    },
    setOptions: function (a) {
      this.options = b.extend({
        show: 200,
        hide: 200
      }, a || {})
    },
    build: function () {
      if (!this._build) {
        this._rotate.html("");
        var a = (2 * (this.options.length + this.options.radius), this.element.is(":visible"));
        a || this.element.show();
        var c, d;
        this._rotate.append(c = b("<div>").addClass(this.classPrefix + "spinner-frame").append(d = b("<div>").addClass(this.classPrefix + "spinner-line")));
        var e = parseInt(b(d).css("z-index"));
        this.lines = e;
        d.css({
          "z-index": "inherit"
        });
        c.remove();
        a || this.element.hide();
        for (a = 0; e
          > a; a++) {
          this._rotate.append(c = b("<div>").addClass(this.classPrefix + "spinner-frame").append(d = b("<div>").addClass(this.classPrefix + "spinner-line")));
          var g = g || d.css("color");
          d.css({
            background: g
          });
          c.css({
            opacity: (1 / e * (a + 1)).toFixed(2)
          });
          d = {};
          d[h.css.prefixed("transform")] = "rotate(" + 360 / e * (a + 1) + "deg)";
          c.css(d)
        }
        this._build = !0
      }
    },
    start: function () {
      var a = {};
      a[h.css.prefixed("animation")] = this.classPrefix + "spinner-spin 1s infinite steps(" + this.lines + ")";
      this._rotate.css(a)
    },
    stop: function () {
      var a = {};
      a[h.css.prefixed("animation")] =
        "none";
      this._rotate.css(a)
    },
    show: function (a) {
      this.build();
      this.start();
      this.element.stop(!0).fadeTo(this.options.show, 1, a)
    },
    hide: function (a) {
      this.element.stop(!0).fadeOut(this.options.hide, b.proxy(function () {
        this.stop();
        a && a()
      }, this))
    },
    refresh: function () {
      this._build = !1;
      this.build()
    }
  });
  b.extend(C.prototype, {
    initialize: function () {
      this._timers = {}
    },
    set: function (a, b, d) {
      this._timers[a] = setTimeout(b, d)
    },
    get: function (a) {
      return this._timers[a]
    },
    clear: function (a) {
      a ? this._timers[a] && (clearTimeout(this._timers[a]),
        delete this._timers[a]) : this.clearAll()
    },
    clearAll: function () {
      b.each(this._timers, function (a, b) {
        clearTimeout(b)
      });
      this._timers = {}
    }
  });
  var J = {
      image: {
        extensions: "bmp gif jpeg jpg png webp",
        detect: function (a) {
          return -1 < b.inArray(A(a), this.extensions.split(" "))
        },
        data: function (a) {
          return this.detect() ? {
            extension: A(a)
          } : !1
        }
      },
      youtube: {
        detect: function (a) {
          var b = /(youtube\.com|youtu\.be)\/watch\?(?=.*vi?=([a-zA-Z0-9-_]+))(?:\S+)?$/.exec(a);
          return b && b[2] ? b[2] : (b = /(youtube\.com|youtu\.be)\/(vi?\/|u\/|embed\/)?([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(a),
            b && b[3] ? b[3] : !1)
        },
        data: function (a) {
          return (a = this.detect(a)) ? {
            id: a
          } : !1
        }
      },
      vimeo: {
        detect: function (a) {
          return (a = /(vimeo\.com)\/([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(a)) && a[2] ? a[2] : !1
        },
        data: function (a) {
          return (a = this.detect(a)) ? {
            id: a
          } : !1
        }
      }
    },
    K = function () {
      var a = function () {
        return this.initialize.apply(this, r.call(arguments))
      };
      b.extend(a.prototype, {
        initialize: function (a, b) {
          this.url = a;
          this.callback = b;
          this.load()
        },
        load: function () {
          var a = c.get(this.url);
          if (a) return this.callback(a.data);
          a = "http" + (window.location && "https:"
            == window.location.protocol ? "s" : "") + ":";
          var e = z(this.url).id;
          this._xhr = b.getJSON(a + "//vimeo.com/api/oembed.json?url=" + a + "//vimeo.com/" + e + "&maxwidth=9999999&maxheight=9999999&callback=?", b.proxy(function (a) {
            a = {
              dimensions: {
                width: a.width,
                height: a.height
              }
            };
            c.set(this.url, a);
            this.callback && this.callback(a)
          }, this))
        },
        abort: function () {
          this._xhr && (this._xhr.abort(), this._xhr = null)
        }
      });
      var c = {
        cache: [],
        get: function (a) {
          for (var b = null, c = 0; c < this.cache.length; c++) this.cache[c] && this.cache[c].url == a && (b = this.cache[c]);
          return b
        },
        set: function (a, b) {
          this.remove(a);
          this.cache.push({
            url: a,
            data: b
          })
        },
        remove: function (a) {
          for (var b = 0; b < this.cache.length; b++) this.cache[b] && this.cache[b].url == a && delete this.cache[b]
        }
      };
      return a
    }(),
    B = {
      defaults: {
        effects: {
          spinner: {
            show: 200,
            hide: 200
          },
          transition: {
            min: 175,
            max: 250
          },
          ui: {
            show: 0,
            hide: 200
          },
          window: {
            show: 300,
            hide: 300
          }
        },
        hideOnClickOutside: !0,
        keyboard: {
          left: !0,
          right: !0,
          esc: !0
        },
        loop: !0,
        overlap: !0,
        preload: [1, 2],
        position: !0,
        skin: "strip",
        side: "right",
        spinner: !0,
        toggle: !0,
        uiDelay: 3E3,
        vimeo: {
          autoplay: 1,
          api: 1,
          title: 1,
          byline: 1,
          portrait: 0,
          loop: 0
        },
        youtube: {
          autoplay: 1,
          controls: 1,
          enablejsapi: 1,
          hd: 1,
          iv_load_policy: 3,
          loop: 0,
          modestbranding: 1,
          rel: 0,
          vq: "hd1080"
        },
        initialTypeOptions: {
          image: {},
          vimeo: {
            width: 1280
          },
          youtube: {
            width: 1280,
            height: 720
          }
        }
      },
      create: function (a, c, d) {
        a = a || {};
        a.skin = a.skin || this.defaults.skin;
        d = a.skin ? b.extend({}, t.Skins[a.skin] || t.Skins[this.defaults.skin]) : {};
        d = b.extend(!0, {}, this.defaults, d);
        d.initialTypeOptions && (c && d.initialTypeOptions[c] && (d = b.extend(!0, {}, d.initialTypeOptions[c], d)), delete d.initialTypeOptions);
        var e = b.extend(!0, {}, d, a);
        return (!e.effects || l.IE && 9 > l.IE) && (e.effects = {}, b.each(this.defaults.effects, function (a, c) {
          b.each(e.effects[a] = b.extend({}, c), function (b) {
            e.effects[a][b] = 0
          })
        }), e.spinner = !1), e.keyboard && ("boolean" == b.type(e.keyboard) && (e.keyboard = {}, b.each(this.defaults.keyboard, function (a) {
          e.keyboard[a] = !0
        })), ("vimeo" == c || "youtube" == c) && b.extend(e.keyboard, {
          left: !1,
          right: !1
        })), ("vimeo" == c || "youtube" == c) && (e.overlap = !1), e
      }
    };
  b.extend(x.prototype, {
    initialize: function (a, c) {
      var d = c || {};
      if ("string"
        == b.type(a)) a = {
        url: a
      };
      else if (a && 1 == a.nodeType) {
        var e = b(a);
        a = {
          element: e[0],
          url: e.attr("href"),
          caption: e.data("strip-caption"),
          group: e.data("strip-group"),
          extension: e.data("strip-extension"),
          type: e.data("strip-type"),
          options: e.data("strip-options") && eval("({" + e.data("strip-options") + "})") || {}
        }
      }
      a && (a.extension || (a.extension = A(a.url)), !a.type) && (e = z(a.url), a._data = e, a.type = e.type);
      return a._data || (a._data = z(a.url)), a.options = a && a.options ? b.extend(!0, b.extend({}, d), b.extend({}, a.options)) : b.extend({}, d),
        a.options = B.create(a.options, a.type, a._data), b.extend(this, a), this
    }
  });
  var k = {
      initialize: function (a) {
        this.element = a;
        this.pages = {};
        this.uid = 1
      },
      add: function (a) {
        this.uid++;
        this.views = a;
        this.pages[this.uid] = [];
        f._showUIOnResize = !0;
        b.each(a, b.proxy(function (a, b) {
          this.pages[this.uid].push(new L(b, a + 1, this.views.length))
        }, this))
      },
      show: function (a, c) {
        var d = this.pages[this.uid][a - 1];
        return this.page && this.page.uid == d.uid ? void(d.view.options.toggle && (f.hide(), this.page = null)) : (k.setActiveClass(d), this.page = d,
          this.removeHiddenAndLoadingInactive(), void d.show(b.proxy(function () {
            this._switched = !1;
            c && c()
          }, this)))
      },
      getLoadingCount: function () {
        var a = 0;
        return b.each(this.pages, function (c, d) {
          b.each(d, function (b, c) {
            c.loading && a++
          })
        }), a
      },
      getPositionInActivePageGroup: function (a) {
        var c = 0,
          d = this.pages[this.uid];
        return d && b.each(d, function (b, d) {
          d.view.element && d.view.element == a && (c = b + 1)
        }), c
      },
      removeExpired: function (a) {
        b.each(this.pages, function (c, d) {
          c != this._id && b.each(d, function (b, c) {
            c.remove(a)
          })
        })
      },
      removeAll: function () {
        b.each(this.pages,
          function (a, c) {
            b.each(c, function (a, b) {
              b.remove()
            })
          });
        this.pages = {}
      },
      hideVisibleInactive: function (a) {
        b.each(this.pages, b.proxy(function (c, d) {
          b.each(d, b.proxy(function (b, c) {
            c.uid != this.page.uid && c.hide(null, a)
          }, this))
        }, this))
      },
      stopInactive: function () {
        b.each(this.pages, b.proxy(function (a, c) {
          b.each(c, b.proxy(function (a, b) {
            b.uid == this.page.uid || b.preloading || b.stop()
          }, this))
        }, this))
      },
      removeHiddenAndLoadingInactive: function () {
        var a = [];
        b.each(this.pages, b.proxy(function (c, d) {
          if (c != this.uid) {
            var e = 0;
            b.each(d,
              b.proxy(function (a, b) {
                b.visible && !b.loading || b.animatingWindow || b.remove();
                b.removed && e++
              }, this));
            e == d.length && a.push(c)
          }
        }, this));
        b.each(a, b.proxy(function (a, b) {
          delete this.pages[b]
        }, this))
      },
      stop: function () {
        b.each(this.pages, function (a, c) {
          b.each(c, function (a, b) {
            b.stop()
          })
        })
      },
      setActiveClass: function (a) {
        this.removeActiveClasses();
        if (a = a.view.element) b(a).addClass("strip-active-element strip-active-group"), (a = b(a).data("strip-group")) && b('.strip[data-strip-group="' + a + '"]').addClass("strip-active-group")
      },
      removeActiveClasses: function () {
        b(".strip-active-group").removeClass("strip-active-group strip-active-element")
      }
    },
    L = function () {
      function a() {
        return this.initialize.apply(this, r.call(arguments))
      }
      var c = 0,
        d = {};
      return b.extend(a.prototype, {
        initialize: function (a, d, y) {
          this.view = a;
          this.dimensions = {
            width: 0,
            height: 0
          };
          this.uid = c++;
          this._position = d;
          this._total = y;
          this.visible = this.animated = !1;
          this.queues = {};
          this.queues.showhide = b({})
        },
        create: function () {
          if (!this._created) {
            k.element.append(this.element = b("<div>").addClass("strp-page").append(this.container =
              b("<div>").addClass("strp-container")).css({
              opacity: 0
            }).hide());
            var a = this.view.options.position && 1 < this._total;
            switch ((this.view.caption || a) && (this.element.append(this.info = b("<div>").addClass("strp-info").append(this.info_padder = b("<div>").addClass("strp-info-padder"))), a && (this.element.addClass("strp-has-position"), this.info_padder.append(b("<div>").addClass("strp-position").html(this._position + " / " + this._total))), this.view.caption && this.info_padder.append(this.caption = b("<div>").addClass("strp-caption").html(this.view.caption))),
              this.view.type) {
              case "image":
                this.container.append(this.content = b("<img>").attr({
                  src: this.view.url
                }));
                break;
              case "vimeo":
              case "youtube":
                this.container.append(this.content = b("<div>"))
            }
            this.element.addClass("strp" + (this.view.options.overlap ? "" : "-no") + "-overlap");
            2 > this._total && this.element.addClass("strp-no-sides");
            this.content.addClass("strp-content-element");
            this._created = !0
          }
        },
        _getSurroundingPages: function () {
          var a;
          if (!(a = this.view.options.preload)) return [];
          var b = [],
            c = Math.max(1, this._position - a[0]);
          a = Math.min(this._position + a[1], this._total);
          for (var d = this._position, f = d; a >= f; f++) {
            var v = k.pages[k.uid][f - 1];
            v._position != d && b.push(v)
          }
          for (f = d; f >= c; f--) v = k.pages[k.uid][f - 1], v._position != d && b.push(v);
          return b
        },
        preloadSurroundingImages: function () {
          var a = this._getSurroundingPages();
          b.each(a, b.proxy(function (a, b) {
            b.preload()
          }, this))
        },
        preload: function () {
          this.preloading || this.preloaded || "image" != this.view.type || !this.view.options.preload || this.loaded || (this.create(), this.preloading = !0, new E(this.content[0],
            b.proxy(function (a) {
              this.loaded = !0;
              this.preloading = !1;
              this.preloaded = !0;
              this.dimensions = {
                width: a.img.naturalWidth,
                height: a.img.naturalHeight
              }
            }, this), null, {
              method: "naturalWidth"
            }))
        },
        load: function (a) {
          if (this.create(), this.loaded) return void(a && a());
          switch (this.abort(), this.loading = !0, this.view.options.spinner && !d[this.view.url] && f.startLoading(), this.view.type) {
            case "image":
              if (this.error) return void(a && a());
              this.imageReady = new E(this.content[0], b.proxy(function (b) {
                this._markAsLoaded();
                this.dimensions = {
                  width: b.img.naturalWidth,
                  height: b.img.naturalHeight
                };
                a && a()
              }, this), b.proxy(function () {
                this._markAsLoaded();
                this.content.hide();
                this.container.append(this.error = b("<div>").addClass("strp-error"));
                this.element.addClass("strp-has-error");
                this.dimensions = {
                  width: this.error.outerWidth(),
                  height: this.error.outerHeight()
                };
                a && a()
              }, this), {
                method: "naturalWidth"
              });
              break;
            case "vimeo":
              this.vimeoReady = new K(this.view.url, b.proxy(function (b) {
                this._markAsLoaded();
                this.dimensions = {
                  width: b.dimensions.width,
                  height: b.dimensions.height
                };
                a && a()
              }, this));
              break;
            case "youtube":
              this._markAsLoaded(), this.dimensions = {
                width: this.view.options.width,
                height: this.view.options.height
              }, a && a()
          }
        },
        _markAsLoaded: function () {
          this.loading = !1;
          this.loaded = !0;
          d[this.view.url] = !0;
          f.stopLoading()
        },
        isVideo: function () {
          return /^(youtube|vimeo)$/.test(this.view.type)
        },
        insertVideo: function (a) {
          if (this.playerIframe || !this.isVideo()) return void(a && a());
          var c = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":",
            e = b.extend({}, this.view.options[this.view.type]
              || {});
          e = b.param(e);
          c = {
            vimeo: c + "//player.vimeo.com/video/{id}?{queryString}",
            youtube: c + "//www.youtube.com/embed/{id}?{queryString}"
          } [this.view.type].replace("{id}", this.view._data.id).replace("{queryString}", e);
          this.content.append(this.playerIframe = b("<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen>").attr({
            src: c,
            height: this.contentDimensions.height,
            width: this.contentDimensions.width,
            frameborder: 0
          }));
          a && a()
        },
        raise: function () {
          var a = k.element[0].lastChild;
          a && a == this.element[0] || k.element.append(this.element)
        },
        show: function (a) {
          var c = this.queues.showhide;
          c.queue([]);
          this.animated = !0;
          this.animatingWindow = !1;
          c.queue(function (a) {
            k.stopInactive();
            a()
          });
          c.queue(b.proxy(function (a) {
            f.setSide(this.view.options.side, a)
          }, this));
          c.queue(b.proxy(function (a) {
            this.view.options.spinner && f._spinner && (f.setSpinnerSkin(this.view.options.skin), f._spinner.setOptions(this.view.options.effects.spinner), f._spinner.refresh());
            this.load(b.proxy(function () {
              this.preloadSurroundingImages();
              a()
            }, this))
          }, this));
          c.queue(b.proxy(function (a) {
            this.raise();
            f.setSkin(this.view.options.skin);
            f.bindUI();
            F.enable(this.view.options.keyboard);
            this.fitToWindow();
            a()
          }, this));
          c.queue(b.proxy(function (a) {
            f.timers.set("bind-hide-on-click-outside", b.proxy(function () {
              f.bindHideOnClickOutside();
              a()
            }, this), 1)
          }, this));
          this.isVideo() && c.queue(b.proxy(function (a) {
            this.insertVideo(b.proxy(function () {
              a()
            }))
          }, this));
          c.queue(b.proxy(function (a) {
            this.animatingWindow = !0;
            var c = 3,
              e = "horizontal" == this.getOrientation() ? "width" : "height",
              d = this.view && this.view.options.onShow;
            "function"
            == b.type(d) && d.call(t);
            var g = f.resize(this[e], function () {
              1 > --c && a()
            }, g);
            this._show(function () {
              1 > --c && a()
            }, g);
            f.adjustPrevNext(function () {
              1 > --c && a()
            }, g);
            f._showUIOnResize && (f.showUI(null, g), f._showUIOnResize = !1);
            k.hideVisibleInactive(g)
          }, this));
          c.queue(b.proxy(function (b) {
            this.animated = this.animatingWindow = !1;
            this.visible = !0;
            a && a();
            b()
          }, this))
        },
        _show: function (a, c) {
          var d = f.visible ? "number" == b.type(c) ? c : this.view.options.effects.transition.min : 0;
          this.element.stop(!0).show().fadeTo(d || 0, 1, a)
        },
        hide: function (a,
          c) {
          if (this.element) {
            this.removeVideo();
            this.abort();
            var d = this.view.options.effects.transition.min;
            "number" == b.type(c) && (d = c);
            this.isVideo() && (d = 0);
            this.element.stop(!0).fadeTo(d, 0, "stripEaseInCubic", b.proxy(function () {
              this.element.hide();
              this.visible = !1;
              a && a()
            }, this))
          }
        },
        stop: function () {
          this.queues.showhide.queue([]);
          this.element && this.element.stop(!0);
          this.abort()
        },
        removeVideo: function () {
          this.playerIframe && (this.playerIframe[0].src = "//about:blank", this.playerIframe.remove(), this.playerIframe = null)
        },
        remove: function () {
          this.stop();
          this.removeVideo();
          this.element && this.element.remove();
          this.visible = !1;
          this.removed = !0
        },
        abort: function () {
          this.imageReady && !this.preloading && (this.imageReady.abort(), this.imageReady = null);
          this.vimeoReady && (this.vimeoReady.abort(), this.vimeoReady = null);
          this.loading = !1;
          f.stopLoading()
        },
        _getDimensionsFitToView: function () {
          var a = b.extend({}, this.dimensions),
            c = b.extend({}, this.dimensions),
            d = this.view.options;
          return d.maxWidth && (a.width = d.maxWidth), d.maxHeight && (a.heigth = d.maxHeight),
            D.within(a, c)
        },
        getOrientation: function () {
          return "left" == this.view.options.side || "right" == this.view.options.side ? "horizontal" : "vertical"
        },
        fitToWindow: function () {
          var a = this.element,
            c = this._getDimensionsFitToView(),
            d = I.viewport(),
            m = b.extend({}, d),
            k = "horizontal" == this.getOrientation() ? "width" : "height",
            v = a.find(".strp-container");
          f.element.removeClass("strp-measured");
          var p = f.element,
            n = "width" == k ? 0 < parseInt(p.css("min-width")) : 0 < parseInt(p.css("min-height"));
          p = n ? 0 : parseInt(p.css("margin-" + ("width" == k ? "left"
            : "bottom")));
          f.element.addClass("strp-measured");
          m[k] -= p;
          var h = parseInt(v.css("padding-left")) + parseInt(v.css("padding-right")),
            t = parseInt(v.css("padding-top")) + parseInt(v.css("padding-bottom"));
          m.width -= h;
          m.height -= t;
          var w = D.within(m, c);
          p = b.extend({}, w);
          var q = this.content;
          this.error && (q = this.error);
          var r = this.info,
            u = 0;
          if (r) {
            var x = f.element.is(":visible");
            x || f.element.show();
            var z = a.is(":visible");
            if (z || a.show(), "width" == k) {
              a.css({
                width: n ? d.width : w.width + h
              });
              var A = m.height;
              q.hide();
              u = r.outerHeight();
              q.show();
              m.height = A - u;
              p = D.within(m, c);
              for (var B, C, G, E = b.extend({}, p), F = u, H = n ? 0 : 4; 0 < H && (G = w.width - p.width);) a.css({
                width: w.width + h - G
              }), C = u, q.hide(), u = r.outerHeight(), B = Math.max(this.caption ? this.caption.outerWidth() + h : 0, this.position ? this.position.outerWidth() + h : 0), q.show(), u == C && B <= w.width + h - G ? w.width -= G : (m.height = A - u, p = D.within(m, c), 0 >= H - 1 && (a.css({
                width: w.width + h
              }), p = E, u = F)), H--
            } else l.IE && 8 > l.IE && a.css({
              width: d.width
            }), q.hide(), u = r.outerHeight(), q.show(), m.height -= u, p = D.within(m, c), w.height = p.height;
            z || a.hide();
            x || f.element.hide()
          }
          c = {
            width: w.width + h,
            height: w.height + t + u
          };
          n && (c = d);
          a.css("width" == k ? {
            width: c.width
          } : {
            height: c.height
          });
          v.css({
            bottom: u
          });
          a = -.5 * p.width;
          d = -.5 * p.height;
          l.IE && 8 > l.IE && (a = Math.floor(a), d = Math.floor(d));
          q.css(b.extend({}, p, {
            "margin-left": a,
            "margin-top": d
          }));
          this.playerIframe && this.playerIframe.attr(p);
          this.contentDimensions = p;
          this.width = c.width;
          this.height = c.height;
          this.z = this[k]
        }
      }), a
    }(),
    f = {
      initialize: function () {
        this.queues = [];
        this.queues.hide = b({});
        this.pages = [];
        this.timers =
          new C;
        this.build();
        this.setSkin(B.defaults.skin)
      },
      build: function () {
        q.supported && (b(document.body).append(this.spinnerMove = b("<div>").addClass("strp-spinner-move").hide().append(this.spinner = b("<div>").addClass("strp-spinner"))), this._spinner = new q(this.spinner), this._spinnerMoveSkinless = this.spinnerMove[0].className);
        b(document.body).append(this.element = b("<div>").addClass("strp-window strp-measured").append(this._pages = b("<div>").addClass("strp-pages")).append(this._close = b("<div>").addClass("strp-close").attr("tabindex",
          0).text("\u95dc\u9589").append(b("<div>").addClass("strp-close-background")).append(b("<div>").addClass("strp-close-icon"))).append(this._previous = b("<div>").addClass("strp-nav strp-nav-previous").text("\u4e0a\u4e00\u5f35").append(b("<div>").addClass("strp-nav-button").attr("tabindex", 0).append(b("<div>").addClass("strp-nav-button-background")).append(b("<div>").addClass("strp-nav-button-icon"))).hide()).append(this._next = b("<div>").addClass("strp-nav strp-nav-next").text("\u4e0b\u4e00\u5f35").append(b("<div>").addClass("strp-nav-button").attr("tabindex",
          0).append(b("<div>").addClass("strp-nav-button-background")).append(b("<div>").addClass("strp-nav-button-icon"))).hide()));
        k.initialize(this._pages);
        h.mobileTouch && this.element.addClass("strp-mobile-touch");
        h.svg || this.element.addClass("strp-no-svg");
        this._close.on("click", b.proxy(function (a) {
          a.preventDefault();
          this.hide()
        }, this));
        this._previous.on("click", b.proxy(function (a) {
          this.previous();
          this._onMouseMove(a)
        }, this));
        this._next.on("click", b.proxy(function (a) {
          this.next();
          this._onMouseMove(a)
        }, this));
        this.hideUI(null, 0)
      },
      setSkin: function (a) {
        this._skin && this.element.removeClass("strp-window-skin-" + this._skin);
        this.element.addClass("strp-window-skin-" + a).find(".strp-close").focus();
        this._skin = a
      },
      setSpinnerSkin: function (a) {
        this.spinnerMove && (this._spinnerSkin && this.spinnerMove.removeClass("strp-spinner-move-skin-" + this._spinnerSkin), this.spinnerMove.addClass("strp-spinner-move-skin-" + a), this._spinner.refresh(), this._spinnerSkin = a)
      },
      startObservingResize: function () {
        this._isObservingResize || (this._onWindowResizeHandler =
          b.proxy(this._onWindowResize, this), b(window).on("resize orientationchange", this._onWindowResizeHandler), this._isObservingResize = !0)
      },
      stopObservingResize: function () {
        this._onWindowResizeHandler && (b(window).off("resize orientationchange", this._onWindowResizeHandler), this._onWindowResizeHandler = null);
        this._isObservingResize = !1
      },
      _onWindowResize: function () {
        var a;
        (a = k.page) && (a.animated || a.animatingWindow ? (a.fitToWindow(), a.show()) : (a.fitToWindow(), this.resize(a.z, null, 0), this.adjustPrevNext(null, !0)))
      },
      resize: function (a, c, d) {
        var e = "vertical" == this.getOrientation() ? "Height" : "Width",
          g = e.toLowerCase();
        0 < a && (this.visible = !0, this.startObservingResize());
        e = f.element["outer" + e]();
        if (0 == e) e = this.view.options.effects.window.show, this.element.addClass("strp-opening"), this.opening = !0;
        else if ("number" == b.type(d)) e = d;
        else {
          var k = this.view.options.effects.transition;
          d = k.min;
          k = k.max - d;
          var m = I.viewport();
          e = Math.round(d + Math.min(1, Math.abs(e - a) / m[g]) * k)
        }
        0 == a && (this.closing = !0, this.element.is(":animated") || this.element.addClass("strp-closing"));
        d = {
          overflow: "visible"
        };
        d[g] = a;
        var h = 1;
        this._offsetLeft = this._outerWidth = null;
        var l = this.view.options.onResize;
        a = "function" == b.type(l);
        return this.element.stop(!0).animate(d, b.extend({
          duration: e,
          complete: b.proxy(function () {
            1 > --h && this._afterResize(c)
          }, this)
        }, a ? {
          step: b.proxy(function (a, b) {
            b.prop == g && l.call(t, b.prop, a, this.side)
          }, this)
        } : {})), this.spinnerMove && (h++, this.spinnerMove.stop(!0).animate(d, e, b.proxy(function () {
          1 > --h && this._afterResize(c)
        }, this))), e
      },
      _afterResize: function (a) {
        this.closing = this.opening = !1;
        this.element.removeClass("strp-opening strp-closing");
        this._outerWidth = this.element.outerWidth();
        this._offsetLeft = this.element.offset().left;
        a && a()
      },
      adjustPrevNext: function (a, c) {
        if (this.view && k.page) {
          var d = k.page,
            e = this.element.is(":visible");
          e || this.element.show();
          var f = this._previous.attr("style");
          this._previous.removeAttr("style");
          var h = parseInt(this._previous.css("margin-top"));
          this._previous.attr({
            style: f
          });
          e || this.element.hide();
          e = d.info ? d.info.outerHeight() : 0;
          d = this._previous.add(this._next);
          h = {
            "margin-top": h - .5 * e
          };
          e = this.view.options.effects.transition.min;
          "number" == b.type(c) && (e = c);
          this.opening && (e = 0);
          d.stop(!0).animate(h, e, a);
          this._previous[this.mayPrevious() ? "show" : "hide"]();
          this._next[this.mayNext() ? "show" : "hide"]()
        }
      },
      resetPrevNext: function () {
        this._previous.add(this._next).stop(!0).removeAttr("style")
      },
      load: function (a, b) {
        this.views = a;
        k.add(a);
        b && this.setPosition(b)
      },
      setSide: function (a, c) {
        if (this.side == a) return void(c && c());
        this.visible ? (this.hideUI(null, this.view ? this.view.options.effects.window.hide
          : 0), this.unbindUI(), this.resize(0, b.proxy(function () {
          this._safeResetsAfterSwitchSide();
          k.hideVisibleInactive(0);
          this._setSide(a, c)
        }, this)), this._showUIOnResize = !0) : this._setSide(a, c)
      },
      _setSide: function (a, b) {
        this.side = a;
        var c = this.getOrientation(),
          e = this.element;
        this.spinnerMove && (e = e.add(this.spinnerMove));
        e.removeClass("strp-horizontal strp-vertical").addClass("strp-" + c);
        e.removeClass("strp-side-top strp-side-right strp-side-bottom strp-side-left").addClass("strp-side-" + a);
        b && b()
      },
      getOrientation: function () {
        return "left"
          == this.side || "right" == this.side ? "horizontal" : "vertical"
      },
      startLoading: function () {
        this._spinner && (this.spinnerMove.show(), this._spinner.show())
      },
      stopLoading: function () {
        this._spinner && 1 > k.getLoadingCount() && this._spinner.hide(b.proxy(function () {
          this.spinnerMove.hide()
        }, this))
      },
      setPosition: function (a, c) {
        this._position = a;
        this.view = this.views[a - 1];
        this.stopHideQueue();
        this.page = k.show(a, b.proxy(function () {
          var d = this.view.options.afterPosition;
          "function" == b.type(d) && d.call(t, a);
          c && c()
        }, this))
      },
      hide: function (a) {
        if (this.view) {
          var c =
            this.queues.hide;
          c.queue([]);
          c.queue(b.proxy(function (a) {
            k.stop();
            a()
          }, this));
          c.queue(b.proxy(function (a) {
            var b = this.view ? this.view.options.effects.window.hide : 0;
            this.unbindUI();
            this.hideUI(null, b);
            this.unbindHideOnClickOutside();
            F.disable();
            a()
          }, this));
          c.queue(b.proxy(function (a) {
            k.removeActiveClasses();
            this.resize(0, a, this.view.options.effects.window.hide);
            this._showUIOnResize = !0
          }, this));
          c.queue(b.proxy(function (a) {
            this._safeResetsAfterSwitchSide();
            this.stopObservingResize();
            k.removeAll();
            this.timers.clear();
            this._position = -1;
            var c = this.view && this.view.options.afterHide;
            "function" == b.type(c) && c.call(t);
            this.view = null;
            a()
          }, this));
          "function" == b.type(a) && c.queue(b.proxy(function (b) {
            a();
            b()
          }, this))
        }
      },
      stopHideQueue: function () {
        this.queues.hide.queue([])
      },
      _safeResetsAfterSwitchSide: function () {
        this.element.removeAttr("style");
        this.spinnerMove && this.spinnerMove.removeAttr("style");
        this.visible = !1;
        this.hideUI(null, 0);
        this.timers.clear("ui");
        this.resetPrevNext();
        this._y = this._x = -1
      },
      mayPrevious: function () {
        return this.view
          && this.view.options.loop && this.views && 1 < this.views.length || 1 != this._position
      },
      previous: function (a) {
        var b = this.mayPrevious();
        (a || b) && this.setPosition(this.getSurroundingIndexes().previous)
      },
      mayNext: function () {
        var a = this.views && 1 < this.views.length;
        return this.view && this.view.options.loop && a || a && 1 != this.getSurroundingIndexes().next
      },
      next: function (a) {
        var b = this.mayNext();
        (a || b) && this.setPosition(this.getSurroundingIndexes().next)
      },
      getSurroundingIndexes: function () {
        if (!this.views) return {};
        var a = this._position,
          b = this.views.length;
        return {
          previous: 1 >= a ? b : a - 1,
          next: a >= b ? 1 : a + 1
        }
      },
      bindHideOnClickOutside: function () {
        this.unbindHideOnClickOutside();
        b(document.documentElement).on("click", this._delegateHideOutsideHandler = b.proxy(this._delegateHideOutside, this))
      },
      unbindHideOnClickOutside: function () {
        this._delegateHideOutsideHandler && (b(document.documentElement).off("click", this._delegateHideOutsideHandler), this._delegateHideOutsideHandler = null)
      },
      _delegateHideOutside: function (a) {
        var c = k.page;
        this.visible && c && c.view.options.hideOnClickOutside
          && (b(a.target).closest(".strip, .strp-window")[0] || this.hide() || $("#photoshow li:first-child a").setfocus())
      },
      bindUI: function () {
        this.unbindUI();
        h.mobileTouch || (this.element.on("mouseenter", this._showUIHandler = b.proxy(this.showUI, this)).on("mouseleave", this._hideUIHandler = b.proxy(this.hideUI, this)), this.element.on("mousemove", this._mousemoveUIHandler = b.proxy(function (a) {
            var b = a.pageX;
            a = a.pageY;
            this._hoveringNav || a == this._y && b == this._x || (this._x = b, this._y = a, this.showUI(), this.startUITimer())
          }, this)),
          this._pages.on("mousemove", ".strp-container", this._onMouseMoveHandler = b.proxy(this._onMouseMove, this)).on("mouseleave", ".strp-container", this._onMouseLeaveHandler = b.proxy(this._onMouseLeave, this)).on("mouseenter", ".strp-container", this._onMouseEnterHandler = b.proxy(this._onMouseEnter, this)), this.element.on("mouseenter", ".strp-nav", this._onNavMouseEnterHandler = b.proxy(this._onNavMouseEnter, this)).on("mouseleave", ".strp-nav", this._onNavMouseLeaveHandler = b.proxy(this._onNavMouseLeave, this)), b(window).on("scroll",
            this._onScrollHandler = b.proxy(this._onScroll, this)));
        this._pages.on("click", ".strp-container", this._onClickHandler = b.proxy(this._onClick, this))
      },
      unbindUI: function () {
        this._showUIHandler && (this.element.off("mouseenter", this._showUIHandler).off("mouseleave", this._hideUIHandler).off("mousemove", this._mousemoveUIHandler), this._pages.off("mousemove", ".strp-container", this._onMouseMoveHandler).off("mouseleave", ".strp-container", this._onMouseLeaveHandler).off("mouseenter", ".strp-container", this._onMouseEnterHandler),
          this.element.off("mouseenter", ".strp-nav", this._onNavMouseEnterHandler).off("mouseleave", ".strp-nav", this._onNavMouseLeaveHandler), b(window).off("scroll", this._onScrollHandler), this._showUIHandler = null);
        this._onClickHandler && (this._pages.off("click", ".strp-container", this._onClickHandler), this._onClickHandler = null)
      },
      _onScroll: function () {
        this._offsetLeft = this._outerWidth = null
      },
      _onMouseMove: function (a) {
        a = this._getEventSide(a);
        var b = a.toLowerCase();
        this.element[(this["may" + a]() ? "add" : "remove") + "Class"]("strp-hovering-clickable");
        this._previous[("next" != b ? "add" : "remove") + "Class"]("strp-nav-previous-hover strp-nav-hover");
        this._next[("next" == b ? "add" : "remove") + "Class"]("strp-nav-next-hover strp-nav-hover")
      },
      _onMouseLeave: function () {
        this.element.removeClass("strp-hovering-clickable");
        this._previous.removeClass("strp-nav-previous-hover").add(this._next.removeClass("strp-nav-next-hover")).removeClass("strp-nav-hover")
      },
      _onClick: function (a) {
        this[this._getEventSide(a).toLowerCase()]();
        this._onMouseMove(a)
      },
      _onMouseEnter: function (a) {
        this._onMouseMove(a)
      },
      _getEventSide: function (a) {
        var b = this._offsetLeft || this.element.offset().left;
        a = a.pageX - b;
        return .5 * (this._outerWidth || this.element.outerWidth()) > a ? "Previous" : "Next"
      },
      _onNavMouseEnter: function () {
        this._hoveringNav = !0;
        this.clearUITimer()
      },
      _onNavMouseLeave: function () {
        this._hoveringNav = !1;
        this.startUITimer()
      },
      showUI: function (a, c) {
        this.clearUITimer();
        var d = this.element.find(".strp-nav-button"),
          e = this.view ? this.view.options.effects.ui.show : 0;
        "number" == b.type(c) && (e = c);
        d.stop(!0).fadeTo(e, 1, "stripEaseInSine",
          b.proxy(function () {
            this.startUITimer();
            "function" == b.type(a) && a()
          }, this))
      },
      hideUI: function (a, c) {
        this.clearUITimer();
        var d = this.element.find(".strp-nav-button"),
          e = this.view ? this.view.options.effects.ui.show : 0;
        "number" == b.type(c) && (e = c);
        d.stop(!0).fadeTo(e, 1, "stripEaseInSine", b.proxy(function () {
          this.startUITimer();
          "function" == b.type(a) && a()
        }, this))
      },
      clearUITimer: function () {
        h.mobileTouch || this.timers.clear("ui")
      },
      startUITimer: function () {
        h.mobileTouch || (this.clearUITimer(), this.timers.set("ui", b.proxy(function () {
            this.hideUI()
          },
          this), this.view ? this.view.options.uiDelay : 0))
      }
    },
    F = {
      enabled: !1,
      keyCode: {
        left: 37,
        right: 39,
        esc: 27
      },
      enable: function (a) {
        this.disable();
        a && (b(document).on("keydown", this._onKeyDownHandler = b.proxy(this.onKeyDown, this)).on("keyup", this._onKeyUpHandler = b.proxy(this.onKeyUp, this)), this.enabled = a)
      },
      disable: function () {
        this.enabled = !1;
        this._onKeyUpHandler && (b(document).off("keyup", this._onKeyUpHandler).off("keydown", this._onKeyDownHandler), this._onKeyUpHandler = this._onKeyDownHandler = null)
      },
      onKeyDown: function (a) {
        if (this.enabled
          && f.visible) {
          var b = this.getKeyByKeyCode(a.keyCode);
          if (b && (!b || !this.enabled || this.enabled[b])) switch (a.preventDefault(), a.stopPropagation(), b) {
            case "left":
              f.previous();
              break;
            case "right":
              f.next()
          }
        }
      },
      onKeyUp: function (a) {
        if (this.enabled && f.visible && (a = this.getKeyByKeyCode(a.keyCode)) && (!a || !this.enabled || this.enabled[a])) switch (a) {
          case "esc":
            f.hide(), $("#photoshow li:first-child a").setfocus()
        }
      },
      getKeyByKeyCode: function (a) {
        for (var b in this.keyCode)
          if (this.keyCode[b] == a) return b;
        return null
      }
    },
    n = {
      _disabled: !1,
      _fallback: !0,
      initialize: function () {
        f.initialize();
        this._disabled || this.startDelegating()
      },
      startDelegating: function () {
        this.stopDelegating();
        b(document.documentElement).on("click", ".strip[href]", this._delegateHandler = b.proxy(this.delegate, this))
      },
      stopDelegating: function () {
        this._delegateHandler && (b(document.documentElement).off("click", ".strip[href]", this._delegateHandler), this._delegateHandler = null)
      },
      delegate: function (a) {
        this._disabled || (a.stopPropagation(), a.preventDefault(), n.show(a.currentTarget))
      },
      show: function (a) {
        if (this._disabled) return void this.showFallback.apply(n, r.call(arguments));
        var c = arguments[1] || {},
          d = arguments[2];
        arguments[1] && "number" == b.type(arguments[1]) && (d = arguments[1], c = {});
        var e = [],
          g = a && 1 == a.nodeType;
        switch (b.type(a)) {
          case "string":
          case "object":
            var h = new x(a, c);
            if (h.group) {
              if (g) {
                h = b('.strip[data-strip-group="' + b(a).data("strip-group") + '"]');
                var m = {};
                h.filter("[data-strip-group-options]").each(function (a, c) {
                  b.extend(m, eval("({" + (b(c).attr("data-strip-group-options") || "")
                    + "})"))
                });
                h.each(function (f, g) {
                  d || g != a || (d = f + 1);
                  e.push(new x(g, b.extend({}, m, c)))
                })
              }
            } else m = {}, g && b(a).is("[data-strip-group-options]") && (b.extend(m, eval("({" + (b(a).attr("data-strip-group-options") || "") + "})")), h = new x(a, b.extend({}, m, c))), e.push(h);
            break;
          case "array":
            b.each(a, function (a, b) {
              var d = new x(b, c);
              e.push(d)
            })
        }(!d || 1 > d) && (d = 1);
        d > e.length && (d = e.length);
        f.unbindHideOnClickOutside();
        var l;
        g && (l = k.getPositionInActivePageGroup(a)) ? (l == f._position && f.bindHideOnClickOutside(), f.setPosition(l)) : f.load(e,
          d)
      },
      showFallback: function () {
        function a(c) {
          var d = b.type(c);
          return "string" == d ? c : "array" == d && c[0] ? a(c[0]) : _.isElement(c) && b(c).attr("href") ? b(c).attr("href") : c.url ? c.url : !1
        }
        return function (b) {
          n._fallback && (b = a(b)) && (window.location.href = b)
        }
      }()
    };
  return b.extend(t, {
    show: function () {
      return n.show.apply(n, r.call(arguments)), this
    },
    hide: function () {
      return f.hide(), this
    },
    disable: function () {
      return n.stopDelegating(), n._disabled = !0, this
    },
    enable: function () {
      return n._disabled = !1, n.startDelegating(), this
    },
    fallback: function (a) {
      return n._fallback =
        a, this
    },
    setDefaultSkin: function (a) {
      return B.defaults.skin = a, this
    }
  }), (l.IE && 7 > l.IE || "number" == b.type(l.Android) && 3 > l.Android || l.MobileSafari && "number" == b.type(l.WebKit) && 533.18 > l.WebKit) && (n.show = n.showFallback, b.each(["startDelegating", "stopDelegating", "initialize"], function (a, b) {
    n[b] = function () {}
  }), t.hide = function () {
    return this
  }), b(document).ready(function () {
    n.initialize();
    jQuery.fn.setfocus = function () {
      return this.each(function () {
        var a = this;
        setTimeout(function () {
          try {
            a.focus()
          } catch (c) {}
        }, 0)
      })
    };
    b(".strp-nav-previous .strp-nav-button").keypress(function (a) {
      13
        == a.which && f.previous()
    });
    b(".strp-nav-next .strp-nav-button").keypress(function (a) {
      13 == a.which && f.next()
    });
    b(".strp-close").keypress(function (a) {
      13 == a.which && (f.hide(), b("#photoshow li:first-child a").setfocus())
    });
    $("header a,.acc,.accesskey").focusin(function () {
      return f.hide(), this
    })
  }), t
});
