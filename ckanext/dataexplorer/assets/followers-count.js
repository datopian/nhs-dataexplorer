(function(jQuery) {
  function DummyObject() { }
  function create(proto) {
    if (typeof proto !== 'object') { return {}; }
    else if (Object.create) { return Object.create(proto); }
    DummyObject.prototype = proto; return new DummyObject();
  }
  jQuery.inherit = function(parent, methods, properties) {
    methods = methods || {}; function Object() { parent.apply(this, arguments); }
    var Child = methods.hasOwnProperty('constructor') ? methods.constructor : Object; Child.prototype = create(parent.prototype); Child.prototype.constructor = Child; jQuery.extend(Child.prototype, methods); return jQuery.extend(Child, parent, properties, { __super__: parent.prototype });
  };
})(this.jQuery);
(function(jQuery) {
  jQuery.proxyAll = function(obj) {
    var methods = [].slice.call(arguments, 1); var index = 0; var length = methods.length; var property; var method; for (; index < length; index += 1) { method = methods[index]; for (property in obj) { if (typeof obj[property] === 'function') { if ((method instanceof RegExp && method.test(property)) || property === method) { if (obj[property].proxied !== true) { obj[property] = jQuery.proxy(obj[property], obj); obj[property].proxied = true; } } } } }
    return obj;
  };
})(this.jQuery);
(function($, window) {
  $.url = {
    escape: function(string) { return window.encodeURIComponent(string || '').replace(/%20/g, '+'); }, slugify: function(string, trim) {
      var str = ''; var index = 0; var length = string.length; var map = this.map; for (; index < length; index += 1) { str += map[string.charCodeAt(index).toString(16)] || '-'; }
      str = str.toLowerCase(); return trim === false ? str : str.replace(/\-+/g, '-').replace(/^-|-$/g, '');
    }
  }; var unicode = ('20 30 31 32 33 34 35 36 37 38 39 41 42 43 44 45 46 ' + '47 48 49 50 51 52 53 54 55 56 57 58 59 61 62 63 64 65 66 67 68 69 70 ' + '71 72 73 74 75 76 77 78 79 100 101 102 103 104 105 106 107 108 109 ' + '110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 ' + '126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 ' + '142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 ' + '158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 ' + '174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 ' + '190 191 192 193 194 195 196 197 198 199 200 201 202 203 204 205 ' + '206 207 208 209 210 211 212 213 214 215 216 217 218 219 220 221 ' + '222 223 224 225 226 227 228 229 230 231 232 233 234 235 236 237 ' + '238 239 240 241 242 243 244 245 246 247 248 249 250 251 252 253 ' + '254 255 256 257 258 259 260 261 262 263 264 265 266 267 268 269 ' + '270 271 272 273 274 275 276 277 278 279 280 281 282 283 284 285 ' + '286 287 288 289 290 291 292 293 294 295 296 297 298 299 363 364 ' + '365 366 367 368 369 386 388 389 390 391 392 393 394 395 396 397 ' + '398 399 400 401 402 403 404 405 406 407 408 409 410 411 412 413 ' + '414 415 416 417 418 419 420 421 422 423 424 425 426 427 428 429 ' + '430 431 432 433 434 435 436 437 438 439 440 441 442 443 444 445 ' + '446 447 448 449 450 451 452 453 454 455 456 457 458 459 460 461 ' + '462 463 464 465 466 467 468 469 470 471 472 473 474 475 476 477 ' + '478 479 480 481 490 491 492 493 494 495 496 497 498 499 500 501 ' + '502 503 504 505 506 507 508 509 510 511 512 513 514 515 531 532 ' + '533 534 535 536 537 538 539 540 541 542 543 544 545 546 547 548 ' + '549 550 551 552 553 554 555 556 561 562 563 564 565 566 567 568 ' + '569 570 571 572 573 574 575 576 577 578 579 580 581 582 583 584 ' + '585 586 587 4a 4b 4c 4d 4e 4f 5a 6a 6b 6c 6d 6e 6f 7a a2 a3 a5 a7 ' + 'a9 aa ae b2 b3 b5 b6 b9 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 ca cb cc cd ' + 'ce cf d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 da db dc dd de df e0 e1 e2 e3 ' + 'e4 e5 e6 e7 e8 e9 ea eb ec ed ee ef f0 f1 f2 f3 f4 f5 f6 f8 f9 fa ' + 'fb fc fd ff 10a 10b 10c 10d 10e 10f 11a 11b 11c 11d 11e 11f 12a ' + '12b 12c 12d 12e 12f 13a 13b 13c 13d 13e 13f 14a 14b 14c 14d 14e ' + '14f 15a 15b 15c 15d 15e 15f 16a 16b 16c 16d 16e 16f 17a 17b 17c ' + '17d 17e 17f 18a 18b 18c 18d 18e 18f 19a 19b 19c 19d 19e 19f 1a0 ' + '1a1 1a2 1a3 1a4 1a5 1a6 1a7 1a8 1a9 1aa 1ab 1ac 1ad 1ae 1af 1b0 ' + '1b1 1b2 1b3 1b4 1b5 1b6 1b7 1b8 1b9 1ba 1bb 1bc 1bd 1be 1bf 1c4 ' + '1c5 1c6 1c7 1c8 1c9 1ca 1cb 1cc 1cd 1ce 1cf 1d0 1d1 1d2 1d3 1d4 ' + '1d5 1d6 1d7 1d8 1d9 1da 1db 1dc 1dd 1de 1df 1e0 1e1 1e2 1e3 1e4 ' + '1e5 1e6 1e7 1e8 1e9 1ea 1eb 1ec 1ed 1ee 1ef 1f0 1f1 1f2 1f3 1f4 ' + '1f5 1f6 1f7 1f8 1f9 1fa 1fb 1fc 1fd 1fe 1ff 20a 20b 20c 20d 20e ' + '20f 21a 21b 21c 21d 21e 21f 22a 22b 22c 22d 22e 22f 23a 23b 23c ' + '23d 23e 23f 24a 24b 24c 24d 24e 24f 25a 25b 25c 25d 25e 25f 26a ' + '26b 26c 26d 26e 26f 27a 27b 27c 27d 27e 27f 28a 28b 28c 28d 28e ' + '28f 29a 29b 29c 29d 29e 29f 2a0 2a1 2a2 2a3 2a4 2a5 2a6 2a7 2a8 ' + '2a9 2aa 2ab 2ac 2ae 2af 2b0 2b1 2b2 2b3 2b4 2b5 2b6 2b7 2b8 2df ' + '2e0 2e1 2e2 2e3 2e4 36a 36b 36c 36d 36e 36f 37b 37c 37d 38a 38c ' + '38e 38f 39a 39b 39c 39d 39e 39f 3a0 3a1 3a3 3a4 3a5 3a6 3a7 3a8 ' + '3a9 3aa 3ab 3ac 3ad 3ae 3af 3b0 3b1 3b2 3b3 3b4 3b5 3b6 3b7 3b8 ' + '3b9 3ba 3bb 3bc 3bd 3be 3bf 3c0 3c1 3c2 3c3 3c4 3c5 3c6 3c7 3c8 ' + '3c9 3ca 3cb 3cc 3cd 3ce 3d0 3d1 3d2 3d3 3d4 3d5 3d6 3d7 3d8 3d9 ' + '3da 3db 3dc 3dd 3de 3df 3e2 3e3 3e4 3e5 3e6 3e7 3e8 3e9 3ea 3eb ' + '3ec 3ed 3ee 3ef 3f0 3f1 3f2 3f3 3f4 3f5 3f6 3f7 3f8 3f9 3fa 3fb ' + '3fc 3fd 3fe 3ff 40a 40b 40c 40d 40e 40f 41a 41b 41c 41d 41e 41f ' + '42a 42b 42c 42d 42e 42f 43a 43b 43c 43d 43e 43f 44a 44b 44c 44d ' + '44e 44f 45a 45b 45c 45d 45e 45f 46a 46b 46c 46d 46e 46f 47a 47b ' + '47c 47d 47e 47f 48a 48b 48c 48d 48e 48f 49a 49b 49c 49d 49e 49f ' + '4a0 4a1 4a2 4a3 4a4 4a5 4a6 4a7 4a8 4a9 4aa 4ab 4ac 4ad 4ae 4af ' + '4b0 4b1 4b2 4b3 4b4 4b5 4b6 4b7 4b8 4b9 4ba 4bb 4bc 4bd 4be 4bf ' + '4c0 4c1 4c2 4c3 4c4 4c5 4c6 4c7 4c8 4c9 4ca 4cb 4cc 4cd 4ce 4cf ' + '4d0 4d1 4d2 4d3 4d4 4d5 4d6 4d7 4d8 4d9 4da 4db 4dc 4dd 4de 4df ' + '4e0 4e1 4e2 4e3 4e4 4e5 4e6 4e7 4e8 4e9 4ea 4eb 4ec 4ed 4ee 4ef ' + '4f0 4f1 4f2 4f3 4f4 4f5 4f6 4f7 4f8 4f9 4fa 4fb 4fc 4fd 4fe 4ff ' + '50a 50b 50c 50d 50e 50f 51a 51b 51c 51d 53a 53b 53c 53d 53e 53f ' + '54a 54b 54c 54d 54e 54f 56a 56b 56c 56d 56e 56f 57a 57b 57c 57d ' + '57e 57f 5f').split(' '); var replacement = ('- 0 1 2 3 4 5 6 7 8 9 A B C D E F G H I P Q R S T ' + 'U V W X Y a b c d e f g h i p q r s t u v w x y A a A a A a C c C c ' + 'D d E e E e E e E e G g G g H h H h I i I i IJ ij J j K k k L l L l ' + 'N n N n N n n O o OE oe R r R r R r S s T t T t T t U u U u U u W w ' + 'Y y Y Z b B b b b b C C c D E F f G Y h i I K k A a A a E e E e I i ' + 'R r R r U u U u S s n d 8 8 Z z A a E e O o Y y l n t j db qp < ? ? ' + 'B U A E e J j a a a b c e d d e e g g g Y x u h h i i w m n n N o oe ' + 'm o r R R S f f f f t t u Z Z 3 3 ? ? 5 C O B a e i o u c d A ' + 'E H i A B r A E Z H O I E E T r E S I I J jb A B B r D E X 3 N N P ' + 'C T y O X U h W W a 6 B r d e x 3 N N P C T Y qp x U h W W e e h r ' + 'e s i i j jb W w Tb tb IC ic A a IA ia Y y O o V v V v Oy oy C c R ' + 'r F f H h X x 3 3 d d d d R R R R JT JT E e JT jt JX JX U D Q N T ' + '2 F r p z 2 n x U B j t n C R 8 R O P O S w f q n t q t n p h a n ' + 'a u j u 2 n 2 n g l uh p o S u J K L M N O Z j k l m n o z c f Y s ' + 'c a r 2 3 u p 1 A A A A A A AE C E E E E I I I I D N O O O O O X O ' + 'U U U U Y p b a a a a a a ae c e e e e i i i i o n o o o o o o u u ' + 'u u y y C c C c D d E e G g G g I i I i I i l L l L l L n n O o O ' + 'o S s S s S s U u U u U u z Z z Z z f D d d q E e l h w N n O O o ' + 'P P P p R S s E l t T t T U u U U Y y Z z 3 3 3 3 2 5 5 5 p DZ Dz ' + 'dz Lj Lj lj NJ Nj nj A a I i O o U u U u U u U u U u e A a A a AE ' + 'ae G g G g K k Q q Q q 3 3 J dz dZ DZ g G h p N n A a AE ae O o I ' + 'i O o O o T t 3 3 H h O o O o O o A C c L T s Q q R r Y y e 3 3 3 ' + '3 j i I I I h w R r R R r r u v A M Y Y B G H j K L q ? c dz d3 dz ' + 'ts tf tc fn ls lz ww u u h h j r r r R W Y x Y 1 s x c h m r t v x ' + 'c c c I O Y O K A M N E O TT P E T Y O X Y O I Y a e n i v a b y d ' + 'e c n 0 1 k j u v c o tt p s o t u q X Y w i u o u w b e Y Y Y O w ' + 'x Q q C c F f N N W w q q h e S s X x 6 6 t t x e c j O E E p p C ' + 'M M p C C C Hb Th K N Y U K jI M H O TT b bI b E IO R K JI M H O N ' + 'b bI b e io r Hb h k n y u mY my Im Im 3 3 O o W w W W H H B b P p ' + 'K k K k K k K k H h H h Ih ih O o C c T t Y y Y y X x TI ti H h H ' + 'h H h E e E e I X x K k jt jt H h H h H h M m l A a A a AE ae E e ' + 'e e E e X X 3 3 3 3 N n N n O o O o O o E e Y y Y y Y y H h R r bI ' + 'bi F f X x X x H h G g T t Q q W w d r L Iu O y m o N U Y S d h l ' + 'lu d y w 2 n u y un _').split(' '); var map = {}; for (var index = 0, length = unicode.length; index < length; index += 1) { map[unicode[index]] = replacement[index]; }
  $.url.map = map;
})(this.jQuery, this);
this.jQuery.date = {
  METHODS: { "yyyy": "getUTCFullYear", "MM": "getUTCMonth", "dd": "getUTCDate", "HH": "getUTCHours", "mm": "getUTCMinutes", "ss": "getUTCSeconds", "fff": "getUTCMilliseconds" }, ISO8601: "yyyy-MM-ddTHH:mm:ss.fffZ", CKAN8601: "yyyy-MM-ddTHH:mm:ss", format: function(format, date) {
    var map = this.METHODS; date = date || new Date(); function pad(str, exp) { str = "" + str; exp = exp.replace(/[a-z]/ig, '0'); return str.length !== exp.length ? exp.slice(str.length) + str : str; }
    return format.replace(/([a-zA-Z])\1+/g, function(_, $1) {
      if (map[_]) {
        var value = date[map[_]](); if (_ === 'MM') { value += 1; }
        return pad(value, _);
      }
      return _;
    });
  }, toCKANString: function(date) { return this.format(this.CKAN8601, date); }, toISOString: function(date) { date = date || new Date(); if (date.toISOString) { return date.toISOString(); } else { return this.format(this.ISO8601, date); } }
};
(function($) {
  function onChange(event) { var value = this.value; var updated = $.url.slugify(value, true); if (value !== updated) { this.value = updated; $(this).trigger('slugify', [this.value, value]); } }
  function onKeypress(event) {
    if (!event.charCode) { return; }
    event.preventDefault(); var value = this.value; var start = this.selectionStart; var end = this.selectionEnd; var char = String.fromCharCode(event.charCode); var updated; var range; if (this.setSelectionRange) { updated = value.substring(0, start) + char + value.substring(end, value.length); this.value = $.url.slugify(updated, false); this.setSelectionRange(start + 1, start + 1); } else if (document.selection && document.selection.createRange) { range = document.selection.createRange(); range.text = char + range.text; }
    $(this).trigger('slugify', [this.value, value]);
  }
  $.fn.slug = function() { return this.each(function() { $(this).on({ 'blur.slug': onChange, 'change.slug': onChange, 'keypress.slug': onKeypress }); }); }; $.extend($.fn.slug, { onChange: onChange, onKeypress: onKeypress });
})(this.jQuery);
(function($, window) {
  var escape = $.url.escape; function slugPreview(options) {
    options = $.extend(true, slugPreview.defaults, options || {}); var collected = this.map(function() {
      var element = $(this); var field = element.find('input'); var preview = $(options.template); var value = preview.find('.slug-preview-value'); var required = $('<div>').append($('.control-required', element).clone()).html(); function setValue() { var val = escape(field.val()) || options.placeholder; value.text(val); }
      preview.find('strong').html(required + ' ' + options.i18n['URL'] + ':'); preview.find('.slug-preview-prefix').text(options.prefix); preview.find('button').text(options.i18n['Edit']).click(function(event) { event.preventDefault(); element.show(); preview.hide(); }); setValue(); field.on('change', setValue); element.after(preview).hide(); return preview[0];
    }); return this.pushStack(collected);
  }
  slugPreview.defaults = { prefix: '', placeholder: '', i18n: { 'URL': 'URL', 'Edit': 'Edit' }, template: ['<div class="slug-preview">', '<strong></strong>', '<span class="slug-preview-prefix"></span><span class="slug-preview-value"></span>', '<button class="btn btn-default btn-xs"></button>', '</div>'].join('\n') }; $.fn.slugPreview = slugPreview;
})(this.jQuery, this);
(function($) {
  var trailing_whitespace = true; $.fn.truncate = function(options) {
    var opts = $.extend({}, $.fn.truncate.defaults, options); var collected = this.map(function() {
      var content_length = $.trim(squeeze($(this).text())).length; if (content_length <= opts.max_length)
        return; var actual_max_length = opts.max_length - opts.more.length - opts.link_prefix.length - opts.link_suffix.length; var truncated_node = recursivelyTruncate(this, actual_max_length); var full_node = $(this).hide(); truncated_node.insertAfter(full_node); findNodeForMore(truncated_node).append(opts.ellipses + opts.link_prefix + '<a href="#more" class="' + opts.css_more_class + '">' + opts.more + '</a>' + opts.link_suffix); findNodeForLess(full_node).append(opts.link_prefix + '<a href="#less" class="' + opts.css_less_class + '">' + opts.less + '</a>' + opts.link_suffix); truncated_node.find('a:last').click(function(event) { event.preventDefault(); truncated_node.hide(); full_node.show(); truncated_node.trigger({ type: 'expand.truncate', relatedTarget: full_node[0] }); }); full_node.find('a:last').click(function(event) { event.preventDefault(); truncated_node.show(); full_node.hide(); truncated_node.trigger({ type: 'collapse.truncate', relatedTarget: full_node[0] }); }); return truncated_node[0];
    }); return this.pushStack(collected);
  }
  $.fn.truncate.defaults = { max_length: 100, more: 'more', less: 'less', ellipses: 'â€¦', css_more_class: 'truncator-link truncator-more', css_less_class: 'truncator-link truncator-less', link_prefix: ' (', link_suffix: ')' }; function recursivelyTruncate(node, max_length) { return (node.nodeType == 3) ? truncateText(node, max_length) : truncateNode(node, max_length); }
  function truncateNode(node, max_length) { var node = $(node); var new_node = node.clone().empty(); var truncatedChild; node.contents().each(function() { var remaining_length = max_length - new_node.text().length; if (remaining_length == 0) return; truncatedChild = recursivelyTruncate(this, remaining_length); if (truncatedChild) new_node.append(truncatedChild); }); return new_node; }
  function truncateText(node, max_length) {
    var text = squeeze(node.data); if (trailing_whitespace)
      text = text.replace(/^ /, ''); trailing_whitespace = !!text.match(/ $/); var text = text.slice(0, max_length); text = $('<div/>').text(text).html(); return text;
  }
  function squeeze(string) { return string.replace(/\s+/g, ' '); }
  function findNodeForMore(node) { var $node = $(node); var last_child = $node.children(":last"); if (!last_child) return node; var display = last_child.css('display'); if (!display || display == 'inline') return $node; return findNodeForMore(last_child); }; function findNodeForLess(node) { var $node = $(node); var last_child = $node.children(":last"); if (last_child && last_child.is('p')) return last_child; return node; };
})(jQuery);
(function(window, factory) { if (typeof define == 'function' && define.amd) { define('jquery-bridget/jquery-bridget', ['jquery'], function(jQuery) { return factory(window, jQuery); }); } else if (typeof module == 'object' && module.exports) { module.exports = factory(window, require('jquery')); } else { window.jQueryBridget = factory(window, window.jQuery); } }(window, function factory(window, jQuery) {
  'use strict'; var arraySlice = Array.prototype.slice; var console = window.console; var logError = typeof console == 'undefined' ? function() { } : function(message) { console.error(message); }; function jQueryBridget(namespace, PluginClass, $) {
    $ = $ || jQuery || window.jQuery; if (!$) { return; }
    if (!PluginClass.prototype.option) {
      PluginClass.prototype.option = function(opts) {
        if (!$.isPlainObject(opts)) { return; }
        this.options = $.extend(true, this.options, opts);
      };
    }
    $.fn[namespace] = function(arg0) {
      if (typeof arg0 == 'string') { var args = arraySlice.call(arguments, 1); return methodCall(this, arg0, args); }
      plainCall(this, arg0); return this;
    }; function methodCall($elems, methodName, args) {
      var returnValue; var pluginMethodStr = '$().' + namespace + '("' + methodName + '")'; $elems.each(function(i, elem) {
        var instance = $.data(elem, namespace); if (!instance) {
          logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
            pluginMethodStr); return;
        }
        var method = instance[methodName]; if (!method || methodName.charAt(0) == '_') { logError(pluginMethodStr + ' is not a valid method'); return; }
        var value = method.apply(instance, args); returnValue = returnValue === undefined ? value : returnValue;
      }); return returnValue !== undefined ? returnValue : $elems;
    }
    function plainCall($elems, options) { $elems.each(function(i, elem) { var instance = $.data(elem, namespace); if (instance) { instance.option(options); instance._init(); } else { instance = new PluginClass(elem, options); $.data(elem, namespace, instance); } }); }
    updateJQuery($);
  }
  function updateJQuery($) {
    if (!$ || ($ && $.bridget)) { return; }
    $.bridget = jQueryBridget;
  }
  updateJQuery(jQuery || window.jQuery); return jQueryBridget;
})); (function(global, factory) { if (typeof define == 'function' && define.amd) { define('ev-emitter/ev-emitter', factory); } else if (typeof module == 'object' && module.exports) { module.exports = factory(); } else { global.EvEmitter = factory(); } }(typeof window != 'undefined' ? window : this, function() {
  function EvEmitter() { }
  var proto = EvEmitter.prototype; proto.on = function(eventName, listener) {
    if (!eventName || !listener) { return; }
    var events = this._events = this._events || {}; var listeners = events[eventName] = events[eventName] || []; if (listeners.indexOf(listener) == -1) { listeners.push(listener); }
    return this;
  }; proto.once = function(eventName, listener) {
    if (!eventName || !listener) { return; }
    this.on(eventName, listener); var onceEvents = this._onceEvents = this._onceEvents || {}; var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {}; onceListeners[listener] = true; return this;
  }; proto.off = function(eventName, listener) {
    var listeners = this._events && this._events[eventName]; if (!listeners || !listeners.length) { return; }
    var index = listeners.indexOf(listener); if (index != -1) { listeners.splice(index, 1); }
    return this;
  }; proto.emitEvent = function(eventName, args) {
    var listeners = this._events && this._events[eventName]; if (!listeners || !listeners.length) { return; }
    listeners = listeners.slice(0); args = args || []; var onceListeners = this._onceEvents && this._onceEvents[eventName]; for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i]
      var isOnce = onceListeners && onceListeners[listener]; if (isOnce) { this.off(eventName, listener); delete onceListeners[listener]; }
      listener.apply(this, args);
    }
    return this;
  }; proto.allOff = function() { delete this._events; delete this._onceEvents; }; return EvEmitter;
})); (function(window, factory) { 'use strict'; if (typeof define == 'function' && define.amd) { define('get-size/get-size', [], function() { return factory(); }); } else if (typeof module == 'object' && module.exports) { module.exports = factory(); } else { window.getSize = factory(); } })(window, function factory() {
  'use strict'; function getStyleSize(value) { var num = parseFloat(value); var isValid = value.indexOf('%') == -1 && !isNaN(num); return isValid && num; }
  function noop() { }
  var logError = typeof console == 'undefined' ? noop : function(message) { console.error(message); }; var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth']; var measurementsLength = measurements.length; function getZeroSize() {
    var size = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }; for (var i = 0; i < measurementsLength; i++) { var measurement = measurements[i]; size[measurement] = 0; }
    return size;
  }
  function getStyle(elem) {
    var style = getComputedStyle(elem); if (!style) { logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See http://bit.ly/getsizebug1'); }
    return style;
  }
  var isSetup = false; var isBoxSizeOuter; function setup() {
    if (isSetup) { return; }
    isSetup = true; var div = document.createElement('div'); div.style.width = '200px'; div.style.padding = '1px 2px 3px 4px'; div.style.borderStyle = 'solid'; div.style.borderWidth = '1px 2px 3px 4px'; div.style.boxSizing = 'border-box'; var body = document.body || document.documentElement; body.appendChild(div); var style = getStyle(div); getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200; body.removeChild(div);
  }
  function getSize(elem) {
    setup(); if (typeof elem == 'string') { elem = document.querySelector(elem); }
    if (!elem || typeof elem != 'object' || !elem.nodeType) { return; }
    var style = getStyle(elem); if (style.display == 'none') { return getZeroSize(); }
    var size = {}; size.width = elem.offsetWidth; size.height = elem.offsetHeight; var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box'; for (var i = 0; i < measurementsLength; i++) { var measurement = measurements[i]; var value = style[measurement]; var num = parseFloat(value); size[measurement] = !isNaN(num) ? num : 0; }
    var paddingWidth = size.paddingLeft + size.paddingRight; var paddingHeight = size.paddingTop + size.paddingBottom; var marginWidth = size.marginLeft + size.marginRight; var marginHeight = size.marginTop + size.marginBottom; var borderWidth = size.borderLeftWidth + size.borderRightWidth; var borderHeight = size.borderTopWidth + size.borderBottomWidth; var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter; var styleWidth = getStyleSize(style.width); if (styleWidth !== false) {
      size.width = styleWidth +
        (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }
    var styleHeight = getStyleSize(style.height); if (styleHeight !== false) {
      size.height = styleHeight +
        (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }
    size.innerWidth = size.width - (paddingWidth + borderWidth); size.innerHeight = size.height - (paddingHeight + borderHeight); size.outerWidth = size.width + marginWidth; size.outerHeight = size.height + marginHeight; return size;
  }
  return getSize;
}); (function(window, factory) { 'use strict'; if (typeof define == 'function' && define.amd) { define('desandro-matches-selector/matches-selector', factory); } else if (typeof module == 'object' && module.exports) { module.exports = factory(); } else { window.matchesSelector = factory(); } }(window, function factory() {
  'use strict'; var matchesMethod = (function() {
    var ElemProto = window.Element.prototype; if (ElemProto.matches) { return 'matches'; }
    if (ElemProto.matchesSelector) { return 'matchesSelector'; }
    var prefixes = ['webkit', 'moz', 'ms', 'o']; for (var i = 0; i < prefixes.length; i++) { var prefix = prefixes[i]; var method = prefix + 'MatchesSelector'; if (ElemProto[method]) { return method; } }
  })(); return function matchesSelector(elem, selector) { return elem[matchesMethod](selector); };
})); (function(window, factory) { if (typeof define == 'function' && define.amd) { define('fizzy-ui-utils/utils', ['desandro-matches-selector/matches-selector'], function(matchesSelector) { return factory(window, matchesSelector); }); } else if (typeof module == 'object' && module.exports) { module.exports = factory(window, require('desandro-matches-selector')); } else { window.fizzyUIUtils = factory(window, window.matchesSelector); } }(window, function factory(window, matchesSelector) {
  var utils = {}; utils.extend = function(a, b) {
    for (var prop in b) { a[prop] = b[prop]; }
    return a;
  }; utils.modulo = function(num, div) { return ((num % div) + div) % div; }; utils.makeArray = function(obj) {
    var ary = []; if (Array.isArray(obj)) { ary = obj; } else if (obj && typeof obj == 'object' && typeof obj.length == 'number') { for (var i = 0; i < obj.length; i++) { ary.push(obj[i]); } } else { ary.push(obj); }
    return ary;
  }; utils.removeFrom = function(ary, obj) { var index = ary.indexOf(obj); if (index != -1) { ary.splice(index, 1); } }; utils.getParent = function(elem, selector) { while (elem.parentNode && elem != document.body) { elem = elem.parentNode; if (matchesSelector(elem, selector)) { return elem; } } }; utils.getQueryElement = function(elem) {
    if (typeof elem == 'string') { return document.querySelector(elem); }
    return elem;
  }; utils.handleEvent = function(event) { var method = 'on' + event.type; if (this[method]) { this[method](event); } }; utils.filterFindElements = function(elems, selector) {
    elems = utils.makeArray(elems); var ffElems = []; elems.forEach(function(elem) {
      if (!(elem instanceof HTMLElement)) { return; }
      if (!selector) { ffElems.push(elem); return; }
      if (matchesSelector(elem, selector)) { ffElems.push(elem); }
      var childElems = elem.querySelectorAll(selector); for (var i = 0; i < childElems.length; i++) { ffElems.push(childElems[i]); }
    }); return ffElems;
  }; utils.debounceMethod = function(_class, methodName, threshold) {
    var method = _class.prototype[methodName]; var timeoutName = methodName + 'Timeout'; _class.prototype[methodName] = function() {
      var timeout = this[timeoutName]; if (timeout) { clearTimeout(timeout); }
      var args = arguments; var _this = this; this[timeoutName] = setTimeout(function() { method.apply(_this, args); delete _this[timeoutName]; }, threshold || 100);
    };
  }; utils.docReady = function(callback) { var readyState = document.readyState; if (readyState == 'complete' || readyState == 'interactive') { setTimeout(callback); } else { document.addEventListener('DOMContentLoaded', callback); } }; utils.toDashed = function(str) { return str.replace(/(.)([A-Z])/g, function(match, $1, $2) { return $1 + '-' + $2; }).toLowerCase(); }; var console = window.console; utils.htmlInit = function(WidgetClass, namespace) {
    utils.docReady(function() {
      var dashedNamespace = utils.toDashed(namespace); var dataAttr = 'data-' + dashedNamespace; var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']'); var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace); var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems)); var dataOptionsAttr = dataAttr + '-options'; var jQuery = window.jQuery; elems.forEach(function(elem) {
        var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr); var options; try { options = attr && JSON.parse(attr); } catch (error) {
          if (console) { console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error); }
          return;
        }
        var instance = new WidgetClass(elem, options); if (jQuery) { jQuery.data(elem, namespace, instance); }
      });
    });
  }; return utils;
})); (function(window, factory) { if (typeof define == 'function' && define.amd) { define('outlayer/item', ['ev-emitter/ev-emitter', 'get-size/get-size'], factory); } else if (typeof module == 'object' && module.exports) { module.exports = factory(require('ev-emitter'), require('get-size')); } else { window.Outlayer = {}; window.Outlayer.Item = factory(window.EvEmitter, window.getSize); } }(window, function factory(EvEmitter, getSize) {
  'use strict'; function isEmptyObj(obj) {
    for (var prop in obj) { return false; }
    prop = null; return true;
  }
  var docElemStyle = document.documentElement.style; var transitionProperty = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition'; var transformProperty = typeof docElemStyle.transform == 'string' ? 'transform' : 'WebkitTransform'; var transitionEndEvent = { WebkitTransition: 'webkitTransitionEnd', transition: 'transitionend' }[transitionProperty]; var vendorProperties = { transform: transformProperty, transition: transitionProperty, transitionDuration: transitionProperty + 'Duration', transitionProperty: transitionProperty + 'Property', transitionDelay: transitionProperty + 'Delay' }; function Item(element, layout) {
    if (!element) { return; }
    this.element = element; this.layout = layout; this.position = { x: 0, y: 0 }; this._create();
  }
  var proto = Item.prototype = Object.create(EvEmitter.prototype); proto.constructor = Item; proto._create = function() { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }; this.css({ position: 'absolute' }); }; proto.handleEvent = function(event) { var method = 'on' + event.type; if (this[method]) { this[method](event); } }; proto.getSize = function() { this.size = getSize(this.element); }; proto.css = function(style) { var elemStyle = this.element.style; for (var prop in style) { var supportedProp = vendorProperties[prop] || prop; elemStyle[supportedProp] = style[prop]; } }; proto.getPosition = function() { var style = getComputedStyle(this.element); var isOriginLeft = this.layout._getOption('originLeft'); var isOriginTop = this.layout._getOption('originTop'); var xValue = style[isOriginLeft ? 'left' : 'right']; var yValue = style[isOriginTop ? 'top' : 'bottom']; var layoutSize = this.layout.size; var x = xValue.indexOf('%') != -1 ? (parseFloat(xValue) / 100) * layoutSize.width : parseInt(xValue, 10); var y = yValue.indexOf('%') != -1 ? (parseFloat(yValue) / 100) * layoutSize.height : parseInt(yValue, 10); x = isNaN(x) ? 0 : x; y = isNaN(y) ? 0 : y; x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight; y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom; this.position.x = x; this.position.y = y; }; proto.layoutPosition = function() { var layoutSize = this.layout.size; var style = {}; var isOriginLeft = this.layout._getOption('originLeft'); var isOriginTop = this.layout._getOption('originTop'); var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight'; var xProperty = isOriginLeft ? 'left' : 'right'; var xResetProperty = isOriginLeft ? 'right' : 'left'; var x = this.position.x + layoutSize[xPadding]; style[xProperty] = this.getXValue(x); style[xResetProperty] = ''; var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom'; var yProperty = isOriginTop ? 'top' : 'bottom'; var yResetProperty = isOriginTop ? 'bottom' : 'top'; var y = this.position.y + layoutSize[yPadding]; style[yProperty] = this.getYValue(y); style[yResetProperty] = ''; this.css(style); this.emitEvent('layout', [this]); }; proto.getXValue = function(x) { var isHorizontal = this.layout._getOption('horizontal'); return this.layout.options.percentPosition && !isHorizontal ? ((x / this.layout.size.width) * 100) + '%' : x + 'px'; }; proto.getYValue = function(y) { var isHorizontal = this.layout._getOption('horizontal'); return this.layout.options.percentPosition && isHorizontal ? ((y / this.layout.size.height) * 100) + '%' : y + 'px'; }; proto._transitionTo = function(x, y) {
    this.getPosition(); var curX = this.position.x; var curY = this.position.y; var compareX = parseInt(x, 10); var compareY = parseInt(y, 10); var didNotMove = compareX === this.position.x && compareY === this.position.y; this.setPosition(x, y); if (didNotMove && !this.isTransitioning) { this.layoutPosition(); return; }
    var transX = x - curX; var transY = y - curY; var transitionStyle = {}; transitionStyle.transform = this.getTranslate(transX, transY); this.transition({ to: transitionStyle, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: true });
  }; proto.getTranslate = function(x, y) { var isOriginLeft = this.layout._getOption('originLeft'); var isOriginTop = this.layout._getOption('originTop'); x = isOriginLeft ? x : -x; y = isOriginTop ? y : -y; return 'translate3d(' + x + 'px, ' + y + 'px, 0)'; }; proto.goTo = function(x, y) { this.setPosition(x, y); this.layoutPosition(); }; proto.moveTo = proto._transitionTo; proto.setPosition = function(x, y) { this.position.x = parseInt(x, 10); this.position.y = parseInt(y, 10); }; proto._nonTransition = function(args) {
    this.css(args.to); if (args.isCleaning) { this._removeStyles(args.to); }
    for (var prop in args.onTransitionEnd) { args.onTransitionEnd[prop].call(this); }
  }; proto.transition = function(args) {
    if (!parseFloat(this.layout.options.transitionDuration)) { this._nonTransition(args); return; }
    var _transition = this._transn; for (var prop in args.onTransitionEnd) { _transition.onEnd[prop] = args.onTransitionEnd[prop]; }
    for (prop in args.to) { _transition.ingProperties[prop] = true; if (args.isCleaning) { _transition.clean[prop] = true; } }
    if (args.from) { this.css(args.from); var h = this.element.offsetHeight; h = null; }
    this.enableTransition(args.to); this.css(args.to); this.isTransitioning = true;
  }; function toDashedAll(str) { return str.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); }); }
  var transitionProps = 'opacity,' + toDashedAll(transformProperty); proto.enableTransition = function() {
    if (this.isTransitioning) { return; }
    var duration = this.layout.options.transitionDuration; duration = typeof duration == 'number' ? duration + 'ms' : duration; this.css({ transitionProperty: transitionProps, transitionDuration: duration, transitionDelay: this.staggerDelay || 0 }); this.element.addEventListener(transitionEndEvent, this, false);
  }; proto.onwebkitTransitionEnd = function(event) { this.ontransitionend(event); }; proto.onotransitionend = function(event) { this.ontransitionend(event); }; var dashedVendorProperties = { '-webkit-transform': 'transform' }; proto.ontransitionend = function(event) {
    if (event.target !== this.element) { return; }
    var _transition = this._transn; var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName; delete _transition.ingProperties[propertyName]; if (isEmptyObj(_transition.ingProperties)) { this.disableTransition(); }
    if (propertyName in _transition.clean) { this.element.style[event.propertyName] = ''; delete _transition.clean[propertyName]; }
    if (propertyName in _transition.onEnd) { var onTransitionEnd = _transition.onEnd[propertyName]; onTransitionEnd.call(this); delete _transition.onEnd[propertyName]; }
    this.emitEvent('transitionEnd', [this]);
  }; proto.disableTransition = function() { this.removeTransitionStyles(); this.element.removeEventListener(transitionEndEvent, this, false); this.isTransitioning = false; }; proto._removeStyles = function(style) {
    var cleanStyle = {}; for (var prop in style) { cleanStyle[prop] = ''; }
    this.css(cleanStyle);
  }; var cleanTransitionStyle = { transitionProperty: '', transitionDuration: '', transitionDelay: '' }; proto.removeTransitionStyles = function() { this.css(cleanTransitionStyle); }; proto.stagger = function(delay) { delay = isNaN(delay) ? 0 : delay; this.staggerDelay = delay + 'ms'; }; proto.removeElem = function() { this.element.parentNode.removeChild(this.element); this.css({ display: '' }); this.emitEvent('remove', [this]); }; proto.remove = function() {
    if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) { this.removeElem(); return; }
    this.once('transitionEnd', function() { this.removeElem(); }); this.hide();
  }; proto.reveal = function() { delete this.isHidden; this.css({ display: '' }); var options = this.layout.options; var onTransitionEnd = {}; var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle'); onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd; this.transition({ from: options.hiddenStyle, to: options.visibleStyle, isCleaning: true, onTransitionEnd: onTransitionEnd }); }; proto.onRevealTransitionEnd = function() { if (!this.isHidden) { this.emitEvent('reveal'); } }; proto.getHideRevealTransitionEndProperty = function(styleProperty) {
    var optionStyle = this.layout.options[styleProperty]; if (optionStyle.opacity) { return 'opacity'; }
    for (var prop in optionStyle) { return prop; }
  }; proto.hide = function() { this.isHidden = true; this.css({ display: '' }); var options = this.layout.options; var onTransitionEnd = {}; var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle'); onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd; this.transition({ from: options.visibleStyle, to: options.hiddenStyle, isCleaning: true, onTransitionEnd: onTransitionEnd }); }; proto.onHideTransitionEnd = function() { if (this.isHidden) { this.css({ display: 'none' }); this.emitEvent('hide'); } }; proto.destroy = function() { this.css({ position: '', left: '', right: '', top: '', bottom: '', transition: '', transform: '' }); }; return Item;
})); (function(window, factory) { 'use strict'; if (typeof define == 'function' && define.amd) { define('outlayer/outlayer', ['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'], function(EvEmitter, getSize, utils, Item) { return factory(window, EvEmitter, getSize, utils, Item); }); } else if (typeof module == 'object' && module.exports) { module.exports = factory(window, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item')); } else { window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item); } }(window, function factory(window, EvEmitter, getSize, utils, Item) {
  'use strict'; var console = window.console; var jQuery = window.jQuery; var noop = function() { }; var GUID = 0; var instances = {}; function Outlayer(element, options) {
    var queryElement = utils.getQueryElement(element); if (!queryElement) {
      if (console) { console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element)); }
      return;
    }
    this.element = queryElement; if (jQuery) { this.$element = jQuery(this.element); }
    this.options = utils.extend({}, this.constructor.defaults); this.option(options); var id = ++GUID; this.element.outlayerGUID = id; instances[id] = this; this._create(); var isInitLayout = this._getOption('initLayout'); if (isInitLayout) { this.layout(); }
  }
  Outlayer.namespace = 'outlayer'; Outlayer.Item = Item; Outlayer.defaults = { containerStyle: { position: 'relative' }, initLayout: true, originLeft: true, originTop: true, resize: true, resizeContainer: true, transitionDuration: '0.4s', hiddenStyle: { opacity: 0, transform: 'scale(0.001)' }, visibleStyle: { opacity: 1, transform: 'scale(1)' } }; var proto = Outlayer.prototype; utils.extend(proto, EvEmitter.prototype); proto.option = function(opts) { utils.extend(this.options, opts); }; proto._getOption = function(option) { var oldOption = this.constructor.compatOptions[option]; return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option]; }; Outlayer.compatOptions = { initLayout: 'isInitLayout', horizontal: 'isHorizontal', layoutInstant: 'isLayoutInstant', originLeft: 'isOriginLeft', originTop: 'isOriginTop', resize: 'isResizeBound', resizeContainer: 'isResizingContainer' }; proto._create = function() { this.reloadItems(); this.stamps = []; this.stamp(this.options.stamp); utils.extend(this.element.style, this.options.containerStyle); var canBindResize = this._getOption('resize'); if (canBindResize) { this.bindResize(); } }; proto.reloadItems = function() { this.items = this._itemize(this.element.children); }; proto._itemize = function(elems) {
    var itemElems = this._filterFindItemElements(elems); var Item = this.constructor.Item; var items = []; for (var i = 0; i < itemElems.length; i++) { var elem = itemElems[i]; var item = new Item(elem, this); items.push(item); }
    return items;
  }; proto._filterFindItemElements = function(elems) { return utils.filterFindElements(elems, this.options.itemSelector); }; proto.getItemElements = function() { return this.items.map(function(item) { return item.element; }); }; proto.layout = function() { this._resetLayout(); this._manageStamps(); var layoutInstant = this._getOption('layoutInstant'); var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited; this.layoutItems(this.items, isInstant); this._isLayoutInited = true; }; proto._init = proto.layout; proto._resetLayout = function() { this.getSize(); }; proto.getSize = function() { this.size = getSize(this.element); }; proto._getMeasurement = function(measurement, size) {
    var option = this.options[measurement]; var elem; if (!option) { this[measurement] = 0; } else {
      if (typeof option == 'string') { elem = this.element.querySelector(option); } else if (option instanceof HTMLElement) { elem = option; }
      this[measurement] = elem ? getSize(elem)[size] : option;
    }
  }; proto.layoutItems = function(items, isInstant) { items = this._getItemsForLayout(items); this._layoutItems(items, isInstant); this._postLayout(); }; proto._getItemsForLayout = function(items) { return items.filter(function(item) { return !item.isIgnored; }); }; proto._layoutItems = function(items, isInstant) {
    this._emitCompleteOnItems('layout', items); if (!items || !items.length) { return; }
    var queue = []; items.forEach(function(item) { var position = this._getItemLayoutPosition(item); position.item = item; position.isInstant = isInstant || item.isLayoutInstant; queue.push(position); }, this); this._processLayoutQueue(queue);
  }; proto._getItemLayoutPosition = function() { return { x: 0, y: 0 }; }; proto._processLayoutQueue = function(queue) { this.updateStagger(); queue.forEach(function(obj, i) { this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i); }, this); }; proto.updateStagger = function() {
    var stagger = this.options.stagger; if (stagger === null || stagger === undefined) { this.stagger = 0; return; }
    this.stagger = getMilliseconds(stagger); return this.stagger;
  }; proto._positionItem = function(item, x, y, isInstant, i) { if (isInstant) { item.goTo(x, y); } else { item.stagger(i * this.stagger); item.moveTo(x, y); } }; proto._postLayout = function() { this.resizeContainer(); }; proto.resizeContainer = function() {
    var isResizingContainer = this._getOption('resizeContainer'); if (!isResizingContainer) { return; }
    var size = this._getContainerSize(); if (size) { this._setContainerMeasure(size.width, true); this._setContainerMeasure(size.height, false); }
  }; proto._getContainerSize = noop; proto._setContainerMeasure = function(measure, isWidth) {
    if (measure === undefined) { return; }
    var elemSize = this.size; if (elemSize.isBorderBox) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
        elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop +
        elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }
    measure = Math.max(measure, 0); this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
  }; proto._emitCompleteOnItems = function(eventName, items) {
    var _this = this; function onComplete() { _this.dispatchEvent(eventName + 'Complete', null, [items]); }
    var count = items.length; if (!items || !count) { onComplete(); return; }
    var doneCount = 0; function tick() { doneCount++; if (doneCount == count) { onComplete(); } }
    items.forEach(function(item) { item.once(eventName, tick); });
  }; proto.dispatchEvent = function(type, event, args) { var emitArgs = event ? [event].concat(args) : args; this.emitEvent(type, emitArgs); if (jQuery) { this.$element = this.$element || jQuery(this.element); if (event) { var $event = jQuery.Event(event); $event.type = type; this.$element.trigger($event, args); } else { this.$element.trigger(type, args); } } }; proto.ignore = function(elem) { var item = this.getItem(elem); if (item) { item.isIgnored = true; } }; proto.unignore = function(elem) { var item = this.getItem(elem); if (item) { delete item.isIgnored; } }; proto.stamp = function(elems) {
    elems = this._find(elems); if (!elems) { return; }
    this.stamps = this.stamps.concat(elems); elems.forEach(this.ignore, this);
  }; proto.unstamp = function(elems) {
    elems = this._find(elems); if (!elems) { return; }
    elems.forEach(function(elem) { utils.removeFrom(this.stamps, elem); this.unignore(elem); }, this);
  }; proto._find = function(elems) {
    if (!elems) { return; }
    if (typeof elems == 'string') { elems = this.element.querySelectorAll(elems); }
    elems = utils.makeArray(elems); return elems;
  }; proto._manageStamps = function() {
    if (!this.stamps || !this.stamps.length) { return; }
    this._getBoundingRect(); this.stamps.forEach(this._manageStamp, this);
  }; proto._getBoundingRect = function() { var boundingRect = this.element.getBoundingClientRect(); var size = this.size; this._boundingRect = { left: boundingRect.left + size.paddingLeft + size.borderLeftWidth, top: boundingRect.top + size.paddingTop + size.borderTopWidth, right: boundingRect.right - (size.paddingRight + size.borderRightWidth), bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth) }; }; proto._manageStamp = noop; proto._getElementOffset = function(elem) { var boundingRect = elem.getBoundingClientRect(); var thisRect = this._boundingRect; var size = getSize(elem); var offset = { left: boundingRect.left - thisRect.left - size.marginLeft, top: boundingRect.top - thisRect.top - size.marginTop, right: thisRect.right - boundingRect.right - size.marginRight, bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom }; return offset; }; proto.handleEvent = utils.handleEvent; proto.bindResize = function() { window.addEventListener('resize', this); this.isResizeBound = true; }; proto.unbindResize = function() { window.removeEventListener('resize', this); this.isResizeBound = false; }; proto.onresize = function() { this.resize(); }; utils.debounceMethod(Outlayer, 'onresize', 100); proto.resize = function() {
    if (!this.isResizeBound || !this.needsResizeLayout()) { return; }
    this.layout();
  }; proto.needsResizeLayout = function() { var size = getSize(this.element); var hasSizes = this.size && size; return hasSizes && size.innerWidth !== this.size.innerWidth; }; proto.addItems = function(elems) {
    var items = this._itemize(elems); if (items.length) { this.items = this.items.concat(items); }
    return items;
  }; proto.appended = function(elems) {
    var items = this.addItems(elems); if (!items.length) { return; }
    this.layoutItems(items, true); this.reveal(items);
  }; proto.prepended = function(elems) {
    var items = this._itemize(elems); if (!items.length) { return; }
    var previousItems = this.items.slice(0); this.items = items.concat(previousItems); this._resetLayout(); this._manageStamps(); this.layoutItems(items, true); this.reveal(items); this.layoutItems(previousItems);
  }; proto.reveal = function(items) {
    this._emitCompleteOnItems('reveal', items); if (!items || !items.length) { return; }
    var stagger = this.updateStagger(); items.forEach(function(item, i) { item.stagger(i * stagger); item.reveal(); });
  }; proto.hide = function(items) {
    this._emitCompleteOnItems('hide', items); if (!items || !items.length) { return; }
    var stagger = this.updateStagger(); items.forEach(function(item, i) { item.stagger(i * stagger); item.hide(); });
  }; proto.revealItemElements = function(elems) { var items = this.getItems(elems); this.reveal(items); }; proto.hideItemElements = function(elems) { var items = this.getItems(elems); this.hide(items); }; proto.getItem = function(elem) { for (var i = 0; i < this.items.length; i++) { var item = this.items[i]; if (item.element == elem) { return item; } } }; proto.getItems = function(elems) { elems = utils.makeArray(elems); var items = []; elems.forEach(function(elem) { var item = this.getItem(elem); if (item) { items.push(item); } }, this); return items; }; proto.remove = function(elems) {
    var removeItems = this.getItems(elems); this._emitCompleteOnItems('remove', removeItems); if (!removeItems || !removeItems.length) { return; }
    removeItems.forEach(function(item) { item.remove(); utils.removeFrom(this.items, item); }, this);
  }; proto.destroy = function() { var style = this.element.style; style.height = ''; style.position = ''; style.width = ''; this.items.forEach(function(item) { item.destroy(); }); this.unbindResize(); var id = this.element.outlayerGUID; delete instances[id]; delete this.element.outlayerGUID; if (jQuery) { jQuery.removeData(this.element, this.constructor.namespace); } }; Outlayer.data = function(elem) { elem = utils.getQueryElement(elem); var id = elem && elem.outlayerGUID; return id && instances[id]; }; Outlayer.create = function(namespace, options) {
    var Layout = subclass(Outlayer); Layout.defaults = utils.extend({}, Outlayer.defaults); utils.extend(Layout.defaults, options); Layout.compatOptions = utils.extend({}, Outlayer.compatOptions); Layout.namespace = namespace; Layout.data = Outlayer.data; Layout.Item = subclass(Item); utils.htmlInit(Layout, namespace); if (jQuery && jQuery.bridget) { jQuery.bridget(namespace, Layout); }
    return Layout;
  }; function subclass(Parent) {
    function SubClass() { Parent.apply(this, arguments); }
    SubClass.prototype = Object.create(Parent.prototype); SubClass.prototype.constructor = SubClass; return SubClass;
  }
  var msUnits = { ms: 1, s: 1000 }; function getMilliseconds(time) {
    if (typeof time == 'number') { return time; }
    var matches = time.match(/(^\d*\.?\d*)(\w*)/); var num = matches && matches[1]; var unit = matches && matches[2]; if (!num.length) { return 0; }
    num = parseFloat(num); var mult = msUnits[unit] || 1; return num * mult;
  }
  Outlayer.Item = Item; return Outlayer;
})); (function(window, factory) { if (typeof define == 'function' && define.amd) { define(['outlayer/outlayer', 'get-size/get-size'], factory); } else if (typeof module == 'object' && module.exports) { module.exports = factory(require('outlayer'), require('get-size')); } else { window.Masonry = factory(window.Outlayer, window.getSize); } }(window, function factory(Outlayer, getSize) {
  var Masonry = Outlayer.create('masonry'); Masonry.compatOptions.fitWidth = 'isFitWidth'; var proto = Masonry.prototype; proto._resetLayout = function() {
    this.getSize(); this._getMeasurement('columnWidth', 'outerWidth'); this._getMeasurement('gutter', 'outerWidth'); this.measureColumns(); this.colYs = []; for (var i = 0; i < this.cols; i++) { this.colYs.push(0); }
    this.maxY = 0; this.horizontalColIndex = 0;
  }; proto.measureColumns = function() {
    this.getContainerWidth(); if (!this.columnWidth) { var firstItem = this.items[0]; var firstItemElem = firstItem && firstItem.element; this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth; }
    var columnWidth = this.columnWidth += this.gutter; var containerWidth = this.containerWidth + this.gutter; var cols = containerWidth / columnWidth; var excess = columnWidth - containerWidth % columnWidth; var mathMethod = excess && excess < 1 ? 'round' : 'floor'; cols = Math[mathMethod](cols); this.cols = Math.max(cols, 1);
  }; proto.getContainerWidth = function() { var isFitWidth = this._getOption('fitWidth'); var container = isFitWidth ? this.element.parentNode : this.element; var size = getSize(container); this.containerWidth = size && size.innerWidth; }; proto._getItemLayoutPosition = function(item) {
    item.getSize(); var remainder = item.size.outerWidth % this.columnWidth; var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil'; var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth); colSpan = Math.min(colSpan, this.cols); var colPosMethod = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition'; var colPosition = this[colPosMethod](colSpan, item); var position = { x: this.columnWidth * colPosition.col, y: colPosition.y }; var setHeight = colPosition.y + item.size.outerHeight; var setMax = colSpan + colPosition.col; for (var i = colPosition.col; i < setMax; i++) { this.colYs[i] = setHeight; }
    return position;
  }; proto._getTopColPosition = function(colSpan) { var colGroup = this._getTopColGroup(colSpan); var minimumY = Math.min.apply(Math, colGroup); return { col: colGroup.indexOf(minimumY), y: minimumY, }; }; proto._getTopColGroup = function(colSpan) {
    if (colSpan < 2) { return this.colYs; }
    var colGroup = []; var groupCount = this.cols + 1 - colSpan; for (var i = 0; i < groupCount; i++) { colGroup[i] = this._getColGroupY(i, colSpan); }
    return colGroup;
  }; proto._getColGroupY = function(col, colSpan) {
    if (colSpan < 2) { return this.colYs[col]; }
    var groupColYs = this.colYs.slice(col, col + colSpan); return Math.max.apply(Math, groupColYs);
  }; proto._getHorizontalColPosition = function(colSpan, item) { var col = this.horizontalColIndex % this.cols; var isOver = colSpan > 1 && col + colSpan > this.cols; col = isOver ? 0 : col; var hasSize = item.size.outerWidth && item.size.outerHeight; this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex; return { col: col, y: this._getColGroupY(col, colSpan), }; }; proto._manageStamp = function(stamp) {
    var stampSize = getSize(stamp); var offset = this._getElementOffset(stamp); var isOriginLeft = this._getOption('originLeft'); var firstX = isOriginLeft ? offset.left : offset.right; var lastX = firstX + stampSize.outerWidth; var firstCol = Math.floor(firstX / this.columnWidth); firstCol = Math.max(0, firstCol); var lastCol = Math.floor(lastX / this.columnWidth); lastCol -= lastX % this.columnWidth ? 0 : 1; lastCol = Math.min(this.cols - 1, lastCol); var isOriginTop = this._getOption('originTop'); var stampMaxY = (isOriginTop ? offset.top : offset.bottom) +
      stampSize.outerHeight; for (var i = firstCol; i <= lastCol; i++) { this.colYs[i] = Math.max(stampMaxY, this.colYs[i]); }
  }; proto._getContainerSize = function() {
    this.maxY = Math.max.apply(Math, this.colYs); var size = { height: this.maxY }; if (this._getOption('fitWidth')) { size.width = this._getContainerFitWidth(); }
    return size;
  }; proto._getContainerFitWidth = function() {
    var unusedCols = 0; var i = this.cols; while (--i) {
      if (this.colYs[i] !== 0) { break; }
      unusedCols++;
    }
    return (this.cols - unusedCols) * this.columnWidth - this.gutter;
  }; proto.needsResizeLayout = function() { var previousWidth = this.containerWidth; this.getContainerWidth(); return previousWidth != this.containerWidth; }; return Masonry;
}));
(function(jQuery) {
  jQuery.fn.incompleteFormWarning = function(message) {
    return this.each(function() {
      var form = jQuery(this); var state = form.serialize(); function onWindowUnload(event) {
        if (event.originalEvent.returnValue) { event.originalEvent.returnValue = message; }
        return message;
      }
      form.on({ change: function() { var method = form.serialize() === state ? 'off' : 'on'; jQuery(window)[method]('beforeunload', onWindowUnload); }, submit: function() { jQuery(window).off('beforeunload', onWindowUnload); } });
    });
  };
})(this.jQuery);
(function(global, factory) { if (typeof define == 'function' && define.amd) { define('ev-emitter/ev-emitter', factory); } else if (typeof module == 'object' && module.exports) { module.exports = factory(); } else { global.EvEmitter = factory(); } }(typeof window != 'undefined' ? window : this, function() {
  function EvEmitter() { }
  var proto = EvEmitter.prototype; proto.on = function(eventName, listener) {
    if (!eventName || !listener) { return; }
    var events = this._events = this._events || {}; var listeners = events[eventName] = events[eventName] || []; if (listeners.indexOf(listener) == -1) { listeners.push(listener); }
    return this;
  }; proto.once = function(eventName, listener) {
    if (!eventName || !listener) { return; }
    this.on(eventName, listener); var onceEvents = this._onceEvents = this._onceEvents || {}; var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {}; onceListeners[listener] = true; return this;
  }; proto.off = function(eventName, listener) {
    var listeners = this._events && this._events[eventName]; if (!listeners || !listeners.length) { return; }
    var index = listeners.indexOf(listener); if (index != -1) { listeners.splice(index, 1); }
    return this;
  }; proto.emitEvent = function(eventName, args) {
    var listeners = this._events && this._events[eventName]; if (!listeners || !listeners.length) { return; }
    listeners = listeners.slice(0); args = args || []; var onceListeners = this._onceEvents && this._onceEvents[eventName]; for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i]
      var isOnce = onceListeners && onceListeners[listener]; if (isOnce) { this.off(eventName, listener); delete onceListeners[listener]; }
      listener.apply(this, args);
    }
    return this;
  }; proto.allOff = function() { delete this._events; delete this._onceEvents; }; return EvEmitter;
})); (function(window, factory) { 'use strict'; if (typeof define == 'function' && define.amd) { define(['ev-emitter/ev-emitter'], function(EvEmitter) { return factory(window, EvEmitter); }); } else if (typeof module == 'object' && module.exports) { module.exports = factory(window, require('ev-emitter')); } else { window.imagesLoaded = factory(window, window.EvEmitter); } })(typeof window !== 'undefined' ? window : this, function factory(window, EvEmitter) {
  var $ = window.jQuery; var console = window.console; function extend(a, b) {
    for (var prop in b) { a[prop] = b[prop]; }
    return a;
  }
  var arraySlice = Array.prototype.slice; function makeArray(obj) {
    if (Array.isArray(obj)) { return obj; }
    var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number'; if (isArrayLike) { return arraySlice.call(obj); }
    return [obj];
  }
  function ImagesLoaded(elem, options, onAlways) {
    if (!(this instanceof ImagesLoaded)) { return new ImagesLoaded(elem, options, onAlways); }
    var queryElem = elem; if (typeof elem == 'string') { queryElem = document.querySelectorAll(elem); }
    if (!queryElem) { console.error('Bad element for imagesLoaded ' + (queryElem || elem)); return; }
    this.elements = makeArray(queryElem); this.options = extend({}, this.options); if (typeof options == 'function') { onAlways = options; } else { extend(this.options, options); }
    if (onAlways) { this.on('always', onAlways); }
    this.getImages(); if ($) { this.jqDeferred = new $.Deferred(); }
    setTimeout(this.check.bind(this));
  }
  ImagesLoaded.prototype = Object.create(EvEmitter.prototype); ImagesLoaded.prototype.options = {}; ImagesLoaded.prototype.getImages = function() { this.images = []; this.elements.forEach(this.addElementImages, this); }; ImagesLoaded.prototype.addElementImages = function(elem) {
    if (elem.nodeName == 'IMG') { this.addImage(elem); }
    if (this.options.background === true) { this.addElementBackgroundImages(elem); }
    var nodeType = elem.nodeType; if (!nodeType || !elementNodeTypes[nodeType]) { return; }
    var childImgs = elem.querySelectorAll('img'); for (var i = 0; i < childImgs.length; i++) { var img = childImgs[i]; this.addImage(img); }
    if (typeof this.options.background == 'string') { var children = elem.querySelectorAll(this.options.background); for (i = 0; i < children.length; i++) { var child = children[i]; this.addElementBackgroundImages(child); } }
  }; var elementNodeTypes = { 1: true, 9: true, 11: true }; ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
    var style = getComputedStyle(elem); if (!style) { return; }
    var reURL = /url\((['"])?(.*?)\1\)/gi; var matches = reURL.exec(style.backgroundImage); while (matches !== null) {
      var url = matches && matches[2]; if (url) { this.addBackground(url, elem); }
      matches = reURL.exec(style.backgroundImage);
    }
  }; ImagesLoaded.prototype.addImage = function(img) { var loadingImage = new LoadingImage(img); this.images.push(loadingImage); }; ImagesLoaded.prototype.addBackground = function(url, elem) { var background = new Background(url, elem); this.images.push(background); }; ImagesLoaded.prototype.check = function() {
    var _this = this; this.progressedCount = 0; this.hasAnyBroken = false; if (!this.images.length) { this.complete(); return; }
    function onProgress(image, elem, message) { setTimeout(function() { _this.progress(image, elem, message); }); }
    this.images.forEach(function(loadingImage) { loadingImage.once('progress', onProgress); loadingImage.check(); });
  }; ImagesLoaded.prototype.progress = function(image, elem, message) {
    this.progressedCount++; this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded; this.emitEvent('progress', [this, image, elem]); if (this.jqDeferred && this.jqDeferred.notify) { this.jqDeferred.notify(this, image); }
    if (this.progressedCount == this.images.length) { this.complete(); }
    if (this.options.debug && console) { console.log('progress: ' + message, image, elem); }
  }; ImagesLoaded.prototype.complete = function() { var eventName = this.hasAnyBroken ? 'fail' : 'done'; this.isComplete = true; this.emitEvent(eventName, [this]); this.emitEvent('always', [this]); if (this.jqDeferred) { var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve'; this.jqDeferred[jqMethod](this); } }; function LoadingImage(img) { this.img = img; }
  LoadingImage.prototype = Object.create(EvEmitter.prototype); LoadingImage.prototype.check = function() {
    var isComplete = this.getIsImageComplete(); if (isComplete) { this.confirm(this.img.naturalWidth !== 0, 'naturalWidth'); return; }
    this.proxyImage = new Image(); this.proxyImage.addEventListener('load', this); this.proxyImage.addEventListener('error', this); this.img.addEventListener('load', this); this.img.addEventListener('error', this); this.proxyImage.src = this.img.src;
  }; LoadingImage.prototype.getIsImageComplete = function() { return this.img.complete && this.img.naturalWidth; }; LoadingImage.prototype.confirm = function(isLoaded, message) { this.isLoaded = isLoaded; this.emitEvent('progress', [this, this.img, message]); }; LoadingImage.prototype.handleEvent = function(event) { var method = 'on' + event.type; if (this[method]) { this[method](event); } }; LoadingImage.prototype.onload = function() { this.confirm(true, 'onload'); this.unbindEvents(); }; LoadingImage.prototype.onerror = function() { this.confirm(false, 'onerror'); this.unbindEvents(); }; LoadingImage.prototype.unbindEvents = function() { this.proxyImage.removeEventListener('load', this); this.proxyImage.removeEventListener('error', this); this.img.removeEventListener('load', this); this.img.removeEventListener('error', this); }; function Background(url, element) { this.url = url; this.element = element; this.img = new Image(); }
  Background.prototype = Object.create(LoadingImage.prototype); Background.prototype.check = function() { this.img.addEventListener('load', this); this.img.addEventListener('error', this); this.img.src = this.url; var isComplete = this.getIsImageComplete(); if (isComplete) { this.confirm(this.img.naturalWidth !== 0, 'naturalWidth'); this.unbindEvents(); } }; Background.prototype.unbindEvents = function() { this.img.removeEventListener('load', this); this.img.removeEventListener('error', this); }; Background.prototype.confirm = function(isLoaded, message) { this.isLoaded = isLoaded; this.emitEvent('progress', [this, this.element, message]); }; ImagesLoaded.makeJQueryPlugin = function(jQuery) {
    jQuery = jQuery || window.jQuery; if (!jQuery) { return; }
    $ = jQuery; $.fn.imagesLoaded = function(options, callback) { var instance = new ImagesLoaded(this, options, callback); return instance.jqDeferred.promise($(this)); };
  }; ImagesLoaded.makeJQueryPlugin(); return ImagesLoaded;
});
this.ckan = this.ckan || {}; (function(ckan, $) {
  var callbacks = []; function Sandbox(callbacks) { var index = 0; var length = callbacks ? callbacks.length : 0; for (; index < length; index += 1) { callbacks[index](this); } }
  $.extend(Sandbox.prototype, { jQuery: $, ajax: $.ajax, body: $(document.body), location: window.location, window: window }); function sandbox(element, options) { return new sandbox.Sandbox(ckan.sandbox.callbacks); }
  sandbox.extend = function(props) { $.extend(Sandbox.prototype, props || {}); return ckan; }; sandbox.setup = function setup(fn) {
    var callbacks = ckan.sandbox.callbacks = ckan.sandbox.callbacks || []; if (typeof fn === 'function') { callbacks.push(fn); } else { throw new Error('ckan.sandbox.setup() must be passed a function'); }
    return ckan;
  }; ckan.sandbox = sandbox; ckan.sandbox.Sandbox = Sandbox;
})(this.ckan, this.jQuery);
this.ckan = this.ckan || {}; (function(ckan, jQuery, window) {
  var MODULE_PREFIX = 'data-module'; var MODULE_OPTION_PREFIX = 'data-module-'; function BaseModule(el, options, sandbox) { this.el = el instanceof jQuery ? el : jQuery(el); this.options = jQuery.extend(true, {}, this.options, options); this.sandbox = sandbox; }
  jQuery.extend(BaseModule.prototype, {
    el: null, options: null, $: function(selector) { return this.el.find(selector); }, i18n: function(key) {
      var args = [].slice.call(arguments, 1); var i18n = this.options.i18n; var trans = (i18n && i18n[key]) || key; if (typeof trans === 'function') { trans = trans.apply(null, args); }
      return typeof trans.fetch === 'function' ? trans.fetch.apply(trans, args) : trans;
    }, _: function() { return ckan.i18n._.apply(ckan.i18n, arguments); }, ngettext: function() { return ckan.i18n.ngettext.apply(ckan.i18n, arguments); }, initialize: function() { }, teardown: function() { }, remove: function() { this.teardown(); this.el.remove(); }
  }); function module(name, properties) {
    if (module.registry[name]) { throw new Error('There is already a module registered as "' + name + '"'); }
    if (typeof properties === 'function') { properties = properties(jQuery, ckan.i18n.translate, ckan.i18n); }
    properties = jQuery.extend({ constructor: function Module() { BaseModule.apply(this, arguments); } }, properties); module.registry[name] = jQuery.inherit(BaseModule, properties, { namespace: name }); return ckan;
  }
  module.registry = {}; module.instances = {}; module.initialize = function() { ckan.pubsub.enqueue(); jQuery('[data-module]', document.body).each(function(index, element) { module.initializeElement(this); }); ckan.pubsub.dequeue(); return module; }; module.initializeElement = function(element) { var registry = module.registry; var names = jQuery.trim(element.getAttribute(MODULE_PREFIX)).split(' '); jQuery.each(names, function(index, name) { var Module = registry[name]; if (Module && typeof Module === 'function') { module.createInstance(Module, element); } }); }; module.createInstance = function(Module, element) {
    var options = module.extractOptions(element); var sandbox = ckan.sandbox(element, options); var instance = new Module(element, options, sandbox); if (typeof instance.initialize === 'function') { instance.initialize(); }
    var instances = module.instances[Module.namespace] || []; instances.push(instance); module.instances[Module.namespace] = instances;
  }; module.extractOptions = function(element) {
    var attrs = element.attributes; var index = 0; var length = attrs.length; var options = {}; var prop; var attr; var value; for (; index < length; index += 1) {
      attr = attrs[index]; if (attr.name.indexOf(MODULE_OPTION_PREFIX) === 0) {
        prop = attr.name.slice(MODULE_OPTION_PREFIX.length); try { value = attr.value === "" ? true : jQuery.parseJSON(attr.value); } catch (error) { value = attr.value; }
        options[jQuery.camelCase(prop)] = value;
      }
    }
    return options;
  }; ckan.module = module; ckan.module.BaseModule = BaseModule;
})(this.ckan, this.jQuery, this);
this.ckan = this.ckan || {}; (function(ckan, $) {
  var pubsub = {
    events: $({}), queue: null, publish: function(topic) {
      if (pubsub.queue) { pubsub.queue.push([].slice.call(arguments)); } else { pubsub.events.triggerHandler(topic, [].slice.call(arguments, 1)); }
      return this;
    }, subscribe: function(topic, callback) {
      if ($.isPlainObject(topic)) { $.each(topic, $.proxy(pubsub.subscribe, this)); return this; }
      function wrapper() { return callback.apply(this, [].slice.call(arguments, 1)); }
      wrapper.guid = callback.guid = callback.guid || ($.guid += 1); pubsub.events.on(topic, wrapper); return this;
    }, unsubscribe: function(topic, callback) { pubsub.events.off(topic, arguments); return this; }, enqueue: function() {
      if (!pubsub.queue) { pubsub.queue = []; }
      return this;
    }, dequeue: function() {
      if (pubsub.queue) { var queue = pubsub.queue; var index = 0; var length = queue.length; pubsub.queue = null; for (; index < length; index += 1) { pubsub.publish.apply(pubsub, queue[index]); } }
      return this;
    }
  }; ckan.pubsub = pubsub; ckan.sandbox.extend({ publish: pubsub.publish, subscribe: pubsub.subscribe, unsubscribe: pubsub.unsubscribe });
})(this.ckan, this.jQuery);
(function(ckan, jQuery) {
  function Client(options) { this.endpoint = options && options.endpoint || ''; jQuery.proxyAll(this, /parse/); }
  jQuery.extend(Client.prototype, {
    url: function(path) {
      if (!(/^https?:\/\//i).test(path)) { path = this.endpoint + '/' + path.replace(/^\//, ''); }
      return path;
    }, call: function(type, path, data, fn, error) {
      var url = this.url('/api/action/' + path); var error = (error == 'undefined') ? function() { } : error; var options = { contentType: 'application/json', url: url, dataType: 'json', processData: false, success: fn, error: error }; if (type == 'POST') { options.type = 'POST'; options.data = JSON.stringify(data); } else { options.type = 'GET'; options.url += data; }
      jQuery.ajax(options);
    }, getTemplate: function(filename, params, success, error) {
      var url = this.url('/api/1/util/snippet/' + encodeURIComponent(filename)); if (typeof params === 'function') { error = success; success = params; params = {}; }
      return jQuery.get(url, params || {}).then(success, error);
    }, getLocaleData: function(locale, success, error) { var url = this.url('/api/i18n/' + (locale || '')); return jQuery.getJSON(url).then(success, error); }, getCompletions: function(url, options, success, error) {
      if (typeof options === 'function') { error = success; success = options; options = {}; }
      var formatter = options && options.format || this.parseCompletions; var request = jQuery.ajax({ url: this.url(url) }); return request.pipe(formatter).promise(request).then(success, error);
    }, parseCompletions: function(data, options) {
      if (typeof data === 'string') { return this.parsePackageCompletions(data, options); }
      var map = {}; var raw = jQuery.isArray(data) ? data : data.ResultSet && data.ResultSet.Result || {}; var items = jQuery.map(raw, function(item) {
        var key = typeof options.key != 'undefined' ? item[options.key] : false; var label = typeof options.label != 'undefined' ? item[options.label] : false; item = typeof item === 'string' ? item : item.name || item.Name || item.Format || ''; item = jQuery.trim(item); key = key ? key : item; label = label ? label : item; var lowercased = item.toLowerCase(); var returnObject = options && options.objects === true; if (lowercased && !map[lowercased]) { map[lowercased] = 1; return returnObject ? { id: key, text: label } : item; }
        return null;
      }); items = jQuery.grep(items, function(item) { return item !== null; }); return items;
    }, parseCompletionsForPlugin: function(data) { return { results: this.parseCompletions(data, { objects: true }) }; }, parsePackageCompletions: function(string, options) { var packages = jQuery.trim(string).split('\n'); var parsed = []; return jQuery.map(packages, function(pkg) { var parts = pkg.split('|'); var id = jQuery.trim(parts.pop() || ''); var text = jQuery.trim(parts.join('|') || ''); return options && options.objects === true ? { id: id, text: text } : id; }); }, getStorageAuth: function(key, success, error) {
      if (!key) { throw new Error('Client#getStorageAuth() must be called with a key'); }
      return jQuery.ajax({ url: this.url('/api/storage/auth/form/' + key), success: success, error: error });
    }, getStorageMetadata: function(key, success, error) {
      if (!key) { throw new Error('Client#getStorageMetadata() must be called with a key'); }
      return jQuery.ajax({ url: this.url('/api/storage/metadata/' + key), success: success, error: error });
    }, convertStorageMetadataToResource: function(meta) {
      var modified = new Date(this.normalizeTimestamp(meta._last_modified)); var created = new Date(this.normalizeTimestamp(meta._creation_date)); var createdISO = jQuery.date.toCKANString(created); var modifiedISO = jQuery.date.toCKANString(modified); var filename = meta['filename-original'] || meta.key; var format = meta._format || filename.split('.').pop(); var url = meta._location; if (url.indexOf('://') === -1) { url = ckan.url(url); }
      return { url: url, key: meta.key, name: filename, size: meta._content_length, created: createdISO, last_modified: modifiedISO, format: format, mimetype: meta._format || null, resource_type: 'file.upload', owner: meta['uploaded-by'], hash: meta._checksum, cache_url: meta._location, cache_url_updated: modifiedISO };
    }, normalizeTimestamp: function(string) {
      var tz = /[+\-]\d{4}|Z/; if (!tz.test(string)) { string += 'Z'; }
      return string;
    }
  }); ckan.sandbox.setup(function(instance) { instance.client = new Client({ endpoint: ckan.SITE_ROOT }); }); ckan.Client = Client;
})(this.ckan, this.jQuery);
(function(ckan, jQuery) {
  function notify(title, message, type) { var alert = notify.initialize(notify.create(title, message, type)); notify.el.append(alert); }
  notify.el = jQuery('.flash-messages', document.body); notify.create = function(title, message, type) { var alert = jQuery('<div class="alert fade in"><strong></strong> <span></span></div>'); alert.addClass('alert-' + (type || 'error')); alert.find('strong').text(title); alert.find('span').text(message); return alert; }; notify.initialize = function(element) { element = element instanceof jQuery ? element : jQuery(element); return element.append(jQuery('<a class="close" href="#">&times;</a>')).alert(); }; notify.el.find('.alert').each(function() { notify.initialize(this); }); notify.el.on('click', '.close', function() { jQuery(this).parent().alert('close'); }); ckan.notify = notify; ckan.sandbox.extend({ notify: notify });
})(this.ckan, this.jQuery);
'use strict'; this.ckan = this.ckan || {}; (function(ckan, jQuery, Jed) { var domain = { "": { "domain": "ckan", "lang": "en", "plural_forms": "nplurals=2; plural=(n != 1);" } }; var jed = new Jed({ domain: 'ckan', locale_data: { ckan: domain } }); ckan.i18n = {}; ckan.i18n.translate = jQuery.proxy(jed.translate, jed); ckan.i18n.load = function(data) { if (data && data['']) { jQuery.extend(domain, data);; } }; ckan.i18n._ = function(string, values) { return jed.sprintf(jed.gettext(string), values || {}); }; ckan.i18n.ngettext = function(singular, plural, num, values) { values = values || {}; values['num'] = num; return jed.sprintf(jed.ngettext(singular, plural, num), values); }; ckan.sandbox.extend({ i18n: ckan.i18n, translate: ckan.i18n.translate }); })(this.ckan, this.jQuery, this.Jed);
this.ckan = this.ckan || {}; (function(ckan, jQuery) {
  ckan.PRODUCTION = 'production'; ckan.DEVELOPMENT = 'development'; ckan.TESTING = 'testing'; ckan.initialize = function() {
    var body = jQuery('body'); var locale = jQuery('html').attr('lang'); var location = window.location; var root = location.protocol + '//' + location.host; function getRootFromData(key) { return (body.data(key) || root).replace(/\/$/, ''); }
    ckan.SITE_ROOT = getRootFromData('siteRoot'); ckan.LOCALE_ROOT = getRootFromData('localeRoot'); jQuery('.automatic-local-datetime').each(function() {
      moment.locale(locale); var date = moment(jQuery(this).data('datetime')); if (date.isValid()) { jQuery(this).html(date.format("LL, LT ([UTC]Z)")); }
      jQuery(this).show();
    })
    ckan.sandbox().client.getLocaleData(locale).done(function(data) { ckan.i18n.load(data); ckan.module.initialize(); }); if (jQuery.fn.popover !== undefined) { jQuery('[data-target="popover"]').popover(); }
  }; ckan.url = function(path, includeLocale) {
    if (typeof path === 'boolean') { includeLocale = path; path = null; }
    path = (path || '').replace(/^\//, ''); var root = includeLocale ? ckan.LOCALE_ROOT : ckan.SITE_ROOT; return path ? root + '/' + path : root;
  }; ckan.sandbox.extend({ url: ckan.url }); if (ckan.ENV !== ckan.TESTING) { jQuery(function() { ckan.initialize(); }); }
})(this.ckan, this.jQuery); $(function() { $(".show-filters").click(function() { $("body").addClass("filters-modal"); }); $(".hide-filters").click(function() { $("body").removeClass("filters-modal"); }); });
this.ckan.module('select-switch', { options: { target: 'select' }, initialize: function() { var _this = this; this.el.on('change', this.options.target, function() { _this.el.submit(); }); } });
this.ckan.module('slug-preview-target', { initialize: function() { var sandbox = this.sandbox; var options = this.options; var el = this.el; sandbox.subscribe('slug-preview-created', function(preview) { el.after(preview); }); if (el.val() == '') { sandbox.subscribe('slug-preview-modified', function() { el.off('.slug-preview'); }); el.on('keyup.slug-preview input.slug-preview', function(event) { sandbox.publish('slug-target-changed', this.value); }); } } }); this.ckan.module('slug-preview-slug', function(jQuery) {
  return {
    options: { prefix: '', placeholder: '<slug>' }, initialize: function() {
      var sandbox = this.sandbox; var options = this.options; var el = this.el; var _ = sandbox.translate; var slug = el.slug(); var parent = slug.parents('.form-group'); var preview; if (!(parent.length)) { return; }
      if (!parent.hasClass('error')) { preview = parent.slugPreview({ prefix: options.prefix, placeholder: options.placeholder, i18n: { 'URL': this._('URL'), 'Edit': this._('Edit') } }); slug.keypress(function() { if (event.charCode) { sandbox.publish('slug-preview-modified', preview[0]); } }); sandbox.publish('slug-preview-created', preview[0]); }
      sandbox.subscribe('slug-target-changed', function(value) { slug.val(value).trigger('change'); });
    }
  };
});
this.ckan.module('basic-form', function(jQuery) { return { initialize: function() { var message = this._('There are unsaved modifications to this form'); $.proxyAll(this, /_on/); this.el.incompleteFormWarning(message); this.el.on('submit', this._onSubmit); }, _onSubmit: function() { setTimeout(function() { this.el.find('button[name="save"]').attr('disabled', true); }.bind(this), 0); } }; });
this.ckan.module('confirm-action', function(jQuery) {
  return {
    options: { content: '', i18n: { content: '', }, template: ['<div class="modal fade">', '<div class="modal-dialog">', '<div class="modal-content">', '<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal">Ã—</button>', '<h3 class="modal-title"></h3>', '</div>', '<div class="modal-body"></div>', '<div class="modal-footer">', '<button class="btn btn-default btn-cancel"></button>', '<button class="btn btn-primary"></button>', '</div>', '</div>', '</div>', '</div>'].join('\n') }, initialize: function() { jQuery.proxyAll(this, /_on/); this.el.on('click', this._onClick); }, confirm: function() { this.sandbox.body.append(this.createModal()); this.modal.modal('show'); this.modal.css({ 'margin-top': this.modal.height() * -0.5, 'top': '50%' }); }, performAction: function() { var form = jQuery('<form/>', { action: this.el.attr('href'), method: 'POST' }); form.appendTo('body').submit(); }, createModal: function() {
      if (!this.modal) { var element = this.modal = jQuery(this.options.template); element.on('click', '.btn-primary', this._onConfirmSuccess); element.on('click', '.btn-cancel', this._onConfirmCancel); element.modal({ show: false }); element.find('.modal-title').text(this._('Please Confirm Action')); var content = this.options.content || this.options.i18n.content || this._('Are you sure you want to perform this action?'); element.find('.modal-body').text(content); element.find('.btn-primary').text(this._('Confirm')); element.find('.btn-cancel').text(this._('Cancel')); }
      return this.modal;
    }, _onClick: function(event) { event.preventDefault(); this.confirm(); }, _onConfirmSuccess: function(event) { this.performAction(); }, _onConfirmCancel: function(event) { this.modal.modal('hide'); }
  };
});
this.ckan.module('api-info', function(jQuery) {
  return {
    modal: null, options: { template: null }, initialize: function() { jQuery.proxyAll(this, /_on/); this.el.on('click', this._onClick); this.el.button(); }, loading: function(loading) { this.el.button(loading !== false ? 'loading' : 'reset'); }, show: function() {
      var sandbox = this.sandbox, module = this; if (this.modal) { return this.modal.modal('show'); }
      this.loadTemplate().done(function(html) { module.modal = jQuery(html); module.modal.find('.modal-header :header').append('<button class="close" data-dismiss="modal">Ã—</button>'); module.modal.modal().appendTo(sandbox.body); });
    }, hide: function() { if (this.modal) { this.modal.modal('hide'); } }, loadTemplate: function() {
      if (!this.options.template) { this.sandbox.notify(this._('There is no API data to load for this resource')); return jQuery.Deferred().reject().promise(); }
      if (!this.promise) { this.loading(); this.promise = jQuery.get(this.options.template); this.promise.then(this._onTemplateSuccess, this._onTemplateError); }
      return this.promise;
    }, _onClick: function(event) { event.preventDefault(); this.show(); }, _onTemplateSuccess: function() { this.loading(false); }, _onTemplateError: function() { this.loading(false); this.sandbox.notify(this._('Failed to load data API information')); }
  };
});
this.ckan.module('autocomplete', function(jQuery) {
  return {
    options: { tags: false, key: false, label: false, items: 10, source: null, interval: 300, dropdownClass: '', containerClass: '' }, initialize: function() { jQuery.proxyAll(this, /_on/, /format/); this.setupAutoComplete(); }, setupAutoComplete: function() {
      var settings = { width: 'resolve', formatResult: this.formatResult, formatNoMatches: this.formatNoMatches, formatInputTooShort: this.formatInputTooShort, dropdownCssClass: this.options.dropdownClass, containerCssClass: this.options.containerClass }; if (!this.el.is('select')) {
        if (this.options.tags) { settings.tags = this._onQuery; } else { settings.query = this._onQuery; settings.createSearchChoice = this.formatTerm; }
        settings.initSelection = this.formatInitialValue;
      }
      else { if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { var ieversion = new Number(RegExp.$1); if (ieversion <= 7) { return } } }
      var select2 = this.el.select2(settings).data('select2'); if (this.options.tags && select2 && select2.search) { select2.search.on('keydown', this._onKeydown); }
      $('.select2-choice', select2.container).on('click', function() { return false; }); this._select2 = select2;
    }, getCompletions: function(string, fn) { var parts = this.options.source.split('?'); var end = parts.pop(); var source = parts.join('?') + encodeURIComponent(string) + end; var client = this.sandbox.client; var options = { format: function(data) { var completion_options = jQuery.extend(options, { objects: true }); return { results: client.parseCompletions(data, completion_options) } }, key: this.options.key, label: this.options.label }; return client.getCompletions(source, options, fn); }, lookup: function(string, fn) {
      var module = this; this._lastTerm = string; clearTimeout(this._debounced); fn({ results: [] }); if (string) {
        this._debounced = setTimeout(function() {
          var term = module._lastTerm; if (module._last && typeof module._last.abort == 'function') { module._last.abort(); }
          module._last = module.getCompletions(term, fn);
        }, this.options.interval); $('.select2-search input', this._select2.dropdown).addClass('select2-active');
      }
    }, formatResult: function(state, container, query) {
      var term = this._lastTerm || null; if (container) { container.attr('data-value', state.id); }
      return state.text.split(term).join(term && term.bold());
    }, formatNoMatches: function(term) { return !term ? this._('Start typingâ€¦') : this._('No matches found'); }, formatInputTooShort: function(term, min) { return this.ngettext('Input is too short, must be at least one character', 'Input is too short, must be at least %(num)d characters', min); }, formatTerm: function(term) { term = jQuery.trim(term || ''); return { id: term.replace(/,/g, '\u002C'), text: term }; }, formatInitialValue: function(element, callback) {
      var value = jQuery.trim(element.val() || ''); var formatted; if (this.options.tags) { formatted = jQuery.map(value.split(","), this.formatTerm); } else { formatted = this.formatTerm(value); }
      if (typeof callback === 'function') { callback(formatted); }
      return formatted;
    }, _onQuery: function(options) { if (options) { this.lookup(options.term, options.callback); } }, _onKeydown: function(event) { if (typeof event.key !== 'undefined' ? event.key === ',' : event.which === 188) { event.preventDefault(); setTimeout(function() { var e = jQuery.Event("keydown", { which: 13 }); jQuery(event.target).trigger(e); }, 10); } }
  };
});
this.ckan.module('custom-fields', function(jQuery) {
  return {
    options: { fieldSelector: '.control-custom' }, initialize: function() { jQuery.proxyAll(this, /_on/); var delegated = this.options.fieldSelector + ':last input:first'; this.el.on('change', delegated, this._onChange); this.el.on('change', ':checkbox', this._onRemove); }, newField: function(element) { this.el.append(this.cloneField(element)); }, cloneField: function(current) { return this.resetField(jQuery(current).clone()); }, resetField: function(field) {
      function increment(index, string) { return (string || '').replace(/\d+/, function(int) { return 1 + parseInt(int, 10); }); }
      var input = field.find(':input'); input.val('').attr('id', increment).attr('name', increment); var label = field.find('label'); label.text(increment).attr('for', increment); return field;
    }, disableField: function(field, disable) { field.toggleClass('disabled', disable !== false); }, _onChange: function(event) { if (event.target.value !== '') { var parent = jQuery(event.target).parents(this.options.fieldSelector); this.newField(parent); } }, _onRemove: function(event) { var parent = jQuery(event.target).parents(this.options.fieldSelector); this.disableField(parent, event.target.checked); }
  };
});
this.ckan.module('data-viewer', function(jQuery) { return { options: { timeout: 200, minHeight: 400, padding: 30 }, initialize: function() { jQuery.proxyAll(this, /_on/); this.el.on('load', this._onLoad); this._FirefoxFix(); this.sandbox.subscribe('data-viewer-error', this._onDataViewerError); }, _onDataViewerError: function(message) { var parent = this.el.parent(); $('.data-viewer-error .collapse', parent).html(message); $('.data-viewer-error', parent).removeClass('js-hide'); this.el.hide(); }, _onLoad: function() { var self = this; var loc = $('body').data('site-root'); if (this.el.attr('src').substring(0, loc.length) === loc) { this._recalibrate(); setInterval(function() { self._recalibrate(); }, this.options.timeout); } else { this.el.css('height', 600); } }, _recalibrate: function() { var height = this.el.contents().find('body').outerHeight(true); height = Math.max(height, this.options.minHeight); this.el.css('height', height + this.options.padding); }, _FirefoxFix: function() { if (/#$/.test(this.el.src)) { this.el.src = this.el.src.substr(0, this.src.length - 1); } else { this.el.src = this.el.src + '#'; } } }; });
this.ckan.module('table-selectable-rows', function($) {
  return {
    select_all: null, total_checkboxes: 0, buttons: null, initialize: function() { $.proxyAll(this, /_on/); this.total_checkboxes = $('input[type="checkbox"]', this.el).length; this.select_all = $('<input type="checkbox">').data('select-all', true).appendTo($('thead th:first-child', this.el)); this.el.on('change', 'input[type="checkbox"]', this._onHandleCheckboxToggle); this.buttons = $('th.actions .btn', this.el).addClass('disabled').prop('disabled', true); }, _onHandleCheckboxToggle: function($e) { var checkbox = $($e.target); if (checkbox.data('select-all')) { this.handleSelectAll(checkbox, checkbox.is(':checked')); } else { this.handleSelectOne(checkbox, checkbox.is(':checked')); } }, handleSelectAll: function($target, $checked) { $('input[type="checkbox"]', this.el).prop('checked', $checked); if ($checked) { $('tbody tr', this.el).addClass('table-selected'); this.buttons.removeClass('disabled').prop('disabled', false); } else { $('tbody tr', this.el).removeClass('table-selected'); this.buttons.addClass('disabled').prop('disabled', true); } }, handleSelectOne: function($target, $checked) {
      if ($checked) { $target.parents('tr').addClass('table-selected'); } else { $target.parents('tr').removeClass('table-selected'); }
      var checked = $('tbody input[type="checkbox"]:checked', this.el).length; if (checked >= this.total_checkboxes) { this.select_all.prop('checked', true); } else { this.select_all.prop('checked', false); }
      if (checked > 0) { this.buttons.removeClass('disabled').prop('disabled', false); } else { this.buttons.addClass('disabled').prop('disabled', true); }
    }
  };
});
this.ckan.module('resource-form', function(jQuery) { return { initialize: function() { jQuery.proxyAll(this, /_on/); this.sandbox.subscribe('resource:uploaded', this._onResourceUploaded); }, teardown: function() { this.sandbox.unsubscribe('resource:uploaded', this._onResourceUploaded); }, _onResourceUploaded: function(resource) { var key; var field; for (key in resource) { if (resource.hasOwnProperty(key)) { field = this.$('[name="' + key + '"]'); if (field.is(':checkbox, :radio')) { this.$('[value="' + resource[key] + '"]').prop('checked', true); } else if (field.is('select')) { field.prop('selected', resource[key]); } else { field.val(resource[key]); } } } } }; });
this.ckan.module('resource-upload-field', function(jQuery) {
  return {
    options: { form: { method: 'POST', file: 'file', params: [] }, template: ['<span class="resource-upload-field">', '<i class="ckan-icon ckan-icon-link-plugin"></i>', '<input type="file" />', '<input id="field-resource-type-upload" type="radio" name="resource_type" value="file.upload" />', '<label class="radio inline" for="field-resource-type-upload"></label>', '</span>'].join('\n') }, initialize: function() { jQuery.proxyAll(this, /_on/); this.upload = jQuery(this.options.template); this.setupFileUpload(); this.el.append(this.upload); jQuery(window).on('beforeunload', this._onWindowUpload); }, setupFileUpload: function() { var options = this.options; this.upload.find('label').text(this._('Upload a file')); this.upload.find('input[type=file]').fileupload({ type: options.form.method, paramName: options.form.file, forceIframeTransport: true, replaceFileInput: true, autoUpload: false, add: this._onUploadAdd, send: this._onUploadSend, done: this._onUploadDone, fail: this._onUploadFail, always: this._onUploadComplete }); }, loading: function(show) { this.upload.toggleClass('loading', show); }, authenticate: function(key, data) { data.key = key; var request = this.sandbox.client.getStorageAuth(key); var onSuccess = jQuery.proxy(this._onAuthSuccess, this, data); return request.then(onSuccess, this._onAuthError); }, lookupMetadata: function(key, data) { var request = this.sandbox.client.getStorageMetadata(key); var onSuccess = jQuery.proxy(this._onMetadataSuccess, this, data); return request.then(onSuccess, this._onMetadataError); }, notify: function(message, type) { var title = this._('An Error Occurred'); this.sandbox.notify(title, message, type); }, generateKey: function(filename) { var parts = filename.split('.'); var extension = jQuery.url.slugify(parts.pop()); filename = jQuery.url.slugify(parts.join('.')) + '.' + extension; return jQuery.date.toISOString() + '/' + filename; }, uploading: function(is_uploading) { var method = is_uploading ? 'on' : 'off'; jQuery(window)[method]('beforeunload', this._onWindowBeforeUnload); }, _onUploadAdd: function(event, data) { this.uploading(true); if (data.files && data.files.length) { var key = this.generateKey(data.files[0].name); this.authenticate(key, data); } }, _onUploadFail: function() { this.sandbox.notify(this._('Unable to upload file')); }, _onUploadSend: function() { this.loading(); }, _onUploadDone: function(event, data) { var result = data.result; if (result && !(jQuery.isPlainObject(result) && result.error)) { this.lookupMetadata(data.key, data); } else { this._onUploadFail(event, data); } }, _onUploadComplete: function() { this.loading(false); this.uploading(false); }, _onAuthSuccess: function(data, response) { data.url = response.action; data.formData = this.options.form.params.concat(response.fields); data.submit(); }, _onAuthError: function(event, data) { this.sandbox.notify(this._('Unable to authenticate upload')); this._onUploadComplete(); }, _onMetadataSuccess: function(data, response) { var resource = this.sandbox.client.convertStorageMetadataToResource(response); this.sandbox.notify(this._('Resource uploaded'), '', 'success'); this.sandbox.publish('resource:uploaded', resource); }, _onMetadataError: function() { this.sandbox.notify(this._('Unable to get data for uploaded file')); this._onUploadComplete(); }, _onWindowBeforeUnload: function(event) {
      var message = this._('You are uploading a file. Are you sure you ' + 'want to navigate away and stop this upload?'); if (event.originalEvent.returnValue) { event.originalEvent.returnValue = message; }
      return message;
    }
  };
});
this.ckan.module('resource-reorder', function($) { return { options: { id: false, labelText: 'Reorder resources' }, template: { title: '<h1></h1>', button: ['<a href="javascript:;" class="btn btn-default">', '<i class="fa fa-bars"></i>', '<span></span>', '</a>'].join('\n'), form_actions: ['<div class="form-actions">', '<a href="javascript:;" class="cancel btn btn-danger pull-left"></a>', '<a href="javascript:;" class="save btn btn-primary"></a>', '</div>'].join('\n'), handle: ['<a href="javascript:;" class="handle">', '<i class="fa fa-arrows"></i>', '</a>'].join('\n'), saving: ['<span class="saving text-muted m-right">', '<i class="fa fa-spinner fa-spin"></i>', '<span></span>', '</span>'].join('\n') }, is_reordering: false, cache: false, initialize: function() { jQuery.proxyAll(this, /_on/); var labelText = this._(this.options.labelText); this.html_title = $(this.template.title).text(labelText).insertBefore(this.el).hide(); var button = $(this.template.button).on('click', this._onHandleStartReorder).appendTo('.page_primary_action'); $('span', button).text(labelText); this.html_form_actions = $(this.template.form_actions).hide().insertAfter(this.el); $('.save', this.html_form_actions).text(this._('Save order')).on('click', this._onHandleSave); $('.cancel', this.html_form_actions).text(this._('Cancel')).on('click', this._onHandleCancel); this.html_handles = $(this.template.handle).hide().appendTo($('.resource-item', this.el)); this.html_saving = $(this.template.saving).hide().insertBefore($('.save', this.html_form_actions)); $('span', this.html_saving).text(this._('Saving...')); this.cache = this.el.html(); this.el.sortable().sortable('disable'); }, _onHandleStartReorder: function() { if (!this.is_reordering) { this.html_form_actions.add(this.html_handles).add(this.html_title).show(); this.el.addClass('reordering').sortable('enable'); $('.page_primary_action').hide(); this.is_reordering = true; } }, _onHandleCancel: function() { if (this.is_reordering && !$('.cancel', this.html_form_actions).hasClass('disabled')) { this.reset(); this.is_reordering = false; this.el.html(this.cache).sortable().sortable('disable'); this.html_handles = $('.handle', this.el); } }, _onHandleSave: function() { if (!$('.save', this.html_form_actions).hasClass('disabled')) { var module = this; module.html_saving.show(); $('.save, .cancel', module.html_form_actions).addClass('disabled'); var order = []; $('.resource-item', module.el).each(function() { order.push($(this).data('id')); }); module.sandbox.client.call('POST', 'package_resource_reorder', { id: module.options.id, order: order }, function() { module.html_saving.hide(); $('.save, .cancel', module.html_form_actions).removeClass('disabled'); module.cache = module.el.html(); module.reset(); module.is_reordering = false; }); } }, reset: function() { this.html_form_actions.add(this.html_handles).add(this.html_title).hide(); this.el.removeClass('reordering').sortable('disable'); $('.page_primary_action').show(); } }; });
this.ckan.module('resource-view-reorder', function($) { return { options: { id: false, labelText: 'Reorder resource view' }, template: { title: '<h1></h1>', button: ['<a href="javascript:;" class="btn btn-default">', '<i class="fa fa-bars"></i>', '<span></span>', '</a>'].join('\n'), form_actions: ['<div class="form-actions">', '<a href="javascript:;" class="cancel btn btn-danger pull-left"></a>', '<a href="javascript:;" class="save btn btn-primary"></a>', '</div>'].join('\n'), handle: ['<a href="javascript:;" class="handle">', '<i class="fa fa-arrows"></i>', '</a>'].join('\n'), saving: ['<span class="saving text-muted m-right">', '<i class="fa fa-spinner fa-spin"></i>', '<span></span>', '</span>'].join('\n') }, is_reordering: false, cache: false, initialize: function() { jQuery.proxyAll(this, /_on/); var labelText = this._(this.options.labelText); this.html_title = $(this.template.title).text(labelText).insertBefore(this.el).hide(); var button = $(this.template.button).on('click', this._onHandleStartReorder).appendTo('.page_primary_action'); $('span', button).text(labelText); this.html_form_actions = $(this.template.form_actions).hide().insertAfter(this.el); $('.save', this.html_form_actions).text(this._('Save order')).on('click', this._onHandleSave); $('.cancel', this.html_form_actions).text(this._('Cancel')).on('click', this._onHandleCancel); this.html_handles = $(this.template.handle).hide().appendTo($('li', this.el)); this.html_saving = $(this.template.saving).hide().insertBefore($('.save', this.html_form_actions)); $('span', this.html_saving).text(this._('Saving...')); this.cache = this.el.html(); this.el.sortable().sortable('disable'); }, _onHandleStartReorder: function() { if (!this.is_reordering) { this.html_form_actions.add(this.html_handles).add(this.html_title).show(); this.el.addClass('reordering').sortable('enable'); $('.page_primary_action').hide(); this.is_reordering = true; } }, _onHandleCancel: function() { if (this.is_reordering && !$('.cancel', this.html_form_actions).hasClass('disabled')) { this.reset(); this.is_reordering = false; this.el.html(this.cache).sortable().sortable('disable'); this.html_handles = $('.handle', this.el); } }, _onHandleSave: function() { if (!$('.save', this.html_form_actions).hasClass('disabled')) { var module = this; module.html_saving.show(); $('.save, .cancel', module.html_form_actions).addClass('disabled'); var order = []; $('li', module.el).each(function() { order.push($(this).data('id')); }); module.sandbox.client.call('POST', 'resource_view_reorder', { id: module.options.id, order: order }, function() { module.html_saving.hide(); $('.save, .cancel', module.html_form_actions).removeClass('disabled'); module.cache = module.el.html(); module.reset(); module.is_reordering = false; }); } }, reset: function() { this.html_form_actions.add(this.html_handles).add(this.html_title).hide(); this.el.removeClass('reordering').sortable('disable'); $('.page_primary_action').show(); } }; });
this.ckan.module('follow', function($) {
  return {
    options: { action: null, type: null, id: null, loading: false }, initialize: function() { $.proxyAll(this, /_on/); this.el.on('click', this._onClick); }, _onClick: function(event) { var options = this.options; if (options.action && options.type && options.id && !options.loading) { event.preventDefault(); var client = this.sandbox.client; var path = options.action + '_' + options.type; options.loading = true; this.el.addClass('disabled'); client.call('POST', path, { id: options.id }, this._onClickLoaded); } }, _onClickLoaded: function(json) {
      var options = this.options; var sandbox = this.sandbox; var oldAction = options.action; options.loading = false; this.el.removeClass('disabled'); if (options.action == 'follow') { options.action = 'unfollow'; this.el.html('<i class="fa fa-times-circle"></i> ' + this._('Unfollow')).removeClass('btn-success').addClass('btn-danger'); } else { options.action = 'follow'; this.el.html('<i class="fa fa-plus-circle"></i> ' + this._('Follow')).removeClass('btn-danger').addClass('btn-success'); }
      sandbox.publish('follow-' + oldAction + '-' + options.id);
    }
  };
});
this.ckan.module('activity-stream', function($) {
  return {
    options: { more: null, id: null, context: null, offset: null, loading: false }, initialize: function() { $.proxyAll(this, /_on/); var options = this.options; options.more = (options.more == 'True'); this._onBuildLoadMore(); $(window).on('scroll', this._onScrollIntoView); this._onScrollIntoView(); }, elementInViewport: function(el) {
      var top = el.offsetTop; var left = el.offsetLeft; var width = el.offsetWidth; var height = el.offsetHeight; while (el.offsetParent) { el = el.offsetParent; top += el.offsetTop; left += el.offsetLeft; }
      return (top < (window.pageYOffset + window.innerHeight) && left < (window.pageXOffset + window.innerWidth) && (top + height) > window.pageYOffset && (left + width) > window.pageXOffset);
    }, _onScrollIntoView: function() { var el = $('.load-more a', this.el); if (el.length == 1) { var in_viewport = this.elementInViewport(el[0]); if (in_viewport && !this.options.loading) { el.trigger('click'); } } }, _onBuildLoadMore: function() { var options = this.options; if (options.more) { $('.load-more', this.el).on('click', 'a', this._onLoadMoreClick); options.offset = $('.item', this.el).length; } }, _onLoadMoreClick: function(event) { event.preventDefault(); var options = this.options; if (!options.loading) { options.loading = true; $('.load-more a', this.el).html(this._('Loading...')).addClass('disabled'); this.sandbox.client.call('GET', options.context + '_activity_list_html', '?id=' + options.id + '&offset=' + options.offset, this._onActivitiesLoaded); } }, _onActivitiesLoaded: function(json) { var options = this.options; var result = $(json.result); options.more = (result.data('module-more') == 'True'); options.offset += 30; $('.load-less', result).remove(); $('.load-more', this.el).remove(); $('li', result).appendTo(this.el); this._onBuildLoadMore(); options.loading = false; }
  };
});
this.ckan.module('dashboard', function($) {
  return {
    button: null, popover: null, searchTimeout: null, initialize: function() { $.proxyAll(this, /_on/); this.button = $('#followee-filter .btn').on('click', this._onShowFolloweeDropdown); var title = this.button.prop('title'); this.button.popover({ placement: 'bottom', title: 'Filter', html: true, content: $('#followee-popover').html() }); this.button.prop('title', title); this.popover = this.button.data('bs.popover').tip().addClass('popover-followee'); }, _onShowFolloweeDropdown: function() {
      this.button.toggleClass('active'); if (this.button.hasClass('active')) { setTimeout(this._onInitSearch, 100); }
      return false;
    }, _onInitSearch: function() {
      var input = $('input', this.popover); if (!input.hasClass('inited')) { input.on('keyup', this._onSearchKeyUp).addClass('inited'); }
      input.focus();
    }, _onSearchKeyUp: function() { clearTimeout(this.searchTimeout); this.searchTimeout = setTimeout(this._onSearchKeyUpTimeout, 300); }, _onSearchKeyUpTimeout: function() { var input = $('input', this.popover); var q = input.val().toLowerCase(); if (q) { $('li', this.popover).hide(); $('li.everything, [data-search^="' + q + '"]', this.popover).show(); } else { $('li', this.popover).show(); } }
  };
});
this.ckan.module('resource-view-embed', function($) {
  var modal; var self; function initialize() {
    self = this; modal = $('#embed-' + this.options.id)
    $('body').append(modal); this.el.on('click', _onClick); $('textarea', modal).on('focus', _selectAllCode).on('mouseup', _preventClick); $('input', modal).on('keyup change', _updateValues); _updateEmbedCode();
  }
  function _onClick(event) { event.preventDefault(); modal.modal('show'); }
  function _selectAllCode() { $('textarea', modal).select(); }
  function _updateValues() { self.options.width = $('[name="width"]', modal).val(); self.options.height = $('[name="height"]', modal).val(); _updateEmbedCode(); }
  function _updateEmbedCode() { $('[name="code"]', modal).val(_embedCode()); }
  function _preventClick(event) { event.preventDefault(); }
  function _embedCode() { return '<iframe width="' + self.options.width + '" height="' + self.options.height + '" src="' + self.options.url + '" frameBorder="0"></iframe>'; }
  return { initialize: initialize, options: { id: 0, url: '#', width: 700, height: 400 } }
});
String.prototype.queryStringToJSON = String.prototype.queryStringToJSON || function() {
  var params = String(this); params = params.substring(params.indexOf('?') + 1); params = params.replace(/\+/g, '%20'); if (params.substring(0, 1) === '{' && params.substring(params.length - 1) === '}') { return eval(decodeURIComponent(params)); }
  params = params.split(/\&(amp\;)?/); var json = {}; for (var i = 0, n = params.length; i < n; ++i) {
    var param = params[i] || null; if (param === null) { continue; }
    param = param.split('='); if (param === null) { continue; }
    var key = param[0] || null; if (key === null) { continue; }
    if (typeof param[1] === 'undefined') { continue; }
    var value = param[1]; key = decodeURIComponent(key); value = decodeURIComponent(value); var keys = key.split('.'); if (keys.length === 1) { json[key] = value; }
    else { var path = '', cmd = ''; $.each(keys, function(ii, key) { path += '["' + key.replace(/"/g, '\\"') + '"]'; jsonCLOSUREGLOBAL = json; cmd = 'if ( typeof jsonCLOSUREGLOBAL' + path + ' === "undefined" ) jsonCLOSUREGLOBAL' + path + ' = {}'; eval(cmd); json = jsonCLOSUREGLOBAL; delete jsonCLOSUREGLOBAL; }); jsonCLOSUREGLOBAL = json; valueCLOSUREGLOBAL = value; cmd = 'jsonCLOSUREGLOBAL' + path + ' = valueCLOSUREGLOBAL'; eval(cmd); json = jsonCLOSUREGLOBAL; delete jsonCLOSUREGLOBAL; delete valueCLOSUREGLOBAL; }
  }
  return json;
}; this.ckan = this.ckan || {}; this.ckan.views = this.ckan.views || {}; this.ckan.views.filters = (function(queryString) {
  'use strict'; var api = { get: get, set: set, setAndRedirectTo: setAndRedirectTo, unset: unset, _searchParams: {}, _initialize: _initialize, _setLocationHref: _setLocationHref, }; function get(filterName) { var filters = api._searchParams.filters || {}; if (filterName) { return filters[filterName]; } else { return filters; } }
  function set(name, value) { var url = window.location.href; setAndRedirectTo(name, value, url); }
  function setAndRedirectTo(name, value, url) { api._searchParams.filters = api._searchParams.filters || {}; api._searchParams.filters[name] = value; _redirectTo(url); return api; }
  function unset(name, value) {
    var thisFilters = get(name); if (thisFilters) {
      var originalLength = thisFilters.length; if (thisFilters === value || value === undefined) { delete api._searchParams.filters[name]; } else if ($.isArray(thisFilters)) { thisFilters = _removeElementsFromArray(thisFilters, value); if (thisFilters.length === 0) { delete api._searchParams.filters[name]; } else { api._searchParams.filters[name] = thisFilters; } }
      var haveFiltersChanged = (get(name) === undefined || get(name).length != originalLength); if (haveFiltersChanged) { _redirectTo(window.location.href); }
    }
    return api;
  }
  function _redirectTo(url) { var urlBase = url.split('?')[0], urlQueryString = url.split('?')[1] || '', defaultParams = urlQueryString.queryStringToJSON(), queryString = _encodedParams(defaultParams), destinationUrl; destinationUrl = urlBase + '?' + queryString; api._setLocationHref(destinationUrl); }
  function _encodedParams(defaultParams) {
    var params = $.extend({}, defaultParams || {}, api._searchParams); if (params.filters) {
      params.filters = $.map(params.filters, function(fields, filter) {
        if (!$.isArray(fields)) { fields = [fields]; }
        var fieldsStr = $.map(fields, function(field) { return filter + ':' + field; }); return fieldsStr.join('|');
      }).join('|');
    }
    return $.param(params);
  }
  function _setLocationHref(destinationUrl) { window.location.href = destinationUrl; }
  function _removeElementsFromArray(array, elements) {
    var arrayCopy = array.slice(0); if (!$.isArray(elements)) { elements = [elements]; }
    for (var i = 0; i < elements.length; i++) { var index = $.inArray(elements[i], arrayCopy); if (index > -1) { arrayCopy.splice(index, 1); } }
    return arrayCopy;
  }
  function _initialize(queryString) {
    var searchParams = queryString.queryStringToJSON(); if (searchParams.filters) {
      var filters = {}, fieldValuesStr = String(searchParams.filters).split('|'), i, len; for (i = 0, len = fieldValuesStr.length; i < len; i++) { var fieldValue = fieldValuesStr[i].match(/([^:]+):(.*)/), field = fieldValue[1], value = fieldValue[2]; filters[field] = filters[field] || []; filters[field].push(value); }
      searchParams.filters = filters;
    }
    api._searchParams = searchParams;
  }
  _initialize(queryString); return api;
})(window.location.search);
ckan.module('resource-view-filters-form', function(jQuery) {
  'use strict'; function applyDropdown(selectField, resourceId) {
    var inputField = selectField.parent().find('input'), filterName = selectField.val(), queryLimit = 20; inputField.select2({
      width: 'resolve', minimumInputLength: 0, ajax: {
        url: ckan.url('/api/3/action/datastore_search'), datatype: 'json', quietMillis: 200, cache: true, data: function(term, page) {
          var offset = (page - 1) * queryLimit, query; query = { resource_id: resourceId, limit: queryLimit, offset: offset, fields: filterName, distinct: true, sort: filterName, include_total: false }; if (term !== '') {
            var q = {}; if (term.indexOf(' ') == -1) { term = term + ':*'; query.plain = false; }
            q[filterName] = term; query.q = JSON.stringify(q);
          }
          return query;
        }, results: function(data, page) { var records = data.result.records, hasMore = (records.length == queryLimit), results; results = $.map(records, function(record) { return { id: record[filterName], text: String(record[filterName]) }; }); return { results: results, more: hasMore }; },
      }, initSelection: function(element, callback) { var data = { id: element.val(), text: element.val() }; callback(data); },
    });
  }
  function initialize() { var self = this, resourceId = self.options.resourceId, templateFilterInputs = self.options.templateFilterInputs, inputFieldTemplateEl = $(templateFilterInputs).find('input[type="text"][name]'), filtersDiv = self.el.find(self.options.filtersSelector), addFilterEl = self.el.find(self.options.addFilterSelector), removeFilterSelector = self.options.removeFilterSelector; var selects = filtersDiv.find('select'); selects.each(function(i, select) { applyDropdown($(select), resourceId); }); addFilterEl.click(function(evt) { var selectField; evt.preventDefault(); filtersDiv.append(templateFilterInputs); selectField = filtersDiv.children().last().find('select'); applyDropdown(selectField, resourceId); }); filtersDiv.on('click', removeFilterSelector, function(evt) { evt.preventDefault(); $(this).parent().remove(); }); filtersDiv.on('change', 'select', function(evt) { var el = $(this), parentEl = el.parent(), inputField = parentEl.find('input'), select2Container = parentEl.find('.select2-container'); evt.preventDefault(); select2Container.remove(); inputField.replaceWith(inputFieldTemplateEl.clone()); applyDropdown(el, resourceId); }); }
  return { initialize: initialize };
});
this.ckan.module('resource-view-filters', function(jQuery) {
  'use strict'; function initialize() { var self = this, resourceId = self.options.resourceId, fields = self.options.fields, dropdownTemplate = self.options.dropdownTemplate, addFilterTemplate = '<a class="btn btn-primary" href="#">' + self._('Add Filter') + '</a>', filtersDiv = $('<div></div>'); var filters = ckan.views.filters.get(); _appendDropdowns(filtersDiv, resourceId, dropdownTemplate, fields, filters); var addFilterButton = _buildAddFilterButton(self, filtersDiv, addFilterTemplate, fields, filters, function(evt) { var filters = {}; filters[evt.val] = []; $(this).select2('destroy'); _appendDropdowns(filtersDiv, resourceId, dropdownTemplate, fields, filters); evt.preventDefault(); }); self.el.append(filtersDiv); self.el.append(addFilterButton); }
  function _buildAddFilterButton(self, el, template, fields, filters, onChangeCallback) {
    var addFilterButton = $(template), currentFilters = Object.keys(filters), fieldsNotFiltered = $.grep(fields, function(field) { return !filters.hasOwnProperty(field); }), data = $.map(fieldsNotFiltered, function(d) { return { id: d, text: d }; }); if (data.length === 0) { return ''; }
    addFilterButton.click(function(evt) { var addFilterDiv = $('<div class="resource-view-filter"><input type="hidden"></input></div>'), addFilterInput = addFilterDiv.find('input'); el.append(addFilterDiv); addFilterInput.select2({ data: data, placeholder: self._('Select a field'), width: 'resolve', }).on('change', onChangeCallback); evt.preventDefault(); }); return addFilterButton;
  }
  function _appendDropdowns(dropdowns, resourceId, template, fields, filters) {
    $.each(fields, function(i, field) { if (filters.hasOwnProperty(field)) { dropdowns.append(_buildDropdown(self.el, template, field)); } }); return dropdowns; function _buildDropdown(el, template, filterName) {
      var theseFilters = filters[filterName] || []; template = $(template.replace(/{filter}/g, filterName)); var dropdowns = template.find('.resource-view-filter-values'); theseFilters = theseFilters.concat([undefined]); theseFilters.forEach(function(value, i) {
        var dropdown = $('<input type="hidden" name="' + filterName + '"></input>'); if (value !== undefined) { dropdown.val(value); }
        dropdowns.append(dropdown);
      }); var queryLimit = 20; dropdowns.find('input').select2({
        allowClear: true, placeholder: ' ', width: 'resolve', minimumInputLength: 0, ajax: {
          url: ckan.url('/api/3/action/datastore_search'), datatype: 'json', quietMillis: 200, cache: true, data: function(term, page) {
            var offset = (page - 1) * queryLimit, query; query = { resource_id: resourceId, limit: queryLimit, offset: offset, fields: filterName, distinct: true, sort: filterName, include_total: false }; if (term !== '') {
              var q = {}; if (term.indexOf(' ') == -1) { term = term + ':*'; query.plain = false; }
              q[filterName] = term; query.q = JSON.stringify(q);
            }
            return query;
          }, results: function(data, page) { var records = data.result.records, hasMore = (records.length == queryLimit), results; results = $.map(records, function(record) { return { id: record[filterName], text: String(record[filterName]) }; }); return { results: results, more: hasMore }; }
        }, initSelection: function(element, callback) { var data = { id: element.val(), text: element.val() }; callback(data); },
      }).on('change', _onChange); return template;
    }
  }
  function _onChange(evt) {
    var filterName = evt.currentTarget.name, filterValue = evt.val, currentFilters = ckan.views.filters.get(filterName) || [], addToIndex = currentFilters.length; currentFilters = currentFilters.slice(); if (evt.removed) { addToIndex = currentFilters.indexOf(evt.removed.id); if (addToIndex !== -1) { currentFilters.splice(addToIndex, 1); } }
    if (evt.added) { currentFilters.splice(addToIndex, 0, filterValue); }
    if (currentFilters.length > 0) { ckan.views.filters.set(filterName, currentFilters); } else { ckan.views.filters.unset(filterName); }
  }
  return { initialize: initialize, options: { dropdownTemplate: ['<div class="resource-view-filter">', '  {filter}:', '  <div class="resource-view-filter-values"></div>', '</div>',].join('\n') } };
});
this.ckan.module('table-toggle-more', function($) { return { options: {}, initialize: function() { $.proxyAll(this, /_on/); this.el.addClass('table-toggle-more'); var rows = $('.toggle-more', this.el).length; if (rows) { var cols = $('thead tr th', this.el).length; var template_more = ['<tr class="toggle-show toggle-show-more">', '<td colspan="' + cols + '">', '<small>', '<a href="#" class="show-more">' + this._('Show more') + '</a>', '<a href="#" class="show-less">' + this._('Hide') + '</a>', '</small>', '</td>', '</tr>'].join('\n'); var template_seperator = ['<tr class="toggle-seperator">', '<td colspan="' + cols + '">', '</td>', '</tr>'].join('\n'); var seperator = $(template_seperator).insertAfter($('.toggle-more:last-child', this.el)); $(template_more).insertAfter(seperator); $('.show-more', this.el).on('click', this._onShowMore); $('.show-less', this.el).on('click', this._onShowLess); } }, _onShowMore: function($e) { $e.preventDefault(); this.el.removeClass('table-toggle-more').addClass('table-toggle-less'); }, _onShowLess: function($e) { $e.preventDefault(); this.el.removeClass('table-toggle-less').addClass('table-toggle-more'); } } });
this.ckan.module('dataset-visibility', function($) { return { currentValue: false, options: { organizations: $('#field-organizations'), visibility: $('#field-private'), currentValue: null }, initialize: function() { $.proxyAll(this, /_on/); this.options.currentValue = this.options.visibility.val(); this.options.organizations.on('change', this._onOrganizationChange); this._onOrganizationChange(); }, _onOrganizationChange: function() { var value = this.options.organizations.val(); if (value) { this.options.visibility.prop('disabled', false).val(this.options.currentValue); } else { this.options.visibility.prop('disabled', true).val('False'); } } }; });
this.ckan.module('media-grid', function($) { return { initialize: function() { var wrapper = this.el; wrapper.imagesLoaded(function() { wrapper.masonry({ itemSelector: '.media-item' }); }); } }; });
this.ckan.module('image-upload', function($) {
  return {
    options: { is_url: false, is_upload: false, field_upload: 'image_upload', field_url: 'image_url', field_clear: 'clear_upload', field_name: 'name', upload_label: '' }, _nameIsDirty: false, initialize: function() {
      $.proxyAll(this, /_on/); var options = this.options; var field_upload = 'input[name="' + options.field_upload + '"]'; var field_url = 'input[name="' + options.field_url + '"]'; var field_clear = 'input[name="' + options.field_clear + '"]'; var field_name = 'input[name="' + options.field_name + '"]'; this.input = $(field_upload, this.el); this.field_url = $(field_url, this.el).parents('.form-group'); this.field_image = this.input.parents('.form-group'); this.field_url_input = $('input', this.field_url); this.field_name = this.el.parents('form').find(field_name); this.label_location = $('label[for="field-image-url"]'); this.is_data_resource = (this.options.field_url === 'url') && (this.options.field_upload === 'upload'); var checkbox = $(field_clear, this.el); if (checkbox.length > 0) { checkbox.parents('.form-group').remove(); }
      this.field_clear = $('<input type="hidden" name="' + options.field_clear + '">').appendTo(this.el); this.button_url = $('<a href="javascript:;" class="btn btn-default">' + '<i class="fa fa-globe"></i>' +
        this._('Link') + '</a>').prop('title', this._('Link to a URL on the internet (you can also link to an API)')).on('click', this._onFromWeb).insertAfter(this.input); this.button_upload = $('<a href="javascript:;" class="btn btn-default">' + '<i class="fa fa-cloud-upload"></i>' +
          this._('Upload') + '</a>').insertAfter(this.input); var removeText = this._('Remove'); $('<a href="javascript:;" class="btn btn-danger btn-remove-url">'
            + removeText + '</a>').prop('title', removeText).on('click', this._onRemove).insertBefore(this.field_url_input); $('label[for="field-image-upload"]').text(options.upload_label || this._('Image')); this.input.on('mouseover', this._onInputMouseOver).on('mouseout', this._onInputMouseOut).on('change', this._onInputChange).prop('title', this._('Upload a file on your computer')).css('width', this.button_upload.outerWidth()); this.fields = $('<i />').add(this.button_upload).add(this.button_url).add(this.input).add(this.field_url).add(this.field_image); this.field_name.on('change', this._onModifyName); if (this.field_name.val()) { this._nameIsDirty = true; }
      if (options.is_url) { this._showOnlyFieldUrl(); this._updateUrlLabel(this._('URL')); } else if (options.is_upload) { this._showOnlyFieldUrl(); this.field_url_input.prop('readonly', true); var filename = this._fileNameFromUpload(this.field_url_input.val()); this.field_url_input.val(filename); this._updateUrlLabel(this._('File')); } else { this._showOnlyButtons(); }
    }, _fileNameFromUpload: function(url) {
      if (/^\/base\/images/.test(url)) { return url; }
      url = url.substring(0, (url.indexOf("#") === -1) ? url.length : url.indexOf("#")); url = url.substring(0, (url.indexOf("?") === -1) ? url.length : url.indexOf("?")); url = url.substring(url.lastIndexOf("/") + 1, url.length); return url;
    }, _updateUrlLabel: function(label_text) {
      if (!this.is_data_resource) { return; }
      this.label_location.text(label_text);
    }, _onFromWeb: function() {
      this._showOnlyFieldUrl(); this.field_url_input.focus().on('blur', this._onFromWebBlur); if (this.options.is_upload) { this.field_clear.val('true'); }
      this._updateUrlLabel(this._('URL'));
    }, _onRemove: function() { this._showOnlyButtons(); this.field_url_input.val(''); this.field_url_input.prop('readonly', false); this.field_clear.val('true'); }, _onInputChange: function() { var file_name = this.input.val().split(/^C:\\fakepath\\/).pop(); this.field_url_input.val(file_name); this.field_url_input.prop('readonly', true); this.field_clear.val(''); this._showOnlyFieldUrl(); this._autoName(file_name); this._updateUrlLabel(this._('File')); }, _showOnlyButtons: function() { this.fields.hide(); this.button_upload.add(this.field_image).add(this.button_url).add(this.input).show(); }, _showOnlyFieldUrl: function() { this.fields.hide(); this.field_url.show(); }, _onInputMouseOver: function() { this.button_upload.addClass('hover'); }, _onInputMouseOut: function() { this.button_upload.removeClass('hover'); }, _onModifyName: function() { this._nameIsDirty = true; }, _onFromWebBlur: function() {
      var url = this.field_url_input.val().match(/([^\/]+)\/?$/)
      if (url) { this._autoName(url.pop()); }
    }, _autoName: function(name) { if (!this._nameIsDirty) { this.field_name.val(name); } }
  };
});
this.ckan.module('followers-counter', function($) {
  'use strict'; return {
    options: { id: null, num_followers: 0 }, initialize: function() { $.proxyAll(this, /_on/); this.counterEl = this.$('span'); this.objId = this.options.id; this.sandbox.subscribe('follow-follow-' + this.objId, this._onFollow); this.sandbox.subscribe('follow-unfollow-' + this.objId, this._onUnfollow); }, _onFollow: function() { this._updateCounter({ action: 'follow' }); }, _onUnfollow: function() { this._updateCounter({ action: 'unfollow' }); }, _updateCounter: function(options) {
      var locale = $('html').attr('lang'); var action = options.action; var incrementedFollowers; if (action === 'follow') { incrementedFollowers = (++this.options.num_followers).toLocaleString(locale); } else if (action === 'unfollow') { incrementedFollowers = (--this.options.num_followers).toLocaleString(locale); }
      if (this.options.num_followers < 1000) { this.counterEl.text(incrementedFollowers); this.counterEl.removeAttr('title'); } else { this.counterEl.attr('title', incrementedFollowers); }
    }, teardown: function() { this.sandbox.unsubscribe('follow-follow-' + this.objId, this._onFollow); this.sandbox.unsubscribe('follow-unfollow-' + this.objId, this._onUnfollow); }
  }
});
