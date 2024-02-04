import React, { useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ url }) => {
    const [isQRCodeVisible, setQRCodeVisible] = useState(false);

    return (
        <div className="items-center justify-center mb-2">
            <button onClick={() => setQRCodeVisible(!isQRCodeVisible)}>
                <p className="mb-6 ">
                    Votre QRC
                </p>
            </button>

            {isQRCodeVisible && <QRCode value={url} />}
        </div>
    );
};

export default QRCodeGenerator;
