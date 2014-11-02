window["distri/gdocs-spreadsheet:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n\n",
      "mode": "100644",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "content": "gdocs-spreadsheet\n=================\n\nImport data from gdocs.\n",
      "mode": "100644",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "content": "Spreadsheet\n===========\n\nLoad data from a Google spreadsheet from a key.\n\n    transformRows = (rows) ->\n      rows.map (row) ->\n        output = {}\n\n        Object.keys(row).forEach (key) ->\n          if (/gsx\\$/).test(key)\n            humanKeyName = key.replace(\"gsx$\", \"\")\n\n            if row[key]?.$t.length\n              value = row[key]?.$t\n            else\n              value = undefined\n\n            output[humanKeyName] = value\n\n        output\n\n    get = (url) ->\n      $.ajax\n        dataType: \"jsonp\"\n        type: \"GET\"\n        url: url\n\n    module.exports.load = (key) ->\n      listUrl = \"//spreadsheets.google.com/feeds/worksheets/#{key}/public/values?alt=json\"\n\n      get(listUrl).then (listData) ->\n        sheetPromises = listData.feed.entry.map (sheet) ->\n          sheetUrlComponents = sheet.id.$t.split(\"/\")\n          sheetId = sheetUrlComponents[sheetUrlComponents.length - 1]\n          sheetUrl = \"//spreadsheets.google.com/feeds/list/#{key}/#{sheetId}/public/values?alt=json\"\n\n          get(sheetUrl)\n\n        $.when.apply($, sheetPromises).then (sheetData...) ->\n          (sheetData.map (d) -> d[0]).reduce (memo, sheet) ->\n            spaces = new RegExp(\" \", \"g\")\n            sheetTitle = sheet.feed.title.$t.replace(spaces, \"\")\n\n            memo[sheetTitle] = transformRows(sheet.feed.entry)\n\n            memo\n          , {}\n",
      "mode": "100644"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "content": "version: \"0.1.0\"\nremoteDependencies: [\n  \"https://code.jquery.com/jquery-1.10.1.min.js\"\n]\n",
      "mode": "100644"
    },
    "test/test.coffee": {
      "path": "test/test.coffee",
      "content": "mocha.globals ['jQuery*']\n\nSpreadsheet = require \"../main\"\n\ndescribe \"Google Spreadsheet wrapper\", ->\n  it \"loads spreadsheet from a given key\", (done) ->\n    Spreadsheet.load(\"0ArtCBkZR37MmdFJqbjloVEp1OFZLWDJ6M29OcXQ1WkE\").then (data) ->\n      console.log data\n      assert data.Abilities\n      assert data.Characters\n      assert data.Passives\n      assert data.Progressions\n      assert data.TerrainFeatures\n\n      assert(data.Abilities.length > 0)\n      done()\n",
      "mode": "100644"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var get, transformRows,\n    __slice = [].slice;\n\n  transformRows = function(rows) {\n    return rows.map(function(row) {\n      var output;\n      output = {};\n      Object.keys(row).forEach(function(key) {\n        var humanKeyName, value, _ref, _ref1;\n        if (/gsx\\$/.test(key)) {\n          humanKeyName = key.replace(\"gsx$\", \"\");\n          if ((_ref = row[key]) != null ? _ref.$t.length : void 0) {\n            value = (_ref1 = row[key]) != null ? _ref1.$t : void 0;\n          } else {\n            value = void 0;\n          }\n          return output[humanKeyName] = value;\n        }\n      });\n      return output;\n    });\n  };\n\n  get = function(url) {\n    return $.ajax({\n      dataType: \"jsonp\",\n      type: \"GET\",\n      url: url\n    });\n  };\n\n  module.exports.load = function(key) {\n    var listUrl;\n    listUrl = \"//spreadsheets.google.com/feeds/worksheets/\" + key + \"/public/values?alt=json\";\n    return get(listUrl).then(function(listData) {\n      var sheetPromises;\n      sheetPromises = listData.feed.entry.map(function(sheet) {\n        var sheetId, sheetUrl, sheetUrlComponents;\n        sheetUrlComponents = sheet.id.$t.split(\"/\");\n        sheetId = sheetUrlComponents[sheetUrlComponents.length - 1];\n        sheetUrl = \"//spreadsheets.google.com/feeds/list/\" + key + \"/\" + sheetId + \"/public/values?alt=json\";\n        return get(sheetUrl);\n      });\n      return $.when.apply($, sheetPromises).then(function() {\n        var sheetData;\n        sheetData = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        return (sheetData.map(function(d) {\n          return d[0];\n        })).reduce(function(memo, sheet) {\n          var sheetTitle, spaces;\n          spaces = new RegExp(\" \", \"g\");\n          sheetTitle = sheet.feed.title.$t.replace(spaces, \"\");\n          memo[sheetTitle] = transformRows(sheet.feed.entry);\n          return memo;\n        }, {});\n      });\n    });\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\",\"remoteDependencies\":[\"https://code.jquery.com/jquery-1.10.1.min.js\"]};",
      "type": "blob"
    },
    "test/test": {
      "path": "test/test",
      "content": "(function() {\n  var Spreadsheet;\n\n  mocha.globals(['jQuery*']);\n\n  Spreadsheet = require(\"../main\");\n\n  describe(\"Google Spreadsheet wrapper\", function() {\n    return it(\"loads spreadsheet from a given key\", function(done) {\n      return Spreadsheet.load(\"0ArtCBkZR37MmdFJqbjloVEp1OFZLWDJ6M29OcXQ1WkE\").then(function(data) {\n        console.log(data);\n        assert(data.Abilities);\n        assert(data.Characters);\n        assert(data.Passives);\n        assert(data.Progressions);\n        assert(data.TerrainFeatures);\n        assert(data.Abilities.length > 0);\n        return done();\n      });\n    });\n  });\n\n}).call(this);\n",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://www.danielx.net/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "remoteDependencies": [
    "https://code.jquery.com/jquery-1.10.1.min.js"
  ],
  "repository": {
    "branch": "master",
    "default_branch": "master",
    "full_name": "distri/gdocs-spreadsheet",
    "homepage": null,
    "description": "Import data from gdocs.",
    "html_url": "https://github.com/distri/gdocs-spreadsheet",
    "url": "https://api.github.com/repos/distri/gdocs-spreadsheet",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});