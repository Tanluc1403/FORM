
const initialState = {
    listUser: [
        {
            id: "123",
            name: "Nguyễn Văn A",
            phone: "0934567898",
            email: "anguyenvan@gmail.com"
        },
        {
            id: "1234",
            name: "Nguyễn Văn B",
            phone: "0934567899",
            email: "bnguyenvan@gmail.com"
        },
        {
            id: "12345",
            name: "Nguyễn Văn B",
            phone: "0934567896",
            email: "bc62nguyenvan@gmail.com"
        }
    ],
    editUser: null,
    hidenButon: false,
    keyword: "",

};

const reducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case "SUBMIT_ADD": {
            const newUserAdd = action.payload;
            const listUserClone = [...state.listUser];

            listUserClone.push(newUserAdd);
            state.listUser = listUserClone;
            return { ...state };
        }

        case "SUBMIT_UPDATE": {
            const newUser = action.payload;
            const listUserClone = [...state.listUser];

            if (newUser) {
                const index = listUserClone.findIndex((item) => item.id === newUser.id);
                if (index != -1) {
                    listUserClone[index] = newUser;
                };
                state.listUser = listUserClone
                return { ...state };
            }
        }

        case "EDIT_USER":
            state.editUser = action.payload;

            return { ...state };

        case "DELETE_USER":
            const { listUser } = state;
            const usersFilter = listUser.filter((user) => user.id !== action.payload);

            state.listUser = usersFilter;
            return { ...state };

        case "RESET_USER": {
            state.editUser = action.payload;
            return { ...state };
        }
        case "HIDDEN_ADD": {
            state.hidenButon = action.payload;
            return { ...state };
        }
        case "HIDDEN_UPDATE": {
            state.hidenButon = action.payload;
            return { ...state };
        }
        case "KEYWORD": {
            state.keyword = action.payload;
            return { ...state }
        }


        default:
            return { ...state };
    }
}

export default reducer