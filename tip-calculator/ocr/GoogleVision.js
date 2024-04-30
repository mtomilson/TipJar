import React from 'react'




export function GoogleVision() {
    const vision = require('@google-cloud/vision')

    const CREDENTIALS = JSON.parse(JSON.stringify({
        "type": "service_account",
        "project_id": "tipcalculator-420402",
        "private_key_id": "51e1eaec27ce4ddcc16a8595e1b69687f49f442e",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDFzA4qP1TxYCuk\nqAezZaUvY3nL/Lr4QLst5BNtW2kAyWHTmb5ANIOi/rzAlOL3h+x12gAGVbiUE4fR\nb91xE/aE9SyM8FDndVoWWYP2x4I9Ya5rXaUjhcguD0Qv4cxWVa2pAEI4/E2vaezk\n385miIm2IerITyD+gKvIBO05hmgxR3A9Jl5WxdGjfvK8gX8LkQ57IcuS0/ZZGAzM\nTZAwmRD8L/rSKyG/Hi3xCp/tWe69DeZZ1vReiRfgv29Boe0ERfkVHbUo0D9YqwoK\nBfEOd6f5OvEdmJlmP4GgqSNJVtLnf/iVtZ0h5LAaRVuXLFb0k4jTr2zPNsVtIMVX\nfPLfT4cbAgMBAAECggEARc0SbJ9H4xxsmmE/wnPK3NPOfgmUk5oIVBQKNQvOnNv0\nXV+Cj5bYo3Mg+hcwl2jMrfQ+EP48MmlIA0VmUIracqYw0BXYfy3fGkcBtltGn1Gy\n4ym7ZrNF5tc1WW5mFUuMCrlQJVsIMTCAzG4coPtrGa6Tc5fVDWsr89ylOKkxaL3s\n+KgCfUf1raz4sYlVdYCbuGLfbq8QNfaArXgmMsZeYwNczwDAGBrL0tp2+Y+Wmy9t\n5cW3MJQId+sZ2OJBKD+lN8j2SIMt5M4nWYsAZu4IDVdQKLagOnZ5TEfuW6uUKbWW\nOMKqdbuHXUY9ykqdx/U8zWdbXzF6kubHGzWJ7ingGQKBgQD5awpMCbW8Yjy0k8qj\nJIbGoZypkXjab01ObnDjOz/I7YFA2f7UmS5UjHaTpXT+Eet7mGL7xRgk8mPSk8bg\ngdz76h5qnzGEYhSPzYdWViZ50qeYa1l+4edAm/zuCRxymXn/swylLoOh8btp053m\nbKwqyMocW6j1rY3Kb4ObyjysYwKBgQDLBEk1pZrbQGCKUdi/PEQH9YSrgTQoe11R\nmMHGokqNYl9++QZT7I/Dz+PJM7Qfp1fHtLu/uSVm6dMFsnb9USvpADluQ2dekHbI\n9oGmI3SVvIp2ql4hfrsA+xhsW25UqwGeBs6trxJuPAwCxWrDXY8PmZoedn/+jiQs\nTVIhEvYr6QKBgQCNh1O8efYKA6R2wzZFBMEFjUccYVO2f1nam4irKD+1gC/L4Odd\nM966U0ol1clhMkHxTDM+skRVEsXaA8jiNE51FBBWaCbs+8q3HuUg9Jm4nvRC5QdP\nnFhgrSME316pGLXFhpAyWwaOqmCyWEZNLnUzgeRN2yUw416F9Gk1ybhMCQKBgQCe\ndwr5//jfGOICNZ68rrrfh4n2INTooFqX/WeLt1QABgBKaPDCg004Z8YCYARCDOoc\nrPs7zLXgHbWkpcfxNPHUXmN1qNE/4/2EIb3TQ6uV0WQ2+gadmIE5Y8WNltSI7C5H\n/kJHGfeF6gLqCtSqCBZJ8/hzvMVtmd+sYPIxdM6IOQKBgQCG0cee5/16g23WxDzz\nk1EDvmjXmthCnhPEmJTZBlH0DYMzLH54fVLMRHqIyktYVUdXIE5Q9CaVmH3jmJ50\nOBeVOahXolufOgnExkgOS6rz3yQaqQOX1LRJvylRk8h1DYDIcBPlaqp9vqN9PHL8\n/DoaqyuZJe4M0H/+tsdhI+5EXg==\n-----END PRIVATE KEY-----\n",
        "client_email": "tip-calculator@tipcalculator-420402.iam.gserviceaccount.com",
        "client_id": "114584341982741556064",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/tip-calculator%40tipcalculator-420402.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      ))
    
      const CONFIG = {
        credentials: {
            private_key: CREDENTIALS.private_key,
            client_email: CREDENTIALS.client_email
        }
      }
    
      const client = new vision.ImageAnnotatorClient(CONFIG)
      const detectText = async(file_path) => {
        let [result] = await client.textDetection('tips.jpg')
        console.log(result)
      }

      detectText()
    
}
