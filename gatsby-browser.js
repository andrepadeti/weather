import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min'
import './src/styles/global.scss'

exports.onServiceWorkerUpdateReady= () => window.location.reload(true)