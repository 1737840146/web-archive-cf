import { routes } from '@generouted/react-router'
import { createHashRouter } from 'react-router-dom'

const router = createHashRouter(routes)

function logOut() {
  localStorage.removeItem('token')
  router.navigate('/login')
}

export {
  logOut,
}

export default router
