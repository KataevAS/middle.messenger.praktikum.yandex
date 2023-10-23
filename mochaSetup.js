import { JSDOM } from 'jsdom'

// jsdom
const jsdom = new JSDOM(`<body>
<div id="app"></div>
</body>`, {
  url: 'https://test.com/'
})

global.window = jsdom.window
global.document = jsdom.window.document
global.Node = jsdom.window.Node
global.MouseEvent = jsdom.window.MouseEvent
global.location = jsdom.window.location
global.history = jsdom.window.history
