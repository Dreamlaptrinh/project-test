import {fetchUser} from "../utils/fetchLocalStorageData"

const useInfo = fetchUser()
export const initialState = {
    user: useInfo,
};