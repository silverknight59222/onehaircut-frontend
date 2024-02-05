import React, { useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ url }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <p className="mb-2 font-semibold">
                    Soyez le salon favoris des clients
                </p>
            </div>
            <p className="mb-2 text-xs italic ">
                a faire scanner par vos clients
            </p>

            <QRCode value={url} />
        </div>
    );
};

export default QRCodeGenerator;
