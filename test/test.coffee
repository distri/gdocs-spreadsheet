mocha.globals ['jQuery*']

Spreadsheet = require "../main"

describe "Google Spreadsheet wrapper", ->
  it "loads spreadsheet from a given key", (done) ->
    Spreadsheet.load("0ArtCBkZR37MmdFJqbjloVEp1OFZLWDJ6M29OcXQ1WkE").then (data) ->
      console.log data
      assert data.Abilities
      assert data.Characters
      assert data.Passives
      assert data.Progressions
      assert data.TerrainFeatures

      assert(data.Abilities.length > 0)
      done()
