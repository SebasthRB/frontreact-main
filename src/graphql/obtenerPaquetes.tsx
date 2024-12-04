import { gql } from '@apollo/client';

export const GET_PAQUETES = gql`
    query ObtenerPaquetes {
    paquetes {
            _id
            nombre
            descripcion
            precio
            duracion
            destinoPrincipal
            incluye
            grupo
            calificacion
            foto
            agencia {
            _id
                nombre
                direccion
            }
            destinos {
                _id
            }
        }
    }
 `