module.exports = class ValkrieDataShim

  constructor : () ->
    @blobs =
      MON    : require './MON.json'
      THURS0 : require './THURS0.json'
      THURS1 : require './THURS1.json'
      THURS2 : require './THURS2.json'
      WED1   : require './WED1.json'
      WED2   : require './WED2.json'
      WED3   : require './WED3.json'
      WED4   : require './WED4.json'
      TUES1  : require './TUES1.json'
      TUES2b : require './TUES2-b.json'
      TUES2  : require './TUES2.json'
      A  : require './A.json'
      A2 : require './A2.json'
      B  : require './B.json'
      C  : require './C.json'
      D  : require './D.json'

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
