import { gql } from '@apollo/client';

export const GET_AGENCIAS = gql`
    query Agencias {
    agencias {
        _id
        nombre
        contacto
        telefono
        email
        direccion
        fecha_creacion
    }
    }
 `;