import React from 'react'
import { Link } from 'gatsby'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NotFound = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">
          <p>
            {/* <FontAwesomeIcon icon="heart-broken" /> */}
          </p>
          <p>Página não encontrada</p>
        </h1>
        <p className="lead mb-5">
          Como viemos parar aqui? Clique para retornar ao site.
        </p>
        <Link className="btn btn-primary btn-lg" to="/">
          Voltar ao site
        </Link>
      </div>
    </div>
  )
}

export default NotFound
