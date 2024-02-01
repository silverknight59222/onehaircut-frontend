import React, { useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ url }) => {
    const [isQRCodeVisible, setQRCodeVisible] = useState(false);

    return (
        <div className="items-center justify-center">
            <button onClick={() => setQRCodeVisible(!isQRCodeVisible)}>
                <p className="mb-2">
                    Toggle QR Code
                </p>
            </button>

            {isQRCodeVisible && <QRCode value={url} />}
        </div>
    );
};

export default QRCodeGenerator;
