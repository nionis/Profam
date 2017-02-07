const Control = (inputOpts: object): Function => {
  const opts = {
    enabled: false,
    ...inputOpts,
  }

  const enable = (): boolean => (opts.enabled = true)
  const disable = (): boolean => (opts.enabled = false)
  const isEnabled = (): boolean => opts.enabled
  const status = (): boolean => opts.enabled

  return {
    enable,
    disable,
    isEnabled,
    status,
  }
}


export default Control
