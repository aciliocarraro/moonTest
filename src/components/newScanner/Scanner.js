import React, { useState, useEffect, useRef } from "react";
import Quagga from "quagga";
import "./Scanner.css";

const Scanner = (props) => {
  const firstUpdate = useRef(true);
  const [isStart, setIsStart] = useState(false);
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    return () => {
      if (isStart) stopScanner();
    };
  }, []);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isStart) startScanner();
    else stopScanner();
  }, [isStart]);

  const _onDetected = (res) => {
    setBarcode(res.codeResult.code);
    console.log(res.codeResult.code);
    stopScanner();
  };
  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            facingMode: "environment", // or user
            width: { min: 450 },
            height: { min: 300 },
          },
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: false,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: "large", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false,
            },
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
  };
  const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h3>Barcode scanner in React</h3>
      <button
        className="btn btn-success w-25"
        onClick={() => setIsStart((prevStart) => !prevStart)}
        style={{ marginBottom: 20 }}
      >
        {isStart ? "Stop" : "Start"}
      </button>
      {isStart && (
        <div className="video__container">
          <div>Barcode: {barcode}</div>
          <div id="scanner-container" />
        </div>
      )}
    </div>
  );
};

export default Scanner;
