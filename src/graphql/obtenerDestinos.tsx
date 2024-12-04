import { gql } from '@apollo/client';

export const GET_DESTINOS = gql`
    query Destinos {
        destinos {
            _id
            nombre
            descripcion
            puntos_interes
            actividades
            clima
            mejor_epoca
            paquete {
            _id
            }
            fecha_creacion
        }
    }
 `