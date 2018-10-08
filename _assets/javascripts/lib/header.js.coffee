if typeof window.CRDS is 'undefined' then window.CRDS = {}

class CRDS.Header

  debug: false
  defaults:
    uid: undefined
    profile_image: 'https://crossroads-media.imgix.net/images/avatar.svg'
    name: undefined

  constructor: (sel) ->
    @session_key = "#{CRDS.media.prefix}sessionId"
    @auth = new ReactiveAuth(@session_key)
    @auth.subscribe()
    @setup()
    @events()
    @update() if @has_existing_session()

  setup: ->
    @log 'setup()'
    @profile_image = ko.observable(@defaults.profile_image)
    @name = ko.observable(@defaults.name)
    @is_authenticated = ko.observable(@has_existing_session())
    ko.applyBindings
      is_authenticated: @is_authenticated
      profile_image: @profile_image
      name: @name

  events: ->
    @log 'events()'
    window.addEventListener 'updateAuth', @update
    window.addEventListener 'expireAuth', @expire

  update: =>
    @log 'update()'
    @is_authenticated(true)
    @set_profile_image()
    @set_name()

  expire: =>
    @log 'expire()'
    @is_authenticated(false)
    @apply_defaults()

  set_profile_image: ->
    @log 'get_profile_image()'
    if uid = @get_cookie('userId')
      @profile_image "https://www.crossroads.net/proxy/gateway/api/image/profile/#{uid}"
    else
      @profile_image @defaults.profile_image

  set_name: ->
    @log 'set_name()'
    if name = @get_cookie('username')
      @name name
    else
      @name undefined

  set_session_id: ->
    @log 'set_session_id()'
    if session_id = @get_cookie(@session_key)
      @session_id session_id
    else
      @session_id undefined

  has_existing_session: ->
    @log 'has_existing_session()'
    @get_cookie(@session_key) != undefined

  get_cookie: (name) ->
    @log "get_cookie(#{name})"
    value = "; #{document.cookie}"
    parts = value.split("; #{name}=")
    if parts.length == 2
      parts.pop().split(";").shift()

  log: (str) ->
    console.log(str) if @debug



$ -> new CRDS.Header()
