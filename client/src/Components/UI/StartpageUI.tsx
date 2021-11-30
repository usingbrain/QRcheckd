// Login styles

const loginStyles = {
    outerBox: "bg-white flex flex-row rounded-sm w-1/2 md:w-10/12 md:h-4/6 lg:w-9/12 h-80 items-center shadow-2xl m-auto",
    loginStyle: "bg-green flex rounded-sm w-full h-full md:w-1/2 flex-col justify-center items-center p-2",
    inputStyle: "text-white w-full border-b-2 border-b-white bg-green my-4 placeholder-green-light lg:text-xl",
    signupLink: "text-white bg-green p-2",
    loginBtn: "text-green my-4 bg-white py-1 flex justify-center w-full lg:text-xl",
    linkStyle: "flex text-white justify-center",
    lottieStyle: "md:w-1/2 w-0 invisible md:visible"
}

// Register styles

const registerStyles = {
    registerStyle: "bg-green flex rounded-sm xl:w-5/12 w-1/2 m-auto flex-col justify-center items-center p-2 shadow-lg",
    inputStyle: "text-white w-full border-b-2 border-b-white bg-green my-2 py-2 placeholder-green-light",
    continueBtn: "text-green my-2 bg-white p-2 flex justify-center my-4",
    selector: "text-green my-2 bg-white p-3 my-4 flex justify-center"
}

// Welcome styles

const QRExampleStyles = {
    exampleProfile: "bg-black flex rounded-sm h-60 w-60 md:w-80 md:h-56 lg:w-96 lg:h-60 xl:w-96 xl:h-80 sm:float-right sm:mx-16 justify-center items-center flex-col p-4 mx-auto invisible sm:visible"
}

const promptStyles = {
    linkStyle: "flex text-white w-full h-12 md:h-14 lg:h-20 xl:h-24 border-2 border-white justify-center my-4 md:my-8 items-center md:text-xl hover:bg-green-light xl:text-2xl",
    promptStyle: "bg-white flex flex-row rounded-sm w-1/2 sm:w-10/12 h-80 lg:h-96 items-center m-auto my-8",
    checklistStyle: "invisible sm:visible w-0 sm:w-1/2 h-full",
    buttonStyle: "bg-green flex rounded-sm h-full w-full sm:w-1/2 lg:w-4/12 justify-center items-center flex-col px-8 lg:px-8 xl:px-16 hover:shadow-2xl",
    welcomeStyle: "flex rounded-sm justify-center flex-col sm:items-start items-center w-0 sm:w-1/2 sm:p-4 m-auto",
}

export default { loginStyles, registerStyles, QRExampleStyles, promptStyles };