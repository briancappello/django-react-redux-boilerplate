const SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://FIXME.COM'
  : 'http://localhost:8000'

const BRAND = 'Django React Redux Boilerplate'
const COPYRIGHT = `Copyright ${BRAND}`

const HIGHLIGHT_LANGUAGES = [
  'bash',
  'cpp',
  'css',
  'dockerfile',
  'javascript',
  'json',
  'nginx',
  'python',
  'php',
  'scss',
  'shell',
  'yaml',
]

module.exports = {
  SERVER_URL,
  BRAND,
  COPYRIGHT,
  HIGHLIGHT_LANGUAGES,
}
