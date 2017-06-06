module.exports = class ValkrieDataShim

  constructor : () ->
    @blobs =
      marchTest2  : require './march-test-2.json'
      stats       : require './stats-refresh.json'
      delete      : require './host-delete.json'
      marchTest   : require './march-test.json'

  getApp : (id='', resetApp=false) -> @blobs[id]

  initUI : () ->
    for key, blob of @blobs
      $option = $ "<option value='#{key}'>#{key}</option>"
      $('select').append $option

    $('select').on 'change', (e)=>
      val   = $(e.currentTarget).val()
      clone = JSON.parse JSON.stringify( @getApp( val ) )
      valkrie.refresh clone

    # Load the first blob
    for key, blob of @blobs
      $('select').val(key).change()
      return
