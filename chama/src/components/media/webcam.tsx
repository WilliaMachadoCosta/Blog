'use client';

import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

interface WebcamCaptureProps {
    onCapture: (imageData: string) => void;
}

export default function WebcamCapture({ onCapture }: WebcamCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const [captured, setCaptured] = useState<string | null>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCaptured(imageSrc);
            onCapture(imageSrc);
        }
    }, [webcamRef, onCapture]);

    return (
        <div className="mb-4">
            {!captured ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        width={300}
                        className="rounded-lg shadow"
                    />
                    <button onClick={capture} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                        📸 Tirar foto
                    </button>
                </>
            ) : (
                <div>
                    <img src={captured} alt="Selfie capturada" className="rounded-full w-24 h-24" />
                    <p className="text-sm mt-2">Foto capturada!</p>
                </div>
            )}
        </div>
    );
}
