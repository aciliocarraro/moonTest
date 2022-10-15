import React, { useState, useEffect, useRef } from "react";
import Quagga from "quagga";
import "./Scanner.css";

const Scanner = (props) => {
  const firstUpdate = useRef(true);
  const [isStart, setIsStart] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [prodName, setProdName] = useState("");

  const prodNameHandler = (e) => {

    setProdName(e.target.value);

  }
  const formHandler = (e) => {
    e.preventDefault();
    if (prodName.trim().length === 0) {
      return;
    }
    console.log(prodName);
    props.onAddBarCode({
      id: Math.random().toString(),
      barcode: barcode,
      product_name: prodName
    });
    setProdName("");
  };

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
    setProdName("Product" + Math.floor(Math.random() * 1000))
    // props.onAddBarCode({
    //   id: Math.random().toString(),
    //   barcode: res.codeResult.code,
    //   product_name: prodName
    // });
    console.log(res.codeResult.code);
    // stopScanner();
    setIsStart(false);
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
      <div>Barcode: {barcode}</div>
      <form
        onSubmit={formHandler}
        className="d-flex flex-column align-items-center w-75"
      >
        <div className="mb-3 w-100 ">
          <label htmlFor="prodName" className="form-label">
            Product Name
          </label>
          <input
            id="prodName"
            className={`form-control w-100`}
            type="text"
            // placeholder="Name"
            onChange={prodNameHandler}
            value={prodName}
          />
        </div>
        <button className="btn btn-dark w-100" type="submit">
          Save name
        </button>
        <button className="btn btn-danger w-100" type="submit">
          Cancel
        </button>
      </form>
      <button
        className="btn btn-success w-25"
        onClick={() => setIsStart((prevStart) => !prevStart)}
        style={{ marginBottom: 20 }}
      >
        {isStart ? "Stop" : "Start"}
      </button>
      {isStart && (
        <div className="video__container">
          <div id="scanner-container" />
        </div>
      )}
    </div>
  );
};

export default Scanner;
