import { PUBLIC_SITE_URL } from "$env/static/public"

export const purchase = async (bundle: Bundle, customer: string | null) => {
    let body: string;
    if (customer !== null) {
      body = JSON.stringify({
        customer: customer,
        bundle: bundle
      })
    } else {
      body = JSON.stringify({
        bundle: bundle
      })
    }
  
    const response = await fetch(`${PUBLIC_SITE_URL}/api/purchase`, {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  
    if (response.ok) {
      const url = await response.text()
      window.location.href = url
    } else {
      throw new Error('Failed to redirect you to Stripe')
    }
  }