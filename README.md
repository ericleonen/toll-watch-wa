# WA TollView

WA TollView helps Washington drivers decide whether to use the Express Toll Lanes (ETL) or stick to the General Purpose (GP) lanes. Powered by real-time data from the Washington State Department of Transportation (WSDOT) APIs, the app provides:

- Current toll prices
- Approximate time savings
- Implied time cost (dollars per minute saved)

You decide what makes a toll “worth it” — WA TollView simply helps you act on it.

**Download a preview of the (Android) app:** 
 - Directly [here](https://expo.dev/artifacts/eas/pzK8VKqy2DXJHYrccpYRzq.apk)
 - OR through [Expo](https://expo.dev/accounts/ericleonen/projects/wa-tollview/builds/bef85148-0a37-499f-84e3-4a5cffc99bc6)

---

## Features

- Live data from WSDOT for toll prices and travel times
- Customizable settings:
  - Max toll cost
  - Minimum time saved
  - Maximum cost per minute saved
- Simple, clean UI for quick decision-making

---

## Data Source

All toll and travel time information comes from the official WSDOT Traveler APIs.

---

## Use Case

WA TollView is ideal for drivers who:
- Want to optimize their commute based on value
- Prefer to avoid tolls unless time savings are substantial
- Like knowing what they’re paying for
- Is, like me, an economics nerd

---

## Built With

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- TypeScript
- Python [FastAPI](https://fastapi.tiangolo.com/) backend
- [WSDOT Traveler APIs](https://wsdot.wa.gov/traffic/api/)
