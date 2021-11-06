/*! For license information please see main.c4fa00c876ff7a67480e.js.LICENSE.txt */
(()=>{var e={766:(e,t,n)=>{var o;!function(){"use strict";var r=function(){this.init()};r.prototype={init:function(){var e=this||a;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var t=this||a;if(e=parseFloat(e),t.ctx||p(),void 0!==e&&e>=0&&e<=1){if(t._volume=e,t._muted)return t;t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e,a.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var o=t._howls[n]._getSoundIds(),r=0;r<o.length;r++){var i=t._howls[n]._soundById(o[r]);i&&i._node&&(i._node.volume=i._volume*e)}return t}return t._volume},mute:function(e){var t=this||a;t.ctx||p(),t._muted=e,t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e?0:t._volume,a.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var o=t._howls[n]._getSoundIds(),r=0;r<o.length;r++){var i=t._howls[n]._soundById(o[r]);i&&i._node&&(i._node.muted=!!e||i._muted)}return t},stop:function(){for(var e=this||a,t=0;t<e._howls.length;t++)e._howls[t].stop();return e},unload:function(){for(var e=this||a,t=e._howls.length-1;t>=0;t--)e._howls[t].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,p()),e},codecs:function(e){return(this||a)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||a;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch(t){e.noAudio=!0}else e.noAudio=!0;try{(new Audio).muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||a,t=null;try{t="undefined"!=typeof Audio?new Audio:null}catch(t){return e}if(!t||"function"!=typeof t.canPlayType)return e;var n=t.canPlayType("audio/mpeg;").replace(/^no$/,""),o=e._navigator?e._navigator.userAgent:"",r=o.match(/OPR\/([0-6].)/g),i=r&&parseInt(r[0].split("/")[1],10)<33,u=-1!==o.indexOf("Safari")&&-1===o.indexOf("Chrome"),s=o.match(/Version\/(.*?) /),d=u&&s&&parseInt(s[1],10)<15;return e._codecs={mp3:!(i||!n&&!t.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!n,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(t.canPlayType('audio/wav; codecs="1"')||t.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(t.canPlayType("audio/x-m4b;")||t.canPlayType("audio/m4b;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!(d||!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!(d||!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||a;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var t=function(n){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var o=new Audio;o._unlocked=!0,e._releaseHtml5Audio(o)}catch(n){e.noAudio=!0;break}for(var r=0;r<e._howls.length;r++)if(!e._howls[r]._webAudio)for(var a=e._howls[r]._getSoundIds(),i=0;i<a.length;i++){var u=e._howls[r]._soundById(a[i]);u&&u._node&&!u._node._unlocked&&(u._node._unlocked=!0,u._node.load())}e._autoResume();var s=e.ctx.createBufferSource();s.buffer=e._scratchBuffer,s.connect(e.ctx.destination),void 0===s.start?s.noteOn(0):s.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),s.onended=function(){s.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",t,!0),document.removeEventListener("touchend",t,!0),document.removeEventListener("click",t,!0),document.removeEventListener("keydown",t,!0);for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("unlock")}};return document.addEventListener("touchstart",t,!0),document.addEventListener("touchend",t,!0),document.addEventListener("click",t,!0),document.addEventListener("keydown",t,!0),e}},_obtainHtml5Audio:function(){var e=this||a;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var t=(new Audio).play();return t&&"undefined"!=typeof Promise&&(t instanceof Promise||"function"==typeof t.then)&&t.catch((function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")})),new Audio},_releaseHtml5Audio:function(e){var t=this||a;return e._unlocked&&t._html5AudioPool.push(e),t},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&a.usingWebAudio){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var n=0;n<e._howls[t]._sounds.length;n++)if(!e._howls[t]._sounds[n]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout((function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending";var t=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(t,t)}}),3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&a.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then((function(){e.state="running";for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("resume")})),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var a=new r,i=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")};i.prototype={init:function(e){var t=this;return a.ctx||p(),t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._playLock=!1,t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onunlock=e.onunlock?[{fn:e.onunlock}]:[],t._onresume=[],t._webAudio=a.usingWebAudio&&!t._html5,void 0!==a.ctx&&a.ctx&&a.autoUnlock&&a._unlockAudio(),a._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&"none"!==t._preload&&t.load(),t},load:function(){var e=this,t=null;if(a.noAudio)e._emit("loaderror",null,"No audio support.");else{"string"==typeof e._src&&(e._src=[e._src]);for(var n=0;n<e._src.length;n++){var o,r;if(e._format&&e._format[n])o=e._format[n];else{if("string"!=typeof(r=e._src[n])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}(o=/^data:audio\/([^;,]+);/i.exec(r))||(o=/\.([^.]+)$/.exec(r.split("?",1)[0])),o&&(o=o[1].toLowerCase())}if(o||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),o&&a.codecs(o)){t=e._src[n];break}}if(t)return e._src=t,e._state="loading","https:"===window.location.protocol&&"http:"===t.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new u(e),e._webAudio&&d(e),e;e._emit("loaderror",null,"No codec support for selected audio sources.")}},play:function(e,t){var n=this,o=null;if("number"==typeof e)o=e,e=null;else{if("string"==typeof e&&"loaded"===n._state&&!n._sprite[e])return null;if(void 0===e&&(e="__default",!n._playLock)){for(var r=0,i=0;i<n._sounds.length;i++)n._sounds[i]._paused&&!n._sounds[i]._ended&&(r++,o=n._sounds[i]._id);1===r?e=null:o=null}}var u=o?n._soundById(o):n._inactiveSound();if(!u)return null;if(o&&!e&&(e=u._sprite||"__default"),"loaded"!==n._state){u._sprite=e,u._ended=!1;var s=u._id;return n._queue.push({event:"play",action:function(){n.play(s)}}),s}if(o&&!u._paused)return t||n._loadQueue("play"),u._id;n._webAudio&&a._autoResume();var d=Math.max(0,u._seek>0?u._seek:n._sprite[e][0]/1e3),_=Math.max(0,(n._sprite[e][0]+n._sprite[e][1])/1e3-d),l=1e3*_/Math.abs(u._rate),c=n._sprite[e][0]/1e3,p=(n._sprite[e][0]+n._sprite[e][1])/1e3;u._sprite=e,u._ended=!1;var f=function(){u._paused=!1,u._seek=d,u._start=c,u._stop=p,u._loop=!(!u._loop&&!n._sprite[e][2])};if(!(d>=p)){var m=u._node;if(n._webAudio){var v=function(){n._playLock=!1,f(),n._refreshBuffer(u);var e=u._muted||n._muted?0:u._volume;m.gain.setValueAtTime(e,a.ctx.currentTime),u._playStart=a.ctx.currentTime,void 0===m.bufferSource.start?u._loop?m.bufferSource.noteGrainOn(0,d,86400):m.bufferSource.noteGrainOn(0,d,_):u._loop?m.bufferSource.start(0,d,86400):m.bufferSource.start(0,d,_),l!==1/0&&(n._endTimers[u._id]=setTimeout(n._ended.bind(n,u),l)),t||setTimeout((function(){n._emit("play",u._id),n._loadQueue()}),0)};"running"===a.state&&"interrupted"!==a.ctx.state?v():(n._playLock=!0,n.once("resume",v),n._clearTimer(u._id))}else{var h=function(){m.currentTime=d,m.muted=u._muted||n._muted||a._muted||m.muted,m.volume=u._volume*a.volume(),m.playbackRate=u._rate;try{var o=m.play();if(o&&"undefined"!=typeof Promise&&(o instanceof Promise||"function"==typeof o.then)?(n._playLock=!0,f(),o.then((function(){n._playLock=!1,m._unlocked=!0,t?n._loadQueue():n._emit("play",u._id)})).catch((function(){n._playLock=!1,n._emit("playerror",u._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),u._ended=!0,u._paused=!0}))):t||(n._playLock=!1,f(),n._emit("play",u._id)),m.playbackRate=u._rate,m.paused)return void n._emit("playerror",u._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||u._loop?n._endTimers[u._id]=setTimeout(n._ended.bind(n,u),l):(n._endTimers[u._id]=function(){n._ended(u),m.removeEventListener("ended",n._endTimers[u._id],!1)},m.addEventListener("ended",n._endTimers[u._id],!1))}catch(e){n._emit("playerror",u._id,e)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===m.src&&(m.src=n._src,m.load());var g=window&&window.ejecta||!m.readyState&&a._navigator.isCocoonJS;if(m.readyState>=3||g)h();else{n._playLock=!0,n._state="loading";var y=function(){n._state="loaded",h(),m.removeEventListener(a._canPlayEvent,y,!1)};m.addEventListener(a._canPlayEvent,y,!1),n._clearTimer(u._id)}}return u._id}n._ended(u)},pause:function(e){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"pause",action:function(){t.pause(e)}}),t;for(var n=t._getSoundIds(e),o=0;o<n.length;o++){t._clearTimer(n[o]);var r=t._soundById(n[o]);if(r&&!r._paused&&(r._seek=t.seek(n[o]),r._rateSeek=0,r._paused=!0,t._stopFade(n[o]),r._node))if(t._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),t._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||t._emit("pause",r?r._id:null)}return t},stop:function(e,t){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"stop",action:function(){n.stop(e)}}),n;for(var o=n._getSoundIds(e),r=0;r<o.length;r++){n._clearTimer(o[r]);var a=n._soundById(o[r]);a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,n._stopFade(o[r]),a._node&&(n._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),n._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause(),a._node.duration===1/0&&n._clearSound(a._node))),t||n._emit("stop",a._id))}return n},mute:function(e,t){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"mute",action:function(){n.mute(e,t)}}),n;if(void 0===t){if("boolean"!=typeof e)return n._muted;n._muted=e}for(var o=n._getSoundIds(t),r=0;r<o.length;r++){var i=n._soundById(o[r]);i&&(i._muted=e,i._interval&&n._stopFade(i._id),n._webAudio&&i._node?i._node.gain.setValueAtTime(e?0:i._volume,a.ctx.currentTime):i._node&&(i._node.muted=!!a._muted||e),n._emit("mute",i._id))}return n},volume:function(){var e,t,n,o=this,r=arguments;if(0===r.length)return o._volume;if(1===r.length||2===r.length&&void 0===r[1]){var i=o._getSoundIds(),u=i.indexOf(r[0]);u>=0?t=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),t=parseInt(r[1],10));if(!(void 0!==e&&e>=0&&e<=1))return(n=t?o._soundById(t):o._sounds[0])?n._volume:0;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,r)}}),o;void 0===t&&(o._volume=e),t=o._getSoundIds(t);for(var s=0;s<t.length;s++)(n=o._soundById(t[s]))&&(n._volume=e,r[2]||o._stopFade(t[s]),o._webAudio&&n._node&&!n._muted?n._node.gain.setValueAtTime(e,a.ctx.currentTime):n._node&&!n._muted&&(n._node.volume=e*a.volume()),o._emit("volume",n._id));return o},fade:function(e,t,n,o){var r=this;if("loaded"!==r._state||r._playLock)return r._queue.push({event:"fade",action:function(){r.fade(e,t,n,o)}}),r;e=Math.min(Math.max(0,parseFloat(e)),1),t=Math.min(Math.max(0,parseFloat(t)),1),n=parseFloat(n),r.volume(e,o);for(var i=r._getSoundIds(o),u=0;u<i.length;u++){var s=r._soundById(i[u]);if(s){if(o||r._stopFade(i[u]),r._webAudio&&!s._muted){var d=a.ctx.currentTime,_=d+n/1e3;s._volume=e,s._node.gain.setValueAtTime(e,d),s._node.gain.linearRampToValueAtTime(t,_)}r._startFadeInterval(s,e,t,n,i[u],void 0===o)}}return r},_startFadeInterval:function(e,t,n,o,r,a){var i=this,u=t,s=n-t,d=Math.abs(s/.01),_=Math.max(4,d>0?o/d:o),l=Date.now();e._fadeTo=n,e._interval=setInterval((function(){var r=(Date.now()-l)/o;l=Date.now(),u+=s*r,u=Math.round(100*u)/100,u=s<0?Math.max(n,u):Math.min(n,u),i._webAudio?e._volume=u:i.volume(u,e._id,!0),a&&(i._volume=u),(n<t&&u<=n||n>t&&u>=n)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,i.volume(n,e._id),i._emit("fade",e._id))}),_)},_stopFade:function(e){var t=this,n=t._soundById(e);return n&&n._interval&&(t._webAudio&&n._node.gain.cancelScheduledValues(a.ctx.currentTime),clearInterval(n._interval),n._interval=null,t.volume(n._fadeTo,e),n._fadeTo=null,t._emit("fade",e)),t},loop:function(){var e,t,n,o=this,r=arguments;if(0===r.length)return o._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(n=o._soundById(parseInt(r[0],10)))&&n._loop;e=r[0],o._loop=e}else 2===r.length&&(e=r[0],t=parseInt(r[1],10));for(var a=o._getSoundIds(t),i=0;i<a.length;i++)(n=o._soundById(a[i]))&&(n._loop=e,o._webAudio&&n._node&&n._node.bufferSource&&(n._node.bufferSource.loop=e,e&&(n._node.bufferSource.loopStart=n._start||0,n._node.bufferSource.loopEnd=n._stop,o.playing(a[i])&&(o.pause(a[i],!0),o.play(a[i],!0)))));return o},rate:function(){var e,t,n,o=this,r=arguments;if(0===r.length)t=o._sounds[0]._id;else if(1===r.length){var i=o._getSoundIds(),u=i.indexOf(r[0]);u>=0?t=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),t=parseInt(r[1],10));if("number"!=typeof e)return(n=o._soundById(t))?n._rate:o._rate;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,r)}}),o;void 0===t&&(o._rate=e),t=o._getSoundIds(t);for(var s=0;s<t.length;s++)if(n=o._soundById(t[s])){o.playing(t[s])&&(n._rateSeek=o.seek(t[s]),n._playStart=o._webAudio?a.ctx.currentTime:n._playStart),n._rate=e,o._webAudio&&n._node&&n._node.bufferSource?n._node.bufferSource.playbackRate.setValueAtTime(e,a.ctx.currentTime):n._node&&(n._node.playbackRate=e);var d=o.seek(t[s]),_=(o._sprite[n._sprite][0]+o._sprite[n._sprite][1])/1e3-d,l=1e3*_/Math.abs(n._rate);!o._endTimers[t[s]]&&n._paused||(o._clearTimer(t[s]),o._endTimers[t[s]]=setTimeout(o._ended.bind(o,n),l)),o._emit("rate",n._id)}return o},seek:function(){var e,t,n=this,o=arguments;if(0===o.length)n._sounds.length&&(t=n._sounds[0]._id);else if(1===o.length){var r=n._getSoundIds(),i=r.indexOf(o[0]);i>=0?t=parseInt(o[0],10):n._sounds.length&&(t=n._sounds[0]._id,e=parseFloat(o[0]))}else 2===o.length&&(e=parseFloat(o[0]),t=parseInt(o[1],10));if(void 0===t)return 0;if("number"==typeof e&&("loaded"!==n._state||n._playLock))return n._queue.push({event:"seek",action:function(){n.seek.apply(n,o)}}),n;var u=n._soundById(t);if(u){if(!("number"==typeof e&&e>=0)){if(n._webAudio){var s=n.playing(t)?a.ctx.currentTime-u._playStart:0,d=u._rateSeek?u._rateSeek-u._seek:0;return u._seek+(d+s*Math.abs(u._rate))}return u._node.currentTime}var _=n.playing(t);_&&n.pause(t,!0),u._seek=e,u._ended=!1,n._clearTimer(t),n._webAudio||!u._node||isNaN(u._node.duration)||(u._node.currentTime=e);var l=function(){_&&n.play(t,!0),n._emit("seek",t)};if(_&&!n._webAudio){var c=function(){n._playLock?setTimeout(c,0):l()};setTimeout(c,0)}else l()}return n},playing:function(e){var t=this;if("number"==typeof e){var n=t._soundById(e);return!!n&&!n._paused}for(var o=0;o<t._sounds.length;o++)if(!t._sounds[o]._paused)return!0;return!1},duration:function(e){var t=this,n=t._duration,o=t._soundById(e);return o&&(n=t._sprite[o._sprite][1]/1e3),n},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,n=0;n<t.length;n++)t[n]._paused||e.stop(t[n]._id),e._webAudio||(e._clearSound(t[n]._node),t[n]._node.removeEventListener("error",t[n]._errorFn,!1),t[n]._node.removeEventListener(a._canPlayEvent,t[n]._loadFn,!1),t[n]._node.removeEventListener("ended",t[n]._endFn,!1),a._releaseHtml5Audio(t[n]._node)),delete t[n]._node,e._clearTimer(t[n]._id);var o=a._howls.indexOf(e);o>=0&&a._howls.splice(o,1);var r=!0;for(n=0;n<a._howls.length;n++)if(a._howls[n]._src===e._src||e._src.indexOf(a._howls[n]._src)>=0){r=!1;break}return s&&r&&delete s[e._src],a.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,t,n,o){var r=this["_on"+e];return"function"==typeof t&&r.push(o?{id:n,fn:t,once:o}:{id:n,fn:t}),this},off:function(e,t,n){var o=this,r=o["_on"+e],a=0;if("number"==typeof t&&(n=t,t=null),t||n)for(a=0;a<r.length;a++){var i=n===r[a].id;if(t===r[a].fn&&i||!t&&i){r.splice(a,1);break}}else if(e)o["_on"+e]=[];else{var u=Object.keys(o);for(a=0;a<u.length;a++)0===u[a].indexOf("_on")&&Array.isArray(o[u[a]])&&(o[u[a]]=[])}return o},once:function(e,t,n){return this.on(e,t,n,1),this},_emit:function(e,t,n){for(var o=this,r=o["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==t&&"load"!==e||(setTimeout(function(e){e.call(this,t,n)}.bind(o,r[a].fn),0),r[a].once&&o.off(e,r[a].fn,r[a].id));return o._loadQueue(e),o},_loadQueue:function(e){var t=this;if(t._queue.length>0){var n=t._queue[0];n.event===e&&(t._queue.shift(),t._loadQueue()),e||n.action()}return t},_ended:function(e){var t=this,n=e._sprite;if(!t._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(t._ended.bind(t,e),100),t;var o=!(!e._loop&&!t._sprite[n][2]);if(t._emit("end",e._id),!t._webAudio&&o&&t.stop(e._id,!0).play(e._id),t._webAudio&&o){t._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=a.ctx.currentTime;var r=1e3*(e._stop-e._start)/Math.abs(e._rate);t._endTimers[e._id]=setTimeout(t._ended.bind(t,e),r)}return t._webAudio&&!o&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,t._clearTimer(e._id),t._cleanBuffer(e._node),a._autoSuspend()),t._webAudio||o||t.stop(e._id,!0),t},_clearTimer:function(e){var t=this;if(t._endTimers[e]){if("function"!=typeof t._endTimers[e])clearTimeout(t._endTimers[e]);else{var n=t._soundById(e);n&&n._node&&n._node.removeEventListener("ended",t._endTimers[e],!1)}delete t._endTimers[e]}return t},_soundById:function(e){for(var t=this,n=0;n<t._sounds.length;n++)if(e===t._sounds[n]._id)return t._sounds[n];return null},_inactiveSound:function(){var e=this;e._drain();for(var t=0;t<e._sounds.length;t++)if(e._sounds[t]._ended)return e._sounds[t].reset();return new u(e)},_drain:function(){var e=this,t=e._pool,n=0,o=0;if(!(e._sounds.length<t)){for(o=0;o<e._sounds.length;o++)e._sounds[o]._ended&&n++;for(o=e._sounds.length-1;o>=0;o--){if(n<=t)return;e._sounds[o]._ended&&(e._webAudio&&e._sounds[o]._node&&e._sounds[o]._node.disconnect(0),e._sounds.splice(o,1),n--)}}},_getSoundIds:function(e){if(void 0===e){for(var t=[],n=0;n<this._sounds.length;n++)t.push(this._sounds[n]._id);return t}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=a.ctx.createBufferSource(),e._node.bufferSource.buffer=s[this._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,a.ctx.currentTime),this},_cleanBuffer:function(e){var t=a._navigator&&a._navigator.vendor.indexOf("Apple")>=0;if(a._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),t))try{e.bufferSource.buffer=a._scratchBuffer}catch(e){}return e.bufferSource=null,this},_clearSound:function(e){/MSIE |Trident\//.test(a._navigator&&a._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var u=function(e){this._parent=e,this.init()};u.prototype={init:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++a._counter,t._sounds.push(e),e.create(),e},create:function(){var e=this,t=e._parent,n=a._muted||e._muted||e._parent._muted?0:e._volume;return t._webAudio?(e._node=void 0===a.ctx.createGain?a.ctx.createGainNode():a.ctx.createGain(),e._node.gain.setValueAtTime(n,a.ctx.currentTime),e._node.paused=!0,e._node.connect(a.masterGain)):a.noAudio||(e._node=a._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(a._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=t._src,e._node.preload=!0===t._preload?"auto":t._preload,e._node.volume=n*a.volume(),e._node.load()),e},reset:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++a._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,t=e._parent;t._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(t._sprite).length&&(t._sprite={__default:[0,1e3*t._duration]}),"loaded"!==t._state&&(t._state="loaded",t._emit("load"),t._loadQueue()),e._node.removeEventListener(a._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,t=e._parent;t._duration===1/0&&(t._duration=Math.ceil(10*e._node.duration)/10,t._sprite.__default[1]===1/0&&(t._sprite.__default[1]=1e3*t._duration),t._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var s={},d=function(e){var t=e._src;if(s[t])return e._duration=s[t].duration,void c(e);if(/^data:[^;]+;base64,/.test(t)){for(var n=atob(t.split(",")[1]),o=new Uint8Array(n.length),r=0;r<n.length;++r)o[r]=n.charCodeAt(r);l(o.buffer,e)}else{var a=new XMLHttpRequest;a.open(e._xhr.method,t,!0),a.withCredentials=e._xhr.withCredentials,a.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach((function(t){a.setRequestHeader(t,e._xhr.headers[t])})),a.onload=function(){var t=(a.status+"")[0];"0"===t||"2"===t||"3"===t?l(a.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+a.status+".")},a.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete s[t],e.load())},_(a)}},_=function(e){try{e.send()}catch(t){e.onerror()}},l=function(e,t){var n=function(){t._emit("loaderror",null,"Decoding audio data failed.")},o=function(e){e&&t._sounds.length>0?(s[t._src]=e,c(t,e)):n()};"undefined"!=typeof Promise&&1===a.ctx.decodeAudioData.length?a.ctx.decodeAudioData(e).then(o).catch(n):a.ctx.decodeAudioData(e,o,n)},c=function(e,t){t&&!e._duration&&(e._duration=t.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},p=function(){if(a.usingWebAudio){try{"undefined"!=typeof AudioContext?a.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?a.ctx=new webkitAudioContext:a.usingWebAudio=!1}catch(e){a.usingWebAudio=!1}a.ctx||(a.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(a._navigator&&a._navigator.platform),t=a._navigator&&a._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),n=t?parseInt(t[1],10):null;if(e&&n&&n<9){var o=/safari/.test(a._navigator&&a._navigator.userAgent.toLowerCase());a._navigator&&!o&&(a.usingWebAudio=!1)}a.usingWebAudio&&(a.masterGain=void 0===a.ctx.createGain?a.ctx.createGainNode():a.ctx.createGain(),a.masterGain.gain.setValueAtTime(a._muted?0:a._volume,a.ctx.currentTime),a.masterGain.connect(a.ctx.destination)),a._setup()}};void 0===(o=function(){return{Howler:a,Howl:i}}.apply(t,[]))||(e.exports=o),t.Howler=a,t.Howl=i,void 0!==n.g?(n.g.HowlerGlobal=r,n.g.Howler=a,n.g.Howl=i,n.g.Sound=u):"undefined"!=typeof window&&(window.HowlerGlobal=r,window.Howler=a,window.Howl=i,window.Sound=u)}(),function(){"use strict";var e;HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var t=this;if(!t.ctx||!t.ctx.listener)return t;for(var n=t._howls.length-1;n>=0;n--)t._howls[n].stereo(e);return t},HowlerGlobal.prototype.pos=function(e,t,n){var o=this;return o.ctx&&o.ctx.listener?(t="number"!=typeof t?o._pos[1]:t,n="number"!=typeof n?o._pos[2]:n,"number"!=typeof e?o._pos:(o._pos=[e,t,n],void 0!==o.ctx.listener.positionX?(o.ctx.listener.positionX.setTargetAtTime(o._pos[0],Howler.ctx.currentTime,.1),o.ctx.listener.positionY.setTargetAtTime(o._pos[1],Howler.ctx.currentTime,.1),o.ctx.listener.positionZ.setTargetAtTime(o._pos[2],Howler.ctx.currentTime,.1)):o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,t,n,o,r,a){var i=this;if(!i.ctx||!i.ctx.listener)return i;var u=i._orientation;return t="number"!=typeof t?u[1]:t,n="number"!=typeof n?u[2]:n,o="number"!=typeof o?u[3]:o,r="number"!=typeof r?u[4]:r,a="number"!=typeof a?u[5]:a,"number"!=typeof e?u:(i._orientation=[e,t,n,o,r,a],void 0!==i.ctx.listener.forwardX?(i.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),i.ctx.listener.forwardY.setTargetAtTime(t,Howler.ctx.currentTime,.1),i.ctx.listener.forwardZ.setTargetAtTime(n,Howler.ctx.currentTime,.1),i.ctx.listener.upX.setTargetAtTime(o,Howler.ctx.currentTime,.1),i.ctx.listener.upY.setTargetAtTime(r,Howler.ctx.currentTime,.1),i.ctx.listener.upZ.setTargetAtTime(a,Howler.ctx.currentTime,.1)):i.ctx.listener.setOrientation(e,t,n,o,r,a),i)},Howl.prototype.init=(e=Howl.prototype.init,function(t){var n=this;return n._orientation=t.orientation||[1,0,0],n._stereo=t.stereo||null,n._pos=t.pos||null,n._pannerAttr={coneInnerAngle:void 0!==t.coneInnerAngle?t.coneInnerAngle:360,coneOuterAngle:void 0!==t.coneOuterAngle?t.coneOuterAngle:360,coneOuterGain:void 0!==t.coneOuterGain?t.coneOuterGain:0,distanceModel:void 0!==t.distanceModel?t.distanceModel:"inverse",maxDistance:void 0!==t.maxDistance?t.maxDistance:1e4,panningModel:void 0!==t.panningModel?t.panningModel:"HRTF",refDistance:void 0!==t.refDistance?t.refDistance:1,rolloffFactor:void 0!==t.rolloffFactor?t.rolloffFactor:1},n._onstereo=t.onstereo?[{fn:t.onstereo}]:[],n._onpos=t.onpos?[{fn:t.onpos}]:[],n._onorientation=t.onorientation?[{fn:t.onorientation}]:[],e.call(this,t)}),Howl.prototype.stereo=function(e,n){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(e,n)}}),o;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===n){if("number"!=typeof e)return o._stereo;o._stereo=e,o._pos=[e,0,0]}for(var a=o._getSoundIds(n),i=0;i<a.length;i++){var u=o._soundById(a[i]);if(u){if("number"!=typeof e)return u._stereo;u._stereo=e,u._pos=[e,0,0],u._node&&(u._pannerAttr.panningModel="equalpower",u._panner&&u._panner.pan||t(u,r),"spatial"===r?void 0!==u._panner.positionX?(u._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):u._panner.setPosition(e,0,0):u._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),o._emit("stereo",u._id)}}return o},Howl.prototype.pos=function(e,n,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"pos",action:function(){a.pos(e,n,o,r)}}),a;if(n="number"!=typeof n?0:n,o="number"!=typeof o?-.5:o,void 0===r){if("number"!=typeof e)return a._pos;a._pos=[e,n,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var s=a._soundById(i[u]);if(s){if("number"!=typeof e)return s._pos;s._pos=[e,n,o],s._node&&(s._panner&&!s._panner.pan||t(s,"spatial"),void 0!==s._panner.positionX?(s._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),s._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),s._panner.positionZ.setValueAtTime(o,Howler.ctx.currentTime)):s._panner.setPosition(e,n,o)),a._emit("pos",s._id)}}return a},Howl.prototype.orientation=function(e,n,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"orientation",action:function(){a.orientation(e,n,o,r)}}),a;if(n="number"!=typeof n?a._orientation[1]:n,o="number"!=typeof o?a._orientation[2]:o,void 0===r){if("number"!=typeof e)return a._orientation;a._orientation=[e,n,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var s=a._soundById(i[u]);if(s){if("number"!=typeof e)return s._orientation;s._orientation=[e,n,o],s._node&&(s._panner||(s._pos||(s._pos=a._pos||[0,0,-.5]),t(s,"spatial")),void 0!==s._panner.orientationX?(s._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),s._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),s._panner.orientationZ.setValueAtTime(o,Howler.ctx.currentTime)):s._panner.setOrientation(e,n,o)),a._emit("orientation",s._id)}}return a},Howl.prototype.pannerAttr=function(){var e,n,o,r=this,a=arguments;if(!r._webAudio)return r;if(0===a.length)return r._pannerAttr;if(1===a.length){if("object"!=typeof a[0])return(o=r._soundById(parseInt(a[0],10)))?o._pannerAttr:r._pannerAttr;e=a[0],void 0===n&&(e.pannerAttr||(e.pannerAttr={coneInnerAngle:e.coneInnerAngle,coneOuterAngle:e.coneOuterAngle,coneOuterGain:e.coneOuterGain,distanceModel:e.distanceModel,maxDistance:e.maxDistance,refDistance:e.refDistance,rolloffFactor:e.rolloffFactor,panningModel:e.panningModel}),r._pannerAttr={coneInnerAngle:void 0!==e.pannerAttr.coneInnerAngle?e.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==e.pannerAttr.coneOuterAngle?e.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==e.pannerAttr.coneOuterGain?e.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==e.pannerAttr.distanceModel?e.pannerAttr.distanceModel:r._distanceModel,maxDistance:void 0!==e.pannerAttr.maxDistance?e.pannerAttr.maxDistance:r._maxDistance,refDistance:void 0!==e.pannerAttr.refDistance?e.pannerAttr.refDistance:r._refDistance,rolloffFactor:void 0!==e.pannerAttr.rolloffFactor?e.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:void 0!==e.pannerAttr.panningModel?e.pannerAttr.panningModel:r._panningModel})}else 2===a.length&&(e=a[0],n=parseInt(a[1],10));for(var i=r._getSoundIds(n),u=0;u<i.length;u++)if(o=r._soundById(i[u])){var s=o._pannerAttr;s={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:s.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:s.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:s.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:s.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:s.maxDistance,refDistance:void 0!==e.refDistance?e.refDistance:s.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:s.rolloffFactor,panningModel:void 0!==e.panningModel?e.panningModel:s.panningModel};var d=o._panner;d?(d.coneInnerAngle=s.coneInnerAngle,d.coneOuterAngle=s.coneOuterAngle,d.coneOuterGain=s.coneOuterGain,d.distanceModel=s.distanceModel,d.maxDistance=s.maxDistance,d.refDistance=s.refDistance,d.rolloffFactor=s.rolloffFactor,d.panningModel=s.panningModel):(o._pos||(o._pos=r._pos||[0,0,-.5]),t(o,"spatial"))}return r},Sound.prototype.init=function(e){return function(){var t=this,n=t._parent;t._orientation=n._orientation,t._stereo=n._stereo,t._pos=n._pos,t._pannerAttr=n._pannerAttr,e.call(this),t._stereo?n.stereo(t._stereo):t._pos&&n.pos(t._pos[0],t._pos[1],t._pos[2],t._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var t=this,n=t._parent;return t._orientation=n._orientation,t._stereo=n._stereo,t._pos=n._pos,t._pannerAttr=n._pannerAttr,t._stereo?n.stereo(t._stereo):t._pos?n.pos(t._pos[0],t._pos[1],t._pos[2],t._id):t._panner&&(t._panner.disconnect(0),t._panner=void 0,n._refreshBuffer(t)),e.call(this)}}(Sound.prototype.reset);var t=function(e,t){"spatial"===(t=t||"spatial")?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}()},774:()=>{window.onload=()=>{document.querySelectorAll(".conrtolBtn").forEach((e=>{e.addEventListener("click",(()=>{document.querySelectorAll(".tab").forEach((e=>{e.classList.remove("active")})),document.querySelector(`#${e.dataset.id}`).classList.add("active")}))}))}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");o.length&&(e=o[o.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{"use strict";const e=document.getElementById("output");function t(t){e.innerHTML=`\n        <span style="color: red;">\n            ${t}\n        </span>\n    `}const o=864e5,r=e=>parseFloat(e.toFixed(1));class a{constructor(e,t){this.days=()=>r(this.difference/o),this.weeks=()=>r(this.days()/7),this.hours=()=>r(this.difference/36e5),this.minutes=()=>r(this.difference/6e4),this.seconds=()=>r(this.difference/1e3),this.months=()=>{let e=12*(this.date1.getFullYear()-this.date2.getFullYear());e+=this.date1.getMonth()-this.date2.getMonth();const t=this.endOfMonth(this.date2).getDate();return e+=this.date1.getDate()/t-this.date2.getDate()/t,r(e)},this.years=()=>{let e=this.date1.getFullYear()-this.date2.getFullYear();return e+=(this.dayOfYear(this.date1)-this.dayOfYear(this.date2))/this.daysInYear(this.date2),r(e)},this.endOfMonth=e=>new Date(e.getFullYear(),e.getMonth()+1,0),this.dayOfYear=e=>(e.getTime()-this.beginOfYear(e).getTime())/o,this.daysInYear=e=>(this.endOfYear(e).getTime()-this.beginOfYear(e).getTime())/o,this.beginOfYear=e=>new Date(e.getFullYear(),0,0),this.endOfYear=e=>new Date(e.getFullYear()+1,0,0),this.date1=e,this.date2=t,this.difference=Math.floor(e.getTime()-t.getTime())}}Date.diff=(e,t)=>new a(e,t);const i=document.getElementById("calcDate");i.onsubmit=n=>{n.preventDefault();const o=new FormData(i),r=o.get("dateFrom"),u=o.get("dateTo");if(!r||!u)return void t("Ошибка, заполните оба поля!");const s=((e,t)=>{e<t&&([e,t]=[t,e]);const n=new a(new Date(e),new Date(t));return{years:Math.floor(n.years()),months:Math.floor(n.months()),days:Math.floor(n.days())}})(r,u);!function({years:t,months:n,days:o}){e.innerHTML=`\n        Годы: ${t}\n        Месяцы: ${n}\n        Дни: ${o}\n    `}(s)};const u=document.getElementById("timerCtrl"),s=document.getElementById("started"),d=e=>{clearInterval(e),s.dataset.started=0,u.innerHTML="Старт"};var _=n(766);const l=n.p+"3d5218ad6db0392bff963151eee903e0.mp3",c=new _.Howl({src:[l]}),p=document.getElementById("timerCtrl"),f=document.getElementById("timer"),m=document.getElementById("started");f.onsubmit=e=>{e.preventDefault(),new FormData(f).get("timerSet")?0==m.dataset.started?m.dataset.started=(()=>{p.innerHTML="Стоп";const e=setInterval((()=>{const t=document.querySelector("#timerSet");if(t.value>0)t.value=t.value-1;else{d(e);const t=c.play();setTimeout((()=>{c.stop(t)}),1e3)}}),1e3);return e})():d(m.dataset.started):t("Введите количество секунд")},n(774)})()})();