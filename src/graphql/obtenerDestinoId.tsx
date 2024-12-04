import { gql } from '@apollo/client';

const DESTINO_ID = gql`
  query ObtenerDestinoPorId($obtenerDestinoPorIdId: ID!) {
    obtenerDestinoPorId(id: $obtenerDestinoPorIdId) {
        _id
        nombre
        descripcion
        puntos_interes
        actividades
        clima
        mejor_epoca
        agencia {
        _id
        nombre
        }
        fecha_creacion
    }
    }
`;

export default DESTINO_ID;
