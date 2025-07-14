'use client';

import { Camera } from 'lucide-react';
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
    }, [onCapture]);

    const reset = () => setCaptured(null);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            {!captured ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        className="rounded-xl shadow-md border border-gray-200 w-full max-w-xs"
                        videoConstraints={{
                            facingMode: 'user',
                        }}
                    />
                    <button
                        onClick={capture}
                        className=" text-black text-sm px-7 py-2 rounded-full  transition"
                    >
                        <Camera />
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={captured}
                        alt="Selfie capturada"
                        className="rounded-full w-24 h-24 object-cover border-2 border-blue-600 shadow"
                    />
                    <p className="text-sm text-gray-600">Foto capturada!</p>
                    <button
                        onClick={reset}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Tirar outra
                    </button>
                </div>
            )}
        </div>
    );
}
