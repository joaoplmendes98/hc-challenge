import { type DirectiveBinding } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void
}

export default {
  mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: ClickOutsideElement) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}
