export function parseXML(text: string): Document {
  let xml = null

  try {
    if (window.DOMParser) {
      const parser = new DOMParser()
      xml = parser.parseFromString(text, 'text/xml')
    }
  } catch (e) {}

  if (!xml) {
    try {
      xml = new ActiveXObject('Microsoft.XMLDOM')
      xml.async = false
      xml.loadXML(text)
    } catch (e) {
      xml = null
    }
  }

  return xml
}

export function parseJSON(value: string) {
  if (value == null) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (e) {
    console.error(e)
    return {}
  }
}
