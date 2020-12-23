import React from "react"

export function onRenderBody({ setHeadComponents }) {
  setHeadComponents([
    <script
      key="abc"
      type="text/javascript"
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_KEY}&libraries=places`}
    />,
  ])
}
