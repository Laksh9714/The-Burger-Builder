import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe("auth reducer",() => {
    it("shoult return initial state",() => {
        expect(reducer(undefined,{})).toEqual({
            token : null, 
            userId : null,
            error : null,
            loading : false, 
            authRedirectPath : "/"
        });
    });

    it("should store token on login", () => {
        expect(reducer({
            token : null, 
            userId : null,
            error : null,
            loading : false, 
            authRedirectPath : "/" 
        },{
            type : actionTypes.AUTH_SUCCESS,
            idToken : 'some-token',
            userId : 'some-user'
        })).toEqual({
            token : "some-token", 
            userId : "some-user",
            error : null,
            loading : false, 
            authRedirectPath : "/" 
        })
    })
});