let container = null

export function appendToHead(el: HTMLElement) {
  getHead().appendChild(el)
}

export function getHead(): HTMLHeadElement {
  return document.head || document.getElementsByTagName('head')[0]
}

export function getBody(): HTMLElement {
  return document.body || document.getElementsByTagName('body')[0]
}

export function appendToBody(el: unknown) {
  if (container == null) {
    container = document.createElement('div')
    container.id = 'preloadContainer'

    Object.assign(container.style, {
      visibility: 'hidden',
      position: 'absolute',
      width: (container.style.height = '10px'),
      overflow: 'hidden',
      transform: 'translate(-10px, -10px)',
    })

    getBody().appendChild(container)
  }

  container.appendChild(el)
}

export function removeChild(el: HTMLElement) {
  if (el.parentElement) {
    el.parentElement.removeChild(el)
  }
}

export function isImageTag(item: unknown) {
  return item instanceof HTMLImageElement
}

export function isAudioTag(item: unknown) {
  return item instanceof HTMLAudioElement
}

export function isVideoTag(item: unknown) {
  return item instanceof HTMLVideoElement
}
