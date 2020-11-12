import { FETCH_USER } from '../acctions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.playload || false;
        default:
            return state;
    }
}