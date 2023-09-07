const initialState = {
  noteView: "Grid",
};

const NavReducer = (state = initialState, action) => {
  switch (action?.type) {
    case "Grid":
      return { noteView: "Grid" };
    case "List":
      return { title: "List" };
    default:
      return state;
  }
};

export default NavReducer;
