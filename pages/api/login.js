import cookieConfig from '@/helpers/cookie-config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const request = await fetch(
    'https://cute-lime-goldfish-toga.cyclic.app/auth/login',
    {
      method: 'POST',
      body: new URLSearchParams(req.body).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  const response = await request.json()
  const token = response?.results?.token
  if (token) {
    req.session.token = token
    await req.session.save()
  }
  return res.json(response)
}, cookieConfig)