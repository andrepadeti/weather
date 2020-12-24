import React from "react"
import { Link } from "gatsby"
import img404 from "../images/404.png"

const NotFound = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center text-white">
        <img
          src={img404}
          className="img-fluid"
          alt="404"
          style={{ height: "25vh", filter: "invert(100%)" }}
        />
        <h1 className="display-4">
          <p>Page not found</p>
        </h1>
        <p className="lead mb-5">
          How did we end up here? Click to get back to the site.
        </p>
        <Link className="btn btn-primary btn-lg" to="/">
          Back to site
        </Link>
      </div>
    </div>
  )
}

export default NotFound
