import React, { CSSProperties } from "react";
import '@/components/shared/index.css'
import { CrossIcon, InfoNodalIcon } from "../utilis/Icons";
import { ColorsThemeA } from "../utilis/Themes";


interface ModalType {
    title_1: string,
    content_1: string,
    title_2: string,
    content_2: string,
    title_3: string,
    content_3: string,
    children: JSX.Element,
    close: () => void,
    width?: string
    videoUrl?: string, // URL de la vidéo (optionnelle)
}


const InfoModal = ({ title_1, content_1, title_2, content_2, title_3, content_3, children, close, width, videoUrl }: ModalType) => {
    const paragraphStyle = {
        marginBottom: '8px', // Réduit l'espace entre les paragraphes
        fontStyle: 'italic',
    };

    const breakStyle = {
        marginTop: '4px', // Espace avant le <br />
        marginBottom: '4px', // Espace après le <br />
    };

    // Styles pour centrer la vidéo
    const videoContainerStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16px',
        width: '100%', // Assurez-vous que la vidéo s'adapte à la largeur du modal
    };
    // Convertir l'URL de la vidéo YouTube en URL d'intégration
    const youtubeEmbedUrl = videoUrl ? videoUrl.replace('watch?v=', 'embed/') : '';


    return (
        <div className="relative z-[1000]">
            <div className="fixed top-0 lg:left-72 left-0 right-0 h-full  overflow-y-auto flex justify-center items-center">

                <div className="fixed top-0 left-0 h-full w-screen bg-black bg-opacity-60 cursor-pointer" onClick={close} />
                <div className="relative">
                    <div id="CrossIcon" className={`absolute -top-5 right-0 sm:-right-2 z-50 flex items-center justify-center w-12 h-12 text-darkBlue font-semibold cursor-pointer rounded-xl shadow-md ${ColorsThemeA.ohcVerticalGradient_A} transform transition-transform duration-300 hover:scale-75`} onClick={close}>
                        <CrossIcon />
                    </div>
                    <div className={`bg-black border-2 border-stone-500 text-white rounded-xl max-h-full overflow-y-auto no-scrollbar px-6 mx-4 md:px-8 py-6 ${width ? width : 'md:min-w-[200px]'}`}>
                        <div className="absolute top-2 left-7">
                            <InfoNodalIcon width="20px" height="20px" fill="#FFFFFF" />
                        </div>
                        <div className="text-center">

                            <h3 className="text-center text-2xl font-bold mb-4">{title_1}</h3>
                            {content_1.split('<br />').map((line, index) => (
                                <React.Fragment key={index}>
                                    <div style={breakStyle}>
                                        {line.split('\n').map((subLine, subIndex) => (
                                            <p key={subIndex} style={paragraphStyle}>{subLine}</p>
                                        ))}
                                    </div>
                                </React.Fragment>
                            ))}


                            {title_2 && <h1 className="text-center text-xl font-bold mb-4 mt-8">{title_2}</h1>}
                            {content_2.split('<br />').map((line, index) => (
                                <React.Fragment key={index}>
                                    <div style={breakStyle}>
                                        {line.split('\n').map((subLine, subIndex) => (
                                            <p key={subIndex} style={paragraphStyle}>{subLine}</p>
                                        ))}
                                    </div>
                                </React.Fragment>
                            ))}
                            <div className="mt-8">
                                {youtubeEmbedUrl && (
                                    <div style={videoContainerStyle}>
                                        <iframe
                                            width="100%"
                                            height="315" // Ajustez la hauteur selon vos besoins
                                            src={youtubeEmbedUrl}
                                            title="Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;


