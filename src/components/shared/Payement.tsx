import React, { useState } from 'react';
import { Theme_A } from '../utilis/Themes';

/////////////////////////////////////////////
// File to get the payement information (credit card and paypal)
/////////////////////////////////////////////
const PaymentForm: React.FC = () => {
    // Function to handle the click on the credit card radio
    const [cardSide, setCardSide] = useState(true)



    return (
        <div className="min-w-screen min-h-full bg-white flex items-center justify-center px-2 pb-2 pt-2">
            <div className="w-full mx-auto rounded-lg bg-white p-5 text-gray-700" style={{ maxWidth: '600px' }}>
                <div className="mb-10">
                    <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
                </div>
                <div className="mb-3 flex -mx-2">
                    <div className="px-2" onClick={() => setCardSide(true)}>
                        <label htmlFor="type1" className="flex items-center cursor-pointer">
                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked={cardSide} />
                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" alt="Type 1" />
                        </label>
                    </div>
                    <div className="px-2" onClick={() => setCardSide(false)}>
                        <label htmlFor="type2" className="flex items-center cursor-pointer">
                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                            <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3" alt="Type 2" />
                        </label>
                    </div>
                </div>
                {cardSide == true &&
                    (<div>
                        <div className="mb-3">
                            <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                            <div>
                                <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Jean Martin" type="text" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                            <div>
                                <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                            </div>
                        </div>
                        <div className="mb-3 -mx-2 flex items-end">
                            <div className="px-2 w-1/2">
                                <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
                                <div>
                                    <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                        <option value="01">01 - Janvier</option>
                                        <option value="02">02 - Fevrier</option>
                                        <option value="03">03 - Mars</option>
                                        <option value="04">04 - Avril</option>
                                        <option value="05">05 - Mai</option>
                                        <option value="06">06 - Juin</option>
                                        <option value="07">07 - Juillet</option>
                                        <option value="08">08 - Août</option>
                                        <option value="09">09 - Septembre</option>
                                        <option value="10">10 - Octobre</option>
                                        <option value="11">11 - Novembre</option>
                                        <option value="12">12 - Decembre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="px-2 w-1/2">
                                <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2020">2030</option>
                                    <option value="2021">2031</option>
                                    <option value="2022">2032</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-10">
                            <label className="font-bold text-sm mb-2 ml-1">Security code</label>
                            <div>
                                <input className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                            </div>
                        </div>
                        <div>
                            <button className={`${Theme_A.button.mediumGradientButton}`}>
                                <i className="mdi mdi-lock-outline mr-1"></i> Confirmer
                            </button>
                        </div>
                    </div>)
                }
                {cardSide == false &&
                    <div className='my-8 justify-center'>
                        <button className={`${Theme_A.button.mediumGradientButton}`}>
                            <i className="mdi mdi-lock-outline mr-1"></i> Se connecter avec Paypal
                        </button>
                    </div>
                }
            </div>
        </div >
    );
};

export default PaymentForm;
