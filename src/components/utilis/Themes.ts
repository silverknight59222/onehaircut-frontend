export const ColorsThemeA = {
  primary: "blue-500",
  secondary: "red-500",
  neutral: "stone-50",
  background: "gray-100",
  text: "gray-800",
  textSecondary: "gray-500",
  textGradient_Title: "font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-500 to-orange-400",
  OhcGradient_A: "bg-gradient-to-r from-rose-600 via-orange-500 to-orange-400",
  OhcGradient_B: "bg-gradient-to-r from-rose-500 via-orange-600 to-orange-400",
  ohcVerticalGradient_A: `bg-gradient-to-b from-rose-500 via-orange-600 to-orange-500`,
  ohcBigVerticalGradient_A : "linear-gradient(162deg, #EC124F 0%, #FD4C55 40.71%, #FF8637 70.46%, #FFE30F 100%)",
  ohcBorder: " border-2 border-red-500 ",
  inactivButtonColor: "bg-[#D6D6D6]",
  filterSelected: "bg-stone-800",
  pageBgColorLight: "bg-zinc-100",
  error: "red-900"
}

export const Theme_A = {
  Bars: {
    searchBar_1: `min-w-[300px] text-sm py-2 px-4 outline-none rounded-full bg-white border border-[#EDEDED] shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]`,
    proTopBar: {
      standardShape: `w-full flex items-center justify-center font-semibold bg-stone-50 opacity-100 border-x-2 border-stone-100 shadow-inner cursor-pointer rounded-lg px-5 h-11 hover:border-secondary hover:bg-gradient-to-b from-red-100 to-transparent`,
      activatedColor: "border border-red-50 bg-gradient-to-b from-red-100 to-transparent",
      inactivatedColor: "border border-stone-200 shadow-lg",
    }
  },
  behaviour: {
    buttonHoverBehaviour_1: `cursor-pointer`,
    buttonHoverBehaviour_2: `hover:bg-orange-600 hover:text-white rounded-full px-4 cursor-pointer transform hover:scale-105 transition-transform`,
    buttonHoverBehaviour_3: `hover:bg-stone-100 hover:text-black rounded-full py-1 px-4 cursor-pointer transition duration-50`,
    cardBehaviour: "shadow-md rounded-xl my-2 cursor-pointer hover:outline outline-offset-1 outline-1 outline-zinc-300",
    cardWindowBehaviour: "flex-1 flex flex-wrap h-max gap-8",
  },
  breakpoints: {
    desktop: "1024px",
    mobile: "480px",
    tablet: "768px",
  },
  browingFilters: {
    proHairstyleFilterOFF: `flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373] shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]`,
    proHairstyleFilterON: `flex gap-4 rounded-full bg-stone-800 border border-[#EDEDED] p-1 text-sm text-white shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]`,
  },
  button: {
    bigGradientButton: `flex items-center justify-center text-white font-semibold text-xl rounded-md px-6 py-4 mt-2 ${ColorsThemeA.OhcGradient_B} shadow-md transform hover:scale-105 transition-transform hover:shadow-[0px_3px_6px_0px_rgba(255,125,60,0.25)]`,
    bigWhiteColoredButton: `flex items-center justify-center min-w-56 h-14 rounded-xl text-black font-semibold text-xl px-8 py-2 mt-2 bg-white border border-x-red-500 border-y-orange-500 transform hover:scale-105 transition-transform hover:shadow-md`,
    medWhiteColoredButton: `text-black font-medium text-sm rounded-md px-4 py-2 bg-white border border-x-red-500 border-y-orange-500 transform hover:scale-105 transition-transform hover:shadow-md`,
    mediumGradientButton: `text-white font-medium text-sm rounded-md px-4 py-2 ${ColorsThemeA.OhcGradient_A} transform hover:scale-105 transition-transform hover:shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)]`,
    medLargeGradientButton: `text-white font-medium text-lg mb-3 rounded-md w-[278px] py-2 ${ColorsThemeA.OhcGradient_A} transform hover:scale-105 transition-transform hover:shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)]`,
    smallGradientButton: `text-white font-medium text-sm rounded-md px-4 py-2 ${ColorsThemeA.OhcGradient_A}  shadow-md transform hover:scale-105 transition-transform hover:shadow-[0px_3px_6px_0px_rgba(255,125,60,0.25)]`,
    scrollToTheTopButton: `fixed bottom-10 right-10 mb-8 p-4 bg-stone-300 text-sm text-white px-6 py-2 rounded-lg transform hover:scale-105 transition-transform`,
    bigWhiteGreyButton: `flex items-center justify-center min-w-56 h-14 rounded-xl shadow-md text-black font-semibold text-xl px-8 py-2 mt-2 bg-white border border-x-stone-200 border-y-stone-100 transform hover:scale-105 transition-transform hover:shadow-md`,
  },
  checkers: {
    errorText: `text-xs text-${ColorsThemeA.error} ml-3 mt-1`,
  },
  fonts: {
    header: "'Montserrat', sans-serif",
    main: "'Montserrat', sans-serif",
  },
  footer: {
    mainFooter: 
    `<div class="bg-gray-100">
      <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p class="text-gray-500 text-sm text-center sm:text-left">© 2021 Tailwind Snippets —
      <a href="https://twitter.com/knyttneve" class="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@knyttneve</a>
      </p>
      <span class="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">Enamel pin tousled raclette tacos irony</span>
    </div>`
  },
  hairstyleCards: {
    cardGradientBott: "rounded-b-xl bg-gradient-to-r from-white via-stone-100 to-zinc-300",
    cardSize: {
      big: "relative  w-72 h-72",
      med: "relative  w-52 h-52",
      small: "relative w-32 h-32",
    },
    cardText: "rounded-b-xl flex items-center justify-center py-2 text-sm text-black font-medium",
    cardgradientTop: "relative w-max px-4 pt-4 rounded-t-xl bg-gradient-to-r from-white via-stone-50 to-zinc-300",
    checkbubbleOFF: "absolute top-5 right-5 w-6 h-6 shadow-inner rounded-full bg-stone-100 transform hover:scale-125 transition-transform ",
    selectedCardGradientBott: "rounded-b-xl bg-gradient-to-r from-white via-stone-50 to-red-100",
    selectedCardGradientTop: "relative w-max px-4 pt-4 rounded-t-xl bg-gradient-to-r from-white via-red-200 to-red-100",
  },
  indicators:{
    counterIndicator: `text-sm py-1 px-[12px] ml-2 rounded-full text-white ${ColorsThemeA.ohcVerticalGradient_A}`
  },
  servicesCards: {
    modifyButton: `flex cursor-pointer my-2 py-1 px-2 rounded-md w-7 h-6 bg-gradient-to-r ${ColorsThemeA.OhcGradient_A} shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]`,
  },
  shadows: {
    standardCardShadow: "shadow-lg",
  },
  shapes: {
    smallSearchCircle: `absolute right-1 top-[3px] cursor-pointer p-2 rounded-full bg-gradient-to-b from-[#E93C64] to-[#F6A52E]`,
    standardShape: `px-4 cursor-pointer`,
  },
  textFont: {
    headerH1: "",
    headerH2: "",
    headerH3: "text-lg font-semibold text-center",
    headerH4: "text-md font-semibold text-left text-black block mb-2",
    headerH5: "text-md font-medium text-left text-black block",
    infoTextSmall : "text-[10px] justify-center font-medium text-[#959595]",
    navigationGreyFont : "text-xl text-stone-600 justify-center font-medium ",
  },
  thumbnails: {
    selectHaircutThumbnail: `mt-2 flex items-center justify-center w-36 h-36 bg-zinc-200 border-1 border-black rounded-2xl shadow-md`,
    profilPictureThumbnail: `w-32 h-32 relative flex items-center text-center`,
    containerPicThumbnail: `flex items-center p-4 rounded-2xl border-2 bg-white shadow-lg`,
  },
};
