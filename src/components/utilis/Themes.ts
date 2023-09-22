export const ColorsThemeA = {
    primary: "blue-500",       
    secondary: "red-500",
    neutral: "stone-50",     
    background: "gray-100",   
    text: "gray-800",         
    textSecondary: "gray-500",
    OhcGradient_A: "bg-gradient-to-r from-red-500 via-orange-500 to-orange-400",
  }

export const Theme_A = {
  cards:{
    selectedCardGradientBott: "rounded-b-xl bg-gradient-to-r from-white via-red-100 to-red-200",
    selectedCardGradientTop: "relative w-max px-4 pt-4 rounded-t-xl bg-gradient-to-r from-white via-red-50 to-red-200",
    cardGradientBott: "rounded-b-xl bg-gradient-to-r from-white via-stone-100 to-zinc-300",
    cardgradientTop: "relative w-max px-4 pt-4 rounded-t-xl bg-gradient-to-r from-white via-stone-50 to-zinc-300",
    cardText:"rounded-b-xl flex items-center justify-center py-2 text-sm text-black font-medium",
    checkbubble:"absolute top-5 right-5 w-6 h-6 rounded-full bg-stone-50 transform hover:scale-125 transition-transform ",
    cardSize: {
      small: "relative w-32 h-32",
      med: "relative  w-52 h-52",
      big: "relative  w-72 h-72",
    }
  },
  shapes:{
  },
  behaviour:{
    cardBehaviour:"shadow-md rounded-xl my-2 cursor-pointer hover:outline outline-offset-1 outline-1 outline-zinc-300",
    cardWindowBehaviour: "flex-1 flex flex-wrap h-max gap-8"
  },
  fonts: {
    main: "'Montserrat', sans-serif",
    header: "'Montserrat', sans-serif"
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
  button: {
    add: "text-white font-medium text-sm rounded-md px-4 py-2 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-md transform hover:scale-105 transition-transform hover:shadow-[0px_3px_6px_0px_rgba(255,125,60,0.25)]",
    update:`w-full text-white font-medium text-sm rounded-md px-4 py-2 ${ColorsThemeA.OhcGradient_A} transform hover:scale-105 transition-transform hover:shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)]`,
  },
  checkers:{
    errorText:"text-xs text-red-900 ml-3 mt-1",
  },
};
