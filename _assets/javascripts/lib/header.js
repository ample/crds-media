if (typeof window.CRDS === 'undefined') {
  window.CRDS = {};
}

CRDS.Header = (function() {
  class Header {
    constructor(sel) {
      this.update = this.update.bind(this);
      this.expire = this.expire.bind(this);
      this.session_key = `${CRDS.media.prefix}sessionId`;
      this.auth = new ReactiveAuth(this.session_key);
      this.auth.subscribe();
      this.setup();
      this.events();
      if (this.has_existing_session()) {
        this.update();
      }
    }

    setup() {
      this.log('setup()');
      this.profile_image = ko.observable(this.defaults.profile_image);
      this.name = ko.observable(this.defaults.name);
      this.is_authenticated = ko.observable(this.has_existing_session());
      return ko.applyBindings({
        is_authenticated: this.is_authenticated,
        profile_image: this.profile_image,
        domain: this.domain(),
        name: this.name
      });
    }

    events() {
      this.log('events()');
      window.addEventListener('updateAuth', this.update);
      return window.addEventListener('expireAuth', this.expire);
    }

    update() {
      this.log('update()');
      this.is_authenticated(true);
      this.set_profile_image();
      return this.set_name();
    }

    expire() {
      this.log('expire()');
      this.is_authenticated(false);
      return this.apply_defaults();
    }

    set_profile_image() {
      var uid;
      this.log('get_profile_image()');
      if (uid = this.get_cookie('userId')) {
        return this.profile_image(`${this.domain()}/proxy/gateway/api/image/profile/${uid}`);
      } else {
        return this.profile_image(this.defaults.profile_image);
      }
    }

    set_name() {
      var name;
      this.log('set_name()');
      if (name = this.get_cookie('username')) {
        return this.name(decodeURI(name));
      } else {
        return this.name(void 0);
      }
    }

    set_session_id() {
      var session_id;
      this.log('set_session_id()');
      if (session_id = this.get_cookie(this.session_key)) {
        return this.session_id(session_id);
      } else {
        return this.session_id(void 0);
      }
    }

    has_existing_session() {
      this.log('has_existing_session()');
      return this.get_cookie(this.session_key) !== void 0;
    }

    get_cookie(name) {
      var parts, value;
      this.log(`get_cookie(${name})`);
      value = `; ${document.cookie}`;
      parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }

    domain() {
      this.log('domain()');
      return `//${(CRDS.media.prefix === '' ? 'www' : CRDS.media.prefix)}.crossroads.net`;
    }

    log(str) {
      if (this.debug) {
        return console.log(str);
      }
    }

  };

  Header.prototype.debug = false;

  Header.prototype.defaults = {
    uid: void 0,
    profile_image: 'https://crossroads-media.imgix.net/images/avatar.svg',
    name: void 0
  };

  return Header;

}).call(this);

$(function() {
  return new CRDS.Header();
});
