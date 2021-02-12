 const loginAction = (userId, userName) => async(dispatch)=>{
    await dispatch({type:"LOGIN_ACTION",userId,userName});
};
export default loginAction;