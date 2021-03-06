const initState = {
  loggedIn: false,
  name: ''
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHECK_LOGIN":
      return {
        loggedIn: action.loggedIn,
          name: action.name,
          id: action.id
      }
      default:
        return state
  }
}

export default rootReducer