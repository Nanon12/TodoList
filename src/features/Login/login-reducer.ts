import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";



const initialState: InitialStateType = {
    isLoginIn:false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'SET-IS-LOGIN-IN':
            return {...state,  isLoginIn: action.value}
        default:
            return state
    }
}

// actions

export const setIsLoggedInAC = (value:boolean) =>
    ({type: 'SET-IS-LOGIN-IN', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch ) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch);
    })
}

export const logoutTC = () => (dispatch: ThunkDispatch ) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch);
    })
}

// types


type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoginIn:boolean
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
