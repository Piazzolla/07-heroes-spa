import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";

export const HeroPage = () => {

  const { id } = useParams();
  const hero = useMemo( () => getHeroById(id), [id]);
    /*uso memo para no llamar esto mas de una vez 
    (puede ser pesado si se conecta  una db etc)
    paso por parametro [id] y cuando cambie el id se vuelve a ejecutar
    la funcion del primer parametro
    */

  const navigate = useNavigate();
  const onNavigateBack = () => {
    if( hero.publisher === 'Marvel Comics')
      navigate('/marvel');
    else
      navigate('/dc')

    //si uso navigate(-1) vuelve a la ultima pagina que recuerda el navegador
  }

  if (!hero) {
    return <Navigate to="/marvel" />
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/assets/heroes/${ id }.jpg`}
          alt={ hero.superhero }
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> <b>Alter ego:</b> { hero.alter_ego } </li>
          <li className="list-group-item"> <b>Publisher:</b> { hero.publisher } </li>
          <li className="list-group-item"> <b>First appearance:</b> { hero.first_appearance } </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{ hero.characters} </p>

        <button className="btn btn-outline-primary" onClick={ onNavigateBack }>Regresar</button>
      </div>
    </div>
  )
}
