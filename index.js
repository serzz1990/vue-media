import { reactive } from 'vue'
const conditions = reactive({})

export function Media (condition, defaultValue = Media.defaultValue) {
  if (!conditions[condition]) {
    conditions[condition] = {
      matchMedia: null,
      result: {
        value: defaultValue
      }
    }

    if (typeof window !== 'undefined') {
      const _matchMedia = matchMedia(condition)
      conditions[condition].matchMedia = _matchMedia
      _matchMedia.onchange = (event) => {
        conditions[condition].result.value = event.matches
      }
      conditions[condition].result.value = _matchMedia.matches
    }
  }
  return conditions[condition].result.value
}

Media.defaultValue = false
Media.breakpoints = {}

Media.templateMax = w => `(max-width: ${w + 1}px)`
Media.templateMin = w => `(min-width: ${w}px)`

Media.setDefaultValue = value => (Media.defaultValue = value)

Media.down = value => Media(Media.templateMax((Media.breakpoints[value] || value)))
Media.up = value => Media(Media.templateMin((Media.breakpoints[value] || value)))
Media.max = value => Media(Media.templateMax((Media.breakpoints[value] || value)))
Media.min = value => Media(Media.templateMin((Media.breakpoints[value] || value)))

Media.setBreakpoints = (breakpoints = {}) => {
  Object.keys(breakpoints).forEach(key => Media.setBreakpoint(key, breakpoints[key]))
  return Media
}

Media.setBreakpoint = (key, value) => {
  Media.breakpoints[key] = value
  Media.down[key] = () => Media(Media.templateMax(value))
  Media.up[key] = () => Media(Media.templateMin(value))
  Media.max[key] = () => Media(Media.templateMax(value))
  Media.min[key] = () => Media(Media.templateMin(value))
  return Media
}
