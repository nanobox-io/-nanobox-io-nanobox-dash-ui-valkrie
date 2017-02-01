module.exports = class ValkrieDataShim

  constructor : () ->
    @blobs =
      splitter  : require './splitter.json'

  getApp : (id='default', resetApp=false) -> @blobs[id]

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
