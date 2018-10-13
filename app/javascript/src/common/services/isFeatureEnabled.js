function isFeatureEnabled(feature) {
  return window.__FEATURES__[feature]
}

export default isFeatureEnabled
