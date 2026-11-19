# yt2009 contributions guide

thanks for your interest in contributing! when changing code to submit
it as a change for the main repo (`ftde0/yt2009`), please follow a few simple
rules to make the process easier for everyone:

- keep it simple - don't add unnecessary workflows, ci/cd, integrations
and other similar things.
- make sure your code is compatible with all target platforms, so:
  - serverside - node.js v5+ (see `windowsxp.md`)
  - clientside - old browsers, keep a simple css/js syntax (no es6, use xhr, ...),
    if not possible to implement a new feature in and old browser, checking
    whether a browser supports a feature is prefered. user-agent checks can be used
    as a last resort.
- large changes will take significantly longer to be reviewed. keeping them
small will drastically improve your review times.
- code style:
  - 4-space idents are used
  - where possible, keep your code down to 80 characters per line. deviations
  of up to 5 characters are fine. an exception to this rule
  is `back/yt2009templates.js`, and html in general.
  - if writing code that generates html, multi-line fragments should be placed in
  `back/yt2009templates.js`.
- make sure to adhere to `ai_policy.md` if using such tools.